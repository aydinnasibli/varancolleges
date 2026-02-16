import { type SchemaTypeDefinition } from "sanity";
import { program } from "./program";
import { country } from "./country";
import { faq } from "./faq";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, country, faq, post],
};
