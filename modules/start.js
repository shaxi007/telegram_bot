function START() {
	return {
		"reply_markup": {
   			"keyboard": [["Backend", "Frontend"],["Grafik dizayn","Mobile (Flutter)"]],
   			"resize_keyboard":true
    	},
    	"parse_mode":"html"
	}
}

function back() {
	return {
		"reply_markup":{
			"inline_keyboard": [
            	[{ "text": "Keyingisi ➡️", "callback_data": "keyingisi" }]
			]
		},
    	"parse_mode":"html"
	}
}

function front() {
	return {
		"reply_markup":{
			"inline_keyboard": [
            	[{ "text": "Keyingisi ➡️", "callback_data": "keyingisiFront" }]
			]
		},
    	"parse_mode":"html"
	}
}

function gdkey() {
	return {
		"reply_markup":{
			"inline_keyboard": [
            	[{ "text": "Keyingisi ➡️", "callback_data": "keyingisiGD" }]
			]
		},
    	"parse_mode":"html"
	}
}

function FLUTTER() {
	return {
		"reply_markup":{
			"inline_keyboard": [
            	[{ "text": "Keyingisi ➡️", "callback_data": "keyingisiFl" }]
			]
		},
    	"parse_mode":"html"
	}
}




export {
	START,
	back,
	front,
	gdkey,
	FLUTTER
}