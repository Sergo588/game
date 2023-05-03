const { i18n } = require('./next-i18next.config');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    API_URL: process.env.API_URL,
    SCAN_NETWORK: process.env.SCAN_NETWORK,
    SCAN_NETWORK_ADDRESS: process.env.SCAN_NETWORK_ADDRESS,
    CONTRACT_XBASE: process.env.CONTRACT_XBASE,
    CONTRACT_GAMES_PRO: process.env.CONTRACT_GAMES_PRO,
    CONTRACT_PANCAKESWAP: process.env.CONTRACT_PANCAKESWAP,
    CONTRACT_BUSD_TOKEN: process.env.CONTRACT_BUSD_TOKEN,
    STAND: process.env.STAND,
    ALLOWED_CHAIN_ID: process.env.ALLOWED_CHAIN_ID,
    CONTRACT_ROUTER_FAST: process.env.CONTRACT_ROUTER_FAST,
    RPC_WEBSOCKETS_URL: process.env.RPC_WEBSOCKETS_URL,
  },
};

module.exports = nextConfig;

// Если надо запустить аналайз бандлов раскомитить и yarn analyze
// module.exports = withBundleAnalyzer([nextConfig]);
