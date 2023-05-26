module.exports = {
	apps: [
		{
			name: 'ITRocket',
			script: 'npm',
			args: 'start',
			env_production: {
				NEXT_PUBLIC_RECAPTCHA_SITE_KEY: '6LfvT0ImAAAAAP8OGvO7NJPTKR2Pm6EuoESfB2pT',
				RECAPTCHA_SECRET_KEY: '6LfvT0ImAAAAABsqLyW8gjHN-gaiXiZR9xujdoyt'
			}
		}
	]
}
