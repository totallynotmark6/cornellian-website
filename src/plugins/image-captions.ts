import { defineHastPlugin } from "satteri";
import type { Element, Text } from "hast";

// Wraps images in a <figure> with a <figcaption>, reading the caption and
// credit from blocks in the image alt text:
//   ![alt {caption=The caption} {credit=The photographer}](path.jpg)
// With no {caption=...} block, the alt text becomes the caption.
// With neither caption nor credit, the image stays plain.

const CAPTION_BLOCK = /\{caption=([^\{\}]+)\}/;
const CREDIT_BLOCK = /\{credit=([^\{\}]+)\}/;

interface CaptionParts {
    caption: string | null;
    credit: string | null;
    alt: string;
}

function extractCaption(alt: string): CaptionParts {
    const captionMatch = alt.match(CAPTION_BLOCK);
    const creditMatch = alt.match(CREDIT_BLOCK);

    let caption = captionMatch ? captionMatch[1] : null;
    const credit = creditMatch ? creditMatch[1] : null;

    let cleanedAlt = alt;
    if (captionMatch) cleanedAlt = cleanedAlt.replace(captionMatch[0], "");
    if (creditMatch) cleanedAlt = cleanedAlt.replace(creditMatch[0], "");
    cleanedAlt = cleanedAlt.trim();

    // Without an explicit caption block, the alt text is the caption
    if (!caption && cleanedAlt.length > 0) {
        caption = cleanedAlt;
    }

    return { caption, credit, alt: cleanedAlt || caption || "" };
}

const FIGCAPTION_CLASSES = ["text-sm", "text-base-600", "dark:text-base-500", "mt-2", "text-center", "italic"];

export const imageCaptionsPlugin = defineHastPlugin({
    name: "image-captions",
    element: {
        filter: ["img"],
        visit(node, ctx) {
            const alt = typeof node.properties?.alt === "string" ? node.properties.alt : "";
            const { caption, credit, alt: cleanAlt } = extractCaption(alt);

            // Plain images (no caption, no credit) are left untouched
            if (!caption && !credit) return;

            ctx.setProperty(node, "alt", cleanAlt);

            const children: (Element | Text)[] = [];
            if (caption) {
                children.push({ type: "text", value: caption });
            }
            if (caption && credit) {
                children.push({ type: "text", value: " | " });
            }
            if (credit) {
                children.push({
                    type: "element",
                    tagName: "span",
                    properties: { className: ["font-semibold"] },
                    children: [{ type: "text", value: `Credit: ${credit}` }],
                });
            }

            const figure: Element = {
                type: "element",
                tagName: "figure",
                properties: {},
                // wrapNode places the image first, so the caption follows it
                children: [{
                    type: "element",
                    tagName: "figcaption",
                    properties: { className: FIGCAPTION_CLASSES },
                    children,
                }],
            };

            ctx.wrapNode(node, figure);
        }
    }
});
