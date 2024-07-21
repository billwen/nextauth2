/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    instrumentationHook: true,
    outputFileTracingIncludes: {
      '/settings': ['./settings-*.yaml'],
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.externals["node:fs", "node:path"] = "commonjs node:fs node:path";
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false
    };
    config.plugins.push(

      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );

    return config;
  }
}

export default nextConfig;
