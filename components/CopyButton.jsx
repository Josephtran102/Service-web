import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import styles from '@styles/CodeSnippet.module.scss'
import copy from 'clipboard-copy'
import { useState } from 'react'

const CopyButton = ({ code, theme }) => {
	const [isClicked, setIsClicked] = useState(false)

	const handleCopyClick = () => {
		copy(code)
		setIsClicked(true)
		setTimeout(() => {
			setIsClicked(false)
		}, 2500)
	}

	return (
		<div
			className={styles.copyButton}
			style={{
				backgroundColor: theme == 'dark' ? '#222' : '#fff',
				borderColor: isClicked ? '#03C04A' : '#8181816a'
			}}
		>
			{isClicked ? <CheckOutlined style={{ color: '#03C04A' }} /> : <CopyOutlined onClick={handleCopyClick} />}
		</div>
	)
}

export default CopyButton
