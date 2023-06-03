let projects = {
	mainnet: {
		arkhadian: {
			chainID: 'arkh',
			delegate:
				'https://mainnet.itrocket.net/arkhadian/staking/arkhvaloper18u4es3gnjerdqw3u96pjdq6ukclysh3f9wfmqe',
			imgUrl: 'arkhadian.jpg',
			website: 'https://www.arkhadian.com/',
			offValDoc: '',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/arkhadian',
			binHome: '/home/arkhadian/go/bin/arkhd',
			snapMaxSize: '10',
			port: '27',
			VAR: 'ARKH',
			denom: 'arkh',
			ecosystem: 'cosmos',
			bin: 'arkhd',
			path: '.arkh',
			peerID: 'f3c163dc9c2649fe203bd87afd101869952e685a',
			seedID: '30d97270c31601c38e5b89c52fca985901cd8c20',
			peerPort: '27656',
			seedPort: '27656',
			installBin:
				'cd $HOME\nrm -rf arkh-blockchain\ngit clone https://github.com/vincadian/arkh-blockchain\ncd arkh-blockchain\ngit checkout v2.0.0\ngo build -o arkhd ./cmd/arkhd\nmv arkhd $HOME/go/bin',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		blastapi: {
			chainID: '',
			delegate: 'https://blastapi.io/explorer/0xf2d011008eb6d0574180d6a39d84bba230f554b9/2',
			imgUrl: 'blastapi.jpg',
			website: 'https://blastapi.io/',
			offValDoc: '',
			hardware: '',
			fav: true,
			prHome: '',
			binHome: '',
			snapMaxSize: '',
			port: '',
			VAR: '',
			denom: '',
			ecosystem: 'false',
			bin: '',
			path: '',
			peerID: '',
			seedID: '',
			explorer: 'https://blastapi.io/explorer',
			peerPort: '',
			seedPort: '',
			installBin: ``,
			updHeight: ``,
			newInstallBin: ``,
			goVersion: '',
			gas: '',
			unsafeReset: '',
			minGasPrice: ''
		},
		gitopia: {
			chainID: 'gitopia',
			delegate:
				'https://mainnet.itrocket.net/gitopia/staking/gitopiavaloper1nxse2wau7lm7utsc3mhrpyrh299lppm07ttm4k',
			imgUrl: 'gitopia.png',
			website: 'https://gitopia.com/',
			offValDoc: '',
			hardware: '8 Cores, 32GB RAM, 200GB of storage (NVME)',
			prHome: '/home/gitopia',
			binHome: '/home/gitopia/go/bin/gitopiad',
			snapMaxSize: '10',
			port: '43',
			VAR: 'GITOPIA',
			denom: 'ulore',
			ecosystem: 'cosmos',
			bin: 'gitopiad',
			path: '.gitopia',
			peerID: 'e5f3faef143c82f49bc506aea518e93ed4bb901f',
			seedID: 'fec95b3fa12a8b213b253d1f41014e2e8ac18ad4',
			peerPort: '43656',
			seedPort: '43656',
			installBin: `cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia/gitopia.git
cd gitopia
git checkout v2.1.0
make install`,
			updHeight: `0`,
			newInstallBin: `cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia/gitopia.git
cd gitopia
git checkout v2.1.0
make build
sudo mv $HOME/gitopia/build/gitopiad $(which gitopiad)`,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		humans: {
			chainID: 'humans_1089-1',
			delegate:
				'https://mainnet.itrocket.net/humans/staking/humanvaloper1rcu8a8spnuf5hl5n2752la6s9kcjg09e74lal3',
			imgUrl: 'humans.jpg',
			website: 'https://humans.ai/',
			offValDoc: 'https://github.com/humansdotai/mainnets/tree/main/mainnet/1',
			hardware: '6 Cores, 32GB RAM, 500GB of storage (NVME)',
			prHome: '/home/humans',
			binHome: '/home/humans/go/bin/humansd',
			snapMaxSize: '3',
			port: '17',
			VAR: 'HUMANS',
			denom: 'aheart',
			ecosystem: 'cosmos',
			bin: 'humansd',
			path: '.humansd',
			peerID: '5e51671241340f1d1e1409a9e0cc4474820bf782',
			seedID: 'f8006da7d742777eeca0194b94586c8f147be4f6',
			peerPort: '17656',
			seedPort: '17656',
			evmRpc: `https://humans-mainnet-evm.itrocket.net:443`,
			installBin: `cd $HOME
rm -rf humans
git clone https://github.com/humansdotai/humans
cd humans && git checkout tags/v1.0.0
make install`,
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--fees 4000000000000000aheart',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		nym: {
			chainID: '',
			name: 'NYM',
			explorer: 'https://mixnet.explorers.guru/',
			ecosystem: 'false',
			imgUrl: 'nym.png',
			delegate: 'https://mixnet.explorers.guru/mixnode/6L1geN6S9n7SMvgajjptj6p96sCSMfxWmbR8dJ3G3f5',
			fav: true,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0',
			website: 'https://nymtech.net/'
		},
		nois: {
			chainID: 'nois-1',
			imgUrl: 'nois.png',
			delegate:
				'https://mainnet.itrocket.net/nois/staking/noisvaloper19yul78yu9jzay9afsyjgmv0pk0k5rl80sa6vlx',
			desc: 'Brings random beacons to Cosmos blockchains without compromising security or usability by leveraging drand and IBC.',
			website: 'https://nois.network/',
			offValDoc: 'https://docs2.nois.network/mainnet.html',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/nois',
			binHome: '/home/nois/go/bin/noisd',
			snapMaxSize: '10',
			port: '36',
			VAR: 'NOIS',
			denom: 'unois',
			ecosystem: 'cosmos',
			bin: 'noisd',
			path: '.noisd',
			peerID: '22ec344512fc679e16eb358284e0d1eaa4291194',
			seedID: 'c8db99691545545402a1c45fa897f3cb1a05aea6',
			peerPort: '36656',
			seedPort: '36656',
			updHeight: '',
			installBin:
				'cd $HOME\nrm -rf $HOME/noisd\ngit clone https://github.com/noislabs/noisd\ncd noisd\ngit checkout v1.0.0\nmake install',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		terp: {
			chainID: 'morocco-1',
			imgUrl: 'terp.jpg',
			delegate:
				'https://mainnet.itrocket.net/terp/staking/terpvaloper1u9nx0mxq30h6dq99w6ptju09pz3m32jxz4672f',
			desc: 'Decentralized Infrastructure for the Cannabis Community',
			website: 'https://terp.network/',
			offValDoc: 'https://github.com/terpnetwork/mainnet/tree/main/morocco-1',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/terp',
			binHome: '/home/terp/go/bin/terpd',
			snapMaxSize: '10',
			port: '13',
			VAR: 'TERP',
			denom: 'uterp',
			ecosystem: 'cosmos',
			bin: 'terpd',
			path: '.terp',
			peerID: 'a81dc3bf1bb1c3837b768eeb82659eecc971890b',
			seedID: 'd8256642afae77264bcce1631d51233a9d00249b',
			peerPort: '13656',
			seedPort: '13656',
			updHeight: '',
			installBin:
				'cd $HOME\nrm -rf ~/terp-core\ngit clone https://github.com/terpnetwork/terp-core.git\ncd terp-core\ngit checkout v1.0.0\nmake install',
			goVersion: '1.19.3',
			gas: '--gas 210000 --fees 200000uthiol',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		forta: {
			explorer: 'https://explorer.forta.network/',
			imgUrl: 'forta.jpg',
			delegate: 'https://app.forta.network/nodePool/211/',
			ecosystem: 'false',
			fav: true,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		quicksilver: {
			chainID: 'quicksilver-2',
			delegate:
				'https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x',
			imgUrl: 'quicksilver.jpg',
			desc: 'Quicksilver is a permissionless, sovereign Cosmos SDK zone providing liquid staking for the entire Cosmos Ecosystem.',
			website: 'https://quicksilver.zone/',
			offValDoc: 'https://github.com/ingenuity-build/mainnet',
			hardware: '4 Cores, 16GB RAM, 500GB of storage (NVME)',
			prHome: '/home/quick',
			binHome: '/home/quick/go/bin/quicksilverd',
			snapMaxSize: '10',
			port: '15',
			VAR: 'QUICKSILVER',
			denom: 'uqck',
			ecosystem: 'cosmos',
			bin: 'quicksilverd',
			path: '.quicksilverd',
			peerID: '4559f4c24037bfad4791b2a6d6d5c769a16cad53',
			seedID: '3b3c0037090a1b5ef9f7ac58ff79f33dffdd188a',
			peerPort: '15656',
			seedPort: '15656',
			installBin:
				'cd $HOME\nrm -rf ~/quicksilver\ngit clone https://github.com/ingenuity-build/quicksilver\ncd quicksilver\ngit fetch\ngit checkout v1.2.13.pebble-db\nmake install',
			updHeight: '0',
			newInstallBin: `cd $HOME
wget https://github.com/ingenuity-build/quicksilver/releases/download/v1.2.13/quicksilverd-v1.2.13-amd64
chmod +x quicksilverd-v1.2.13-amd64
sudo mv quicksilverd-v1.2.13-amd64 $(which quicksilverd)`,
			goVersion: '1.19.3',
			gas: '',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		realio: {
			chainID: 'realionetwork_3301-1',
			delegate:
				'https://mainnet.itrocket.net/realio/staking/realiovaloper1479d25uzwf529kxh9dxme64xlv89c4un676emc',
			imgUrl: 'realio.png',
			desc: 'The Future of Private Equity is Digital',
			website: 'https://www.realio.fund/',
			offValDoc: 'https://github.com/realiotech/mainnet/tree/main/realionetwork_3301-1',
			hardware: '4 Cores, 8GB RAM, 240GB of storage (NVME)',
			prHome: '/home/realio',
			binHome: '/home/realio/go/bin/realio-networkd',
			snapMaxSize: '10',
			port: '23',
			VAR: 'REALIO',
			denom: 'ario',
			ecosystem: 'cosmos',
			bin: 'realio-networkd',
			path: '.realio-network',
			peerID: '2815cc1437461f808a7f022c0df679fa27918dbc',
			seedID: 'a5039f260cd848facfbe7fbe62bf3e8adfce9c98',
			peerPort: '23656',
			seedPort: '23656',
			installBin:
				'cd $HOME\nrm -rf realio-network\ngit clone https://github.com/realiotech/realio-network.git\ncd realio-network\ngit checkout tags/v0.8.1\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		uptick: {
			chainID: 'uptick_117-1',
			delegate:
				'https://mainnet.itrocket.net/uptick/staking/uptickvaloper1dx5sfmg4ascplvmkn39stq3rgk0c3vhpv6ysd0',
			fav: true,
			imgUrl: 'uptick.jpg',
			desc: 'The Business Grade Multi-Chain NFT Infrastructure for Web 3.0',
			website: 'https://uptick.network/',
			offValDoc: 'https://docs.uptick.network/mainnet/',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/uptick',
			binHome: '/home/uptick/go/bin/uptickd',
			snapMaxSize: '10',
			port: '35',
			VAR: 'UPTICK',
			denom: 'auptick',
			ecosystem: 'cosmos',
			bin: 'uptickd',
			path: '.uptickd',
			peerID: 'dd482d080820020b144ca2efaf128d78261dea82',
			seedID: 'e71bae28852a0b603f7360ec17fe91e7f065f324',
			peerPort: '10656',
			seedPort: '35656',
			installBin:
				'cd $HOME\nrm -rf uptick\ngit clone https://github.com/UptickNetwork/uptick.git\ncd uptick\ngit checkout v0.2.4\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas 250000 --fees 3000000000000000auptick',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		}
	},
	testnet: {
		andromeda: {
			chainID: 'galileo-3',
			imgUrl: 'andromeda.svg',
			desc: 'Andromeda is an application platform layer that connects all public blockchains in the Cosmos ecosystem. Through our vast library of no-code smart contracts, users can harness the power of web3.',
			website: 'https://andromedaprotocol.io/',
			offValDoc: '',
			hardware: '16 Cores, 32GB RAM, 500GB of storage (NVME)',
			prHome: '/home/andromeda',
			binHome: '/home/andromeda/go/bin/andromedad',
			snapMaxSize: '10',
			port: '30',
			VAR: 'ANDROMEDA',
			denom: 'uandr',
			ecosystem: 'cosmos',
			bin: 'andromedad',
			path: '.andromedad',
			peerID: '239eeebb9c4c32f5ca91b22322fed2486aee01b5',
			seedID: '5cfce64114f98e29878567bdd1adbebe18670fc6',
			peerPort: '29656',
			seedPort: '30656',
			installBin:
				'cd $HOME\nrm -rf andromedad\ngit clone https://github.com/andromedaprotocol/andromedad.git\ncd andromedad\ngit checkout galileo-3-v1.1.0-beta1\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		archway: {
			chainID: 'constantine-3',
			imgUrl: 'archway.jpg',
			desc: '',
			website: 'https://archway.io/',
			offValDoc: '',
			hardware: '8 Cores, 16GB RAM, 200GB of storage (NVME)',
			prHome: '/home/archway',
			binHome: '/home/archway/go/bin/archwayd',
			snapMaxSize: '10',
			port: '45',
			VAR: 'ARCHWAY',
			denom: 'aconst',
			ecosystem: 'cosmos',
			bin: 'archwayd',
			path: '.archway',
			peerID: '3591dd903e95c9b25618f90c4a6bda63861ab8ec',
			seedID: '958d9056c6173edb4714b6468bda509e97d0c80c',
			peerPort: '45656',
			seedPort: '45656',
			installBin: `cd $HOME
rm -rf archway
git clone https://github.com/archway-network/archway.git
cd archway
git checkout v0.5.2
make install`,
			updHeight: '300331',
			newInstallBin: `cd $HOME
rm -rf archway
git clone https://github.com/archway-network/archway.git
cd archway
git checkout v0.6.0
make build
sudo mv $HOME/archway/build/archwayd $(which archwaid)`,
			goVersion: '1.19.3',
			gas: '--fees 180000000000000000aconst',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		cardchain: {
			chainID: 'Testnet3',
			imgUrl: 'cardchain.png',
			cardchain: true,
			desc: 'On Crowd Control you can create and design your own trading cards. Your Cards become a part of the game for everyone.',
			website: 'https://crowdcontrol.network/',
			offValDoc: 'https://github.com/DecentralCardGame/Testnet',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/cardchain',
			binHome: '/usr/local/bin/Cardchaind',
			snapMaxSize: '10',
			port: '31',
			VAR: 'CARDCHAIN',
			denom: 'ubpf',
			ecosystem: 'cosmos',
			bin: 'Cardchaind',
			path: '.Cardchain',
			peerID: '99dcfbba34316285fceea8feb0b644c4dc67c53b',
			seedID: '947aa14a9e6722df948d46b9e3ff24dd72920257',
			peerPort: '31656',
			seedPort: '31656',
			installBin:
				'cd $HOME\nwget https://github.com/DecentralCardGame/Cardchain/releases/download/v0.81/CARDCHAIN_latest_linux_amd64.tar.gz\ntar xzf CARDCHAIN_latest_linux_amd64.tar.gz\nchmod 775 Cardchaind\nsudo mv Cardchaind /usr/local/bin\nsudo rm CARDCHAIN_latest_linux_amd64.tar.gz',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		cascadia: {
			chainID: 'cascadia_6102-1',
			imgUrl: 'cascadia.png',
			desc: '',
			website: 'https://www.cascadia.foundation/',
			offValDoc: 'https://cascadia.gitbook.io/gitbook/network/configuration',
			hardware: '4 Cores, 8GB RAM, 300GB of storage (NVME)',
			prHome: '/home/cascadia',
			binHome: '/home/cascadia/go/bin/cascadiad',
			snapMaxSize: '10',
			port: '40',
			VAR: 'CASCADIA',
			denom: 'aCC',
			ecosystem: 'cosmos',
			bin: 'cascadiad',
			path: '.cascadiad',
			peerID: 'c6e3921222655345d8296353994e917f13a1b4a1',
			seedID: '42c4a78f39935df1c20b51c4b0d0a21db8f01c88',
			peerPort: '40656',
			seedPort: '40656',
			newExecStart: `$(which cascadiad) start --home $HOME/.cascadiad --trace --log_level info --json-rpc.api eth,txpool,personal,net,debug,web3 --api.enable`,
			installBin:
				'cd $HOME\nrm -rf cascadia\ngit clone https://github.com/cascadiafoundation/cascadia\ncd cascadia\ngit checkout v0.1.2\nmake install',
			updHeight: '',
			newInstallBin: ``,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5 --gas-prices=7aCC',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.025'
		},
		celestia: {
			chainID: 'blockspacerace-0',
			imgUrl: 'celestia.png',
			fav: true,
			desc: 'Celestia is the first modular blockchain network. It is a modular consensus and data network, built to enable anyone to easily deploy their own blockchain with minimal overhead.',
			website: 'https://celestia.org/',
			offValDoc: 'https://docs.celestia.org/nodes/overview/',
			hardware: '4 Cores, 8GB RAM, 250GB of storage (NVME)',
			prHome: '/home/celestia',
			binHome: '/home/celestia/go/bin/celestia-appd',
			snapMaxSize: '10',
			port: '11',
			VAR: 'CELESTIA',
			denom: 'utia',
			ecosystem: 'cosmos',
			bin: 'celestia-appd',
			path: '.celestia-app',
			peerID: '193acd7bf7049b425d7b95c24e02250fce8ad45c',
			seedID: 'fedea9723696360d429a23792225594779cc7cd7',
			peerPort: '11656',
			seedPort: '11656',
			installBin:
				'cd $HOME \nrm -rf celestia-app \ngit clone https://github.com/celestiaorg/celestia-app.git \ncd celestia-app/ \nAPP_VERSION=v0.13.2 \ngit checkout tags/$APP_VERSION -b $APP_VERSION \nmake install\ncd $HOME\nrm -rf networks\ngit clone https://github.com/celestiaorg/networks.git',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.20.1',
			gas: '',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		defund: {
			chainID: 'orbit-alpha-1',
			imgUrl: 'defund.png',
			desc: 'DeFund is an L1 blockchain built for building decentralized permissionless, on-chain trading strategies that are packaged into a dETF (decentralized exchange-traded fund) token, tradable within any ecosystem or CEX.',
			website: 'https://www.defund.app/',
			offValDoc: 'https://github.com/defund-labs/testnet/blob/main/defund-private-4/validators.md',
			hardware: '4 Cores, 16GB RAM, 200GB of storage (NVME)',
			prHome: '/home/defund',
			binHome: '/home/defund/go/bin/defundd',
			snapMaxSize: '10',
			port: '18',
			VAR: 'DEFUND',
			denom: 'ufetf',
			ecosystem: 'cosmos',
			bin: 'defundd',
			path: '.defund',
			peerID: '6ebe0fd3fd0990feec2dd1e09fe06b766b6b67d0',
			seedID: '74e6425e7ec76e6eaef92643b6181c42d5b8a3b8',
			peerPort: '18656',
			seedPort: '18656',
			installBin:
				'cd $HOME\nrm -rf defund\ngit clone https://github.com/defund-labs/defund\ncd defund\ngit checkout v0.2.6\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--fees 5000ufetf',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		dymension: {
			chainID: '35-C',
			imgUrl: 'dymension.png',
			desc: 'Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.',
			fav: true,
			website: 'https://dymension.xyz/',
			offValDoc: 'https://docs.dymension.xyz/validate/dymension-hub/overview/',
			hardware: '4 Cores, 16GB RAM, 500GB of storage (NVME)',
			prHome: '/home/dymension',
			binHome: '/home/dymension/go/bin/dymd',
			snapMaxSize: '10',
			port: '32',
			VAR: 'DYMENSION',
			denom: 'udym',
			ecosystem: 'cosmos',
			bin: 'dymd',
			path: '.dymension',
			peerID: 'adf394846dc942b1fd03f6e310eda60b5eda7848',
			seedID: 'c26dc8486e8c4817e154812462993ce562cda221',
			peerPort: '32656',
			seedPort: '32656',
			installBin:
				'cd $HOME\nrm -rf dymension\ngit clone https://github.com/dymensionxyz/dymension.git --branch v0.2.0-beta\ncd dymension\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		elys: {
			chainID: 'elystestnet-1',
			imgUrl: 'elys.jpg',
			desc: '',
			website: 'https://elys.network/',
			offValDoc: 'https://github.com/elys-network/elys',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/elys',
			binHome: '/home/elys/go/bin/elysd',
			snapMaxSize: '10',
			port: '38',
			VAR: 'ELYS',
			denom: 'uelys',
			ecosystem: 'cosmos',
			bin: 'elysd',
			path: '.elys',
			peerID: '0977dd5475e303c99b66eaacab53c8cc28e49b05',
			seedID: 'ae7191b2b922c6a59456588c3a262df518b0d130',
			peerPort: '38656',
			seedPort: '38656',
			installBin:
				'cd $HOME\nrm -rf elys\ngit clone https://github.com/elys-network/elys.git\ncd elys\ngit checkout v0.6.0\nmake install',
			updHeight: '818000',
			newInstallBin: `cd $HOME/elys
git fetch --all
git checkout v0.6.0
make build
sudo mv $HOME/elys/build/elysd $(which elysd)`,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		empower: {
			chainID: 'circulus-1',
			delegate:
				'https://testnet.itrocket.net/empower/staking/',
			imgUrl: 'empower.png',
			website: 'https://www.empower.eco/',
			offValDoc: 'https://docs.empowerchain.io/validators/delegation-program',
			hardware: '4 Cores, 16GB RAM, 500GB of storage (NVME)',
			prHome: '/home/empower',
			binHome: '/home/empower/go/bin/empowerd',
			snapMaxSize: '3',
			port: '16',
			VAR: 'EMPOWER',
			denom: 'umpwr',
			ecosystem: 'cosmos',
			bin: 'empowerd',
			path: '.empowerchain',
			peerID: '',
			seedID: '',
			explorer: '',
			peerPort: '',
			seedPort: '',
			installBin:
				`cd $HOME
rm -rf empowerchain
git clone https://github.com/EmpowerPlastic/empowerchain
cd empowerchain
git checkout v1.0.0-rc1
cd chain
make install`,
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.20.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		humans: {
			chainID: 'humans_3000-31',
			imgUrl: 'humans.jpg',
			fav: false,
			desc: 'We are creating a scalable blockchain providing the economy of the heart driven AI, placing the humans at the facefront of the AI evolution.',
			website: 'https://humans.ai/',
			offValDoc:
				'https://github.com/humansdotai/docs-humans/blob/master/run-nodes/testnet/joining-testnet.md',
			hardware: '4 Cores, 8GB RAM, 250GB of storage (NVME)',
			prHome: '/home/humans',
			binHome: '/home/humans/go/bin/humansd',
			snapMaxSize: '10',
			port: '17',
			VAR: 'HUMANS',
			denom: 'aheart',
			ecosystem: 'cosmos',
			bin: 'humansd',
			path: '.humansd',
			peerID: 'b99df5397a6104fac055f21195f1fb25b77f5704',
			seedID: '6ce9a9acc23594ec75516617647286fe546f83ca',
			peerPort: '17656',
			seedPort: '17656',
			evmRpc: `https://humans-testnet-evm.itrocket.net:443`,
			installBin:
				'cd $HOME\nrm -rf ~/humans\ngit clone https://github.com/humansdotai/humans\ncd humans\ngit checkout tags/v0.2.2\nmake install',
			updHeight: '',
			newInstallBin: `cd $HOME
rm -rf ~/humans
git clone https://github.com/humansdotai/humans
cd humans
git checkout tags/v0.2.2
make build
sudo mv $HOME/humans/build/humansd $(which humansd)`,
			goVersion: '1.20.1',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		kyve: {
			chainID: 'kaon-1',
			imgUrl: 'kyve.png',
			desc: 'KYVE Network is revolutionizing customized access to on- and off-chain data by providing fast and easy tooling for decentralized data validation, immutability, and retrieval.',
			website: 'https://www.kyve.network/',
			offValDoc: 'https://github.com/KYVENetwork/networks/tree/main/kaon-1',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/kyve',
			binHome: '/home/kyve/go/bin/kyved',
			snapMaxSize: '10',
			port: '28',
			VAR: 'KYVE',
			denom: 'tkyve',
			ecosystem: 'cosmos',
			bin: 'kyved',
			path: '.kyve',
			peerID: '664e06d2d6110c5ba93f8ecfee66f150bad981bf',
			seedID: 'de7865a2a4936fd4bb00861ed887f219d8dd73d7',
			peerPort: '28656',
			seedPort: '28656',
			installBin: `cd $HOME
rm -rf $HOME/chain
git clone https://github.com/KYVENetwork/chain.git
cd chain
git fetch
git checkout tags/v1.2.0 -b v1.2.0
make build ENV=kaon
mv $HOME/chain/build/kyved $HOME/go/bin/kyved`,
			updHeight: '',
			newInstallBin: ``,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5 --fees 10000tkyve',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		lava: {
			chainID: 'lava-testnet-1',
			imgUrl: 'lava.png',
			fav: true,
			desc: 'Lava pairs Providers with Applications for scalable, private and uncensored access to Web3.',
			website: 'https://lavanet.xyz/',
			offValDoc: 'https://docs.lavanet.xyz/testnet',
			hardware: '4 Cores, 8GB RAM, 100GB of storage (NVME)',
			prHome: '/home/lava',
			binHome: '/home/lava/go/bin/lavad',
			snapMaxSize: '10',
			port: '20',
			VAR: 'LAVA',
			denom: 'ulava',
			ecosystem: 'cosmos',
			bin: 'lavad',
			path: '.lava',
			peerID: '3693ea5a8a9c0590440a7d6c9a98a022ce3b2455',
			seedID: 'eb7832932626c1c636d16e0beb49e0e4498fbd5e',
			peerPort: '20656',
			seedPort: '20656',
			installBin:
				'cd $HOME\nrm -rf $HOME/lava\ngit clone https://github.com/lavanet/lava.git\ncd lava\ngit checkout v0.12.1\nmake install',
			updHeight: '227130',
			newInstallBin: `cd $HOME
rm -rf $HOME/lava
git clone https://github.com/lavanet/lava.git
cd lava
git checkout  v0.12.1
make build
sudo mv $HOME/lava/build/lavad $(which lavad)`,
			goVersion: '1.20.1',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		mars: {
			chainID: 'ares-1',
			imgUrl: 'mars.jpg',
			desc: 'Lend, borrow and earn with an autonomous credit protocol in the Cosmos universe. Open to all, closed to none.',
			website: 'https://marsprotocol.io/',
			offValDoc: 'https://validatordocs.marsprotocol.io/TfYZfjcaUzFmiAkWDf7P/infrastructure/validators',
			hardware: '8 Cores, 32GB RAM, 2TB of storage (NVME)',
			prHome: '/home/mars',
			binHome: '/home/mars/go/bin/marsd',
			snapMaxSize: '10',
			port: '22',
			VAR: 'MARS',
			denom: 'umars',
			ecosystem: 'cosmos',
			bin: 'marsd',
			path: '.mars',
			peerID: '56ff8e129a481f186e4ac066f3a38bac179bd8e2',
			seedID: 'a841d3e526089172867a73b709fd14e1d9fb87bd',
			peerPort: '22656',
			seedPort: '22656',
			installBin:
				'cd $HOME\nrm -rf hub\ngit clone https://github.com/mars-protocol/hub.git\ncd hub\ngit checkout v2.0.0-rc0\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		ojo: {
			chainID: 'ojo-devnet',
			imgUrl: 'ojo.png',
			desc: 'Give your chain access to realtime, decentralized oracles, and stop worrying about your data.',
			website: 'https://ojo.network/',
			offValDoc: 'https://docs.ojo.network/sauron-testnet/joining-as-a-validator',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/ojo',
			binHome: '/home/ojo/go/bin/ojod',
			snapMaxSize: '10',
			port: '12',
			VAR: 'OJO',
			denom: 'uojo',
			ecosystem: 'cosmos',
			bin: 'ojod',
			path: '.ojo',
			peerID: 'd2489830a5e91ec214edfc54756512e4f89f2609',
			seedID: '7186f24ace7f4f2606f56f750c2684d387dc39ac',
			peerPort: '12656',
			seedPort: '12656',
			installBin:
				'cd $HOME\nrm -rf ojo\ngit clone https://github.com/ojo-network/ojo.git\ncd ojo\ngit checkout v0.1.2\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		nois: {
			chainID: 'nois-testnet-005',
			imgUrl: 'nois.png',
			desc: 'Brings random beacons to Cosmos blockchains without compromising security or usability by leveraging drand and IBC.',
			website: 'https://nois.network/',
			offValDoc: 'https://docs.nois.network/use-cases/for-validators',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/nois',
			binHome: '/home/nois/go/bin/noisd',
			snapMaxSize: '10',
			port: '21',
			VAR: 'NOIS',
			denom: 'unois',
			ecosystem: 'cosmos',
			bin: 'noisd',
			path: '.noisd',
			peerID: '5ecd40831e453845587cbd03534e68a7b9fc3576',
			seedID: 'da81dd66bca4bba509163dbd06b4a6b2e05c2e12',
			peerPort: '21656',
			seedPort: '21656',
			installBin:
				'cd $HOME\nrm -rf $HOME/noisd\ngit clone https://github.com/noislabs/noisd.git\ncd noisd\ngit checkout v0.6.0\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		sao: {
			chainID: 'sao-testnet1',
			delegate:
				'https://testnet.itrocket.net/sao/staking/arkhvaloper18u4es3gnjerdqw3u96pjdq6ukclysh3f9wfmqe',
			imgUrl: 'sao.jpg',
			website: 'https://www.sao.network/#/',
			offValDoc: 'https://docs.sao.network/participate-in-sao-network',
			hardware: '4 Cores, 8GB RAM, 150GB of storage (NVME)',
			prHome: '/home/sao',
			binHome: '/home/sao/go/bin/saod',
			snapMaxSize: '3',
			port: '19',
			VAR: 'SAO',
			denom: 'sao',
			ecosystem: 'cosmos',
			bin: 'saod',
			path: '.sao',
			peerID: '08d8f8ae761177ecf95159281d08bca622c7e578',
			seedID: '4e6df8dcc080b8c73929fc513443ecd5e0a424f0',
			peerPort: '19656',
			seedPort: '19656',
			newInit: `false`,
			installBin: `cd $HOME
rm -rf sao-consensus
git clone https://github.com/SaoNetwork/sao-consensus.git
cd sao-consensus
git checkout V0.1.5
make install
wget -O $HOME/.sao/config/app.toml https://github.com/SAONetwork/sao-consensus/releases/download/v0.1.3/app.toml
wget -O $HOME/.sao/config/config.toml https://github.com/SAONetwork/sao-consensus/releases/download/v0.1.3/config.toml`,
			updHeight: '4007000',
			newInstallBin: `cd $HOME
rm -rf sao-consensus
git clone https://github.com/SaoNetwork/sao-consensus.git
cd sao-consensus
git checkout v0.1.5
make build
sudo mv $HOME/sao-consensus/build/linux/saod $(which saod)`,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		quicksilver: {
			chainID: 'rhye-1',
			delegate:
				'https://wallet.keplr.app/chains/quicksilver?modal=validator&validator_address=quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x&chain=quicksilver-2',
			imgUrl: 'quicksilver.jpg',
			desc: 'Quicksilver is a permissionless, sovereign Cosmos SDK zone providing liquid staking for the entire Cosmos Ecosystem.',
			website: 'https://quicksilver.zone/',
			offValDoc: 'https://github.com/ingenuity-build/testnets/tree/main/innuendo',
			hardware: '4 Cores, 16GB RAM, 500GB of storage (NVME)',
			prHome: '/home/quick',
			binHome: '/home/quick/go/bin/quicksilverd',
			snapMaxSize: '10',
			port: '37',
			VAR: 'QUICKSILVER',
			denom: 'uqck',
			ecosystem: 'cosmos',
			bin: 'quicksilverd',
			path: '.quicksilverd',
			peerID: '2aed12a25bfa92e40ccb95c88692735a9488a17e',
			seedID: '78283975c2bee9b95bbf9408cc974cbab7bfe8ef',
			peerPort: '37656',
			seedPort: '37656',
			installBin:
				'cd $HOME\nrm -rf ~/quicksilver\ngit clone https://github.com/ingenuity-build/quicksilver\ncd quicksilver\ngit fetch\ngit checkout v1.4.2-rc7\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.20.1',
			gas: '',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		terp: {
			chainID: '90u-1',
			imgUrl: 'terp.jpg',
			desc: 'Decentralized Infrastructure for the Cannabis Community',
			website: 'https://terp.network/',
			offValDoc: 'https://github.com/terpnetwork/terp-core',
			hardware: '4 Cores, 8GB RAM, 200GB of storage (NVME)',
			prHome: '/home/terp',
			binHome: '/home/terp/go/bin/terpd',
			snapMaxSize: '10',
			port: '13',
			VAR: 'TERP',
			denom: 'uterpx',
			ecosystem: 'cosmos',
			bin: 'terpd',
			path: '.terp',
			peerID: '51d48be3809bb8907c1ef5f747e53cdd0c9ded1b',
			seedID: 'a6ee57fb457f71530d165afd1901d0d62cd7d7e0',
			peerPort: '13656',
			seedPort: '13656',
			installBin:
				'cd $HOME\nrm -rf ~/terp-core\ngit clone https://github.com/terpnetwork/terp-core.git\ncd terp-core\ngit checkout v1.0.1\nmake install',
			updHeight: '',
			newInstallBin: ``,
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		uptick: {
			chainID: 'uptick_7000-2',
			imgUrl: 'uptick.jpg',
			fav: true,
			desc: 'The Business Grade Multi-Chain NFT Infrastructure for Web 3.0',
			website: 'https://uptick.network/',
			offValDoc: 'https://docs.uptick.network/testnet/',
			hardware: '4 Cores, 4GB RAM, 100GB of storage (NVME)',
			prHome: '/home/uptick',
			binHome: '/home/uptick/go/bin/uptickd',
			snapMaxSize: '10',
			port: '10',
			VAR: 'UPTICK',
			denom: 'auptick',
			ecosystem: 'cosmos',
			bin: 'uptickd',
			path: '.uptickd',
			peerID: '86f50af23369997882ca3988eabeba998b4f07cc',
			seedID: '2c952455a0e425081b54855091ab84c1fe73c4bc',
			peerPort: '10656',
			seedPort: '10656',
			installBin:
				'cd $HOME\nrm -rf uptick\ngit clone https://github.com/UptickNetwork/uptick.git\ncd uptick\ngit checkout v0.2.5\nmake install',
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		},
		zetachain: {
			chainID: 'athens_7001-1',
			delegate:
				'https://testnet.itrocket.net/zetachain/staking/',
			imgUrl: 'zetachain.jpg',
			website: 'https://www.zetachain.com/',
			offValDoc: 'https://github.com/zeta-chain/network-athens3/tree/main',
			hardware: '4 Cores, 16GB RAM, 300GB of storage (NVME)',
			fav: true,
			prHome: '/home/zetachain',
			binHome: '/home/zetachain/go/bin/zetacored',
			snapMaxSize: '3',
			port: '14',
			VAR: 'ZETACHAIN',
			denom: 'ZETA',
			ecosystem: 'cosmos',
			bin: 'zetacored',
			path: '.zetacored',
			peerID: 'd21b103628b0d5d824bbe81b809d8dc457bd2059',
			seedID: '',
			explorer: 'https://explorer.zetachain.com/validators',
			peerPort: '14656',
			evmRpc: `https://zetachain-testnet-evm.itrocket.net:443`,
			seedPort: '',
			newInit: `false`,
			newExecStart: `$(which zetacored) start --home $HOME/.zetacored --log_format json  --log_level info --moniker $MONIKER`,
			installBin:
				`cd $HOME
mkdir $HOME/.zetacored/config
wget https://zetachain-external-files.s3.amazonaws.com/binaries/athens3/latest/zetacored-ubuntu-22-amd64
wget https://zetachain-external-files.s3.amazonaws.com/binaries/athens3/latest/zetaclientd-ubuntu-22-amd64
chmod +x $HOME/zetacored-ubuntu-22-amd64
chmod +x $HOME/zetaclientd-ubuntu-22-amd64
mv zetacored-ubuntu-22-amd64 $HOME/go/bin/zetacored
mv zetaclientd-ubuntu-22-amd64 $HOME/go/bin/zetaclientd
wget -O $HOME/.zetacored/config/app.toml https://raw.githubusercontent.com/zeta-chain/network-athens3/main/network_files/config/app.toml
wget -O $HOME/.zetacored/config/client.toml https://raw.githubusercontent.com/zeta-chain/network-athens3/main/network_files/config/client.toml
wget -O $HOME/.zetacored/config/config.toml https://raw.githubusercontent.com/zeta-chain/network-athens3/main/network_files/config/config.toml
wget -O $HOME/.zetacored/config/genesis.json https://raw.githubusercontent.com/zeta-chain/network-athens3/main/network_files/config/genesis.json`,
			updHeight: '',
			newInstallBin: '',
			goVersion: '1.19.3',
			gas: '--gas auto --gas-adjustment 1.5',
			unsafeReset: 'tendermint unsafe-reset-all',
			minGasPrice: '0.0'
		}
	},
	finished: [
		{
			name: 'Sui',
			link: 'https://explorer.sui.io/',
			imgUrl: 'sui.svg'
		},
		{
			name: 'Masa',
			link: 'https://www.masa.finance/',
			imgUrl: 'masa.svg'
		},
		{
			name: 'Ironfish',
			link: 'https://ironfish.network/',
			imgUrl: 'ironfish.png'
		},
		{
			name: 'Pontem',
			lnik: 'https://pontem.network/',
			imgUrl: 'pontem.svg'
		},
		{
			name: 'DeWeb',
			link: 'https://deweb.services/',
			imgUrl: 'deweb.png'
		},
		{
			name: 'Bifrost',
			link: 'https://thebifrost.io/',
			imgUrl: 'bifrost.png'
		},
		{
			name: 'Subspace',
			link: 'https://subspace.network/',
			imgUrl: 'subspace.jpg'
		}
	]
}
export default projects
