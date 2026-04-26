import { createClient } from "@supabase/supabase-js";
import centralSchemes from "../data/schemes/central_schemes.json";
import stateSchemes from "../data/schemes/state_schemes.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to seed schemes.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const schemes = [...centralSchemes, ...stateSchemes];

const { error } = await supabase.from("schemes").upsert(
  schemes.map((scheme) => ({
    id: scheme.id,
    name: scheme.name,
    category: scheme.category,
    state: "state" in scheme ? scheme.state : null,
    data: scheme
  })),
  { onConflict: "id" }
);

if (error) {
  throw error;
}

console.log(`Seeded ${schemes.length} schemes.`);
