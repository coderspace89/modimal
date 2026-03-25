/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi Cloud
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

    // Only attempt rewrite if the production URL is actually found
    if (strapiUrl) {
      return [
        {
          source: "/api/:path*",
          // .replace(/\/$/, "") safely removes any trailing slash if it exists
          destination: `${strapiUrl.replace(/\/$/, "")}/api/:path*`,
        },
      ];
    }

    // Local fallback for development only
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:1337/api/:path*",
      },
    ];
  },
};

export default nextConfig;
