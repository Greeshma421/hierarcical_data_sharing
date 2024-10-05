/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'nix-tag-images.s3.amazonaws.com',
                protocol: 'https',
            },
            {
                hostname: 'wkgtxptenzjenicqfbpg.supabase.co',
                protocol: 'https',
            },
        ],
    },
};

export default nextConfig;
