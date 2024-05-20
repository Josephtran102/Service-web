import { processData } from '@utils/map'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, ZoomControl } from 'react-leaflet'

const LeafletMap = ({ data }) => {
	const [markers, setMarkers] = useState([])

	useEffect(() => {
		const processedMarkers = processData(data)
		console.log('Processed Markers:', JSON.stringify(processedMarkers, undefined, 4))
		setMarkers(processedMarkers)
	}, [data])

	const createIcon = providers =>
		L.divIcon({
			html: `<div style="background-color: white; border-radius: 50%; padding: 5px 10px; color: black;">${providers}</div>`,
			className: '',
			iconSize: L.point(40, 40)
		})

	const getColor = amount => {
		const r = amount > 15 ? 255 : amount >= 10 ? 255 : 0
		const g = amount < 10 ? 255 : amount <= 14 ? 255 : 0
		const b = 0
		return `rgba(${r}, ${g}, ${b}, 0.7)`
	}

	return (
		<MapContainer
			center={[19, 16]}
			zoom={2.44}
			style={{ height: '550px', width: '100%' }}
			zoomControl={false}
			zoomSnap={0.125}
		>
			<TileLayer url='https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' />
			<ZoomControl position='topright' />
			{markers.map((marker, idx) => (
				<CircleMarker
					key={idx}
					center={marker.coords}
					radius={5}
					icon={createIcon(marker.providers)}
					color={getColor(marker.amount)}
				>
					<Popup>
						Country: {marker.country} <br />
						City: {marker.city} <br />
						Amount: {marker.amount} <br />
						Providers: {marker.providers}
					</Popup>
				</CircleMarker>
			))}
		</MapContainer>
	)
}

export default LeafletMap
