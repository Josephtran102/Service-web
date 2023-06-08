import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = async event => {
		event.preventDefault()
		try {
			const res = await axios.post('/api/login', { email, password })
			Cookies.set('token', res.data.token) // Store the token in a cookie
			alert('Login successful!')
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={login}>
				<input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}
