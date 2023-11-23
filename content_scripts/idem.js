;(function () {
  // global guard variable to load only once
  if (window.idemRun) {
    console.log('idem already loaded')
    return
  }
  window.idemRun = true

  function dispatchToIde (event) {
    // grrrrr firefox
    if (window.navigator.userAgent.toLowerCase().includes('firefox')) {
      event = cloneInto(event, window)
    }
    //var eventDetail = Components.utils.cloneInto(obj, doc.defaultView);
    window.document.dispatchEvent(new CustomEvent('ExternalEditorToIDE', event))
  }

  let blockLetterActionFunction, clearIdeActionFunction, _log

  function blockLetterFunction (letter) {
    return e => {
      const code = e.detail.code
        .replaceAll(letter.toLowerCase(), '')
        .replaceAll(letter.toUpperCase(), '')
      if (code != e.detail.code) {
        dispatchToIde({ detail: { status: 'updateCode', code: code } })
      }
    }
  }

  const actions = {
    get_status: function () {
      return 'content up'
    },

    tab_find_id: function () {
      if (_log) console.log('idem.js: tab_find_id')
      let fields
      const regex =
        /\"userId\":([0-9]+),.*,\"pseudo\":\"([^\"]+)\",.*,\"publicHandle\":\"([^\"]+)\"/
      for (const s of Array.from(document.scripts)) {
        fields = s.innerHTML.match(regex)
        if (fields) break
      }

      if (fields) {
        return {
          userId: fields[1],
          pseudo: fields[2],
          publicHandle: fields[3]
        }
      }

      throw new Error('No CodingGame identifiers found')
    },

    log_activate: function () {
      _log = true
    },

    log_deactivate: function () {
      _log = false
    },

    clear: function () {
      document.removeEventListener(
        'IDEToExternalEditor',
        clearIdeActionFunction
      )
      document.removeEventListener(
        'IDEToExternalEditor',
        blockLetterActionFunction
      )
      if (_log) console.log('clear')
    },

    ide_activate: function () {
      dispatchToIde({ detail: { status: 'setReadOnly', value: false } })
    },

    ide_deactivate: function () {
      dispatchToIde({ detail: { status: 'setReadOnly', value: true } })
    },

    ide_clear: function () {
      // this does not prevent ctrl + z !!
      // dispatchToIde({detail: {status: 'updateCode', code: ''}})

      // genious ack ? to prevent ctrl + z => block an invisible character to trigger endlessly the listener !
      invisibleChar = String.fromCodePoint(65279)
      // remove possible previous listener
      document.removeEventListener(
        'IDEToExternalEditor',
        clearIdeActionFunction
      )
      clearIdeActionFunction = blockLetterFunction(invisibleChar)
      document.addEventListener('IDEToExternalEditor', clearIdeActionFunction)
      // updateCode to that invisible character to init the infinite loop
      dispatchToIde({ detail: { status: 'updateCode', code: invisibleChar } })
    },

    ide_rotate: function () {
      const codeBloc = document.querySelector('.code-bloc')
      codeBloc.style.transition = 'transform 5s'
      // too much problem with cursor
      //codeBloc.style.transform = codeBloc.style.transform ? '' : 'rotate(180deg)'
      // this acceptable ? help on function is broken, multiline mouse selection broken
      codeBloc.style.transform = codeBloc.style.transform ? '' : 'scale(1, -1)'
    },

    ide_block_letter: function (letter) {
      // remove possible previous listener
      document.removeEventListener(
        'IDEToExternalEditor',
        blockLetterActionFunction
      )
      if (letter) {
        // with this implementation, the character can be written but will be removed just after
        // Unfortunately this is visible and will break ctrl + z each time the player write that character
        // Also the cursor does not get back to initial position
        // At the same time, that way it's easy to prevent ctrl + z, ctrl + c and other techniques
        blockLetterActionFunction = blockLetterFunction(letter)
        document.addEventListener(
          'IDEToExternalEditor',
          blockLetterActionFunction
        )
        // dispatch getCode to trigger listener and delete already present letter
        dispatchToIde({ detail: { status: 'getCode' } })
      } else {
        blockLetterActionFunction = undefined
      }
    },

    // TODO : swap image
    // No idea for now because it's handle with :before and not accessible through js ?
    ide_swap_submit: function () {
      const actions = document.querySelector('.cg-ide-actions')
      actions.style.display = 'flex'
      actions.style.flexDirection = 'column'

      const submit = document.querySelector('.submit')
      const submitOrder = submit.style.order || 2
      const submitColor = window.getComputedStyle(submit, null).color
      const submitImage = window.getComputedStyle(
        submit,
        ':before'
      ).backgroundImage

      const playAll = document.querySelector('.play-all-testcases')
      const playAllOrder = playAll.style.order || 1
      const playAllColor = window.getComputedStyle(playAll, null).color
      const playAllImage = window.getComputedStyle(
        playAll,
        ':before'
      ).backgroundImage

      if (_log) console.log(playAllImage)
      submit.style.order = playAllOrder
      submit.style.color = playAllColor

      //window.getComputedStyle(submit,':before').backgroundImage = playAllImage
      if (_log) console.log(submitImage)
      playAll.style.order = submitOrder
      playAll.style.color = submitColor
      //window.getComputedStyle(playAll,':before').backgroundImage = submitImage
    },

    ide_deactivate_submit: function () {
      const submit = document.querySelector('.submit')
      const width_original = submit.style.width
      const position_original = submit.style.position
      const zindex_original = submit.style['z-index']
      const left_original = submit.style.left
      const top_original = submit.style.top
      //const boxshadow_original = submit.style['box-shadow']

      const rect_submit = submit.getBoundingClientRect()
      const width_real = submit.clientWidth + 'px'
      const left_real = rect_submit.left + 'px'

      const rect_body = document.body.getBoundingClientRect()
      const width = rect_body.right
      const height = rect_body.bottom

      // TODO better. possible infinite loop if screen to small ?
      const listener = e => {
        let left_new, top_new
        do {
          left_new = (Math.random() * (width - submit.clientWidth)) | 0
          top_new = (Math.random() * (height - submit.clientHeight)) | 0
        } while (
          left_new <= e.clientX &&
          e.clientX <= ((left_new + submit.clientWidth) | 0) &&
          top_new <= e.clientY &&
          e.clientY <= ((top_new + submit.clientHeight) | 0)
        )

        if (_log) console.log(left_new, top_new, e)
        submit.style.left = left_new + 'px'
        submit.style.top = top_new + 'px'
      }

      submit.style.width = width_real
      submit.style.position = 'fixed'
      submit.style['z-index'] = 99999
      // submit.style['box-shadow'] = '0px 0px 10px'
      anim = submit.animate(
        [{ boxShadow: '0px 0px 0px' }, { boxShadow: '0px 0px 10px' }],
        {
          duration: 1000,
          iterations: Infinity,
          easing: 'ease-in-out',
          direction: 'alternate'
        }
      )

      submit.addEventListener('mousedown', listener)
      //l2 = e => console.log(e)
      //window.addEventListener('mousedown', l2)
      if (_log) console.log(width_real, left_real)
      setTimeout(() => {
        if (_log) console.log('timeout')
        //window.removeEventListener('mousedown', l2)
        submit.removeEventListener('mousedown', listener)
        submit.style.width = width_original
        submit.style.position = position_original
        submit.style['z-index'] = zindex_original
        submit.style.left = left_original
        submit.style.top = top_original
        //submit.style['box-shadow'] = boxshadow_original
        anim.cancel()
      }, 30000)
    },

    // TODO : how to bypass ctrl/cmd [+ maj] + enter ?????!
    // Looks like it's handle by monaco editor and cannot override it
    ide_deactivate_test: function () {
      // there is two .bloc-inner but the first is the good one !
      // because it's on top level to disable also custom test case, the wheel is disabled !
      const testcases = document.querySelector('.bloc-inner')
      const activate = testcases.style.pointerEvents
      testcases.style.pointerEvents = activate ? '' : 'none'
      testcases.style.opacity = activate ? '' : '30%'
      testcases.style.transition = 'opacity 2s'

      const all = document.querySelector('.play-all-testcases')
      all.style.pointerEvents = activate ? '' : 'none'
      all.style.opacity = activate ? '' : '30%'
      all.style.transition = 'opacity 2s'
    }
  }

  // Listen for messages from the background script.
  browser.runtime.onMessage.addListener((message, sender, reply) => {
    if (_log) console.log(message)
    if (_log) console.log(sender)
    if (_log) console.log(reply)
    // ensure each time that ide is in synchronized mode !
    dispatchToIde({ detail: { status: 'synchronized', value: true } })

    try {
      const obj = actions[message.command](message.obj)
      reply({ res: obj ? 'obj' : 'ack', obj: obj })
    } catch (e) {
      console.log('Error on message', message, e)
      reply({ res: 'error', message: message, error: e.toString() })
    }
  })

  // handle codesize move
  document.addEventListener('mousedown', function (event) {
    // only left click
    if (event.buttons != 1) return
    let el = event.target
    while (el && !el.className?.includes('code-counter')) {
      el = el.parentNode
    }
    if (!el) return
    let mousemove, mouseup
    let offsetx = el.offsetLeft - event.clientX
    let offsety = el.offsetTop - event.clientY
    el.style.left = event.clientX + offsetx + 'px'
    el.style.top = event.clientY + offsety + 'px'
    // reset right and bottom
    el.style.right = 'auto'
    el.style.bottom = 'auto'
    document.addEventListener(
      'mousemove',
      (mousemove = function (event) {
        el.style.left = event.clientX + offsetx + 'px'
        el.style.top = event.clientY + offsety + 'px'
      })
    )
    document.addEventListener(
      'mouseup',
      (mouseup = function (event) {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      })
    )
  })
  document.addEventListener('dblclick', function (event) {
    let el = event.target
    while (el && !el.className?.includes('code-counter')) {
      el = el.parentNode
    }
    if (!el) return
    const codesize = el.querySelector('.codesize-value')
    const fontsize = codesize.style['font-size']
    codesize.style['font-size'] = `${fontsize?.[0] == '2' ? 10 : 20}px`
  })

  console.log('idem loaded')
})()
