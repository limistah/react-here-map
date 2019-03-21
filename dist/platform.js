!(function(e) {
  var t = window.webpackHotUpdate;
  window.webpackHotUpdate = function(e, n) {
    !(function(e, t) {
      if (!j[e] || !g[e]) return;
      for (var n in ((g[e] = !1), t))
        Object.prototype.hasOwnProperty.call(t, n) && (y[n] = t[n]);
      0 == --b && 0 === _ && S();
    })(e, n),
      t && t(e, n);
  };
  var n,
    r = !0,
    o = "1bc3255ebd64c61f3bc0",
    i = 1e4,
    c = {},
    u = [],
    a = [];
  function l(e) {
    var t = x[e];
    if (!t) return A;
    var r = function(r) {
        return (
          t.hot.active
            ? (x[r]
                ? -1 === x[r].parents.indexOf(e) && x[r].parents.push(e)
                : ((u = [e]), (n = r)),
              -1 === t.children.indexOf(r) && t.children.push(r))
            : (console.warn(
                "[HMR] unexpected require(" + r + ") from disposed module " + e
              ),
              (u = [])),
          A(r)
        );
      },
      o = function(e) {
        return {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return A[e];
          },
          set: function(t) {
            A[e] = t;
          }
        };
      };
    for (var i in A)
      Object.prototype.hasOwnProperty.call(A, i) &&
        "e" !== i &&
        "t" !== i &&
        Object.defineProperty(r, i, o(i));
    return (
      (r.e = function(e) {
        return (
          "ready" === p && d("prepare"),
          _++,
          A.e(e).then(t, function(e) {
            throw (t(), e);
          })
        );
        function t() {
          _--, "prepare" === p && (m[e] || E(e), 0 === _ && 0 === b && S());
        }
      }),
      (r.t = function(e, t) {
        return 1 & t && (e = r(e)), A.t(e, -2 & t);
      }),
      r
    );
  }
  function f(e) {
    var t = {
      _acceptedDependencies: {},
      _declinedDependencies: {},
      _selfAccepted: !1,
      _selfDeclined: !1,
      _disposeHandlers: [],
      _main: n !== e,
      active: !0,
      accept: function(e, n) {
        if (void 0 === e) t._selfAccepted = !0;
        else if ("function" == typeof e) t._selfAccepted = e;
        else if ("object" == typeof e)
          for (var r = 0; r < e.length; r++)
            t._acceptedDependencies[e[r]] = n || function() {};
        else t._acceptedDependencies[e] = n || function() {};
      },
      decline: function(e) {
        if (void 0 === e) t._selfDeclined = !0;
        else if ("object" == typeof e)
          for (var n = 0; n < e.length; n++) t._declinedDependencies[e[n]] = !0;
        else t._declinedDependencies[e] = !0;
      },
      dispose: function(e) {
        t._disposeHandlers.push(e);
      },
      addDisposeHandler: function(e) {
        t._disposeHandlers.push(e);
      },
      removeDisposeHandler: function(e) {
        var n = t._disposeHandlers.indexOf(e);
        n >= 0 && t._disposeHandlers.splice(n, 1);
      },
      check: O,
      apply: P,
      status: function(e) {
        if (!e) return p;
        s.push(e);
      },
      addStatusHandler: function(e) {
        s.push(e);
      },
      removeStatusHandler: function(e) {
        var t = s.indexOf(e);
        t >= 0 && s.splice(t, 1);
      },
      data: c[e]
    };
    return (n = void 0), t;
  }
  var s = [],
    p = "idle";
  function d(e) {
    p = e;
    for (var t = 0; t < s.length; t++) s[t].call(null, e);
  }
  var h,
    y,
    v,
    b = 0,
    _ = 0,
    m = {},
    g = {},
    j = {};
  function w(e) {
    return +e + "" === e ? +e : e;
  }
  function O(e) {
    if ("idle" !== p) throw new Error("check() is only allowed in idle status");
    return (
      (r = e),
      d("check"),
      ((t = i),
      (t = t || 1e4),
      new Promise(function(e, n) {
        if ("undefined" == typeof XMLHttpRequest)
          return n(new Error("No browser support"));
        try {
          var r = new XMLHttpRequest(),
            i = A.p + "" + o + ".hot-update.json";
          r.open("GET", i, !0), (r.timeout = t), r.send(null);
        } catch (e) {
          return n(e);
        }
        r.onreadystatechange = function() {
          if (4 === r.readyState)
            if (0 === r.status)
              n(new Error("Manifest request to " + i + " timed out."));
            else if (404 === r.status) e();
            else if (200 !== r.status && 304 !== r.status)
              n(new Error("Manifest request to " + i + " failed."));
            else {
              try {
                var t = JSON.parse(r.responseText);
              } catch (e) {
                return void n(e);
              }
              e(t);
            }
        };
      })).then(function(e) {
        if (!e) return d("idle"), null;
        (g = {}), (m = {}), (j = e.c), (v = e.h), d("prepare");
        var t = new Promise(function(e, t) {
          h = { resolve: e, reject: t };
        });
        y = {};
        return E(10), "prepare" === p && 0 === _ && 0 === b && S(), t;
      })
    );
    var t;
  }
  function E(e) {
    j[e]
      ? ((g[e] = !0),
        b++,
        (function(e) {
          var t = document.createElement("script");
          (t.charset = "utf-8"),
            (t.src = A.p + "" + e + "." + o + ".hot-update.js"),
            document.head.appendChild(t);
        })(e))
      : (m[e] = !0);
  }
  function S() {
    d("ready");
    var e = h;
    if (((h = null), e))
      if (r)
        Promise.resolve()
          .then(function() {
            return P(r);
          })
          .then(
            function(t) {
              e.resolve(t);
            },
            function(t) {
              e.reject(t);
            }
          );
      else {
        var t = [];
        for (var n in y)
          Object.prototype.hasOwnProperty.call(y, n) && t.push(w(n));
        e.resolve(t);
      }
  }
  function P(t) {
    if ("ready" !== p)
      throw new Error("apply() is only allowed in ready status");
    var n, r, i, a, l;
    function f(e) {
      for (
        var t = [e],
          n = {},
          r = t.slice().map(function(e) {
            return { chain: [e], id: e };
          });
        r.length > 0;

      ) {
        var o = r.pop(),
          i = o.id,
          c = o.chain;
        if ((a = x[i]) && !a.hot._selfAccepted) {
          if (a.hot._selfDeclined)
            return { type: "self-declined", chain: c, moduleId: i };
          if (a.hot._main) return { type: "unaccepted", chain: c, moduleId: i };
          for (var u = 0; u < a.parents.length; u++) {
            var l = a.parents[u],
              f = x[l];
            if (f) {
              if (f.hot._declinedDependencies[i])
                return {
                  type: "declined",
                  chain: c.concat([l]),
                  moduleId: i,
                  parentId: l
                };
              -1 === t.indexOf(l) &&
                (f.hot._acceptedDependencies[i]
                  ? (n[l] || (n[l] = []), s(n[l], [i]))
                  : (delete n[l],
                    t.push(l),
                    r.push({ chain: c.concat([l]), id: l })));
            }
          }
        }
      }
      return {
        type: "accepted",
        moduleId: e,
        outdatedModules: t,
        outdatedDependencies: n
      };
    }
    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        -1 === e.indexOf(r) && e.push(r);
      }
    }
    t = t || {};
    var h = {},
      b = [],
      _ = {},
      m = function() {
        console.warn(
          "[HMR] unexpected require(" + O.moduleId + ") to disposed module"
        );
      };
    for (var g in y)
      if (Object.prototype.hasOwnProperty.call(y, g)) {
        var O;
        l = w(g);
        var E = !1,
          S = !1,
          P = !1,
          k = "";
        switch (
          ((O = y[g] ? f(l) : { type: "disposed", moduleId: g }).chain &&
            (k = "\nUpdate propagation: " + O.chain.join(" -> ")),
          O.type)
        ) {
          case "self-declined":
            t.onDeclined && t.onDeclined(O),
              t.ignoreDeclined ||
                (E = new Error(
                  "Aborted because of self decline: " + O.moduleId + k
                ));
            break;
          case "declined":
            t.onDeclined && t.onDeclined(O),
              t.ignoreDeclined ||
                (E = new Error(
                  "Aborted because of declined dependency: " +
                    O.moduleId +
                    " in " +
                    O.parentId +
                    k
                ));
            break;
          case "unaccepted":
            t.onUnaccepted && t.onUnaccepted(O),
              t.ignoreUnaccepted ||
                (E = new Error(
                  "Aborted because " + l + " is not accepted" + k
                ));
            break;
          case "accepted":
            t.onAccepted && t.onAccepted(O), (S = !0);
            break;
          case "disposed":
            t.onDisposed && t.onDisposed(O), (P = !0);
            break;
          default:
            throw new Error("Unexception type " + O.type);
        }
        if (E) return d("abort"), Promise.reject(E);
        if (S)
          for (l in ((_[l] = y[l]),
          s(b, O.outdatedModules),
          O.outdatedDependencies))
            Object.prototype.hasOwnProperty.call(O.outdatedDependencies, l) &&
              (h[l] || (h[l] = []), s(h[l], O.outdatedDependencies[l]));
        P && (s(b, [O.moduleId]), (_[l] = m));
      }
    var I,
      $ = [];
    for (r = 0; r < b.length; r++)
      (l = b[r]),
        x[l] &&
          x[l].hot._selfAccepted &&
          $.push({ module: l, errorHandler: x[l].hot._selfAccepted });
    d("dispose"),
      Object.keys(j).forEach(function(e) {
        !1 === j[e] &&
          (function(e) {
            delete installedChunks[e];
          })(e);
      });
    for (var C, D, M = b.slice(); M.length > 0; )
      if (((l = M.pop()), (a = x[l]))) {
        var R = {},
          U = a.hot._disposeHandlers;
        for (i = 0; i < U.length; i++) (n = U[i])(R);
        for (
          c[l] = R, a.hot.active = !1, delete x[l], delete h[l], i = 0;
          i < a.children.length;
          i++
        ) {
          var H = x[a.children[i]];
          H && ((I = H.parents.indexOf(l)) >= 0 && H.parents.splice(I, 1));
        }
      }
    for (l in h)
      if (Object.prototype.hasOwnProperty.call(h, l) && (a = x[l]))
        for (D = h[l], i = 0; i < D.length; i++)
          (C = D[i]),
            (I = a.children.indexOf(C)) >= 0 && a.children.splice(I, 1);
    for (l in (d("apply"), (o = v), _))
      Object.prototype.hasOwnProperty.call(_, l) && (e[l] = _[l]);
    var z = null;
    for (l in h)
      if (Object.prototype.hasOwnProperty.call(h, l) && (a = x[l])) {
        D = h[l];
        var T = [];
        for (r = 0; r < D.length; r++)
          if (((C = D[r]), (n = a.hot._acceptedDependencies[C]))) {
            if (-1 !== T.indexOf(n)) continue;
            T.push(n);
          }
        for (r = 0; r < T.length; r++) {
          n = T[r];
          try {
            n(D);
          } catch (e) {
            t.onErrored &&
              t.onErrored({
                type: "accept-errored",
                moduleId: l,
                dependencyId: D[r],
                error: e
              }),
              t.ignoreErrored || z || (z = e);
          }
        }
      }
    for (r = 0; r < $.length; r++) {
      var N = $[r];
      (l = N.module), (u = [l]);
      try {
        A(l);
      } catch (e) {
        if ("function" == typeof N.errorHandler)
          try {
            N.errorHandler(e);
          } catch (n) {
            t.onErrored &&
              t.onErrored({
                type: "self-accept-error-handler-errored",
                moduleId: l,
                error: n,
                originalError: e
              }),
              t.ignoreErrored || z || (z = n),
              z || (z = e);
          }
        else
          t.onErrored &&
            t.onErrored({ type: "self-accept-errored", moduleId: l, error: e }),
            t.ignoreErrored || z || (z = e);
      }
    }
    return z
      ? (d("fail"), Promise.reject(z))
      : (d("idle"),
        new Promise(function(e) {
          e(b);
        }));
  }
  var x = {};
  function A(t) {
    if (x[t]) return x[t].exports;
    var n = (x[t] = {
      i: t,
      l: !1,
      exports: {},
      hot: f(t),
      parents: ((a = u), (u = []), a),
      children: []
    });
    return e[t].call(n.exports, n, n.exports, l(t)), (n.l = !0), n.exports;
  }
  (A.m = e),
    (A.c = x),
    (A.d = function(e, t, n) {
      A.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (A.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (A.t = function(e, t) {
      if ((1 & t && (e = A(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (A.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          A.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (A.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return A.d(t, "a", t), t;
    }),
    (A.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (A.p = "/"),
    (A.h = function() {
      return o;
    }),
    l(26)((A.s = 26));
})([
  ,
  function(e, t, n) {
    "use strict";
    e.exports = n(4);
  },
  function(e, t, n) {
    (function(e, n) {
      var r = 200,
        o = "__lodash_hash_undefined__",
        i = 800,
        c = 16,
        u = 9007199254740991,
        a = "[object Arguments]",
        l = "[object AsyncFunction]",
        f = "[object Function]",
        s = "[object GeneratorFunction]",
        p = "[object Null]",
        d = "[object Object]",
        h = "[object Proxy]",
        y = "[object Undefined]",
        v = /^\[object .+?Constructor\]$/,
        b = /^(?:0|[1-9]\d*)$/,
        _ = {};
      (_["[object Float32Array]"] = _["[object Float64Array]"] = _[
        "[object Int8Array]"
      ] = _["[object Int16Array]"] = _["[object Int32Array]"] = _[
        "[object Uint8Array]"
      ] = _["[object Uint8ClampedArray]"] = _["[object Uint16Array]"] = _[
        "[object Uint32Array]"
      ] = !0),
        (_[a] = _["[object Array]"] = _["[object ArrayBuffer]"] = _[
          "[object Boolean]"
        ] = _["[object DataView]"] = _["[object Date]"] = _[
          "[object Error]"
        ] = _[f] = _["[object Map]"] = _["[object Number]"] = _[d] = _[
          "[object RegExp]"
        ] = _["[object Set]"] = _["[object String]"] = _[
          "[object WeakMap]"
        ] = !1);
      var m = "object" == typeof e && e && e.Object === Object && e,
        g = "object" == typeof self && self && self.Object === Object && self,
        j = m || g || Function("return this")(),
        w = t && !t.nodeType && t,
        O = w && "object" == typeof n && n && !n.nodeType && n,
        E = O && O.exports === w,
        S = E && m.process,
        P = (function() {
          try {
            return S && S.binding && S.binding("util");
          } catch (e) {}
        })(),
        x = P && P.isTypedArray;
      function A(e, t) {
        return "__proto__" == t ? void 0 : e[t];
      }
      var k,
        I,
        $,
        C = Array.prototype,
        D = Function.prototype,
        M = Object.prototype,
        R = j["__core-js_shared__"],
        U = D.toString,
        H = M.hasOwnProperty,
        z = (k = /[^.]+$/.exec((R && R.keys && R.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + k
          : "",
        T = M.toString,
        N = U.call(Object),
        F = RegExp(
          "^" +
            U.call(H)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        ),
        q = E ? j.Buffer : void 0,
        L = j.Symbol,
        V = j.Uint8Array,
        B = q ? q.allocUnsafe : void 0,
        G = ((I = Object.getPrototypeOf),
        ($ = Object),
        function(e) {
          return I($(e));
        }),
        J = Object.create,
        W = M.propertyIsEnumerable,
        X = C.splice,
        Y = L ? L.toStringTag : void 0,
        K = (function() {
          try {
            var e = we(Object, "defineProperty");
            return e({}, "", {}), e;
          } catch (e) {}
        })(),
        Q = q ? q.isBuffer : void 0,
        Z = Math.max,
        ee = Date.now,
        te = we(j, "Map"),
        ne = we(Object, "create"),
        re = (function() {
          function e() {}
          return function(t) {
            if (!De(t)) return {};
            if (J) return J(t);
            e.prototype = t;
            var n = new e();
            return (e.prototype = void 0), n;
          };
        })();
      function oe(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function ie(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function ce(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function ue(e) {
        var t = (this.__data__ = new ie(e));
        this.size = t.size;
      }
      function ae(e, t) {
        var n = Ae(e),
          r = !n && xe(e),
          o = !n && !r && Ie(e),
          i = !n && !r && !o && Re(e),
          c = n || r || o || i,
          u = c
            ? (function(e, t) {
                for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
                return r;
              })(e.length, String)
            : [],
          a = u.length;
        for (var l in e)
          (!t && !H.call(e, l)) ||
            (c &&
              ("length" == l ||
                (o && ("offset" == l || "parent" == l)) ||
                (i &&
                  ("buffer" == l || "byteLength" == l || "byteOffset" == l)) ||
                Oe(l, a))) ||
            u.push(l);
        return u;
      }
      function le(e, t, n) {
        ((void 0 === n || Pe(e[t], n)) && (void 0 !== n || t in e)) ||
          pe(e, t, n);
      }
      function fe(e, t, n) {
        var r = e[t];
        (H.call(e, t) && Pe(r, n) && (void 0 !== n || t in e)) || pe(e, t, n);
      }
      function se(e, t) {
        for (var n = e.length; n--; ) if (Pe(e[n][0], t)) return n;
        return -1;
      }
      function pe(e, t, n) {
        "__proto__" == t && K
          ? K(e, t, {
              configurable: !0,
              enumerable: !0,
              value: n,
              writable: !0
            })
          : (e[t] = n);
      }
      (oe.prototype.clear = function() {
        (this.__data__ = ne ? ne(null) : {}), (this.size = 0);
      }),
        (oe.prototype.delete = function(e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
        }),
        (oe.prototype.get = function(e) {
          var t = this.__data__;
          if (ne) {
            var n = t[e];
            return n === o ? void 0 : n;
          }
          return H.call(t, e) ? t[e] : void 0;
        }),
        (oe.prototype.has = function(e) {
          var t = this.__data__;
          return ne ? void 0 !== t[e] : H.call(t, e);
        }),
        (oe.prototype.set = function(e, t) {
          var n = this.__data__;
          return (
            (this.size += this.has(e) ? 0 : 1),
            (n[e] = ne && void 0 === t ? o : t),
            this
          );
        }),
        (ie.prototype.clear = function() {
          (this.__data__ = []), (this.size = 0);
        }),
        (ie.prototype.delete = function(e) {
          var t = this.__data__,
            n = se(t, e);
          return !(
            n < 0 ||
            (n == t.length - 1 ? t.pop() : X.call(t, n, 1), --this.size, 0)
          );
        }),
        (ie.prototype.get = function(e) {
          var t = this.__data__,
            n = se(t, e);
          return n < 0 ? void 0 : t[n][1];
        }),
        (ie.prototype.has = function(e) {
          return se(this.__data__, e) > -1;
        }),
        (ie.prototype.set = function(e, t) {
          var n = this.__data__,
            r = se(n, e);
          return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
        }),
        (ce.prototype.clear = function() {
          (this.size = 0),
            (this.__data__ = {
              hash: new oe(),
              map: new (te || ie)(),
              string: new oe()
            });
        }),
        (ce.prototype.delete = function(e) {
          var t = je(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
        }),
        (ce.prototype.get = function(e) {
          return je(this, e).get(e);
        }),
        (ce.prototype.has = function(e) {
          return je(this, e).has(e);
        }),
        (ce.prototype.set = function(e, t) {
          var n = je(this, e),
            r = n.size;
          return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
        }),
        (ue.prototype.clear = function() {
          (this.__data__ = new ie()), (this.size = 0);
        }),
        (ue.prototype.delete = function(e) {
          var t = this.__data__,
            n = t.delete(e);
          return (this.size = t.size), n;
        }),
        (ue.prototype.get = function(e) {
          return this.__data__.get(e);
        }),
        (ue.prototype.has = function(e) {
          return this.__data__.has(e);
        }),
        (ue.prototype.set = function(e, t) {
          var n = this.__data__;
          if (n instanceof ie) {
            var o = n.__data__;
            if (!te || o.length < r - 1)
              return o.push([e, t]), (this.size = ++n.size), this;
            n = this.__data__ = new ce(o);
          }
          return n.set(e, t), (this.size = n.size), this;
        });
      var de,
        he = function(e, t, n) {
          for (var r = -1, o = Object(e), i = n(e), c = i.length; c--; ) {
            var u = i[de ? c : ++r];
            if (!1 === t(o[u], u, o)) break;
          }
          return e;
        };
      function ye(e) {
        return null == e
          ? void 0 === e
            ? y
            : p
          : Y && Y in Object(e)
          ? (function(e) {
              var t = H.call(e, Y),
                n = e[Y];
              try {
                e[Y] = void 0;
                var r = !0;
              } catch (e) {}
              var o = T.call(e);
              r && (t ? (e[Y] = n) : delete e[Y]);
              return o;
            })(e)
          : (function(e) {
              return T.call(e);
            })(e);
      }
      function ve(e) {
        return Me(e) && ye(e) == a;
      }
      function be(e) {
        return (
          !(!De(e) || ((t = e), z && z in t)) &&
          ($e(e) ? F : v).test(
            (function(e) {
              if (null != e) {
                try {
                  return U.call(e);
                } catch (e) {}
                try {
                  return e + "";
                } catch (e) {}
              }
              return "";
            })(e)
          )
        );
        var t;
      }
      function _e(e) {
        if (!De(e))
          return (function(e) {
            var t = [];
            if (null != e) for (var n in Object(e)) t.push(n);
            return t;
          })(e);
        var t = Ee(e),
          n = [];
        for (var r in e)
          ("constructor" != r || (!t && H.call(e, r))) && n.push(r);
        return n;
      }
      function me(e, t, n, r, o) {
        e !== t &&
          he(
            t,
            function(i, c) {
              if (De(i))
                o || (o = new ue()),
                  (function(e, t, n, r, o, i, c) {
                    var u = A(e, n),
                      a = A(t, n),
                      l = c.get(a);
                    if (l) return void le(e, n, l);
                    var f = i ? i(u, a, n + "", e, t, c) : void 0,
                      s = void 0 === f;
                    if (s) {
                      var p = Ae(a),
                        h = !p && Ie(a),
                        y = !p && !h && Re(a);
                      (f = a),
                        p || h || y
                          ? Ae(u)
                            ? (f = u)
                            : Me((g = u)) && ke(g)
                            ? (f = (function(e, t) {
                                var n = -1,
                                  r = e.length;
                                t || (t = Array(r));
                                for (; ++n < r; ) t[n] = e[n];
                                return t;
                              })(u))
                            : h
                            ? ((s = !1),
                              (f = (function(e, t) {
                                if (t) return e.slice();
                                var n = e.length,
                                  r = B ? B(n) : new e.constructor(n);
                                return e.copy(r), r;
                              })(a, !0)))
                            : y
                            ? ((s = !1),
                              (v = a),
                              (b = !0
                                ? ((_ = v.buffer),
                                  (m = new _.constructor(_.byteLength)),
                                  new V(m).set(new V(_)),
                                  m)
                                : v.buffer),
                              (f = new v.constructor(
                                b,
                                v.byteOffset,
                                v.length
                              )))
                            : (f = [])
                          : (function(e) {
                              if (!Me(e) || ye(e) != d) return !1;
                              var t = G(e);
                              if (null === t) return !0;
                              var n = H.call(t, "constructor") && t.constructor;
                              return (
                                "function" == typeof n &&
                                n instanceof n &&
                                U.call(n) == N
                              );
                            })(a) || xe(a)
                          ? ((f = u),
                            xe(u)
                              ? (f = (function(e) {
                                  return (function(e, t, n, r) {
                                    var o = !n;
                                    n || (n = {});
                                    var i = -1,
                                      c = t.length;
                                    for (; ++i < c; ) {
                                      var u = t[i],
                                        a = r ? r(n[u], e[u], u, n, e) : void 0;
                                      void 0 === a && (a = e[u]),
                                        o ? pe(n, u, a) : fe(n, u, a);
                                    }
                                    return n;
                                  })(e, Ue(e));
                                })(u))
                              : (!De(u) || (r && $e(u))) &&
                                (f = (function(e) {
                                  return "function" != typeof e.constructor ||
                                    Ee(e)
                                    ? {}
                                    : re(G(e));
                                })(a)))
                          : (s = !1);
                    }
                    var v, b, _, m;
                    var g;
                    s && (c.set(a, f), o(f, a, r, i, c), c.delete(a));
                    le(e, n, f);
                  })(e, t, c, n, me, r, o);
              else {
                var u = r ? r(A(e, c), i, c + "", e, t, o) : void 0;
                void 0 === u && (u = i), le(e, c, u);
              }
            },
            Ue
          );
      }
      function ge(e, t) {
        return Se(
          (function(e, t, n) {
            return (
              (t = Z(void 0 === t ? e.length - 1 : t, 0)),
              function() {
                for (
                  var r = arguments,
                    o = -1,
                    i = Z(r.length - t, 0),
                    c = Array(i);
                  ++o < i;

                )
                  c[o] = r[t + o];
                o = -1;
                for (var u = Array(t + 1); ++o < t; ) u[o] = r[o];
                return (
                  (u[t] = n(c)),
                  (function(e, t, n) {
                    switch (n.length) {
                      case 0:
                        return e.call(t);
                      case 1:
                        return e.call(t, n[0]);
                      case 2:
                        return e.call(t, n[0], n[1]);
                      case 3:
                        return e.call(t, n[0], n[1], n[2]);
                    }
                    return e.apply(t, n);
                  })(e, this, u)
                );
              }
            );
          })(e, t, Te),
          e + ""
        );
      }
      function je(e, t) {
        var n,
          r,
          o = e.__data__;
        return ("string" == (r = typeof (n = t)) ||
        "number" == r ||
        "symbol" == r ||
        "boolean" == r
        ? "__proto__" !== n
        : null === n)
          ? o["string" == typeof t ? "string" : "hash"]
          : o.map;
      }
      function we(e, t) {
        var n = (function(e, t) {
          return null == e ? void 0 : e[t];
        })(e, t);
        return be(n) ? n : void 0;
      }
      function Oe(e, t) {
        var n = typeof e;
        return (
          !!(t = null == t ? u : t) &&
          ("number" == n || ("symbol" != n && b.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
        );
      }
      function Ee(e) {
        var t = e && e.constructor;
        return e === (("function" == typeof t && t.prototype) || M);
      }
      var Se = (function(e) {
        var t = 0,
          n = 0;
        return function() {
          var r = ee(),
            o = c - (r - n);
          if (((n = r), o > 0)) {
            if (++t >= i) return arguments[0];
          } else t = 0;
          return e.apply(void 0, arguments);
        };
      })(
        K
          ? function(e, t) {
              return K(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: ((n = t),
                function() {
                  return n;
                }),
                writable: !0
              });
              var n;
            }
          : Te
      );
      function Pe(e, t) {
        return e === t || (e != e && t != t);
      }
      var xe = ve(
          (function() {
            return arguments;
          })()
        )
          ? ve
          : function(e) {
              return Me(e) && H.call(e, "callee") && !W.call(e, "callee");
            },
        Ae = Array.isArray;
      function ke(e) {
        return null != e && Ce(e.length) && !$e(e);
      }
      var Ie =
        Q ||
        function() {
          return !1;
        };
      function $e(e) {
        if (!De(e)) return !1;
        var t = ye(e);
        return t == f || t == s || t == l || t == h;
      }
      function Ce(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= u;
      }
      function De(e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
      }
      function Me(e) {
        return null != e && "object" == typeof e;
      }
      var Re = x
        ? (function(e) {
            return function(t) {
              return e(t);
            };
          })(x)
        : function(e) {
            return Me(e) && Ce(e.length) && !!_[ye(e)];
          };
      function Ue(e) {
        return ke(e) ? ae(e, !0) : _e(e);
      }
      var He,
        ze = ((He = function(e, t, n) {
          me(e, t, n);
        }),
        ge(function(e, t) {
          var n = -1,
            r = t.length,
            o = r > 1 ? t[r - 1] : void 0,
            i = r > 2 ? t[2] : void 0;
          for (
            o = He.length > 3 && "function" == typeof o ? (r--, o) : void 0,
              i &&
                (function(e, t, n) {
                  if (!De(n)) return !1;
                  var r = typeof t;
                  return (
                    !!("number" == r
                      ? ke(n) && Oe(t, n.length)
                      : "string" == r && (t in n)) && Pe(n[t], e)
                  );
                })(t[0], t[1], i) &&
                ((o = r < 3 ? void 0 : o), (r = 1)),
              e = Object(e);
            ++n < r;

          ) {
            var c = t[n];
            c && He(e, c, n, o);
          }
          return e;
        }));
      function Te(e) {
        return e;
      }
      n.exports = ze;
    }.call(this, n(8), n(5)(e)));
  },
  function(e, t, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
    e.exports = (function() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function(e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function(e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function(e, t) {
          for (
            var n,
              c,
              u = (function(e) {
                if (null == e)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(e);
              })(e),
              a = 1;
            a < arguments.length;
            a++
          ) {
            for (var l in (n = Object(arguments[a])))
              o.call(n, l) && (u[l] = n[l]);
            if (r) {
              c = r(n);
              for (var f = 0; f < c.length; f++)
                i.call(n, c[f]) && (u[c[f]] = n[c[f]]);
            }
          }
          return u;
        };
  },
  function(e, t, n) {
    "use strict";
    /** @license React v16.8.0-alpha.0
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(3),
      o = "function" == typeof Symbol && Symbol.for,
      i = o ? Symbol.for("react.element") : 60103,
      c = o ? Symbol.for("react.portal") : 60106,
      u = o ? Symbol.for("react.fragment") : 60107,
      a = o ? Symbol.for("react.strict_mode") : 60108,
      l = o ? Symbol.for("react.profiler") : 60114,
      f = o ? Symbol.for("react.provider") : 60109,
      s = o ? Symbol.for("react.context") : 60110,
      p = o ? Symbol.for("react.concurrent_mode") : 60111,
      d = o ? Symbol.for("react.forward_ref") : 60112,
      h = o ? Symbol.for("react.suspense") : 60113,
      y = o ? Symbol.for("react.memo") : 60115,
      v = o ? Symbol.for("react.lazy") : 60116,
      b = "function" == typeof Symbol && Symbol.iterator;
    function _(e) {
      for (
        var t = arguments.length - 1,
          n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 0;
        r < t;
        r++
      )
        n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
      !(function(e, t, n, r, o, i, c, u) {
        if (!e) {
          if (((e = void 0), void 0 === t))
            e = Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          else {
            var a = [n, r, o, i, c, u],
              l = 0;
            (e = Error(
              t.replace(/%s/g, function() {
                return a[l++];
              })
            )).name = "Invariant Violation";
          }
          throw ((e.framesToPop = 1), e);
        }
      })(
        !1,
        "Minified React error #" +
          e +
          "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
        n
      );
    }
    var m = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
      },
      g = {};
    function j(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m);
    }
    function w() {}
    function O(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m);
    }
    (j.prototype.isReactComponent = {}),
      (j.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e && _("85"),
          this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (j.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (w.prototype = j.prototype);
    var E = (O.prototype = new w());
    (E.constructor = O), r(E, j.prototype), (E.isPureReactComponent = !0);
    var S = { current: null },
      P = { current: null },
      x = Object.prototype.hasOwnProperty,
      A = { key: !0, ref: !0, __self: !0, __source: !0 };
    function k(e, t, n) {
      var r = void 0,
        o = {},
        c = null,
        u = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (u = t.ref),
        void 0 !== t.key && (c = "" + t.key),
        t))
          x.call(t, r) && !A.hasOwnProperty(r) && (o[r] = t[r]);
      var a = arguments.length - 2;
      if (1 === a) o.children = n;
      else if (1 < a) {
        for (var l = Array(a), f = 0; f < a; f++) l[f] = arguments[f + 2];
        o.children = l;
      }
      if (e && e.defaultProps)
        for (r in (a = e.defaultProps)) void 0 === o[r] && (o[r] = a[r]);
      return {
        $$typeof: i,
        type: e,
        key: c,
        ref: u,
        props: o,
        _owner: P.current
      };
    }
    function I(e) {
      return "object" == typeof e && null !== e && e.$$typeof === i;
    }
    var $ = /\/+/g,
      C = [];
    function D(e, t, n, r) {
      if (C.length) {
        var o = C.pop();
        return (
          (o.result = e),
          (o.keyPrefix = t),
          (o.func = n),
          (o.context = r),
          (o.count = 0),
          o
        );
      }
      return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
    }
    function M(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > C.length && C.push(e);
    }
    function R(e, t, n) {
      return null == e
        ? 0
        : (function e(t, n, r, o) {
            var u = typeof t;
            ("undefined" !== u && "boolean" !== u) || (t = null);
            var a = !1;
            if (null === t) a = !0;
            else
              switch (u) {
                case "string":
                case "number":
                  a = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case i:
                    case c:
                      a = !0;
                  }
              }
            if (a) return r(o, t, "" === n ? "." + U(t, 0) : n), 1;
            if (((a = 0), (n = "" === n ? "." : n + ":"), Array.isArray(t)))
              for (var l = 0; l < t.length; l++) {
                var f = n + U((u = t[l]), l);
                a += e(u, f, r, o);
              }
            else if (
              ((f =
                null === t || "object" != typeof t
                  ? null
                  : "function" == typeof (f = (b && t[b]) || t["@@iterator"])
                  ? f
                  : null),
              "function" == typeof f)
            )
              for (t = f.call(t), l = 0; !(u = t.next()).done; )
                a += e((u = u.value), (f = n + U(u, l++)), r, o);
            else
              "object" === u &&
                _(
                  "31",
                  "[object Object]" == (r = "" + t)
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : r,
                  ""
                );
            return a;
          })(e, "", t, n);
    }
    function U(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function(e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              ("" + e).replace(/[=:]/g, function(e) {
                return t[e];
              })
            );
          })(e.key)
        : t.toString(36);
    }
    function H(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function z(e, t, n) {
      var r = e.result,
        o = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? T(e, r, n, function(e) {
              return e;
            })
          : null != e &&
            (I(e) &&
              (e = (function(e, t) {
                return {
                  $$typeof: i,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner
                };
              })(
                e,
                o +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace($, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function T(e, t, n, r, o) {
      var i = "";
      null != n && (i = ("" + n).replace($, "$&/") + "/"),
        R(e, z, (t = D(t, i, r, o))),
        M(t);
    }
    function N() {
      var e = S.current;
      return null === e && _("298"), e;
    }
    var F = {
      Children: {
        map: function(e, t, n) {
          if (null == e) return e;
          var r = [];
          return T(e, r, null, t, n), r;
        },
        forEach: function(e, t, n) {
          if (null == e) return e;
          R(e, H, (t = D(null, null, t, n))), M(t);
        },
        count: function(e) {
          return R(
            e,
            function() {
              return null;
            },
            null
          );
        },
        toArray: function(e) {
          var t = [];
          return (
            T(e, t, null, function(e) {
              return e;
            }),
            t
          );
        },
        only: function(e) {
          return I(e) || _("143"), e;
        }
      },
      createRef: function() {
        return { current: null };
      },
      Component: j,
      PureComponent: O,
      createContext: function(e, t) {
        return (
          void 0 === t && (t = null),
          ((e = {
            $$typeof: s,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          }).Provider = { $$typeof: f, _context: e }),
          (e.Consumer = e)
        );
      },
      forwardRef: function(e) {
        return { $$typeof: d, render: e };
      },
      lazy: function(e) {
        return { $$typeof: v, _ctor: e, _status: -1, _result: null };
      },
      memo: function(e, t) {
        return { $$typeof: y, type: e, compare: void 0 === t ? null : t };
      },
      Fragment: u,
      StrictMode: a,
      Suspense: h,
      createElement: k,
      cloneElement: function(e, t, n) {
        null == e && _("267", e);
        var o = void 0,
          c = r({}, e.props),
          u = e.key,
          a = e.ref,
          l = e._owner;
        if (null != t) {
          void 0 !== t.ref && ((a = t.ref), (l = P.current)),
            void 0 !== t.key && (u = "" + t.key);
          var f = void 0;
          for (o in (e.type && e.type.defaultProps && (f = e.type.defaultProps),
          t))
            x.call(t, o) &&
              !A.hasOwnProperty(o) &&
              (c[o] = void 0 === t[o] && void 0 !== f ? f[o] : t[o]);
        }
        if (1 === (o = arguments.length - 2)) c.children = n;
        else if (1 < o) {
          f = Array(o);
          for (var s = 0; s < o; s++) f[s] = arguments[s + 2];
          c.children = f;
        }
        return {
          $$typeof: i,
          type: e.type,
          key: u,
          ref: a,
          props: c,
          _owner: l
        };
      },
      createFactory: function(e) {
        var t = k.bind(null, e);
        return (t.type = e), t;
      },
      isValidElement: I,
      version: "16.8.0-alpha.0",
      unstable_ConcurrentMode: p,
      unstable_Profiler: l,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentDispatcher: S,
        ReactCurrentOwner: P,
        assign: r
      }
    };
    (F.ConcurrentMode = p),
      (F.Profiler = l),
      (F.unstable_ConcurrentMode = void 0),
      (F.unstable_Profiler = void 0),
      (F.useCallback = function(e, t) {
        return N().useCallback(e, t);
      }),
      (F.useContext = function(e, t) {
        return N().useContext(e, t);
      }),
      (F.useEffect = function(e, t) {
        return N().useEffect(e, t);
      }),
      (F.useImperativeMethods = function(e, t, n) {
        return N().useImperativeMethods(e, t, n);
      }),
      (F.useLayoutEffect = function(e, t) {
        return N().useLayoutEffect(e, t);
      }),
      (F.useMemo = function(e, t) {
        return N().useMemo(e, t);
      }),
      (F.useReducer = function(e, t, n) {
        return N().useReducer(e, t, n);
      }),
      (F.useRef = function(e) {
        return N().useRef(e);
      }),
      (F.useState = function(e) {
        return N().useState(e);
      });
    var q = { default: F },
      L = (q && F) || q;
    e.exports = L.default || L;
  },
  function(e, t) {
    e.exports = function(e) {
      return (
        e.webpackPolyfill ||
          ((e.deprecate = function() {}),
          (e.paths = []),
          e.children || (e.children = []),
          Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
              return e.l;
            }
          }),
          Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
              return e.i;
            }
          }),
          (e.webpackPolyfill = 1)),
        e
      );
    };
  },
  ,
  ,
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t, n) {
    "use strict";
    var r = {
        normal: [
          "xbase",
          "xbasenight",
          "base",
          "basenight",
          "map",
          "mapnight",
          "traffic",
          "trafficnight",
          "transit",
          "panorama",
          "panoramanight",
          "labels",
          "metaInfo"
        ],
        satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
        terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
        incidents: !0,
        venues: !0
      },
      o = function() {},
      i = {};
    [
      "pointerdown",
      "pointerup",
      "pointermove",
      "pointerenter",
      "pointerleave",
      "pointercancel",
      "dragstart",
      "drag",
      "dragend",
      "tab",
      "dbltap"
    ].map(function(e) {
      return (i[e] = o);
    }),
      (t.a = {
        VERSION: "v3/3.0",
        mapTypes: r,
        mapEvents: i,
        MAP_TYPE: "normal.map",
        mapOptions: { zoom: 8, center: { lat: 6.5243793, lng: 3.3792057 } },
        interactive: !1,
        includeUI: !1,
        includePlaces: !1,
        useEvents: !1,
        containerId: "HERE_MAP_CONTAINER",
        defaultClassName: "here-map-container"
      });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function(e, t, n) {
    e.exports = n(27).default;
  },
  ,
  ,
  function(e, t, n) {
    (function(e) {
      !(function(t) {
        var n = function(e) {
          return o(!0 === e, !1, arguments);
        };
        function r(e, t) {
          if ("object" !== i(e)) return t;
          for (var n in t)
            "object" === i(e[n]) && "object" === i(t[n])
              ? (e[n] = r(e[n], t[n]))
              : (e[n] = t[n]);
          return e;
        }
        function o(e, t, o) {
          var c = o[0],
            u = o.length;
          (e || "object" !== i(c)) && (c = {});
          for (var a = 0; a < u; ++a) {
            var l = o[a];
            if ("object" === i(l))
              for (var f in l)
                if ("__proto__" !== f) {
                  var s = e ? n.clone(l[f]) : l[f];
                  c[f] = t ? r(c[f], s) : s;
                }
          }
          return c;
        }
        function i(e) {
          return {}.toString
            .call(e)
            .slice(8, -1)
            .toLowerCase();
        }
        (n.recursive = function(e) {
          return o(!0 === e, !0, arguments);
        }),
          (n.clone = function(e) {
            var t,
              r,
              o = e,
              c = i(e);
            if ("array" === c)
              for (o = [], r = e.length, t = 0; t < r; ++t)
                o[t] = n.clone(e[t]);
            else if ("object" === c)
              for (t in ((o = {}), e)) o[t] = n.clone(e[t]);
            return o;
          }),
          t ? (e.exports = n) : (window.merge = n);
      })(e && "object" == typeof e.exports && e.exports);
    }.call(this, n(5)(e)));
  },
  ,
  ,
  ,
  ,
  ,
  function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(1),
      o = n.n(r),
      i = n(17),
      c = n.n(i),
      u = {
        VERSION: "v3/3.0",
        interactive: !1,
        includeUI: !1,
        includePlaces: !1
      },
      a = n(20),
      l = n.n(a);
    var f = e => {
        const t = (e => l()(u, e))(e || {}),
          {
            VERSION: n,
            version: r,
            interactive: o,
            includeUI: i,
            includePlaces: a
          } = t,
          f = r || n,
          s = ((e = u.VERSION) => [
            `https://js.api.here.com/${e}/mapsjs-service.js`,
            `https://js.api.here.com/${e}/mapsjs-ui.js`,
            `https://js.api.here.com/${e}/mapsjs-mapevents.js`,
            `https://js.api.here.com/${e}/mapsjs-places.js`
          ])(f);
        !o && s.splice(2, 1), !i && s.splice(1, 1), !a && s.splice(3, 1);
        const p = `https://js.api.here.com/${f}/mapsjs-core.js`;
        return c()(p)
          .then(function() {
            if (i) {
              const e = document.createElement("link");
              e.setAttribute("rel", "stylesheet"),
                e.setAttribute("type", "text/css"),
                e.setAttribute(
                  "href",
                  `https://js.api.here.com/${f}/mapsjs-ui.css`
                ),
                document.getElementsByTagName("head")[0].append(e);
            }
            return c()(s);
          })
          .catch(e => {
            console.log(e);
          });
      },
      s = n(9),
      p = n(2),
      d = n.n(p),
      h = function(e) {
        var t = (function(e) {
            return d()(s.a, e);
          })(e || {}),
          n = t.VERSION,
          r = t.version,
          o = t.interactive,
          i = t.includeUI,
          c = t.includePlaces;
        return f({
          includeUI: i,
          includePlaces: c,
          interactive: o,
          version: r || n
        }).then(function() {
          return t;
        });
      },
      y = function(e) {
        var t = e.app_id,
          n = e.app_code;
        if (!t || !n) throw new Error("Options must include appId and appCode");
        if ("undefined" == typeof H || !H.service)
          throw new Error("Here Map JavaScripts is not loaded.");
        return new H.service.Platform(e);
      };
    function v(e, t) {
      return (
        (function(e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function(e, t) {
          var n = [],
            r = !0,
            o = !1,
            i = void 0;
          try {
            for (
              var c, u = e[Symbol.iterator]();
              !(r = (c = u.next()).done) &&
              (n.push(c.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (o = !0), (i = e);
          } finally {
            try {
              r || null == u.return || u.return();
            } finally {
              if (o) throw i;
            }
          }
          return n;
        })(e, t) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    t.default = function(e) {
      var t = v(Object(r.useState)({ platform: {}, options: {} }), 2),
        n = t[0],
        i = t[1];
      Object(r.useEffect)(
        function() {
          h(e).then(function(e) {
            var t = y(e);
            i({ platform: t, options: e });
          });
        },
        [n.platform.A]
      );
      var c = n.platform,
        u = n.options;
      return "api.here.com" == c.A && u.app_code
        ? o.a.Children.map(e.children, function(e) {
            return o.a.cloneElement(e, { platform: c, options: u });
          })
        : null;
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(28),
      o = {};
    t.default = function e(t, n) {
      if ((0, r.isString)(t))
        return new Promise(function(e, n) {
          !(function(e, t, n) {
            var i = function() {
              (o[e] = !0), (0, r.isFunction)(t) && t();
            };
            if (o[e]) i();
            else {
              var c = document.createElement("script");
              (c.type = "text/javascript"),
                c.readyState
                  ? (c.onreadystatechange = function() {
                      ("loaded" != c.readyState &&
                        "complete" != c.readyState) ||
                        ((c.onreadystatechange = null), i());
                    })
                  : (c.onload = function() {
                      i();
                    }),
                (c.onerror = function(t) {
                  (o[e] = !1),
                    console.log("error", t),
                    (0, r.isFunction)(n) && n();
                }),
                (c.src = e),
                (document.body || document.head || document).appendChild(c);
            }
          })(
            t,
            function() {
              return e(!0);
            },
            function() {
              return n();
            }
          );
        });
      if ((0, r.isArray)(t)) {
        var i = Promise.resolve(!0);
        return (
          t.forEach(function(t) {
            i = i.then(function() {
              return e(t);
            });
          }),
          i
        );
      }
      throw new Error("Invalid argument for get()");
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    (t.isArray = function(e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    }),
      (t.isString = function(e) {
        return "string" == typeof e;
      }),
      (t.isFunction = function(e) {
        return "function" == typeof e;
      });
  }
]);
