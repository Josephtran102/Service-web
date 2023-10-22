export async function getServerSideProps(context) {
	const keybaseData = `==================================================================
https://keybase.io/itrocket_
--------------------------------------------------------------------

I hereby claim:

  * I am an admin of https://itrocket.net
  * I am itrocket_ (https://keybase.io/itrocket_) on keybase.
  * I have a public key ASCVTxFtfytJQrw2JnME40E-yt49NDAWbgp5LqCmIAzTxQo

To do so, I am signing this object:

{
  "body": {
    "key": {
      "eldest_kid": "01010d89bf7f965814283c2c8994d535bae63f3400769e35674536a402a197c522ae0a",
      "host": "keybase.io",
      "kid": "0120954f116d7f2b4942bc36267304e3413ecade3d3430166e0a792ea0a6200cd3c50a",
      "uid": "cd65a12263f43599370ee1c559072719",
      "username": "itrocket_"
    },
    "merkle_root": {
      "ctime": 1697952298,
      "hash": "fe88e9c4427d6395a343b93cbe9672108b67bffb0b052cdfd51bfa07749845b50b078b31b6849bbccf2c2350b20971ca7f9221c800e24246931f6312ebf80bf9",
      "hash_meta": "11056f957b4e3706a7c9cb98caa925ae6d9e3eb4c2d38d61128fd0d6842f3827",
      "seqno": 25059576
    },
    "service": {
      "entropy": "hLEE7dK2JH6hBYJDPUwl6b4S",
      "hostname": "itrocket.net",
      "protocol": "https:"
    },
    "type": "web_service_binding",
    "version": 2
  },
  "client": {
    "name": "keybase.io go client",
    "version": "6.2.3"
  },
  "ctime": 1697952318,
  "expire_in": 504576000,
  "prev": "e78f28dee5ec07b045796e2ed1d9e46315d54f44784191b6f562cc952ce99751",
  "seqno": 25,
  "tag": "signature"
}

which yields the signature:

hKRib2R5hqhkZXRhY2hlZMOpaGFzaF90eXBlCqNrZXnEIwEglU8RbX8rSUK8NiZzBONBPsrePTQwFm4KeS6gpiAM08UKp3BheWxvYWTESpcCGcQg548o3uXsB7BFeW4u0dnkYxXVT0R4QZG29WLMlSzpl1HEIGHVpqKyOMCkTHqGkc02kzjIo5HTzz1fCxgPbbmfYo8ZAgHCo3NpZ8RAlB2pYzLY/52Xgtq7VVFp6Vy2uvhjnFSGn3qEMw5dK6okYd+qSUKxnnpjY9jknFRamQVJC9IEaj9FqKpuxh6EC6hzaWdfdHlwZSCkaGFzaIKkdHlwZQildmFsdWXEIKtbXaHwWbzfCpISTv1kr7ilyNQV02dUcQiEm4wK2VSMo3RhZ80CAqd2ZXJzaW9uAQ==

And finally, I am proving ownership of this host by posting or
appending to this document.

View my publicly-auditable identity here: https://keybase.io/itrocket_

==================================================================
`

	context.res.setHeader('Content-Type', 'text/plain')
	context.res.write(keybaseData)
	context.res.end()

	return { props: {} }
}

export default function Keybase() {
	return null
}
