import { describe, it, expect } from "vitest";
import { buildWifiQrPayload, encodeQrMatrix, qrMatrixToSvg } from "./qr";

describe("QR code encoder", () => {
  it("encodes short URLs into Version 1-2 matrices with valid finder patterns", () => {
    const qr = encodeQrMatrix("https://www.muendosoftwarelabs.co.ke", "M");
    expect(qr).not.toBeNull();
    if (!qr) return;
    expect(qr.size).toBe(qr.version * 4 + 17);
    // Top-left 7x7 finder outer ring must be dark
    for (let i = 0; i < 7; i += 1) {
      expect(qr.modules[0][i]).toBe(true);
      expect(qr.modules[6][i]).toBe(true);
      expect(qr.modules[i][0]).toBe(true);
      expect(qr.modules[i][6]).toBe(true);
    }
    // Center 3x3 of top-left finder must be dark
    expect(qr.modules[3][3]).toBe(true);
    // Dark module fixed position (size - 8, 8)
    expect(qr.modules[qr.size - 8][8]).toBe(true);
  });

  it("renders valid crisp SVG markup and formats Wi-Fi payloads cleanly", () => {
    const wifi = buildWifiQrPayload("MuendoGuest", "Ksh;2026:Pass", "WPA", false);
    expect(wifi).toBe("WIFI:T:WPA;S:MuendoGuest;P:Ksh\\;2026\\:Pass;;");
    const qr = encodeQrMatrix(wifi, "M");
    expect(qr).not.toBeNull();
    if (!qr) return;
    const svg = qrMatrixToSvg(qr, { fg: "#0f172a", bg: "#ffffff" });
    expect(svg).toContain("<svg");
    expect(svg).toContain('fill="#0f172a"');
  });

  it("returns null for empty input or oversized payloads above Version 10 capacity", () => {
    expect(encodeQrMatrix("")).toBeNull();
    expect(encodeQrMatrix("a".repeat(400), "H")).toBeNull();
  });
});
