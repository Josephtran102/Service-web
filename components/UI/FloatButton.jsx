import React, { useEffect, useState } from 'react'
import { UpOutlined } from '@ant-design/icons'
import { FloatButton as FloatButtonAntD } from 'antd'

const FloatButton = () => {
	const [visible, setVisible] = useState(false)
	const [lastScrollPos, setLastScrollPos] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset
			if (lastScrollPos > currentScrollPos) {
				setVisible(true)
			} else {
				setVisible(false)
			}
			setLastScrollPos(currentScrollPos)
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollPos])

	return visible ? <FloatButtonAntD.BackTop icon={<UpOutlined />} /> : null
}

export default FloatButton
