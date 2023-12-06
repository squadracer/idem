class ToCWS {
  constructor () {
    if (_log) console.log('ToC WS')
    this.ws = new WebSocket(TOC_WS_URL)

    this.ws.onopen = event => {
      if (_log) console.log('open', JSON.stringify(event))

      const channels = ['ContestantsChannel', 'TournamentsChannel']
      channels.forEach(channel => {
        if (_log) console.log(
          'sending subscription for channel',
          channel,
          JSON.stringify(event)
        )
        const subscribe_msg = {
          command: 'subscribe',
          identifier: JSON.stringify({ channel: 'ContestantsChannel' })
        }
        this.ws.send(JSON.stringify(subscribe_msg))
        if (_log) console.log('sent subscription', JSON.stringify(event))
      })
    }

    this.ws.onmessage = event => {
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
    this.ws.onerror = event => console.log('error', JSON.stringify(event))
    this.ws.onclose = event => {
      if (_log) console.log(
        'close',
        JSON.stringify(event),
        event.code,
        event.reason,
        event.wasClean
      )
    }
  }
}
