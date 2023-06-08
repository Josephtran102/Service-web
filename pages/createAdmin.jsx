import { useState } from 'react'
import axios from 'axios'

export default function CreateAdmin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const createAdmin = async event => {
		event.preventDefault()
		try {
			const res = await axios.post('/api/createAdmin', { email, password })
			alert('Admin created successfully!')
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<div>
			<h2>Create Admin</h2>
			<form onSubmit={createAdmin}>
				<input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit'>Create Admin</button>
			</form>
		</div>
	)
}
