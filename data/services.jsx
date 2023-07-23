import { ApiOutlined, CloudUploadOutlined, DownloadOutlined, ExperimentOutlined } from '@ant-design/icons'

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
				<ExperimentOutlined />
				Cheat Sheet
			</>
		)
	}
]

export default services
