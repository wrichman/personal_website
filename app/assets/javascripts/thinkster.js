/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function (window, undefined) {
  var readyList, rootjQuery, core_strundefined = typeof undefined,
    location = window.location,
    document = window.document,
    docElem = document.documentElement,
    _jQuery = window.jQuery,
    _$ = window.$,
    class2type = {}, core_deletedIds = [],
    core_version = "1.10.2",
    core_concat = core_deletedIds.concat,
    core_push = core_deletedIds.push,
    core_slice = core_deletedIds.slice,
    core_indexOf = core_deletedIds.indexOf,
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty,
    core_trim = core_version.trim,
    jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery)
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    core_rnotwhite = /\S+/g,
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    rvalidchars = /^[\],:{}\s]*$/,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function (all, letter) {
      return letter.toUpperCase()
    }, completed = function (event) {
      if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
        detach();
        jQuery.ready()
      }
    }, detach = function () {
      if (document.addEventListener) {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false)
      } else {
        document.detachEvent("onreadystatechange", completed);
        window.detachEvent("onload", completed)
      }
    };
  jQuery.fn = jQuery.prototype = {
    jquery: core_version,
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem;
      if (!selector) {
        return this
      }
      if (typeof selector === "string") {
        if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
          match = [null, selector, null]
        } else {
          match = rquickExpr.exec(selector)
        } if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match])
                } else {
                  this.attr(match, context[match])
                }
              }
            }
            return this
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              if (elem.id !== match[2]) {
                return rootjQuery.find(selector)
              }
              this.length = 1;
              this[0] = elem
            }
            this.context = document;
            this.selector = selector;
            return this
          }
        } else {
          if (!context || context.jquery) {
            return (context || rootjQuery).find(selector)
          } else {
            return this.constructor(context).find(selector)
          }
        }
      } else {
        if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this
        } else {
          if (jQuery.isFunction(selector)) {
            return rootjQuery.ready(selector)
          }
        }
      } if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context
      }
      return jQuery.makeArray(selector, this)
    },
    selector: "",
    length: 0,
    toArray: function () {
      return core_slice.call(this)
    },
    get: function (num) {
      return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args)
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem)
      }))
    },
    end: function () {
      return this.prevObject || this.constructor(null)
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {}
    }
    if (length === i) {
      target = this;
      --i
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : []
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {}
            }
            target[name] = jQuery.extend(deep, clone, copy)
          } else {
            if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
    }
    return target
  };
  jQuery.extend({
    expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery
      }
      return jQuery
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++
      } else {
        jQuery.ready(true)
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return
      }
      if (!document.body) {
        return setTimeout(jQuery.ready)
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger("ready").off("ready")
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === "function"
    },
    isArray: Array.isArray || function (obj) {
      return jQuery.type(obj) === "array"
    },
    isWindow: function (obj) {
      return obj != null && obj == obj.window
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj)
    },
    type: function (obj) {
      if (obj == null) {
        return String(obj)
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object" : typeof obj
    },
    isPlainObject: function (obj) {
      var key;
      if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false
        }
      } catch (e) {
        return false
      }
      if (jQuery.support.ownLast) {
        for (key in obj) {
          return core_hasOwn.call(obj, key)
        }
      }
      for (key in obj) {}
      return key === undefined || core_hasOwn.call(obj, key)
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false
      }
      return true
    },
    error: function (msg) {
      throw new Error(msg)
    },
    parseHTML: function (data, context, keepScripts) {
      if (!data || typeof data !== "string") {
        return null
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false
      }
      context = context || document;
      var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])]
      }
      parsed = jQuery.buildFragment([data], context, scripts);
      if (scripts) {
        jQuery(scripts).remove()
      }
      return jQuery.merge([], parsed.childNodes)
    },
    parseJSON: function (data) {
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data)
      }
      if (data === null) {
        return data
      }
      if (typeof data === "string") {
        data = jQuery.trim(data);
        if (data) {
          if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
            return (new Function("return " + data))()
          }
        }
      }
      jQuery.error("Invalid JSON: " + data)
    },
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== "string") {
        return null
      }
      try {
        if (window.DOMParser) {
          tmp = new DOMParser();
          xml = tmp.parseFromString(data, "text/xml")
        } else {
          xml = new ActiveXObject("Microsoft.XMLDOM");
          xml.async = "false";
          xml.loadXML(data)
        }
      } catch (e) {
        xml = undefined
      }
      if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
        jQuery.error("Invalid XML: " + data)
      }
      return xml
    },
    noop: function () {},
    globalEval: function (data) {
      if (data && jQuery.trim(data)) {
        (window.execScript || function (data) {
          window["eval"].call(window, data)
        })(data)
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
    },
    each: function (obj, callback, args) {
      var value, i = 0,
        length = obj.length,
        isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break
            }
          }
        }
      }
      return obj
    },
    trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function (text) {
      return text == null ? "" : core_trim.call(text)
    } : function (text) {
      return text == null ? "" : (text + "").replace(rtrim, "")
    },
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
        } else {
          core_push.call(ret, arr)
        }
      }
      return ret
    },
    inArray: function (elem, arr, i) {
      var len;
      if (arr) {
        if (core_indexOf) {
          return core_indexOf.call(arr, elem, i)
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
          if (i in arr && arr[i] === elem) {
            return i
          }
        }
      }
      return -1
    },
    merge: function (first, second) {
      var l = second.length,
        i = first.length,
        j = 0;
      if (typeof l === "number") {
        for (; j < l; j++) {
          first[i++] = second[j]
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++]
        }
      }
      first.length = i;
      return first
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [],
        i = 0,
        length = elems.length;
      inv = !! inv;
      for (; i < length; i++) {
        retVal = !! callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i])
        }
      }
      return ret
    },
    map: function (elems, callback, arg) {
      var value, i = 0,
        length = elems.length,
        isArray = isArraylike(elems),
        ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value
          }
        }
      }
      return core_concat.apply([], ret)
    },
    guid: 1,
    proxy: function (fn, context) {
      var args, proxy, tmp;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp
      }
      if (!jQuery.isFunction(fn)) {
        return undefined
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context || this, args.concat(core_slice.call(arguments)))
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy
    },
    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0,
        length = elems.length,
        bulk = key == null;
      if (jQuery.type(key) === "object") {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
        }
      } else {
        if (value !== undefined) {
          chainable = true;
          if (!jQuery.isFunction(value)) {
            raw = true
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null
            } else {
              bulk = fn;
              fn = function (elem, key, value) {
                return bulk.call(jQuery(elem), value)
              }
            }
          }
          if (fn) {
            for (; i < length; i++) {
              fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
            }
          }
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
    },
    now: function () {
      return (new Date()).getTime()
    },
    swap: function (elem, options, callback, args) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name]
      }
      ret = callback.apply(elem, args || []);
      for (name in options) {
        elem.style[name] = old[name]
      }
      return ret
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete") {
        setTimeout(jQuery.ready)
      } else {
        if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", completed, false);
          window.addEventListener("load", completed, false)
        } else {
          document.attachEvent("onreadystatechange", completed);
          window.attachEvent("onload", completed);
          var top = false;
          try {
            top = window.frameElement == null && document.documentElement
          } catch (e) {}
          if (top && top.doScroll) {
            (function doScrollCheck() {
              if (!jQuery.isReady) {
                try {
                  top.doScroll("left")
                } catch (e) {
                  return setTimeout(doScrollCheck, 50)
                }
                detach();
                jQuery.ready()
              }
            })()
          }
        }
      }
    }
    return readyList.promise(obj)
  };
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
  });

  function isArraylike(obj) {
    var length = obj.length,
      type = jQuery.type(obj);
    if (jQuery.isWindow(obj)) {
      return false
    }
    if (obj.nodeType === 1 && length) {
      return true
    }
    return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj)
  }
  rootjQuery = jQuery(document);
  /*!
   * Sizzle CSS Selector Engine v1.10.2
   * http://sizzlejs.com/
   *
   * Copyright 2013 jQuery Foundation, Inc. and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2013-07-03
   */


  (function (window, undefined) {
    var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -(new Date()),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      hasDuplicate = false,
      sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0
        }
        return 0
      }, strundefined = typeof undefined,
      MAX_NEGATIVE = 1 << 31,
      hasOwn = ({}).hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      indexOf = arr.indexOf || function (elem) {
        var i = 0,
          len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i
          }
        }
        return -1
      }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      whitespace = "[\\x20\\t\\r\\n\\f]",
      characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      identifier = characterEncoding.replace("w", "w#"),
      attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
      pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
      rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
      rsibling = new RegExp(whitespace + "*[+~]"),
      rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        ID: new RegExp("^#(" + characterEncoding + ")"),
        CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
        TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      }, rnative = /^[^{]+\{\s*\[native \w/,
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      rescape = /'|\\/g,
      runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
      funescape = function (_, escaped, escapedWhitespace) {
        var high = "0x" + escaped - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
      };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els))
        } : function (target, els) {
          var j = target.length,
            i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1
        }
      }
    }

    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context)
      }
      context = context || document;
      results = results || [];
      if (!selector || typeof selector !== "string") {
        return results
      }
      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return []
      }
      if (documentIsHTML && !seed) {
        if ((match = rquickExpr.exec(selector))) {
          if ((m = match[1])) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results
                }
              } else {
                return results
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results
              }
            }
          } else {
            if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results
            } else {
              if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                push.apply(results, context.getElementsByClassName(m));
                return results
              }
            }
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
            groups = tokenize(selector);
            if ((old = context.getAttribute("id"))) {
              nid = old.replace(rescape, "\\$&")
            } else {
              context.setAttribute("id", nid)
            }
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i])
            }
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(",")
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results
            } catch (qsaError) {} finally {
              if (!old) {
                context.removeAttribute("id")
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed)
    }

    function createCache() {
      var keys = [];

      function cache(key, value) {
        if (keys.push(key += " ") > Expr.cacheLength) {
          delete cache[keys.shift()]
        }
        return (cache[key] = value)
      }
      return cache
    }

    function markFunction(fn) {
      fn[expando] = true;
      return fn
    }

    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div)
      } catch (e) {
        return false
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div)
        }
        div = null
      }
    }

    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
        i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler
      }
    }

    function siblingCheck(a, b) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1
          }
        }
      }
      return a ? 1 : -1
    }

    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type
      }
    }

    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type
      }
    }

    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument),
            i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j])
            }
          }
        })
      })
    }
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false
    };
    support = Sizzle.support = {};
    setDocument = Sizzle.setDocument = function (node) {
      var doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document
      }
      document = doc;
      docElem = doc.documentElement;
      documentIsHTML = !isXML(doc);
      if (parent && parent.attachEvent && parent !== parent.top) {
        parent.attachEvent("onbeforeunload", function () {
          setDocument()
        })
      }
      support.attributes = assert(function (div) {
        div.className = "i";
        return !div.getAttribute("className")
      });
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(doc.createComment(""));
        return !div.getElementsByTagName("*").length
      });
      support.getElementsByClassName = assert(function (div) {
        div.innerHTML = "<div class='a'></div><div class='a i'></div>";
        div.firstChild.className = "i";
        return div.getElementsByClassName("i").length === 2
      });
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length
      });
      if (support.getById) {
        Expr.find.ID = function (id, context) {
          if (typeof context.getElementById !== strundefined && documentIsHTML) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : []
          }
        };
        Expr.filter.ID = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId
          }
        }
      } else {
        delete Expr.find.ID;
        Expr.filter.ID = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
            return node && node.value === attrId
          }
        }
      }
      Expr.find.TAG = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== strundefined) {
          return context.getElementsByTagName(tag)
        }
      } : function (tag, context) {
        var elem, tmp = [],
          i = 0,
          results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem)
            }
          }
          return tmp
        }
        return results
      };
      Expr.find.CLASS = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
          return context.getElementsByClassName(className)
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(doc.querySelectorAll))) {
        assert(function (div) {
          div.innerHTML = "<select><option selected=''></option></select>";
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked")
          }
        });
        assert(function (div) {
          var input = doc.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("t", "");
          if (div.querySelectorAll("[t^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled")
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:")
        })
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function (div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos)
        })
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
          bup = b && b.parentNode;
        return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
      } : function (a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true
            }
          }
        }
        return false
      };
      sortOrder = docElem.compareDocumentPosition ? function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0
        }
        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        if (compare) {
          if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
            if (a === doc || contains(preferredDoc, a)) {
              return -1
            }
            if (b === doc || contains(preferredDoc, b)) {
              return 1
            }
            return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
          }
          return compare & 4 ? -1 : 1
        }
        return a.compareDocumentPosition ? -1 : 1
      } : function (a, b) {
        var cur, i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [a],
          bp = [b];
        if (a === b) {
          hasDuplicate = true;
          return 0
        } else {
          if (!aup || !bup) {
            return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
          } else {
            if (aup === bup) {
              return siblingCheck(a, b)
            }
          }
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur)
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur)
        }
        while (ap[i] === bp[i]) {
          i++
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
      };
      return doc
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements)
    };
    Sizzle.matchesSelector = function (elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem)
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0
    };
    Sizzle.contains = function (context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context)
      }
      return contains(context, elem)
    };
    Sizzle.attr = function (elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem)
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val
    };
    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg)
    };
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [],
        j = 0,
        i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i)
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1)
        }
      }
      return results
    };
    getText = Sizzle.getText = function (elem) {
      var node, ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if (!nodeType) {
        for (;
          (node = elem[i]); i++) {
          ret += getText(node)
        }
      } else {
        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if (typeof elem.textContent === "string") {
            return elem.textContent
          } else {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem)
            }
          }
        } else {
          if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue
          }
        }
      }
      return ret
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function (match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " "
          }
          return match.slice(0, 4)
        },
        CHILD: function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0])
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd")
          } else {
            if (match[3]) {
              Sizzle.error(match[0])
            }
          }
          return match
        },
        PSEUDO: function (match) {
          var excess, unquoted = !match[5] && match[2];
          if (matchExpr.CHILD.test(match[0])) {
            return null
          }
          if (match[3] && match[4] !== undefined) {
            match[2] = match[4]
          } else {
            if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
              match[0] = match[0].slice(0, excess);
              match[2] = unquoted.slice(0, excess)
            }
          }
          return match.slice(0, 3)
        }
      },
      filter: {
        TAG: function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
          }
        },
        CLASS: function (className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
          })
        },
        ATTR: function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!="
            }
            if (!operator) {
              return true
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
          }
        },
        CHILD: function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";
          return first === 1 && last === 0 ? function (elem) {
            return !!elem.parentNode
          } : function (elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
              parent = elem.parentNode,
              name = ofType && elem.nodeName.toLowerCase(),
              useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling"
                }
                return true
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break
                  }
                }
              } else {
                if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                  diff = cache[1]
                } else {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        (node[expando] || (node[expando] = {}))[type] = [dirruns, diff]
                      }
                      if (node === elem) {
                        break
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0)
            }
          }
        },
        PSEUDO: function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument)
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument),
                i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i])
              }
            }) : function (elem) {
              return fn(elem, 0, args)
            }
          }
          return fn
        }
      },
      pseudos: {
        not: markFunction(function (selector) {
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []),
              i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem)
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop()
          }
        }),
        has: markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0
          }
        }),
        contains: markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
          }
        }),
        lang: markFunction(function (lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang)
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false
          }
        }),
        target: function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id
        },
        root: function (elem) {
          return elem === docElem
        },
        focus: function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
        },
        enabled: function (elem) {
          return elem.disabled === false
        },
        disabled: function (elem) {
          return elem.disabled === true
        },
        checked: function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected)
        },
        selected: function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex
          }
          return elem.selected === true
        },
        empty: function (elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
              return false
            }
          }
          return true
        },
        parent: function (elem) {
          return !Expr.pseudos.empty(elem)
        },
        header: function (elem) {
          return rheader.test(elem.nodeName)
        },
        input: function (elem) {
          return rinputs.test(elem.nodeName)
        },
        button: function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button"
        },
        text: function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type)
        },
        first: createPositionalPseudo(function () {
          return [0]
        }),
        last: createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1]
        }),
        eq: createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument]
        }),
        even: createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        odd: createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        lt: createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        gt: createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i)
          }
          return matchIndexes
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i)
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i)
    }

    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0)
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar
          }
          groups.push(tokens = [])
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length)
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length)
          }
        }
        if (!matched) {
          break
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
    }

    function toSelector(tokens) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value
      }
      return selector
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml)
          }
        }
      } : function (elem, context, xml) {
        var data, cache, outerCache, dirkey = dirruns + " " + doneName;
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                if ((data = cache[1]) === true || data === cachedruns) {
                  return data === true
                }
              } else {
                cache = outerCache[dir] = [dirkey];
                cache[1] = matcher(elem, context, xml) || cachedruns;
                if (cache[1] === true) {
                  return true
                }
              }
            }
          }
        }
      }
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false
          }
        }
        return true
      } : matchers[0]
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i)
            }
          }
        }
      }
      return newUnmatched
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter)
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector)
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [],
          postMap = [],
          preexisting = results.length,
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
          matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml)
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem))
                }
              }
              postFinder(null, (matcherOut = []), temp, xml)
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem)
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml)
          } else {
            push.apply(results, matcherOut)
          }
        }
      })
    }

    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,
        matchContext = addCombinator(function (elem) {
          return elem === checkContext
        }, implicitRelative, true),
        matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1
        }, implicitRelative, true),
        matchers = [
          function (elem, context, xml) {
            return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
          }
        ];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)]
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
          }
          matchers.push(matcher)
        }
      }
      return elementMatcher(matchers)
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var matcherCachedRuns = 0,
        bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [],
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            outermost = expandContext != null,
            contextBackup = outermostContext,
            elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns
          }
          for (;
            (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while ((matcher = elementMatchers[j++])) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns
              }
            }
            if (bySet) {
              if ((elem = !matcher && elem)) {
                matchedCount--
              }
              if (seed) {
                unmatched.push(elem)
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while ((matcher = setMatchers[j++])) {
              matcher(unmatched, setMatched, context, xml)
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results)
                  }
                }
              }
              setMatched = condense(setMatched)
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
              Sizzle.uniqueSort(results)
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup
          }
          return unmatched
        };
      return bySet ? markFunction(superMatcher) : superMatcher
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector)
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached)
          } else {
            elementMatchers.push(cached)
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
      }
      return cached
    };

    function multipleContexts(selector, contexts, results) {
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results)
      }
      return results
    }

    function select(selector, context, results, seed) {
      var i, tokens, token, type, find, match = tokenize(selector);
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results
            }
            selector = selector.slice(tokens.shift().value.length)
          }
          i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];
            if (Expr.relative[(type = token.type)]) {
              break
            }
            if ((find = Expr.find[type])) {
              if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results
                }
                break
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
      return results
    }
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = hasDuplicate;
    setDocument();
    support.sortDetached = assert(function (div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1
    });
    if (!assert(function (div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#"
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
        }
      })
    }
    if (!support.attributes || !assert(function (div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === ""
    })) {
      addHandle("value", function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue
        }
      })
    }
    if (!assert(function (div) {
      return div.getAttribute("disabled") == null
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === true ? name.toLowerCase() : null
        }
      })
    }
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains
  })(window);
  var optionsCache = {};

  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
      object[flag] = true
    });
    return object
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
    var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
      stack = !options.once && [],
      fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift())
            }
          } else {
            if (memory) {
              list = []
            } else {
              self.disable()
            }
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === "function") {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg)
                  }
                } else {
                  if (arg && arg.length && type !== "string") {
                    add(arg)
                  }
                }
              })
            })(arguments);
            if (firing) {
              firingLength = list.length
            } else {
              if (memory) {
                firingStart = start;
                fire(memory)
              }
            }
          }
          return this
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--
                  }
                  if (index <= firingIndex) {
                    firingIndex--
                  }
                }
              }
            })
          }
          return this
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length)
        },
        empty: function () {
          list = [];
          firingLength = 0;
          return this
        },
        disable: function () {
          list = stack = memory = undefined;
          return this
        },
        disabled: function () {
          return !list
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable()
          }
          return this
        },
        locked: function () {
          return !stack
        },
        fireWith: function (context, args) {
          if (list && (!fired || stack)) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            if (firing) {
              stack.push(args)
            } else {
              fire(args)
            }
          }
          return this
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this
        },
        fired: function () {
          return !!fired
        }
      };
    return self
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
      ],
        state = "pending",
        promise = {
          state: function () {
            return state
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0],
                  fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                  } else {
                    newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                  }
                })
              });
              fns = null
            }).promise()
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this
        };
        deferred[tuple[0] + "With"] = list.fireWith
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred)
      }
      return deferred
    },
    when: function (subordinate) {
      var i = 0,
        resolveValues = core_slice.call(arguments),
        length = resolveValues.length,
        remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values)
            } else {
              if (!(--remaining)) {
                deferred.resolveWith(contexts, values)
              }
            }
          }
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
          } else {
            --remaining
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues)
      }
      return deferred.promise()
    }
  });
  jQuery.support = (function (support) {
    var all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
    div.setAttribute("className", "t");
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    all = div.getElementsByTagName("*") || [];
    a = div.getElementsByTagName("a")[0];
    if (!a || !a.style || !all.length) {
      return support
    }
    select = document.createElement("select");
    opt = select.appendChild(document.createElement("option"));
    input = div.getElementsByTagName("input")[0];
    a.style.cssText = "top:1px;float:left;opacity:.5";
    support.getSetAttribute = div.className !== "t";
    support.leadingWhitespace = div.firstChild.nodeType === 3;
    support.tbody = !div.getElementsByTagName("tbody").length;
    support.htmlSerialize = !! div.getElementsByTagName("link").length;
    support.style = /top/.test(a.getAttribute("style"));
    support.hrefNormalized = a.getAttribute("href") === "/a";
    support.opacity = /^0.5/.test(a.style.opacity);
    support.cssFloat = !! a.style.cssFloat;
    support.checkOn = !! input.value;
    support.optSelected = opt.selected;
    support.enctype = !! document.createElement("form").enctype;
    support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
    support.inlineBlockNeedsLayout = false;
    support.shrinkWrapBlocks = false;
    support.pixelPosition = false;
    support.deleteExpando = true;
    support.noCloneEvent = true;
    support.reliableMarginRight = true;
    support.boxSizingReliable = true;
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    try {
      delete div.test
    } catch (e) {
      support.deleteExpando = false
    }
    input = document.createElement("input");
    input.setAttribute("value", "");
    support.input = input.getAttribute("value") === "";
    input.value = "t";
    input.setAttribute("type", "radio");
    support.radioValue = input.value === "t";
    input.setAttribute("checked", "t");
    input.setAttribute("name", "t");
    fragment = document.createDocumentFragment();
    fragment.appendChild(input);
    support.appendChecked = input.checked;
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    if (div.attachEvent) {
      div.attachEvent("onclick", function () {
        support.noCloneEvent = false
      });
      div.cloneNode(true).click()
    }
    for (i in {
      submit: true,
      change: true,
      focusin: true
    }) {
      div.setAttribute(eventName = "on" + i, "t");
      support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    for (i in jQuery(support)) {
      break
    }
    support.ownLast = i !== "0";
    jQuery(function () {
      var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
        body = document.getElementsByTagName("body")[0];
      if (!body) {
        return
      }
      container = document.createElement("div");
      container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
      body.appendChild(container).appendChild(div);
      div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
      tds = div.getElementsByTagName("td");
      tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
      isSupported = (tds[0].offsetHeight === 0);
      tds[0].style.display = "";
      tds[1].style.display = "none";
      support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
      div.innerHTML = "";
      div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
      jQuery.swap(body, body.style.zoom != null ? {
        zoom: 1
      } : {}, function () {
        support.boxSizing = div.offsetWidth === 4
      });
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
        support.boxSizingReliable = (window.getComputedStyle(div, null) || {
          width: "4px"
        }).width === "4px";
        marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)
      }
      if (typeof div.style.zoom !== core_strundefined) {
        div.innerHTML = "";
        div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
        support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
        div.style.display = "block";
        div.innerHTML = "<div></div>";
        div.firstChild.style.width = "5px";
        support.shrinkWrapBlocks = (div.offsetWidth !== 3);
        if (support.inlineBlockNeedsLayout) {
          body.style.zoom = 1
        }
      }
      body.removeChild(container);
      container = div = tds = marginDiv = null
    });
    all = select = fragment = opt = a = input = null;
    return support
  })({});
  var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;

  function internalData(elem, name, data, pvt) {
    if (!jQuery.acceptData(elem)) {
      return
    }
    var ret, thisCache, internalKey = jQuery.expando,
      isNode = elem.nodeType,
      cache = isNode ? jQuery.cache : elem,
      id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
    if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
      return
    }
    if (!id) {
      if (isNode) {
        id = elem[internalKey] = core_deletedIds.pop() || jQuery.guid++
      } else {
        id = internalKey
      }
    }
    if (!cache[id]) {
      cache[id] = isNode ? {} : {
        toJSON: jQuery.noop
      }
    }
    if (typeof name === "object" || typeof name === "function") {
      if (pvt) {
        cache[id] = jQuery.extend(cache[id], name)
      } else {
        cache[id].data = jQuery.extend(cache[id].data, name)
      }
    }
    thisCache = cache[id];
    if (!pvt) {
      if (!thisCache.data) {
        thisCache.data = {}
      }
      thisCache = thisCache.data
    }
    if (data !== undefined) {
      thisCache[jQuery.camelCase(name)] = data
    }
    if (typeof name === "string") {
      ret = thisCache[name];
      if (ret == null) {
        ret = thisCache[jQuery.camelCase(name)]
      }
    } else {
      ret = thisCache
    }
    return ret
  }

  function internalRemoveData(elem, name, pvt) {
    if (!jQuery.acceptData(elem)) {
      return
    }
    var thisCache, i, isNode = elem.nodeType,
      cache = isNode ? jQuery.cache : elem,
      id = isNode ? elem[jQuery.expando] : jQuery.expando;
    if (!cache[id]) {
      return
    }
    if (name) {
      thisCache = pvt ? cache[id] : cache[id].data;
      if (thisCache) {
        if (!jQuery.isArray(name)) {
          if (name in thisCache) {
            name = [name]
          } else {
            name = jQuery.camelCase(name);
            if (name in thisCache) {
              name = [name]
            } else {
              name = name.split(" ")
            }
          }
        } else {
          name = name.concat(jQuery.map(name, jQuery.camelCase))
        }
        i = name.length;
        while (i--) {
          delete thisCache[name[i]]
        }
        if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
          return
        }
      }
    }
    if (!pvt) {
      delete cache[id].data;
      if (!isEmptyDataObject(cache[id])) {
        return
      }
    }
    if (isNode) {
      jQuery.cleanData([elem], true)
    } else {
      if (jQuery.support.deleteExpando || cache != cache.window) {
        delete cache[id]
      } else {
        cache[id] = null
      }
    }
  }
  jQuery.extend({
    cache: {},
    noData: {
      applet: true,
      embed: true,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function (elem) {
      elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
      return !!elem && !isEmptyDataObject(elem)
    },
    data: function (elem, name, data) {
      return internalData(elem, name, data)
    },
    removeData: function (elem, name) {
      return internalRemoveData(elem, name)
    },
    _data: function (elem, name, data) {
      return internalData(elem, name, data, true)
    },
    _removeData: function (elem, name) {
      return internalRemoveData(elem, name, true)
    },
    acceptData: function (elem) {
      if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
        return false
      }
      var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
      return !noData || noData !== true && elem.getAttribute("classid") === noData
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var attrs, name, data = null,
        i = 0,
        elem = this[0];
      if (key === undefined) {
        if (this.length) {
          data = jQuery.data(elem);
          if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
            attrs = elem.attributes;
            for (; i < attrs.length; i++) {
              name = attrs[i].name;
              if (name.indexOf("data-") === 0) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name])
              }
            }
            jQuery._data(elem, "parsedAttrs", true)
          }
        }
        return data
      }
      if (typeof key === "object") {
        return this.each(function () {
          jQuery.data(this, key)
        })
      }
      return arguments.length > 1 ? this.each(function () {
        jQuery.data(this, key, value)
      }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null
    },
    removeData: function (key) {
      return this.each(function () {
        jQuery.removeData(this, key)
      })
    }
  });

  function dataAttr(elem, key, data) {
    if (data === undefined && elem.nodeType === 1) {
      var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
        } catch (e) {}
        jQuery.data(elem, key, data)
      } else {
        data = undefined
      }
    }
    return data
  }

  function isEmptyDataObject(obj) {
    var name;
    for (name in obj) {
      if (name === "data" && jQuery.isEmptyObject(obj[name])) {
        continue
      }
      if (name !== "toJSON") {
        return false
      }
    }
    return true
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = jQuery._data(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = jQuery._data(elem, type, jQuery.makeArray(data))
          } else {
            queue.push(data)
          }
        }
        return queue || []
      }
    },
    dequeue: function (elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function () {
          jQuery.dequeue(elem, type)
        };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress")
        }
        delete hooks.stop;
        fn.call(elem, next, hooks)
      }
      if (!startLength && hooks) {
        hooks.empty.fire()
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + "queueHooks";
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          jQuery._removeData(elem, type + "queue");
          jQuery._removeData(elem, key)
        })
      })
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type)
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type)
        }
      })
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type)
      })
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || "fx";
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout)
        }
      })
    },
    clearQueue: function (type) {
      return this.queue(type || "fx", [])
    },
    promise: function (type, obj) {
      var tmp, count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function () {
          if (!(--count)) {
            defer.resolveWith(elements, [elements])
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined
      }
      type = type || "fx";
      while (i--) {
        tmp = jQuery._data(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve)
        }
      }
      resolve();
      return defer.promise(obj)
    }
  });
  var nodeHook, boolHook, rclass = /[\t\r\n\f]/g,
    rreturn = /\r/g,
    rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = jQuery.support.getSetAttribute,
    getSetInput = jQuery.support.input;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name)
      })
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
    },
    removeProp: function (name) {
      name = jQuery.propFix[name] || name;
      return this.each(function () {
        try {
          this[name] = undefined;
          delete this[name]
        } catch (e) {}
      })
    },
    addClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0,
        len = this.length,
        proceed = typeof value === "string" && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className))
        })
      }
      if (proceed) {
        classes = (value || "").match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " "
              }
            }
            elem.className = jQuery.trim(cur)
          }
        }
      }
      return this
    },
    removeClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0,
        len = this.length,
        proceed = arguments.length === 0 || typeof value === "string" && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className))
        })
      }
      if (proceed) {
        classes = (value || "").match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") >= 0) {
                cur = cur.replace(" " + clazz + " ", " ")
              }
            }
            elem.className = value ? jQuery.trim(cur) : ""
          }
        }
      }
      return this
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value)
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
        })
      }
      return this.each(function () {
        if (type === "string") {
          var className, i = 0,
            self = jQuery(this),
            classNames = value.match(core_rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className)
            } else {
              self.addClass(className)
            }
          }
        } else {
          if (type === core_strundefined || type === "boolean") {
            if (this.className) {
              jQuery._data(this, "__className__", this.className)
            }
            this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
          }
        }
      })
    },
    hasClass: function (selector) {
      var className = " " + selector + " ",
        i = 0,
        l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
          return true
        }
      }
      return false
    },
    val: function (value) {
      var ret, hooks, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
        }
        return
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val())
        } else {
          val = value
        } if (val == null) {
          val = ""
        } else {
          if (typeof val === "number") {
            val += ""
          } else {
            if (jQuery.isArray(val)) {
              val = jQuery.map(val, function (value) {
                return value == null ? "" : value + ""
              })
            }
          }
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val
        }
      })
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : elem.text
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one" || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value
              }
              values.push(value)
            }
          }
          return values
        },
        set: function (elem, value) {
          var optionSet, option, options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];
            if ((option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0)) {
              optionSet = true
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1
          }
          return values
        }
      }
    },
    attr: function (elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return
      }
      if (typeof elem.getAttribute === core_strundefined) {
        return jQuery.prop(elem, name, value)
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name)
        } else {
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret
          } else {
            elem.setAttribute(name, value + "");
            return value
          }
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret
        } else {
          ret = jQuery.find.attr(elem, name);
          return ret == null ? undefined : ret
        }
      }
    },
    removeAttr: function (elem, value) {
      var name, propName, i = 0,
        attrNames = value && value.match(core_rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
              elem[propName] = false
            } else {
              elem[jQuery.camelCase("default-" + name)] = elem[propName] = false
            }
          } else {
            jQuery.attr(elem, name, "")
          }
          elem.removeAttribute(getSetAttribute ? name : propName)
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val
            }
            return value
          }
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name]
      }
      if (value !== undefined) {
        return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value)
      } else {
        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name]
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
        }
      }
    }
  });
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name)
      } else {
        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
          elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name)
        } else {
          elem[jQuery.camelCase("default-" + name)] = elem[name] = true
        }
      }
      return name
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
    jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function (elem, name, isXML) {
      var fn = jQuery.expr.attrHandle[name],
        ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
      jQuery.expr.attrHandle[name] = fn;
      return ret
    } : function (elem, name, isXML) {
      return isXML ? undefined : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
    }
  });
  if (!getSetInput || !getSetAttribute) {
    jQuery.attrHooks.value = {
      set: function (elem, value, name) {
        if (jQuery.nodeName(elem, "input")) {
          elem.defaultValue = value
        } else {
          return nodeHook && nodeHook.set(elem, value, name)
        }
      }
    }
  }
  if (!getSetAttribute) {
    nodeHook = {
      set: function (elem, value, name) {
        var ret = elem.getAttributeNode(name);
        if (!ret) {
          elem.setAttributeNode((ret = elem.ownerDocument.createAttribute(name)))
        }
        ret.value = value += "";
        return name === "value" || value === elem.getAttribute(name) ? value : undefined
      }
    };
    jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords = function (elem, name, isXML) {
      var ret;
      return isXML ? undefined : (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null
    };
    jQuery.valHooks.button = {
      get: function (elem, name) {
        var ret = elem.getAttributeNode(name);
        return ret && ret.specified ? ret.value : undefined
      },
      set: nodeHook.set
    };
    jQuery.attrHooks.contenteditable = {
      set: function (elem, value, name) {
        nodeHook.set(elem, value === "" ? false : value, name)
      }
    };
    jQuery.each(["width", "height"], function (i, name) {
      jQuery.attrHooks[name] = {
        set: function (elem, value) {
          if (value === "") {
            elem.setAttribute(name, "auto");
            return value
          }
        }
      }
    })
  }
  if (!jQuery.support.hrefNormalized) {
    jQuery.each(["href", "src"], function (i, name) {
      jQuery.propHooks[name] = {
        get: function (elem) {
          return elem.getAttribute(name, 4)
        }
      }
    })
  }
  if (!jQuery.support.style) {
    jQuery.attrHooks.style = {
      get: function (elem) {
        return elem.style.cssText || undefined
      },
      set: function (elem, value) {
        return (elem.style.cssText = value + "")
      }
    }
  }
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex
          }
        }
        return null
      }
    }
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this
  });
  if (!jQuery.support.enctype) {
    jQuery.propFix.enctype = "encoding"
  }
  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
        }
      }
    };
    if (!jQuery.support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value
      }
    }
  });
  var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

  function returnTrue() {
    return true
  }

  function returnFalse() {
    return false
  }

  function safeActiveElement() {
    try {
      return document.activeElement
    } catch (err) {}
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
      if (!elemData) {
        return
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {}
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
        };
        eventHandle.elem = elem
      }
      types = (types || "").match(core_rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false)
            } else {
              if (elem.attachEvent) {
                elem.attachEvent("on" + type, eventHandle)
              }
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj)
        } else {
          handlers.push(handleObj)
        }
        jQuery.event.global[type] = true
      }
      elem = null
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (!elemData || !(events = elemData.events)) {
        return
      }
      types = (types || "").match(core_rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true)
          }
          continue
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--
            }
            if (special.remove) {
              special.remove.call(elem, handleObj)
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle)
          }
          delete events[type]
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        jQuery._removeData(elem, "events")
      }
    },
    trigger: function (event, data, elem, onlyHandlers) {
      var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
        type = core_hasOwn.call(event, "type") ? event.type : event,
        namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return
      }
      if (type.indexOf(".") >= 0) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort()
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window)
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
        if (handle) {
          handle.apply(cur, data)
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault()
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          if (ontype && elem[type] && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null
            }
            jQuery.event.triggered = type;
            try {
              elem[type]()
            } catch (e) {}
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp
            }
          }
        }
      }
      return event.result
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event);
      var i, ret, handleObj, matched, j, handlerQueue = [],
        args = core_slice.call(arguments),
        handlers = (jQuery._data(this, "events") || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation()
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event)
      }
      return event.result
    },
    handlers: function (event, handlers) {
      var sel, handleObj, matches, i, handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
        for (; cur != this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
              }
              if (matches[sel]) {
                matches.push(handleObj)
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              })
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        })
      }
      return handlerQueue
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event
      }
      var i, prop, copy, type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop]
      }
      if (!event.target) {
        event.target = originalEvent.srcElement || document
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode
      }
      event.metaKey = !! event.metaKey;
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode
        }
        return event
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (event, original) {
        var body, eventDoc, doc, button = original.button,
          fromElement = original.fromElement;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
        }
        if (!event.relatedTarget && fromElement) {
          event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
        }
        return event
      }
    },
    special: {
      load: {
        noBubble: true
      },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            try {
              this.focus();
              return false
            } catch (e) {}
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function () {
          if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
            this.click();
            return false
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined) {
            event.originalEvent.returnValue = event.result
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
        originalEvent: {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem)
      } else {
        jQuery.event.dispatch.call(elem, e)
      } if (e.isDefaultPrevented()) {
        event.preventDefault()
      }
    }
  };
  jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false)
    }
  } : function (elem, type, handle) {
    var name = "on" + type;
    if (elem.detachEvent) {
      if (typeof elem[name] === core_strundefined) {
        elem[name] = null
      }
      elem.detachEvent(name, handle)
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props)
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
    } else {
      this.type = src
    } if (props) {
      jQuery.extend(this, props)
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (!e) {
        return
      }
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (!e) {
        return
      }
      if (e.stopPropagation) {
        e.stopPropagation()
      }
      e.cancelBubble = true
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation()
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix
        }
        return ret
      }
    }
  });
  if (!jQuery.support.submitBubbles) {
    jQuery.event.special.submit = {
      setup: function () {
        if (jQuery.nodeName(this, "form")) {
          return false
        }
        jQuery.event.add(this, "click._submit keypress._submit", function (e) {
          var elem = e.target,
            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
          if (form && !jQuery._data(form, "submitBubbles")) {
            jQuery.event.add(form, "submit._submit", function (event) {
              event._submit_bubble = true
            });
            jQuery._data(form, "submitBubbles", true)
          }
        })
      },
      postDispatch: function (event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate("submit", this.parentNode, event, true)
          }
        }
      },
      teardown: function () {
        if (jQuery.nodeName(this, "form")) {
          return false
        }
        jQuery.event.remove(this, "._submit")
      }
    }
  }
  if (!jQuery.support.changeBubbles) {
    jQuery.event.special.change = {
      setup: function () {
        if (rformElems.test(this.nodeName)) {
          if (this.type === "checkbox" || this.type === "radio") {
            jQuery.event.add(this, "propertychange._change", function (event) {
              if (event.originalEvent.propertyName === "checked") {
                this._just_changed = true
              }
            });
            jQuery.event.add(this, "click._change", function (event) {
              if (this._just_changed && !event.isTrigger) {
                this._just_changed = false
              }
              jQuery.event.simulate("change", this, event, true)
            })
          }
          return false
        }
        jQuery.event.add(this, "beforeactivate._change", function (e) {
          var elem = e.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
            jQuery.event.add(elem, "change._change", function (event) {
              if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                jQuery.event.simulate("change", this.parentNode, event, true)
              }
            });
            jQuery._data(elem, "changeBubbles", true)
          }
        })
      },
      handle: function (event) {
        var elem = event.target;
        if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
          return event.handleObj.handler.apply(this, arguments)
        }
      },
      teardown: function () {
        jQuery.event.remove(this, "._change");
        return !rformElems.test(this.nodeName)
      }
    }
  }
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      var attaches = 0,
        handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true)
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true)
          }
        }
      }
    })
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var type, origFn;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data = data || selector;
          selector = undefined
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one)
        }
        return this
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined
      } else {
        if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = undefined
          } else {
            fn = data;
            data = selector;
            selector = undefined
          }
        }
      } if (fn === false) {
        fn = returnFalse
      } else {
        if (!fn) {
          return this
        }
      } if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments)
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector)
      })
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1)
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type])
        }
        return this
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined
      }
      if (fn === false) {
        fn = returnFalse
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector)
      })
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this)
      })
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true)
      }
    }
  });
  var isSimple = /^.[^:#\[\.,]*$/,
    rparentsprev = /^(?:parents|prev(?:Until|All))/,
    rneedsContext = jQuery.expr.match.needsContext,
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, ret = [],
        self = this,
        len = self.length;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true
            }
          }
        }))
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret)
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret
    },
    has: function (target) {
      var i, targets = jQuery(target, this),
        len = targets.length;
      return this.filter(function () {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true
          }
        }
      })
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    is: function (selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
    },
    closest: function (selectors, context) {
      var cur, i = 0,
        l = this.length,
        ret = [],
        pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            cur = ret.push(cur);
            break
          }
        }
      }
      return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret)
    },
    index: function (elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
      }
      if (typeof elem === "string") {
        return jQuery.inArray(this[0], jQuery(elem))
      }
      return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
    },
    add: function (selector, context) {
      var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
        all = jQuery.merge(this.get(), set);
      return this.pushStack(jQuery.unique(all))
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
    }
  });

  function sibling(cur, dir) {
    do {
      cur = cur[dir]
    } while (cur && cur.nodeType !== 1);
    return cur
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null
    },
    parents: function (elem) {
      return jQuery.dir(elem, "parentNode")
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, "parentNode", until)
    },
    next: function (elem) {
      return sibling(elem, "nextSibling")
    },
    prev: function (elem) {
      return sibling(elem, "previousSibling")
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, "nextSibling")
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, "previousSibling")
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until)
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until)
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild)
    },
    contents: function (elem) {
      return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var ret = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until
      }
      if (selector && typeof selector === "string") {
        ret = jQuery.filter(selector, ret)
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          ret = jQuery.unique(ret)
        }
        if (rparentsprev.test(name)) {
          ret = ret.reverse()
        }
      }
      return this.pushStack(ret)
    }
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ":not(" + expr + ")"
      }
      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1
      }))
    },
    dir: function (elem, dir, until) {
      var matched = [],
        cur = elem[dir];
      while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
        if (cur.nodeType === 1) {
          matched.push(cur)
        }
        cur = cur[dir]
      }
      return matched
    },
    sibling: function (n, elem) {
      var r = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          r.push(n)
        }
      }
      return r
    }
  });

  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not
      })
    }
    if (typeof qualifier === "string") {
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not)
      }
      qualifier = jQuery.filter(qualifier, elements)
    }
    return jQuery.grep(elements, function (elem) {
      return (jQuery.inArray(elem, qualifier) >= 0) !== not
    })
  }

  function createSafeFragment(document) {
    var list = nodeNames.split("|"),
      safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      while (list.length) {
        safeFrag.createElement(list.pop())
      }
    }
    return safeFrag
  }
  var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, safeFragment = createSafeFragment(document),
    fragmentDiv = safeFragment.appendChild(document.createElement("div"));
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
      }, null, value, arguments.length)
    },
    append: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem)
        }
      })
    },
    prepend: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild)
        }
      })
    },
    before: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this)
        }
      })
    },
    after: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling)
        }
      })
    },
    remove: function (selector, keepData) {
      var elem, elems = selector ? jQuery.filter(selector, this) : this,
        i = 0;
      for (;
        (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem))
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"))
          }
          elem.parentNode.removeChild(elem)
        }
      }
      return this
    },
    empty: function () {
      var elem, i = 0;
      for (;
        (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false))
        }
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild)
        }
        if (elem.options && jQuery.nodeName(elem, "select")) {
          elem.options.length = 0
        }
      }
      return this
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
      })
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0,
          l = this.length;
        if (value === undefined) {
          return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value
              }
            }
            elem = 0
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value)
        }
      }, null, value, arguments.length)
    },
    replaceWith: function () {
      var args = jQuery.map(this, function (elem) {
        return [elem.nextSibling, elem.parentNode]
      }),
        i = 0;
      this.domManip(arguments, function (elem) {
        var next = args[i++],
          parent = args[i++];
        if (parent) {
          if (next && next.parentNode !== parent) {
            next = this.nextSibling
          }
          jQuery(this).remove();
          parent.insertBefore(elem, next)
        }
      }, true);
      return i ? this : this.remove()
    },
    detach: function (selector) {
      return this.remove(selector, true)
    },
    domManip: function (args, callback, allowIntersection) {
      args = core_concat.apply([], args);
      var first, node, hasScripts, scripts, doc, fragment, i = 0,
        l = this.length,
        set = this,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
      if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) {
        return this.each(function (index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html())
          }
          self.domManip(args, callback, allowIntersection)
        })
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, "script"))
              }
            }
            callback.call(this[i], node, i)
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                if (node.src) {
                  jQuery._evalUrl(node.src)
                } else {
                  jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""))
                }
              }
            }
          }
          fragment = first = null
        }
      }
      return this
    }
  });

  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
  }

  function disableScript(elem) {
    elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
    return elem
  }

  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1]
    } else {
      elem.removeAttribute("type")
    }
    return elem
  }

  function setGlobalEval(elems, refElements) {
    var elem, i = 0;
    for (;
      (elem = elems[i]) != null; i++) {
      jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
    }
  }

  function cloneCopyEvent(src, dest) {
    if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
      return
    }
    var type, i, l, oldData = jQuery._data(src),
      curData = jQuery._data(dest, oldData),
      events = oldData.events;
    if (events) {
      delete curData.handle;
      curData.events = {};
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          jQuery.event.add(dest, type, events[type][i])
        }
      }
    }
    if (curData.data) {
      curData.data = jQuery.extend({}, curData.data)
    }
  }

  function fixCloneNodeIssues(src, dest) {
    var nodeName, e, data;
    if (dest.nodeType !== 1) {
      return
    }
    nodeName = dest.nodeName.toLowerCase();
    if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
      data = jQuery._data(dest);
      for (e in data.events) {
        jQuery.removeEvent(dest, e, data.handle)
      }
      dest.removeAttribute(jQuery.expando)
    }
    if (nodeName === "script" && dest.text !== src.text) {
      disableScript(dest).text = src.text;
      restoreScript(dest)
    } else {
      if (nodeName === "object") {
        if (dest.parentNode) {
          dest.outerHTML = src.outerHTML
        }
        if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
          dest.innerHTML = src.innerHTML
        }
      } else {
        if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
          dest.defaultChecked = dest.checked = src.checked;
          if (dest.value !== src.value) {
            dest.value = src.value
          }
        } else {
          if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected
          } else {
            if (nodeName === "input" || nodeName === "textarea") {
              dest.defaultValue = src.defaultValue
            }
          }
        }
      }
    }
  }
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, i = 0,
        ret = [],
        insert = jQuery(selector),
        last = insert.length - 1;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        core_push.apply(ret, elems.get())
      }
      return this.pushStack(ret)
    }
  });

  function getAll(context, tag) {
    var elems, elem, i = 0,
      found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
    if (!found) {
      for (found = [], elems = context.childNodes || context;
        (elem = elems[i]) != null; i++) {
        if (!tag || jQuery.nodeName(elem, tag)) {
          found.push(elem)
        } else {
          jQuery.merge(found, getAll(elem, tag))
        }
      }
    }
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
  }

  function fixDefaultChecked(elem) {
    if (manipulation_rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked
    }
  }
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
      if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
        clone = elem.cloneNode(true)
      } else {
        fragmentDiv.innerHTML = elem.outerHTML;
        fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
      } if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0;
          (node = srcElements[i]) != null; ++i) {
          if (destElements[i]) {
            fixCloneNodeIssues(node, destElements[i])
          }
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0;
            (node = srcElements[i]) != null; i++) {
            cloneCopyEvent(node, destElements[i])
          }
        } else {
          cloneCopyEvent(elem, clone)
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"))
      }
      destElements = srcElements = node = null;
      return clone
    },
    buildFragment: function (elems, context, scripts, selection) {
      var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
        safe = createSafeFragment(context),
        nodes = [],
        i = 0;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === "object") {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
          } else {
            if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem))
            } else {
              tmp = tmp || safe.appendChild(context.createElement("div"));
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild
              }
              if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]))
              }
              if (!jQuery.support.tbody) {
                elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                j = elem && elem.childNodes.length;
                while (j--) {
                  if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                    elem.removeChild(tbody)
                  }
                }
              }
              jQuery.merge(nodes, tmp.childNodes);
              tmp.textContent = "";
              while (tmp.firstChild) {
                tmp.removeChild(tmp.firstChild)
              }
              tmp = safe.lastChild
            }
          }
        }
      }
      if (tmp) {
        safe.removeChild(tmp)
      }
      if (!jQuery.support.appendChecked) {
        jQuery.grep(getAll(nodes, "input"), fixDefaultChecked)
      }
      i = 0;
      while ((elem = nodes[i++])) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(safe.appendChild(elem), "script");
        if (contains) {
          setGlobalEval(tmp)
        }
        if (scripts) {
          j = 0;
          while ((elem = tmp[j++])) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem)
            }
          }
        }
      }
      tmp = null;
      return safe
    },
    cleanData: function (elems, acceptData) {
      var elem, type, id, data, i = 0,
        internalKey = jQuery.expando,
        cache = jQuery.cache,
        deleteExpando = jQuery.support.deleteExpando,
        special = jQuery.event.special;
      for (;
        (elem = elems[i]) != null; i++) {
        if (acceptData || jQuery.acceptData(elem)) {
          id = elem[internalKey];
          data = id && cache[id];
          if (data) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type)
                } else {
                  jQuery.removeEvent(elem, type, data.handle)
                }
              }
            }
            if (cache[id]) {
              delete cache[id];
              if (deleteExpando) {
                delete elem[internalKey]
              } else {
                if (typeof elem.removeAttribute !== core_strundefined) {
                  elem.removeAttribute(internalKey)
                } else {
                  elem[internalKey] = null
                }
              }
              core_deletedIds.push(id)
            }
          }
        }
      }
    },
    _evalUrl: function (url) {
      return jQuery.ajax({
        url: url,
        type: "GET",
        dataType: "script",
        async: false,
        global: false,
        "throws": true
      })
    }
  });
  jQuery.fn.extend({
    wrapAll: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i))
        })
      }
      if (this[0]) {
        var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0])
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstChild && elem.firstChild.nodeType === 1) {
            elem = elem.firstChild
          }
          return elem
        }).append(this)
      }
      return this
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i))
        })
      }
      return this.each(function () {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html)
        } else {
          self.append(html)
        }
      })
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
      })
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes)
        }
      }).end()
    }
  });
  var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/,
    rposition = /^(top|right|bottom|left)$/,
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rmargin = /^margin/,
    rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
    rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
    rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
    elemdisplay = {
      BODY: "block"
    }, cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = ["Top", "Right", "Bottom", "Left"],
    cssPrefixes = ["Webkit", "O", "Moz", "ms"];

  function vendorPropName(style, name) {
    if (name in style) {
      return name
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
      origName = name,
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name
      }
    }
    return origName
  }

  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
  }

  function showHide(elements, show) {
    var display, elem, hidden, values = [],
      index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue
      }
      values[index] = jQuery._data(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = ""
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName))
        }
      } else {
        if (!values[index]) {
          hidden = isHidden(elem);
          if (display && display !== "none" || !hidden) {
            jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
          }
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none"
      }
    }
    return elements
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        var len, styles, map = {}, i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles)
          }
          return map
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
      }, name, value, arguments.length > 1)
    },
    show: function () {
      return showHide(this, true)
    },
    hide: function () {
      return showHide(this)
    },
    toggle: function (state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide()
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show()
        } else {
          jQuery(this).hide()
        }
      })
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret
          }
        }
      }
    },
    cssNumber: {
      columnCount: true,
      fillOpacity: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    cssProps: {
      "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return
      }
      var ret, type, hooks, origName = jQuery.camelCase(name),
        style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = "number"
        }
        if (value == null || type === "number" && isNaN(value)) {
          return
        }
        if (type === "number" && !jQuery.cssNumber[origName]) {
          value += "px"
        }
        if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit"
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          try {
            style[name] = value
          } catch (e) {}
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret
        }
        return style[name]
      }
    },
    css: function (elem, name, extra, styles) {
      var num, val, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra)
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles)
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name]
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val
      }
      return val
    }
  });
  if (window.getComputedStyle) {
    getStyles = function (elem) {
      return window.getComputedStyle(elem, null)
    };
    curCSS = function (elem, name, _computed) {
      var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
        ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
        style = elem.style;
      if (computed) {
        if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name)
        }
        if (rnumnonpx.test(ret) && rmargin.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth
        }
      }
      return ret
    }
  } else {
    if (document.documentElement.currentStyle) {
      getStyles = function (elem) {
        return elem.currentStyle
      };
      curCSS = function (elem, name, _computed) {
        var left, rs, rsLeft, computed = _computed || getStyles(elem),
          ret = computed ? computed[name] : undefined,
          style = elem.style;
        if (ret == null && style && style[name]) {
          ret = style[name]
        }
        if (rnumnonpx.test(ret) && !rposition.test(name)) {
          left = style.left;
          rs = elem.runtimeStyle;
          rsLeft = rs && rs.left;
          if (rsLeft) {
            rs.left = elem.currentStyle.left
          }
          style.left = name === "fontSize" ? "1em" : ret;
          ret = style.pixelLeft + "px";
          style.left = left;
          if (rsLeft) {
            rs.left = rsLeft
          }
        }
        return ret === "" ? "auto" : ret
      }
    }
  }

  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
  }

  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
      val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles)
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
        }
      }
    }
    return val
  }

  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
      val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name]
      }
      if (rnumnonpx.test(val)) {
        return val
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px"
  }

  function css_defaultDisplay(nodeName) {
    var doc = document,
      display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
        doc.write("<!doctype html><html><body>");
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach()
      }
      elemdisplay[nodeName] = display
    }
    return display
  }

  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display = jQuery.css(elem[0], "display");
    elem.remove();
    return display
  }
  jQuery.each(["height", "width"], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, name, extra)
          }) : getWidthOrHeight(elem, name, extra)
        }
      },
      set: function (elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0)
      }
    }
  });
  if (!jQuery.support.opacity) {
    jQuery.cssHooks.opacity = {
      get: function (elem, computed) {
        return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : ""
      },
      set: function (elem, value) {
        var style = elem.style,
          currentStyle = elem.currentStyle,
          opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
          filter = currentStyle && currentStyle.filter || style.filter || "";
        style.zoom = 1;
        if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
          style.removeAttribute("filter");
          if (value === "" || currentStyle && !currentStyle.filter) {
            return
          }
        }
        style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
      }
    }
  }
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          if (computed) {
            return jQuery.swap(elem, {
              display: "inline-block"
            }, curCSS, [elem, "marginRight"])
          }
        }
      }
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each(["top", "left"], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
            }
          }
        }
      })
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none")
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem)
    }
  }
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0,
          expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
        }
        return expanded
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
    }
  });
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this
      }).filter(function () {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type))
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          }
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        }
      }).get()
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [],
      add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function () {
        add(this.name, this.value)
      })
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add)
      }
    }
    return s.join("&").replace(r20, "+")
  };

  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v)
        } else {
          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
        }
      })
    } else {
      if (!traditional && jQuery.type(obj) === "object") {
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }
      } else {
        add(prefix, obj)
      }
    }
  }
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
    }
  });
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn)
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn)
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn)
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
    }
  });
  var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
    ajax_rquery = /\?/,
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    _load = jQuery.fn.load,
    prefilters = {}, transports = {}, allTypes = "*/".concat("*");
  try {
    ajaxLocation = location.href
  } catch (e) {
    ajaxLocation = document.createElement("a");
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*"
      }
      var dataType, i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func)
          } else {
            (structure[dataType] = structure[dataType] || []).push(func)
          }
        }
      }
    }
  }

  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = (structure === transports);

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false
        } else {
          if (seekingTransport) {
            return !(selected = dataTypeOrTransport)
          }
        }
      });
      return selected
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
  }

  function ajaxExtend(target, src) {
    var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep)
    }
    return target
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments)
    }
    var selector, response, type, self = this,
      off = url.indexOf(" ");
    if (off >= 0) {
      selector = url.slice(off, url.length);
      url = url.slice(0, off)
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined
    } else {
      if (params && typeof params === "object") {
        type = "POST"
      }
    } if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: "html",
        data: params
      }).done(function (responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
      }).complete(callback && function (jqXHR, status) {
        self.each(callback, response || [jqXHR.responseText, status, jqXHR])
      })
    }
    return this
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn)
    }
  });
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined
      }
      options = options || {};
      var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0,
        strAbort = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while ((match = rheaders.exec(responseHeadersString))) {
                  responseHeaders[match[1].toLowerCase()] = match[2]
                }
              }
              match = responseHeaders[key.toLowerCase()]
            }
            return match == null ? null : match
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value
            }
            return this
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type
            }
            return this
          },
          statusCode: function (map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]]
                }
              } else {
                jqXHR.always(map[jqXHR.status])
              }
            }
            return this
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText)
            }
            done(0, finalText);
            return this
          }
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional)
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR
      }
      fireGlobals = s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart")
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType)
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i])
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort()
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i])
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport")
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s])
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort("timeout")
          }, s.timeout)
        }
        try {
          state = 1;
          transport.send(requestHeaders, done)
        } catch (e) {
          if (state < 2) {
            done(-1, e)
          } else {
            throw e
          }
        }
      }

      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer)
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses)
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent"
          } else {
            if (status === 304) {
              statusText = "notmodified"
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error
            }
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop")
          }
        }
      }
      return jqXHR
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, "json")
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, "script")
    }
  });
  jQuery.each(["get", "post"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      })
    }
  });

  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType, ct, finalDataType, type, contents = s.contents,
      dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0]
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break
        }
        if (!firstDataType) {
          firstDataType = type
        }
      }
      finalDataType = finalDataType || firstDataType
    } if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType)
      }
      return responses[finalDataType]
    }
  }

  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv]
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType)
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev
        } else {
          if (prev !== "*" && prev !== current) {
            conv = converters[prev + " " + current] || converters["* " + current];
            if (!conv) {
              for (conv2 in converters) {
                tmp = conv2.split(" ");
                if (tmp[1] === current) {
                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                  if (conv) {
                    if (conv === true) {
                      conv = converters[conv2]
                    } else {
                      if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1])
                      }
                    }
                    break
                  }
                }
              }
            }
            if (conv !== true) {
              if (conv && s["throws"]) {
                response = conv(response)
              } else {
                try {
                  response = conv(response)
                } catch (e) {
                  return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                  }
                }
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    }
  }
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function (text) {
        jQuery.globalEval(text);
        return text
      }
    }
  });
  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false
    }
    if (s.crossDomain) {
      s.type = "GET";
      s.global = false
    }
  });
  jQuery.ajaxTransport("script", function (s) {
    if (s.crossDomain) {
      var script, head = document.head || jQuery("head")[0] || document.documentElement;
      return {
        send: function (_, callback) {
          script = document.createElement("script");
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset
          }
          script.src = s.url;
          script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script)
              }
              script = null;
              if (!isAbort) {
                callback(200, "success")
              }
            }
          };
          head.insertBefore(script, head.firstChild)
        },
        abort: function () {
          if (script) {
            script.onload(undefined, true)
          }
        }
      }
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
      this[callback] = true;
      return callback
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
      } else {
        if (s.jsonp !== false) {
          s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
        }
      }
      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called")
        }
        return responseContainer[0]
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName)
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0])
        }
        responseContainer = overwritten = undefined
      });
      return "script"
    }
  });
  var xhrCallbacks, xhrSupported, xhrId = 0,
    xhrOnUnloadAbort = window.ActiveXObject && function () {
      var key;
      for (key in xhrCallbacks) {
        xhrCallbacks[key](undefined, true)
      }
    };

  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest()
    } catch (e) {}
  }

  function createActiveXHR() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {}
  }
  jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
    return !this.isLocal && createStandardXHR() || createActiveXHR()
  } : createStandardXHR;
  xhrSupported = jQuery.ajaxSettings.xhr();
  jQuery.support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
  xhrSupported = jQuery.support.ajax = !! xhrSupported;
  if (xhrSupported) {
    jQuery.ajaxTransport(function (s) {
      if (!s.crossDomain || jQuery.support.cors) {
        var callback;
        return {
          send: function (headers, complete) {
            var handle, i, xhr = s.xhr();
            if (s.username) {
              xhr.open(s.type, s.url, s.async, s.username, s.password)
            } else {
              xhr.open(s.type, s.url, s.async)
            } if (s.xhrFields) {
              for (i in s.xhrFields) {
                xhr[i] = s.xhrFields[i]
              }
            }
            if (s.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(s.mimeType)
            }
            if (!s.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest"
            }
            try {
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i])
              }
            } catch (err) {}
            xhr.send((s.hasContent && s.data) || null);
            callback = function (_, isAbort) {
              var status, responseHeaders, statusText, responses;
              try {
                if (callback && (isAbort || xhr.readyState === 4)) {
                  callback = undefined;
                  if (handle) {
                    xhr.onreadystatechange = jQuery.noop;
                    if (xhrOnUnloadAbort) {
                      delete xhrCallbacks[handle]
                    }
                  }
                  if (isAbort) {
                    if (xhr.readyState !== 4) {
                      xhr.abort()
                    }
                  } else {
                    responses = {};
                    status = xhr.status;
                    responseHeaders = xhr.getAllResponseHeaders();
                    if (typeof xhr.responseText === "string") {
                      responses.text = xhr.responseText
                    }
                    try {
                      statusText = xhr.statusText
                    } catch (e) {
                      statusText = ""
                    }
                    if (!status && s.isLocal && !s.crossDomain) {
                      status = responses.text ? 200 : 404
                    } else {
                      if (status === 1223) {
                        status = 204
                      }
                    }
                  }
                }
              } catch (firefoxAccessException) {
                if (!isAbort) {
                  complete(-1, firefoxAccessException)
                }
              }
              if (responses) {
                complete(status, statusText, responses, responseHeaders)
              }
            };
            if (!s.async) {
              callback()
            } else {
              if (xhr.readyState === 4) {
                setTimeout(callback)
              } else {
                handle = ++xhrId;
                if (xhrOnUnloadAbort) {
                  if (!xhrCallbacks) {
                    xhrCallbacks = {};
                    jQuery(window).unload(xhrOnUnloadAbort)
                  }
                  xhrCallbacks[handle] = callback
                }
                xhr.onreadystatechange = callback
              }
            }
          },
          abort: function () {
            if (callback) {
              callback(undefined, true)
            }
          }
        }
      }
    })
  }
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
      "*": [
        function (prop, value) {
          var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
            start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || ".5";
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit)
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
          }
          return tween
        }
      ]
    };

  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined
    });
    return (fxNow = jQuery.now())
  }

  function createTween(value, prop, animation) {
    var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween
      }
    }
  }

  function Animation(elem, properties, options) {
    var result, stopped, index = 0,
      length = animationPrefilters.length,
      deferred = jQuery.Deferred().always(function () {
        delete tick.elem
      }),
      tick = function () {
        if (stopped) {
          return false
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent)
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length) {
          return remaining
        } else {
          deferred.resolveWith(elem, [animation]);
          return false
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {}
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween
        },
        stop: function (gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1)
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [animation, gotoEnd])
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd])
          }
          return this
        }
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation)
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0]
      }
      if (index !== name) {
        props[name] = value;
        delete props[index]
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing
          }
        }
      } else {
        specialEasing[name] = easing
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"]
      } else {
        props = props.split(" ")
      }
      var prop, index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback)
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback)
      } else {
        animationPrefilters.push(callback)
      }
    }
  });

  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, tween, hooks, oldfire, anim = this,
      orig = {}, style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = jQuery._data(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire()
          }
        }
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire()
          }
        })
      })
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
        if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
          style.display = "inline-block"
        } else {
          style.zoom = 1
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      if (!jQuery.support.shrinkWrapBlocks) {
        anim.always(function () {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2]
        })
      }
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          continue
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden
        }
      } else {
        dataShow = jQuery._data(elem, "fxshow", {})
      } if (toggle) {
        dataShow.hidden = !hidden
      }
      if (hidden) {
        jQuery(elem).show()
      } else {
        anim.done(function () {
          jQuery(elem).hide()
        })
      }
      anim.done(function () {
        var prop;
        jQuery._removeData(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop])
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0
          }
        }
      }
    }
  }

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing)
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || "swing";
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
      } else {
        this.pos = eased = percent
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this)
      }
      if (hooks && hooks.set) {
        hooks.set(this)
      } else {
        Tween.propHooks._default.set(this)
      }
      return this
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop]
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween)
        } else {
          if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
          } else {
            tween.elem[tween.prop] = tween.now
          }
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now
      }
    }
  };
  jQuery.each(["toggle", "show", "hide"], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
    }
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({
        opacity: to
      }, speed, easing, callback)
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || jQuery._data(this, "finish")) {
            anim.stop(true)
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd)
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", [])
      }
      return this.each(function () {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index])
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index])
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1)
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type)
        }
      })
    },
    finish: function (type) {
      if (type !== false) {
        type = type || "fx"
      }
      return this.each(function () {
        var index, data = jQuery._data(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true)
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1)
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this)
          }
        }
        delete data.finish
      })
    }
  });

  function genFx(type, includeWidth) {
    var which, attrs = {
        height: type
      }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type
    }
    return attrs
  }
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback)
    }
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx"
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this)
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue)
      }
    };
    return opt
  };
  jQuery.easing = {
    linear: function (p) {
      return p
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers,
      i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1)
      }
    }
    if (!timers.length) {
      jQuery.fx.stop()
    }
    fxNow = undefined
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer)) {
      jQuery.fx.start()
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
    }
  };
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem
      }).length
    }
  }
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i)
      })
    }
    var docElem, win, box = {
        top: 0,
        left: 0
      }, elem = this[0],
      doc = elem && elem.ownerDocument;
    if (!doc) {
      return
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box
    }
    if (typeof elem.getBoundingClientRect !== core_strundefined) {
      box = elem.getBoundingClientRect()
    }
    win = getWindow(doc);
    return {
      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    }
  };
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var position = jQuery.css(elem, "position");
      if (position === "static") {
        elem.style.position = "relative"
      }
      var curElem = jQuery(elem),
        curOffset = curElem.offset(),
        curCSSTop = jQuery.css(elem, "top"),
        curCSSLeft = jQuery.css(elem, "left"),
        calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
        props = {}, curPosition = {}, curTop, curLeft;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0
      } if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset)
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft
      }
      if ("using" in options) {
        options.using.call(elem, props)
      } else {
        curElem.css(props)
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return
      }
      var offsetParent, offset, parentOffset = {
          top: 0,
          left: 0
        }, elem = this[0];
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect()
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset()
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
          offsetParent = offsetParent.offsetParent
        }
        return offsetParent || docElem
      })
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method]
        }
        if (win) {
          win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop())
        } else {
          elem[method] = val
        }
      }, method, val, arguments.length, null)
    }
  });

  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
  }
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
          extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name]
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
        }, type, chainable ? margin : undefined, chainable, null)
      }
    })
  });
  jQuery.fn.size = function () {
    return this.length
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = jQuery
  } else {
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd) {
      define("jquery", [], function () {
        return jQuery
      })
    }
  }
})(window);
(function ($, undefined) {
  if ($.rails !== undefined) {
    $.error("jquery-ujs has already been loaded!")
  }
  var rails;
  var $document = $(document);
  $.rails = rails = {
    linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
    buttonClickSelector: "button[data-remote]",
    inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
    formSubmitSelector: "form",
    formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
    disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
    enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
    requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
    fileInputSelector: "input[type=file]",
    linkDisableSelector: "a[data-disable-with]",
    CSRFProtection: function (xhr) {
      var token = $('meta[name="csrf-token"]').attr("content");
      if (token) {
        xhr.setRequestHeader("X-CSRF-Token", token)
      }
    },
    fire: function (obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false
    },
    confirm: function (message) {
      return confirm(message)
    },
    ajax: function (options) {
      return $.ajax(options)
    },
    href: function (element) {
      return element.attr("href")
    },
    handleRemote: function (element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
      if (rails.fire(element, "ajax:before")) {
        elCrossDomain = element.data("cross-domain");
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data("with-credentials") || null;
        dataType = element.data("type") || ($.ajaxSettings && $.ajaxSettings.dataType);
        if (element.is("form")) {
          method = element.attr("method");
          url = element.attr("action");
          data = element.serializeArray();
          var button = element.data("ujs:submit-button");
          if (button) {
            data.push(button);
            element.data("ujs:submit-button", null)
          }
        } else {
          if (element.is(rails.inputChangeSelector)) {
            method = element.data("method");
            url = element.data("url");
            data = element.serialize();
            if (element.data("params")) {
              data = data + "&" + element.data("params")
            }
          } else {
            if (element.is(rails.buttonClickSelector)) {
              method = element.data("method") || "get";
              url = element.data("url");
              data = element.serialize();
              if (element.data("params")) {
                data = data + "&" + element.data("params")
              }
            } else {
              method = element.data("method");
              url = rails.href(element);
              data = element.data("params") || null
            }
          }
        }
        options = {
          type: method || "GET",
          data: data,
          dataType: dataType,
          beforeSend: function (xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script)
            }
            return rails.fire(element, "ajax:beforeSend", [xhr, settings])
          },
          success: function (data, status, xhr) {
            element.trigger("ajax:success", [data, status, xhr])
          },
          complete: function (xhr, status) {
            element.trigger("ajax:complete", [xhr, status])
          },
          error: function (xhr, status, error) {
            element.trigger("ajax:error", [xhr, status, error])
          },
          crossDomain: crossDomain
        };
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          }
        }
        if (url) {
          options.url = url
        }
        var jqxhr = rails.ajax(options);
        element.trigger("ajax:send", jqxhr);
        return jqxhr
      } else {
        return false
      }
    },
    handleMethod: function (link) {
      var href = rails.href(link),
        method = link.data("method"),
        target = link.attr("target"),
        csrf_token = $("meta[name=csrf-token]").attr("content"),
        csrf_param = $("meta[name=csrf-param]").attr("content"),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
      if (csrf_param !== undefined && csrf_token !== undefined) {
        metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'
      }
      if (target) {
        form.attr("target", target)
      }
      form.hide().append(metadata_input).appendTo("body");
      form.submit()
    },
    disableFormElements: function (form) {
      form.find(rails.disableSelector).each(function () {
        var element = $(this),
          method = element.is("button") ? "html" : "val";
        element.data("ujs:enable-with", element[method]());
        element[method](element.data("disable-with"));
        element.prop("disabled", true)
      })
    },
    enableFormElements: function (form) {
      form.find(rails.enableSelector).each(function () {
        var element = $(this),
          method = element.is("button") ? "html" : "val";
        if (element.data("ujs:enable-with")) {
          element[method](element.data("ujs:enable-with"))
        }
        element.prop("disabled", false)
      })
    },
    allowAction: function (element) {
      var message = element.data("confirm"),
        answer = false,
        callback;
      if (!message) {
        return true
      }
      if (rails.fire(element, "confirm")) {
        answer = rails.confirm(message);
        callback = rails.fire(element, "confirm:complete", [answer])
      }
      return answer && callback
    },
    blankInputs: function (form, specifiedSelector, nonBlank) {
      var inputs = $(),
        input, valueToCheck, selector = specifiedSelector || "input,textarea",
        allInputs = form.find(selector);
      allInputs.each(function () {
        input = $(this);
        valueToCheck = input.is("input[type=checkbox],input[type=radio]") ? input.is(":checked") : input.val();
        if (!valueToCheck === !nonBlank) {
          if (input.is("input[type=radio]") && allInputs.filter('input[type=radio]:checked[name="' + input.attr("name") + '"]').length) {
            return true
          }
          inputs = inputs.add(input)
        }
      });
      return inputs.length ? inputs : false
    },
    nonBlankInputs: function (form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true)
    },
    stopEverything: function (e) {
      $(e.target).trigger("ujs:everythingStopped");
      e.stopImmediatePropagation();
      return false
    },
    disableElement: function (element) {
      element.data("ujs:enable-with", element.html());
      element.html(element.data("disable-with"));
      element.bind("click.railsDisable", function (e) {
        return rails.stopEverything(e)
      })
    },
    enableElement: function (element) {
      if (element.data("ujs:enable-with") !== undefined) {
        element.html(element.data("ujs:enable-with"));
        element.removeData("ujs:enable-with")
      }
      element.unbind("click.railsDisable")
    }
  };
  if (rails.fire($document, "rails:attachBindings")) {
    $.ajaxPrefilter(function (options, originalOptions, xhr) {
      if (!options.crossDomain) {
        rails.CSRFProtection(xhr)
      }
    });
    $document.delegate(rails.linkDisableSelector, "ajax:complete", function () {
      rails.enableElement($(this))
    });
    $document.delegate(rails.linkClickSelector, "click.rails", function (e) {
      var link = $(this),
        method = link.data("method"),
        data = link.data("params");
      if (!rails.allowAction(link)) {
        return rails.stopEverything(e)
      }
      if (link.is(rails.linkDisableSelector)) {
        rails.disableElement(link)
      }
      if (link.data("remote") !== undefined) {
        if ((e.metaKey || e.ctrlKey) && (!method || method === "GET") && !data) {
          return true
        }
        var handleRemote = rails.handleRemote(link);
        if (handleRemote === false) {
          rails.enableElement(link)
        } else {
          handleRemote.error(function () {
            rails.enableElement(link)
          })
        }
        return false
      } else {
        if (link.data("method")) {
          rails.handleMethod(link);
          return false
        }
      }
    });
    $document.delegate(rails.buttonClickSelector, "click.rails", function (e) {
      var button = $(this);
      if (!rails.allowAction(button)) {
        return rails.stopEverything(e)
      }
      rails.handleRemote(button);
      return false
    });
    $document.delegate(rails.inputChangeSelector, "change.rails", function (e) {
      var link = $(this);
      if (!rails.allowAction(link)) {
        return rails.stopEverything(e)
      }
      rails.handleRemote(link);
      return false
    });
    $document.delegate(rails.formSubmitSelector, "submit.rails", function (e) {
      var form = $(this),
        remote = form.data("remote") !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
      if (!rails.allowAction(form)) {
        return rails.stopEverything(e)
      }
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs])) {
        return rails.stopEverything(e)
      }
      if (remote) {
        if (nonBlankFileInputs) {
          setTimeout(function () {
            rails.disableFormElements(form)
          }, 13);
          var aborted = rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs]);
          if (!aborted) {
            setTimeout(function () {
              rails.enableFormElements(form)
            }, 13)
          }
          return aborted
        }
        rails.handleRemote(form);
        return false
      } else {
        setTimeout(function () {
          rails.disableFormElements(form)
        }, 13)
      }
    });
    $document.delegate(rails.formInputClickSelector, "click.rails", function (event) {
      var button = $(this);
      if (!rails.allowAction(button)) {
        return rails.stopEverything(event)
      }
      var name = button.attr("name"),
        data = name ? {
          name: name,
          value: button.val()
        } : null;
      button.closest("form").data("ujs:submit-button", data)
    });
    $document.delegate(rails.formSubmitSelector, "ajax:beforeSend.rails", function (event) {
      if (this == event.target) {
        rails.disableFormElements($(this))
      }
    });
    $document.delegate(rails.formSubmitSelector, "ajax:complete.rails", function (event) {
      if (this == event.target) {
        rails.enableFormElements($(this))
      }
    });
    $(function () {
      var csrf_token = $("meta[name=csrf-token]").attr("content");
      var csrf_param = $("meta[name=csrf-param]").attr("content");
      $('form input[name="' + csrf_param + '"]').val(csrf_token)
    })
  }
})(jQuery);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory)
  } else {
    factory(jQuery)
  }
}(function ($) {
  var pluses = /\+/g;

  function raw(s) {
    return s
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, " "))
  }

  function converted(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
    }
    try {
      return config.json ? JSON.parse(s) : s
    } catch (er) {}
  }
  var config = $.cookie = function (key, value, options) {
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === "number") {
        var days = options.expires,
          t = options.expires = new Date();
        t.setDate(t.getDate() + days)
      }
      value = config.json ? JSON.stringify(value) : String(value);
      return (document.cookie = [config.raw ? key : encodeURIComponent(key), "=", config.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""))
    }
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split("; ");
    var result = key ? undefined : {};
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split("=");
      var name = decode(parts.shift());
      var cookie = decode(parts.join("="));
      if (key && key === name) {
        result = converted(cookie);
        break
      }
      if (!key) {
        result[name] = converted(cookie)
      }
    }
    return result
  };
  config.defaults = {};
  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== undefined) {
      $.cookie(key, "", $.extend({}, options, {
        expires: -1
      }));
      return true
    }
    return false
  }
})); + function ($) {
  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$window = $(window).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(element);
    this.affixed = this.unpin = null;
    this.checkPosition()
  };
  Affix.DEFAULTS = {
    offset: 0
  };
  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  };
  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(":visible")) {
      return
    }
    var scrollHeight = $(document).height();
    var scrollTop = this.$window.scrollTop();
    var position = this.$element.offset();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var reset = "affix affix-top affix-bottom";
    if (typeof offset != "object") {
      offsetBottom = offsetTop = offset
    }
    if (typeof offsetTop == "function") {
      offsetTop = offset.top()
    }
    if (typeof offsetBottom == "function") {
      offsetBottom = offset.bottom()
    }
    var affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ? false : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? "bottom" : offsetTop != null && (scrollTop <= offsetTop) ? "top" : false;
    if (this.affixed === affix) {
      return
    }
    this.affixed = affix;
    this.unpin = affix == "bottom" ? position.top - scrollTop : null;
    this.$element.removeClass(reset).addClass("affix" + (affix ? "-" + affix : ""))
  };
  var old = $.fn.affix;
  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.affix");
      var options = typeof option == "object" && option;
      if (!data) {
        $this.data("bs.affix", (data = new Affix(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.affix.Constructor = Affix;
  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this
  };
  $(window).on("load", function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom) {
        data.offset.bottom = data.offsetBottom
      }
      if (data.offsetTop) {
        data.offset.top = data.offsetTop
      }
      $spy.affix(data)
    })
  })
}(window.jQuery); + function ($) {
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function (el) {
    $(el).on("click", dismiss, this.close)
  };
  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
    }
    var $parent = $(selector);
    if (e) {
      e.preventDefault()
    }
    if (!$parent.length) {
      $parent = $this.hasClass("alert") ? $this : $this.parent()
    }
    $parent.trigger(e = $.Event("close.bs.alert"));
    if (e.isDefaultPrevented()) {
      return
    }
    $parent.removeClass("in");

    function removeElement() {
      $parent.trigger("closed.bs.alert").remove()
    }
    $.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement()
  };
  var old = $.fn.alert;
  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.alert");
      if (!data) {
        $this.data("bs.alert", (data = new Alert(this)))
      }
      if (typeof option == "string") {
        data[option].call($this)
      }
    })
  };
  $.fn.alert.Constructor = Alert;
  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this
  };
  $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
}(window.jQuery); + function ($) {
  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options)
  };
  Button.DEFAULTS = {
    loadingText: "loading..."
  };
  Button.prototype.setState = function (state) {
    var d = "disabled";
    var $el = this.$element;
    var val = $el.is("input") ? "val" : "html";
    var data = $el.data();
    state = state + "Text";
    if (!data.resetText) {
      $el.data("resetText", $el[val]())
    }
    $el[val](data[state] || this.options[state]);
    setTimeout(function () {
      state == "loadingText" ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
    }, 0)
  };
  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
    if ($parent) {
      $parent.find(".active").removeClass("active")
    }
    this.$element.toggleClass("active")
  };
  var old = $.fn.button;
  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("button");
      var options = typeof option == "object" && option;
      if (!data) {
        $this.data("bs.button", (data = new Button(this, options)))
      }
      if (option == "toggle") {
        data.toggle()
      } else {
        if (option) {
          data.setState(option)
        }
      }
    })
  };
  $.fn.button.Constructor = Button;
  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this
  };
  $(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (e) {
    var $btn = $(e.target);
    if (!$btn.hasClass("btn")) {
      $btn = $btn.closest(".btn")
    }
    $btn.button("toggle")
  })
}(window.jQuery); + function ($) {
  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = options;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
  };
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: "hover"
  };
  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this
  };
  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find(".item.active");
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active)
  };
  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getActiveIndex();
    if (pos > (this.$items.length - 1) || pos < 0) {
      return
    }
    if (this.sliding) {
      return this.$element.one("slid", function () {
        that.to(pos)
      })
    }
    if (activeIndex == pos) {
      return this.pause().cycle()
    }
    return this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]))
  };
  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);
    if (this.$element.find(".next, .prev").length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true)
    }
    this.interval = clearInterval(this.interval);
    return this
  };
  Carousel.prototype.next = function () {
    if (this.sliding) {
      return
    }
    return this.slide("next")
  };
  Carousel.prototype.prev = function () {
    if (this.sliding) {
      return
    }
    return this.slide("prev")
  };
  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find(".item.active");
    var $next = next || $active[type]();
    var isCycling = this.interval;
    var direction = type == "next" ? "left" : "right";
    var fallback = type == "next" ? "first" : "last";
    var that = this;
    this.sliding = true;
    isCycling && this.pause();
    $next = $next.length ? $next : this.$element.find(".item")[fallback]();
    var e = $.Event("slide.bs.carousel", {
      relatedTarget: $next[0],
      direction: direction
    });
    if ($next.hasClass("active")) {
      return
    }
    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      this.$element.one("slid", function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
        $nextIndicator && $nextIndicator.addClass("active")
      })
    }
    if ($.support.transition && this.$element.hasClass("slide")) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) {
        return
      }
      $next.addClass(type);
      $next[0].offsetWidth;
      $active.addClass(direction);
      $next.addClass(direction);
      this.$element.one($.support.transition.end, function () {
        $next.removeClass([type, direction].join(" ")).addClass("active");
        $active.removeClass(["active", direction].join(" "));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger("slid")
        }, 0)
      })
    } else {
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) {
        return
      }
      $active.removeClass("active");
      $next.addClass("active");
      this.sliding = false;
      this.$element.trigger("slid")
    }
    isCycling && this.cycle();
    return this
  };
  var old = $.fn.carousel;
  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.carousel");
      var options = $.extend({}, Carousel.DEFAULTS, typeof option == "object" && option);
      var action = typeof option == "string" ? option : options.slide;
      if (!data) {
        $this.data("bs.carousel", (data = new Carousel(this, options)))
      }
      if (typeof option == "number") {
        data.to(option)
      } else {
        if (action) {
          data[action]()
        } else {
          if (options.interval) {
            data.pause().cycle()
          }
        }
      }
    })
  };
  $.fn.carousel.Constructor = Carousel;
  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this
  };
  $(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (e) {
    var $this = $(this),
      href;
    var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex;
    $target.carousel(options);
    if (slideIndex = $this.attr("data-slide-to")) {
      $target.data("bs.carousel").pause().to(slideIndex).cycle()
    }
    e.preventDefault()
  });
  $(window).on("load", function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      $carousel.carousel($carousel.data())
    })
  })
}(window.jQuery); + function ($) {
  var Collapse = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.transitioning = null;
    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }
    if (this.options.toggle) {
      this.toggle()
    }
  };
  Collapse.DEFAULTS = {
    toggle: true
  };
  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height"
  };
  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass("in")) {
      return
    }
    var dimension = this.dimension();
    var scroll = $.camelCase(["scroll", dimension].join("-"));
    var actives = this.$parent && this.$parent.find("> .accordion-group > .in");
    if (actives && actives.length) {
      var hasData = actives.data("collapse");
      if (hasData && hasData.transitioning) {
        return
      }
      actives.collapse("hide");
      hasData || actives.data("collapse", null)
    }
    this.$element[dimension](0);
    this.transition("addClass", $.Event("show.bs.collapse"), "shown.bs.collapse");
    if ($.support.transition) {
      this.$element[dimension](this.$element[0][scroll])
    }
  };
  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass("in")) {
      return
    }
    var dimension = this.dimension();
    this.reset(this.$element[dimension]());
    this.transition("removeClass", $.Event("hide.bs.collapse"), "hidden");
    this.$element[dimension](0)
  };
  Collapse.prototype.reset = function (size) {
    var dimension = this.dimension();
    this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth;
    this.$element[size !== null ? "addClass" : "removeClass"]("collapse");
    return this
  };
  Collapse.prototype.transition = function (method, startEvent, completeEvent) {
    var that = this;
    var complete = function () {
      if (startEvent.type == "show") {
        that.reset()
      }
      that.transitioning = 0;
      that.$element.trigger(completeEvent)
    };
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) {
      return
    }
    this.transitioning = 1;
    this.$element[method]("in");
    $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) : complete()
  };
  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  };
  var old = $.fn.collapse;
  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("collapse");
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
      if (!data) {
        $this.data("collapse", (data = new Collapse(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.collapse.Constructor = Collapse;
  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this
  };
  $(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (e) {
    var $this = $(this),
      href;
    var target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
    var option = $(target).data("collapse") ? "toggle" : $this.data();
    $this[$(target).hasClass("in") ? "addClass" : "removeClass"]("collapsed");
    $(target).collapse(option)
  })
}(window.jQuery); + function ($) {
  var backdrop = ".dropdown-backdrop";
  var toggle = "[data-toggle=dropdown]";
  var Dropdown = function (element) {
    var $el = $(element).on("click.bs.dropdown", this.toggle)
  };
  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is(".disabled, :disabled")) {
      return
    }
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if ("ontouchstart" in document.documentElement) {
        $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on("click", clearMenus)
      }
      $parent.trigger(e = $.Event("show.bs.dropdown"));
      if (e.isDefaultPrevented()) {
        return
      }
      $parent.toggleClass("open").trigger("shown.bs.dropdown")
    }
    $this.focus();
    return false
  };
  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) {
      return
    }
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is(".disabled, :disabled")) {
      return
    }
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) {
        $parent.find(toggle).focus()
      }
      return $this.click()
    }
    var $items = $("[role=menu] li:not(.divider):visible a", $parent);
    if (!$items.length) {
      return
    }
    var index = $items.index($items.filter(":focus"));
    if (e.keyCode == 38 && index > 0) {
      index--
    }
    if (e.keyCode == 40 && index < $items.length - 1) {
      index++
    }
    if (!~index) {
      index = 0
    }
    $items.eq(index).focus()
  };

  function clearMenus() {
    $(backdrop).remove();
    $(toggle).each(function (e) {
      var $parent = getParent($(this));
      if (!$parent.hasClass("open")) {
        return
      }
      $parent.trigger(e = $.Event("hide.bs.dropdown"));
      if (e.isDefaultPrevented()) {
        return
      }
      $parent.removeClass("open").trigger("hidden.bs.dropdown")
    })
  }

  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent()
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("dropdown");
      if (!data) {
        $this.data("dropdown", (data = new Dropdown(this)))
      }
      if (typeof option == "string") {
        data[option].call($this)
      }
    })
  };
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this
  };
  $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
    e.stopPropagation()
  }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown)
}(window.jQuery);
(function ($) {
  var selectors = [];
  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $(window);
  var $prior_appeared;

  function process() {
    check_lock = false;
    for (var index = 0; index < selectors.length; index++) {
      var $appeared = $(selectors[index]).filter(function () {
        return $(this).is(":appeared")
      });
      $appeared.trigger("appear", [$appeared]);
      if ($prior_appeared) {
        var $disappeared = $prior_appeared.not($appeared);
        $disappeared.trigger("disappear", [$disappeared])
      }
      $prior_appeared = $appeared
    }
  }
  $.expr[":"]["appeared"] = function (element) {
    var $element = $(element);
    if (!$element.is(":visible")) {
      return false
    }
    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;
    if (top + $element.height() >= window_top && top - ($element.data("appear-top-offset") || 0) <= window_top + $window.height() && left + $element.width() >= window_left && left - ($element.data("appear-left-offset") || 0) <= window_left + $window.width()) {
      return true
    } else {
      return false
    }
  };
  $.fn.extend({
    appear: function (options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function () {
          if (check_lock) {
            return
          }
          check_lock = true;
          setTimeout(process, opts.interval)
        };
        $(window).scroll(on_check).resize(on_check);
        check_binded = true
      }
      if (opts.force_process) {
        setTimeout(process, opts.interval)
      }
      selectors.push(selector);
      return $(selector)
    }
  });
  $.extend({
    force_appear: function () {
      if (check_binded) {
        process();
        return true
      }
      return false
    }
  })
})(jQuery);
(function (jQuery) {
  jQuery.hotkeys = {
    version: "0.8",
    specialKeys: {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      191: "/",
      224: "meta"
    },
    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": '"',
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data !== "string") {
      return
    }
    var origHandler = handleObj.handler,
      keys = handleObj.data.toLowerCase().split(" "),
      textAcceptingInputTypes = ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color"];
    handleObj.handler = function (event) {
      if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || jQuery.inArray(event.target.type, textAcceptingInputTypes) > -1)) {
        return
      }
      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        key, modif = "",
        possible = {};
      if (event.altKey && special !== "alt") {
        modif += "alt+"
      }
      if (event.ctrlKey && special !== "ctrl") {
        modif += "ctrl+"
      }
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+"
      }
      if (event.shiftKey && special !== "shift") {
        modif += "shift+"
      }
      if (special) {
        possible[modif + special] = true
      } else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true
        }
      }
      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments)
        }
      }
    }
  }
  jQuery.each(["keydown", "keyup", "keypress"], function () {
    jQuery.event.special[this] = {
      add: keyHandler
    }
  })
})(jQuery);
(function (w, d) {
  if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, "")
    }
  }
  var Medium = Medium || function (userOpts) {
      var settings = {
        debug: true,
        element: null,
        modifier: "auto",
        placeholder: "",
        autofocus: false,
        autoHR: true,
        mode: "rich",
        maxLength: -1,
        modifiers: {
          66: "bold",
          73: "italicize",
          85: "underline",
          86: "paste"
        },
        tags: {
          paragraph: "p",
          outerLevel: ["pre", "blockquote", "figure", "hr"],
          innerLevel: ["a", "b", "u", "i", "img", "strong"]
        },
        cssClasses: {
          editor: "Medium",
          pasteHook: "Medium-paste-hook",
          placeholder: "Medium-placeholder"
        }
      }, cache = {
          initialized: false,
          cmd: false,
          focusedElement: null
        }, _log = function (w) {
          if (settings.debug) {
            console.log(w)
          }
        }, utils = {
          isCommand: function (e, fnTrue, fnFalse) {
            if ((settings.modifier === "ctrl" && e.ctrlKey) || (settings.modifier === "cmd" && e.metaKey) || (settings.modifier === "auto" && (e.ctrlKey || e.metaKey))) {
              return fnTrue.call()
            } else {
              return fnFalse.call()
            }
          },
          isShift: function (e, fnTrue, fnFalse) {
            if (e.shiftKey) {
              return fnTrue.call()
            } else {
              return fnFalse.call()
            }
          },
          isModifier: function (e, fn) {
            var w = e.which,
              cmd = settings.modifiers[w];
            if (cmd) {
              return fn.call(null, cmd)
            }
          },
          isNotSpecial: function (e) {
            var special = {
              16: "shift",
              17: "ctrl",
              18: "alt",
              91: "cmd",
              8: "delete"
            };
            if (cache.cmd) {
              return false
            }
            return !(e.which in special)
          },
          addEvent: function addEvent(element, eventName, func) {
            if (element.addEventListener) {
              element.addEventListener(eventName, func, false)
            } else {
              if (element.attachEvent) {
                element.attachEvent("on" + eventName, func)
              }
            }
          },
          removeEvent: function addEvent(element, eventName, func) {
            if (element.addEventListener) {
              element.removeEventListener(eventName, func, false)
            } else {
              if (element.attachEvent) {
                element.detachEvent("on" + eventName, func)
              }
            }
          },
          preventDefaultEvent: function (e) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          },
          getElementsByClassName: function (classname, el) {
            el = el ? el : document.body;
            var a = [],
              re = new RegExp("(^| )" + classname + "( |$)"),
              els = el.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++) {
              if (re.test(els[i].className)) {
                a.push(els[i])
              }
            }
            return a
          },
          deepExtend: function (destination, source) {
            for (var property in source) {
              if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                utils.deepExtend(destination[property], source[property])
              } else {
                destination[property] = source[property]
              }
            }
            return destination
          },
          selection: {
            saveSelection: function () {
              if (w.getSelection) {
                var sel = w.getSelection();
                if (sel.rangeCount > 0) {
                  return sel.getRangeAt(0)
                }
              } else {
                if (d.selection && d.selection.createRange) {
                  return d.selection.createRange()
                }
              }
              return null
            },
            restoreSelection: function (range) {
              if (range) {
                if (w.getSelection) {
                  var sel = w.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(range)
                } else {
                  if (d.selection && range.select) {
                    range.select()
                  }
                }
              }
            }
          },
          cursor: {
            set: function (pos, el) {
              if (d.createRange) {
                var range = d.createRange(),
                  selection = w.getSelection(),
                  lastChild = utils.html.lastChild(),
                  length = utils.html.text(lastChild).length - 1,
                  toModify = el ? el : lastChild,
                  theLength = typeof pos !== "undefined" ? pos : length;
                range.setStart(toModify, theLength);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range)
              } else {
                var range = d.body.createTextRange();
                range.moveToElementText(el);
                range.collapse(false);
                range.select()
              }
            }
          },
          html: {
            text: function (node, val) {
              node = node || settings.element;
              if (val) {
                if ((node.textContent) && (typeof (node.textContent) != "undefined")) {
                  node.textContent = val
                } else {
                  node.innerText = val
                }
              }
              return (node.textContent).trim()
            },
            changeTag: function (oldNode, newTag) {
              var newNode = d.createElement(newTag),
                node, nextNode;
              node = oldNode.firstChild;
              while (node) {
                nextNode = node.nextSibling;
                newNode.appendChild(node);
                node = nextNode
              }
              oldNode.parentNode.insertBefore(newNode, oldNode);
              oldNode.parentNode.removeChild(oldNode)
            },
            deleteNode: function (el) {
              el.parentNode.removeChild(el)
            },
            placeholders: function () {
              var placeholders = utils.getElementsByClassName(settings.cssClasses.placeholder, settings.element),
                innerText = utils.html.text(settings.element);
              if (innerText === "") {
                settings.element.innerHTML = "";
                if (settings.placeholder.length > 0) {
                  utils.html.addTag(settings.tags.paragraph, false, false);
                  var c = utils.html.lastChild();
                  c.className = settings.cssClasses.placeholder;
                  utils.html.text(c, settings.placeholder)
                }
                utils.html.addTag(settings.tags.paragraph, cache.initialized ? true : settings.autofocus)
              } else {
                if (innerText !== settings.placeholder) {
                  var i;
                  for (i = 0; i < placeholders.length; i++) {
                    utils.html.deleteNode(placeholders[i])
                  }
                }
              }
            },
            clean: function () {
              var attsToRemove = ["style"],
                only = (settings.tags.outerLevel).concat([settings.tags.paragraph]),
                children = settings.element.children,
                i, j, k;
              for (i = 0; i < children.length; i++) {
                var child = children[i],
                  nodeName = child.nodeName,
                  shouldDelete = true;
                for (k = 0; k < attsToRemove.length; k++) {
                  if (child.hasAttribute(attsToRemove[k])) {
                    if (child.getAttribute(attsToRemove[k]) !== settings.cssClasses.placeholder) {
                      child.removeAttribute(attsToRemove[k])
                    }
                  }
                }
                for (j = 0; j < only.length; j++) {
                  if (only[j] === nodeName.toLowerCase()) {
                    shouldDelete = false
                  }
                }
                if (shouldDelete) {
                  switch (nodeName.toLowerCase()) {
                  case "div":
                    utils.html.changeTag(child, settings.tags.paragraph);
                    break;
                  case "a":
                    break;
                  case "i":
                    break;
                  case "b":
                    break;
                  default:
                    utils.html.deleteNode(child);
                    break
                  }
                }
              }
            },
            lastChild: function () {
              return settings.element.lastChild
            },
            addTag: function (tag, shouldFocus, isEditable, afterElement) {
              var newEl = d.createElement(tag),
                toFocus;
              if (typeof isEditable !== "undefined" && isEditable === false) {
                newEl.contentEditable = false
              }
              newEl.innerHTML = " ";
              if (afterElement && afterElement.nextSibling) {
                afterElement.parentNode.insertBefore(newEl, afterElement.nextSibling);
                toFocus = afterElement.nextSibling
              } else {
                settings.element.appendChild(newEl);
                toFocus = utils.html.lastChild()
              } if (shouldFocus) {
                cache.focusedElement = toFocus;
                utils.cursor.set(0, toFocus)
              }
            }
          },
          pasteHook: function (fn) {
            var input = d.createElement("textarea");
            input.className = settings.cssClasses.pasteHook;
            settings.element.appendChild(input);
            var pasteHookNode = utils.getElementsByClassName(settings.cssClasses.pasteHook, settings.element)[0];
            pasteHookNode.focus();
            setTimeout(function () {
              var v = pasteHookNode.value;
              fn.call(null, v);
              utils.html.deleteNode(pasteHookNode)
            }, 1)
          }
        }, intercept = {
          focus: function (e) {},
          down: function (e) {
            utils.isCommand(e, function () {
              cache.cmd = true
            }, function () {
              cache.cmd = false
            });
            utils.isShift(e, function () {
              cache.shift = true
            }, function () {
              cache.shift = false
            });
            utils.isModifier(e, function (cmd) {
              if (cache.cmd) {
                if (((settings.mode === "inline") || (settings.mode === "partial")) && cmd !== "paste") {
                  return
                }
                intercept.command[cmd].call(null, e)
              }
            });
            if (settings.maxLength !== -1) {
              var ph = settings.element.getElementsByClassName(settings.cssClasses.placeholder)[0],
                len = utils.html.text().length;
              if (settings.placeholder && ph) {
                len -= settings.placeholder.length
              }
              if (len >= settings.maxLength && utils.isNotSpecial(e)) {
                return utils.preventDefaultEvent(e)
              }
              _log(len + "/" + settings.maxLength)
            }
            if (e.which === 13) {
              intercept.enterKey.call(null, e)
            }
          },
          up: function (e) {
            utils.isCommand(e, function () {
              cache.cmd = false
            }, function () {
              cache.cmd = true
            });
            utils.html.clean();
            utils.html.placeholders();
            action.preserveElementFocus()
          },
          command: {
            bold: function (e) {
              utils.preventDefaultEvent(e);
              d.execCommand("bold", false);
              _log("Bold")
            },
            underline: function (e) {
              utils.preventDefaultEvent(e);
              d.execCommand("underline", false);
              _log("Underline")
            },
            italicize: function (e) {
              utils.preventDefaultEvent(e);
              d.execCommand("italic", false);
              _log("Italic")
            },
            quote: function (e) {},
            paste: function (e) {
              var sel = utils.selection.saveSelection();
              utils.pasteHook(function (text) {
                utils.selection.restoreSelection(sel);
                d.execCommand("insertHTML", false, text.replace(/\n/g, "<br>"))
              })
            }
          },
          enterKey: function (e) {
            if (settings.mode === "inline") {
              return utils.preventDefaultEvent(e)
            }
            if (!cache.shift) {
              utils.preventDefaultEvent(e);
              var focusedElement = cache.focusedElement;
              if (settings.autoHR && settings.mode !== "partial") {
                var children = settings.element.children,
                  lastChild = children[children.length - 1],
                  makeHR = (utils.html.text(lastChild) === "") && (lastChild.nodeName.toLowerCase() === settings.tags.paragraph);
                if (makeHR && children.length >= 2) {
                  var secondToLast = children[children.length - 2];
                  if (secondToLast.nodeName.toLowerCase() === "hr") {
                    makeHR = false
                  }
                }
                if (makeHR) {
                  utils.preventDefaultEvent(e);
                  utils.html.deleteNode(lastChild);
                  utils.html.addTag("hr", false, false, focusedElement);
                  focusedElement = focusedElement.nextSibling
                }
                utils.html.addTag(settings.tags.paragraph, true, null, focusedElement)
              } else {
                utils.html.addTag(settings.tags.paragraph, true, null, focusedElement)
              }
            }
          }
        }, action = {
          listen: function () {
            utils.addEvent(settings.element, "keyup", intercept.up);
            utils.addEvent(settings.element, "keydown", intercept.down);
            utils.addEvent(settings.element, "focus", intercept.focus)
          },
          preserveElementFocus: function () {
            var anchorNode = w.getSelection ? w.getSelection().anchorNode : d.activeElement;
            if (anchorNode) {
              var cur = anchorNode.parentNode,
                children = settings.element.children,
                diff = cur !== cache.focusedElement,
                elementIndex = 0,
                i;
              if (cur === settings.element) {
                cur = anchorNode
              }
              for (i = 0; i < children.length; i++) {
                if (cur === children[i]) {
                  elementIndex = i;
                  break
                }
              }
              if (diff) {
                cache.focusedElement = cur;
                cache.focusedElementIndex = elementIndex
              }
            }
          }
        }, init = function (opts) {
          for (var key in settings) {
            if (typeof settings[key] !== "object" && settings.hasOwnProperty(key) && opts.element.getAttribute("data-medium-" + key)) {
              var newVal = opts.element.getAttribute("data-medium-" + key);
              if (newVal.toLowerCase() === "false" || newVal.toLowerCase() === "true") {
                newVal = newVal.toLowerCase() === "true"
              }
              settings[key] = newVal
            }
          }
          utils.deepExtend(settings, opts);
          settings.element.contentEditable = true;
          settings.element.className += (" ") + settings.cssClasses.editor;
          settings.element.className += (" ") + settings.cssClasses.editor + "-" + settings.mode;
          utils.html.clean();
          utils.html.placeholders();
          action.preserveElementFocus();
          action.listen();
          cache.initialized = true
        };
      this.destroy = function () {
        utils.removeEvent(settings.element, "keyup", intercept.up);
        utils.removeEvent(settings.element, "keydown", intercept.down);
        utils.removeEvent(settings.element, "focus", intercept.focus)
      };
      init(userOpts)
    };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Medium
  }
  if (typeof ender === "undefined") {
    this.Medium = Medium
  }
  if (typeof define === "function" && define.amd) {
    define("Medium", [], function () {
      return Medium
    })
  }
}).call(this, window, document); + function ($) {
  var Modal = function (element, options) {
    this.options = options;
    this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this));
    this.$backdrop = this.isShown = null;
    if (this.options.remote) {
      this.$element.find(".modal-body").load(this.options.remote)
    }
  };
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  Modal.prototype.toggle = function () {
    return this[!this.isShown ? "show" : "hide"]()
  };
  Modal.prototype.show = function () {
    var that = this;
    var e = $.Event("show.bs.modal");
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) {
      return
    }
    this.isShown = true;
    this.escape();
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass("fade");
      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body)
      }
      that.$element.show();
      if (transition) {
        that.$element[0].offsetWidth
      }
      that.$element.addClass("in").attr("aria-hidden", false);
      that.enforceFocus();
      transition ? that.$element.one($.support.transition.end, function () {
        that.$element.focus().trigger("shown.bs.modal")
      }) : that.$element.focus().trigger("shown.bs.modal")
    })
  };
  Modal.prototype.hide = function (e) {
    if (e) {
      e.preventDefault()
    }
    e = $.Event("hide.bs.modal");
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) {
      return
    }
    this.isShown = false;
    this.escape();
    $(document).off("focusin.bs.modal");
    this.$element.removeClass("in").attr("aria-hidden", true);
    $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
  };
  Modal.prototype.enforceFocus = function () {
    $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.focus()
      }
    }, this))
  };
  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on("keyup.dismiss.bs.modal", $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else {
      if (!this.isShown) {
        this.$element.off("keyup.dismiss.bs.modal")
      }
    }
  };
  Modal.prototype.hideWithTransition = function () {
    var that = this;
    var timeout = setTimeout(function () {
      that.$element.off($.support.transition.end);
      that.hideModal()
    }, 500);
    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout);
      that.hideModal()
    })
  };
  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.removeBackdrop();
      that.$element.trigger("hidden.bs.modal")
    })
  };
  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null
  };
  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo("#content-area");
      this.$backdrop.click(this.options.backdrop == "static" ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this));
      if (doAnimate) {
        this.$backdrop[0].offsetWidth
      }
      this.$backdrop.addClass("in");
      if (!callback) {
        return
      }
      doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
    } else {
      if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback) : callback()
      } else {
        if (callback) {
          callback()
        }
      }
    }
  };
  var old = $.fn.modal;
  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.modal");
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
      if (!data) {
        $this.data("bs.modal", (data = new Modal(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      } else {
        if (options.show) {
          data.show()
        }
      }
    })
  };
  $.fn.modal.Constructor = Modal;
  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this
  };
  $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr("href");
    var $target = $($this.attr("data-target") || (href && href.replace(/.*(?=#[^\s]+$)/, "")));
    var option = $target.data("modal") ? "toggle" : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    e.preventDefault();
    $target.modal(option).one("hide", function () {
      $this.focus()
    })
  });
  var $body = $(document.body).on("bs.modal.shown", ".modal", function () {
    $body.addClass("modal-open")
  }).on("bs.modal.hidden", ".modal", function () {
    $body.removeClass("modal-open")
  })
}(window.jQuery); + function ($) {
  function ScrollSpy(element, options) {
    var href;
    var process = $.proxy(this.process, this);
    var $element = $(element).is("body") ? $(window) : $(element);
    this.$body = $("body");
    this.$scrollElement = $element.on("scroll.bs.scroll-spy.data-api", process);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || ((href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")) || "") + " .nav li > a";
    this.offsets = $([]);
    this.targets = $([]);
    this.activeTarget = null;
    this.refresh();
    this.process()
  }
  ScrollSpy.DEFAULTS = {
    offset: 10
  };
  ScrollSpy.prototype.refresh = function () {
    this.offsets = $([]);
    this.targets = $([]);
    var self = this;
    var $targets = this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data("target") || $el.attr("href");
      var $href = /^#\w/.test(href) && $(href);
      return ($href && $href.length && [
        [$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
      ]) || null
    }).sort(function (a, b) {
      return a[0] - b[0]
    }).each(function () {
      self.offsets.push(this[0]);
      self.targets.push(this[1])
    })
  };
  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
    var maxScroll = scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;
    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }
    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
    }
  };
  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;
    $(this.selector).parents(".active").removeClass("active");
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents("li").addClass("active");
    if (active.parent(".dropdown-menu").length) {
      active = active.closest("li.dropdown").addClass("active")
    }
    active.trigger("activate")
  };
  var old = $.fn.scrollspy;
  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.scrollspy");
      var options = typeof option == "object" && option;
      if (!data) {
        $this.data("bs.scrollspy", (data = new ScrollSpy(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.scrollspy.Constructor = ScrollSpy;
  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this
  };
  $(window).on("load", function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      $spy.scrollspy($spy.data())
    })
  })
}(window.jQuery);
(function (c, b) {
  var a = a || function (k) {
      var f = {
        element: null,
        dragger: null,
        disable: "none",
        addBodyClasses: true,
        hyperextensible: true,
        resistance: 0.5,
        flickThreshold: 50,
        transitionSpeed: 0.3,
        easing: "ease",
        maxPosition: 266,
        minPosition: -266,
        tapToClose: true,
        touchToDrag: true,
        slideIntent: 40,
        minDragDistance: 5
      }, e = {
          simpleStates: {
            opening: null,
            towards: null,
            hyperExtending: null,
            halfway: null,
            flick: null,
            translation: {
              absolute: 0,
              relative: 0,
              sinceDirectionChange: 0,
              percentage: 0
            }
          }
        }, h = {}, d = {
          hasTouch: (b.ontouchstart === null),
          eventType: function (m) {
            var l = {
              down: (d.hasTouch ? "touchstart" : "mousedown"),
              move: (d.hasTouch ? "touchmove" : "mousemove"),
              up: (d.hasTouch ? "touchend" : "mouseup"),
              out: (d.hasTouch ? "touchcancel" : "mouseout")
            };
            return l[m]
          },
          page: function (l, m) {
            return (d.hasTouch && m.touches.length && m.touches[0]) ? m.touches[0]["page" + l] : m["page" + l]
          },
          klass: {
            has: function (m, l) {
              return (m.className).indexOf(l) !== -1
            },
            add: function (m, l) {
              if (!d.klass.has(m, l) && f.addBodyClasses) {
                m.className += " " + l
              }
            },
            remove: function (m, l) {
              if (f.addBodyClasses) {
                m.className = (m.className).replace(l, "").replace(/^\s+|\s+$/g, "")
              }
            }
          },
          dispatchEvent: function (l) {
            if (typeof h[l] === "function") {
              return h[l].call()
            }
          },
          vendor: function () {
            var m = b.createElement("div"),
              n = "webkit Moz O ms".split(" "),
              l;
            for (l in n) {
              if (typeof m.style[n[l] + "Transition"] !== "undefined") {
                return n[l]
              }
            }
          },
          transitionCallback: function () {
            return (e.vendor === "Moz" || e.vendor === "ms") ? "transitionend" : e.vendor + "TransitionEnd"
          },
          canTransform: function () {
            return typeof f.element.style[e.vendor + "Transform"] !== "undefined"
          },
          deepExtend: function (l, n) {
            var m;
            for (m in n) {
              if (n[m] && n[m].constructor && n[m].constructor === Object) {
                l[m] = l[m] || {};
                d.deepExtend(l[m], n[m])
              } else {
                l[m] = n[m]
              }
            }
            return l
          },
          angleOfDrag: function (l, o) {
            var n, m;
            m = Math.atan2(-(e.startDragY - o), (e.startDragX - l));
            if (m < 0) {
              m += 2 * Math.PI
            }
            n = Math.floor(m * (180 / Math.PI) - 180);
            if (n < 0 && n > -180) {
              n = 360 - Math.abs(n)
            }
            return Math.abs(n)
          },
          events: {
            addEvent: function g(m, l, n) {
              if (m.addEventListener) {
                return m.addEventListener(l, n, false)
              } else {
                if (m.attachEvent) {
                  return m.attachEvent("on" + l, n)
                }
              }
            },
            removeEvent: function g(m, l, n) {
              if (m.addEventListener) {
                return m.removeEventListener(l, n, false)
              } else {
                if (m.attachEvent) {
                  return m.detachEvent("on" + l, n)
                }
              }
            },
            prevent: function (l) {
              if (l.preventDefault) {
                l.preventDefault()
              } else {
                l.returnValue = false
              }
            }
          },
          parentUntil: function (n, l) {
            var m = typeof l === "string";
            while (n.parentNode) {
              if (m && n.getAttribute && n.getAttribute(l)) {
                return n
              } else {
                if (!m && n === l) {
                  return n
                }
              }
              n = n.parentNode
            }
            return null
          }
        }, i = {
          translate: {
            get: {
              matrix: function (n) {
                if (!d.canTransform()) {
                  return parseInt(f.element.style.left, 10)
                } else {
                  var m = c.getComputedStyle(f.element)[e.vendor + "Transform"].match(/\((.*)\)/),
                    l = 8;
                  if (m) {
                    m = m[1].split(",");
                    if (m.length === 16) {
                      n += l
                    }
                    return parseInt(m[n], 10)
                  }
                  return 0
                }
              }
            },
            easeCallback: function () {
              f.element.style[e.vendor + "Transition"] = "";
              e.translation = i.translate.get.matrix(4);
              e.easing = false;
              clearInterval(e.animatingInterval);
              if (e.easingTo === 0) {
                d.klass.remove(b.body, "snapjs-right");
                d.klass.remove(b.body, "snapjs-left")
              }
              d.dispatchEvent("animated");
              d.events.removeEvent(f.element, d.transitionCallback(), i.translate.easeCallback)
            },
            easeTo: function (l) {
              if (!d.canTransform()) {
                e.translation = l;
                i.translate.x(l)
              } else {
                e.easing = true;
                e.easingTo = l;
                f.element.style[e.vendor + "Transition"] = "all " + f.transitionSpeed + "s " + f.easing;
                e.animatingInterval = setInterval(function () {
                  d.dispatchEvent("animating")
                }, 1);
                d.events.addEvent(f.element, d.transitionCallback(), i.translate.easeCallback);
                i.translate.x(l)
              } if (l === 0) {
                f.element.style[e.vendor + "Transform"] = ""
              }
            },
            x: function (m) {
              if ((f.disable === "left" && m > 0) || (f.disable === "right" && m < 0)) {
                return
              }
              if (!f.hyperextensible) {
                if (m === f.maxPosition || m > f.maxPosition) {
                  m = f.maxPosition
                } else {
                  if (m === f.minPosition || m < f.minPosition) {
                    m = f.minPosition
                  }
                }
              }
              m = parseInt(m, 10);
              if (isNaN(m)) {
                m = 0
              }
              if (d.canTransform()) {
                var l = "translate3d(" + m + "px, 0,0)";
                f.element.style[e.vendor + "Transform"] = l
              } else {
                f.element.style.width = (c.innerWidth || b.documentElement.clientWidth) + "px";
                f.element.style.left = m + "px";
                f.element.style.right = ""
              }
            }
          },
          drag: {
            listen: function () {
              e.translation = 0;
              e.easing = false;
              d.events.addEvent(f.element, d.eventType("down"), i.drag.startDrag);
              d.events.addEvent(f.element, d.eventType("move"), i.drag.dragging);
              d.events.addEvent(f.element, d.eventType("up"), i.drag.endDrag)
            },
            stopListening: function () {
              d.events.removeEvent(f.element, d.eventType("down"), i.drag.startDrag);
              d.events.removeEvent(f.element, d.eventType("move"), i.drag.dragging);
              d.events.removeEvent(f.element, d.eventType("up"), i.drag.endDrag)
            },
            startDrag: function (n) {
              var m = n.target ? n.target : n.srcElement,
                l = d.parentUntil(m, "data-snap-ignore");
              if (l) {
                d.dispatchEvent("ignore");
                return
              }
              if (f.dragger) {
                var o = d.parentUntil(m, f.dragger);
                if (!o && (e.translation !== f.minPosition && e.translation !== f.maxPosition)) {
                  return
                }
              }
              d.dispatchEvent("start");
              f.element.style[e.vendor + "Transition"] = "";
              e.isDragging = true;
              e.hasIntent = null;
              e.intentChecked = false;
              e.startDragX = d.page("X", n);
              e.startDragY = d.page("Y", n);
              e.dragWatchers = {
                current: 0,
                last: 0,
                hold: 0,
                state: ""
              };
              e.simpleStates = {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                  absolute: 0,
                  relative: 0,
                  sinceDirectionChange: 0,
                  percentage: 0
                }
              }
            },
            dragging: function (s) {
              if (e.isDragging && f.touchToDrag) {
                var v = d.page("X", s),
                  u = d.page("Y", s),
                  t = e.translation,
                  o = i.translate.get.matrix(4),
                  n = v - e.startDragX,
                  p = o > 0,
                  q = n,
                  w;
                if ((e.intentChecked && !e.hasIntent)) {
                  return
                }
                if (f.addBodyClasses) {
                  if ((o) > 0) {
                    d.klass.add(b.body, "snapjs-left");
                    d.klass.remove(b.body, "snapjs-right")
                  } else {
                    if ((o) < 0) {
                      d.klass.add(b.body, "snapjs-right");
                      d.klass.remove(b.body, "snapjs-left")
                    }
                  }
                }
                if (e.hasIntent === false || e.hasIntent === null) {
                  var m = d.angleOfDrag(v, u),
                    l = (m >= 0 && m <= f.slideIntent) || (m <= 360 && m > (360 - f.slideIntent)),
                    r = (m >= 180 && m <= (180 + f.slideIntent)) || (m <= 180 && m >= (180 - f.slideIntent));
                  if (!r && !l) {
                    e.hasIntent = false
                  } else {
                    e.hasIntent = true
                  }
                  e.intentChecked = true
                }
                if ((f.minDragDistance >= Math.abs(v - e.startDragX)) || (e.hasIntent === false)) {
                  return
                }
                d.events.prevent(s);
                d.dispatchEvent("drag");
                e.dragWatchers.current = v;
                if (e.dragWatchers.last > v) {
                  if (e.dragWatchers.state !== "left") {
                    e.dragWatchers.state = "left";
                    e.dragWatchers.hold = v
                  }
                  e.dragWatchers.last = v
                } else {
                  if (e.dragWatchers.last < v) {
                    if (e.dragWatchers.state !== "right") {
                      e.dragWatchers.state = "right";
                      e.dragWatchers.hold = v
                    }
                    e.dragWatchers.last = v
                  }
                } if (p) {
                  if (f.maxPosition < o) {
                    w = (o - f.maxPosition) * f.resistance;
                    q = n - w
                  }
                  e.simpleStates = {
                    opening: "left",
                    towards: e.dragWatchers.state,
                    hyperExtending: f.maxPosition < o,
                    halfway: o > (f.maxPosition / 2),
                    flick: Math.abs(e.dragWatchers.current - e.dragWatchers.hold) > f.flickThreshold,
                    translation: {
                      absolute: o,
                      relative: n,
                      sinceDirectionChange: (e.dragWatchers.current - e.dragWatchers.hold),
                      percentage: (o / f.maxPosition) * 100
                    }
                  }
                } else {
                  if (f.minPosition > o) {
                    w = (o - f.minPosition) * f.resistance;
                    q = n - w
                  }
                  e.simpleStates = {
                    opening: "right",
                    towards: e.dragWatchers.state,
                    hyperExtending: f.minPosition > o,
                    halfway: o < (f.minPosition / 2),
                    flick: Math.abs(e.dragWatchers.current - e.dragWatchers.hold) > f.flickThreshold,
                    translation: {
                      absolute: o,
                      relative: n,
                      sinceDirectionChange: (e.dragWatchers.current - e.dragWatchers.hold),
                      percentage: (o / f.minPosition) * 100
                    }
                  }
                }
                i.translate.x(q + t)
              }
            },
            endDrag: function (m) {
              if (e.isDragging) {
                d.dispatchEvent("end");
                var l = i.translate.get.matrix(4);
                if (e.dragWatchers.current === 0 && l !== 0 && f.tapToClose) {
                  d.dispatchEvent("close");
                  d.events.prevent(m);
                  i.translate.easeTo(0);
                  e.isDragging = false;
                  e.startDragX = 0;
                  return
                }
                if (e.simpleStates.opening === "left") {
                  if ((e.simpleStates.halfway || e.simpleStates.hyperExtending || e.simpleStates.flick)) {
                    if (e.simpleStates.flick && e.simpleStates.towards === "left") {
                      i.translate.easeTo(0)
                    } else {
                      if ((e.simpleStates.flick && e.simpleStates.towards === "right") || (e.simpleStates.halfway || e.simpleStates.hyperExtending)) {
                        i.translate.easeTo(f.maxPosition)
                      }
                    }
                  } else {
                    i.translate.easeTo(0)
                  }
                } else {
                  if (e.simpleStates.opening === "right") {
                    if ((e.simpleStates.halfway || e.simpleStates.hyperExtending || e.simpleStates.flick)) {
                      if (e.simpleStates.flick && e.simpleStates.towards === "right") {
                        i.translate.easeTo(0)
                      } else {
                        if ((e.simpleStates.flick && e.simpleStates.towards === "left") || (e.simpleStates.halfway || e.simpleStates.hyperExtending)) {
                          i.translate.easeTo(f.minPosition)
                        }
                      }
                    } else {
                      i.translate.easeTo(0)
                    }
                  }
                }
                e.isDragging = false;
                e.startDragX = d.page("X", m)
              }
            }
          }
        }, j = function (l) {
          if (l.element) {
            d.deepExtend(f, l);
            e.vendor = d.vendor();
            i.drag.listen()
          }
        };
      this.open = function (l) {
        d.dispatchEvent("open");
        d.klass.remove(b.body, "snapjs-expand-left");
        d.klass.remove(b.body, "snapjs-expand-right");
        if (l === "left") {
          e.simpleStates.opening = "left";
          e.simpleStates.towards = "right";
          d.klass.add(b.body, "snapjs-left");
          d.klass.remove(b.body, "snapjs-right");
          i.translate.easeTo(f.maxPosition)
        } else {
          if (l === "right") {
            e.simpleStates.opening = "right";
            e.simpleStates.towards = "left";
            d.klass.remove(b.body, "snapjs-left");
            d.klass.add(b.body, "snapjs-right");
            i.translate.easeTo(f.minPosition)
          }
        }
      };
      this.close = function () {
        d.dispatchEvent("close");
        i.translate.easeTo(0)
      };
      this.expand = function (l) {
        var m = c.innerWidth || b.documentElement.clientWidth;
        if (l === "left") {
          d.dispatchEvent("expandLeft");
          d.klass.add(b.body, "snapjs-expand-left");
          d.klass.remove(b.body, "snapjs-expand-right")
        } else {
          d.dispatchEvent("expandRight");
          d.klass.add(b.body, "snapjs-expand-right");
          d.klass.remove(b.body, "snapjs-expand-left");
          m *= -1
        }
        i.translate.easeTo(m)
      };
      this.on = function (l, m) {
        h[l] = m;
        return this
      };
      this.off = function (l) {
        if (h[l]) {
          h[l] = false
        }
      };
      this.enable = function () {
        d.dispatchEvent("enable");
        i.drag.listen()
      };
      this.disable = function () {
        d.dispatchEvent("disable");
        i.drag.stopListening()
      };
      this.settings = function (l) {
        d.deepExtend(f, l)
      };
      this.state = function () {
        var l, m = i.translate.get.matrix(4);
        if (m === f.maxPosition) {
          l = "left"
        } else {
          if (m === f.minPosition) {
            l = "right"
          } else {
            l = "closed"
          }
        }
        return {
          state: l,
          info: e.simpleStates
        }
      };
      j(k)
    };
  if ((typeof module !== "undefined") && module.exports) {
    module.exports = a
  }
  if (typeof ender === "undefined") {
    this.Snap = a
  }
  if ((typeof define === "function") && define.amd) {
    define("snap", [], function () {
      return a
    })
  }
}).call(this, window, document); + function ($) {
  var Tab = function (element) {
    this.element = $(element)
  };
  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest("ul:not(.dropdown-menu)");
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
    }
    if ($this.parent("li").hasClass("active")) {
      return
    }
    var previous = $ul.find(".active:last a")[0];
    var e = $.Event("show.bs.tab", {
      relatedTarget: previous
    });
    $this.trigger(e);
    if (e.isDefaultPrevented()) {
      return
    }
    var $target = $(selector);
    this.activate($this.parent("li"), $ul);
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: "shown.bs.tab",
        relatedTarget: previous
      })
    })
  };
  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find("> .active");
    var transition = callback && $.support.transition && $active.hasClass("fade");

    function next() {
      $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
      element.addClass("active");
      if (transition) {
        element[0].offsetWidth;
        element.addClass("in")
      } else {
        element.removeClass("fade")
      } if (element.parent(".dropdown-menu")) {
        element.closest("li.dropdown").addClass("active")
      }
      callback && callback()
    }
    transition ? $active.one($.support.transition.end, next) : next();
    $active.removeClass("in")
  };
  var old = $.fn.tab;
  $.fn.tab = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tab");
      if (!data) {
        $this.data("bs.tab", (data = new Tab(this)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.tab.Constructor = Tab;
  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this
  };
  $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault();
    $(this).tab("show")
  })
}(window.jQuery); + function ($) {
  var Tooltip = function (element, options) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
    this.init("tooltip", element, options)
  };
  Tooltip.DEFAULTS = {
    animation: true,
    placement: "top",
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    container: false
  };
  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    var triggers = this.options.trigger.split(" ");
    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];
      if (trigger == "click") {
        this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else {
        if (trigger != "manual") {
          var eventIn = trigger == "hover" ? "mouseenter" : "focus";
          var eventOut = trigger == "hover" ? "mouseleave" : "blur";
          this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
          this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }
    }
    this.options.selector ? (this._options = $.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    })) : this.fixTitle()
  };
  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  };
  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);
    if (options.delay && typeof options.delay == "number") {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }
    return options
  };
  Tooltip.prototype.enter = function (obj) {
    var defaults = this.getDefaults();
    var options = {};
    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) {
        options[key] = value
      }
    });
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](options).data("bs." + this.type);
    if (!self.options.delay || !self.options.delay.show) {
      return self.show()
    }
    clearTimeout(this.timeout);
    self.hoverState = "in";
    this.timeout = setTimeout(function () {
      if (self.hoverState == "in") {
        self.show()
      }
    }, self.options.delay.show)
  };
  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this._options).data("bs." + this.type);
    clearTimeout(this.timeout);
    if (!self.options.delay || !self.options.delay.hide) {
      return self.hide()
    }
    self.hoverState = "out";
    this.timeout = setTimeout(function () {
      if (self.hoverState == "out") {
        self.hide()
      }
    }, self.options.delay.hide)
  };
  Tooltip.prototype.show = function () {
    var e = $.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) {
        return
      }
      var $tip = this.tip();
      this.setContent();
      if (this.options.animation) {
        $tip.addClass("fade")
      }
      var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      $tip.detach().css({
        top: 0,
        left: 0,
        display: "block"
      });
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      var tp;
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;
      switch (placement) {
      case "bottom":
        tp = {
          top: pos.top + pos.height,
          left: pos.left + pos.width / 2 - actualWidth / 2
        };
        break;
      case "top":
        tp = {
          top: pos.top - actualHeight,
          left: pos.left + pos.width / 2 - actualWidth / 2
        };
        break;
      case "left":
        tp = {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left - actualWidth
        };
        break;
      case "right":
        tp = {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left + pos.width
        };
        break
      }
      this.applyPlacement(tp, placement);
      this.$element.trigger("shown.bs." + this.type)
    }
  };
  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace;
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;
    $tip.offset(offset).addClass(placement).addClass("in");
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if (placement == "top" && actualHeight != height) {
      replace = true;
      offset.top = offset.top + height - actualHeight
    }
    if (placement == "bottom" || placement == "top") {
      var delta = 0;
      if (offset.left < 0) {
        delta = offset.left * -2;
        offset.left = 0;
        $tip.offset(offset);
        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight
      }
      this.replaceArrow(delta - width + actualWidth, actualWidth, "left")
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, "top")
    } if (replace) {
      $tip.offset(offset)
    }
  };
  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : "")
  };
  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right")
  };
  Tooltip.prototype.hide = function () {
    var that = this;
    var $tip = this.tip();
    var e = $.Event("hide.bs." + this.type);
    this.$element.trigger(e);
    if (e.isDefaultPrevented()) {
      return
    }
    $tip.removeClass("in");

    function removeWithAnimation() {
      var timeout = setTimeout(function () {
        $tip.off($.support.transition.end).detach()
      }, 500);
      $tip.one($.support.transition.end, function () {
        clearTimeout(timeout);
        $tip.detach()
      })
    }
    $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.detach();
    this.$element.trigger("hidden.bs." + this.type);
    return this
  };
  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr("title") || typeof ($e.attr("data-original-title")) != "string") {
      $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
    }
  };
  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  };
  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0];
    return $.extend({}, (typeof el.getBoundingClientRect == "function") ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  };
  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;
    title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
    return title
  };
  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  };
  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  };
  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null
    }
  };
  Tooltip.prototype.enable = function () {
    this.enabled = true
  };
  Tooltip.prototype.disable = function () {
    this.enabled = false
  };
  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  };
  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this._options).data("bs." + this.type) : this;
    self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
  };
  Tooltip.prototype.destroy = function () {
    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var old = $.fn.tooltip;
  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tooltip");
      var options = typeof option == "object" && option;
      if (!data) {
        $this.data("bs.tooltip", (data = new Tooltip(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.tooltip.Constructor = Tooltip;
  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this
  }
}(window.jQuery); + function ($) {
  function transitionEnd() {
    var el = document.createElement("bootstrap");
    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        }
      }
    }
  }
  $(function () {
    $.support.transition = transitionEnd()
  })
}(window.jQuery); + function ($) {
  var Popover = function (element, options) {
    this.init("popover", element, options)
  };
  if (!$.fn.tooltip) {
    throw new Error("Popover requires tooltip.js")
  }
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;
  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  };
  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip.find(".popover-content")[this.options.html ? "html" : "text"](content);
    $tip.removeClass("fade top bottom left right in");
    if (!$tip.find(".popover-title").html()) {
      $tip.find(".popover-title").hide()
    }
  };
  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  };
  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;
    return $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content)
  };
  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  Popover.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
    }
    return this.$tip
  };
  var old = $.fn.popover;
  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.popover");
      var options = typeof option == "object" && option;
      if (!data) {
        $this.data("bs.popover", (data = new Popover(this, options)))
      }
      if (typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.popover.Constructor = Popover;
  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this
  }
}(window.jQuery);
$(document).ready(function () {
  if ($(".editor-page").length) {
    prettyPrint();
    new Medium({
      element: document.getElementById("post_title"),
      mode: "inline",
      maxLength: 50,
      placeholder: "Type your title"
    });
    new Medium({
      element: document.getElementById("post_content"),
      mode: "inline",
      maxLength: 250,
      placeholder: "Type a description (optional)"
    });

    function getSelectedNode() {
      if (document.selection) {
        return document.selection.createRange().parentElement()
      } else {
        var selection = window.getSelection();
        if ($(selection.getRangeAt(0).startContainer).text() == "") {
          return selection.getRangeAt(0).startContainer
        }
        if (selection.rangeCount > 0) {
          return selection.getRangeAt(0).startContainer.parentNode
        }
      }
    }

    function saveSelection() {
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          var ranges = [];
          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i))
          }
          return ranges
        }
      } else {
        if (document.selection && document.selection.createRange) {
          return document.selection.createRange()
        }
      }
      return null
    }

    function restoreSelection(savedSel) {
      if (savedSel) {
        if (window.getSelection) {
          sel = window.getSelection();
          sel.removeAllRanges();
          for (var i = 0, len = savedSel.length; i < len; ++i) {
            sel.addRange(savedSel[i])
          }
        } else {
          if (document.selection && savedSel.select) {
            savedSel.select()
          }
        }
      }
    }
    $("#save-draft").click(function () {
      saveDraft()
    });
    $("#publish-draft").click(function () {
      publishDraft()
    });
    $("#text-opts button").click(function () {
      xclass = getSelectedNode();
      if ($(xclass).parent().attr("id") == "editor-content") {
        if ($(xclass).closest("#editor-content").length <= 0 || $(xclass).attr("id") == "editor-content") {} else {
          finalElem = xclass
        }
      } else {
        $(xclass).parents().each(function () {
          if ($(this).attr("id") == "editor-content") {
            finalstore = tempstore
          }
          tempstore = this
        });
        if (typeof finalstore !== "undefined") {
          finalElem = finalstore
        }
      } if ($(finalElem).hasClass($(this).attr("id"))) {
        $(finalElem).removeClass($(this).attr("id"))
      } else {
        $(finalElem).removeClass("style-h1 style-h2 style-h3");
        $(finalElem).addClass($(this).attr("id"))
      }
    });
    $("#style-check").click(function () {
      xclass = getSelectedNode();
      if ($(xclass).parent().attr("id") == "editor-content") {
        if ($(xclass).closest("#editor-content").length <= 0 || $(xclass).attr("id") == "editor-content") {} else {
          finalElem = xclass
        }
      } else {
        $(xclass).parents().each(function () {
          if ($(this).attr("id") == "editor-content") {
            finalstore = tempstore
          }
          tempstore = this
        });
        if (typeof finalstore !== "undefined") {
          finalElem = finalstore
        }
      } if ($(finalElem).hasClass("completable")) {
        $(finalElem).removeClass("completable");
        console.log("removed")
      } else {
        $(finalElem).addClass("completable");
        console.log("added")
      }
    });
    $("#font-opts button").click(function () {
      if ($(this).attr("id") == "style-bold") {
        document.execCommand("bold")
      } else {
        if ($(this).attr("id") == "style-italic") {
          document.execCommand("italic")
        }
      }
    });
    $("#style-link").popover({
      placement: "bottom",
      trigger: "click",
      animation: false,
      content: '<input id="urlfocus" type="text" style="width:250px" placeholder="enter url" />',
      html: true
    }).on("show.bs.popover", function () {
      selectionrange = saveSelection()
    }).on("shown.bs.popover", function () {
      $("#urlfocus").focus();
      $("#urlfocus").on("keyup", function (e) {
        if (e.which == 13) {
          restoreSelection(selectionrange);
          urlgo = $("#urlfocus").val();
          if (urlgo.indexOf("http") !== 0) {
            urlgo = "http://" + urlgo
          }
          document.execCommand("CreateLink", false, urlgo);
          $("#style-link").popover("hide");
          startToolTips()
        }
      })
    });
    $("#code-edit").on("show.bs.modal", function () {
      selectionrange2 = saveSelection()
    }).on("shown.bs.modal", function () {
      $("#code-code").focus()
    });
    $("#code-submit").click(function () {
      var filename = $("#code-file-name").val();
      filename = $("<div/>").text(filename).html();
      var linenum = $("#code-line-num").val();
      var codee = $("#code-code").val();
      codee = $("<div/>").text(codee).html();
      if (!isNaN(linenum)) {
        linenum = "linenums:" + linenum
      } else {
        linenum = ""
      } if (filename != "") {
        filename = '<div class="filename">' + filename + "</div>"
      }
      restoreSelection(selectionrange2);
      node1 = getSelectedNode();
      $(node1).replaceWith("<div id='tmprm'></div>");
      $("#tmprm").html('<div class="con-wrap code">' + filename + '<pre class="prettyprint ' + linenum + '">' + codee + '</pre><textarea class="code-txt" style="display:none">' + $("#code-code").val() + '</textarea><textarea class="filename-txt" style="display:none">' + $("#code-file-name").val() + '</textarea><textarea class="linenum-txt" style="display:none">' + $("#code-line-num").val() + "</textarea></div>");
      $("#tmprm").attr("contenteditable", "false").addClass("code-unit").attr("id", "").after("<p>Add code description here (opt)</p>");
      prettyPrint();
      $("#code-edit input, #code-edit textarea").val("");
      $("#code-edit").modal("hide");
      placeholderInit()
    });
    $("#video-edit").on("show.bs.modal", function () {
      selectionrange2 = saveSelection()
    }).on("shown.bs.modal", function () {
      $("#vid-link").focus()
    });
    $("#vid-submit").click(function () {
      var vidlink = $("#vid-link").val();
      var video_id = vidlink.split("v=")[1];
      var ampersandPosition = video_id.indexOf("&");
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition)
      }
      restoreSelection(selectionrange2);
      node1 = getSelectedNode();
      $(node1).replaceWith("<div id='tmprm'></div>");
      $("#tmprm").html('<div class="con-wrap video"><iframe class="fit-vid" src="//www.youtube.com/embed/' + video_id + '?wmode=transparent" frameborder="0" allowfullscreen=""></iframe><textarea style="display:none">' + video_id + "</textarea></div>");
      $("#tmprm").attr("contenteditable", "false").addClass("video-unit").attr("id", "").after("<p>Add video description here (opt)</p>");
      $("#video-edit input, #video-edit textarea").val("");
      $("#video-edit").modal("hide");
      placeholderInit()
    });

    function startToolTips() {
      $("#editor-content a").hover(function () {
        $(this).tooltip({
          placement: "top",
          trigger: "manual",
          animation: true,
          title: $(this).attr("href")
        }).tooltip("show")
      }, function () {
        $(this).tooltip("destroy")
      })
    }
    startToolTips();
    $("#editor-content").focus(function () {
      current = this
    });

    function placeholderInit() {
      checktxt = $("#editor-content").text().replace(/(\n[\t ]*){2,}\n/gm, "").replace(/\s/g, "");
      if (checktxt == "" || checktxt == "Typeyourpost") {
        $("#editor-content").html("<p></p>");
        $("#edit-pane").contents().focus();
        $("#editor-content").contents().focus();
        $("#editor-content").prepend('<p class="p-placeholder" contenteditable="false">Type your post</p>')
      } else {
        if ($(".p-placeholder").length) {
          $(".p-placeholder").remove();
          console.log("removed placeholder")
        }
      }
    }
    $("#editor-content").on("keyup", function (e) {
      xclass = getSelectedNode();
      placeholderInit();
      if (typeof finalstore !== "undefined") {}
      if (e.which == 13) {
        $(xclass).attr("id", "");
        $(xclass).attr("class", "")
      }
      if ($(xclass).hasClass("selectered")) {
        console.log("nothing done")
      } else {
        if ($(xclass).parent().attr("id") == "editor-content") {
          if ($(xclass).closest("#editor-content").length <= 0 || $(xclass).attr("id") == "editor-content") {} else {}
        } else {
          $(xclass).parents().each(function () {
            if ($(this).attr("id") == "editor-content") {
              finalstore = tempstore
            }
            tempstore = this
          });
          if (typeof finalstore !== "undefined") {}
        }
      }
    })
  }
});

function getPDiD(propID) {
  if (typeof pd_id !== "undefined" && pd_id !== null) {} else {
    pd_id = propID
  }
  return pd_id
}

function saveDraft() {
  $(".btns-show").hide();
  $(".btns-load").show();
  finaldata = serializePick();
  $.ajax({
    url: "/drafts",
    type: "post",
    data: JSON.stringify(finaldata),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      getPDiD(data.pick_id);
      $("#editor-content").html(data.html);
      $(".btns-show").show();
      $(".btns-load").hide();
      prettyPrint()
    }
  })
}

function publishDraft() {
  $(".btns-show").hide();
  $(".btns-load").show();
  finaldata = serializePick();
  $.ajax({
    url: "/publish",
    type: "post",
    data: JSON.stringify(finaldata),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      window.location = "/pick/" + data.pick_id
    }
  })
}

function serializePick() {
  items = [];
  $("#editor-content").children().each(function (index, Element) {
    var contype, finishable, opts;
    if ($(this).hasClass("style-h1")) {
      contype = 1;
      content = $(this).html()
    } else {
      if ($(this).hasClass("style-h2")) {
        contype = 2;
        content = $(this).html()
      } else {
        if ($(this).hasClass("style-h3")) {
          contype = 3;
          content = $(this).html()
        } else {
          if ($(this).hasClass("code-unit")) {
            contype = 8;
            content = $(this).find(".code-txt").val();
            opts = {
              filename: $(this).find(".filename-txt").val(),
              linenum: $(this).find(".linenum-txt").val()
            }
          } else {
            if ($(this).hasClass("video-unit")) {
              contype = 9;
              content = $(this).find("textarea").val()
            } else {
              contype = 7;
              content = $(this).html()
            }
          }
        }
      }
    } if ($(this).hasClass("completable")) {
      finishable = true
    } else {
      finishable = false
    } if ($(this).attr("id") === "" || $(this).attr("id") === undefined) {
      itemid = undefined
    } else {
      itemid = $(this).attr("id")
    }
    items.push({
      _id: itemid,
      type: contype,
      content: content,
      order_index: (index + 1),
      options: opts,
      finishable: finishable
    })
  });
  finaldata = {
    draft: {
      pick_id: getPDiD(null),
      title: $("#post_title").text(),
      items: items,
      content: $("#post_content").text()
    }
  };
  return finaldata
}
$(document).ready(function () {
  $.cookie.json = true;
  $(".dome").addClass("animated rollIn");
  mixpanel.track("Page view", {
    pageLoc: [location.host, location.pathname].join("")
  });
  if ($.cookie("user_info")) {
    mixpanel.identify($.cookie("user_info")["email"]);
    mixpanel.name_tag($.cookie("user_info")["email"])
  } else {
    if ($.cookie("reg")) {
      mixpanel.alias($.cookie("reg")["email"]);
      mixpanel.name_tag($.cookie("reg")["email"]);
      mixpanel.track("Signed up");
      $.cookie("user_info", $.cookie("reg"), {
        expires: 365,
        path: "/"
      });
      $.removeCookie("reg")
    } else {
      if ($.cookie("sesh")) {
        mixpanel.identify($.cookie("sesh")["email"]);
        mixpanel.name_tag($.cookie("sesh")["email"]);
        mixpanel.track("Logged in");
        $.cookie("user_info", $.cookie("sesh"), {
          expires: 365,
          path: "/"
        });
        $.removeCookie("sesh")
      }
    }
  } if (getParameterByName("ref") != "") {
    mixpanel.register({
      refsrc: getParameterByName("ref")
    })
  }
  if ($(".pick-page").length) {
    if (user_loggedin) {
      $(".sub-wrapper").hide()
    }
    if ($(".codeblock").length < 15) {
      $(".codeblock-load").remove();
      $(".codeblock").addClass("prettyprint");
      $(".codeblock").css({
        opacity: 1
      });
      prettyPrint()
    }
    if ($.cookie("id-load-once")) {} else {
      setTimeout("$('.sub-wrapper').addClass('animated wobble')", 2000)
    }
    $("body").scrollspy({
      target: ".bs-sidebar"
    });
    $(".pick-content a").click(function () {
      if ($(this).attr("href").indexOf("gum") != -1) {
        mixpanel.track("Clicked out to gumroad", {
          inside_pick: true
        })
      } else {
        window.open($(this).attr("href"));
        mixpanel.track("Clicked content link", {
          targetURL: $(this).attr("href")
        });
        console.log("yah");
        return false
      }
    });
    mixpanel.track_links("#su-mtracker-twt", "Clicked to signup via popdown", {
      authType: "twitter"
    });
    mixpanel.track_links("#su-mtracker-fb", "Clicked to signup via popdown", {
      authType: "facebook"
    });
    mixpanel.track_links("#su-mtracker-em", "Clicked to signup via popdown", {
      authType: "email"
    });
    if ($(".side-float").length > 0) {
      $(".side-float").affix({
        offset: {
          top: $(".side-float").offset().top - 10
        }
      })
    }
    viewed = {};
    $("h1").appear();
    $(document.body).on("appear", "h1", function (e, $affected) {
      $affected.each(function () {
        x = $(this).parent().parent().attr("id");
        if (x != undefined) {
          x = x.replace("item-", "")
        }
        if (viewed[x] != true && x != undefined) {
          mixpanel.track("Viewed section", {
            sectionID: x,
            title: $(this).text().replace(/\s+/g, " ")
          })
        }
        viewed[x] = true
      })
    });
    $(".codeblock").appear();
    $(document.body).on("appear", ".codeblock", function (e, $affected) {
      $affected.each(function () {
        $(this).addClass("prettyprint");
        $(this).parent().find(".codeblock-load").remove();
        prettyPrint();
        $(this).animate({
          opacity: 1
        }, 100)
      })
    });
    $(document.body).on("disappear", ".codeblock", function (e, $affected) {
      $affected.each(function () {})
    });
    $(".cbox-trigger").click(function () {
      if ($(this).hasClass("completed")) {
        pushCheck(false, $(this).data("cbid"))
      } else {
        pushCheck(true, $(this).data("cbid"))
      }
    });

    function calcProgBar(comp, total) {
      perc = comp / total * 100;
      $(".progress-bar").width(perc + "%")
    }
    $(".progress").tooltip({
      title: "This bar shows the % of items you've completed",
      trigger: "hover",
      placement: "top"
    });

// FOUND THE EFFING PROGRESS BAR RESET!!!

//     function pushCheck(isCompleted, cbid, overideXHR) {
//       if (isCompleted) {
//         $(".sidebar-icon.cbid-" + cbid).removeClass("wic-check-empty").addClass("wic-check");
//         $(".task-box.cbid-" + cbid).addClass("completed");
//         if (!overideXHR) {
//           $(".task-box.cbid-" + cbid).find(".mark").addClass("animated bounceIn")
//         }
//       } else {
//         $(".sidebar-icon.cbid-" + cbid).removeClass("wic-check").addClass("wic-check-empty");
//         $(".task-box.cbid-" + cbid).removeClass("completed");
//         if (!overideXHR) {
//           $(".task-box.cbid-" + cbid).find(".mark").removeClass("animated bounceIn")
//         }
//       } if (user_loggedin && !overideXHR) {
//         if (isCompleted) {
//           $.ajax({
//             url: "/pick/" + pick_id + "/item/" + cbid + "/finish",
//             type: "POST",
//             data: "success=true",
//             success: function (data) {},
//             error: function (xhr, err) {}
//           })
//         } else {
//           $.ajax({
//             url: "/pick/" + pick_id + "/item/" + cbid + "/finish",
//             type: "DELETE",
//             data: "success=true",
//             success: function (data) {},
//             error: function (xhr, err) {}
//           })
//         }
//       } else {
//         if ($.cookie("checkboxd")) {
//           myarr = $.cookie("checkboxd");
//           myarr[cbid] = isCompleted
//         } else {
//           myarr = {};
//           myarr[cbid] = isCompleted
//         } if (!$.cookie("plz-signup") && !overideXHR) {
//           $(".c-alert").show().addClass("animated bounceInDown")
//         }
//         $.cookie("checkboxd", myarr, {
//           expires: 365,
//           path: "/"
//         })
//       }
//       mixpanel.track("Completed item", {
//         itemID: cbid,
//         completed: isCompleted,
//         title: $("#item-" + cbid + " .content-wrapper").text().replace(/\s+/g, " ")
//       });
//       if (!overideXHR) {
//         calcProgBar($(".completed").length, totalitems)
//       }
//       if ($("#firstshow").length) {
//         $(".task-box").first().tooltip("destroy")
//       }
//     }
//     if (!user_loggedin && $.cookie("checkboxd")) {
//       tempcopy = $.cookie("checkboxd");
//       comps = 0;
//       for (var key in tempcopy) {
//         if (tempcopy[key] == true) {
//           pushCheck(true, key, true);
//           comps++
//         }
//       }
//       total_complete = comps
//     }
//     if (!$.cookie("checkboxd")) {
//       total_complete = 0
//     }
//     if (user_loggedin) {
//       tempcopy = completed_items;
//       for (var key in tempcopy) {
//         pushCheck(true, tempcopy[key], true)
//       }
//       total_complete = completed_items.length
//     }
//     calcProgBar(total_complete, totalitems);
//     if (total_complete == 0) {
//       setTimeout(function () {
//         $(".task-box").first().tooltip({
//           title: "<div id='firstshow' style='width:150px'>Check these boxes to keep track of your progress</div>",
//           trigger: "manual",
//           placement: "top",
//           html: true
//         }).tooltip("show")
//       }, 1000)
//     }
//     $("a[href*=#]").click(function () {
//       if ($.attr(this, "href") != "#") {
//         $("html, body").animate({
//           scrollTop: $($.attr(this, "href")).offset().top - 10
//         }, 200);
//         location.hash = $.attr(this, "href");
//         if ($(this).closest(".toc_wrapper").length > 0) {
//           snapper.close()
//         }
//         return false
//       }
//     })
  }
});
$(document).ready(function () {
  if ($(".profile-page").length) {
    if ($.cookie("id-load-once")) {} else {
      setTimeout("$('.sub-wrapper').addClass('animated bounce')", 1500)
    }
  }
});
$(document).ready(function () {
  $(".dropdown-menu.disable-dd-click").click(function (event) {
    event.stopPropagation()
  })
});

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}
window.mobilecheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      check = true
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check
};