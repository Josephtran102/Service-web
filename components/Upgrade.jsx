import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Alert } from 'antd'

import projects from 'data/projects'
import styles from '@styles/Services.module.scss'
import { Context } from '@context/context'
import CodeSnippet from './UI/CodeSnippet'
import AnimatedSection from './AnimatedSection'
import axios from 'axios'

const Upgrade = ({ name, type }) => {
	const project = projects[type][name]
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const bin = project.bin
	const path = project.path
	const installBin = project.newInstallBin
	const updHeight = project?.updHeight
	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const isBinEmpty = installBin === undefined
	const [upgradeID, setUpgradeID] = useState()

	const fetchLastUpgradeId = async () => {
		const baseUrl = `https://${name}-${type}-api.itrocket.net/cosmos/gov/v1`
		const alternativeUrl = `https://${name}-${type}-api.itrocket.net/cosmos/gov/v1beta1`

		try {
			let response = await tryFetch(baseUrl, 'v1')
			if (!response) {
				response = await tryFetch(alternativeUrl, 'v1beta1')
			}
			return { proposals: response?.data.proposals || [], version: response?.version }
		} catch (error) {
			console.log(error)
			return null
		}
	}

	const tryFetch = async (url, version) => {
		try {
			const response = await axios.get(`${url}/proposals`, {
				params: {
					'pagination.limit': 20,
					'pagination.count_total': true,
					'pagination.reverse': true
				}
			})
			return response ? { data: response.data, version } : null
		} catch {
			return null
		}
	}

	const setFormattedUpgradeID = (id, version) => {
		const formattedLink = `https://${name}-${type}-api.itrocket.net/cosmos/gov/${version}/proposals/${id}`
		setUpgradeID(() => formattedLink)
	}

	useEffect(() => {
		fetchLastUpgradeId().then(({ proposals, version }) => {
			if (proposals) {
				for (const proposal of proposals) {
					console.log(proposal)
					const isUpgrade =
						proposal?.messages?.[0]?.hasOwnProperty('plan') ||
						proposal?.content?.hasOwnProperty('plan') ||
						proposal?.messages?.[0]?.content?.hasOwnProperty('plan')

					if (isUpgrade) {
						const id = proposal.id || proposal.proposal_id
						setFormattedUpgradeID(id, version)
						break
					}
				}
			}
		})
	}, [])

	let indexOfMv, mvLine, newPath, beforeMv
	if (!isBinEmpty) {
		indexOfMv = installBin
			.split('\n')
			.findIndex(line => line.trim().startsWith('mv') || line.trim().startsWith('sudo mv'))
		mvLine = installBin.split('\n').find(line => line.trim().startsWith('sudo mv'))

		newPath = indexOfMv !== -1 ? mvLine.split(' ')[2] : ''
		beforeMv = installBin.split('\n').slice(0, indexOfMv).join('\n')
		beforeMv = beforeMv.split('\n').join(' && \\\n')
		beforeMv = beforeMv + ' && \\\n'
	}

	return (
		<AnimatedSection>
			<Head>
				<title>{`Upgrade - ${projectName} | Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>
			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<></>
				{!updHeight ? (
					<p style={{ marginBlock: '8px' }}>Project has no upgrades yet</p>
				) : (
					<>
						{updHeight == 0 ? (
							''
						) : (
							<>
								<Alert
									message={`Upgrade height: ${updHeight}. Please don\`t upgrade before the specified height.`}
									type='info'
									showIcon
									closable
									style={{
										width: 'fit-content',
										marginTop: '10px',
										marginBottom: '-5px'
									}}
								/>
								<p className='flex items-center gap-2'>
									<span></span>
								</p>
							</>
						)}
						<h2 id='manual'>Manual upgrade</h2>
						<p className={styles.text_secondary}></p>
						<CodeSnippet
							theme={theme}
							code={`${installBin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
						{updHeight == 0 || indexOfMv === -1 ? (
							''
						) : (
							<>
								<h2 id='auto'>Auto upgrade</h2>
								<Alert
									message={
										<p>
											Don't kill the session with{' '}
											<kbd className={`${styles.kbd} dark:bg-slate-600`}>CTRL+C</kbd> before update is
											completed, if you want to disconnect the session use{' '}
											<kbd className={`${styles.kbd} dark:bg-slate-600`}>CTRL+B D</kbd>{' '}
										</p>
									}
									type='warning'
									showIcon
									closable
									style={{
										width: 'fit-content',
										marginBlock: '5px'
									}}
								/>
								<CodeSnippet
									theme={theme}
									code={`${beforeMv}old_bin_path=$(which ${bin}) && \\
home_path=$HOME && \\
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]+' "$HOME/${path}/config/config.toml" | cut -d ':' -f 3) && \\
tmux new -s ${name}-upgrade "sudo bash -c 'curl -s https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/autoupgrade/upgrade.sh | bash -s -- -u \\"${updHeight}\\" -b ${bin} -n \\"${newPath}\\" -o \\"$old_bin_path\\" -h \\"$home_path\\" -p \\"${upgradeID}\\" -r \\"$rpc_port\\"'"`}
								/>
							</>
						)}
					</>
				)}
			</div>
		</AnimatedSection>
	)
}

export default Upgrade
