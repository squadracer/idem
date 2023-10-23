function log (level, o) {
  if (!_log) return
  // this log in browser console (ctrl + maj + j on firefox)
  console.log(level, JSON.stringify(o))
  document.querySelector(
    '#popup-log'
  ).value += `\n${new Date().toISOString()} [${level}] - ${JSON.stringify(
    o
  )} (${new Error().stack.split('\n')[1].match(/[^\/]*$/)?.[0]})`
}

// send message to background
function sendMessage (o) {
  browser.runtime.sendMessage(o, r => {
    log('DEBUG', r)
  })
}

let _log = false

const actions = {
  log_activate: function () {
    browser.runtime.sendMessage(
      {
        command: 'log_activate'
      },
      r => {
        log('DEBUG', r)
        if (r?.res == 'ack') {
          _log = true
          document.querySelector('#popup-log').classList.remove('hidden')
          document.querySelector('#log_activate_action_id').textContent =
            'Deactivate Logs'
          document
            .querySelector('#log_activate_action_id')
            .setAttribute('action', 'log_deactivate')
        }
      }
    )
  },

  log_deactivate: function () {
    browser.runtime.sendMessage(
      {
        command: 'log_deactivate'
      },
      r => {
        log('DEBUG', r)
        if (r?.res == 'ack') {
          _log = false
          document.querySelector('#popup-log').classList.add('hidden')
          document.querySelector('#log_activate_action_id').textContent =
            'Activate Logs'
          document
            .querySelector('#log_activate_action_id')
            .setAttribute('action', 'log_activate')
        }
      }
    )
  },

  /////////////////////////////////////////////////////
  // tab conf
  tab_initialize: function () {
    browser.runtime.sendMessage(
      {
        command: 'tab_initialize'
      },
      r => {
        log('DEBUG', r)
        if (r?.res == 'ack') {
          document.querySelector('#popup-tab-configured').disabled = false
          document.querySelector('#popup-tab-find-id').disabled = false
          document.querySelector('#ide_manual_action_id').disabled = false
        }
      }
    )
  },
  tab_goto: function () {
    browser.runtime.sendMessage(
      {
        command: 'tab_goto'
      },
      r => {
        log('DEBUG', r)
        document.querySelector('#ide_manual_action_id').disabled = false
      }
    )
  },
  tab_find_id: function () {
    sendMessage({
      command: 'tab_find_id'
    })
  },

  /////////////////////////////////////////////////////
  // twitch
  twitch_connect: function () {
    const channelName = document.querySelector('#twitch_channel').value
    if (channelName) {
      log('DEBUG', `Connecting to twitch channel [${channelName}]`)
      browser.runtime.sendMessage(
        {
          command: 'twitch_connect',
          obj: channelName
        },
        r => {
          log('DEBUG', r)
          if (r.res != 'error') {
            document.querySelector('#twitch_channel').disabled = true
            document.querySelector('#twitch_button').disabled = true
            document.querySelector('#twitch_button').textContent = 'Connecting...'
          }
        }
      )
    } else {
      log('ERROR', 'Channel is empty')
    }
  },
  twitch_deconnect: function () {
    browser.runtime.sendMessage(
      {
        command: 'twitch_deconnect'
      },
      r => {
        log('DEBUG', r)
        if (r.res == 'ack') {
          document.querySelector('#twitch_channel').disabled = false
          document.querySelector('#twitch_channel').title = 'The name of your twitch channel. It will be converted to your channel id'
          document.querySelector('#twitch_button').textContent =
            'Connect to twitch'
          document
            .querySelector('#twitch_button')
            .setAttribute('action', 'twitch_connect')
        }
      }
    )
  },

  /////////////////////////////////////////////////////
  // ide
  ide_manual: function () {
    const ide_manual = document.querySelector('#popup-ide-manual')
    ide_manual.classList.toggle('hidden')
  },
  ide_activate: function () {
    sendMessage({
      command: 'ide_activate'
    })
  },
  ide_deactivate: function () {
    sendMessage({
      command: 'ide_deactivate'
    })
  },
  ide_clear: function () {
    sendMessage({
      command: 'ide_clear'
    })
  },
  ide_rotate: function () {
    sendMessage({
      command: 'ide_rotate'
    })
  },
  ide_block_letter: function () {
    const letter = document.getElementById('letter').value
    if (letter.length <= 1)
      sendMessage({
        command: 'ide_block_letter',
        obj: letter
      })
    else {
      log('ERROR', `Too much letters in [${letter}]`)
    }
  },
  ide_swap_submit: function () {
    sendMessage({
      command: 'ide_swap_submit'
    })
  },
  ide_deactivate_submit: function () {
    sendMessage({
      command: 'ide_deactivate_submit'
    })
  },
  ide_deactivate_test: function () {
    sendMessage({
      command: 'ide_deactivate_test'
    })
  }
}

// listen to all click, if there is an action on the elem, play it
document.addEventListener('click', e => {
  actions[e.target.getAttribute('action')]?.()
})

// because the popup is totally dispose when closed, do some init to get current info
browser.runtime.sendMessage(
  {
    command: 'log_get_status'
  },
  r => {
    _log = r?.obj
    log('DEBUG', r)
    if (_log) {
      document.querySelector('#popup-log').classList.remove('hidden')
      document.querySelector('#log_activate_action_id').textContent =
        'Deactivate Logs'
      document
        .querySelector('#log_activate_action_id')
        .setAttribute('action', 'log_deactivate')
    } else {
      document.querySelector('#popup-log').classList.add('hidden')
      document.querySelector('#log_activate_action_id').textContent =
        'Activate Logs'
      document
        .querySelector('#log_activate_action_id')
        .setAttribute('action', 'log_activate')
    }
  }
)

browser.runtime.sendMessage(
  {
    command: 'tab_get_id'
  },
  r => {
    log('DEBUG', r)
    document.querySelector('#popup-tab-initialize').disabled = false
    if (r?.obj) {
      document.querySelector('#popup-tab-configured').disabled = false
      document.querySelector('#popup-tab-find-id').disabled = false
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        if (r.obj == tabs[0].id) {
          document.querySelector('#ide_manual_action_id').disabled = false
        }
      })
    }
  }
)

function update_twitch_status (message) {
  const [status, channel] = message?.obj
  if (status === 'CONNECTING' || status === 'OPEN') {
    document.querySelector('#twitch_channel').disabled = true
    document.querySelector('#twitch_channel').value = channel.channelName
    document.querySelector('#twitch_channel').title = channel.channelId
    document.querySelector('#twitch_button').disabled = false
    document.querySelector('#twitch_button').textContent =
      'Deconnect from twitch'
    document
      .querySelector('#twitch_button')
      .setAttribute('action', 'twitch_deconnect')
  } else {
    document.querySelector('#twitch_channel').disabled = false
    document.querySelector('#twitch_channel').title = 'The name of your twitch channel. It will be converted to your channel id'
    document.querySelector('#twitch_button').disabled = false
    document.querySelector('#twitch_button').textContent = 'Connect to twitch'
    document
      .querySelector('#twitch_button')
      .setAttribute('action', 'twitch_connect')
  }
}
browser.runtime.sendMessage(
  {
    command: 'twitch_get_status'
  },
  r => {
    log('DEBUG', r)
    update_twitch_status(r)
  }
)

function update_cg_id (message) {
  document.querySelector('#identifiers').innerHTML =
    message.obj
      ? `${message.obj.pseudo} (${message.obj.userId}) - ${message.obj.publicHandle}`
      : 'Codingame identifiers not found'
}
browser.runtime.sendMessage({ command: 'get_cg_id' }, r => {
  log('DEBUG', r)
  update_cg_id(r)
})

function update_action_pending (message) {
  if (!message?.obj?.length) return
  const pending = document.querySelector('#popup-ide-actions-pending')
  pending.innerHTML = ''
  const span = document.createElement('span')
  span.textContent = 'Pending actions'
  pending.appendChild(span)
  const ul = document.createElement('ul')
  pending.appendChild(ul)
  for (action of message.obj) {
    const li = document.createElement('li')
    li.textContent = JSON.stringify(action)
    ul.appendChild(li)
  }
}
browser.runtime.sendMessage(
  {
    command: 'action_get_buffer'
  },
  r => {
    log('DEBUG', r)
    update_action_pending(r)
  }
)

browser.runtime.onMessage.addListener(function messageListener (
  message,
  sender,
  reply
) {
  log('DEBUG', ['onMessage', message, sender, reply])
  switch(message.command) {
    case 'buffer_change':
      update_action_pending(message)
      break
    case 'cg_id_change':
      update_cg_id(message)
      break
    case 'twitch_error':
      log('ERROR', message)
      // TODO display error on popup
      // FALLTHROUGH
    case 'twitch_change':
      update_twitch_status(message)
      break
    default:
      log('ERROR', {'unkown command message': message})
  }
})

document.querySelector('#popup-load').classList.add('hidden')
