import { Table, Alert } from 'antd'
import { WarningFilled } from '@ant-design/icons'
import styles from '@styles/Services.module.scss'
import prettyMilliseconds from 'pretty-ms'

const parseTime = snapTime => {
	snapTime = Date.parse(snapTime.concat(':00'))
	snapTime = Date.now() - snapTime
	const time = prettyMilliseconds(snapTime, { compact: true })
	return `${time} ago`
}

const PublicRPC = ({ data, projectName, type }) => {
	const dynamicLink = `https://${type}-files.itrocket.net/${projectName}/.rpc_combined.json`

	const dataArray = Object.keys(data).map((key, index) => ({
		key: index,
		endpoint: key,
		latest_block_height: data[key].latest_block_height || 'N/A',
		earliest_block_height: data[key].earliest_block_height || 'N/A',
		txIndex: data[key].tx_index,
		moniker: data[key].moniker,
		validator: data[key].voting_power,
		scan_time: parseTime(data[key].scan_time)
	}))

	const columns = [
		{
			title: 'Endpoint',
			dataIndex: 'endpoint',
			key: 'endpoint',
			width: 280,
			render: text => {
				const url = text.startsWith('https') ? text : `http://${text}`
				return (
					<a href={url} className='!font-medium' target='_blank' rel='noopener noreferrer'>
						{text}
					</a>
				)
			}
		},
		{
			title: 'Block Height',
			key: 'blockHeight',
			align: 'right',
			render: (_, record) => `${record.earliest_block_height} - ${record.latest_block_height}`,
			width: 130
		},
		{
			title: 'Tx Index',
			dataIndex: 'txIndex',
			key: 'txIndex',
			width: 110
		},
		{
			title: 'Moniker',
			dataIndex: 'moniker',
			key: 'moniker',
			width: 150
		},
		{
			title: 'Validator',
			dataIndex: 'validator',
			key: 'validator',
			render: validator =>
				validator !== '0' ? (
					<>
						<WarningFilled style={{ color: '#ffcc00' }} /> yes
					</>
				) : (
					'no'
				),
			width: 130
		},
		{
			title: 'Scan Time',
			dataIndex: 'scan_time',
			key: 'scan_time',
			width: 130
		}
	]

	return (
		<>
			<div className={`${styles.mainColumn} bg-[#fff] dark:bg-[#1b1b1b]`}>
				<h2 id='public-rpc'>Public RPC endpoints: {dataArray.length} active</h2>

				<Alert
					message="RPC nodes provide real-time chain data. We scan HTTP and HTTPS public RPC nodes every 4h to compile a list of endpoints. We don't manage these nodes or validate their data. Please verify accuracy on your own."
					type='info'
					showIcon
					className='!w-fit mb-4'
				/>
				<Table
					dataSource={dataArray}
					columns={columns}
					pagination={false}
					scroll={{
						x: 750,
						y: 350
					}}
					bordered
					size='small'
					style={{ maxWidth: '1130px' }}
				/>
				<p className='!mt-4 !mb-1'>
					<a href={dynamicLink} target='_blank' rel='noopener noreferrer' style={{ color: '#6a6cff' }}>
						Raw scan results
					</a>
				</p>
				<Alert
					message='Validators or public sentries which hold voting power above 0 are marked with warning symbol. Exposed to the public network, endpoints can be used as attack vector to harm the chain. Node operators should be aware of this and have a firewall rules in place to limit the attack surface of their validator infrastructure.'
					type='warning'
					showIcon
					className='!w-fit my-3'
				/>
			</div>
		</>
	)
}

export default PublicRPC
