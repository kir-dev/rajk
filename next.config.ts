import {withPayload} from "@payloadcms/next/withPayload";
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.kir-dev.hu',
        port: '',
        pathname: '/*',
        search: '',
      },
    ],
  },
};

export default withPayload(nextConfig);
