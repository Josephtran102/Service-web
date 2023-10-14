import Head from 'next/head'
import { useContext } from 'react'
import { Table, Alert } from 'antd'
import AnimatedSection from './AnimatedSection'

import styles from '@styles/Services.module.scss'
import { Context } from '@context/context'

const Params = ({ paramsData, type }) => {
	const { theme } = useContext(Context)

	let paramsArray = []
	if (paramsData) {
		const safeParamsData = paramsData.params || {}
		paramsArray = Object.keys(safeParamsData).map((key, index) => {
			let formattedKey = key
				.split(/(?=[A-Z])/)
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
			let value = safeParamsData[key]

			if (typeof value === 'object' && value.denom && value.amount) {
				value = `${value.amount}`
			}

			return {
				key: index,
				param: formattedKey,
				value: value
			}
		})
	}

	const paramsColumns = [
		{
			title: <span className='font-semibold'>Parameter:</span>,
			dataIndex: 'param',
			key: 'param'
		},
		{
			title: <span className='font-semibold'>Value:</span>,
			dataIndex: 'value',
			key: 'value'
		}
	]

	return (
		<AnimatedSection>
			<Head>
				<title>{`Params | Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>
			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				{paramsData && (
					<>
						<h2 id='params'>Cardchain Parameters:</h2>
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
		</AnimatedSection>
	)
}

export default Params
