# cgideconnector

## What it does ##

* connect to a tchat twich and listen specific commands
* apply those commands in CG IDE
* resize (double click) and move (hold click) code size div

## Commands available ##

- Activate IDE
- Deactivate IDE
- Clear content of IDE
- Rotate IDE
- Disable a specific letter in the IDE
- Swap submit and test buttons
- Deactivate submit for 30s
- Deactivate test

## TODO ##

- [ ] Finish swap submit action : swap image color. Hard because cannot access easily pseudo element
- [ ] fix swap and deactivate submit position conflict ?
- [x] detect ide page to inject script and apply buffered actions
- [ ] avoid duplicate buffered actions ?
- [ ] connect to twitch by channel name
- [ ] connect correctly to twitch and handle errors
- [x] badge on popup logo
- [x] popup logo
- [ ] better popup logo
- [x] buffered actions list in popup
- [ ] css buffered actions list in popup
- [ ] manual extension configuration to map twitch message to action
- [ ] fix firefox error log when hovering popup logo
- [ ] manifest v3. hard cause of websocket. need a workaround
- [ ] chrome compatibility. hard cause of manifest v3
- [x] give extension more permission ? extension lose activetab permission when reloading the page => unable to load content script without user interaction on the extension !
- [ ] handle refresh ? restore current actions of current clash ? no for now !

## How to build ##
```bash
sh build.sh
```

## How it works ##
```
 ---------------------------------------------------------------------------------------------------------
|  browser                                                          ***                                   |
|                                                                    |                                    |
|     --------------------                               -------------------------------------            |
|    |  background        |          drive              |   popup                             |           |
|    |                    |  <------------------------  |     - twitch chat configuration     |           |
|    |                    |                             |     - tab configuration             |           |
|    |                    |                             |     - manual action                 |           |
|     --------------------   \                           -------------------------------------            |
|             ^                \                                                                          |
|             |                  \                                                                        |
|             | listen message     \   inject and send message to content                                 |
|             |                      \                                                                    |
|      --------------                  \   ------------------------------------------------------------   |
|     |  twitch      |                   \|   webpage                                                  |  |
|     |              |                    |\                                                           |  |
|      --------------                     |  \        ----------------             ---------------     |  |
|                                         |    \     |   content      |    API    |    JS page    |    |  |
|                                         |      ->  |                |  ------>  |               |    |  |
|                                         |           ----------------             ---------------     |  |
|                                         |                  |                          |              |  |
|                                         |                  | modify                   | modify       |  |
|                                         |                  v                          v              |  |
|                                         |           --------------------------------------------     |  |
|                                         |          |   dom                                      |    |  |
|                                         |          |                                            |    |  |
|                                         |          |                                            |    |  |
|                                         |           --------------------------------------------     |  |
|                                          ------------------------------------------------------------   |
 ---------------------------------------------------------------------------------------------------------
```

### How to test in Firefox ###
https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installation






```
Example: Channel Points Event Message

{
"type": "reward-redeemed",
"data": {
  "timestamp": "2019-11-12T01:29:34.98329743Z",
  "redemption": {
    "id": "9203c6f0-51b6-4d1d-a9ae-8eafdb0d6d47",
    "user": {
      "id": "30515034",
      "login": "davethecust",
      "display_name": "davethecust"
    },
    "channel_id": "30515034",
    "redeemed_at": "2019-12-11T18:52:53.128421623Z",
    "reward": {
      "id": "6ef17bb2-e5ae-432e-8b3f-5ac4dd774668",
      "channel_id": "30515034",
      "title": "hit a gleesh walk on stream",
      "prompt": "cleanside's finest \n",
      "cost": 10,
      "is_user_input_required": true,
      "is_sub_only": false,
      "image": {
        "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/30515034/6ef17bb2-e5ae-432e-8b3f-5ac4dd774668/7bcd9ca8-da17-42c9-800a-2f08832e5d4b/custom-1.png",
        "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/30515034/6ef17bb2-e5ae-432e-8b3f-5ac4dd774668/7bcd9ca8-da17-42c9-800a-2f08832e5d4b/custom-2.png",
        "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/30515034/6ef17bb2-e5ae-432e-8b3f-5ac4dd774668/7bcd9ca8-da17-42c9-800a-2f08832e5d4b/custom-4.png"
      },
      "default_image": {
        "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
        "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
        "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
      },
      "background_color": "#00C7AC",
      "is_enabled": true,
      "is_paused": false,
      "is_in_stock": true,
      "max_per_stream": { "is_enabled": false, "max_per_stream": 0 },
      "should_redemptions_skip_request_queue": true
    },
    "user_input": "yeooo",
    "status": "FULFILLED"
    }
  }
}
Field           Type     Description
timestamp       string   Time the pubsub message was sent
redemption      object   Data about the redemption, includes unique id and user that redeemed it
channel_id      string   ID of the channel in which the reward was redeemed.
redeemed_at     string   Timestamp in which a reward was redeemed
reward          object   Data about the reward that was redeemed
user_input
(optional)      string   A string that the user entered if the reward requires input
status          string   reward redemption status, will be FULFULLED if a user skips the reward queue, UNFULFILLED otherwise
```