import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const register = async event => {
		event.preventDefault()
		try {
			const res = await axios.post('/api/register', { email, password })
			router.push('/login')
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={register}>
				<input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	)
}
