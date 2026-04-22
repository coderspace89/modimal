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
      process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL ||
      "http://localhost:1337";

    const sanitizedUrl = strapiUrl.replace(/\/$/, "");

    return [
      {
        /* This is the ONLY rule you need for /api.
           It says: "Take everything starting with /api/ 
           EXCEPT for /api/auth and send it to Strapi."
        */
        source: "/api/:path((?!auth).*)",
        destination: `${sanitizedUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
