# Nano Banana prompts for project card images

Ten projects still show a neutral icon tile instead of a picture. These prompts make one consistent
set of **conceptual illustrations**. They are not screenshots of the real products, so the site marks
them with a small "Illustration" label. Do not describe them as real screens.

Real screenshots are already in place for Xelvora and CCU (captured from the live sites).

## Output spec
- Aspect ratio 16:10 (for example 1600 x 1000), PNG or WebP.
- Send each image back in chat, or save it as `public/projects/<name>.webp`, using the names below.
- Generate 3 to 4 per prompt and pick the best. Check for any garbled text and regenerate if you see it.

## Shared style block (paste at the start of every prompt)

```text
Clean modern flat vector illustration, soft isometric perspective, solid colours only, no gradients,
no glow, no 3D render, no photo. Palette: cobalt blue #1D4ED8, cyan #06B6D4, deep navy #0B1B3A,
white and light grey on a calm pale background (#F1F5F9). Rounded shapes, thin outlines, plenty of
empty space. No text, no letters, no numbers, no logos, no real brand names. 16:10 landscape,
subject centred.
```

## Subject lines (add one after the style block)

| File name | Project | Subject line |
|---|---|---|
| `linkfy-marketplace-app.webp` | Linkfy service marketplace | A smartphone showing abstract map pins and chat bubbles, with small icons of a wrench, a broom and a lightning bolt floating around it, suggesting local services. |
| `fleet-management-system.webp` | Fleet management | A delivery truck on a winding route line across an abstract map, with a fuel gauge and a wrench icon beside it. |
| `document-management-system.webp` | Digital file and document management | A stack of folders and a filing cabinet with a calendar and a small bell, and a shield with a padlock, suggesting expiry reminders and secure storage. |
| `ai-integrations.webp` | AI integrations | Floating chat bubbles and a document with a sparkle, linked by thin lines and small connected nodes, suggesting an assistant that reads documents. |
| `carpool-ride-share.webp` | Carpool and ride-share | Two simple cars travelling along one route between two map pins, with abstract passenger silhouettes in the windows. |
| `vaccination-tracker.webp` | Vaccination tracker | A calendar page with a syringe icon, a small shield with a check mark, and a simple line chart, suggesting dose schedules and follow-ups. |
| `exam-verification-system.webp` | Exam administration verification | An ID card with a barcode and a check mark badge beside a laptop, with a shield, suggesting secure student verification. |
| `retail-bookkeeping-platform.webp` | Retail bookkeeping | A small shop counter with a receipt, a bar chart and a stack of coins, suggesting daily sales and profit tracking. |
| `institutional-website.webp` | Institutional website | A school building drawn simply next to a browser window with abstract page blocks. |
| `ecommerce-platform.webp` | E-commerce platform | A shopping basket beside a browser window of product cards, and a smartphone showing a payment confirmation tick. |

## After you generate them
Send me the images. I will convert them to optimised WebP, add them to each card and case study with
proper alt text, and keep the "Illustration" label on them.
