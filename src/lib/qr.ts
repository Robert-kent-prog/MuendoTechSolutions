// Zero-dependency ISO/IEC 18004 QR Code encoder (Byte mode, Versions 1-10, ECC L/M/Q/H).
// Runs 100% locally in the browser with no external network requests.

export type QrEccLevel = "L" | "M" | "Q" | "H";

// GF(256) exp/log tables with primitive polynomial 0x11d
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i += 1) {
    const next = new Array<number>(poly.length + 1).fill(0);
    const factor = GF_EXP[i];
    for (let j = 0; j < poly.length; j += 1) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], factor);
    }
    poly = next;
  }
  return poly;
}

function rsRemainder(data: number[], eccLen: number): number[] {
  const gen = rsGeneratorPoly(eccLen);
  const res = new Array<number>(eccLen).fill(0);
  for (const b of data) {
    const factor = b ^ res[0];
    res.shift();
    res.push(0);
    if (factor !== 0) {
      for (let i = 0; i < eccLen; i += 1) {
        res[i] ^= gfMul(gen[i + 1], factor);
      }
    }
  }
  return res;
}

interface VersionSpec {
  version: number;
  totalCodewords: number;
  // [eccCodewordsPerBlock, group1Blocks, group1DataCW, group2Blocks, group2DataCW]
  ecc: Record<QrEccLevel, [number, number, number, number, number]>;
  alignments: number[];
}

// Versions 1 through 10 (up to 271 bytes at Level L / 213 at Level M)
const VERSION_SPECS: VersionSpec[] = [
  {
    version: 1,
    totalCodewords: 26,
    ecc: { L: [7, 1, 19, 0, 0], M: [10, 1, 16, 0, 0], Q: [13, 1, 13, 0, 0], H: [17, 1, 9, 0, 0] },
    alignments: [],
  },
  {
    version: 2,
    totalCodewords: 44,
    ecc: {
      L: [10, 1, 34, 0, 0],
      M: [16, 1, 28, 0, 0],
      Q: [22, 1, 22, 0, 0],
      H: [28, 1, 16, 0, 0],
    },
    alignments: [6, 18],
  },
  {
    version: 3,
    totalCodewords: 70,
    ecc: {
      L: [15, 1, 55, 0, 0],
      M: [26, 1, 44, 0, 0],
      Q: [18, 2, 17, 0, 0],
      H: [22, 2, 13, 0, 0],
    },
    alignments: [6, 22],
  },
  {
    version: 4,
    totalCodewords: 100,
    ecc: {
      L: [20, 1, 80, 0, 0],
      M: [18, 2, 32, 0, 0],
      Q: [26, 2, 24, 0, 0],
      H: [16, 4, 9, 0, 0],
    },
    alignments: [6, 26],
  },
  {
    version: 5,
    totalCodewords: 134,
    ecc: {
      L: [26, 1, 108, 0, 0],
      M: [24, 2, 43, 0, 0],
      Q: [18, 2, 15, 2, 16],
      H: [22, 2, 11, 2, 12],
    },
    alignments: [6, 30],
  },
  {
    version: 6,
    totalCodewords: 172,
    ecc: {
      L: [18, 2, 68, 0, 0],
      M: [16, 4, 27, 0, 0],
      Q: [24, 4, 19, 0, 0],
      H: [28, 4, 15, 0, 0],
    },
    alignments: [6, 34],
  },
  {
    version: 7,
    totalCodewords: 196,
    ecc: {
      L: [20, 2, 78, 0, 0],
      M: [18, 4, 31, 0, 0],
      Q: [18, 2, 14, 4, 15],
      H: [26, 4, 13, 1, 14],
    },
    alignments: [6, 22, 38],
  },
  {
    version: 8,
    totalCodewords: 242,
    ecc: {
      L: [24, 2, 97, 0, 0],
      M: [22, 2, 38, 2, 39],
      Q: [22, 4, 18, 2, 19],
      H: [26, 4, 14, 2, 15],
    },
    alignments: [6, 24, 42],
  },
  {
    version: 9,
    totalCodewords: 292,
    ecc: {
      L: [30, 2, 116, 0, 0],
      M: [22, 3, 36, 2, 37],
      Q: [20, 4, 16, 4, 17],
      H: [24, 4, 12, 4, 13],
    },
    alignments: [6, 26, 46],
  },
  {
    version: 10,
    totalCodewords: 346,
    ecc: {
      L: [18, 2, 68, 2, 69],
      M: [26, 4, 43, 1, 44],
      Q: [24, 6, 19, 2, 20],
      H: [28, 6, 15, 2, 16],
    },
    alignments: [6, 28, 50],
  },
];

const FORMAT_BITS_ECC: Record<QrEccLevel, number> = {
  L: 0b01,
  M: 0b00,
  Q: 0b11,
  H: 0b10,
};

function computeFormatBits(ecc: QrEccLevel, mask: number): number {
  const data = (FORMAT_BITS_ECC[ecc] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i += 1) {
    rem = (rem << 1) ^ ((rem >> 9) * 0x537);
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function computeVersionBits(version: number): number {
  let rem = version;
  for (let i = 0; i < 12; i += 1) {
    rem = (rem << 1) ^ ((rem >> 11) * 0x1f25);
  }
  return (version << 12) | rem;
}

function appendBits(bits: number[], val: number, len: number) {
  for (let i = len - 1; i >= 0; i -= 1) {
    bits.push((val >>> i) & 1);
  }
}

function pickVersion(byteLen: number, ecc: QrEccLevel): VersionSpec | null {
  for (const spec of VERSION_SPECS) {
    const [, g1b, g1d, g2b, g2d] = spec.ecc[ecc];
    const totalDataBytes = g1b * g1d + g2b * g2d;
    const countBits = spec.version < 10 ? 8 : 16;
    const headerBits = 4 + countBits;
    const capacityBytes = Math.floor((totalDataBytes * 8 - headerBits) / 8);
    if (byteLen <= capacityBytes) return spec;
  }
  return null;
}

function buildCodewords(bytes: Uint8Array, spec: VersionSpec, ecc: QrEccLevel): number[] {
  const [eccLen, g1b, g1d, g2b, g2d] = spec.ecc[ecc];
  const totalDataBytes = g1b * g1d + g2b * g2d;
  const bits: number[] = [];

  // Byte mode indicator (0100)
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, spec.version < 10 ? 8 : 16);
  for (const b of bytes) {
    appendBits(bits, b, 8);
  }

  // Terminator (up to 4 zero bits)
  const maxBits = totalDataBytes * 8;
  appendBits(bits, 0, Math.min(4, maxBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const dataCW: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let val = 0;
    for (let j = 0; j < 8; j += 1) val = (val << 1) | bits[i + j];
    dataCW.push(val);
  }

  let padToggle = true;
  while (dataCW.length < totalDataBytes) {
    dataCW.push(padToggle ? 0xec : 0x11);
    padToggle = !padToggle;
  }

  // Split into blocks and compute RS ECC per block
  const blocks: { data: number[]; ecc: number[] }[] = [];
  let offset = 0;
  for (let i = 0; i < g1b; i += 1) {
    const slice = dataCW.slice(offset, offset + g1d);
    offset += g1d;
    blocks.push({ data: slice, ecc: rsRemainder(slice, eccLen) });
  }
  for (let i = 0; i < g2b; i += 1) {
    const slice = dataCW.slice(offset, offset + g2d);
    offset += g2d;
    blocks.push({ data: slice, ecc: rsRemainder(slice, eccLen) });
  }

  // Interleave data codewords, then ECC codewords
  const out: number[] = [];
  const maxDataLen = Math.max(g1d, g2d);
  for (let i = 0; i < maxDataLen; i += 1) {
    for (const blk of blocks) {
      if (i < blk.data.length) out.push(blk.data[i]);
    }
  }
  for (let i = 0; i < eccLen; i += 1) {
    for (const blk of blocks) {
      out.push(blk.ecc[i]);
    }
  }
  return out;
}

function maskBit(mask: number, r: number, c: number): boolean {
  switch (mask) {
    case 0:
      return (r + c) % 2 === 0;
    case 1:
      return r % 2 === 0;
    case 2:
      return c % 3 === 0;
    case 3:
      return (r + c) % 3 === 0;
    case 4:
      return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    case 5:
      return ((r * c) % 2) + ((r * c) % 3) === 0;
    case 6:
      return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
    default:
      return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
  }
}

function penaltyScore(grid: boolean[][]): number {
  const n = grid.length;
  let score = 0;
  // Rule 1: runs of 5+ same color in rows/cols
  for (let r = 0; r < n; r += 1) {
    let runLen = 1;
    for (let c = 1; c < n; c += 1) {
      if (grid[r][c] === grid[r][c - 1]) {
        runLen += 1;
        if (runLen === 5) score += 3;
        else if (runLen > 5) score += 1;
      } else {
        runLen = 1;
      }
    }
  }
  for (let c = 0; c < n; c += 1) {
    let runLen = 1;
    for (let r = 1; r < n; r += 1) {
      if (grid[r][c] === grid[r - 1][c]) {
        runLen += 1;
        if (runLen === 5) score += 3;
        else if (runLen > 5) score += 1;
      } else {
        runLen = 1;
      }
    }
  }
  // Rule 2: 2x2 blocks
  for (let r = 0; r < n - 1; r += 1) {
    for (let c = 0; c < n - 1; c += 1) {
      const v = grid[r][c];
      if (v === grid[r][c + 1] && v === grid[r + 1][c] && v === grid[r + 1][c + 1]) {
        score += 3;
      }
    }
  }
  // Rule 4: dark/light ratio balance
  let dark = 0;
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) if (grid[r][c]) dark += 1;
  }
  const pct = (dark * 100) / (n * n);
  score += Math.floor(Math.abs(pct - 50) / 5) * 10;
  return score;
}

export interface QrMatrixResult {
  version: number;
  size: number;
  modules: boolean[][];
}

export function encodeQrMatrix(text: string, ecc: QrEccLevel = "M"): QrMatrixResult | null {
  const bytes = new TextEncoder().encode(text);
  if (bytes.length === 0) return null;
  const spec = pickVersion(bytes.length, ecc);
  if (!spec) return null;

  const size = spec.version * 4 + 17;
  const isFunction = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const base = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));

  function setFn(r: number, c: number, val: boolean) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      base[r][c] = val;
      isFunction[r][c] = true;
    }
  }

  // Finder patterns + separators
  function drawFinder(top: number, left: number) {
    for (let dr = -1; dr <= 7; dr += 1) {
      for (let dc = -1; dc <= 7; dc += 1) {
        const r = top + dr;
        const c = left + dc;
        if (r < 0 || r >= size || c < 0 || c >= size) continue;
        const dist = Math.max(Math.abs(dr - 3), Math.abs(dc - 3));
        setFn(r, c, dist !== 2 && dist !== 4);
      }
    }
  }
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i += 1) {
    setFn(6, i, i % 2 === 0);
    setFn(i, 6, i % 2 === 0);
  }

  // Alignment patterns
  for (const r of spec.alignments) {
    for (const c of spec.alignments) {
      if (isFunction[r][c]) continue;
      for (let dr = -2; dr <= 2; dr += 1) {
        for (let dc = -2; dc <= 2; dc += 1) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc));
          setFn(r + dr, c + dc, dist !== 1);
        }
      }
    }
  }

  // Reserve format info areas + dark module
  for (let i = 0; i <= 8; i += 1) {
    if (i !== 6) {
      setFn(8, i, false);
      setFn(i, 8, false);
    }
  }
  for (let i = 0; i < 8; i += 1) {
    setFn(8, size - 1 - i, false);
  }
  for (let i = 0; i < 7; i += 1) {
    setFn(size - 1 - i, 8, false);
  }
  setFn(size - 8, 8, true); // Dark module

  // Version info blocks (Version >= 7)
  if (spec.version >= 7) {
    const vBits = computeVersionBits(spec.version);
    for (let i = 0; i < 18; i += 1) {
      const bit = ((vBits >>> i) & 1) === 1;
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      setFn(a, b, bit);
      setFn(b, a, bit);
    }
  }

  // Place data bits in zigzag columns
  const codewords = buildCodewords(bytes, spec, ecc);
  let bitIdx = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert += 1) {
      const r = upward ? size - 1 - vert : vert;
      for (let dx = 0; dx < 2; dx += 1) {
        const c = right - dx;
        if (isFunction[r][c]) continue;
        const cwIdx = bitIdx >>> 3;
        const bit =
          cwIdx < codewords.length ? ((codewords[cwIdx] >>> (7 - (bitIdx & 7))) & 1) === 1 : false;
        base[r][c] = bit;
        bitIdx += 1;
      }
    }
    upward = !upward;
  }

  // Evaluate all 8 masks and pick the lowest penalty
  let bestGrid = base;
  let bestPenalty = Number.POSITIVE_INFINITY;

  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = base.map((row, r) =>
      row.map((val, c) => (isFunction[r][c] ? val : val !== maskBit(mask, r, c))),
    );
    const fBits = computeFormatBits(ecc, mask);
    for (let i = 0; i <= 5; i += 1) candidate[8][i] = ((fBits >>> (14 - i)) & 1) === 1;
    candidate[8][7] = ((fBits >>> 8) & 1) === 1;
    candidate[8][8] = ((fBits >>> 7) & 1) === 1;
    candidate[7][8] = ((fBits >>> 6) & 1) === 1;
    for (let i = 0; i <= 5; i += 1) candidate[5 - i][8] = ((fBits >>> (5 - i)) & 1) === 1;

    for (let i = 0; i <= 7; i += 1) candidate[8][size - 1 - i] = ((fBits >>> i) & 1) === 1;
    for (let i = 0; i <= 6; i += 1) candidate[size - 1 - i][8] = ((fBits >>> (14 - i)) & 1) === 1;

    const p = penaltyScore(candidate);
    if (p < bestPenalty) {
      bestPenalty = p;
      bestGrid = candidate;
    }
  }

  return { version: spec.version, size, modules: bestGrid };
}

export function qrMatrixToSvg(
  qr: QrMatrixResult,
  options?: { fg?: string; bg?: string; quietZone?: number },
): string {
  const fg = options?.fg ?? "#0f172a";
  const bg = options?.bg ?? "#ffffff";
  const qz = options?.quietZone ?? 4;
  const total = qr.size + qz * 2;
  const paths: string[] = [];

  for (let r = 0; r < qr.size; r += 1) {
    for (let c = 0; c < qr.size; c += 1) {
      if (qr.modules[r][c]) {
        paths.push(`M${c + qz},${r + qz}h1v1h-1z`);
      }
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="Generated QR code">`,
    `<rect width="${total}" height="${total}" fill="${bg}"/>`,
    `<path d="${paths.join("")}" fill="${fg}"/>`,
    `</svg>`,
  ].join("");
}

export function buildWifiQrPayload(
  ssid: string,
  password: string,
  security: "WPA" | "WEP" | "nopass",
  hidden = false,
): string {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
  const passPart = security === "nopass" ? "" : `P:${esc(password)};`;
  return `WIFI:T:${security};S:${esc(ssid)};${passPart}${hidden ? "H:true;" : ""};`;
}
