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
            {
                hostname: 'lh3.googleusercontent.com',
                protocol: 'https'
            },
            {
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https'
            },
            {
                hostname: 'avatar.vercel.sh',
                protocol: 'https'
            }

        ],
    },
};

export default nextConfig;
