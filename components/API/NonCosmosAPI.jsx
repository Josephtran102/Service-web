import { useContext, useRef } from 'react'
import { Context } from '@context/context'
import projects from 'data/projects'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/UI/CodeSnippet.jsx'
import Head from 'next/head'
import AnimatedSection from '../AnimatedSection'
import { Alert } from 'antd'
import CodeBlock from '@components/UI/CodeBlock'

const NonCosmosAPI = ({ name, type }) => {
	const project = projects[type][name]
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { timesyncd, dependencies, rustCargo, goVersion, docker, dockerCompose, security, upgrade, deleteNode } =
		project
	const {
		installBin1,
		installBin2,
		installBin3,
		installBin4,
		installBin5,
		installBin6,
		installBin7,
		installBin8,
		installBin9,
		installBin10
	} = project
	const {
		installTitle1,
		installTitle2,
		installTitle3,
		installTitle4,
		installTitle5,
		installTitle6,
		installTitle7,
		installTitle8,
		installTitle9,
		installTitle10
	} = project
	const updHeight = project?.updHeight
	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const elements = []
	for (let i = 1; i <= 10; i++) {
		let bin = project[`installBin${i}`]
		let title = project[`installTitle${i}`]
		if (bin && bin !== 'false') {
			elements.push(<CodeBlock desc={`${title}`} code={`${bin}`} />)
		}
	}

	return (
		<AnimatedSection>
			<Head>
				<title>{`${projectName} - Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<p className='flex flex-wrap items-center gap-2 pb-2'>
					<a href={project.offValDoc} target='_blank' rel='nofollow'>
						Official Documentation
					</a>
					<span className='divider-vertical' />
					<span> Recommended Hardware: {project.hardware}</span>
				</p>
				<h2 id='installation'>Installation 🛠️</h2>
				{timesyncd === 'true' && (
					<CodeSnippet
						code={`# enable and start timesyncd (if needed)
sudo systemctl unmask systemd-timesyncd
sudo apt install systemd-timesyncd
sudo systemctl enable systemd-timesyncd
sudo systemctl start systemd-timesyncd
timedatectl status`}
					/>
				)}
				{dependencies && dependencies !== 'false' && (
					<CodeSnippet
						code={`# update system tools (if needed)
sudo apt update && sudo apt upgrade -y
${dependencies}`}
					/>
				)}
				{rustCargo === 'true' && (
					<CodeSnippet
						code={`# install Rust and Cargo
apt install curl -y
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# press 1
sudo apt install cargo -y
source ~/.cargo/env 
rustup update stable`}
					/>
				)}
				{goVersion && (
					<CodeSnippet
						code={`# install Go (if needed)
cd $HOME
! [ -x "$(command -v go)" ] && {
VER="1.19.3"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source $HOME/.bash_profile
}
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin`}
					/>
				)}
				{docker === 'true' && (
					<CodeSnippet
						code={`# install Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install docker-ce
docker version`}
					/>
				)}
				{dockerCompose === 'true' && (
					<CodeSnippet
						code={`# install Docker Compose
# download release
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# set the correct permissions
sudo chmod +x /usr/local/bin/docker-compose
# verify installation
docker-compose --version`}
					/>
				)}
				{elements}

				{security && security !== 'false' && (
					<>
						<h2 id='security'>Security</h2>
						<CodeSnippet code={`${security}`} />
					</>
				)}
				{upgrade && upgrade !== 'false' && <h2 id='upgrade'>Upgrade</h2>}
				{updHeight && updHeight !== 0 && (
					<>
						<Alert
							message={`Upgrade height: ${updHeight}. Please, don\`t upgrade before the specified height.`}
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
				{upgrade && upgrade !== 'false' && <CodeSnippet code={`${upgrade}`} />}

				{deleteNode && deleteNode !== 'false' && (
					<>
						<h2 id='delete'>Delete</h2>
						<CodeSnippet code={`${deleteNode}`} />
					</>
				)}
			</div>
		</AnimatedSection>
	)
}

export default NonCosmosAPI
