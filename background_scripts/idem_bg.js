

let _ws, _twitch, _tabId, _ide, _log
const _buffer = []

const actions = {

	log_activate: function() {
		_log = true
		if (!_tabId) return
		browser.tabs.sendMessage(_tabId, {
			command: "log_activate",
		})
	},

	log_deactivate: function() {
		_log = false
		if (!_tabId) return
		browser.tabs.sendMessage(_tabId, {
			command: "log_deactivate",
		})
	},

	log_get_status: function() {
		return _log
	},

	tab_get_id: function() {
		return _tabId
	},

	tab_initialize: function() {
		browser.tabs.query({currentWindow: true, active: true})
			.then(tabs => {
				_tabId = tabs[0].id
				_ide = tabs[0].url.includes('codingame.com/ide/')
				set_idem_logo({tabId: _tabId})
			})
	},

	tab_goto: function() {
		if (_tabId) {
			// highlight to keep current tab visible ?
			browser.tabs.update(_tabId, {highlighted: true})
		}
	},

	action_get_buffer: function() {
		return _buffer
	},

	twitch_connect: function(channel) {
		const status = _twitch?.status
		if (status == 'CONNECTING' || status === 'OPEN') {
			return `Already connected to channel [${_twitch.channel}]`
		} else {
			if (!channel) return 'Empty channel'
			_twitch = new TwitchWS(channel, actions)
			update_idem_logo()
		}
	},

	twitch_deconnect: function() {
		_twitch?.close()
		_twitch = null
		update_idem_logo()
	},

	twitch_get_status: function() {
		return [_twitch?.status, _twitch?.channel]
	},

	ide_activate: function() {
		sendMessage({
			command: "ide_activate",
		})
	},
	ide_deactivate: function() {
		sendMessage({
			command: "ide_deactivate",
		})
	},
	ide_clear: function() {
		sendMessage({
			command: "ide_clear",
		})
	},
	ide_rotate: function() {
		sendMessage({
			command: "ide_rotate",
		})
	},
	ide_block_letter: function(letter) {
		if (letter?.length <= 1)
			sendMessage({
				command: "ide_block_letter",
				obj: letter,
			})
		else {
			log('ERROR', `Too much letters in [${letter}]`)
		}
	},
	ide_swap_submit: function() {
		sendMessage({
			command: "ide_swap_submit",
		})
	},
	ide_deactivate_submit: function() {
		sendMessage({
			command: "ide_deactivate_submit",
		})
	},
	ide_deactivate_test: function() {
		sendMessage({
			command: "ide_deactivate_test",
		})
	},
}

browser.runtime.onMessage.addListener(function messageListener(message, sender, reply) {
	if (_log) console.log('onMessage', message, sender, reply)

	try {
		const obj = actions[message.command](message.obj)
		reply({res: obj ? 'obj' : 'ack', obj: obj})
	} catch(e) {
		console.log("Error on message", message, e)
		reply({res: 'error', message: message, error: e.toString()})
		//throw e
	}
})

function ensureScriptLoaded() {
	return new Promise((resolve, reject) => {
		if (_log) console.log('step 1')
		try {
			browser.tabs.sendMessage(_tabId, {
				command: "get_status",
			}, function(r) {
				if (_log) console.log('step 2',  JSON.stringify(r))
				if (!r) {
					if (_log) console.log('step 2.1')
					try {
						browser.tabs.executeScript(_tabId, {file: "/content_scripts/idem.js"})
							.then(r => {
								update_idem_logo()
								if (_log) console.log('step 2.5', r)
								if (_log) actions.log_activate()
								resolve(r)
							})
							.catch(err => {
								console.log(err)
								reject(err)
							})
					} catch(err) {
						console.log(err)
						reject(err)
					}
				} else {
					if (_log) console.log('step 2.6')
					resolve(r)
				}
			})
		} catch(err) {
			console.log(err)
			reject(err)
		}
	})
}

function sendMessage(o) {
	if (_ide) {
		ensureScriptLoaded().then(r => {
			browser.tabs.sendMessage(_tabId, o, r => {
				if (_log) console.log('DEBUG', r)
			})
		})
	} else {
		const nb = _buffer.push(o)
		browser.runtime.sendMessage({
			command: 'buffer_change',
			obj: _buffer,
		})
		if (_log) console.log('step 0', _buffer)
		browser.browserAction.setBadgeText({text: `${nb}`})
	}
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	if (_log) console.log('tabs onUpdated', tabId, changeInfo, tabInfo)
	if (_tabId == tabId && changeInfo.status == 'complete') {
		_ide = tabInfo.url.includes('codingame.com/ide/')
		if (_ide) {
			ensureScriptLoaded().then(r => {
				if (_log) console.log('step 3', r, _buffer)
				// TODO better, for now small timeout to ensure page loaded
				setTimeout(() => {
					_buffer.forEach(o => {
						if (_log) console.log('step 4', o)
						browser.tabs.sendMessage(_tabId, o, r => {
							if (_log) console.log('DEBUG', r)
						})
					})
					browser.browserAction.setBadgeText({text: ''})
					_buffer.length = 0
				}, 5000)
			}).catch(err => {
				console.log(err)
				update_idem_logo()
			})
		} else {
			// clear content residual action
			// TODO better : previous navigation button trigger url change and override by cg
			browser.tabs.sendMessage(_tabId, {
				command: "clear",
			}, r => {
				if (_log) console.log('DEBUG', r)
			})
		}
	}
})

function update_idem_logo() {
	browser.tabs.query({currentWindow: true, active: true})
		.then(tabs => {
			set_idem_logo({tabId: tabs[0].id})
		})
}
function set_idem_logo(e) {
	const [status, ] = actions.twitch_get_status()
	const twitch_logo = status === 'CONNECTING' || status === 'OPEN' ? '_twitch' : ''
	if (e.tabId == _tabId) {
		browser.tabs.sendMessage(_tabId, {
			command: "get_status",
		}, r => {
			if (_log) console.log(r)
			const cg_logo = r ? '_cg' : ''
			browser.browserAction.setIcon({ path: `icons/logo_squadracer${cg_logo}${twitch_logo}.png` })
		})
	} else {
		browser.browserAction.setIcon({ path: `icons/logo${twitch_logo}.png` })
	}
	//browser.browserAction.setTitle({title: "test"})
}
browser.tabs.onActivated.addListener(set_idem_logo)

// unregister tabid when closed. Restoring a tab produce a new id so everything good
browser.tabs.onRemoved.addListener(tabId => {
	if (tabId == _tabId) {
		_tabId = undefined
	}
})

browser.runtime.onSuspend.addListener(e => {
	if (_log) console.log("Unloading.", e)
})

// not good for cg because ajax
//browser.webNavigation.onCompleted.addListener(e => {
//  console.log("navigation", e);
//})

console.log("background loaded")


