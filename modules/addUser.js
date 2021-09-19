import { read,write } from '../lib/orm.js'

function addUser(req){
	let data = read('users')
	let user = data.find( el => el.user_id == req.user_id )
	if( user ) return false
	data.push(req)
	write('users',data)
	return true
}

function deleteUser(userId) {
	let data = read('users')
	data = data.filter( el => el.user_id != userId )
	write('users',data)
}

export {
	addUser,
	deleteUser
}
