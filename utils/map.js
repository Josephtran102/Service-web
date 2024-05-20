import countryData from '@data/countries.json'

export const processData = data => {
	let markers = []
	Object.keys(data.data).forEach(countryCode => {
		if (countryCode !== 'total_monikers') {
			const details = data.data[countryCode]
			if (details.providers && typeof details.providers === 'object') {
				Object.values(details.providers).forEach(provider => {
					provider.monikers.forEach(moniker => {
						let coords
						// Check if latitude or longitude is "Unknown" or not provided
						if (
							moniker.latitude &&
							moniker.longitude &&
							moniker.latitude !== 'Unknown' &&
							moniker.longitude !== 'Unknown'
						) {
							coords = [parseFloat(moniker.latitude), parseFloat(moniker.longitude)]
						} else {
							// Fallback to country code if latitude or longitude is "Unknown" or missing
							const countryInfo = countryData.ref_country_codes.find(c => c.alpha2 === countryCode)
							if (countryInfo) {
								coords = [countryInfo.latitude, countryInfo.longitude]
							} else {
								coords = null // Fallback if no coordinates are available at all
							}
						}
						if (coords) {
							markers.push({
								coords,
								country: moniker.countryName,
								city: moniker.cityName,
								amount: details.amount,
								providers: Object.keys(details.providers).length
							})
						}
					})
				})
			}
		}
	})
	return markers
}
