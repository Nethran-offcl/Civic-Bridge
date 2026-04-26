import { writeFile } from "node:fs/promises";
import { getEmbedding } from "../src/lib/gemini";
import { getAllSchemes } from "../src/lib/schemes";

const embeddings = await Promise.all(
  getAllSchemes().map(async (scheme) => ({
    id: scheme.id,
    embedding: await getEmbedding([
      scheme.name,
      scheme.descriptionDetailed,
      scheme.eligibility.notes.join(" "),
      scheme.tags.join(" ")
    ].join(" "))
  }))
);

await writeFile("data/embeddings_cache.json", `${JSON.stringify(embeddings, null, 2)}\n`, "utf8");
console.log(`Generated ${embeddings.length} embeddings.`);
