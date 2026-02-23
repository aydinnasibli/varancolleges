import { type SchemaTypeDefinition } from "sanity";
import { faq } from "./faq";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faq, post],
};
