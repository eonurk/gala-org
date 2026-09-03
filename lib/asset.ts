/**
 * GitHub Pages project sites serve from /<repo>/, so every root-absolute
 * asset path needs that prefix. next/link and next/image add it automatically;
 * plain `<img src="/...">` doesn't, so route those through this helper.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
