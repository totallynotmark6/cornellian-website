#!/usr/bin/env node
import fs from "fs";

const INPUT = process.argv[2];

if (!INPUT) {
  console.error("Usage: npm run unwrap <file>");
  process.exit(1);
}

let text = fs.readFileSync(INPUT, "utf8");

/* 1. Normalize line endings */
text = text.replace(/\r\n/g, "\n");

/* 2. Fix hyphenated line breaks (Novemb-\ner → November) */
text = text.replace(/-\n(?=\p{L})/gu, "");

/* 3. Split into paragraphs */
const paragraphs = text
  .split(/\n{2,}/)
  .map((p) =>
    p
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );

/* 4. Rejoin paragraphs */
const output = paragraphs.join("\n\n");

process.stdout.write(output + "\n");
