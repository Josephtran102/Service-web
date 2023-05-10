import { QuestionCircleTwoTone } from '@ant-design/icons'
import CodeSnippet from '@components/CodeSnippet'
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { getRandomHex } from '@utils/getRandomHex'
import { submitData } from '@utils/pfb'
import { Form, Input, Button, notification, Modal } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const { TextArea } = Input

const SubmitPFB = () => {
	const [api, contextHolder] = notification.useNotification()
	const [res, setRes] = useState(null)
	const [txHash, setTxHash] = useState(null)
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [opacity, setOpacity] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
		setLoading(false)
	}

	const openNotification = () => {
		api['info']({
			message: 'Your request was submitted',
			description: 'It may take a while. Please do not close the page.',
			duration: 5.5,
		})
	}

	const handleSubmit = async data => {
		setLoading(true)
		openNotification()
		data = {
			...data,
			gas_limit: 80000,
			fee: 2000,
		}
		submitData(data).then(response => {
			console.log(response)
			setRes(response)
			setTxHash(response.txhash)
			showModal()
		})
	}

	const generateFields = () => {
		form.setFieldsValue({
			namespace_id: getRandomHex(16),
			data: getRandomHex(40),
		})
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const ClearFields = () => {
		form.setFieldsValue({
			namespace_id: '',
			data: '',
		})
	}

	useEffect(() => {
		generateFields()
		setOpacity(1)
	}, [])

	return (
		<div
			className='w-screen h-screen flex flex-wrap flex-col justify-center items-center'
			style={{ opacity: opacity, transition: '0.8s' }}
		>
			{contextHolder}
			<Head>
				<title>Celestia Submit PayForBlob - ITRocket</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
			</Head>

			<ParticlesBG />

			<Modal
				title='Your request was successfully submitted! 🎉'
				open={isModalOpen}
				onOk={handleOk}
				cancelButtonProps={{ style: { display: 'none' } }}
				closable={false}
				style={{ minWidth: '50%' }}
			>
				<div className='flex flex-col gap-4'>
					<p>
						Your Tx Hash is: <span className='font-bold'>{txHash}</span>
					</p>
					<p>
						<QuestionCircleTwoTone className='align-middle pr-1' />
						You can check the transaction status here:{' '}
						<a
							href={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txHash}`}
							style={{ color: '#055bd5' }}
							target='_blank'
							rel='noopener referrer'
						>
							https://testnet.mintscan.io/celestia-incentivized-testnet/txs/
							{txHash}
						</a>
					</p>
					<TextArea
						value={JSON.stringify(res, null, 2)}
						autoSize={{ minRows: 5, maxRows: 10 }}
					/>
				</div>
			</Modal>

			<h1 className='text-3xl font-bold mb-4 tracking-tight'>
				PayForBlob Transaction
			</h1>

			<Form
				form={form}
				onFinish={handleSubmit}
				style={{ minWidth: '50%', opacity: loading === true ? '0.7' : '1' }}
				layout='vertical'
				className='flex flex-col  flex-wrap bg-white p-12 rounded-xl border-solid border-[1px]  border-slate-200 hover:border-slate-300 transition-all'
			>
				<Form.Item
					name='namespace_id'
					label='Namespace_id'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input maxLength={16} showCount />
				</Form.Item>
				<Form.Item
					name='data'
					label='Data'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input maxLength={200} showCount />
				</Form.Item>
				<Form.Item>
					<div className='flex justify-center gap-2'>
						<Button
							size='large'
							type='primary'
							htmlType='submit'
							loading={loading}
						>
							Submit
						</Button>
						<Button size='large' onClick={generateFields}>
							Generate
						</Button>
						<Button type='dashed' size='large' onClick={ClearFields}>
							Reset
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	)
}

export default SubmitPFB
