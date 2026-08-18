export async function compressImageUrl(
  url: string,
  maxWidth: number = 600,
  quality: number = 0.6,
): Promise<string> {
  // If it's already a base64 string, just return it
  if (url.startsWith("data:image")) {
    return url;
  }

  const processImage = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context not available"));

        ctx.drawImage(img, 0, 0, width, height);

        try {
          const dataUrl = canvas.toDataURL("image/webp", quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  try {
    // Try original URL first
    return await processImage(url);
  } catch (error) {
    try {
      // Use images.weserv.nl as a reliable CORS proxy and image optimizer
      const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${maxWidth}&output=webp`;
      return await processImage(proxiedUrl);
    } catch (proxyError) {
      console.warn("Backup failed for image:", url, proxyError);
      return url; // fallback to original if completely fails
    }
  }
}
