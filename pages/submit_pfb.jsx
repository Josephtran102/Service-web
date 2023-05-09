import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { getRandomHex } from '@utils/getRandomHex'
import { submitData } from '@utils/pfb'
import { Form, Input, Button } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const SubmitPFB = () => {
	const [res, setRes] = useState('initial')
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async data => {
		setLoading(true)
		data = {
			...data,
			gas_limit: 80000,
			fee: 2000,
		}
		console.log(data)

		submitData(data).then(response => {
			setRes(JSON.stringify(response))
		})
		setLoading(false)
	}

	const generateFields = () => {
		form.setFieldsValue({
			namespace_id: getRandomHex(16),
			data: getRandomHex(40),
		})
	}

	const ClearFields = () => {
		form.setFieldsValue({
			namespace_id: '',
			data: '',
		})
	}

	useEffect(() => {
		generateFields()
	}, [])

	return (
		<div className='w-screen h-screen flex flex-wrap flex-col justify-center items-center'>
			<Head>
				<title>Celestia Submit PayForBlob - ITRocket</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
			</Head>

			<ParticlesBG />

			<h1 className='text-3xl font-bold mb-4 tracking-tight'>
				PayForBlob Transaction
			</h1>

			<Form
				form={form}
				onFinish={handleSubmit}
				style={{ minWidth: '40%' }}
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
			{res}
		</div>
	)
}

export default SubmitPFB
