import {withPayload} from "@payloadcms/next/withPayload";
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.cnn.com',
                pathname: '/**', // Allow all paths under this domain
            },
            {
                protocol: 'https',
                hostname: 'kir-dev.hu',
                pathname: '/**', // Allow all paths under this domain
            },
        ]
    },
    reactCompiler: true,
    productionBrowserSourceMaps: false,
    typedRoutes: true,
    experimental: {
        typedEnv: true
    },
    async rewrites() {
        return [
            {
                source: '/about/institution',
                destination: '/rolunk/intezmeny',
            },
            {
                source: '/about/community',
                destination: '/rolunk/kozosseg',
            },
            {
                source: '/about/gallery',
                destination: '/rolunk/galeria',
            },
            {
                source: '/events',
                destination: '/esemenyek',
            },
            {
                source: '/academics',
                destination: '/szakma',
            },
            {
                source: '/admission',
                destination: '/felveteli',
            },
            {
                source: '/support',
                destination: '/tamogatas',
            },
            {
                source: '/awards',
                destination: '/dijak',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/tamogass',
                destination: '/support',
                permanent: true,
            },
        ];
    },
};

export default withPayload(nextConfig);
