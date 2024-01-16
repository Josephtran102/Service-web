require('dotenv').config()

const nextConfig = {
	trailingSlash: true,
	reactStrictMode: true,

	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Add a new loader for webm and mp4 files
		config.module.rules.push({
			test: /\.(webm|mp4)$/,
			use: [
				{
					loader: 'file-loader', // Using file-loader for these file types
					options: {
						publicPath: '/_next/static/videos/',
						outputPath: 'static/videos/',
						name: '[name].[ext]'
					}
				}
			]
		})

		// Important: return the modified config
		return config
	}
}

module.exports = nextConfig
