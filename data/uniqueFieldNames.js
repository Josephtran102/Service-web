let fieldNames = [
	'chainID',
	'imgUrl',
	'desc',
	'website',
	'offValDoc',
	'hardware',
	'prHome',
	'binHome',
	'snapMaxSize',
	'port',
	'variable',
	'denom',
	'ecosystem',
	'bin',
	'path',
	'peerID',
	'seedID',
	'peerPort',
	'newCreateValidator',
	'seedPort',
	'installBin',
	'stateSync',
	'updHeight',
	'newInstallBin',
	'goVersion',
	'gas',
	'unsafeReset',
	'minGasPrice',
	'delegate',
	'newInit',
	'newExecStart',
	'evmRPC',
	'explorer',
	'name',
	'link',
	'node'
]

for (let i = 1; i <= 10; i++) {
	fieldNames.push(`installBin${i}`)
	fieldNames.push(`installTitle${i}`)
}

export default fieldNames
