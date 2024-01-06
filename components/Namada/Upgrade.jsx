import { useContext, useRef } from 'react'
import Head from 'next/head'
import { Alert } from 'antd'

import projects from 'data/projects'
import styles from '@styles/Services.module.scss'
import { Context } from '@context/context'
import CodeBlock from '../UI/CodeBlock'
import AnimatedSection from '../AnimatedSection'

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
				<CodeBlock
					desc='Upgrade to v0.28.2'
					code={`cd $HOME
rm -rf namada 
git clone https://github.com/anoma/namada 
cd namada
wget https://github.com/anoma/namada/releases/download/v0.28.2/namada-v0.28.2-Linux-x86_64.tar.gz
tar -xvf namada-v0.28.2-Linux-x86_64.tar.gz
rm namada-v0.28.2-Linux-x86_64.tar.gz
cd namada-v0.28.2-Linux-x86_64
sudo mv namada namadan namadac namadaw /usr/local/bin/
sudo systemctl restart namadad && sudo journalctl -u namadad -f`}
				></CodeBlock>
				{/* <Alert
					className='my-2'
					message='If your node halt, try the following steps. If not, ignore it.'
					type='warning'
					showIcon
				/>
				<CodeBlock
					desc='Stop node and delete tx_wasm_cache vp_wasm_cache'
					code={`sudo systemctl stop namadad
cd \${BASE_DIR}/public-testnet-14.5d79b6958580
rm -rf tx_wasm_cache vp_wasm_cache`}
				/>
				<CodeBlock
					desc='Update service file'
					code={`sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=namada
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$BASE_DIR
Environment=CMT_LOG_LEVEL=p2p:none,pex:error
Environment=NAMADA_CMT_STDOUT=true
Environment=NAMADA_LOG=info
ExecStart=$(which namada) node ledger run
StandardOutput=syslog
StandardError=syslog
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
				/>
				<CodeBlock
					desc='Enable and restart service'
					code={`sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad && sudo journalctl -u namadad -f`}
				/> */}
			</div>
		</AnimatedSection>
	)
}

export default Upgrade
