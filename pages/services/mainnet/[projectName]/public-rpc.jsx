import Head from 'next/head'
import { Table, Alert } from 'antd'
import axios from 'axios'
import styles from '@styles/Services.module.scss'
import prettyMilliseconds from 'pretty-ms'
import { WarningFilled } from '@ant-design/icons'
import { getLayout } from '@layouts/dashboard'

const parseTime = snapTime => {
	snapTime = Date.parse(snapTime.concat(':00'))
	snapTime = Date.now() - snapTime
	const time = prettyMilliseconds(snapTime, { compact: true })
	return `${time} ago`
}

const type = 'mainnet'

const PublicRPC = ({ data, projectName, paramsData }) => {
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
			render: text => (
				<a href={`http://${text}`} className='!font-medium' target='_blank' rel='noopener noreferrer'>
					{text}
				</a>
			)
		},
		{
			title: 'Block Height',
			key: 'blockHeight',
			align: 'right',
			render: (_, record) => `${record.earliest_block_height} - ${record.latest_block_height}`
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
			key: 'moniker'
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
			width: 140
		}
	]

	let paramsArray = []
	if (paramsData) {
		const safeParamsData = paramsData.params || {}
		paramsArray = Object.keys(safeParamsData).map((key, index) => ({
			key: index,
			param: key,
			value: typeof safeParamsData[key] === 'object' ? JSON.stringify(safeParamsData[key]) : safeParamsData[key]
		}))
	}

	const paramsColumns = [
		{
			title: 'Parameter',
			dataIndex: 'param',
			key: 'param'
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value'
		}
	]

	return (
		<>
			<Head>
				<title>Public RPC - ITRocket</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

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
						y: 340
					}}
					bordered
					size='small'
					style={{ maxWidth: '1030px' }}
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

				{paramsData && (
					<>
						<h2 id='params'>Cardchain Params:</h2>
						<Table
							dataSource={paramsArray}
							columns={paramsColumns}
							pagination={false}
							size='small'
							bordered
							style={{ maxWidth: '600px' }}
						/>
					</>
				)}
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const projectName = context.params.projectName
	let data = {}
	let paramsData = null

	try {
		const response = await axios.get(`https://${type}-files.itrocket.net/${projectName}/.rpc_combined.json`)
		data = response.data
	} catch (error) {
		console.error('An error occurred while fetching data:', error)
	}

	if (projectName === 'cardchain') {
		try {
			const response = await axios.get(
				'https://cardchain-testnet-api.itrocket.net/DecentralCardGame/cardchain/cardchain/params'
			)
			paramsData = response.data
		} catch (error) {
			console.error('An error occurred while fetching params data:', error)
			paramsData = null
		}
	}

	return {
		props: {
			data,
			projectName,
			paramsData
		}
	}
}

PublicRPC.getLayout = getLayout
export default PublicRPC
