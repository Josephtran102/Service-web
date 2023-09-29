import { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import styles from '@styles/Accordion.module.scss'

const AccordionItem = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false)
	const [height, setHeight] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		setHeight(ref.current.scrollHeight)
	}, [isActive])

	return (
		<div className='rounded-md my-2 border-2 border-slate-500/10'>
			<div
				className={`bg-[#FAFAFA] dark:bg-zinc-900/60 w-full flex justify-between p-5 md:p-6 transition-all cursor-pointer ${
					isActive ? 'bg-transparent' : ''
				}`}
				onClick={() => setIsActive(!isActive)}
			>
				<h4 className={styles.button__heading}>{title}</h4>
				<span className={styles.button__heading}>
					{
						<PlusOutlined
							style={{
								transition: '0.3s !important',
								transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)'
							}}
						/>
					}
				</span>
			</div>
			<div
				ref={ref}
				className={styles.panel}
				style={isActive ? { maxHeight: `${height}px` } : { maxHeight: '0' }}
			>
				<p
					className='mx-5 md:mx-6 mt-4 mb-6 text-sm md:text-base transition'
					style={{ opacity: isActive ? 1 : 0 }}
				>
					{content}
				</p>
			</div>
		</div>
	)
}

const Accordion = () => {
	const accordionItems = [
		{
			title: 'About us',
			content: (
				<span>
					ITRocket is a team of DevOps engineers and Software Developers from Armenia{' '}
					<span
						className='inline-block h-5 w-5 align-top mx-1 lg:mt-[2px]'
						aria-hidden='true'
						style={{ background: "center / contain url('/icons/flag_am.svg')  no-repeat" }}
					></span>{' '}
					<br />
					We are crypto enthusiasts and node operators in various crypto ecosystems. Our main goal is to help
					millions of people effectively manage their crypto assets!
				</span>
			)
		},
		{
			title: 'What about reliability?',
			content: `We run nodes on dedicated servers in Europe, USA and Canada. Our team
        uses monitoring tools 24/7 with Prometheus metrics, Grafana dashboard
        and telegram bots alerting system.`
		},
		{
			title: 'What about security?',
			content: `We use ssh keys to login in our servers and disable password login and
        configure a firewall with a limited connection. All our keys are
        stored in a safe place and we are using a hardware key where it is
        possible. Our priority is security and reliability of your funds.`
		}
	]

	return (
		<div className='mt-7 md:mt-10'>
			{accordionItems.map((item, index) => (
				<AccordionItem key={index} title={item.title} content={item.content} />
			))}
		</div>
	)
}

export default Accordion
