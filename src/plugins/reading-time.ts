import getReadingTime from "reading-time"
import { defineMdastPlugin } from "satteri";

export const readingTimePlugin = defineMdastPlugin({
    name: "reading-time",
    after(root, ctx) {
        const text = ctx.textContent(root);
        const readingTime = getReadingTime(text);

        if (ctx.data.astro !== undefined) {
            ctx.data.astro.frontmatter.minutesRead = readingTime.text;
        }
    }
})
