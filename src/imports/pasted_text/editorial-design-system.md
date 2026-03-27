```markdown

# Design System Document: The Editorial Portfolio



## 1. Overview & Creative North Star

**Creative North Star: "The Velvet Curator"**



This design system is built to transcend the "template" aesthetic of modern portfolios. It is rooted in high-end editorial design—think of a luxury fashion lookbook or a private gallery invitation. The objective is to balance a deep, feminine warmth with a sharp, professional edge.



By leveraging **intentional asymmetry**, we break the rigid 12-column grid. Layouts should feel curated, not generated. Elements should overlap with confidence; a display heading might bleed into a glass container, and images should sit at varying elevations to create a sense of physical depth. This is a dynamic, human-centric experience where movement is fluid and every interaction feels like a deliberate gesture.



---



## 2. Colors

Our palette is a study in tonal depth. The primary goal is to use color to create atmosphere rather than just functional utility.



* **Background (`#310002`):** A deep, nocturnal maroon that provides the canvas for our gold accents to glow.

* **Primary (`#e9c349` - Elegant Gold):** Reserved for the most important interactive elements and brand accents.

* **Secondary (`#d3c5ad` - Champagne Gold):** Used for subtle lettering and secondary UI elements to provide a softer contrast against the dark background.



### The "No-Line" Rule

**Explicit Instruction:** Prohibition of 1px solid borders for sectioning.

Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation needed. If a section feels "lost," increase the vertical spacing (`spacing-16` or `spacing-20`) rather than adding a line.



### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:

1. **Base:** `surface` (#310002)

2. **Low Elevation:** `surface-container-low` (#3d0506) for large content blocks.

3. **High Elevation:** `surface-container-high` (#511413) for interactive cards or floating nav.



### The "Glass & Gradient" Rule

To achieve the premium glassmorphism feel, use `surface-variant` with a 40%–60% opacity combined with a `backdrop-filter: blur(20px)`.

* **Signature Textures:** Apply a subtle radial gradient on Hero backgrounds transitioning from `surface` to `surface-container-highest` to create a "spotlight" effect behind the main content.



---



## 3. Typography

The typography system relies on the tension between the classic, high-contrast Serif and the modern, architectural Sans-Serif.



* **Display & Headlines (Noto Serif):** Use these for "Moment" text. These should be set with tighter letter-spacing (-0.02em) to feel like high-end print. Use `display-lg` for hero statements to establish immediate authority.

* **Titles & Body (Manrope):** A clean, humanist sans-serif. Manrope provides the "Professional" counterweight to the "Feminine" serif. Use `body-lg` for narrative text to ensure high readability against the dark background.

* **Labels (Manrope):** Always set in uppercase with a slight letter-spacing (+0.05em) when used for navigation or categories to evoke a sense of luxury branding.



---



## 4. Elevation & Depth

In this system, depth is a narrative tool. We do not use "drop shadows" in the traditional sense.



* **The Layering Principle:** Stack `surface-container` tiers. Place a `surface-container-highest` card on a `surface-container-low` background. This creates "Tonal Lift."

* **Ambient Shadows:** For floating glass elements, use a shadow color tinted with `on-surface` (Maroon-tinted black).

* *Spec:* `box-shadow: 0 20px 40px rgba(49, 0, 2, 0.4);`

* **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` token at 15% opacity. It should be felt, not seen.

* **Interactive Gamification:** When a user hovers over a glass card, the `backdrop-blur` should increase from 20px to 30px, and the `surface-tint` should subtly brighten. This creates a "tactile" response that feels premium.



---



## 5. Components



### Buttons

* **Primary:** `primary` background with `on-primary` text. Use a slight `primary_container` inner glow on hover. No hard corners; use `rounded-md`.

* **Secondary (Ghost):** A "Ghost Border" using `outline` at 20% opacity. On hover, fill with `surface-variant` at 30% opacity.



### Cards & Lists

* **The Forbiddance:** Never use divider lines.

* **The Solution:** Use `spacing-6` between list items. For cards, use Glassmorphism containers with `surface-container-lowest` backgrounds to create soft separation.



### Input Fields

* **Style:** Minimalist. Only a bottom border using `outline-variant` (20% opacity).

* **Focus State:** The border transitions to `primary` (Gold) and the label shifts to `label-sm` using the `primary` color.



### Signature Component: The "Curated Tile"

A specialized card for portfolio projects. It features a background image with a `surface-container-highest` glass overlay that only covers the bottom 30% of the card, blurring the image beneath and holding the `title-md` text.



---



## 6. Do's and Don'ts



### Do

* **Use Whitespace as Luxury:** Treat empty space as a premium material. Don't crowd the Maroon background.

* **Asymmetric Alignment:** Align your display type to the left, but place your body copy in a narrower, offset column to the right.

* **Micro-interactions:** Add a subtle "glow" follow-effect to the cursor using a low-opacity `primary` radial gradient.



### Don't

* **No Pure Black:** Never use `#000000`. It kills the warmth of the Maroon.

* **No Standard Grids:** Avoid the "3-card row" look. Try a "2 + 1" layout where one card is significantly larger or offset vertically.

* **No Default Shadows:** Avoid grey shadows. Shadows must always be a darker, desaturated version of the Maroon background.



---



## 7. Spacing & Rhythm

Consistency in spacing is what separates "messy" from "intentional."

* **Section Padding:** Use `spacing-20` (7rem) for vertical separation between major narrative blocks.

* **Content Grouping:** Use `spacing-4` (1.4rem) to relate headers to their subtext.

* **The "Breathing" Margin:** Ensure all glass containers have at least `spacing-8` (2.75rem) internal padding to maintain an airy, high-end feel.```