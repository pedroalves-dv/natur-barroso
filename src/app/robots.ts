import type { MetadataRoute } from "next";

const launched = process.env.SITE_LAUNCHED === "true";

export default function robots(): MetadataRoute.Robots {
  if (!launched) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://naturbarroso.com/sitemap.xml",
  };
}
