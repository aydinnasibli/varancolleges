import { type SchemaTypeDefinition } from "sanity";
import { program } from "./program";
import { country } from "./country";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, country],
};
