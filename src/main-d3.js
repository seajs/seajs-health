/**
 * TODO 1. create dependencies tree
 * TODO 2. draw graph
 */
(function(win, doc) {

  var doc

  // Main config
  var config = {
    // Force debug when execute debug plugin
    debug: true,
    // Console panel status: true = show, false = hide
    show: true,
    // Load -debug file
    source: false,
    // Disable cache
    nocache: false,
    // Untie combo url
    combo: false,
    // Show seajs.log message: true = show, false = hide
    log: false,
    // Mode: mapping(false), editor(true)
    mode: false,
    // Custom config, highest priority
    custom: "",
    // mapping items
    mapping: []
  }

  var MAX_TRY = 100
  var pollCount = 0
  var STATUS_BUTTON_ON_CLS = "seajs-debug-status-on"
  var MIN_CLS = "seajs-debug-mini"


  function DebugPanel() {
    // Insert CSS
    importStyle(
      "@font-face{font-family:fontello;src:url(./font/fontello.eot) format('embedded-opentype'),url(data:application/x-font-woff;base64,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) format('woff'),url(./font/fontello.ttf) format('truetype'),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxtZXRhZGF0YT5Db3B5cmlnaHQgKEMpIDIwMTIgYnkgb3JpZ2luYWwgYXV0aG9ycyBAIGZvbnRlbGxvLmNvbTwvbWV0YWRhdGE+CjxkZWZzPgo8Zm9udCBpZD0iZm9udGVsbG8iIGhvcml6LWFkdi14PSIxMDAwIiA+Cjxmb250LWZhY2UgZm9udC1mYW1pbHk9ImZvbnRlbGxvIiBmb250LXdlaWdodD0iNDAwIiBmb250LXN0cmV0Y2g9Im5vcm1hbCIgdW5pdHMtcGVyLWVtPSIxMDAwIiBhc2NlbnQ9Ijg1MCIgZGVzY2VudD0iLTE1MCIgLz4KPG1pc3NpbmctZ2x5cGggaG9yaXotYWR2LXg9IjEwMDAiIC8+CjxnbHlwaCBnbHlwaC1uYW1lPSJwbHVzIiB1bmljb2RlPSImI3hlODA4OyIgZD0iTTkxMSA0NjJsMC0yMjMtMzM1IDAgMC0zMzUtMjIzIDAgMCAzMzUtMzM1IDAgMCAyMjMgMzM1IDAgMCAzMzUgMjIzIDAgMC0zMzUgMzM1IDB6IiBob3Jpei1hZHYteD0iOTI4IiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0ibWludXMiIHVuaWNvZGU9IiYjeGU4MDk7IiBkPSJNMTggMjM5bDAgMjIzIDg5MyAwIDAtMjIzLTg5MyAweiIgaG9yaXotYWR2LXg9IjkyOCIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImNsb2NrIiB1bmljb2RlPSImI3hlODAwOyIgZD0iTTAgMzUwcTAgOTUgMzcgMTgydDEwMCAxNTAgMTUwIDEwMCAxODIgMzcgMTgyLTM3IDE1MC0xMDAgMTAwLTE1MCAzNy0xODItMzctMTgyLTEwMC0xNTAtMTUwLTEwMC0xODItMzctMTgyIDM3LTE1MCAxMDAtMTAwIDE1MC0zNyAxODJ6IG0xMTcgMHEwLTk2IDQ3LTE3NnQxMjgtMTI4IDE3Ni00N3E5NiAwIDE3NiA0N3QxMjggMTI4IDQ3IDE3NnEwIDk1LTQ3IDE3NnQtMTI4IDEyOC0xNzYgNDdxLTcxIDAtMTM2LTI4dC0xMTItNzUtNzUtMTEyLTI4LTEzNnogbTI5MyAwbDAgMjI0cTAgMjQgMTcgNDF0NDEgMTcgNDEtMTcgMTctNDFsMC0yMDAgMTQyLTE0MnExNy0xNyAxNy00MXQtMTctNDEtNDEtMTdxLTI0IDAtNDEgMTdsLTE1OSAxNTlxLTEgMS00IDV0LTMgNHEtMSAxLTIgNGwtMSAzdC0xIDNxMCAwLTIgNS0xIDQtMSA1LTEgNi0xIDEyeiIgaG9yaXotYWR2LXg9IjkzNy41IiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iaGVscC1jaXJjbGVkLWFsdCIgdW5pY29kZT0iJiN4ZTgwNjsiIGQ9Ik0wIDM1MHEwIDk2IDM3IDE4MnQxMDAgMTQ5IDE0OSAxMDAgMTgyIDM3cTk1IDAgMTgyLTM3dDE1MC0xMDAgMTAwLTE0OSAzNy0xODJxMC05NS0zNy0xODJ0LTEwMC0xNTAtMTUwLTEwMC0xODItMzdxLTk2IDAtMTgyIDM3dC0xNDkgMTAwLTEwMCAxNTAtMzcgMTgyeiBtMTE3IDBxMC03MSAyOC0xMzZ0NzUtMTEyIDExMi03NSAxMzYtMjggMTM2IDI4IDExMiA3NSA3NSAxMTIgMjggMTM2cTAgOTYtNDcgMTc2dC0xMjggMTI4LTE3NiA0Ny0xNzYtNDctMTI4LTEyOC00Ny0xNzZ6IG0yMTYgMTc3bDMxLTEwMnE0NSAyOSA5MyAyOSA0OSAwIDQ5LTIzIDAtNC0yLTd0LTQtNi02LTUtNy00LTgtNGwtOC00LTQwLTIxcS0yMS0xMi0yOC0yNXQtNi0zN2wwLTM3IDExNyAwIDAgMTZxMCA3IDAgMTB0MiA2IDYgNXExIDAgMTAgNXQxNyA4IDE5IDEwIDE5IDEzcTE5IDE3IDI5IDM3dDEwIDU1cTAgNDktNDIgODN0LTEwNiAzNHEtODMgMC0xNDgtMzd6IG00OC0zMzRxMC0zMiAyMC00OXQ1NS0xN3EzNCAwIDU0IDE3dDIwIDQ5LTIwIDQ5LTU0IDE4cS0zNSAwLTU1LTE4dC0yMC00OXoiIGhvcml6LWFkdi14PSI5MzcuNSIgLz4KPGdseXBoIGdseXBoLW5hbWU9InJlc2l6ZS1zbWFsbCIgdW5pY29kZT0iJiN4ZTgwMzsiIGQ9Ik0wLTNsMjAxIDIwMS0xNDggMTQ2IDQ0MSAwIDAtNDQxLTE0NiAxNDgtMjAxLTIwMXogbTUwNiAzNTlsMCA0NDEgMTQ2LTE0OCAyMDEgMjAxIDE0Ni0xNDYtMjAxLTIwMSAxNDgtMTQ2LTQ0MSAweiIgaG9yaXotYWR2LXg9IjEwMDAiIC8+CjxnbHlwaCBnbHlwaC1uYW1lPSJyZXNpemUtZnVsbCIgdW5pY29kZT0iJiN4ZTgwNDsiIGQ9Ik0wLTE1MGwwIDQ0MSAxNDgtMTQ4IDIwMSAyMDEgMTQ1LTE0NS0yMDEtMjAxIDE0OC0xNDgtNDQxIDB6IG01MDYgNjUwbDIwMSAyMDEtMTQ4IDE0OCA0NDEgMCAwLTQ0MS0xNDggMTQ4LTIwMS0yMDF6IiBob3Jpei1hZHYteD0iMTAwMCIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImNvZyIgdW5pY29kZT0iJiN4ZTgwNzsiIGQ9Ik0wIDI3MmwwIDE1NiAxNTAgMTZxMTQgNDUgMzcgODhsLTk2IDExNyAxMDkgMTA5IDExNy05NnE0MSAyMyA4OCAzN2wxNiAxNTAgMTU2IDAgMTYtMTUwcTQ1LTE0IDg4LTM3bDExNyA5NiAxMDktMTA5LTk2LTExN3EyMy00MyAzNy04OGwxNTAtMTYgMC0xNTYtMTUwLTE2cS0xNC00Ny0zNy04OGw5Ni0xMTctMTA5LTEwOS0xMTcgOTZxLTQzLTIzLTg4LTM3bC0xNi0xNTAtMTU2IDAtMTYgMTUwcS00NyAxNC04OCAzN2wtMTE3LTk2LTEwOSAxMDkgOTYgMTE3cS0yMyA0MS0zNyA4OHogbTM1NSA3OHEwLTYxIDQyLTEwM3QxMDMtNDIgMTAzIDQyIDQyIDEwMy00MiAxMDMtMTAzIDQyLTEwMy00Mi00Mi0xMDN6IiBob3Jpei1hZHYteD0iMTAwMCIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImV5ZSIgdW5pY29kZT0iJiN4ZTgwMjsiIGQ9Ik0wIDM1MHEwIDMwIDE1IDY3dDQzIDc3IDcwIDc4IDkyIDY4IDExNSA0OCAxMzIgMTggMTMyLTE4IDExNS00OCA5Mi02OCA3MC03OCA0My03NyAxNS02N3EwLTI5LTE1LTY3dC00My03Ny03MC03OC05Mi02OC0xMTUtNDgtMTMyLTE4LTEzMiAxOC0xMTUgNDgtOTIgNjgtNzAgNzgtNDMgNzctMTUgNjd6IG0yMzQgMHEwLTYzIDMxLTExN3Q4NS04NSAxMTctMzEgMTE3IDMxIDg1IDg1IDMxIDExNy0zMSAxMTctODUgODUtMTE3IDMxLTExNy0zMS04NS04NS0zMS0xMTd6IG0xMzYgMHEwLTQxIDI5LTY5dDY5LTI5IDY5IDI5IDI5IDY5cTAgNDEtMjkgNzB0LTY5IDI5LTY5LTI5LTI5LTcweiIgaG9yaXotYWR2LXg9IjkzNy41IiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iaW5mby1jaXJjbGVkLWFsdCIgdW5pY29kZT0iJiN4ZTgwNTsiIGQ9Ik0wIDM1MHEwIDk2IDM3IDE4MnQxMDAgMTQ5IDE0OSAxMDAgMTgyIDM3cTk1IDAgMTgyLTM3dDE1MC0xMDAgMTAwLTE0OSAzNy0xODJxMC05NS0zNy0xODJ0LTEwMC0xNTAtMTUwLTEwMC0xODItMzdxLTk2IDAtMTgyIDM3dC0xNDkgMTAwLTEwMCAxNTAtMzcgMTgyeiBtMTE3IDBxMC03MSAyOC0xMzZ0NzUtMTEyIDExMi03NSAxMzYtMjggMTM2IDI4IDExMiA3NSA3NSAxMTIgMjggMTM2LTI4IDEzNi03NSAxMTItMTEyIDc1LTEzNiAyOC0xMzYtMjgtMTEyLTc1LTc1LTExMi0yOC0xMzZ6IG0yODEgMTcwcTAgMjggMTkgNDV0NTEgMTdxMzIgMCA1MS0xN3QxOS00Ni0xOS00Ni01MS0xN3EtMzIgMC01MSAxN3QtMTkgNDZ6IG00LTQwMmwwIDI5OSAxMzIgMCAwLTI5OS0xMzIgMHoiIGhvcml6LWFkdi14PSI5MzcuNSIgLz4KPGdseXBoIGdseXBoLW5hbWU9InNwcmVhZCIgdW5pY29kZT0iJiN4ZTgwMTsiIGQ9Ik0wIDQ5M3EwIDU4IDQxIDk4dDk4IDQxcTU4IDAgOTktNDF0NDEtOThxMC00MC0yMS03M2wyODItMjgxcTIwIDEyIDQwIDE3bDAgMzg5cS00NiAxMS03NiA0OXQtMzAgODZxMCA1OCA0MSA5OHQ5OSA0MXE1OCAwIDk4LTQxdDQxLTk4cTAtNDktMzAtODZ0LTc2LTQ5bDAtMzg5cTIwLTUgNDAtMTdsMjgyIDI4MXEtMjAgMzQtMjAgNzMgMCA1OCA0MSA5OXQ5OCA0MSA5OC00MSA0MS05OC00MS05OS05OC00MXEtMzcgMC03MiAyMWwtMjgyLTI4MnEyMS0zMyAyMS03MiAwLTU4LTQxLTk5dC05OC00MXEtNTggMC05OSA0MXQtNDEgOTlxMCAzOSAyMSA3MmwtMjgyIDI4MnEtMzYtMjEtNzItMjEtNTggMC05OCA0MXQtNDEgOTl6IiBob3Jpei1hZHYteD0iMTIyMi42NTYiIC8+CjwvZm9udD4KPC9kZWZzPgo8L3N2Zz4=) format('svg');font-weight:400;font-style:normal}#seajs-health-console,#seajs-health-console *{margin:0;padding:0;border:0;font:12px/1.2 Arial}#seajs-health-console{position:fixed;bottom:10px;width:1024px;height:720px;right:10px;bottom:10px;border:2px solid grey;z-index:2147483647;background:#FAFAFA;color:#000}#seajs-health-console{_position:absolute;_top:expression(documentElement.scrollTop+documentElement.clientHeight-this.clientHeight-5)}* html{_background:url(null) no-repeat fixed}#seajs-health-console a,#seajs-health-console a:hover,#seajs-health-console a:active,#seajs-health-console a:link{text-decoration:none}#seajs-health-console button{border:0;background:transparent;cursor:pointer}#seajs-health-console #seajs-debug-status button,#seajs-health-console #seajs-debug-meta button,#seajs-health-console #seajs-debug-map button{font-family:fontello;font-size:14px;color:#666}#seajs-health-console h3,#seajs-health-console textarea,#seajs-health-console #seajs-debug-map{border:0;border-bottom:1px solid lightgrey;font-family:Arial;font-size:14px}#seajs-health-console h3{margin:0;padding:5px 5px 5px 10px;height:20px;line-height:20px;font-weight:700;font-size:14px}#seajs-health-console textarea,#seajs-health-console #seajs-debug-map{min-height:100px;_height:100px}#seajs-health-console textarea{display:block;width:510px;padding:5px;background:#FFF;resize:vertical}#seajs-health-console #seajs-debug-map{padding:5px 0;background:#fff}#seajs-health-console #seajs-debug-map p{height:30px;line-height:30px;overflow:hidden}#seajs-health-console #seajs-debug-map p input{padding-left:6px;margin-left:10px;height:24px;border:1px solid #dcdcdc;width:220px}#seajs-health-console #seajs-debug-map button,#seajs-health-console #seajs-debug-meta button{width:30px;height:30px;line-height:30px;text-align:center}#seajs-health-console #seajs-debug-status{height:35px}#seajs-health-console #seajs-debug-status span{padding-left:8px;color:#AAA}#seajs-health-console #seajs-debug-status button{width:35px;height:35px;line-height:35px;border:0;background-color:#f5f5f5;border-right:1px solid lightgrey;background-image:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#f5f5f5));background-image:-webkit-linear-gradient(top,#fff,#f5f5f5);background-image:linear-gradient(top,#fff,#f5f5f5);background-image:-ms-linear-gradient(top,#fff,#f5f5f5);background-image:-moz-linear-gradient(top,#fff,#f5f5f5);background-image:-o-linear-gradient(top,#fff,#f5f5f5)}#seajs-health-console #seajs-debug-status button:hover,#seajs-health-console #seajs-debug-status button.seajs-debug-status-on:hover{color:#000}#seajs-health-console #seajs-debug-status button:active,#seajs-health-console #seajs-debug-status button.seajs-debug-status-on{color:#999;background-image:none;-webkit-box-shadow:inset 0 2px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 0 2px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 2px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.05)}#seajs-health-console #seajs-debug-buttons{position:absolute;right:4px;bottom:4px}#seajs-health-console #seajs-debug-buttons button{width:60px;padding:4px 0;box-shadow:#ddd 0 1px 2px;font-size:14px;color:#666;border:1px solid #dcdcdc;border:1px solid rgba(0,0,0,.1);border-radius:2px;text-align:center;background-color:#f5f5f5;background-image:-webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));background-image:-webkit-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-ms-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-moz-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-o-linear-gradient(top,#f5f5f5,#f1f1f1)}#seajs-health-console #seajs-debug-buttons button:hover{-webkit-box-shadow:0 1px 1px rgba(0,0,0,.1);background-color:#f8f8f8;background-image:-webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f1f1f1));background-image:-webkit-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-ms-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-moz-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-o-linear-gradient(top,#f8f8f8,#f1f1f1);border:1px solid #c6c6c6;box-shadow:0 1px 1px rgba(0,0,0,.1);color:#333}#seajs-health-console #seajs-debug-meta{position:absolute;right:0;top:0}#seajs-health-console #seajs-debug-meta button{background:#ddd}#seajs-health-console.seajs-debug-mini{width:30px;height:30px;border:0}#seajs-health-console.seajs-debug-mini h3,#seajs-health-console.seajs-debug-mini #seajs-debug-status,#seajs-health-console.seajs-debug-mini #seajs-debug-buttons{display:none}"
    )

    this.rootElement = null
    this.mappingElement = null
    this.statusButtonElement = null
    this.mainButtonElement = null
    this.metaButtonElement = null
    this.statusTipElement = null

    this.metaButtonInfo = [
      // [show or hide, icon, title, click callback fn]
      [config.show, "&#xe806;", "Go to help", function() {
        win.open('https://github.com/seajs/seajs-debug/issues/4', '_blank');
      }],
      [config.show, "&#xe803;", "Minimize console", function() {
        var buttons = this.metaButtonElement.getElementsByTagName("button")

        this.rootElement.className = MIN_CLS
        config.show = false

        buttons[0].style.display = "none"
        buttons[1].style.display = "none"
        buttons[2].style.display = "inline-block"
      }],
      [!config.show, "&#xe804;", "Maximize console", function() {
        var buttons = this.metaButtonElement.getElementsByTagName("button")

        this.rootElement.className = ""
        config.show = true

        buttons[0].style.display = "inline-block"
        buttons[1].style.display = "inline-block"
        buttons[2].style.display = "none"
      }]
    ]

    this._render()
  }

  DebugPanel.prototype._render = function() {
    var that = this

    this.rootElement = doc.createElement("div")
    this.rootElement.id = "seajs-health-console"
    this.rootElement.className = config.show ? "" : MIN_CLS
    this.rootElement.innerHTML = this._renderHTML()

    appendToBody(this.rootElement, function() {

      that.statusButtonElement = doc.getElementById("seajs-debug-status")
      that.metaButtonElement = doc.getElementById("seajs-debug-meta")

      config.mode && that.textareaElement.focus()
      that._bind()
    })
  }

  DebugPanel.prototype._renderHTML = function() {
    // Render HTML
    var html = '<h3>Sea.js Debug Console</h3>'
    var tmpHTML = ''
    var item

    // Meta button bar
    tmpHTML = ''
    for (var i = 0; i < this.metaButtonInfo.length; i++) {
      item = this.metaButtonInfo[i]

      tmpHTML += '<button title="'
        + item[2] + '"'
        + (item[0] ? '' : 'style="display: none;"')
        + '>' + item[1] + '</button>'
    }
    html += '<div id="seajs-debug-meta">'
      + tmpHTML
      + '</div>'

    return html
  }

  DebugPanel.prototype._bind = function() {
    var that = this

    // Mapping area
    addEvent(this.mappingElement, 'click', function(e) {
      var target = e.target

      if (target.tagName.toLowerCase() === "button") {
        var p = target.parentNode
        var parent = p.parentNode

        if (target.getAttribute("data-name") === "add") {
          var newElem = doc.createElement("p")

          newElem.innerHTML = p.innerHTML
          parent.appendChild(newElem)
          newElem.getElementsByTagName("input")[0].focus()

          target.style.display = "none"
          target.nextSibling.style.display = "inline-block"
        } else {
          parent.removeChild(p)
        }
      }
    })

    // Meta button bar
    buttons = this.metaButtonElement.getElementsByTagName("button")
    for (i = 0; i < buttons.length; i++) {
      (function(button, i) {
        addEvent(button, 'click', function() {
          var item = that.metaButtonInfo[i]

          item[3] && item[3].call(that)
          that._save()
        })
      })(buttons[i], i);
    }
  }
  // Save config
  DebugPanel.prototype._save = function() {

  }

  // Helpers

  function appendToBody(div, callback) {
    pollCount++

    if (doc.body) {
      doc.body.appendChild(div)
      callback && callback()
    }
    else if (pollCount < MAX_TRY) {
      setTimeout(function() {
        appendToBody(div, callback)
      }, 200)
    }
  }

  function importStyle(cssText) {
    var element = doc.createElement("style")

    // Add to DOM first to avoid the css hack invalid
    doc.getElementsByTagName("head")[0].appendChild(element)

    // IE
    if (element.styleSheet) {
      element.styleSheet.cssText = cssText
    }
    // W3C
    else {
      element.appendChild(doc.createTextNode(cssText))
    }
  }

  function addEvent(el, type, fn, capture) {
    if (!el) return;
    if (el.addEventListener) {
      el.addEventListener(type, fn, !!capture);
    } else if (el.attachEvent) {
      el.attachEvent('on' + type, fn);
    }
  }

  function removeEvent(el, type, fn, capture) {
    if (!el) return;
    if (el.removeEventListener) {
      el.removeEventListener(type, fn, !!capture);
    } else if (el.detachEvent) {
      el.detachEvent('on' + type, fn);
    }
  }

  function trim(str) {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
    for (var i = 0, len = str.length; i < len; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i)
        break
      }
    }
    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
  }

  function validateURL(textval) {
    var urlregex = new RegExp(
      "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(textval);
  }

  new DebugPanel()

  function isRoot(id) {
    return /_use_\d+$/.test(id)
  }

  var appDomain = 'https://seajs.github.io/seajs-health/'

  var d3 = appDomain + 'src/d3.v3.min.js'
  var health = appDomain + 'src/seajs-health'
  var d3App = appDomain + 'src/d3-app.js'
  var d3Css = appDomain + 'src/d3.css'

  var data = seajs.data
  var comboExcludes = /d3/

  if (data.comboExcludes) {
      var old = data.comboExcludes
      data.comboExcludes = function(uri) {
          return (old.test ? old.test(uri) : old(uri)) || comboExcludes.test(uri)
      }
  } else {
      data.comboExcludes = comboExcludes
  }

  seajs.use([d3App, health , d3, d3Css], function(d3App) {

    var d3Nodes = [], d3Links = [], d3Node, d3Link
    var d3NodeMapping = {}

    var nodes = seajs.health().circles.nodes
    var S = [], node

    for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i]
        if (node.inEdges.length == 0) {
          S.push(node)
        }
    }
    // while S is non-empty do
    while(S.length) {

      // remove a node n from S
      node = S.shift()

      d3Node = getD3Node(node)

      if (node.depth) {
        d3Nodes.push(d3Node)
      }

      // for each node with outEdges do
      while(node.outEdges.length) {

        // remove edge e from the node
        var e = node.outEdges.shift()
        var m = e.to

        if (node.depth) {
          d3Links.push(getD3Link(d3Node, getD3Node(m)))
        }

        // remove edge form m
        e.remove()

        // if m has no other incoming edges then insert m into S
        if (m.inEdges.length == 0) {
          S.push(m)
        }
      }
    }

    d3App.start(d3Nodes, d3Links)


    function getD3Node(node) {
      if (d3NodeMapping[node.name]) return d3NodeMapping[node.name]

      return d3NodeMapping[node.name] = {
          key: node.name
      }
    }

    function getD3Link(from, to) {
      return {
          source: from,
          target: to,
          left: false,
          right: true
      }
    }
  })

 }(this, document))

