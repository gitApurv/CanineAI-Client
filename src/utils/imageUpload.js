const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 10;
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export async function handleImageUpload(
  image,
  { setLoading, setValue, showAlert } = {},
) {
  if (typeof setLoading === "function") {
    setLoading(true);
  }

  try {
    if (image === undefined || image === null) {
      throw new Error("Please select an Image");
    }

    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("Image size must be less than 10MB");
    }

    if (!SUPPORTED_IMAGE_TYPES.includes(image.type)) {
      throw new Error("Image must be a JPEG, PNG or JPG");
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName)
      throw new Error("Missing VITE_CLOUDINARY_CLOUD configuration");

    if (!uploadPreset)
      throw new Error("Missing Cloudinary upload preset configuration");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const jsonResponse = await response.json();

    if (!response.ok) {
      const message = jsonResponse?.error?.message || "Error uploading Image";
      throw new Error(message);
    }

    const imageUrl = jsonResponse?.secure_url;

    if (!imageUrl) throw new Error("Image upload failed");

    if (typeof setValue === "function") {
      setValue("image", imageUrl);
    }

    return imageUrl;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error uploading Image";

    if (typeof showAlert === "function") {
      showAlert(message, "error");
      return null;
    }

    throw error;
  } finally {
    if (typeof setLoading === "function") {
      setLoading(false);
    }
  }
}
