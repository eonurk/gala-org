/**
 * GitHub Pages project sites serve from /<repo>/, so every root-absolute
 * asset path needs that prefix. next/link and next/image add it automatically;
 * plain `<img src="/...">` doesn't, so route those through this helper.
 *
 * News images come from an external CDN as full URLs — leave those alone.
 */
export function asset(path: string) {
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
