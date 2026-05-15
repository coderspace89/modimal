/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL ||
      process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL;

    // If neither variable is available on Vercel, skip the rewrite rule entirely
    if (!strapiUrl) {
      return [];
    }

    const sanitizedUrl = strapiUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/:path((?!auth).*)",
        destination: `${sanitizedUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
