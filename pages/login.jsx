import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Button, Checkbox, Form, Input } from 'antd'

import Header from '@components/Header'

export default function Login() {
	const router = useRouter()
	const [form] = Form.useForm()

	const onFinish = values => {
		const { email, password } = values
		login(email, password)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const ClearFields = () => {
		form.setFieldsValue({
			email: '',
			password: ''
		})
	}

	const login = async (email, password) => {
		try {
			const res = await axios.post('/api/login', { email, password })
			Cookies.set('token', res.data.token)
			router.push('/admin')
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<>
			<Header />

			<div className='flex flex-col gap-2 md:gap-4 justify-center items-center w-screen h-screen'>
				<h1 className='text-3xl font-bold mb-2 tracking-tight'>Login</h1>
				<Form
					form={form}
					initialValues={{
						remember: true
					}}
					size={'large'}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='on'
					layout='vertical'
					className='flex flex-col flex-wrap min-w-[70vw] lg:min-w-[35vw] bg-white dark:bg-zinc-900 p-12 rounded-xl border-solid border-[1px]  border-slate-200 hover:border-slate-300 transition-all'
				>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: 'Please input your email!'
							}
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!'
							}
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item name='remember' valuePropName='checked'>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item>
						<div className='flex justify-center gap-4'>
							<Button type='primary' htmlType='submit' className='min-w-[20%]'>
								Login
							</Button>
							<Button type='dashed' onClick={ClearFields}>
								Clear
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
