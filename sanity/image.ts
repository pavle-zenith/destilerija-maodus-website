import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset, sanityEnabled } from "./env";

const builder = sanityEnabled
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}
