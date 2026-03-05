"use server";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await imagekit.upload({
      file: buffer, // buffer
      fileName: file.name,
      folder: "/varan-colleges/blog",
    });

    return { success: true, url: response.url };
  } catch (error) {
    console.error("Image upload failed:", error);
    return { success: false, error: "Image upload failed" };
  }
}
