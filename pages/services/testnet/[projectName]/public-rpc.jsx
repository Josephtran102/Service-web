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

const type = 'testnet'

const PublicRPC = ({ data }) => {
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
			key: 'txIndex'
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
				)
		},
		{
			title: 'Scan Time',
			dataIndex: 'scan_time',
			key: 'scan_time'
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
					message="We don't manage these nodes or validate the accuracy of the data they supply. We recommend using ITRocket managed nodes for more reliable information. RPC list is updated every 4h."
					type='info'
					showIcon
					className='!w-fit mb-4'
				/>
				<Table
					dataSource={dataArray}
					columns={columns}
					pagination={false}
					scroll={{
						x: 750
					}}
					bordered
					size='small'
					style={{ maxWidth: '980px' }}
				/>
				<p className='!mt-4 !mb-1'>
					<a
						href='https://testnet-files.itrocket.net/source/.rpc_combined.json'
						target='_blank'
						rel='noopener noreferrer'
					>
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

export async function getServerSideProps(context) {
	const projectName = context.params.projectName

	try {
		const response = await axios.get(`https://${type}-files.itrocket.net/${projectName}/.rpc_combined.json`)
		return {
			props: { data: response.data }
		}
	} catch (error) {
		console.error('An error occurred while fetching data:', error)
		return {
			props: { data: {} }
		}
	}
}

PublicRPC.getLayout = getLayout
export default PublicRPC
