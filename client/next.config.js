/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	redirects: [
		{
			source: "/home",
			destination: "/",
			permanent: false,
		},
	],
	reactStrictMode: false,
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.externals.push({
			"utf-8-validate": "commonjs utf-8-validate",
			bufferutil: "commonjs bufferutil",
		});
		return config;
	},
};

module.exports = nextConfig;
