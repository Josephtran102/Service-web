import { useEffect, useRef, useState } from 'react'
import styles from '@styles/Accordion.module.scss'

const AccordionItem = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false)
	const [height, setHeight] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		setHeight(ref.current.scrollHeight)
	}, [isActive])

	return (
		<>
			<button className={styles.accordion} onClick={() => setIsActive(!isActive)}>
				<h5 className={styles.button__heading}>{title}</h5>
				<span className={styles.button__heading}>{isActive ? '+' : '-'}</span>
			</button>
			<div
				ref={ref}
				className={styles.panel}
				style={isActive ? { maxHeight: `${height}px` } : { maxHeight: '0' }}
			>
				<p className={styles.accordion__desc}>{content}</p>
			</div>
		</>
	)
}

const Accordion = () => {
	const accordionItems = [
		{
			title: 'About us',
			content: (
				<span>
					ITRocket is a team of DevOps engineers from Armenia{' '}
					<span
						className='inline-block h-5 w-5 align-top '
						aria-hidden='true'
						style={{ background: " center / contain url('/icons/flag_am.svg')  no-repeat" }}
					></span>{' '}
					. We are crypto enthusiasts & node operators in various crypto ecosystems. Our main goal is to
					help millions of people effectively manage their crypto assets!
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
		<div>
			{accordionItems.map((item, index) => (
				<AccordionItem key={index} title={item.title} content={item.content} />
			))}
		</div>
	)
}

export default Accordion
