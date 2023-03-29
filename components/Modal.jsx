import Backdrop from './Backdrop'
import styles from '@styles/Modal.module.scss'
import { useEffect, useState } from 'react'

const Modal = ({ handleClose, text, theme }) => {
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		setTimeout(() => {
			setOpacity(() => 1)
		}, 800)
	}, [])

	return (
		<Backdrop>
			<div
				className={styles.modal}
				style={{
					backgroundColor:
						theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(38,38,38)',
					color: theme === 'light' ? '#000' : '#fff',
				}}
			>
				<div>{text}</div>
				<button
					onClick={handleClose}
					className={styles.exit}
					style={{
						opacity: opacity,
					}}
				>
					x
				</button>
			</div>
		</Backdrop>
	)
}

export default Modal
