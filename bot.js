import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { read,write } from './lib/orm.js'
import { addUser,deleteUser } from './modules/addUser.js'
import { START,back,front,gdkey,FLUTTER} from './modules/start.js'

dotenv.config()
let count = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
const set = new Set()
const ADMIN = +process.env.ADMIN
let messageUser;


const start = ()=>{
		bot.on('message',async msg=>{
			try {
				const {chat:{id:chatId},message_id} = msg
				const {chat:{first_name:name}} = msg
				const {text} = msg
				messageUser = text
				let data =  read('bot_users')
				data.forEach( el => set.add(el))
				set.add(chatId)
				write('bot_users',[...set])
				let frontend = read('users').filter( el => el.specialist =='Frontend' )
				let backend = read('users').filter( el => el.specialist =='Backend' )
				let gd = read('users').filter( el => el.specialist == 'Grafik dizayn' )
				let flutter = read('users').filter( el => el.specialist == 'Flutter')
				if('/start' == text) {
					bot.sendMessage(chatId,`Assalomu alaykum <b>${name}</b>.\nSizga qaysi yo'nalish bo'yicha sherik kerak 👇`,START())
					count = 0
					count2 = 0
					count3 = 0
					count4 = 0
				}
				else if(!frontend[count2] && text == 'Frontend'){
					count2 = 0
					bot.sendMessage(chatId,"Ro'yxat tugadi")
				}
				else if(!backend[count] && text == 'Backend'){
					count = 0
					bot.sendMessage(chatId,"Ro'yxat tugadi")
				}
				else if( !gd[count3]  && text == 'Grafik dizayn'){
					count3 = 0
					bot.sendMessage(chatId,"Ro'yxat tugadi")
				}
				else if( !flutter[count4] && text == 'Mobile (Flutter)' ){
					count4 = 0
					bot.sendMessage(chatId,"Ro'yxat tugadi")
				}
				else if(text == 'Backend'){
					let { username:nameUser,contact,githubAccount } = backend[count]
					bot.sendMessage(chatId,`Ism Familiyasi :<b>${nameUser}</b> \nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,back())
					count += 1
				}
				else if(text == 'Frontend'){
					let { username:nameUser,contact,githubAccount } = frontend[count2]
					bot.sendMessage(chatId,`Ism Familiyasi :<b> ${nameUser}</b>\nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,front())
					count2 += 1
				}
				else if ( text == 'Grafik dizayn' ){
					let {username,contact,work_done} = gd[count3]
					bot.sendMessage(chatId,`Ism Familiyasi :<b> ${username}</b>\nKontakt: +${ contact }\nQilgan ishlari : ${work_done}`,gdkey())
					count3 +=1
				}
				else if (text == 'Mobile (Flutter)'){
					let {username,contact,githubAccount} = flutter[count4]
					bot.sendMessage(chatId,`Ism Familiyasi :<b> ${username}</b>\nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,FLUTTER())
					count4 +=1
				}
				else if(text == 'users' && chatId == ADMIN ){
					bot.sendMessage(chatId,fs.readFileSync(path.join('database','users.json'),'utf8'))
				}
				else if( text.includes( 'ADMIN' ) ) {
					fs.appendFileSync(path.join(process.cwd(),'.env'), '\n'+text,'utf8')
					bot.sendMessage(ADMIN,'Admin qo\'shildi')
				}
				else if (chatId == ADMIN && typeof JSON.parse(text) == 'object' && JSON.parse(text).userId) {
					let user_id = JSON.parse(text).userId
					deleteUser( user_id )
					bot.sendMessage(ADMIN,'user o\'chirildi')
				}
				else if( chatId == ADMIN && typeof JSON.parse(text) == 'object' ) addUser(JSON.parse(text)) == true ? bot.sendMessage(ADMIN,'user qo\'shildi') :  bot.sendMessage(ADMIN,'user qo\'shilmadi')
				else bot.sendMessage(chatId,"noma'lum buyruq")

			} catch(e) {
				bot.sendMessage(ADMIN,e.message);
			}
		})

		bot.on('callback_query',msg=>{
				try {	
					let {data} = msg
					let {from:{id:chatId}} = msg
					let frontend = read('users').filter( el => el.specialist =='Frontend' )
					let backend = read('users').filter( el => el.specialist =='Backend' )
					let gd = read('users').filter( el => el.specialist == 'Grafik dizayn' )
					let flutter = read('users').filter( el => el.specialist == 'Flutter' )
					if(!backend[count] && messageUser == 'Backend'){
						count = 0
						bot.sendMessage(chatId,"Ro'yxat tugadi")
					}
					else if(!frontend[count2] && messageUser == 'Frontend'){
						count2 = 0
						bot.sendMessage(chatId,"Ro'yxat tugadi")
					}
					else if ( !gd[count3] && messageUser == 'Grafik dizayn' ){
						count3 = 0
						bot.sendMessage(chatId,"Ro'yxat tugadi")
					}
					else if(!flutter[count4] && messageUser == 'Mobile (Flutter)'){
						count4 = 0
						bot.sendMessage(chatId,"Ro'yxat tugadi")
					}
					else if(data=='keyingisi'){
						let { username:nameUser,contact,githubAccount } = backend[count]
						bot.sendMessage(chatId,`Ism Familiyasi : <b>${ nameUser } </b>\nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,back())
						count += 1
					}
					else if(data=='keyingisiFront'){
						let { username:nameUser,contact,githubAccount } = frontend[count2]
						bot.sendMessage(chatId,`Ism Familiyasi :<b> ${ nameUser }</b> \nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,front())
						count2 += 1
					}
					else if(data=='keyingisiGD'){
						let { username,contact,work_done } = gd[count3]
						bot.sendMessage(chatId,`Ism Familiyasi :<b> ${username}</b>\nKontakt: +${ contact }\nQilgan ishlari : ${work_done}`,gdkey())		
						count3 += 1
					}
					else if(data=='keyingisiFl'){
						let { username,contact,githubAccount } = flutter[count4]
						bot.sendMessage(chatId,`Ism Familiyasi :<b> ${username}</b>\nKontakt: +${ contact }\nGitHub account : ${githubAccount}`,FLUTTER())		
						count4 += 1
					}

			} catch(e) {
				bot.sendMessage(ADMIN,e.message);
			}
		})	
}

start()