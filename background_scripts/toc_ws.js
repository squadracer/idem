class ToCWS {
  constructor () {
    console.log('ToC WS')
    this.ws = new WebSocket('ws://localhost:3000/cable')

    this.ws.onopen = event => {
      console.log('open', JSON.stringify(event))

      const channels = ['ContestantsChannel', 'TournamentsChannel']
      channels.forEach(channel => {
        console.log(
          'sending subscription for channel',
          channel,
          JSON.stringify(event)
        )
        const subscribe_msg = {
          command: 'subscribe',
          identifier: JSON.stringify({ channel: 'ContestantsChannel' })
        }
        this.ws.send(JSON.stringify(subscribe_msg))
        console.log('sent subscription', JSON.stringify(event))
      })
    }

    this.ws.onmessage = event =>
      console.log(
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
    this.ws.onerror = event => console.log('error', JSON.stringify(event))
    this.ws.onclose = event =>
      console.log(
        'close',
        JSON.stringify(event),
        event.code,
        event.reason,
        event.wasClean
      )
  }
}
