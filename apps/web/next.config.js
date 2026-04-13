/** @type {import('next').NextConfig} */
const nextConfig = {
  // `packages/db` is a workspace package; Next should transpile it.
  transpilePackages: ["db"],
  turbopack: {
    resolveAlias: {
      // Use a *relative* alias: Turbopack doesn't support Windows absolute paths.
      db: "../../packages/db/index.js",
    },
  },
};

export default nextConfig;
