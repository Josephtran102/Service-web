export default function handler(req, res) {
	res.status(200).send(`#!/bin/bash
source <(curl -s https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/common.sh)

printLogo

printLine
echo -e "Test: $GREEN Testing autoinstall script $NС"
printLine
sleep 3600`)
}
