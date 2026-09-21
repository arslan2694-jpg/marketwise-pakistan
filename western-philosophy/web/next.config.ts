import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no dynamic routes lack generateStaticParams, no
  // cookies/headers/redirects/route-handlers/server-actions are used, so
  // `next build` can emit a plain folder of HTML/CSS/JS with no Node
  // server required at runtime. See `out/` after building.
  output: "export",
  // Emit /path/index.html instead of /path.html so any static file host
  // (GitHub Pages, S3, Nginx, etc.) serves clean URLs with no rewrite
  // rules needed.
  trailingSlash: true,
};

export default nextConfig;
