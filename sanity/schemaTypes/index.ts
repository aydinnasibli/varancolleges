import { type SchemaTypeDefinition } from "sanity";
import { program } from "./program";
import { country } from "./country";
import { testimonial } from "./testimonial";
import { faq } from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, country, testimonial, faq],
};
