import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock_project_id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-12";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  try {
    return builder.image(source);
  } catch (error) {
    console.warn("Sanity image builder error:", error);
    // Return a mock object to prevent crashes
    return {
        url: () => "",
        width: () => ({ url: () => "" }),
        height: () => ({ url: () => "" })
    };
  }
}
