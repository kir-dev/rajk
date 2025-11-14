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
};

export default withPayload(nextConfig);
