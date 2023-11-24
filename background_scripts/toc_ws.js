class ToCWS {
  #_ws

  constructor () {
    if (_log) console.log('ToC WS')
    this.#_ws = new WebSocket('ws://tournament-of-code.osc-fr1.scalingo.io//cable')

    this.#_ws.onopen = event => {
      if (_log) console.log('open', JSON.stringify(event))

      const channels = ['ContestantsChannel', 'TournamentsChannel', 'CodesChannel']
      channels.forEach(channel => {
        if (_log) console.log(
          'sending subscription for channel',
          channel,
          JSON.stringify(event)
        )
        const subscribe_msg = {
          command: 'subscribe',
          identifier: JSON.stringify({ channel: channel })
        }
        this.#_ws.send(JSON.stringify(subscribe_msg))
        if (_log) console.log('sent subscription', JSON.stringify(event))
      })
    }

    this.#_ws.onmessage = event => {
      if (_log) console.log(
        'message [ ',
        JSON.stringify(event),
        ']',
        event.data,
        '|',
        event.origin,
        event.lastEventId,
        event.source,
        event.ports
      )
    }
    this.#_ws.onerror = event => console.log('error', JSON.stringify(event))
    this.#_ws.onclose = event => {
      if (_log) console.log(
        'close',
        JSON.stringify(event),
        event.code,
        event.reason,
        event.wasClean
      )
    }
  }

  sendMessage(channel, data) {
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: channel
      }),
      data: JSON.stringify(data)
    };
    this.#_ws.send(JSON.stringify(msg));
  }
}
