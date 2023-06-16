import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import { getAdminLayout } from '@layouts/admin'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, Input, Skeleton } from 'antd'
import { useRouter } from 'next/router'

const type = 'mainnet'
const { TextArea } = Input

const Project = ({ project }) => {
	const router = useRouter()
	const [currentProject, setCurrentProject] = useState()
	const [projects, setProjects] = useState()
	const [loading, setLoading] = useState(true)
	const id = project.id
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
	}, [router])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/github/read')
				setCurrentProject(response.data[type][id])
				setProjects(response.data)
				form.setFieldsValue(response.data[type][id])
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}

		fetchData()
	}, [])

	const updateProject = (type, projectName, newData) => {
		setProjects(prevProjects => {
			let updatedProjects = { ...prevProjects }
			let updatedTypeProjects = { ...updatedProjects[type] }

			updatedTypeProjects[projectName] = newData
			updatedProjects[type] = updatedTypeProjects

			return updatedProjects
		})
	}

	const onFinish = async values => {
		console.log(values)
		updateProject('mainnet', id, values)
		try {
			const response = await axios.post('/api/github/update', projects)

			if (response.status === 200) {
				alert('Update successful')
			} else {
				alert('Update failed')
			}
		} catch (error) {
			alert(error)
		}
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<h1 className='text-xl md:text-3xl font-semibold m-2 tracking-tight '>
				{id.charAt(0).toUpperCase() + id.slice(1)}:{' '}
				<span className={`${type === 'mainnet' ? 'text-orange-500' : 'text-green-500'}`}>{type}</span>
			</h1>
			{loading ? (
				<Skeleton active />
			) : (
				<Form
					form={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='on'
					layout='horizontal'
					labelCol={{ span: 3 }}
					className=' min-w-[60vw] lg:min-w-[35vw] bg-white dark:bg-zinc-900 p-3 md:p-8 rounded-xl border-solid border-[1px]  border-slate-200 hover:border-slate-300 transition-all'
				>
					{Object.entries(currentProject)
						.sort()
						.map(([field, value]) => (
							<Form.Item label={field} name={field} key={field}>
								<TextArea
									autoSize={{
										minRows: 1,
										maxRows: 6
									}}
								/>
							</Form.Item>
						))}

					<Form.Item>
						<div className='flex justify-center gap-4'>
							<Button type='primary' htmlType='submit' className='min-w-[20%]'>
								Submit
							</Button>
						</div>
					</Form.Item>
				</Form>
			)}
		</>
	)
}

export async function getStaticPaths() {
	const paths = generateProjectPaths(type)
	return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
	const projects = getProjects(type)
	const project = projects.find(p => p.id === params.projectName)
	return { props: { project }, revalidate: 1 }
}

Project.getLayout = getAdminLayout
export default Project
