
/*

twitch
https://dev.twitch.tv/docs/irc

TODO
- configuration message receive <=> action from popup ?
- websocket reconnection


{"type":"MESSAGE","data":{"topic":"community-points-channel-v1.688213995","message":"{\"type\":\"redemption-status-update\",\"data\":{\"timestamp\":\"2023-03-16T12:27:05.845496945Z\",\"redemption\":{\"id\":\"1a037ad8-bd28-4091-9317-cb79d0446ccb\",\"user\":{\"id\":\"38244554\",\"login\":\"mrmopi5002\",\"display_name\":\"MrMopi5002\"},\"channel_id\":\"688213995\",\"redeemed_at\":\"2023-03-16T11:37:52.487706681Z\",\"reward\":{\"id\":\"07a52f43-8e1c-48ab-b3ab-e9ce91105eb5\",\"channel_id\":\"688213995\",\"title\":\"Everyone programming language 💥\",\"prompt\":\"Choose the programming language of the next Clash ! It's for all participants !\",\"cost\":10000,\"is_user_input_required\":false,\"is_sub_only\":false,\"image\":null,\"default_image\":null,\"background_color\":\"#AE1392\",\"is_enabled\":false,\"is_paused\":false,\"is_in_stock\":false,\"max_per_stream\":{\"is_enabled\":false,\"max_per_stream\":0},\"should_redemptions_skip_request_queue\":false,\"template_id\":null,\"updated_for_indicator_at\":null,\"max_per_user_per_stream\":{\"is_enabled\":false,\"max_per_user_per_stream\":0},\"global_cooldown\":{\"is_enabled\":false,\"global_cooldown_seconds\":0},\"redemptions_redeemed_current_stream\":null,\"cooldown_expires_at\":null},\"user_input\":\"ruby\",\"status\":\"ACTION_TAKEN\",\"cursor\":\"MWEwMzdhZDgtYmQyOC00MDkxLTkzMTctY2I3OWQwNDQ2Y2NiX18yMDIzLTAzLTE2VDExOjM3OjUyLjQ4NzcwNjY4MVo=\"}}}"}}
{"type":"MESSAGE","data":{"topic":"community-points-channel-v1.688213995","message":"{\"type\":\"redemption-status-update\",\"data\":{\"timestamp\":\"2023-03-16T12:27:08.137161558Z\",\"redemption\":{\"id\":\"186af00d-2804-4cf8-b268-54315da9ff2e\",\"user\":{\"id\":\"76885421\",\"login\":\"samirlinux\",\"display_name\":\"samirlinux\"},\"channel_id\":\"688213995\",\"redeemed_at\":\"2023-03-16T11:36:44.562375019Z\",\"reward\":{\"id\":\"71f73cec-fca2-448d-b58a-5d9551b6cc86\",\"channel_id\":\"688213995\",\"title\":\"Streamers' programming language\",\"prompt\":\"Choose the programming language for the streamers for the next Clash\",\"cost\":5000,\"is_user_input_required\":false,\"is_sub_only\":false,\"image\":null,\"default_image\":null,\"background_color\":\"#145C9E\",\"is_enabled\":false,\"is_paused\":false,\"is_in_stock\":false,\"max_per_stream\":{\"is_enabled\":false,\"max_per_stream\":0},\"should_redemptions_skip_request_queue\":false,\"template_id\":null,\"updated_for_indicator_at\":null,\"max_per_user_per_stream\":{\"is_enabled\":false,\"max_per_user_per_stream\":0},\"global_cooldown\":{\"is_enabled\":false,\"global_cooldown_seconds\":0},\"redemptions_redeemed_current_stream\":null,\"cooldown_expires_at\":null},\"user_input\":\"GO\",\"status\":\"ACTION_TAKEN\",\"cursor\":\"MTg2YWYwMGQtMjgwNC00Y2Y4LWIyNjgtNTQzMTVkYTlmZjJlX18yMDIzLTAzLTE2VDExOjM2OjQ0LjU2MjM3NTAxOVo=\"}}}"}}


message [  {"isTrusted":true} ] {"type":"MESSAGE","data":{"topic":"community-points-channel-v1.688213995","message":"{\"type\":\"custom-reward-updated\",\"data\":{\"timestamp\":\"2023-03-30T11:08:44.190257555Z\",\"updated_reward\":{\"id\":\"ba0b7248-8536-4356-9c58-d218ae008f1c\",\"channel_id\":\"688213995\",\"title\":\"Choose a letter to block 😱\",\"prompt\":\"Give the streamers a letter they won't be able to use in the next Clash !\",\"cost\":3000,\"is_user_input_required\":true,\"is_sub_only\":false,\"image\":null,\"default_image\":{\"url_1x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-1.png\",\"url_2x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-2.png\",\"url_4x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-4.png\"},\"background_color\":\"#1345AA\",\"is_enabled\":true,\"is_paused\":false,\"is_in_stock\":false,\"max_per_stream\":{\"is_enabled\":false,\"max_per_stream\":0},\"should_redemptions_skip_request_queue\":false,\"template_id\":null,\"updated_for_indicator_at\":\"2022-02-17T11:12:20.226964358Z\",\"max_per_user_per_stream\":{\"is_enabled\":true,\"max_per_user_per_stream\":1},\"global_cooldown\":{\"is_enabled\":true,\"global_cooldown_seconds\":1200},\"redemptions_redeemed_current_stream\":null,\"cooldown_expires_at\":\"2023-03-30T11:28:44Z\"}}}"}}

 | wss://pubsub-edge.twitch.tv <empty string> null 
Array []


message [  {"isTrusted":true} ] {"type":"MESSAGE","data":{"topic":"community-points-channel-v1.688213995","message":"{\"type\":\"reward-redeemed\",\"data\":{\"timestamp\":\"2023-03-30T11:08:44.190257555Z\",\"redemption\":{\"id\":\"43bfd0dd-368d-49aa-88b5-118e2186f697\",\"user\":{\"id\":\"760593921\",\"login\":\"opoint0\",\"display_name\":\"opoint0\"},\"channel_id\":\"688213995\",\"redeemed_at\":\"2023-03-30T11:08:44.190257555Z\",\"reward\":{\"id\":\"ba0b7248-8536-4356-9c58-d218ae008f1c\",\"channel_id\":\"688213995\",\"title\":\"Choose a letter to block 😱\",\"prompt\":\"Give the streamers a letter they won't be able to use in the next Clash !\",\"cost\":3000,\"is_user_input_required\":true,\"is_sub_only\":false,\"image\":null,\"default_image\":{\"url_1x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-1.png\",\"url_2x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-2.png\",\"url_4x\":\"https://static-cdn.jtvnw.net/custom-reward-images/default-4.png\"},\"background_color\":\"#1345AA\",\"is_enabled\":true,\"is_paused\":false,\"is_in_stock\":false,\"max_per_stream\":{\"is_enabled\":false,\"max_per_stream\":0},\"should_redemptions_skip_request_queue\":false,\"template_id\":null,\"updated_for_indicator_at\":\"2022-02-17T11:12:20.226964358Z\",\"max_per_user_per_stream\":{\"is_enabled\":true,\"max_per_user_per_stream\":1},\"global_cooldown\":{\"is_enabled\":true,\"global_cooldown_seconds\":1200},\"redemptions_redeemed_current_stream\":null,\"cooldown_expires_at\":\"2023-03-30T11:28:44Z\"},\"user_input\":\"e\",\"status\":\"UNFULFILLED\",\"cursor\":\"NDNiZmQwZGQtMzY4ZC00OWFhLTg4YjUtMTE4ZTIxODZmNjk3X18yMDIzLTAzLTMwVDExOjA4OjQ0LjE5MDI1NzU1NVo=\"}}}"}}

 | wss://pubsub-edge.twitch.tv <empty string> null 
Array []


*/
class TwitchWS {

    #_channel
    #_actions
    #_ws
    #_topic
    #_heartbeatJob

    constructor(channel, actions) {
        this.#_channel = channel
        this.#_actions = actions
        // to try to get specific message
        // wss://pubsub-edge.twitch.tv/v1
        // https://dev.twitch.tv/docs/pubsub/
        
        // _ws = new WebSocket(`ws://localhost:2000/`)
        //_ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443'); const handler = twitch_chat_handler
        this.#_ws = new WebSocket('wss://pubsub-edge.twitch.tv/v1')
        // TODO. find a simple way to retrieve channel id from name
        // squadracer => 688213995
        this.#_topic = `community-points-channel-v1.${this.#_channel}`
        
        this.#onOpen()
        this.#onMessage()
        this.#onError()
        this.#onClose()
    }

    get status() {
        return ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.#_ws.readyState]
    }
    get channel() {
        return this.#_channel
    }
    close() {
        this.#_ws.close()
    }
    sendMessage(object) {
        this.#_ws.send(JSON.stringify(object))
    }

    // private
	#heartbeat() {
        this.sendMessage({type: 'PING'})
    }
	#listen() {
        this.sendMessage({"type": "LISTEN", "nonce": "only_one", "data": {"topics": [this.#_topic]}})
    }

    #processMessage(message) {
        if (message.type != 'reward-redeemed') return

        const title = message.data.redemption.reward.title
        const user_input = message.data.redemption.user_input
        if (title.includes('Choose a letter to block')) {
            // here we find the first valid character authorize
            // otherwise send empty string to reset filtering
            // for now we accept _ than can be interesting
            this.#_actions.ide_block_letter(user_input?.match(/\w/)?.[0] || '')
        } else if (title.includes('Flip IDE')) {
            this.#_actions.ide_rotate()
        } else if (title.includes('Deactivate submit button')) {
            this.#_actions.ide_deactivate_submit()
        } else if (title.includes('Deactivate test button')) {
            this.#_actions.ide_deactivate_test()
        } else {
            console.log('Unhandle message :', message)
        }
    }

    // websocket callback
	#onOpen() {
        this.#_ws.onopen = event => {
            if (_log) console.log('open', JSON.stringify(event))
    
            // just in case !
            clearInterval(this.#_heartbeatJob)
            // need to learn js more :)
            // this does not work for obscur reason. heartbeat is being call but sendMessage is not the one in this class. why ?
            // related to scope of 'this'...
            // setInterval(this.#heartbeat, 1000 * 290)
            this.#_heartbeatJob = setInterval(() => this.#heartbeat(), 1000 * 290) // every 4min50
            this.#listen()
        }
	}

	#onMessage() {
        this.#_ws.onmessage = event => {
            if (_log) console.log('message [ ', JSON.stringify(event), ']', event.data, '|', event.origin, event.lastEventId, event.source, event.ports)
            const data = JSON.parse(event.data)
            
            switch(data.type) {
                case 'RESPONSE':
                    if (data.nonce == 'only_one') {
                        if (data.error != '') {
                            console.error(`Could not listen to channel point because : ${data.error}`)
                        }
                    } else {
                        console.warn(`Unexpected nonce = ${data.nonce}`)
                    }
                    break
                case 'RECONNECT':
                    console.warn("TODO handle RECONNECT")
                    break
                case 'PONG':
                    console.warn("TODO handle PONG missing")
                    break
                case 'MESSAGE':
                    if (data.data.topic != this.#_topic) {
                        console.warn(`Unexpected topic : ${data.data.topic}`)
                    } else {
                        // the message can be a string
                        if (typeof data.data.message === 'string') data.data.message = JSON.parse(data.data.message)
                        this.#processMessage(data.data.message)
                    }
                    break
    
                default:
                    console.warn('Unhandled message...', data)
                    break
            }
        }
	}
	
	#onError() {
        this.#_ws.onerror = event => {
            console.log('error', JSON.stringify(event))
        }
	}
	
	#onClose() {
        this.#_ws.onclose = event => {
            if (_log) console.log('close', JSON.stringify(event), event.code, event.reason, event.wasClean)
            clearInterval(this.#_heartbeatJob)
            this.#_actions.twitch_deconnect()
        }
	}

}
