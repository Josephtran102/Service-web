import { getAdminLayout } from '@layouts/admin'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Skeleton, Select } from 'antd'
import { useRouter } from 'next/router'
import fieldNames from '@data/uniqueFieldNames'
import cosmosFields from '@data/cosmosFields.json'
import nonCosmosFields from '@data/nonCosmosFields.json'
import { getFreePort } from '@utils/projectUtils'

const type = 'testnet'
const { TextArea } = Input

const Project = () => {
	const router = useRouter()
	const [id, setId] = useState()
	const [fields, setFields] = useState()
	const projectsRef = useRef()
	const [loading, setLoading] = useState(true)
	const [form] = Form.useForm()

	useEffect(() => {
		const verifyAdmin = async () => {
			try {
				const res = await axios.get('/api/verify-admin')
				if (!res.data.isAdmin) {
					router.push('/login')
				}
			} catch (err) {
				console.log(err)
				router.push('/login')
			}
		}
		verifyAdmin()

		const fetchData = async () => {
			try {
				const response = await axios.get('/api/github/read')
				projectsRef.current = response.data
				setFields(cosmosFields)
				form.setFieldsValue(cosmosFields)
				form.setFieldsValue({
					port: getFreePort()
				})
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [router])

	const updateProject = (type, projectName, newData) => {
		let updatedProjects = { ...projectsRef.current }
		let updatedTypeProjects = { ...updatedProjects[type] }

		updatedTypeProjects[projectName] = newData
		updatedProjects[type] = updatedTypeProjects
		updatedProjects[type] = Object.fromEntries(Object.entries(updatedProjects[type]).sort())

		projectsRef.current = updatedProjects
	}

	const onFinish = async values => {
		const userFields = {}
		if (values.userFields) {
			values.userFields.forEach(field => {
				userFields[field.name] = field.value
			})
		}

		const newValues = { ...values, ...userFields }
		delete newValues.userFields

		updateProject(`${type}`, id, newValues)
		console.log(projectsRef.current)

		try {
			const response = await axios.post('/api/github/update', projectsRef.current)

			if (response.status === 200) {
				alert('Update successful')
			} else {
				alert('Update failed')
			}
		} catch (error) {
			alert(error)
		}
	}

	const handleName = e => {
		setId(e.target.value)
	}
	const handleEcosystemSelect = value => {
		if (value == 'false') {
			form.setFieldsValue(nonCosmosFields)
			setFields(nonCosmosFields)
		} else {
			form.setFieldsValue(cosmosFields)
			setFields(cosmosFields)
			form.setFieldsValue({
				port: getFreePort()
			})
		}
	}

	const removeField = fieldName => {
		Modal.confirm({
			title: 'Confirm delete',
			content: 'Are you sure you want to delete this field?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				form.setFieldsValue({
					[fieldName]: undefined
				})

				setCurrentProject(prevState => {
					const newState = { ...prevState }
					delete newState[fieldName]
					return newState
				})
			},
			onCancel() {
				console.log('Cancel')
			}
		})
	}

	return (
		<>
			{loading ? (
				<Skeleton active />
			) : (
				<>
					<p className='mt-2 mb-6'>
						<span className='text-lg '>1. Upload image: </span>
						<a
							href='https://github.com/itrocket-am/itrocket/upload/main/public/testnet'
							target='_blank'
							rel='noopener noreferrer'
							className='flex gap-2 mt-2 ml-1'
						>
							<span className='text-sky-500'>
								<UploadOutlined />
							</span>
							Upload image to<span className='text-green-500'>testnet</span> folder
						</a>
					</p>

					<p className='mt-3 mb-1 text-lg'>2. Enter network name:</p>
					<Input placeholder='Enter project name' onChange={handleName} className='mb-5' required />

					<p className='mt-3 mb-1 text-lg'>3. Choose network type:</p>
					<Select
						defaultValue='cosmos'
						style={{
							width: 120
						}}
						onChange={handleEcosystemSelect}
						options={[
							{
								value: 'cosmos',
								label: 'Cosmos'
							},
							{
								value: 'false',
								label: 'Non-Cosmos'
							}
						]}
					/>

					<Form
						form={form}
						onFinish={onFinish}
						autoComplete='on'
						layout='horizontal'
						className='min-w-[70vw] lg:min-w-[45vw] bg-white dark:bg-zinc-900 mt-3 p-3 md:p-7 rounded-xl border-solid border-[1px]  border-slate-200 hover:border-slate-300 transition-all'
					>
						{fields &&
							Object.entries(fields).map(([field, value]) => (
								<Space
									key={field}
									style={{ display: 'flex', marginBottom: 2, width: '100%', gap: '12px' }}
									align='start'
								>
									<Form.Item label={field} name={field} key={field}>
										<TextArea
											autoSize={{
												minRows: 1,
												maxRows: 6
											}}
											className='min-w-[50vw] lg:min-w-[40vw]'
										/>
									</Form.Item>
									<Button onClick={() => removeField(field)} icon={<DeleteOutlined />}></Button>
								</Space>
							))}
						<p className='mb-4 text-lg'>4. Add fields:</p>
						<Form.List name='userFields'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(field => (
										<Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align='start'>
											<Form.Item
												{...field}
												name={[field.name, 'name']}
												fieldKey={[field.fieldKey, 'name']}
												rules={[{ required: true, message: 'Missing field name' }]}
											>
												<Select
													placeholder='Select a field'
													onChange={value => form.setFieldsValue({ [field.name]: { name: value } })}
													allowClear
												>
													{fieldNames.map(fieldName => (
														<Select.Option key={fieldName} value={fieldName}>
															{fieldName}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												{...field}
												name={[field.name, 'value']}
												fieldKey={[field.fieldKey, 'value']}
												rules={[{ required: true, message: 'Missing field value' }]}
											>
												<Input placeholder='Field Value' />
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(field.name)} />
										</Space>
									))}
									<Form.Item>
										<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
											Add Field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Form.Item>
							<div className='flex justify-center gap-4'>
								<Button type='primary' htmlType='submit' className='min-w-[20%]'>
									Submit
								</Button>
							</div>
						</Form.Item>
					</Form>
				</>
			)}
		</>
	)
}

Project.getLayout = getAdminLayout
export default Project
