import type { NextConfig } from 'next';

// The default build targets Cloudflare Workers. The GitHub Pages workflow sets
// STATIC_EXPORT=1 to prerender every route to HTML in `dist/client` instead.
const staticExport = process.env.STATIC_EXPORT === '1';

// Project sites are served from https://<owner>.github.io/<repo>, user and org
// sites from the domain root. `actions/configure-pages` reports which, and the
// workflow passes it through as PAGES_BASE_PATH.
const rawBasePath = process.env.PAGES_BASE_PATH ?? '';
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/$/, '');

const nextConfig: NextConfig = {
  ...(staticExport ? { output: 'export' } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
