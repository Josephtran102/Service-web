import { Skeleton } from 'antd'

const AprValue = ({ aprValue }) => {
	return aprValue !== undefined ? (
		aprValue
	) : (
		<Skeleton style={{ maxWidth: '100px' }} active title={false} paragraph={{ rows: 1, width: 45 }} />
	)
}

export default AprValue
