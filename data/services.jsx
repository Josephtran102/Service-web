import {
	ApiOutlined,
	CloudUploadOutlined,
	CompassOutlined,
	DownloadOutlined,
	ExperimentOutlined,
	FileDoneOutlined
} from '@ant-design/icons'

const services = [
	{
		key: 'api',
		label: (
			<>
				<ApiOutlined />
				API & Sync
			</>
		)
	},
	{
		key: 'installation',
		label: (
			<>
				<DownloadOutlined />
				Installation
			</>
		)
	},
	{
		key: 'upgrade',
		label: (
			<>
				<CloudUploadOutlined />
				Upgrade
			</>
		)
	},
	{
		key: 'cheat-sheet',
		label: (
			<>
				<FileDoneOutlined />
				Cheat Sheet
			</>
		)
	},
	{
		key: 'public-rpc',
		label: (
			<>
				<CompassOutlined />
				Public RPC
			</>
		)
	}
]

export default services
