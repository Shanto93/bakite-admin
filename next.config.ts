

import type { NextConfig } from "next";

function safeBaseApi() {
  const v = process.env.NEXT_PUBLIC_BASE_API?.trim();
  if (!v) return null;
  if (!/^https?:\/\//i.test(v)) return null;
  return v.replace(/\/+$/, ""); // strip trailing slashes
}

const BASE_API = safeBaseApi();

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  async rewrites() {
    
    // Only add the rule if we have a valid absolute origin
    if (BASE_API) {
      return [
        {
          source: "/proxy/:path*",
          destination: `${BASE_API}/:path*`,
        },
      ];
    }
    console.warn(
      "⚠ Skipping /proxy rewrite: NEXT_PUBLIC_BASE_API is not set or invalid."
    );
    return [];
  },

  images: {
    remotePatterns: [
      // FIXED: correct domain for ibb
      { protocol: "https", hostname: "i.ibb.co.com", pathname: "/**" },

      { protocol: "https", hostname: "f005.backblazeb2.com", pathname: "/file/bakite/**" },
      { protocol: "https", hostname: "f000.backblazeb2.com", pathname: "/file/bakite/**" },

      { protocol: "https", hostname: "ui-avatars.com", pathname: "/api/**" },
    ],
  },

  // Optional: if you saw a Turbopack root warning, pin the root:
  // turbopack: { root: __dirname },
};

export default nextConfig;
