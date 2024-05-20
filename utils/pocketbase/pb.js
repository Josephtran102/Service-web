require('dotenv').config()
const PocketBase = require('pocketbase/cjs')

const pb = new PocketBase(`${process.env.NEXT_PUBLIC_PB_URL}`)
const pb_login = process.env.PB_LOGIN
const pb_password = process.env.PB_PASSWORD

const authPocketbase = async () => {
	pb.autoCancellation(false)
	return pb.admins.authWithPassword(pb_login, pb_password)
}

module.exports = {
	pb,
	authPocketbase
}
