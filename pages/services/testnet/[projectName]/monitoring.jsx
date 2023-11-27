import { useRouter } from 'next/router'
import { Alert, Divider, Typography } from 'antd'
const { Paragraph } = Typography

import { getLayout } from '@layouts/dashboard'
import styles from '@styles/Services.module.scss'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import { useContext } from 'react'
import { Context } from '@context/context'
import CodeBlock from '@components/UI/CodeBlock'
import CodeSnippet from '@components/UI/CodeSnippet'
import Head from 'next/head'

const type = 'testnet'

const MonitoringPage = () => {
	const router = useRouter()
	const { projectName } = router.query
	const { theme } = useContext(Context)

	return (
		<div
			className={styles.mainColumn}
			id='mainColumn'
			style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
		>
			<Head>
				<title>{`Monitoring - ${projectName} | Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>
			<h2 id='monitoring'>Node Monitoring Script</h2>
			<Paragraph className='!mb-4'>
				<ul>
					<li>Tracks validator status: missed blocks, voting power, and sends alerts.</li>
					<li>Compares block height with an external server and restarts when significantly out of sync.</li>
					<li>Checks node status, restarts if unresponsive.</li>
					<li>Sends alerts and status updates via Telegram. </li>
				</ul>
			</Paragraph>
			<div className='flex flex-col gap-y-2'>
				<CodeBlock
					desc='Download namada.sh file:'
					code={`cd $HOME
rm -rf $HOME/monitoring
mkdir $HOME/monitoring
cd $HOME/monitoring
wget -O namada.sh https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/namada/monitoring/namada.sh
chmod +x namada.sh`}
				/>
				<h3 className='flex items-center'>
					<span
						className='inline-block h-3 w-3 lg:h-5 lg:w-5 align-top m-1 mr-2'
						aria-hidden='true'
						style={{ background: "center / contain url('/icons/tg.svg')  no-repeat" }}
					></span>
					Configure Telegram alerting:
				</h3>
				<div className='mb-2'>
					Open Telegram and find{' '}
					<a href='https://t.me/BotFather' target='_blank' rel='noopener noreferrer'>
						@BotFather
					</a>
					<ul>
						<li>Create telegram bot via @BotFather, customize it and get bot API token</li>
						<li>
							Create the group: alarm. Customize them, add the bot in your chat and get chats IDs:{' '}
							<a
								href='https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id'
								target='_blank'
								rel='noopener noreferrer'
							>
								how to do it
							</a>
						</li>
						<li>Open namada.sh file</li>
					</ul>
					<span className='font-semibold'>change ENABLE=false to ENABLE=true</span>
				</div>
				<h3>
					Specify your node <kbd className={`${styles.kbd} dark:bg-slate-600`}>RPC_SERVER</kbd>,
					<kbd className={`${styles.kbd} dark:bg-slate-600`}>TELEGRAM_CHAT_ID</kbd>
					and <kbd className={`${styles.kbd} dark:bg-slate-600`}>TELEGRAM_BOT_TOKEN</kbd>:
				</h3>
				<Paragraph>
					<blockquote className='!m-0'>
						Configure correct Namada node port - RPC_SERVER. <br /> Customize TELEGRAM_CHAT_ID and
						TELEGRAM_BOT_TOKEN. <br /> Configure BLOCK_GAP_ALARM and allow RESTART function if needed.{' '}
					</blockquote>
				</Paragraph>

				<CodeSnippet code={`nano namada.sh`} />
				<h3>Create a new tmux session:</h3>
				<CodeSnippet
					code={`cd $HOME
tmux new -s monitoring`}
				/>
				<h3>Start monitoring script:</h3>
				<CodeBlock
					desc='Finally, start the Namada node monitoring script:'
					code={`cd $HOME/monitoring
sudo /bin/bash namada.sh`}
				/>
			</div>
			<Alert
				className='!mb-4'
				message={
					<p>
						Don't stop process with <kbd className={`${styles.kbd} dark:bg-slate-600`}>CTRL+C</kbd>, if you
						want to disconnect the session use{' '}
						<kbd className={`${styles.kbd} dark:bg-slate-600`}>CTRL+B D</kbd>. If you want to kill session
						use <kbd className={`${styles.kbd} dark:bg-slate-600`}>CTRL+B C</kbd>
					</p>
				}
				type='warning'
				showIcon
				style={{
					width: 'fit-content',
					marginBlock: '5px'
				}}
			/>
			<Paragraph>
				<blockquote className='!m-0'>If you want to connect disconnected session use:</blockquote>
			</Paragraph>
			<CodeSnippet code='tmux attach -t monitoring' />
		</div>
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

MonitoringPage.getLayout = getLayout
export default MonitoringPage
