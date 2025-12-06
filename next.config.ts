import {withPayload} from "@payloadcms/next/withPayload";
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
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
};

export default withPayload(nextConfig);
