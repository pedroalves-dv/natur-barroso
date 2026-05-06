"use client";

import dynamicImport from "next/dynamic";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

// Sanity Studio accesses `window` during schema initialisation.
// ssr: false prevents any server-render pass from reaching that code.
const NextStudio = dynamicImport(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}