/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config) => {
    // Evita errori su dipendenze opzionali usate dai connettori wallet
    config.resolve = config.resolve || {};
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
      'lokijs': false
    });
    return config;
  }
};

module.exports = nextConfig;


