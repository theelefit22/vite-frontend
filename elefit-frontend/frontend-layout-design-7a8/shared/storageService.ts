import { uploadProfileImage, deleteFile, db } from "@shared/firebase";
import { doc, getDoc } from "firebase/firestore";

// Cache for profile images
const profileImageCache = new Map<string, { url: string; timestamp: number }>();

/**
 * Upload and save profile image
 */
export const updateProfileImage = async (
  uid: string,
  file: File
): Promise<string> => {
  try {
    // Validate file
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }

    const downloadUrl = await uploadProfileImage(uid, file);
    return downloadUrl;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update profile image"
    );
  }
};

/**
 * Delete profile image
 */
export const removeProfileImage = async (uid: string, imagePath: string) => {
  try {
    await deleteFile(imagePath);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to delete profile image"
    );
  }
};

/**
 * Validate image file
 */
export const validateImageFile = (file: File): string | null => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return "Invalid file type. Please use JPEG, PNG, or WebP";
  }

  if (file.size > maxSize) {
    return "File size must be less than 5MB";
  }

  return null;
};

/**
 * Compress image before upload
 */
export const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Resize to max 1000x1000
        const maxDim = 1000;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = (height * maxDim) / width;
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = (width * maxDim) / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          0.8
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
};

/**
 * Get profile image URL from cache or Firebase
 */
export const getProfileImageURL = async (userId: string): Promise<string | null> => {
  try {
    if (!userId) return null;

    // Check if the URL is in the cache and not expired (cache for 1 hour)
    const cachedImage = profileImageCache.get(userId);
    if (cachedImage && Date.now() - cachedImage.timestamp < 3600000) {
      console.log("Using cached profile image for:", userId);
      return cachedImage.url;
    }

    // If not in cache or expired, get from Firestore
    const mediaDocRef = doc(db, "usersMedia", userId);
    const mediaDoc = await getDoc(mediaDocRef);

    if (mediaDoc.exists() && mediaDoc.data().profileImageURL) {
      const imageUrl = mediaDoc.data().profileImageURL;

      // Update the cache
      profileImageCache.set(userId, {
        url: imageUrl,
        timestamp: Date.now(),
      });

      return imageUrl;
    }

    return null;
  } catch (error) {
    console.error("Error getting profile image URL:", error);
    return null;
  }
};
