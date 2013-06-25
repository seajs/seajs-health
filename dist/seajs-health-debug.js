/**
 * A Sea.js plugin for collecting health data of CMD modules
 */
(function(seajs) {

  seajs.health = function() {
    return {
      "multiVersions": getMultiVersions(),
      "circles": getCircles()
    }
  }


  var cachedMods = seajs.cache
  var VERSION_RE = /(\/)(?:\d+\.){1,2}\d+(\/)|(\D)(?:\d+\.){1,2}\d+[^/]*(\.(?:js|css))/

  // Only support version styles bellow:
  // `zz/1.2.3/xx`
  // `zz/xx-1.2.3-beta.js`
  // `zz/xx.1.2.3.rc2.js`
  function getMultiVersions() {
    var hash = {}
    var ret = {}

    for (var uri in cachedMods) {
      var m = uri.match(VERSION_RE)
      if (!m) continue

      var key = uri.replace(VERSION_RE,
          (m[1] || m[3]) + "{version}" + (m[2] || m[4]))

      var arr = hash[key] || (hash[key] = [])

      if (indexOf(arr, uri) === -1) {
        arr.push(uri)
        if (arr.length > 1) {
          ret[key] = arr
        }
      }
    }

    return ret
  }


  function getCircles() {
    return "NOT Available"
  }


  // Helpers

  var indexOf = [].indexOf ?
      function(arr, item) {
        return arr.indexOf(item)
      } :
      function(arr, item) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === item) {
            return i
          }
        }
        return -1
      }


  // Register as module
  define("seajs-health-debug", [], {})

})(seajs);

