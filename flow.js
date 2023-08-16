function e(e) {
  return Object.keys(e).reduce(((t,n)=>{
      const o = e[n];
      var a;
      return t[n] = Object.assign({}, o),
      r(o.value) && (a = o.value,
      "[object Function]" !== Object.prototype.toString.call(a)) && !Array.isArray(o.value) && (t[n].value = Object.assign({}, o.value)),
      Array.isArray(o.value) && (t[n].value = o.value.slice(0)),
      t
  }
  ), {})
}
function t(e) {
  if (e)
      try {
          return JSON.parse(e)
      } catch (t) {
          return e
      }
}
function n(e, t, n) {
  if (null == n || !1 === n)
      return e.removeAttribute(t);
  let r = JSON.stringify(n);
  e.__updating[t] = !0,
  "true" === r && (r = ""),
  e.setAttribute(t, r),
  Promise.resolve().then((()=>delete e.__updating[t]))
}
function r(e) {
  return null != e && ("object" == typeof e || "function" == typeof e)
}
let o;
function a(r, a) {
  const i = Object.keys(a);
  return class extends r {
      static get observedAttributes() {
          return i.map((e=>a[e].attribute))
      }
      constructor() {
          super(),
          this.__initialized = !1,
          this.__released = !1,
          this.__releaseCallbacks = [],
          this.__propertyChangedCallbacks = [],
          this.__updating = {},
          this.props = {}
      }
      connectedCallback() {
          if (this.__initialized)
              return;
          this.__releaseCallbacks = [],
          this.__propertyChangedCallbacks = [],
          this.__updating = {},
          this.props = function(r, o) {
              const a = e(o);
              return Object.keys(o).forEach((e=>{
                  const o = a[e]
                    , i = r.getAttribute(o.attribute)
                    , s = r[e];
                  i && (o.value = o.parse ? t(i) : i),
                  null != s && (o.value = Array.isArray(s) ? s.slice(0) : s),
                  o.reflect && n(r, o.attribute, o.value),
                  Object.defineProperty(r, e, {
                      get: ()=>o.value,
                      set(t) {
                          const r = o.value;
                          o.value = t,
                          o.reflect && n(this, o.attribute, o.value);
                          for (let n = 0, o = this.__propertyChangedCallbacks.length; n < o; n++)
                              this.__propertyChangedCallbacks[n](e, t, r)
                      },
                      enumerable: !0,
                      configurable: !0
                  })
              }
              )),
              a
          }(this, a);
          const r = function(e) {
              return Object.keys(e).reduce(((t,n)=>(t[n] = e[n].value,
              t)), {})
          }(this.props)
            , i = this.Component
            , s = o;
          try {
              o = this,
              this.__initialized = !0,
              "function" == typeof (l = i) && 0 === l.toString().indexOf("class") ? new i(r,{
                  element: this
              }) : i(r, {
                  element: this
              })
          } finally {
              o = s
          }
          var l
      }
      async disconnectedCallback() {
          if (await Promise.resolve(),
          this.isConnected)
              return;
          this.__propertyChangedCallbacks.length = 0;
          let e = null;
          for (; e = this.__releaseCallbacks.pop(); )
              e(this);
          delete this.__initialized,
          this.__released = !0
      }
      attributeChangedCallback(e, n, r) {
          if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e))in a) {
              if (null == r && !this[e])
                  return;
              this[e] = a[e].parse ? t(r) : r
          }
      }
      lookupProp(e) {
          if (a)
              return i.find((t=>e === t || e === a[t].attribute))
      }
      get renderRoot() {
          return this.shadowRoot || this.attachShadow({
              mode: "open"
          })
      }
      addReleaseCallback(e) {
          this.__releaseCallbacks.push(e)
      }
      addPropertyChangedCallback(e) {
          this.__propertyChangedCallbacks.push(e)
      }
  }
}
function i(e, t={}, n={}) {
  const {BaseElement: o=HTMLElement, extension: i} = n;
  return n=>{
      if (!e)
          throw new Error("tag is required to register a Component");
      let s = customElements.get(e);
      return s ? (s.prototype.Component = n,
      s) : (s = a(o, function(e) {
          return e ? Object.keys(e).reduce(((t,n)=>{
              const o = e[n];
              return t[n] = r(o) && "value"in o ? o : {
                  value: o
              },
              t[n].attribute || (t[n].attribute = n.replace(/\.?([A-Z]+)/g, ((e,t)=>"-" + t.toLowerCase())).replace("_", "-").replace(/^-/, "")),
              t[n].parse = "parse"in t[n] ? t[n].parse : "string" != typeof t[n].value,
              t
          }
          ), {}) : {}
      }(t)),
      s.prototype.Component = n,
      s.prototype.registeredTag = e,
      customElements.define(e, s, i),
      s)
  }
}
const s = {
  context: void 0,
  registry: void 0
}
, l = Symbol("solid-proxy")
, c = Symbol("solid-track")
, d = {
  equals: (e,t)=>e === t
};
let u = L;
const p = 1
, h = 2
, f = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var g = null;
let m = null
, b = null
, v = null
, y = null
, w = 0;
function _(e, t) {
  const n = b
    , r = g
    , o = 0 === e.length
    , a = o ? f : {
      owned: null,
      cleanups: null,
      context: null,
      owner: void 0 === t ? r : t
  }
    , i = o ? e : ()=>e((()=>I((()=>z(a)))));
  g = a,
  b = null;
  try {
      return j(i, !0)
  } finally {
      b = n,
      g = r
  }
}
function x(e, t) {
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: (t = t ? Object.assign({}, d, t) : d).equals || void 0
  };
  return [P.bind(n), e=>("function" == typeof e && (e = e(n.value)),
  A(n, e))]
}
function k(e, t, n) {
  O(N(e, t, !1, p))
}
function C(e, t, n) {
  u = R;
  const r = N(e, t, !1, p);
  n && n.render || (r.user = !0),
  y ? y.push(r) : O(r)
}
function S(e, t, n) {
  n = n ? Object.assign({}, d, n) : d;
  const r = N(e, t, !0, 0);
  return r.observers = null,
  r.observerSlots = null,
  r.comparator = n.equals || void 0,
  O(r),
  P.bind(r)
}
function I(e) {
  if (null === b)
      return e();
  const t = b;
  b = null;
  try {
      return e()
  } finally {
      b = t
  }
}
function $(e) {
  C((()=>I(e)))
}
function T(e) {
  return null === g || (null === g.cleanups ? g.cleanups = [e] : g.cleanups.push(e)),
  e
}
function E(e) {
  const t = S(e)
    , n = S((()=>U(t())));
  return n.toArray = ()=>{
      const e = n();
      return Array.isArray(e) ? e : null != e ? [e] : []
  }
  ,
  n
}
function P() {
  if (this.sources && this.state)
      if (this.state === p)
          O(this);
      else {
          const e = v;
          v = null,
          j((()=>Z(this)), !1),
          v = e
      }
  if (b) {
      const e = this.observers ? this.observers.length : 0;
      b.sources ? (b.sources.push(this),
      b.sourceSlots.push(e)) : (b.sources = [this],
      b.sourceSlots = [e]),
      this.observers ? (this.observers.push(b),
      this.observerSlots.push(b.sources.length - 1)) : (this.observers = [b],
      this.observerSlots = [b.sources.length - 1])
  }
  return this.value
}
function A(e, t, n) {
  let r = e.value;
  return e.comparator && e.comparator(r, t) || (e.value = t,
  e.observers && e.observers.length && j((()=>{
      for (let t = 0; t < e.observers.length; t += 1) {
          const n = e.observers[t]
            , r = m && m.running;
          r && m.disposed.has(n),
          (r ? n.tState : n.state) || (n.pure ? v.push(n) : y.push(n),
          n.observers && B(n)),
          r || (n.state = p)
      }
      if (v.length > 1e6)
          throw v = [],
          new Error
  }
  ), !1)),
  t
}
function O(e) {
  if (!e.fn)
      return;
  z(e);
  const t = g
    , n = b
    , r = w;
  b = g = e,
  function(e, t, n) {
      let r;
      try {
          r = e.fn(t)
      } catch (t) {
          return e.pure && (e.state = p,
          e.owned && e.owned.forEach(z),
          e.owned = null),
          e.updatedAt = n + 1,
          D(t)
      }
      (!e.updatedAt || e.updatedAt <= n) && (null != e.updatedAt && "observers"in e ? A(e, r) : e.value = r,
      e.updatedAt = n)
  }(e, e.value, r),
  b = n,
  g = t
}
function N(e, t, n, r=p, o) {
  const a = {
      fn: e,
      state: r,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: t,
      owner: g,
      context: null,
      pure: n
  };
  return null === g || g !== f && (g.owned ? g.owned.push(a) : g.owned = [a]),
  a
}
function M(e) {
  if (0 === e.state)
      return;
  if (e.state === h)
      return Z(e);
  if (e.suspense && I(e.suspense.inFallback))
      return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < w); )
      e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
      if ((e = t[n]).state === p)
          O(e);
      else if (e.state === h) {
          const n = v;
          v = null,
          j((()=>Z(e, t[0])), !1),
          v = n
      }
}
function j(e, t) {
  if (v)
      return e();
  let n = !1;
  t || (v = []),
  y ? n = !0 : y = [],
  w++;
  try {
      const t = e();
      return function(e) {
          v && (L(v),
          v = null);
          if (e)
              return;
          const t = y;
          y = null,
          t.length && j((()=>u(t)), !1)
      }(n),
      t
  } catch (e) {
      n || (y = null),
      v = null,
      D(e)
  }
}
function L(e) {
  for (let t = 0; t < e.length; t++)
      M(e[t])
}
function R(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
      const r = e[t];
      r.user ? e[n++] = r : M(r)
  }
  for (t = 0; t < n; t++)
      M(e[t])
}
function Z(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
      const r = e.sources[n];
      if (r.sources) {
          const e = r.state;
          e === p ? r !== t && (!r.updatedAt || r.updatedAt < w) && M(r) : e === h && Z(r, t)
      }
  }
}
function B(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
      const n = e.observers[t];
      n.state || (n.state = h,
      n.pure ? v.push(n) : y.push(n),
      n.observers && B(n))
  }
}
function z(e) {
  let t;
  if (e.sources)
      for (; e.sources.length; ) {
          const t = e.sources.pop()
            , n = e.sourceSlots.pop()
            , r = t.observers;
          if (r && r.length) {
              const e = r.pop()
                , o = t.observerSlots.pop();
              n < r.length && (e.sourceSlots[o] = n,
              r[n] = e,
              t.observerSlots[n] = o)
          }
      }
  if (e.owned) {
      for (t = e.owned.length - 1; t >= 0; t--)
          z(e.owned[t]);
      e.owned = null
  }
  if (e.cleanups) {
      for (t = e.cleanups.length - 1; t >= 0; t--)
          e.cleanups[t]();
      e.cleanups = null
  }
  e.state = 0,
  e.context = null
}
function D(e, t=g) {
  const n = function(e) {
      return e instanceof Error ? e : new Error("string" == typeof e ? e : "Unknown error",{
          cause: e
      })
  }(e);
  throw n
}
function U(e) {
  if ("function" == typeof e && !e.length)
      return U(e());
  if (Array.isArray(e)) {
      const t = [];
      for (let n = 0; n < e.length; n++) {
          const r = U(e[n]);
          Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
      }
      return t
  }
  return e
}
const V = Symbol("fallback");
function F(e) {
  for (let t = 0; t < e.length; t++)
      e[t]()
}
function G(e, t) {
  return I((()=>e(t || {})))
}
function H() {
  return !0
}
const K = {
  get: (e,t,n)=>t === l ? n : e.get(t),
  has: (e,t)=>t === l || e.has(t),
  set: H,
  deleteProperty: H,
  getOwnPropertyDescriptor: (e,t)=>({
      configurable: !0,
      enumerable: !0,
      get: ()=>e.get(t),
      set: H,
      deleteProperty: H
  }),
  ownKeys: e=>e.keys()
};
function q(e) {
  return (e = "function" == typeof e ? e() : e) ? e : {}
}
function W() {
  for (let e = 0, t = this.length; e < t; ++e) {
      const t = this[e]();
      if (void 0 !== t)
          return t
  }
}
function Y(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
      const r = e[n];
      t = t || !!r && l in r,
      e[n] = "function" == typeof r ? (t = !0,
      S(r)) : r
  }
  if (t)
      return new Proxy({
          get(t) {
              for (let n = e.length - 1; n >= 0; n--) {
                  const r = q(e[n])[t];
                  if (void 0 !== r)
                      return r
              }
          },
          has(t) {
              for (let n = e.length - 1; n >= 0; n--)
                  if (t in q(e[n]))
                      return !0;
              return !1
          },
          keys() {
              const t = [];
              for (let n = 0; n < e.length; n++)
                  t.push(...Object.keys(q(e[n])));
              return [...new Set(t)]
          }
      },K);
  const n = {}
    , r = {}
    , o = new Set;
  for (let t = e.length - 1; t >= 0; t--) {
      const a = e[t];
      if (!a)
          continue;
      const i = Object.getOwnPropertyNames(a);
      for (let e = 0, t = i.length; e < t; e++) {
          const t = i[e];
          if ("__proto__" === t || "constructor" === t)
              continue;
          const s = Object.getOwnPropertyDescriptor(a, t);
          if (o.has(t)) {
              const e = r[t];
              e ? s.get ? e.push(s.get.bind(a)) : void 0 !== s.value && e.push((()=>s.value)) : void 0 === n[t] && (n[t] = s.value)
          } else
              s.get ? (o.add(t),
              Object.defineProperty(n, t, {
                  enumerable: !0,
                  configurable: !0,
                  get: W.bind(r[t] = [s.get.bind(a)])
              })) : (void 0 !== s.value && o.add(t),
              n[t] = s.value)
      }
  }
  return n
}
function J(e, ...t) {
  if (l in e) {
      const n = new Set(t.length > 1 ? t.flat() : t[0])
        , r = t.map((t=>new Proxy({
          get: n=>t.includes(n) ? e[n] : void 0,
          has: n=>t.includes(n) && n in e,
          keys: ()=>t.filter((t=>t in e))
      },K)));
      return r.push(new Proxy({
          get: t=>n.has(t) ? void 0 : e[t],
          has: t=>!n.has(t) && t in e,
          keys: ()=>Object.keys(e).filter((e=>!n.has(e)))
      },K)),
      r
  }
  const n = {}
    , r = t.map((()=>({})));
  for (const o of Object.getOwnPropertyNames(e)) {
      const a = Object.getOwnPropertyDescriptor(e, o)
        , i = !a.get && !a.set && a.enumerable && a.writable && a.configurable;
      let s = !1
        , l = 0;
      for (const e of t)
          e.includes(o) && (s = !0,
          i ? r[l][o] = a.value : Object.defineProperty(r[l], o, a)),
          ++l;
      s || (i ? n[o] = a.value : Object.defineProperty(n, o, a))
  }
  return [...r, n]
}
let X = 0;
const Q = e=>`Stale read from <${e}>.`;
function ee(e) {
  const t = "fallback"in e && {
      fallback: ()=>e.fallback
  };
  return S(function(e, t, n={}) {
      let r = []
        , o = []
        , a = []
        , i = 0
        , s = t.length > 1 ? [] : null;
      return T((()=>F(a))),
      ()=>{
          let l, d, u = e() || [];
          return u[c],
          I((()=>{
              let e, t, c, h, f, g, m, b, v, y = u.length;
              if (0 === y)
                  0 !== i && (F(a),
                  a = [],
                  r = [],
                  o = [],
                  i = 0,
                  s && (s = [])),
                  n.fallback && (r = [V],
                  o[0] = _((e=>(a[0] = e,
                  n.fallback()))),
                  i = 1);
              else if (0 === i) {
                  for (o = new Array(y),
                  d = 0; d < y; d++)
                      r[d] = u[d],
                      o[d] = _(p);
                  i = y
              } else {
                  for (c = new Array(y),
                  h = new Array(y),
                  s && (f = new Array(y)),
                  g = 0,
                  m = Math.min(i, y); g < m && r[g] === u[g]; g++)
                      ;
                  for (m = i - 1,
                  b = y - 1; m >= g && b >= g && r[m] === u[b]; m--,
                  b--)
                      c[b] = o[m],
                      h[b] = a[m],
                      s && (f[b] = s[m]);
                  for (e = new Map,
                  t = new Array(b + 1),
                  d = b; d >= g; d--)
                      v = u[d],
                      l = e.get(v),
                      t[d] = void 0 === l ? -1 : l,
                      e.set(v, d);
                  for (l = g; l <= m; l++)
                      v = r[l],
                      d = e.get(v),
                      void 0 !== d && -1 !== d ? (c[d] = o[l],
                      h[d] = a[l],
                      s && (f[d] = s[l]),
                      d = t[d],
                      e.set(v, d)) : a[l]();
                  for (d = g; d < y; d++)
                      d in c ? (o[d] = c[d],
                      a[d] = h[d],
                      s && (s[d] = f[d],
                      s[d](d))) : o[d] = _(p);
                  o = o.slice(0, i = y),
                  r = u.slice(0)
              }
              return o
          }
          ));
          function p(e) {
              if (a[d] = e,
              s) {
                  const [e,n] = x(d);
                  return s[d] = n,
                  t(u[d], e)
              }
              return t(u[d])
          }
      }
  }((()=>e.each), e.children, t || void 0))
}
function te(e) {
  const t = e.keyed
    , n = S((()=>e.when), void 0, {
      equals: (e,n)=>t ? e === n : !e == !n
  });
  return S((()=>{
      const r = n();
      if (r) {
          const o = e.children;
          return "function" == typeof o && o.length > 0 ? I((()=>o(t ? r : ()=>{
              if (!I(n))
                  throw Q("Show");
              return e.when
          }
          ))) : o
      }
      return e.fallback
  }
  ), void 0, void 0)
}
function ne(e) {
  let t = !1;
  const n = E((()=>e.children))
    , r = S((()=>{
      let e = n();
      Array.isArray(e) || (e = [e]);
      for (let n = 0; n < e.length; n++) {
          const r = e[n].when;
          if (r)
              return t = !!e[n].keyed,
              [n, r, e[n]]
      }
      return [-1]
  }
  ), void 0, {
      equals: (e,n)=>e[0] === n[0] && (t ? e[1] === n[1] : !e[1] == !n[1]) && e[2] === n[2]
  });
  return S((()=>{
      const [n,o,a] = r();
      if (n < 0)
          return e.fallback;
      const i = a.children;
      return "function" == typeof i && i.length > 0 ? I((()=>i(t ? o : ()=>{
          if (I(r)[0] !== n)
              throw Q("Match");
          return a.when
      }
      ))) : i
  }
  ), void 0, void 0)
}
function re(e) {
  return e
}
const oe = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"])
, ae = new Set(["innerHTML", "textContent", "innerText", "children"])
, ie = Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
})
, se = Object.assign(Object.create(null), {
  class: "className",
  formnovalidate: {
      $: "formNoValidate",
      BUTTON: 1,
      INPUT: 1
  },
  ismap: {
      $: "isMap",
      IMG: 1
  },
  nomodule: {
      $: "noModule",
      SCRIPT: 1
  },
  playsinline: {
      $: "playsInline",
      VIDEO: 1
  },
  readonly: {
      $: "readOnly",
      INPUT: 1,
      TEXTAREA: 1
  }
});
const le = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
, ce = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
const de = "_$DX_DELEGATE";
function ue(e, t, n) {
  let r;
  const o = ()=>{
      const t = document.createElement("template");
      return t.innerHTML = e,
      n ? t.content.firstChild.firstChild : t.content.firstChild
  }
    , a = t ? ()=>I((()=>document.importNode(r || (r = o()), !0))) : ()=>(r || (r = o())).cloneNode(!0);
  return a.cloneNode = a,
  a
}
function pe(e, t=window.document) {
  const n = t[de] || (t[de] = new Set);
  for (let r = 0, o = e.length; r < o; r++) {
      const o = e[r];
      n.has(o) || (n.add(o),
      t.addEventListener(o, we))
  }
}
function he(e, t, n) {
  null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
}
function fe(e, t) {
  null == t ? e.removeAttribute("class") : e.className = t
}
function ge(e, t={}, n, r) {
  const o = {};
  return r || k((()=>o.children = _e(e, t.children, o.children))),
  k((()=>t.ref && t.ref(e))),
  k((()=>function(e, t, n, r, o={}, a=!1) {
      t || (t = {});
      for (const r in o)
          if (!(r in t)) {
              if ("children" === r)
                  continue;
              o[r] = ye(e, r, null, o[r], n, a)
          }
      for (const i in t) {
          if ("children" === i) {
              r || _e(e, t.children);
              continue
          }
          const s = t[i];
          o[i] = ye(e, i, s, o[i], n, a)
      }
  }(e, t, n, !0, o, !0))),
  o
}
function me(e, t, n) {
  return I((()=>e(t, n)))
}
function be(e, t, n, r) {
  if (void 0 === n || r || (r = []),
  "function" != typeof t)
      return _e(e, t, r, n);
  k((r=>_e(e, t(), r, n)), r)
}
function ve(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let t = 0, o = r.length; t < o; t++)
      e.classList.toggle(r[t], n)
}
function ye(e, t, n, r, o, a) {
  let i, s, l, c, d;
  if ("style" === t)
      return function(e, t, n) {
          if (!t)
              return n ? he(e, "style") : t;
          const r = e.style;
          if ("string" == typeof t)
              return r.cssText = t;
          let o, a;
          for (a in "string" == typeof n && (r.cssText = n = void 0),
          n || (n = {}),
          t || (t = {}),
          n)
              null == t[a] && r.removeProperty(a),
              delete n[a];
          for (a in t)
              o = t[a],
              o !== n[a] && (r.setProperty(a, o),
              n[a] = o);
          return n
      }(e, n, r);
  if ("classList" === t)
      return function(e, t, n={}) {
          const r = Object.keys(t || {})
            , o = Object.keys(n);
          let a, i;
          for (a = 0,
          i = o.length; a < i; a++) {
              const r = o[a];
              r && "undefined" !== r && !t[r] && (ve(e, r, !1),
              delete n[r])
          }
          for (a = 0,
          i = r.length; a < i; a++) {
              const o = r[a]
                , i = !!t[o];
              o && "undefined" !== o && n[o] !== i && i && (ve(e, o, !0),
              n[o] = i)
          }
          return n
      }(e, n, r);
  if (n === r)
      return r;
  if ("ref" === t)
      a || n(e);
  else if ("on:" === t.slice(0, 3)) {
      const o = t.slice(3);
      r && e.removeEventListener(o, r),
      n && e.addEventListener(o, n)
  } else if ("oncapture:" === t.slice(0, 10)) {
      const o = t.slice(10);
      r && e.removeEventListener(o, r, !0),
      n && e.addEventListener(o, n, !0)
  } else if ("on" === t.slice(0, 2)) {
      const o = t.slice(2).toLowerCase()
        , a = le.has(o);
      if (!a && r) {
          const t = Array.isArray(r) ? r[0] : r;
          e.removeEventListener(o, t)
      }
      (a || n) && (!function(e, t, n, r) {
          if (r)
              Array.isArray(n) ? (e[`$$ ${t}`] = n[0],
              e[`$$ ${t}Data`] = n[1]) : e[`$$ ${t}`] = n;
          else if (Array.isArray(n)) {
              const r = n[0];
              e.addEventListener(t, n[0] = t=>r.call(e, n[1], t))
          } else
              e.addEventListener(t, n)
      }(e, o, n, a),
      a && pe([o]))
  } else if ("attr:" === t.slice(0, 5))
      he(e, t.slice(5), n);
  else if ((d = "prop:" === t.slice(0, 5)) || (l = ae.has(t)) || !o && ((c = function(e, t) {
      const n = se[e];
      return "object" == typeof n ? n[t] ? n.$ : void 0 : n
  }(t, e.tagName)) || (s = oe.has(t))) || (i = e.nodeName.includes("-")))
      d && (t = t.slice(5),
      s = !0),
      "class" === t || "className" === t ? fe(e, n) : !i || s || l ? e[c || t] = n : e[(u = t,
      u.toLowerCase().replace(/-([a-z])/g, ((e,t)=>t.toUpperCase())))] = n;
  else {
      const r = o && t.indexOf(":") > -1 && ce[t.split(":")[0]];
      r ? function(e, t, n, r) {
          null == r ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
      }(e, r, t, n) : he(e, ie[t] || t, n)
  }
  var u;
  return n
}
function we(e) {
  const t = `$$ ${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
      configurable: !0,
      value: n
  }),
  Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get: ()=>n || document
  }); n; ) {
      const r = n[t];
      if (r && !n.disabled) {
          const o = n[`${t}Data`];
          if (void 0 !== o ? r.call(n, o, e) : r.call(n, e),
          e.cancelBubble)
              return
      }
      n = n._$host || n.parentNode || n.host
  }
}
function _e(e, t, n, r, o) {
  for (; "function" == typeof n; )
      n = n();
  if (t === n)
      return n;
  const a = typeof t
    , i = void 0 !== r;
  if (e = i && n[0] && n[0].parentNode || e,
  "string" === a || "number" === a)
      if ("number" === a && (t = t.toString()),
      i) {
          let o = n[0];
          o && 3 === o.nodeType ? o.data = t : o = document.createTextNode(t),
          n = Ce(e, n, r, o)
      } else
          n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
  else if (null == t || "boolean" === a)
      n = Ce(e, n, r);
  else {
      if ("function" === a)
          return k((()=>{
              let o = t();
              for (; "function" == typeof o; )
                  o = o();
              n = _e(e, o, n, r)
          }
          )),
          ()=>n;
      if (Array.isArray(t)) {
          const a = []
            , s = n && Array.isArray(n);
          if (xe(a, t, n, o))
              return k((()=>n = _e(e, a, n, r, !0))),
              ()=>n;
          if (0 === a.length) {
              if (n = Ce(e, n, r),
              i)
                  return n
          } else
              s ? 0 === n.length ? ke(e, a, r) : function(e, t, n) {
                  let r = n.length
                    , o = t.length
                    , a = r
                    , i = 0
                    , s = 0
                    , l = t[o - 1].nextSibling
                    , c = null;
                  for (; i < o || s < a; )
                      if (t[i] !== n[s]) {
                          for (; t[o - 1] === n[a - 1]; )
                              o--,
                              a--;
                          if (o === i) {
                              const t = a < r ? s ? n[s - 1].nextSibling : n[a - s] : l;
                              for (; s < a; )
                                  e.insertBefore(n[s++], t)
                          } else if (a === s)
                              for (; i < o; )
                                  c && c.has(t[i]) || t[i].remove(),
                                  i++;
                          else if (t[i] === n[a - 1] && n[s] === t[o - 1]) {
                              const r = t[--o].nextSibling;
                              e.insertBefore(n[s++], t[i++].nextSibling),
                              e.insertBefore(n[--a], r),
                              t[o] = n[a]
                          } else {
                              if (!c) {
                                  c = new Map;
                                  let e = s;
                                  for (; e < a; )
                                      c.set(n[e], e++)
                              }
                              const r = c.get(t[i]);
                              if (null != r)
                                  if (s < r && r < a) {
                                      let l, d = i, u = 1;
                                      for (; ++d < o && d < a && null != (l = c.get(t[d])) && l === r + u; )
                                          u++;
                                      if (u > r - s) {
                                          const o = t[i];
                                          for (; s < r; )
                                              e.insertBefore(n[s++], o)
                                      } else
                                          e.replaceChild(n[s++], t[i++])
                                  } else
                                      i++;
                              else
                                  t[i++].remove()
                          }
                      } else
                          i++,
                          s++
              }(e, n, a) : (n && Ce(e),
              ke(e, a));
          n = a
      } else if (t.nodeType) {
          if (Array.isArray(n)) {
              if (i)
                  return n = Ce(e, n, r, t);
              Ce(e, n, null, t)
          } else
              null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
          n = t
      } else
          console.warn("Unrecognized value. Skipped inserting", t)
  }
  return n
}
function xe(e, t, n, r) {
  let o = !1;
  for (let a = 0, i = t.length; a < i; a++) {
      let i, s = t[a], l = n && n[a];
      if (null == s || !0 === s || !1 === s)
          ;
      else if ("object" == (i = typeof s) && s.nodeType)
          e.push(s);
      else if (Array.isArray(s))
          o = xe(e, s, l) || o;
      else if ("function" === i)
          if (r) {
              for (; "function" == typeof s; )
                  s = s();
              o = xe(e, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || o
          } else
              e.push(s),
              o = !0;
      else {
          const t = String(s);
          l && 3 === l.nodeType && l.data === t ? e.push(l) : e.push(document.createTextNode(t))
      }
  }
  return o
}
function ke(e, t, n=null) {
  for (let r = 0, o = t.length; r < o; r++)
      e.insertBefore(t[r], n)
}
function Ce(e, t, n, r) {
  if (void 0 === n)
      return e.textContent = "";
  const o = r || document.createTextNode("");
  if (t.length) {
      let r = !1;
      for (let a = t.length - 1; a >= 0; a--) {
          const i = t[a];
          if (o !== i) {
              const t = i.parentNode === e;
              r || a ? t && i.remove() : t ? e.replaceChild(o, i) : e.insertBefore(o, n)
          } else
              r = !0
      }
  } else
      e.insertBefore(o, n);
  return [o]
}
function Se(e) {
  return (t,n)=>{
      const {element: r} = n;
      return _((o=>{
          const a = function(e) {
              const t = Object.keys(e)
                , n = {};
              for (let r = 0; r < t.length; r++) {
                  const [o,a] = x(e[t[r]]);
                  Object.defineProperty(n, t[r], {
                      get: o,
                      set(e) {
                          a((()=>e))
                      }
                  })
              }
              return n
          }(t);
          r.addPropertyChangedCallback(((e,t)=>a[e] = t)),
          r.addReleaseCallback((()=>{
              r.renderRoot.textContent = "",
              o()
          }
          ));
          const i = e(a, n);
          return be(r.renderRoot, i)
      }
      ), function(e) {
          if (e.assignedSlot && e.assignedSlot._$owner)
              return e.assignedSlot._$owner;
          let t = e.parentNode;
          for (; t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner); )
              t = t.parentNode;
          return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner
      }(r))
  }
}
function Ie(e, t, n) {
  return 2 === arguments.length && (n = t,
  t = {}),
  i(e, t)(Se(n))
}
const $e = {
  typebot: void 0,
  onNewInputBlock: void 0,
  onAnswer: void 0,
  onEnd: void 0,
  onInit: void 0,
  onNewLogs: void 0,
  isPreview: void 0,
  startGroupId: void 0,
  prefilledVariables: void 0,
  apiHost: void 0,
  resultId: void 0
}
, Te = {
  ...$e,
  onClose: void 0,
  onOpen: void 0,
  theme: void 0,
  autoShowDelay: void 0,
  isOpen: void 0,
  defaultOpen: void 0
}
, Ee = {
  ...$e,
  onClose: void 0,
  onOpen: void 0,
  theme: void 0,
  previewMessage: void 0,
  onPreviewMessageClick: void 0,
  autoShowDelay: void 0
};
var Pe = '/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-right-1{right:-4px}.-right-2{right:-8px}.-top-2{top:-8px}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.bottom-5{bottom:20px}.left-0{left:0}.left-5{left:20px}.right-0{right:0}.right-5{right:20px}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.m-2{margin:8px}.m-auto{margin:auto}.mx-4{margin-left:16px;margin-right:16px}.my-2{margin-bottom:8px;margin-top:8px}.-mr-1{margin-right:-4px}.-mt-1{margin-top:-4px}.mb-3{margin-bottom:12px}.ml-2{margin-left:8px}.mt-1{margin-top:4px}.mt-4{margin-top:16px}.\\!block{display:block!important}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-2\\.5{height:10px}.h-3{height:12px}.h-32{height:128px}.h-4{height:16px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-8{height:32px}.h-9{height:36px}.h-\\[80vh\\]{height:80vh}.h-\\[90\\%\\]{height:90%}.h-full{height:100%}.max-h-80{max-height:320px}.max-h-\\[464px\\]{max-height:464px}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-3{width:12px}.w-4{width:16px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-8{width:32px}.w-9{width:36px}.w-\\[90\\%\\]{width:90%}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\\[256px\\]{max-width:256px}.max-w-full{max-width:100%}.max-w-lg{max-width:512px}.max-w-xs{max-width:320px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.text-ellipsis{text-overflow:ellipsis}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.rounded-md{border-radius:6px}.border{border-width:1px}.border-2{border-width:2px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:4px}.p-4{padding:16px}.px-1{padding-left:4px;padding-right:4px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-8{padding-left:32px;padding-right:32px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.py-6{padding-bottom:24px;padding-top:24px}.pb-0{padding-bottom:0}.pl-2{padding-left:8px}.pl-4{padding-left:16px}.pr-1{padding-right:4px}.pr-2{padding-right:8px}.pr-4{padding-right:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:24px;line-height:32px}.text-4xl{font-size:36px;line-height:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.brightness-150{--tw-brightness:brightness(1.5)}.brightness-150,.brightness-200{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.brightness-200{--tw-brightness:brightness(2)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--typebot-container-bg-image:none;--typebot-container-bg-color:transparent;--typebot-container-font-family:"Open Sans";--typebot-container-color:#303235;--typebot-button-bg-color:#0042da;--typebot-button-bg-color-rgb:0,66,218;--typebot-button-color:#fff;--typebot-checkbox-bg-color:#fff;--typebot-host-bubble-bg-color:#f7f8ff;--typebot-host-bubble-color:#303235;--typebot-guest-bubble-bg-color:#ff8e21;--typebot-guest-bubble-color:#fff;--typebot-input-bg-color:#fff;--typebot-input-color:#303235;--typebot-input-placeholder-color:#9095a0;--typebot-header-bg-color:#fff;--typebot-header-color:#303235;--selectable-base-alpha:0;--typebot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--typebot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(2.5)}50%{transform:translateY(-2.5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.typebot-container{background-color:var(--typebot-container-bg-color);background-image:var(--typebot-container-bg-image);font-family:var(--typebot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.typebot-button{background-color:var(--typebot-button-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease}.typebot-button.selectable{background-color:var(--typebot-host-bubble-bg-color);border:1px solid var(--typebot-button-bg-color);color:var(--typebot-host-bubble-color)}.typebot-selectable{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease}.typebot-selectable:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}.typebot-checkbox{background-color:var(--typebot-checkbox-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);border-radius:2px;color:var(--typebot-button-color);padding:1px;transition:all .3s ease}.typebot-checkbox.checked{background-color:var(--typebot-button-bg-color)}.typebot-host-bubble{color:var(--typebot-host-bubble-color)}.typebot-host-bubble>.bubble-typing{background-color:var(--typebot-host-bubble-bg-color);border:var(--typebot-host-bubble-border);border-radius:6px}.typebot-host-bubble iframe,.typebot-host-bubble img,.typebot-host-bubble video{border-radius:var(--typebot-border-radius)}.typebot-guest-bubble{background-color:var(--typebot-guest-bubble-bg-color);border-radius:6px;color:var(--typebot-guest-bubble-color)}.typebot-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.typebot-input,.typebot-input-error-message{color:var(--typebot-input-color)}.typebot-button>.send-icon{fill:var(--typebot-button-color)}.typebot-chat-view{max-width:800px}.ping span{background-color:var(--typebot-button-bg-color)}.rating-icon-container svg{stroke:var(--typebot-button-bg-color);fill:var(--typebot-host-bubble-bg-color);height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:var(--typebot-button-bg-color)}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{border-radius:var(--typebot-border-radius)}.total-files-indicator,.upload-progress-bar{background-color:var(--typebot-button-bg-color)}.total-files-indicator{color:var(--typebot-button-color);font-size:10px}.typebot-upload-input{border-radius:var(--typebot-border-radius);transition:border-color .1s ease-out}.typebot-upload-input.dragging-over{border-color:var(--typebot-button-bg-color)}.secondary-button{background-color:var(--typebot-host-bubble-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-host-bubble-color)}.typebot-country-select{color:var(--typebot-input-color)}.typebot-country-select,.typebot-date-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius)}.typebot-date-input{color:var(--typebot-input-color);color-scheme:light}.typebot-popup-blocked-toast{border-radius:var(--typebot-border-radius)}.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.typebot-picture-button{background-color:var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease;width:236px}.typebot-picture-button>img,.typebot-selectable-picture>img{border-radius:var(--typebot-border-radius) var(--typebot-border-radius) 0 0;height:100%;max-height:200px;min-width:200px;-o-object-fit:cover;object-fit:cover;width:100%}.typebot-picture-button.has-svg>img,.typebot-selectable-picture.has-svg>img{max-height:128px;-o-object-fit:contain;object-fit:contain;padding:1rem}.typebot-selectable-picture{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease;width:236px}.typebot-selectable-picture:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable-picture.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}select option{background-color:var(--typebot-input-bg-color);color:var(--typebot-input-color)}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9)}.hover\\:brightness-90:hover,.hover\\:brightness-95:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:brightness-95:hover{--tw-brightness:brightness(.95)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75)}.active\\:brightness-75:active,.active\\:brightness-90:active{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:left-5{left:20px}.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}';
let Ae = function(e) {
  return e.TEXT = "text input",
  e.NUMBER = "number input",
  e.EMAIL = "email input",
  e.URL = "url input",
  e.DATE = "date input",
  e.PHONE = "phone number input",
  e.CHOICE = "choice input",
  e.PICTURE_CHOICE = "picture choice input",
  e.PAYMENT = "payment input",
  e.RATING = "rating input",
  e.FILE = "file input",
  e
}({})
, Oe = function(e) {
  return e.TEXT = "text",
  e.IMAGE = "image",
  e.VIDEO = "video",
  e.EMBED = "embed",
  e.AUDIO = "audio",
  e
}({})
, Ne = function(e) {
  return e.SET_VARIABLE = "Set variable",
  e.CONDITION = "Condition",
  e.REDIRECT = "Redirect",
  e.SCRIPT = "Code",
  e.TYPEBOT_LINK = "Typebot link",
  e.WAIT = "Wait",
  e.JUMP = "Jump",
  e.AB_TEST = "AB test",
  e
}({});
const Me = async e=>{
  try {
      const t = "string" == typeof e ? e : e.url
        , n = await fetch(t, {
          method: "string" == typeof e ? "GET" : e.method,
          mode: "cors",
          headers: "string" != typeof e && je(e.body) ? {
              "Content-Type": "application/json"
          } : void 0,
          body: "string" != typeof e && je(e.body) ? JSON.stringify(e.body) : void 0
      })
        , r = await n.json();
      if (!n.ok)
          throw "error"in r ? r.error : r;
      return {
          data: r
      }
  } catch (e) {
      return console.error(e),
      {
          error: e
      }
  }
}
, je = e=>null != e
, Le = e=>null == e
, Re = e=>null == e || "" === e
, Ze = e=>null != e && "" !== e
, Be = async({basePath: e="/api", files: t, onUploadProgress: n})=>{
  const r = [];
  let o = 0;
  for (const {file: a, path: i} of t) {
      n && n(o / t.length * 100),
      o += 1;
      const {data: s} = await Me(`${e}/storage/upload-url?filePath=${encodeURIComponent(i)}&fileType=${a.type}`);
      if (!s?.presignedUrl)
          continue;
      const {url: l, fields: c} = s.presignedUrl;
      if (s.hasReachedStorageLimit)
          r.push(null);
      else {
          const e = new FormData;
          Object.entries({
              ...c,
              file: a
          }).forEach((([t,n])=>{
              e.append(t, n)
          }
          ));
          if (!(await fetch(l, {
              method: "POST",
              body: e
          })).ok)
              continue;
          r.push(`${l.split("?")[0]}/${i}`)
      }
  }
  return r
}
, ze = (e="")=>"undefined" == typeof window ? Re(process.env["NEXT_PUBLIC_" + e]) ? void 0 : process.env["NEXT_PUBLIC_" + e] : "undefined" != typeof window && window.__env ? Re(window.__env[e]) ? void 0 : window.__env[e] : void 0
, De = e=>e?.startsWith("data:image/svg") || e?.endsWith(".svg")
, Ue = e=>{
  e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, ((e,t,n,r)=>t + t + n + n + r + r));
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
}
, Ve = e=>(([e,t,n])=>(299 * e + 587 * t + 114 * n) / 1e3 > 155)(Ue(e));
function Fe(e) {
  var t, n, r = "";
  if ("string" == typeof e || "number" == typeof e)
      r += e;
  else if ("object" == typeof e)
      if (Array.isArray(e))
          for (t = 0; t < e.length; t++)
              e[t] && (n = Fe(e[t])) && (r && (r += " "),
              r += n);
      else
          for (t in e)
              e[t] && (r && (r += " "),
              r += t);
  return r
}
function Ge() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
      (e = arguments[n++]) && (t = Fe(e)) && (r && (r += " "),
      r += t);
  return r
}
const He = ue('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">')
, Ke = ue('<img part="button-icon" alt="Bubble button icon">')
, qe = ue("<span>")
, We = ue('<svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">')
, Ye = ue('<img part="button-icon" alt="Bubble button close icon">')
, Je = ue('<button part="button">')
, Xe = "#0042DA"
, Qe = "#27272A"
, et = "#fff"
, tt = e=>e.startsWith("http") || e.startsWith("data:image/svg+xml")
, nt = e=>(()=>{
  const t = Je();
  return t.$$click = ()=>e.toggleBot(),
  t.style.setProperty("z-index", "42424242"),
  be(t, G(te, {
      get when() {
          return Le(e.customIconSrc)
      },
      keyed: !0,
      get children() {
          const t = He();
          return k((n=>{
              const r = e.iconColor ?? (Ve(e.backgroundColor ?? Xe) ? Qe : et)
                , o = Ge("stroke-2 fill-transparent absolute duration-200 transition", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100", "large" === e.size ? "w-9" : "w-7");
              return r !== n._v$ && (null != (n._v$ = r) ? t.style.setProperty("stroke", r) : t.style.removeProperty("stroke")),
              o !== n._v$2 && he(t, "class", n._v$2 = o),
              n
          }
          ), {
              _v$: void 0,
              _v$2: void 0
          }),
          t
      }
  }), null),
  be(t, G(te, {
      get when() {
          return S((()=>!!e.customIconSrc))() && tt(e.customIconSrc)
      },
      get children() {
          const t = Ke();
          return k((n=>{
              const r = e.customIconSrc
                , o = Ge("duration-200 transition", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100", De(e.customIconSrc) ? "large" === e.size ? "w-9 h-9" : "w-7 h-7" : "w-[90%] h-[90%]", De(e.customIconSrc) ? "" : "object-cover rounded-full");
              return r !== n._v$3 && he(t, "src", n._v$3 = r),
              o !== n._v$4 && fe(t, n._v$4 = o),
              n
          }
          ), {
              _v$3: void 0,
              _v$4: void 0
          }),
          t
      }
  }), null),
  be(t, G(te, {
      get when() {
          return S((()=>!!e.customIconSrc))() && !tt(e.customIconSrc)
      },
      get children() {
          const t = qe();
          return t.style.setProperty("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"),
          be(t, (()=>e.customIconSrc)),
          k((()=>fe(t, Ge("text-4xl duration-200 transition", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100")))),
          t
      }
  }), null),
  be(t, G(te, {
      get when() {
          return Le(e.customCloseIconSrc)
      },
      get children() {
          const t = We();
          return k((n=>{
              const r = e.iconColor ?? (Ve(e.backgroundColor ?? Xe) ? Qe : et)
                , o = Ge("absolute duration-200 transition", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0", "large" === e.size ? " w-9" : " w-7");
              return r !== n._v$5 && (null != (n._v$5 = r) ? t.style.setProperty("fill", r) : t.style.removeProperty("fill")),
              o !== n._v$6 && he(t, "class", n._v$6 = o),
              n
          }
          ), {
              _v$5: void 0,
              _v$6: void 0
          }),
          t
      }
  }), null),
  be(t, G(te, {
      get when() {
          return S((()=>!!e.customCloseIconSrc))() && tt(e.customCloseIconSrc)
      },
      get children() {
          const t = Ye();
          return k((n=>{
              const r = e.customCloseIconSrc
                , o = Ge("absolute duration-200 transition", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0", De(e.customCloseIconSrc) ? "large" === e.size ? "w-9 h-9" : "w-7 h-7" : "w-[90%] h-[90%]", De(e.customCloseIconSrc) ? "" : "object-cover rounded-full");
              return r !== n._v$7 && he(t, "src", n._v$7 = r),
              o !== n._v$8 && fe(t, n._v$8 = o),
              n
          }
          ), {
              _v$7: void 0,
              _v$8: void 0
          }),
          t
      }
  }), null),
  be(t, G(te, {
      get when() {
          return S((()=>!!e.customCloseIconSrc))() && !tt(e.customCloseIconSrc)
      },
      get children() {
          const t = qe();
          return t.style.setProperty("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"),
          be(t, (()=>e.customCloseIconSrc)),
          k((()=>fe(t, Ge("absolute text-4xl duration-200 transition", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0")))),
          t
      }
  }), null),
  k((n=>{
      const r = Ge("fixed bottom-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in", "large" === e.size ? " w-16 h-16" : " w-12 h-12", "left" === e.placement ? " left-5" : " right-5")
        , o = e.backgroundColor ?? Xe;
      return r !== n._v$9 && fe(t, n._v$9 = r),
      o !== n._v$10 && (null != (n._v$10 = o) ? t.style.setProperty("background-color", o) : t.style.removeProperty("background-color")),
      n
  }
  ), {
      _v$9: void 0,
      _v$10: void 0
  }),
  t
}
)();
pe(["click"]);
const rt = ue('<div part="preview-message"><p>')
, ot = ue('<img class="rounded-full w-8 h-8 object-cover" alt="Bot avatar" elementtiming="Bot avatar" fetchpriority="high">')
, at = ue('<button part="preview-message-close-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">')
, it = "#F7F8FF"
, st = "#303235"
, lt = e=>{
  const [t,n] = x(!1);
  return (()=>{
      const r = rt()
        , o = r.firstChild;
      return r.addEventListener("mouseleave", (()=>n(!1))),
      r.addEventListener("mouseenter", (()=>n(!0))),
      r.$$click = ()=>e.onClick(),
      r.style.setProperty("z-index", "42424242"),
      be(r, G(ct, {
          get isHovered() {
              return t()
          },
          get previewMessageTheme() {
              return e.previewMessageTheme
          },
          get onClick() {
              return e.onCloseClick
          }
      }), o),
      be(r, G(te, {
          get when() {
              return e.avatarUrl
          },
          keyed: !0,
          children: e=>(()=>{
              const t = ot();
              return he(t, "src", e),
              t
          }
          )()
      }), o),
      be(o, (()=>e.message)),
      k((t=>{
          const n = "fixed max-w-[256px] rounded-md duration-200 flex items-center gap-4 shadow-md animate-fade-in cursor-pointer hover:shadow-lg p-4" + ("large" === e.buttonSize ? " bottom-24" : " bottom-20") + ("left" === e.placement ? " left-5" : " right-5")
            , o = e.previewMessageTheme?.backgroundColor ?? it
            , a = e.previewMessageTheme?.textColor ?? st;
          return n !== t._v$ && fe(r, t._v$ = n),
          o !== t._v$2 && (null != (t._v$2 = o) ? r.style.setProperty("background-color", o) : r.style.removeProperty("background-color")),
          a !== t._v$3 && (null != (t._v$3 = a) ? r.style.setProperty("color", a) : r.style.removeProperty("color")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
      }),
      r
  }
  )()
}
, ct = e=>(()=>{
  const t = at();
  return t.$$click = t=>(t.stopPropagation(),
  e.onClick()),
  k((n=>{
      const r = "absolute -top-2 -right-2 rounded-full w-6 h-6 p-1 hover:brightness-95 active:brightness-90 transition-all border " + (e.isHovered ? "opacity-100" : "opacity-0")
        , o = e.previewMessageTheme?.closeButtonBackgroundColor ?? it
        , a = e.previewMessageTheme?.closeButtonIconColor ?? st;
      return r !== n._v$4 && fe(t, n._v$4 = r),
      o !== n._v$5 && (null != (n._v$5 = o) ? t.style.setProperty("background-color", o) : t.style.removeProperty("background-color")),
      a !== n._v$6 && (null != (n._v$6 = a) ? t.style.setProperty("color", a) : t.style.removeProperty("color")),
      n
  }
  ), {
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0
  }),
  t
}
)();
pe(["click"]);
const dt = ue('<svg viewBox="0 0 800 800" width="16"><rect width="800" height="800" rx="80" fill="#0042DA"></rect><rect x="650" y="293" width="85.4704" height="384.617" rx="20" transform="rotate(90 650 293)" fill="#FF8E20"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M192.735 378.47C216.337 378.47 235.47 359.337 235.47 335.735C235.47 312.133 216.337 293 192.735 293C169.133 293 150 312.133 150 335.735C150 359.337 169.133 378.47 192.735 378.47Z" fill="#FF8E20"></path><rect x="150" y="506.677" width="85.4704" height="384.617" rx="20" transform="rotate(-90 150 506.677)" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M607.265 421.206C583.663 421.206 564.53 440.34 564.53 463.942C564.53 487.544 583.663 506.677 607.265 506.677C630.867 506.677 650 487.544 650 463.942C650 440.34 630.867 421.206 607.265 421.206Z" fill="white">')
, ut = ()=>dt()
, pt = ue('<a href="https://www.typebot.io/?utm_source=litebadge" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span>Made with Typebot')
, ht = e=>{
  let t, n;
  const r = n=>{
      n.forEach((n=>{
          n.removedNodes.forEach((n=>{
              "id"in n && t && "lite-badge" == n.id && (console.log("Sorry, you can't remove the brand 😅"),
              e.botContainer?.append(t))
          }
          ))
      }
      ))
  }
  ;
  return $((()=>{
      document && e.botContainer && (n = new MutationObserver(r),
      n.observe(e.botContainer, {
          subtree: !1,
          childList: !0
      }))
  }
  )),
  T((()=>{
      n && n.disconnect()
  }
  )),
  (()=>{
      const e = pt()
        , n = e.firstChild;
      return "function" == typeof t ? me(t, e) : t = e,
      be(e, G(ut, {}), n),
      e
  }
  )()
}
// , ft = ()=>ze("VIEWER_INTERNAL_URL") ?? ze("VIEWER_URL")?.split(",")[0] ?? "https://viewer.typebot.io"
, ft = ()=>ze("VIEWER_INTERNAL_URL") ?? ze("VIEWER_URL")?.split(",")[0] ?? "https://bot.xfiv.chat"
, gt = ()=>sessionStorage.getItem("typebotPaymentInProgress")
, mt = ()=>{
  sessionStorage.removeItem("typebotPaymentInProgress")
}
;
const [bt,vt] = x()
, yt = ue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">')
, wt = e=>(()=>{
  const t = yt();
  return ge(t, e, !0, !0),
  t
}
)()
, _t = ue('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">')
, xt = e=>(()=>{
  const t = _t();
  return ge(t, Y(e, {
      get class() {
          return "animate-spin h-6 w-6 " + e.class
      },
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "data-testid": "loading-spinner"
  }), !0, !0),
  t
}
)()
, kt = ue("<button>")
, Ct = e=>{
  const t = E((()=>e.children))
    , [n,r] = J(e, ["disabled", "class"]);
  return (()=>{
      const o = kt();
      return ge(o, Y(r, {
          get disabled() {
              return e.isDisabled || e.isLoading
          },
          get class() {
              return "py-2 px-4 font-semibold focus:outline-none filter hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 flex justify-center" + ("secondary" === e.variant ? " secondary-button" : " typebot-button") + " " + n.class
          }
      }), !1, !0),
      be(o, G(te, {
          get when() {
              return !e.isLoading
          },
          get fallback() {
              return G(xt, {})
          },
          get children() {
              return t()
          }
      })),
      o
  }
  )()
}
, St = e=>{
  const [t,n] = J(e, ["disableIcon"]);
  return G(Ct, Y({
      type: "submit"
  }, n, {
      get children() {
          return S((()=>!!(bt() && !t.disableIcon || "string" == typeof e.children && Re(e.children))))() ? G(wt, {
              get class() {
                  return "send-icon flex " + (t.disableIcon ? "hidden" : "")
              }
          }) : e.children
      }
  }))
}
, It = ue('<div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bubble1"></div><div class="w-2 h-2 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">')
, $t = ()=>It()
, Tt = ue('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">')
, Et = e=>{
  const [t,n] = J(e, ["ref", "onInput"]);
  return (()=>{
      const r = Tt();
      r.$$input = e=>t.onInput(e.currentTarget.value);
      const o = e.ref;
      return "function" == typeof o ? me(o, r) : e.ref = r,
      r.style.setProperty("font-size", "16px"),
      ge(r, n, !1, !1),
      r
  }
  )()
}
;
pe(["input"]);
const Pt = ue('<textarea class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" rows="6" data-testid="textarea" required>')
, At = e=>{
  const [t,n] = J(e, ["ref", "onInput"]);
  return (()=>{
      const e = Pt();
      e.$$input = e=>t.onInput(e.currentTarget.value);
      const r = t.ref;
      return "function" == typeof r ? me(r, e) : t.ref = e,
      e.style.setProperty("font-size", "16px"),
      ge(e, Y({
          get autofocus() {
              return !bt()
          }
      }, n), !1, !1),
      e
  }
  )()
}
;
pe(["input"]);
const Ot = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><audio controls>');
let Nt;
const Mt = e=>{
  let t, n, r = !1;
  const [o,a] = x(!0);
  return $((()=>{
      Nt = setTimeout((()=>{
          r || (r = !0,
          a(!1),
          setTimeout((()=>e.onTransitionEnd(t?.offsetTop)), 400))
      }
      ), 100)
  }
  )),
  T((()=>{
      Nt && clearTimeout(Nt)
  }
  )),
  (()=>{
      const r = Ot()
        , a = r.firstChild.firstChild.firstChild
        , i = a.nextSibling;
      "function" == typeof t ? me(t, r) : t = r,
      be(a, (()=>{
          const e = S((()=>!!o()));
          return ()=>e() && G($t, {})
      }
      )());
      return "function" == typeof n ? me(n, i) : n = i,
      k((t=>{
          const n = o() ? "64px" : "100%"
            , r = o() ? "32px" : "100%"
            , s = e.content.url
            , l = e.content.isAutoplayEnabled ?? !0
            , c = "z-10 text-fade-in " + (o() ? "opacity-0" : "opacity-100 m-2")
            , d = o() ? bt() ? "32px" : "36px" : "revert";
          return n !== t._v$ && (null != (t._v$ = n) ? a.style.setProperty("width", n) : a.style.removeProperty("width")),
          r !== t._v$2 && (null != (t._v$2 = r) ? a.style.setProperty("height", r) : a.style.removeProperty("height")),
          s !== t._v$3 && he(i, "src", t._v$3 = s),
          l !== t._v$4 && (i.autoplay = t._v$4 = l),
          c !== t._v$5 && fe(i, t._v$5 = c),
          d !== t._v$6 && (null != (t._v$6 = d) ? i.style.setProperty("height", d) : i.style.removeProperty("height")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0,
          _v$6: void 0
      }),
      r
  }
  )()
}
, jt = ue('<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><iframe id="embed-bubble-content" class="w-full h-full ">');
let Lt;
const Rt = e=>{
  let t;
  const [n,r] = x(!0);
  return $((()=>{
      Lt = setTimeout((()=>{
          r(!1),
          setTimeout((()=>{
              e.onTransitionEnd(t?.offsetTop)
          }
          ), 400)
      }
      ), 2e3)
  }
  )),
  T((()=>{
      Lt && clearTimeout(Lt)
  }
  )),
  (()=>{
      const r = jt()
        , o = r.firstChild.firstChild.firstChild
        , a = o.nextSibling
        , i = a.firstChild;
      return "function" == typeof t ? me(t, r) : t = r,
      be(o, (()=>{
          const e = S((()=>!!n()));
          return ()=>e() && G($t, {})
      }
      )()),
      k((t=>{
          const r = n() ? "64px" : "100%"
            , s = n() ? "32px" : "100%"
            , l = Ge("p-4 z-20 text-fade-in w-full", n() ? "opacity-0" : "opacity-100 p-4")
            , c = n() ? bt() ? "32px" : "36px" : `${e.content.height}px`
            , d = e.content.url;
          return r !== t._v$ && (null != (t._v$ = r) ? o.style.setProperty("width", r) : o.style.removeProperty("width")),
          s !== t._v$2 && (null != (t._v$2 = s) ? o.style.setProperty("height", s) : o.style.removeProperty("height")),
          l !== t._v$3 && fe(a, t._v$3 = l),
          c !== t._v$4 && (null != (t._v$4 = c) ? a.style.setProperty("height", c) : a.style.removeProperty("height")),
          d !== t._v$5 && he(i, "src", t._v$5 = d),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
      }),
      r
  }
  )()
}
, Zt = ue('<img elementtiming="Bubble image" fetchpriority="high">')
, Bt = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">')
, zt = ue('<a target="_blank">')
, Dt = ue("<figure>");
let Ut;
const Vt = e=>{
  let t, n;
  const [r,o] = x(!0)
    , a = ()=>{
      r() && (o(!1),
      setTimeout((()=>{
          e.onTransitionEnd(t?.offsetTop)
      }
      ), 400))
  }
  ;
  $((()=>{
      n && (Ut = setTimeout(a, 5e3),
      n.onload = ()=>{
          clearTimeout(Ut),
          a()
      }
      )
  }
  )),
  T((()=>{
      Ut && clearTimeout(Ut)
  }
  ));
  const i = (()=>{
      const t = Zt();
      return "function" == typeof n ? me(n, t) : n = t,
      t.style.setProperty("max-height", "512px"),
      k((n=>{
          const o = e.content.url
            , a = e.content.clickLink?.alt ?? "Bubble image"
            , i = "text-fade-in w-full " + (r() ? "opacity-0" : "opacity-100")
            , s = r() ? "32px" : "auto";
          return o !== n._v$ && he(t, "src", n._v$ = o),
          a !== n._v$2 && he(t, "alt", n._v$2 = a),
          i !== n._v$3 && fe(t, n._v$3 = i),
          s !== n._v$4 && (null != (n._v$4 = s) ? t.style.setProperty("height", s) : t.style.removeProperty("height")),
          n
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
      }),
      t
  }
  )();
  return (()=>{
      const n = Bt()
        , o = n.firstChild.firstChild
        , a = o.firstChild;
      return "function" == typeof t ? me(t, n) : t = n,
      be(a, (()=>{
          const e = S((()=>!!r()));
          return ()=>e() ? G($t, {}) : null
      }
      )()),
      be(o, (()=>{
          const t = S((()=>!!e.content.clickLink));
          return ()=>t() ? (()=>{
              const t = zt();
              return be(t, i),
              k((n=>{
                  const o = e.content.clickLink.url
                    , a = Ge("z-10", r() ? "h-8" : "p-4");
                  return o !== n._v$7 && he(t, "href", n._v$7 = o),
                  a !== n._v$8 && fe(t, n._v$8 = a),
                  n
              }
              ), {
                  _v$7: void 0,
                  _v$8: void 0
              }),
              t
          }
          )() : (()=>{
              const e = Dt();
              return be(e, i),
              k((()=>fe(e, Ge("z-10", !r() && "p-4", r() ? bt() ? "h-8" : "h-9" : "")))),
              e
          }
          )()
      }
      )(), null),
      k((e=>{
          const t = r() ? "64px" : "100%"
            , n = r() ? "32px" : "100%";
          return t !== e._v$5 && (null != (e._v$5 = t) ? a.style.setProperty("width", t) : a.style.removeProperty("width")),
          n !== e._v$6 && (null != (e._v$6 = n) ? a.style.setProperty("height", n) : a.style.removeProperty("height")),
          e
      }
      ), {
          _v$5: void 0,
          _v$6: void 0
      }),
      n
  }
  )()
}
, Ft = ue("<span>")
, Gt = e=>G(te, {
  get when() {
      return ((e,t,n)=>{
          let r = "";
          return e && (r += "slate-bold"),
          t && (r += " slate-italic"),
          n && (r += " slate-underline"),
          r
      }
      )(e.bold, e.italic, e.underline)
  },
  keyed: !0,
  get fallback() {
      return S((()=>e.text))
  },
  children: t=>(()=>{
      const n = Ft();
      return fe(n, t),
      be(n, (()=>e.text)),
      n
  }
  )()
})
, Ht = ue('<a target="_blank" class="slate-a">')
, Kt = ue("<div>")
, qt = e=>G(te, {
  get when() {
      return !e.element.text
  },
  get fallback() {
      return G(Gt, Y((()=>e.element)))
  },
  get children() {
      return G(ne, {
          get fallback() {
              return (()=>{
                  const t = Kt();
                  return be(t, G(ee, {
                      get each() {
                          return e.element.children
                      },
                      children: e=>G(qt, {
                          element: e
                      })
                  })),
                  t
              }
              )()
          },
          get children() {
              return G(re, {
                  get when() {
                      return "a" === e.element.type
                  },
                  get children() {
                      const t = Ht();
                      return be(t, G(ee, {
                          get each() {
                              return e.element.children
                          },
                          children: e=>G(qt, {
                              element: e
                          })
                      })),
                      k((()=>he(t, "href", e.element.url))),
                      t
                  }
              })
          }
      })
  }
})
, Wt = e=>e.map((e=>e.text ?? Wt(e.children))).join("")
, Yt = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div>')
, Jt = {
  enabled: !0,
  speed: 300,
  maxDelay: 1.5
};
let Xt;
const Qt = e=>{
  let t;
  const [n,r] = x(!0)
    , o = ()=>{
      n() && (r(!1),
      setTimeout((()=>{
          e.onTransitionEnd(t?.offsetTop)
      }
      ), 400))
  }
  ;
  return $((()=>{
      if (!n)
          return;
      const t = Wt(e.content.richText)
        , r = !1 === e.typingEmulation?.enabled ? 0 : ((e,t)=>{
          let n = e.match(/(\w+)/g)?.length ?? 0;
          0 === n && (n = e.length);
          const r = t.speed;
          let o = t.enabled ? n / r * 6e4 : 0;
          return o > 1e3 * t.maxDelay && (o = 1e3 * t.maxDelay),
          o
      }
      )(t, e.typingEmulation ?? Jt);
      Xt = setTimeout(o, r)
  }
  )),
  T((()=>{
      Xt && clearTimeout(Xt)
  }
  )),
  (()=>{
      const r = Yt()
        , o = r.firstChild.firstChild.firstChild
        , a = o.nextSibling;
      return "function" == typeof t ? me(t, r) : t = r,
      be(o, (()=>{
          const e = S((()=>!!n()));
          return ()=>e() && G($t, {})
      }
      )()),
      be(a, G(ee, {
          get each() {
              return e.content.richText
          },
          children: e=>G(qt, {
              element: e
          })
      })),
      k((e=>{
          const t = n() ? "64px" : "100%"
            , r = n() ? "32px" : "100%"
            , i = Ge("overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis", n() ? "opacity-0" : "opacity-100")
            , s = n() ? bt() ? "16px" : "20px" : "100%";
          return t !== e._v$ && (null != (e._v$ = t) ? o.style.setProperty("width", t) : o.style.removeProperty("width")),
          r !== e._v$2 && (null != (e._v$2 = r) ? o.style.setProperty("height", r) : o.style.removeProperty("height")),
          i !== e._v$3 && fe(a, e._v$3 = i),
          s !== e._v$4 && (null != (e._v$4 = s) ? a.style.setProperty("height", s) : a.style.removeProperty("height")),
          e
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
      }),
      r
  }
  )()
}
;
let en = function(e) {
  return e.URL = "url",
  e.YOUTUBE = "youtube",
  e.VIMEO = "vimeo",
  e
}({});
const tn = ue("<video autoplay controls>")
, nn = ue('<div><iframe class="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>')
, rn = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble overflow-hidden"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">');
let on;
const an = e=>{
  let t;
  const [n,r] = x(!0);
  return $((()=>{
      const o = e.content?.type && [en.VIMEO, en.YOUTUBE].includes(e.content?.type) ? 2e3 : 100;
      on = setTimeout((()=>{
          n() && (r(!1),
          setTimeout((()=>{
              e.onTransitionEnd(t?.offsetTop)
          }
          ), 400))
      }
      ), o)
  }
  )),
  T((()=>{
      on && clearTimeout(on)
  }
  )),
  (()=>{
      const r = rn()
        , o = r.firstChild.firstChild
        , a = o.firstChild;
      return "function" == typeof t ? me(t, r) : t = r,
      be(a, (()=>{
          const e = S((()=>!!n()));
          return ()=>e() && G($t, {})
      }
      )()),
      be(o, G(ne, {
          get children() {
              return [G(re, {
                  get when() {
                      return e.content?.type && e.content.type === en.URL
                  },
                  get children() {
                      const t = tn();
                      return k((r=>{
                          const o = e.content.url
                            , a = "p-4 focus:outline-none w-full z-10 text-fade-in rounded-md " + (n() ? "opacity-0" : "opacity-100")
                            , i = n() ? bt() ? "32px" : "36px" : "auto";
                          return o !== r._v$ && he(t, "src", r._v$ = o),
                          a !== r._v$2 && fe(t, r._v$2 = a),
                          i !== r._v$3 && (null != (r._v$3 = i) ? t.style.setProperty("height", i) : t.style.removeProperty("height")),
                          r
                      }
                      ), {
                          _v$: void 0,
                          _v$2: void 0,
                          _v$3: void 0
                      }),
                      t
                  }
              }), G(re, {
                  get when() {
                      return S((()=>!!e.content?.type))() && [en.VIMEO, en.YOUTUBE].includes(e.content.type)
                  },
                  get children() {
                      const t = nn()
                        , r = t.firstChild;
                      return k((o=>{
                          const a = Ge("p-4 z-10 text-fade-in w-full", n() ? "opacity-0" : "opacity-100 p-4")
                            , i = n() ? bt() ? "32px" : "36px" : "200px"
                            , s = `${e.content.type === en.VIMEO ? "https://player.vimeo.com/video" : "https://www.youtube.com/embed"}/${e.content.id}`;
                          return a !== o._v$4 && fe(t, o._v$4 = a),
                          i !== o._v$5 && (null != (o._v$5 = i) ? t.style.setProperty("height", i) : t.style.removeProperty("height")),
                          s !== o._v$6 && he(r, "src", o._v$6 = s),
                          o
                      }
                      ), {
                          _v$4: void 0,
                          _v$5: void 0,
                          _v$6: void 0
                      }),
                      t
                  }
              })]
          }
      }), null),
      k((e=>{
          const t = n() ? "64px" : "100%"
            , r = n() ? "32px" : "100%";
          return t !== e._v$7 && (null != (e._v$7 = t) ? a.style.setProperty("width", t) : a.style.removeProperty("width")),
          r !== e._v$8 && (null != (e._v$8 = r) ? a.style.setProperty("height", r) : a.style.removeProperty("height")),
          e
      }
      ), {
          _v$7: void 0,
          _v$8: void 0
      }),
      r
  }
  )()
}
, sn = e=>{
  const t = t=>{
      e.onTransitionEnd(t)
  }
  ;
  return G(ne, {
      get children() {
          return [G(re, {
              get when() {
                  return e.message.type === Oe.TEXT
              },
              get children() {
                  return G(Qt, {
                      get content() {
                          return e.message.content
                      },
                      get typingEmulation() {
                          return e.typingEmulation
                      },
                      onTransitionEnd: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.message.type === Oe.IMAGE
              },
              get children() {
                  return G(Vt, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.message.type === Oe.VIDEO
              },
              get children() {
                  return G(an, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.message.type === Oe.EMBED
              },
              get children() {
                  return G(Rt, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.message.type === Oe.AUDIO
              },
              get children() {
                  return G(Mt, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          })]
      }
  })
}
, ln = ue('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">')
, cn = ()=>(()=>{
  const e = ln()
    , t = e.firstChild;
  return k((n=>{
      const r = "flex justify-center items-center rounded-full text-white relative " + (bt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
        , o = "absolute top-0 left-0 " + (bt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
      return r !== n._v$ && fe(e, n._v$ = r),
      o !== n._v$2 && he(t, "class", n._v$2 = o),
      n
  }
  ), {
      _v$: void 0,
      _v$2: void 0
  }),
  e
}
)()
, dn = ue('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full" elementtiming="Bot avatar" fetchpriority="high">')
, un = e=>{
  const [t,n] = x(e.initialAvatarSrc);
  return C((()=>{
      t()?.startsWith("{{") && e.initialAvatarSrc?.startsWith("http") && n(e.initialAvatarSrc)
  }
  )),
  G(te, {
      get when() {
          return Ze(t())
      },
      keyed: !0,
      get fallback() {
          return G(cn, {})
      },
      get children() {
          const e = dn()
            , n = e.firstChild;
          return k((r=>{
              const o = "flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 " + (bt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
                , a = t();
              return o !== r._v$ && fe(e, r._v$ = o),
              a !== r._v$2 && he(n, "src", r._v$2 = a),
              r
          }
          ), {
              _v$: void 0,
              _v$2: void 0
          }),
          e
      }
  })
}
, pn = ue('<div class="flex justify-end items-end animate-fade-in gap-2 guest-container"><span class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble" data-testid="guest-bubble">')
, hn = e=>(()=>{
  const t = pn()
    , n = t.firstChild;
  return t.style.setProperty("margin-left", "50px"),
  be(n, (()=>e.message)),
  be(t, G(te, {
      get when() {
          return e.showAvatar
      },
      get children() {
          return G(un, {
              get initialAvatarSrc() {
                  return e.avatarSrc
              }
          })
      }
  }), null),
  t
}
)()
, fn = ue('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, gn = e=>{
  const [t,n] = x(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = t=>{
      e.block.options.isLong || "Enter" === t.key && a()
  }
    , s = t=>{
      e.block.options.isLong && "Enter" === t.key && (t.metaKey || t.ctrlKey) && a()
  }
  ;
  $((()=>{
      !bt() && r && r.focus(),
      window.addEventListener("message", l)
  }
  )),
  T((()=>{
      window.removeEventListener("message", l)
  }
  ));
  const l = e=>{
      const {data: t} = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value)
  }
  ;
  return (()=>{
      const n = fn();
      return n.$$keydown = i,
      be(n, (()=>{
          const n = S((()=>!!e.block.options.isLong));
          return ()=>n() ? G(At, {
              ref(e) {
                  "function" == typeof r ? r(e) : r = e
              },
              onInput: o,
              onKeyDown: s,
              get value() {
                  return t()
              },
              get placeholder() {
                  return e.block.options?.labels?.placeholder ?? "Type your answer..."
              }
          }) : G(Et, {
              ref(e) {
                  "function" == typeof r ? r(e) : r = e
              },
              onInput: o,
              get value() {
                  return t()
              },
              get placeholder() {
                  return e.block.options?.labels?.placeholder ?? "Type your answer..."
              }
          })
      }
      )(), null),
      be(n, G(St, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      k((()=>null != (e.block.options.isLong ? void 0 : "350px") ? n.style.setProperty("max-width", e.block.options.isLong ? void 0 : "350px") : n.style.removeProperty("max-width"))),
      n
  }
  )()
}
;
pe(["keydown"]);
const mn = ue('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, bn = e=>{
  const [t,n] = x(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  $((()=>{
      !bt() && r && r.focus(),
      window.addEventListener("message", s)
  }
  )),
  T((()=>{
      window.removeEventListener("message", s)
  }
  ));
  const s = e=>{
      const {data: t} = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value)
  }
  ;
  return (()=>{
      const n = mn();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      be(n, G(Et, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your answer..."
          },
          onInput: o,
          type: "number",
          style: {
              appearance: "auto"
          },
          get min() {
              return e.block.options?.min
          },
          get max() {
              return e.block.options?.max
          },
          get step() {
              return e.block.options?.step ?? "any"
          }
      }), null),
      be(n, G(St, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
pe(["keydown"]);
const vn = ue('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, yn = e=>{
  const [t,n] = x(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  $((()=>{
      !bt() && r && r.focus(),
      window.addEventListener("message", s)
  }
  )),
  T((()=>{
      window.removeEventListener("message", s)
  }
  ));
  const s = e=>{
      const {data: t} = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value)
  }
  ;
  return (()=>{
      const n = vn();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      be(n, G(Et, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your email..."
          },
          onInput: o,
          type: "email",
          autocomplete: "email"
      }), null),
      be(n, G(St, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
pe(["keydown"]);
const wn = ue('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, _n = e=>{
  const [t,n] = x(e.defaultValue ?? "");
  let r;
  const o = e=>{
      if (!e.startsWith("https://"))
          return "https:/" === e ? void 0 : n(`https://${e}`);
      n(e)
  }
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  $((()=>{
      !bt() && r && r.focus(),
      window.addEventListener("message", s)
  }
  )),
  T((()=>{
      window.removeEventListener("message", s)
  }
  ));
  const s = e=>{
      const {data: t} = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value)
  }
  ;
  return (()=>{
      const n = wn();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      be(n, G(Et, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your URL..."
          },
          onInput: o,
          type: "url",
          autocomplete: "url"
      }), null),
      be(n, G(St, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
pe(["keydown"]);
const xn = ue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9">')
, kn = e=>(()=>{
  const t = xn();
  return ge(t, e, !0, !0),
  t
}
)()
, Cn = [{
  name: "International",
  flag: "🌐",
  code: "INT",
  dial_code: null
}, {
  name: "Afghanistan",
  flag: "🇦🇫",
  code: "AF",
  dial_code: "+93"
}, {
  name: "Åland Islands",
  flag: "🇦🇽",
  code: "AX",
  dial_code: "+358"
}, {
  name: "Albania",
  flag: "🇦🇱",
  code: "AL",
  dial_code: "+355"
}, {
  name: "Algeria",
  flag: "🇩🇿",
  code: "DZ",
  dial_code: "+213"
}, {
  name: "American Samoa",
  flag: "🇦🇸",
  code: "AS",
  dial_code: "+1684"
}, {
  name: "Andorra",
  flag: "🇦🇩",
  code: "AD",
  dial_code: "+376"
}, {
  name: "Angola",
  flag: "🇦🇴",
  code: "AO",
  dial_code: "+244"
}, {
  name: "Anguilla",
  flag: "🇦🇮",
  code: "AI",
  dial_code: "+1264"
}, {
  name: "Antarctica",
  flag: "🇦🇶",
  code: "AQ",
  dial_code: "+672"
}, {
  name: "Antigua and Barbuda",
  flag: "🇦🇬",
  code: "AG",
  dial_code: "+1268"
}, {
  name: "Argentina",
  flag: "🇦🇷",
  code: "AR",
  dial_code: "+54"
}, {
  name: "Armenia",
  flag: "🇦🇲",
  code: "AM",
  dial_code: "+374"
}, {
  name: "Aruba",
  flag: "🇦🇼",
  code: "AW",
  dial_code: "+297"
}, {
  name: "Australia",
  flag: "🇦🇺",
  code: "AU",
  dial_code: "+61"
}, {
  name: "Austria",
  flag: "🇦🇹",
  code: "AT",
  dial_code: "+43"
}, {
  name: "Azerbaijan",
  flag: "🇦🇿",
  code: "AZ",
  dial_code: "+994"
}, {
  name: "Bahamas",
  flag: "🇧🇸",
  code: "BS",
  dial_code: "+1242"
}, {
  name: "Bahrain",
  flag: "🇧🇭",
  code: "BH",
  dial_code: "+973"
}, {
  name: "Bangladesh",
  flag: "🇧🇩",
  code: "BD",
  dial_code: "+880"
}, {
  name: "Barbados",
  flag: "🇧🇧",
  code: "BB",
  dial_code: "+1246"
}, {
  name: "Belarus",
  flag: "🇧🇾",
  code: "BY",
  dial_code: "+375"
}, {
  name: "Belgium",
  flag: "🇧🇪",
  code: "BE",
  dial_code: "+32"
}, {
  name: "Belize",
  flag: "🇧🇿",
  code: "BZ",
  dial_code: "+501"
}, {
  name: "Benin",
  flag: "🇧🇯",
  code: "BJ",
  dial_code: "+229"
}, {
  name: "Bermuda",
  flag: "🇧🇲",
  code: "BM",
  dial_code: "+1441"
}, {
  name: "Bhutan",
  flag: "🇧🇹",
  code: "BT",
  dial_code: "+975"
}, {
  name: "Bolivia, Plurinational State of bolivia",
  flag: "🇧🇴",
  code: "BO",
  dial_code: "+591"
}, {
  name: "Bosnia and Herzegovina",
  flag: "🇧🇦",
  code: "BA",
  dial_code: "+387"
}, {
  name: "Botswana",
  flag: "🇧🇼",
  code: "BW",
  dial_code: "+267"
}, {
  name: "Bouvet Island",
  flag: "🇧🇻",
  code: "BV",
  dial_code: "+47"
}, {
  name: "Brazil",
  flag: "🇧🇷",
  code: "BR",
  dial_code: "+55"
}, {
  name: "British Indian Ocean Territory",
  flag: "🇮🇴",
  code: "IO",
  dial_code: "+246"
}, {
  name: "Brunei Darussalam",
  flag: "🇧🇳",
  code: "BN",
  dial_code: "+673"
}, {
  name: "Bulgaria",
  flag: "🇧🇬",
  code: "BG",
  dial_code: "+359"
}, {
  name: "Burkina Faso",
  flag: "🇧🇫",
  code: "BF",
  dial_code: "+226"
}, {
  name: "Burundi",
  flag: "🇧🇮",
  code: "BI",
  dial_code: "+257"
}, {
  name: "Cambodia",
  flag: "🇰🇭",
  code: "KH",
  dial_code: "+855"
}, {
  name: "Cameroon",
  flag: "🇨🇲",
  code: "CM",
  dial_code: "+237"
}, {
  name: "Canada",
  flag: "🇨🇦",
  code: "CA",
  dial_code: "+1"
}, {
  name: "Cape Verde",
  flag: "🇨🇻",
  code: "CV",
  dial_code: "+238"
}, {
  name: "Cayman Islands",
  flag: "🇰🇾",
  code: "KY",
  dial_code: "+345"
}, {
  name: "Central African Republic",
  flag: "🇨🇫",
  code: "CF",
  dial_code: "+236"
}, {
  name: "Chad",
  flag: "🇹🇩",
  code: "TD",
  dial_code: "+235"
}, {
  name: "Chile",
  flag: "🇨🇱",
  code: "CL",
  dial_code: "+56"
}, {
  name: "China",
  flag: "🇨🇳",
  code: "CN",
  dial_code: "+86"
}, {
  name: "Christmas Island",
  flag: "🇨🇽",
  code: "CX",
  dial_code: "+61"
}, {
  name: "Cocos (Keeling) Islands",
  flag: "🇨🇨",
  code: "CC",
  dial_code: "+61"
}, {
  name: "Colombia",
  flag: "🇨🇴",
  code: "CO",
  dial_code: "+57"
}, {
  name: "Comoros",
  flag: "🇰🇲",
  code: "KM",
  dial_code: "+269"
}, {
  name: "Congo",
  flag: "🇨🇬",
  code: "CG",
  dial_code: "+242"
}, {
  name: "Congo, The Democratic Republic of the Congo",
  flag: "🇨🇩",
  code: "CD",
  dial_code: "+243"
}, {
  name: "Cook Islands",
  flag: "🇨🇰",
  code: "CK",
  dial_code: "+682"
}, {
  name: "Costa Rica",
  flag: "🇨🇷",
  code: "CR",
  dial_code: "+506"
}, {
  name: "Cote d'Ivoire",
  flag: "🇨🇮",
  code: "CI",
  dial_code: "+225"
}, {
  name: "Croatia",
  flag: "🇭🇷",
  code: "HR",
  dial_code: "+385"
}, {
  name: "Cuba",
  flag: "🇨🇺",
  code: "CU",
  dial_code: "+53"
}, {
  name: "Cyprus",
  flag: "🇨🇾",
  code: "CY",
  dial_code: "+357"
}, {
  name: "Czech Republic",
  flag: "🇨🇿",
  code: "CZ",
  dial_code: "+420"
}, {
  name: "Denmark",
  flag: "🇩🇰",
  code: "DK",
  dial_code: "+45"
}, {
  name: "Djibouti",
  flag: "🇩🇯",
  code: "DJ",
  dial_code: "+253"
}, {
  name: "Dominica",
  flag: "🇩🇲",
  code: "DM",
  dial_code: "+1767"
}, {
  name: "Dominican Republic",
  flag: "🇩🇴",
  code: "DO",
  dial_code: "+1849"
}, {
  name: "Ecuador",
  flag: "🇪🇨",
  code: "EC",
  dial_code: "+593"
}, {
  name: "Egypt",
  flag: "🇪🇬",
  code: "EG",
  dial_code: "+20"
}, {
  name: "El Salvador",
  flag: "🇸🇻",
  code: "SV",
  dial_code: "+503"
}, {
  name: "Equatorial Guinea",
  flag: "🇬🇶",
  code: "GQ",
  dial_code: "+240"
}, {
  name: "Eritrea",
  flag: "🇪🇷",
  code: "ER",
  dial_code: "+291"
}, {
  name: "Estonia",
  flag: "🇪🇪",
  code: "EE",
  dial_code: "+372"
}, {
  name: "Ethiopia",
  flag: "🇪🇹",
  code: "ET",
  dial_code: "+251"
}, {
  name: "Falkland Islands (Malvinas)",
  flag: "🇫🇰",
  code: "FK",
  dial_code: "+500"
}, {
  name: "Faroe Islands",
  flag: "🇫🇴",
  code: "FO",
  dial_code: "+298"
}, {
  name: "Fiji",
  flag: "🇫🇯",
  code: "FJ",
  dial_code: "+679"
}, {
  name: "Finland",
  flag: "🇫🇮",
  code: "FI",
  dial_code: "+358"
}, {
  name: "France",
  flag: "🇫🇷",
  code: "FR",
  dial_code: "+33"
}, {
  name: "French Guiana",
  flag: "🇬🇫",
  code: "GF",
  dial_code: "+594"
}, {
  name: "French Polynesia",
  flag: "🇵🇫",
  code: "PF",
  dial_code: "+689"
}, {
  name: "French Southern Territories",
  flag: "🇹🇫",
  code: "TF",
  dial_code: "+262"
}, {
  name: "Gabon",
  flag: "🇬🇦",
  code: "GA",
  dial_code: "+241"
}, {
  name: "Gambia",
  flag: "🇬🇲",
  code: "GM",
  dial_code: "+220"
}, {
  name: "Georgia",
  flag: "🇬🇪",
  code: "GE",
  dial_code: "+995"
}, {
  name: "Germany",
  flag: "🇩🇪",
  code: "DE",
  dial_code: "+49"
}, {
  name: "Ghana",
  flag: "🇬🇭",
  code: "GH",
  dial_code: "+233"
}, {
  name: "Gibraltar",
  flag: "🇬🇮",
  code: "GI",
  dial_code: "+350"
}, {
  name: "Greece",
  flag: "🇬🇷",
  code: "GR",
  dial_code: "+30"
}, {
  name: "Greenland",
  flag: "🇬🇱",
  code: "GL",
  dial_code: "+299"
}, {
  name: "Grenada",
  flag: "🇬🇩",
  code: "GD",
  dial_code: "+1473"
}, {
  name: "Guadeloupe",
  flag: "🇬🇵",
  code: "GP",
  dial_code: "+590"
}, {
  name: "Guam",
  flag: "🇬🇺",
  code: "GU",
  dial_code: "+1671"
}, {
  name: "Guatemala",
  flag: "🇬🇹",
  code: "GT",
  dial_code: "+502"
}, {
  name: "Guernsey",
  flag: "🇬🇬",
  code: "GG",
  dial_code: "+44"
}, {
  name: "Guinea",
  flag: "🇬🇳",
  code: "GN",
  dial_code: "+224"
}, {
  name: "Guinea-Bissau",
  flag: "🇬🇼",
  code: "GW",
  dial_code: "+245"
}, {
  name: "Guyana",
  flag: "🇬🇾",
  code: "GY",
  dial_code: "+592"
}, {
  name: "Haiti",
  flag: "🇭🇹",
  code: "HT",
  dial_code: "+509"
}, {
  name: "Heard Island and Mcdonald Islands",
  flag: "🇭🇲",
  code: "HM",
  dial_code: "+672"
}, {
  name: "Holy See (Vatican City State)",
  flag: "🇻🇦",
  code: "VA",
  dial_code: "+379"
}, {
  name: "Honduras",
  flag: "🇭🇳",
  code: "HN",
  dial_code: "+504"
}, {
  name: "Hong Kong",
  flag: "🇭🇰",
  code: "HK",
  dial_code: "+852"
}, {
  name: "Hungary",
  flag: "🇭🇺",
  code: "HU",
  dial_code: "+36"
}, {
  name: "Iceland",
  flag: "🇮🇸",
  code: "IS",
  dial_code: "+354"
}, {
  name: "India",
  flag: "🇮🇳",
  code: "IN",
  dial_code: "+91"
}, {
  name: "Indonesia",
  flag: "🇮🇩",
  code: "ID",
  dial_code: "+62"
}, {
  name: "Iran, Islamic Republic of Persian Gulf",
  flag: "🇮🇷",
  code: "IR",
  dial_code: "+98"
}, {
  name: "Iraq",
  flag: "🇮🇶",
  code: "IQ",
  dial_code: "+964"
}, {
  name: "Ireland",
  flag: "🇮🇪",
  code: "IE",
  dial_code: "+353"
}, {
  name: "Isle of Man",
  flag: "🇮🇲",
  code: "IM",
  dial_code: "+44"
}, {
  name: "Israel",
  flag: "🇮🇱",
  code: "IL",
  dial_code: "+972"
}, {
  name: "Italy",
  flag: "🇮🇹",
  code: "IT",
  dial_code: "+39"
}, {
  name: "Jamaica",
  flag: "🇯🇲",
  code: "JM",
  dial_code: "+1876"
}, {
  name: "Japan",
  flag: "🇯🇵",
  code: "JP",
  dial_code: "+81"
}, {
  name: "Jersey",
  flag: "🇯🇪",
  code: "JE",
  dial_code: "+44"
}, {
  name: "Jordan",
  flag: "🇯🇴",
  code: "JO",
  dial_code: "+962"
}, {
  name: "Kazakhstan",
  flag: "🇰🇿",
  code: "KZ",
  dial_code: "+7"
}, {
  name: "Kenya",
  flag: "🇰🇪",
  code: "KE",
  dial_code: "+254"
}, {
  name: "Kiribati",
  flag: "🇰🇮",
  code: "KI",
  dial_code: "+686"
}, {
  name: "Korea, Democratic People's Republic of Korea",
  flag: "🇰🇵",
  code: "KP",
  dial_code: "+850"
}, {
  name: "Korea, Republic of South Korea",
  flag: "🇰🇷",
  code: "KR",
  dial_code: "+82"
}, {
  name: "Kosovo",
  flag: "🇽🇰",
  code: "XK",
  dial_code: "+383"
}, {
  name: "Kuwait",
  flag: "🇰🇼",
  code: "KW",
  dial_code: "+965"
}, {
  name: "Kyrgyzstan",
  flag: "🇰🇬",
  code: "KG",
  dial_code: "+996"
}, {
  name: "Laos",
  flag: "🇱🇦",
  code: "LA",
  dial_code: "+856"
}, {
  name: "Latvia",
  flag: "🇱🇻",
  code: "LV",
  dial_code: "+371"
}, {
  name: "Lebanon",
  flag: "🇱🇧",
  code: "LB",
  dial_code: "+961"
}, {
  name: "Lesotho",
  flag: "🇱🇸",
  code: "LS",
  dial_code: "+266"
}, {
  name: "Liberia",
  flag: "🇱🇷",
  code: "LR",
  dial_code: "+231"
}, {
  name: "Libyan Arab Jamahiriya",
  flag: "🇱🇾",
  code: "LY",
  dial_code: "+218"
}, {
  name: "Liechtenstein",
  flag: "🇱🇮",
  code: "LI",
  dial_code: "+423"
}, {
  name: "Lithuania",
  flag: "🇱🇹",
  code: "LT",
  dial_code: "+370"
}, {
  name: "Luxembourg",
  flag: "🇱🇺",
  code: "LU",
  dial_code: "+352"
}, {
  name: "Macao",
  flag: "🇲🇴",
  code: "MO",
  dial_code: "+853"
}, {
  name: "Macedonia",
  flag: "🇲🇰",
  code: "MK",
  dial_code: "+389"
}, {
  name: "Madagascar",
  flag: "🇲🇬",
  code: "MG",
  dial_code: "+261"
}, {
  name: "Malawi",
  flag: "🇲🇼",
  code: "MW",
  dial_code: "+265"
}, {
  name: "Malaysia",
  flag: "🇲🇾",
  code: "MY",
  dial_code: "+60"
}, {
  name: "Maldives",
  flag: "🇲🇻",
  code: "MV",
  dial_code: "+960"
}, {
  name: "Mali",
  flag: "🇲🇱",
  code: "ML",
  dial_code: "+223"
}, {
  name: "Malta",
  flag: "🇲🇹",
  code: "MT",
  dial_code: "+356"
}, {
  name: "Marshall Islands",
  flag: "🇲🇭",
  code: "MH",
  dial_code: "+692"
}, {
  name: "Martinique",
  flag: "🇲🇶",
  code: "MQ",
  dial_code: "+596"
}, {
  name: "Mauritania",
  flag: "🇲🇷",
  code: "MR",
  dial_code: "+222"
}, {
  name: "Mauritius",
  flag: "🇲🇺",
  code: "MU",
  dial_code: "+230"
}, {
  name: "Mayotte",
  flag: "🇾🇹",
  code: "YT",
  dial_code: "+262"
}, {
  name: "Mexico",
  flag: "🇲🇽",
  code: "MX",
  dial_code: "+52"
}, {
  name: "Micronesia, Federated States of Micronesia",
  flag: "🇫🇲",
  code: "FM",
  dial_code: "+691"
}, {
  name: "Moldova",
  flag: "🇲🇩",
  code: "MD",
  dial_code: "+373"
}, {
  name: "Monaco",
  flag: "🇲🇨",
  code: "MC",
  dial_code: "+377"
}, {
  name: "Mongolia",
  flag: "🇲🇳",
  code: "MN",
  dial_code: "+976"
}, {
  name: "Montenegro",
  flag: "🇲🇪",
  code: "ME",
  dial_code: "+382"
}, {
  name: "Montserrat",
  flag: "🇲🇸",
  code: "MS",
  dial_code: "+1664"
}, {
  name: "Morocco",
  flag: "🇲🇦",
  code: "MA",
  dial_code: "+212"
}, {
  name: "Mozambique",
  flag: "🇲🇿",
  code: "MZ",
  dial_code: "+258"
}, {
  name: "Myanmar",
  flag: "🇲🇲",
  code: "MM",
  dial_code: "+95"
}, {
  name: "Namibia",
  flag: "🇳🇦",
  code: "NA",
  dial_code: "+264"
}, {
  name: "Nauru",
  flag: "🇳🇷",
  code: "NR",
  dial_code: "+674"
}, {
  name: "Nepal",
  flag: "🇳🇵",
  code: "NP",
  dial_code: "+977"
}, {
  name: "Netherlands",
  flag: "🇳🇱",
  code: "NL",
  dial_code: "+31"
}, {
  name: "Netherlands Antilles",
  flag: "",
  code: "AN",
  dial_code: "+599"
}, {
  name: "New Caledonia",
  flag: "🇳🇨",
  code: "NC",
  dial_code: "+687"
}, {
  name: "New Zealand",
  flag: "🇳🇿",
  code: "NZ",
  dial_code: "+64"
}, {
  name: "Nicaragua",
  flag: "🇳🇮",
  code: "NI",
  dial_code: "+505"
}, {
  name: "Niger",
  flag: "🇳🇪",
  code: "NE",
  dial_code: "+227"
}, {
  name: "Nigeria",
  flag: "🇳🇬",
  code: "NG",
  dial_code: "+234"
}, {
  name: "Niue",
  flag: "🇳🇺",
  code: "NU",
  dial_code: "+683"
}, {
  name: "Norfolk Island",
  flag: "🇳🇫",
  code: "NF",
  dial_code: "+672"
}, {
  name: "Northern Mariana Islands",
  flag: "🇲🇵",
  code: "MP",
  dial_code: "+1670"
}, {
  name: "Norway",
  flag: "🇳🇴",
  code: "NO",
  dial_code: "+47"
}, {
  name: "Oman",
  flag: "🇴🇲",
  code: "OM",
  dial_code: "+968"
}, {
  name: "Pakistan",
  flag: "🇵🇰",
  code: "PK",
  dial_code: "+92"
}, {
  name: "Palau",
  flag: "🇵🇼",
  code: "PW",
  dial_code: "+680"
}, {
  name: "Palestinian Territory, Occupied",
  flag: "🇵🇸",
  code: "PS",
  dial_code: "+970"
}, {
  name: "Panama",
  flag: "🇵🇦",
  code: "PA",
  dial_code: "+507"
}, {
  name: "Papua New Guinea",
  flag: "🇵🇬",
  code: "PG",
  dial_code: "+675"
}, {
  name: "Paraguay",
  flag: "🇵🇾",
  code: "PY",
  dial_code: "+595"
}, {
  name: "Peru",
  flag: "🇵🇪",
  code: "PE",
  dial_code: "+51"
}, {
  name: "Philippines",
  flag: "🇵🇭",
  code: "PH",
  dial_code: "+63"
}, {
  name: "Pitcairn",
  flag: "🇵🇳",
  code: "PN",
  dial_code: "+64"
}, {
  name: "Poland",
  flag: "🇵🇱",
  code: "PL",
  dial_code: "+48"
}, {
  name: "Portugal",
  flag: "🇵🇹",
  code: "PT",
  dial_code: "+351"
}, {
  name: "Puerto Rico",
  flag: "🇵🇷",
  code: "PR",
  dial_code: "+1939"
}, {
  name: "Qatar",
  flag: "🇶🇦",
  code: "QA",
  dial_code: "+974"
}, {
  name: "Romania",
  flag: "🇷🇴",
  code: "RO",
  dial_code: "+40"
}, {
  name: "Russia",
  flag: "🇷🇺",
  code: "RU",
  dial_code: "+7"
}, {
  name: "Rwanda",
  flag: "🇷🇼",
  code: "RW",
  dial_code: "+250"
}, {
  name: "Reunion",
  flag: "🇷🇪",
  code: "RE",
  dial_code: "+262"
}, {
  name: "Saint Barthelemy",
  flag: "🇧🇱",
  code: "BL",
  dial_code: "+590"
}, {
  name: "Saint Helena, Ascension and Tristan Da Cunha",
  flag: "🇸🇭",
  code: "SH",
  dial_code: "+290"
}, {
  name: "Saint Kitts and Nevis",
  flag: "🇰🇳",
  code: "KN",
  dial_code: "+1869"
}, {
  name: "Saint Lucia",
  flag: "🇱🇨",
  code: "LC",
  dial_code: "+1758"
}, {
  name: "Saint Martin",
  flag: "🇲🇫",
  code: "MF",
  dial_code: "+590"
}, {
  name: "Saint Pierre and Miquelon",
  flag: "🇵🇲",
  code: "PM",
  dial_code: "+508"
}, {
  name: "Saint Vincent and the Grenadines",
  flag: "🇻🇨",
  code: "VC",
  dial_code: "+1784"
}, {
  name: "Samoa",
  flag: "🇼🇸",
  code: "WS",
  dial_code: "+685"
}, {
  name: "San Marino",
  flag: "🇸🇲",
  code: "SM",
  dial_code: "+378"
}, {
  name: "Sao Tome and Principe",
  flag: "🇸🇹",
  code: "ST",
  dial_code: "+239"
}, {
  name: "Saudi Arabia",
  flag: "🇸🇦",
  code: "SA",
  dial_code: "+966"
}, {
  name: "Senegal",
  flag: "🇸🇳",
  code: "SN",
  dial_code: "+221"
}, {
  name: "Serbia",
  flag: "🇷🇸",
  code: "RS",
  dial_code: "+381"
}, {
  name: "Seychelles",
  flag: "🇸🇨",
  code: "SC",
  dial_code: "+248"
}, {
  name: "Sierra Leone",
  flag: "🇸🇱",
  code: "SL",
  dial_code: "+232"
}, {
  name: "Singapore",
  flag: "🇸🇬",
  code: "SG",
  dial_code: "+65"
}, {
  name: "Slovakia",
  flag: "🇸🇰",
  code: "SK",
  dial_code: "+421"
}, {
  name: "Slovenia",
  flag: "🇸🇮",
  code: "SI",
  dial_code: "+386"
}, {
  name: "Solomon Islands",
  flag: "🇸🇧",
  code: "SB",
  dial_code: "+677"
}, {
  name: "Somalia",
  flag: "🇸🇴",
  code: "SO",
  dial_code: "+252"
}, {
  name: "South Africa",
  flag: "🇿🇦",
  code: "ZA",
  dial_code: "+27"
}, {
  name: "South Sudan",
  flag: "🇸🇸",
  code: "SS",
  dial_code: "+211"
}, {
  name: "South Georgia and the South Sandwich Islands",
  flag: "🇬🇸",
  code: "GS",
  dial_code: "+500"
}, {
  name: "Spain",
  flag: "🇪🇸",
  code: "ES",
  dial_code: "+34"
}, {
  name: "Sri Lanka",
  flag: "🇱🇰",
  code: "LK",
  dial_code: "+94"
}, {
  name: "Sudan",
  flag: "🇸🇩",
  code: "SD",
  dial_code: "+249"
}, {
  name: "Suriname",
  flag: "🇸🇷",
  code: "SR",
  dial_code: "+597"
}, {
  name: "Svalbard and Jan Mayen",
  flag: "🇸🇯",
  code: "SJ",
  dial_code: "+47"
}, {
  name: "Swaziland",
  flag: "🇸🇿",
  code: "SZ",
  dial_code: "+268"
}, {
  name: "Sweden",
  flag: "🇸🇪",
  code: "SE",
  dial_code: "+46"
}, {
  name: "Switzerland",
  flag: "🇨🇭",
  code: "CH",
  dial_code: "+41"
}, {
  name: "Syrian Arab Republic",
  flag: "🇸🇾",
  code: "SY",
  dial_code: "+963"
}, {
  name: "Taiwan",
  flag: "🇹🇼",
  code: "TW",
  dial_code: "+886"
}, {
  name: "Tajikistan",
  flag: "🇹🇯",
  code: "TJ",
  dial_code: "+992"
}, {
  name: "Tanzania, United Republic of Tanzania",
  flag: "🇹🇿",
  code: "TZ",
  dial_code: "+255"
}, {
  name: "Thailand",
  flag: "🇹🇭",
  code: "TH",
  dial_code: "+66"
}, {
  name: "Timor-Leste",
  flag: "🇹🇱",
  code: "TL",
  dial_code: "+670"
}, {
  name: "Togo",
  flag: "🇹🇬",
  code: "TG",
  dial_code: "+228"
}, {
  name: "Tokelau",
  flag: "🇹🇰",
  code: "TK",
  dial_code: "+690"
}, {
  name: "Tonga",
  flag: "🇹🇴",
  code: "TO",
  dial_code: "+676"
}, {
  name: "Trinidad and Tobago",
  flag: "🇹🇹",
  code: "TT",
  dial_code: "+1868"
}, {
  name: "Tunisia",
  flag: "🇹🇳",
  code: "TN",
  dial_code: "+216"
}, {
  name: "Turkey",
  flag: "🇹🇷",
  code: "TR",
  dial_code: "+90"
}, {
  name: "Turkmenistan",
  flag: "🇹🇲",
  code: "TM",
  dial_code: "+993"
}, {
  name: "Turks and Caicos Islands",
  flag: "🇹🇨",
  code: "TC",
  dial_code: "+1649"
}, {
  name: "Tuvalu",
  flag: "🇹🇻",
  code: "TV",
  dial_code: "+688"
}, {
  name: "Uganda",
  flag: "🇺🇬",
  code: "UG",
  dial_code: "+256"
}, {
  name: "Ukraine",
  flag: "🇺🇦",
  code: "UA",
  dial_code: "+380"
}, {
  name: "United Arab Emirates",
  flag: "🇦🇪",
  code: "AE",
  dial_code: "+971"
}, {
  name: "United Kingdom",
  flag: "🇬🇧",
  code: "GB",
  dial_code: "+44"
}, {
  name: "United States",
  flag: "🇺🇸",
  code: "US",
  dial_code: "+1"
}, {
  name: "Uruguay",
  flag: "🇺🇾",
  code: "UY",
  dial_code: "+598"
}, {
  name: "Uzbekistan",
  flag: "🇺🇿",
  code: "UZ",
  dial_code: "+998"
}, {
  name: "Vanuatu",
  flag: "🇻🇺",
  code: "VU",
  dial_code: "+678"
}, {
  name: "Venezuela, Bolivarian Republic of Venezuela",
  flag: "🇻🇪",
  code: "VE",
  dial_code: "+58"
}, {
  name: "Vietnam",
  flag: "🇻🇳",
  code: "VN",
  dial_code: "+84"
}, {
  name: "Virgin Islands, British",
  flag: "🇻🇬",
  code: "VG",
  dial_code: "+1284"
}, {
  name: "Virgin Islands, U.S.",
  flag: "🇻🇮",
  code: "VI",
  dial_code: "+1340"
}, {
  name: "Wallis and Futuna",
  flag: "🇼🇫",
  code: "WF",
  dial_code: "+681"
}, {
  name: "Yemen",
  flag: "🇾🇪",
  code: "YE",
  dial_code: "+967"
}, {
  name: "Zambia",
  flag: "🇿🇲",
  code: "ZM",
  dial_code: "+260"
}, {
  name: "Zimbabwe",
  flag: "🇿🇼",
  code: "ZW",
  dial_code: "+263"
}]
, Sn = ue('<div class="flex items-end justify-between pr-2 typebot-input" data-testid="input"><div class="flex"><div class="relative typebot-country-select flex justify-center items-center"><div class="pl-2 pr-1 flex items-center gap-2"><span></span></div><select class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0">')
, In = ue("<option> ")
, $n = e=>{
  const [t,n] = x(Re(e.defaultCountryCode) ? "INT" : e.defaultCountryCode)
    , [r,o] = x(e.defaultValue ?? "");
  let a;
  const i = e=>{
      o(e),
      "" !== e && "+" !== e || "INT" === t() || n("INT");
      const r = e?.startsWith("+") && e.length > 2 && Cn.reduce(((t,n)=>!n?.dial_code || null !== t && !t.dial_code ? t : e?.startsWith(n.dial_code) && n.dial_code.length > (t?.dial_code.length ?? 0) ? n : t), null);
      r && n(r.code)
  }
    , s = ()=>{
      const n = Cn.find((e=>e.code === t()))?.dial_code;
      "" !== r() && a?.reportValidity() && e.onSubmit({
          value: r().startsWith("+") ? r() : `${n ?? ""}${r()}`
      })
  }
    , l = e=>{
      "Enter" === e.key && s()
  }
    , c = e=>{
      const t = e.currentTarget.value;
      n(t);
      const i = Cn.find((e=>e.code === t))?.dial_code;
      "" === r() && i && o(i),
      a?.focus()
  }
  ;
  $((()=>{
      !bt() && a && a.focus(),
      window.addEventListener("message", d)
  }
  )),
  T((()=>{
      window.removeEventListener("message", d)
  }
  ));
  const d = e=>{
      const {data: t} = e;
      t.isFromTypebot && "setInputValue" === t.command && o(t.value)
  }
  ;
  return (()=>{
      const n = Sn()
        , o = n.firstChild
        , d = o.firstChild.firstChild
        , u = d.firstChild
        , p = d.nextSibling;
      return n.$$keydown = l,
      n.style.setProperty("max-width", "400px"),
      be(u, (()=>Cn.find((e=>t() === e.code))?.flag)),
      be(d, G(kn, {
          class: "w-3"
      }), null),
      p.addEventListener("change", c),
      be(p, G(ee, {
          each: Cn,
          children: e=>(()=>{
              const n = In()
                , r = n.firstChild;
              return be(n, (()=>e.name), r),
              be(n, (()=>e.dial_code ? `(${e.dial_code})` : ""), null),
              k((()=>n.selected = e.code === t())),
              k((()=>n.value = e.code)),
              n
          }
          )()
      })),
      be(o, G(Et, {
          type: "tel",
          ref(e) {
              "function" == typeof a ? a(e) : a = e
          },
          get value() {
              return r()
          },
          onInput: i,
          get placeholder() {
              return e.labels.placeholder ?? "Your phone number..."
          },
          get autofocus() {
              return !bt()
          }
      }), null),
      be(n, G(St, {
          type: "button",
          get isDisabled() {
              return "" === r()
          },
          class: "my-2 ml-2",
          "on:click": s,
          get children() {
              return e.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
pe(["keydown"]);
const Tn = ({from: e, to: t, hasTime: n, isRange: r})=>{
  const o = window.navigator.language
    , a = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: n ? "2-digit" : void 0,
      minute: n ? "2-digit" : void 0
  }
    , i = new Date(n ? e : e.replace(/-/g, "/")).toLocaleString(o, a)
    , s = new Date(n ? t : t.replace(/-/g, "/")).toLocaleString(o, a);
  return `${i}${r ? ` to ${s}` : ""}`
}
, En = ue('<div class="flex flex-col"><div class="flex items-center"><form class="flex justify-between typebot-input pr-2 items-end"><div class="flex flex-col"><div><input class="focus:outline-none flex-1 w-full text-input typebot-date-input" data-testid="from-date">')
, Pn = ue('<p class="font-semibold">')
, An = ue('<div class="flex items-center p-4"><input class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input" data-testid="to-date">')
, On = e=>{
  const [t,n] = x(Nn(e.defaultValue ?? ""));
  return (()=>{
      const r = En()
        , o = r.firstChild.firstChild
        , a = o.firstChild
        , i = a.firstChild
        , s = i.firstChild;
      return o.addEventListener("submit", (n=>{
          "" === t().from && "" === t().to || (n.preventDefault(),
          e.onSubmit({
              value: Tn({
                  ...t(),
                  hasTime: e.options?.hasTime,
                  isRange: e.options?.isRange
              })
          }))
      }
      )),
      be(i, (()=>{
          const t = S((()=>!!e.options?.isRange));
          return ()=>t() && (()=>{
              const t = Pn();
              return be(t, (()=>e.options.labels?.from ?? "From:")),
              t
          }
          )()
      }
      )(), s),
      s.addEventListener("change", (e=>n({
          ...t(),
          from: e.currentTarget.value
      }))),
      s.style.setProperty("min-height", "32px"),
      s.style.setProperty("min-width", "100px"),
      s.style.setProperty("font-size", "16px"),
      be(a, (()=>{
          const r = S((()=>!!e.options?.isRange));
          return ()=>r() && (()=>{
              const r = An()
                , o = r.firstChild;
              return be(r, (()=>{
                  const t = S((()=>!!e.options.isRange));
                  return ()=>t() && (()=>{
                      const t = Pn();
                      return be(t, (()=>e.options.labels?.to ?? "To:")),
                      t
                  }
                  )()
              }
              )(), o),
              o.addEventListener("change", (e=>n({
                  ...t(),
                  to: e.currentTarget.value
              }))),
              o.style.setProperty("min-height", "32px"),
              o.style.setProperty("min-width", "100px"),
              o.style.setProperty("font-size", "16px"),
              k((()=>he(o, "type", e.options.hasTime ? "datetime-local" : "date"))),
              k((()=>o.value = t().to)),
              r
          }
          )()
      }
      )(), null),
      be(o, G(St, {
          get isDisabled() {
              return S((()=>"" === t().to))() && "" === t().from
          },
          class: "my-2 ml-2",
          get children() {
              return e.options?.labels?.button ?? "Send"
          }
      }), null),
      k((t=>{
          const n = "flex items-center p-4 " + (e.options?.isRange ? "pb-0 gap-2" : "")
            , r = e.options?.hasTime ? "datetime-local" : "date";
          return n !== t._v$ && fe(i, t._v$ = n),
          r !== t._v$2 && he(s, "type", t._v$2 = r),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0
      }),
      k((()=>s.value = t().from)),
      r
  }
  )()
}
, Nn = e=>{
  if (!e.includes("to"))
      return {
          from: e,
          to: ""
      };
  const [t,n] = e.split(" to ");
  return {
      from: t,
      to: n
  }
}
, Mn = ue('<form class="flex flex-col gap-2"><div class="flex flex-wrap justify-center gap-2"></div><div class="flex justify-end">')
, jn = ue('<span class="text-sm w-full rating-label">')
, Ln = ue('<span class="text-sm w-full text-right pr-2 rating-label">')
, Rn = ue("<div>")
, Zn = e=>{
  const [t,n] = x(e.defaultValue ? Number(e.defaultValue) : void 0)
    , r = n=>{
      n.preventDefault();
      const r = t();
      Le(r) || e.onSubmit({
          value: r.toString()
      })
  }
    , o = t=>{
      e.block.options.isOneClickSubmitEnabled && e.onSubmit({
          value: t.toString()
      }),
      n(t)
  }
  ;
  return (()=>{
      const n = Mn()
        , a = n.firstChild
        , i = a.nextSibling;
      return n.addEventListener("submit", r),
      be(n, (()=>{
          const t = S((()=>!!e.block.options.labels.left));
          return ()=>t() && (()=>{
              const t = jn();
              return be(t, (()=>e.block.options.labels.left)),
              t
          }
          )()
      }
      )(), a),
      be(a, G(ee, {
          get each() {
              return Array.from(Array(e.block.options.length + ("Numbers" === e.block.options.buttonType ? 1 : 0)))
          },
          children: (n,r)=>G(Bn, Y((()=>e.block.options), {
              get rating() {
                  return t()
              },
              get idx() {
                  return r() + ("Numbers" === e.block.options.buttonType ? 0 : 1)
              },
              onClick: o
          }))
      })),
      be(n, (()=>{
          const t = S((()=>!!e.block.options.labels.right));
          return ()=>t() && (()=>{
              const t = Ln();
              return be(t, (()=>e.block.options.labels.right)),
              t
          }
          )()
      }
      )(), i),
      be(i, (()=>{
          const n = S((()=>!!je(t())));
          return ()=>n() && G(St, {
              disableIcon: !0,
              get children() {
                  return e.block.options?.labels?.button ?? "Send"
              }
          })
      }
      )()),
      n
  }
  )()
}
, Bn = e=>{
  const t = t=>{
      t.preventDefault(),
      e.onClick(e.idx)
  }
  ;
  return G(ne, {
      get children() {
          return [G(re, {
              get when() {
                  return "Numbers" === e.buttonType
              },
              get children() {
                  return G(Ct, {
                      "on:click": t,
                      get class() {
                          return e.isOneClickSubmitEnabled || je(e.rating) && e.idx <= e.rating ? "" : "selectable"
                      },
                      get children() {
                          return e.idx
                      }
                  })
              }
          }), G(re, {
              get when() {
                  return "Numbers" !== e.buttonType
              },
              get children() {
                  const t = Rn();
                  return t.addEventListener("click", (()=>e.onClick(e.idx))),
                  k((n=>{
                      const r = "flex justify-center items-center rating-icon-container cursor-pointer " + (je(e.rating) && e.idx <= e.rating ? "selected" : "")
                        , o = e.customIcon.isEnabled && !Re(e.customIcon.svg) ? e.customIcon.svg : zn;
                      return r !== n._v$ && fe(t, n._v$ = r),
                      o !== n._v$2 && (t.innerHTML = n._v$2 = o),
                      n
                  }
                  ), {
                      _v$: void 0,
                      _v$2: void 0
                  }),
                  t
              }
          })]
      }
  })
}
, zn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
var Dn, Un;
!function(e) {
  e.assertEqual = e=>e,
  e.assertIs = function(e) {}
  ,
  e.assertNever = function(e) {
      throw new Error
  }
  ,
  e.arrayToEnum = e=>{
      const t = {};
      for (const n of e)
          t[n] = n;
      return t
  }
  ,
  e.getValidEnumValues = t=>{
      const n = e.objectKeys(t).filter((e=>"number" != typeof t[t[e]]))
        , r = {};
      for (const e of n)
          r[e] = t[e];
      return e.objectValues(r)
  }
  ,
  e.objectValues = t=>e.objectKeys(t).map((function(e) {
      return t[e]
  }
  )),
  e.objectKeys = "function" == typeof Object.keys ? e=>Object.keys(e) : e=>{
      const t = [];
      for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
      return t
  }
  ,
  e.find = (e,t)=>{
      for (const n of e)
          if (t(n))
              return n
  }
  ,
  e.isInteger = "function" == typeof Number.isInteger ? e=>Number.isInteger(e) : e=>"number" == typeof e && isFinite(e) && Math.floor(e) === e,
  e.joinValues = function(e, t=" | ") {
      return e.map((e=>"string" == typeof e ? `'${e}'` : e)).join(t)
  }
  ,
  e.jsonStringifyReplacer = (e,t)=>"bigint" == typeof t ? t.toString() : t
}(Dn || (Dn = {})),
function(e) {
  e.mergeShapes = (e,t)=>({
      ...e,
      ...t
  })
}(Un || (Un = {}));
const Vn = Dn.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"])
, Fn = e=>{
  switch (typeof e) {
  case "undefined":
      return Vn.undefined;
  case "string":
      return Vn.string;
  case "number":
      return isNaN(e) ? Vn.nan : Vn.number;
  case "boolean":
      return Vn.boolean;
  case "function":
      return Vn.function;
  case "bigint":
      return Vn.bigint;
  case "symbol":
      return Vn.symbol;
  case "object":
      return Array.isArray(e) ? Vn.array : null === e ? Vn.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? Vn.promise : "undefined" != typeof Map && e instanceof Map ? Vn.map : "undefined" != typeof Set && e instanceof Set ? Vn.set : "undefined" != typeof Date && e instanceof Date ? Vn.date : Vn.object;
  default:
      return Vn.unknown
  }
}
, Gn = Dn.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
class Hn extends Error {
  constructor(e) {
      super(),
      this.issues = [],
      this.addIssue = e=>{
          this.issues = [...this.issues, e]
      }
      ,
      this.addIssues = (e=[])=>{
          this.issues = [...this.issues, ...e]
      }
      ;
      const t = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t,
      this.name = "ZodError",
      this.issues = e
  }
  get errors() {
      return this.issues
  }
  format(e) {
      const t = e || function(e) {
          return e.message
      }
        , n = {
          _errors: []
      }
        , r = e=>{
          for (const o of e.issues)
              if ("invalid_union" === o.code)
                  o.unionErrors.map(r);
              else if ("invalid_return_type" === o.code)
                  r(o.returnTypeError);
              else if ("invalid_arguments" === o.code)
                  r(o.argumentsError);
              else if (0 === o.path.length)
                  n._errors.push(t(o));
              else {
                  let e = n
                    , r = 0;
                  for (; r < o.path.length; ) {
                      const n = o.path[r];
                      r === o.path.length - 1 ? (e[n] = e[n] || {
                          _errors: []
                      },
                      e[n]._errors.push(t(o))) : e[n] = e[n] || {
                          _errors: []
                      },
                      e = e[n],
                      r++
                  }
              }
      }
      ;
      return r(this),
      n
  }
  toString() {
      return this.message
  }
  get message() {
      return JSON.stringify(this.issues, Dn.jsonStringifyReplacer, 2)
  }
  get isEmpty() {
      return 0 === this.issues.length
  }
  flatten(e=(e=>e.message)) {
      const t = {}
        , n = [];
      for (const r of this.issues)
          r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [],
          t[r.path[0]].push(e(r))) : n.push(e(r));
      return {
          formErrors: n,
          fieldErrors: t
      }
  }
  get formErrors() {
      return this.flatten()
  }
}
Hn.create = e=>new Hn(e);
const Kn = (e,t)=>{
  let n;
  switch (e.code) {
  case Gn.invalid_type:
      n = e.received === Vn.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
      break;
  case Gn.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, Dn.jsonStringifyReplacer)}`;
      break;
  case Gn.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Dn.joinValues(e.keys, ", ")}`;
      break;
  case Gn.invalid_union:
      n = "Invalid input";
      break;
  case Gn.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Dn.joinValues(e.options)}`;
      break;
  case Gn.invalid_enum_value:
      n = `Invalid enum value. Expected ${Dn.joinValues(e.options)}, received '${e.received}'`;
      break;
  case Gn.invalid_arguments:
      n = "Invalid function arguments";
      break;
  case Gn.invalid_return_type:
      n = "Invalid function return type";
      break;
  case Gn.invalid_date:
      n = "Invalid date";
      break;
  case Gn.invalid_string:
      "object" == typeof e.validation ? "includes"in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`,
      "number" == typeof e.validation.position && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith"in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith"in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : Dn.assertNever(e.validation) : n = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
      break;
  case Gn.too_small:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
      break;
  case Gn.too_big:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
      break;
  case Gn.custom:
      n = "Invalid input";
      break;
  case Gn.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
  case Gn.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
  case Gn.not_finite:
      n = "Number must be finite";
      break;
  default:
      n = t.defaultError,
      Dn.assertNever(e)
  }
  return {
      message: n
  }
}
;
let qn = Kn;
function Wn() {
  return qn
}
const Yn = e=>{
  const {data: t, path: n, errorMaps: r, issueData: o} = e
    , a = [...n, ...o.path || []]
    , i = {
      ...o,
      path: a
  };
  let s = "";
  const l = r.filter((e=>!!e)).slice().reverse();
  for (const e of l)
      s = e(i, {
          data: t,
          defaultError: s
      }).message;
  return {
      ...o,
      path: a,
      message: o.message || s
  }
}
;
function Jn(e, t) {
  const n = Yn({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, Wn(), Kn].filter((e=>!!e))
  });
  e.common.issues.push(n)
}
class Xn {
  constructor() {
      this.value = "valid"
  }
  dirty() {
      "valid" === this.value && (this.value = "dirty")
  }
  abort() {
      "aborted" !== this.value && (this.value = "aborted")
  }
  static mergeArray(e, t) {
      const n = [];
      for (const r of t) {
          if ("aborted" === r.status)
              return Qn;
          "dirty" === r.status && e.dirty(),
          n.push(r.value)
      }
      return {
          status: e.value,
          value: n
      }
  }
  static async mergeObjectAsync(e, t) {
      const n = [];
      for (const e of t)
          n.push({
              key: await e.key,
              value: await e.value
          });
      return Xn.mergeObjectSync(e, n)
  }
  static mergeObjectSync(e, t) {
      const n = {};
      for (const r of t) {
          const {key: t, value: o} = r;
          if ("aborted" === t.status)
              return Qn;
          if ("aborted" === o.status)
              return Qn;
          "dirty" === t.status && e.dirty(),
          "dirty" === o.status && e.dirty(),
          (void 0 !== o.value || r.alwaysSet) && (n[t.value] = o.value)
      }
      return {
          status: e.value,
          value: n
      }
  }
}
const Qn = Object.freeze({
  status: "aborted"
})
, er = e=>({
  status: "dirty",
  value: e
})
, tr = e=>({
  status: "valid",
  value: e
})
, nr = e=>"aborted" === e.status
, rr = e=>"dirty" === e.status
, or = e=>"valid" === e.status
, ar = e=>"undefined" != typeof Promise && e instanceof Promise;
var ir;
!function(e) {
  e.errToObj = e=>"string" == typeof e ? {
      message: e
  } : e || {},
  e.toString = e=>"string" == typeof e ? e : null == e ? void 0 : e.message
}(ir || (ir = {}));
class sr {
  constructor(e, t, n, r) {
      this._cachedPath = [],
      this.parent = e,
      this.data = t,
      this._path = n,
      this._key = r
  }
  get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
  }
}
const lr = (e,t)=>{
  if (or(t))
      return {
          success: !0,
          data: t.value
      };
  if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
  return {
      success: !1,
      get error() {
          if (this._error)
              return this._error;
          const t = new Hn(e.common.issues);
          return this._error = t,
          this._error
      }
  }
}
;
function cr(e) {
  if (!e)
      return {};
  const {errorMap: t, invalid_type_error: n, required_error: r, description: o} = e;
  if (t && (n || r))
      throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');
  if (t)
      return {
          errorMap: t,
          description: o
      };
  return {
      errorMap: (e,t)=>"invalid_type" !== e.code ? {
          message: t.defaultError
      } : void 0 === t.data ? {
          message: null != r ? r : t.defaultError
      } : {
          message: null != n ? n : t.defaultError
      },
      description: o
  }
}
class dr {
  constructor(e) {
      this.spa = this.safeParseAsync,
      this._def = e,
      this.parse = this.parse.bind(this),
      this.safeParse = this.safeParse.bind(this),
      this.parseAsync = this.parseAsync.bind(this),
      this.safeParseAsync = this.safeParseAsync.bind(this),
      this.spa = this.spa.bind(this),
      this.refine = this.refine.bind(this),
      this.refinement = this.refinement.bind(this),
      this.superRefine = this.superRefine.bind(this),
      this.optional = this.optional.bind(this),
      this.nullable = this.nullable.bind(this),
      this.nullish = this.nullish.bind(this),
      this.array = this.array.bind(this),
      this.promise = this.promise.bind(this),
      this.or = this.or.bind(this),
      this.and = this.and.bind(this),
      this.transform = this.transform.bind(this),
      this.brand = this.brand.bind(this),
      this.default = this.default.bind(this),
      this.catch = this.catch.bind(this),
      this.describe = this.describe.bind(this),
      this.pipe = this.pipe.bind(this),
      this.isNullable = this.isNullable.bind(this),
      this.isOptional = this.isOptional.bind(this)
  }
  get description() {
      return this._def.description
  }
  _getType(e) {
      return Fn(e.data)
  }
  _getOrReturnCtx(e, t) {
      return t || {
          common: e.parent.common,
          data: e.data,
          parsedType: Fn(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
      }
  }
  _processInputParams(e) {
      return {
          status: new Xn,
          ctx: {
              common: e.parent.common,
              data: e.data,
              parsedType: Fn(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent
          }
      }
  }
  _parseSync(e) {
      const t = this._parse(e);
      if (ar(t))
          throw new Error("Synchronous parse encountered promise.");
      return t
  }
  _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t)
  }
  parse(e, t) {
      const n = this.safeParse(e, t);
      if (n.success)
          return n.data;
      throw n.error
  }
  safeParse(e, t) {
      var n;
      const r = {
          common: {
              issues: [],
              async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
              contextualErrorMap: null == t ? void 0 : t.errorMap
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: Fn(e)
      }
        , o = this._parseSync({
          data: e,
          path: r.path,
          parent: r
      });
      return lr(r, o)
  }
  async parseAsync(e, t) {
      const n = await this.safeParseAsync(e, t);
      if (n.success)
          return n.data;
      throw n.error
  }
  async safeParseAsync(e, t) {
      const n = {
          common: {
              issues: [],
              contextualErrorMap: null == t ? void 0 : t.errorMap,
              async: !0
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: Fn(e)
      }
        , r = this._parse({
          data: e,
          path: n.path,
          parent: n
      })
        , o = await (ar(r) ? r : Promise.resolve(r));
      return lr(n, o)
  }
  refine(e, t) {
      const n = e=>"string" == typeof t || void 0 === t ? {
          message: t
      } : "function" == typeof t ? t(e) : t;
      return this._refinement(((t,r)=>{
          const o = e(t)
            , a = ()=>r.addIssue({
              code: Gn.custom,
              ...n(t)
          });
          return "undefined" != typeof Promise && o instanceof Promise ? o.then((e=>!!e || (a(),
          !1))) : !!o || (a(),
          !1)
      }
      ))
  }
  refinement(e, t) {
      return this._refinement(((n,r)=>!!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t),
      !1)))
  }
  _refinement(e) {
      return new Jr({
          schema: this,
          typeName: lo.ZodEffects,
          effect: {
              type: "refinement",
              refinement: e
          }
      })
  }
  superRefine(e) {
      return this._refinement(e)
  }
  optional() {
      return Xr.create(this, this._def)
  }
  nullable() {
      return Qr.create(this, this._def)
  }
  nullish() {
      return this.nullable().optional()
  }
  array() {
      return Or.create(this, this._def)
  }
  promise() {
      return Yr.create(this, this._def)
  }
  or(e) {
      return jr.create([this, e], this._def)
  }
  and(e) {
      return Br.create(this, e, this._def)
  }
  transform(e) {
      return new Jr({
          ...cr(this._def),
          schema: this,
          typeName: lo.ZodEffects,
          effect: {
              type: "transform",
              transform: e
          }
      })
  }
  default(e) {
      const t = "function" == typeof e ? e : ()=>e;
      return new eo({
          ...cr(this._def),
          innerType: this,
          defaultValue: t,
          typeName: lo.ZodDefault
      })
  }
  brand() {
      return new oo({
          typeName: lo.ZodBranded,
          type: this,
          ...cr(this._def)
      })
  }
  catch(e) {
      const t = "function" == typeof e ? e : ()=>e;
      return new to({
          ...cr(this._def),
          innerType: this,
          catchValue: t,
          typeName: lo.ZodCatch
      })
  }
  describe(e) {
      return new (0,
      this.constructor)({
          ...this._def,
          description: e
      })
  }
  pipe(e) {
      return ao.create(this, e)
  }
  isOptional() {
      return this.safeParse(void 0).success
  }
  isNullable() {
      return this.safeParse(null).success
  }
}
const ur = /^c[^\s-]{8,}$/i
, pr = /^[a-z][a-z0-9]*$/
, hr = /[0-9A-HJKMNP-TV-Z]{26}/
, fr = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i
, gr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/
, mr = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u
, br = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/
, vr = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
class yr extends dr {
  constructor() {
      super(...arguments),
      this._regex = (e,t,n)=>this.refinement((t=>e.test(t)), {
          validation: t,
          code: Gn.invalid_string,
          ...ir.errToObj(n)
      }),
      this.nonempty = e=>this.min(1, ir.errToObj(e)),
      this.trim = ()=>new yr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "trim"
          }]
      }),
      this.toLowerCase = ()=>new yr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "toLowerCase"
          }]
      }),
      this.toUpperCase = ()=>new yr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "toUpperCase"
          }]
      })
  }
  _parse(e) {
      this._def.coerce && (e.data = String(e.data));
      if (this._getType(e) !== Vn.string) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.string,
              received: t.parsedType
          }),
          Qn
      }
      const t = new Xn;
      let n;
      for (const i of this._def.checks)
          if ("min" === i.kind)
              e.data.length < i.value && (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.too_small,
                  minimum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message
              }),
              t.dirty());
          else if ("max" === i.kind)
              e.data.length > i.value && (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.too_big,
                  maximum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message
              }),
              t.dirty());
          else if ("length" === i.kind) {
              const r = e.data.length > i.value
                , o = e.data.length < i.value;
              (r || o) && (n = this._getOrReturnCtx(e, n),
              r ? Jn(n, {
                  code: Gn.too_big,
                  maximum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: i.message
              }) : o && Jn(n, {
                  code: Gn.too_small,
                  minimum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: i.message
              }),
              t.dirty())
          } else if ("email" === i.kind)
              gr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "email",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("emoji" === i.kind)
              mr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "emoji",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("uuid" === i.kind)
              fr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "uuid",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("cuid" === i.kind)
              ur.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "cuid",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("cuid2" === i.kind)
              pr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "cuid2",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("ulid" === i.kind)
              hr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "ulid",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("url" === i.kind)
              try {
                  new URL(e.data)
              } catch (r) {
                  n = this._getOrReturnCtx(e, n),
                  Jn(n, {
                      validation: "url",
                      code: Gn.invalid_string,
                      message: i.message
                  }),
                  t.dirty()
              }
          else if ("regex" === i.kind) {
              i.regex.lastIndex = 0;
              i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "regex",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty())
          } else if ("trim" === i.kind)
              e.data = e.data.trim();
          else if ("includes" === i.kind)
              e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.invalid_string,
                  validation: {
                      includes: i.value,
                      position: i.position
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("toLowerCase" === i.kind)
              e.data = e.data.toLowerCase();
          else if ("toUpperCase" === i.kind)
              e.data = e.data.toUpperCase();
          else if ("startsWith" === i.kind)
              e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.invalid_string,
                  validation: {
                      startsWith: i.value
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("endsWith" === i.kind)
              e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.invalid_string,
                  validation: {
                      endsWith: i.value
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("datetime" === i.kind) {
              ((a = i).precision ? a.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${a.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${a.precision}}Z$`) : 0 === a.precision ? a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data) || (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  code: Gn.invalid_string,
                  validation: "datetime",
                  message: i.message
              }),
              t.dirty())
          } else
              "ip" === i.kind ? (r = e.data,
              ("v4" !== (o = i.version) && o || !br.test(r)) && ("v6" !== o && o || !vr.test(r)) && (n = this._getOrReturnCtx(e, n),
              Jn(n, {
                  validation: "ip",
                  code: Gn.invalid_string,
                  message: i.message
              }),
              t.dirty())) : Dn.assertNever(i);
      var r, o, a;
      return {
          status: t.value,
          value: e.data
      }
  }
  _addCheck(e) {
      return new yr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  email(e) {
      return this._addCheck({
          kind: "email",
          ...ir.errToObj(e)
      })
  }
  url(e) {
      return this._addCheck({
          kind: "url",
          ...ir.errToObj(e)
      })
  }
  emoji(e) {
      return this._addCheck({
          kind: "emoji",
          ...ir.errToObj(e)
      })
  }
  uuid(e) {
      return this._addCheck({
          kind: "uuid",
          ...ir.errToObj(e)
      })
  }
  cuid(e) {
      return this._addCheck({
          kind: "cuid",
          ...ir.errToObj(e)
      })
  }
  cuid2(e) {
      return this._addCheck({
          kind: "cuid2",
          ...ir.errToObj(e)
      })
  }
  ulid(e) {
      return this._addCheck({
          kind: "ulid",
          ...ir.errToObj(e)
      })
  }
  ip(e) {
      return this._addCheck({
          kind: "ip",
          ...ir.errToObj(e)
      })
  }
  datetime(e) {
      var t;
      return "string" == typeof e ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: e
      }) : this._addCheck({
          kind: "datetime",
          precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
          offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
          ...ir.errToObj(null == e ? void 0 : e.message)
      })
  }
  regex(e, t) {
      return this._addCheck({
          kind: "regex",
          regex: e,
          ...ir.errToObj(t)
      })
  }
  includes(e, t) {
      return this._addCheck({
          kind: "includes",
          value: e,
          position: null == t ? void 0 : t.position,
          ...ir.errToObj(null == t ? void 0 : t.message)
      })
  }
  startsWith(e, t) {
      return this._addCheck({
          kind: "startsWith",
          value: e,
          ...ir.errToObj(t)
      })
  }
  endsWith(e, t) {
      return this._addCheck({
          kind: "endsWith",
          value: e,
          ...ir.errToObj(t)
      })
  }
  min(e, t) {
      return this._addCheck({
          kind: "min",
          value: e,
          ...ir.errToObj(t)
      })
  }
  max(e, t) {
      return this._addCheck({
          kind: "max",
          value: e,
          ...ir.errToObj(t)
      })
  }
  length(e, t) {
      return this._addCheck({
          kind: "length",
          value: e,
          ...ir.errToObj(t)
      })
  }
  get isDatetime() {
      return !!this._def.checks.find((e=>"datetime" === e.kind))
  }
  get isEmail() {
      return !!this._def.checks.find((e=>"email" === e.kind))
  }
  get isURL() {
      return !!this._def.checks.find((e=>"url" === e.kind))
  }
  get isEmoji() {
      return !!this._def.checks.find((e=>"emoji" === e.kind))
  }
  get isUUID() {
      return !!this._def.checks.find((e=>"uuid" === e.kind))
  }
  get isCUID() {
      return !!this._def.checks.find((e=>"cuid" === e.kind))
  }
  get isCUID2() {
      return !!this._def.checks.find((e=>"cuid2" === e.kind))
  }
  get isULID() {
      return !!this._def.checks.find((e=>"ulid" === e.kind))
  }
  get isIP() {
      return !!this._def.checks.find((e=>"ip" === e.kind))
  }
  get minLength() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxLength() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
}
function wr(e, t) {
  const n = (e.toString().split(".")[1] || "").length
    , r = (t.toString().split(".")[1] || "").length
    , o = n > r ? n : r;
  return parseInt(e.toFixed(o).replace(".", "")) % parseInt(t.toFixed(o).replace(".", "")) / Math.pow(10, o)
}
yr.create = e=>{
  var t;
  return new yr({
      checks: [],
      typeName: lo.ZodString,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...cr(e)
  })
}
;
class _r extends dr {
  constructor() {
      super(...arguments),
      this.min = this.gte,
      this.max = this.lte,
      this.step = this.multipleOf
  }
  _parse(e) {
      this._def.coerce && (e.data = Number(e.data));
      if (this._getType(e) !== Vn.number) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.number,
              received: t.parsedType
          }),
          Qn
      }
      let t;
      const n = new Xn;
      for (const r of this._def.checks)
          if ("int" === r.kind)
              Dn.isInteger(e.data) || (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: r.message
              }),
              n.dirty());
          else if ("min" === r.kind) {
              (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.too_small,
                  minimum: r.value,
                  type: "number",
                  inclusive: r.inclusive,
                  exact: !1,
                  message: r.message
              }),
              n.dirty())
          } else if ("max" === r.kind) {
              (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.too_big,
                  maximum: r.value,
                  type: "number",
                  inclusive: r.inclusive,
                  exact: !1,
                  message: r.message
              }),
              n.dirty())
          } else
              "multipleOf" === r.kind ? 0 !== wr(e.data, r.value) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.not_multiple_of,
                  multipleOf: r.value,
                  message: r.message
              }),
              n.dirty()) : "finite" === r.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.not_finite,
                  message: r.message
              }),
              n.dirty()) : Dn.assertNever(r);
      return {
          status: n.value,
          value: e.data
      }
  }
  gte(e, t) {
      return this.setLimit("min", e, !0, ir.toString(t))
  }
  gt(e, t) {
      return this.setLimit("min", e, !1, ir.toString(t))
  }
  lte(e, t) {
      return this.setLimit("max", e, !0, ir.toString(t))
  }
  lt(e, t) {
      return this.setLimit("max", e, !1, ir.toString(t))
  }
  setLimit(e, t, n, r) {
      return new _r({
          ...this._def,
          checks: [...this._def.checks, {
              kind: e,
              value: t,
              inclusive: n,
              message: ir.toString(r)
          }]
      })
  }
  _addCheck(e) {
      return new _r({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  int(e) {
      return this._addCheck({
          kind: "int",
          message: ir.toString(e)
      })
  }
  positive(e) {
      return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !1,
          message: ir.toString(e)
      })
  }
  negative(e) {
      return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !1,
          message: ir.toString(e)
      })
  }
  nonpositive(e) {
      return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !0,
          message: ir.toString(e)
      })
  }
  nonnegative(e) {
      return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !0,
          message: ir.toString(e)
      })
  }
  multipleOf(e, t) {
      return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: ir.toString(t)
      })
  }
  finite(e) {
      return this._addCheck({
          kind: "finite",
          message: ir.toString(e)
      })
  }
  safe(e) {
      return this._addCheck({
          kind: "min",
          inclusive: !0,
          value: Number.MIN_SAFE_INTEGER,
          message: ir.toString(e)
      })._addCheck({
          kind: "max",
          inclusive: !0,
          value: Number.MAX_SAFE_INTEGER,
          message: ir.toString(e)
      })
  }
  get minValue() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxValue() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
  get isInt() {
      return !!this._def.checks.find((e=>"int" === e.kind || "multipleOf" === e.kind && Dn.isInteger(e.value)))
  }
  get isFinite() {
      let e = null
        , t = null;
      for (const n of this._def.checks) {
          if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind)
              return !0;
          "min" === n.kind ? (null === t || n.value > t) && (t = n.value) : "max" === n.kind && (null === e || n.value < e) && (e = n.value)
      }
      return Number.isFinite(t) && Number.isFinite(e)
  }
}
_r.create = e=>new _r({
  checks: [],
  typeName: lo.ZodNumber,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...cr(e)
});
class xr extends dr {
  constructor() {
      super(...arguments),
      this.min = this.gte,
      this.max = this.lte
  }
  _parse(e) {
      this._def.coerce && (e.data = BigInt(e.data));
      if (this._getType(e) !== Vn.bigint) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.bigint,
              received: t.parsedType
          }),
          Qn
      }
      let t;
      const n = new Xn;
      for (const r of this._def.checks)
          if ("min" === r.kind) {
              (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.too_small,
                  type: "bigint",
                  minimum: r.value,
                  inclusive: r.inclusive,
                  message: r.message
              }),
              n.dirty())
          } else if ("max" === r.kind) {
              (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.too_big,
                  type: "bigint",
                  maximum: r.value,
                  inclusive: r.inclusive,
                  message: r.message
              }),
              n.dirty())
          } else
              "multipleOf" === r.kind ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t),
              Jn(t, {
                  code: Gn.not_multiple_of,
                  multipleOf: r.value,
                  message: r.message
              }),
              n.dirty()) : Dn.assertNever(r);
      return {
          status: n.value,
          value: e.data
      }
  }
  gte(e, t) {
      return this.setLimit("min", e, !0, ir.toString(t))
  }
  gt(e, t) {
      return this.setLimit("min", e, !1, ir.toString(t))
  }
  lte(e, t) {
      return this.setLimit("max", e, !0, ir.toString(t))
  }
  lt(e, t) {
      return this.setLimit("max", e, !1, ir.toString(t))
  }
  setLimit(e, t, n, r) {
      return new xr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: e,
              value: t,
              inclusive: n,
              message: ir.toString(r)
          }]
      })
  }
  _addCheck(e) {
      return new xr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  positive(e) {
      return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !1,
          message: ir.toString(e)
      })
  }
  negative(e) {
      return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !1,
          message: ir.toString(e)
      })
  }
  nonpositive(e) {
      return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !0,
          message: ir.toString(e)
      })
  }
  nonnegative(e) {
      return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !0,
          message: ir.toString(e)
      })
  }
  multipleOf(e, t) {
      return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: ir.toString(t)
      })
  }
  get minValue() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxValue() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
}
xr.create = e=>{
  var t;
  return new xr({
      checks: [],
      typeName: lo.ZodBigInt,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...cr(e)
  })
}
;
class kr extends dr {
  _parse(e) {
      this._def.coerce && (e.data = Boolean(e.data));
      if (this._getType(e) !== Vn.boolean) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.boolean,
              received: t.parsedType
          }),
          Qn
      }
      return tr(e.data)
  }
}
kr.create = e=>new kr({
  typeName: lo.ZodBoolean,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...cr(e)
});
class Cr extends dr {
  _parse(e) {
      this._def.coerce && (e.data = new Date(e.data));
      if (this._getType(e) !== Vn.date) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.date,
              received: t.parsedType
          }),
          Qn
      }
      if (isNaN(e.data.getTime())) {
          return Jn(this._getOrReturnCtx(e), {
              code: Gn.invalid_date
          }),
          Qn
      }
      const t = new Xn;
      let n;
      for (const r of this._def.checks)
          "min" === r.kind ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n),
          Jn(n, {
              code: Gn.too_small,
              message: r.message,
              inclusive: !0,
              exact: !1,
              minimum: r.value,
              type: "date"
          }),
          t.dirty()) : "max" === r.kind ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n),
          Jn(n, {
              code: Gn.too_big,
              message: r.message,
              inclusive: !0,
              exact: !1,
              maximum: r.value,
              type: "date"
          }),
          t.dirty()) : Dn.assertNever(r);
      return {
          status: t.value,
          value: new Date(e.data.getTime())
      }
  }
  _addCheck(e) {
      return new Cr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  min(e, t) {
      return this._addCheck({
          kind: "min",
          value: e.getTime(),
          message: ir.toString(t)
      })
  }
  max(e, t) {
      return this._addCheck({
          kind: "max",
          value: e.getTime(),
          message: ir.toString(t)
      })
  }
  get minDate() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return null != e ? new Date(e) : null
  }
  get maxDate() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return null != e ? new Date(e) : null
  }
}
Cr.create = e=>new Cr({
  checks: [],
  coerce: (null == e ? void 0 : e.coerce) || !1,
  typeName: lo.ZodDate,
  ...cr(e)
});
class Sr extends dr {
  _parse(e) {
      if (this._getType(e) !== Vn.symbol) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.symbol,
              received: t.parsedType
          }),
          Qn
      }
      return tr(e.data)
  }
}
Sr.create = e=>new Sr({
  typeName: lo.ZodSymbol,
  ...cr(e)
});
class Ir extends dr {
  _parse(e) {
      if (this._getType(e) !== Vn.undefined) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.undefined,
              received: t.parsedType
          }),
          Qn
      }
      return tr(e.data)
  }
}
Ir.create = e=>new Ir({
  typeName: lo.ZodUndefined,
  ...cr(e)
});
class $r extends dr {
  _parse(e) {
      if (this._getType(e) !== Vn.null) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.null,
              received: t.parsedType
          }),
          Qn
      }
      return tr(e.data)
  }
}
$r.create = e=>new $r({
  typeName: lo.ZodNull,
  ...cr(e)
});
class Tr extends dr {
  constructor() {
      super(...arguments),
      this._any = !0
  }
  _parse(e) {
      return tr(e.data)
  }
}
Tr.create = e=>new Tr({
  typeName: lo.ZodAny,
  ...cr(e)
});
class Er extends dr {
  constructor() {
      super(...arguments),
      this._unknown = !0
  }
  _parse(e) {
      return tr(e.data)
  }
}
Er.create = e=>new Er({
  typeName: lo.ZodUnknown,
  ...cr(e)
});
class Pr extends dr {
  _parse(e) {
      const t = this._getOrReturnCtx(e);
      return Jn(t, {
          code: Gn.invalid_type,
          expected: Vn.never,
          received: t.parsedType
      }),
      Qn
  }
}
Pr.create = e=>new Pr({
  typeName: lo.ZodNever,
  ...cr(e)
});
class Ar extends dr {
  _parse(e) {
      if (this._getType(e) !== Vn.undefined) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.void,
              received: t.parsedType
          }),
          Qn
      }
      return tr(e.data)
  }
}
Ar.create = e=>new Ar({
  typeName: lo.ZodVoid,
  ...cr(e)
});
class Or extends dr {
  _parse(e) {
      const {ctx: t, status: n} = this._processInputParams(e)
        , r = this._def;
      if (t.parsedType !== Vn.array)
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.array,
              received: t.parsedType
          }),
          Qn;
      if (null !== r.exactLength) {
          const e = t.data.length > r.exactLength.value
            , o = t.data.length < r.exactLength.value;
          (e || o) && (Jn(t, {
              code: e ? Gn.too_big : Gn.too_small,
              minimum: o ? r.exactLength.value : void 0,
              maximum: e ? r.exactLength.value : void 0,
              type: "array",
              inclusive: !0,
              exact: !0,
              message: r.exactLength.message
          }),
          n.dirty())
      }
      if (null !== r.minLength && t.data.length < r.minLength.value && (Jn(t, {
          code: Gn.too_small,
          minimum: r.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.minLength.message
      }),
      n.dirty()),
      null !== r.maxLength && t.data.length > r.maxLength.value && (Jn(t, {
          code: Gn.too_big,
          maximum: r.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.maxLength.message
      }),
      n.dirty()),
      t.common.async)
          return Promise.all([...t.data].map(((e,n)=>r.type._parseAsync(new sr(t,e,t.path,n))))).then((e=>Xn.mergeArray(n, e)));
      const o = [...t.data].map(((e,n)=>r.type._parseSync(new sr(t,e,t.path,n))));
      return Xn.mergeArray(n, o)
  }
  get element() {
      return this._def.type
  }
  min(e, t) {
      return new Or({
          ...this._def,
          minLength: {
              value: e,
              message: ir.toString(t)
          }
      })
  }
  max(e, t) {
      return new Or({
          ...this._def,
          maxLength: {
              value: e,
              message: ir.toString(t)
          }
      })
  }
  length(e, t) {
      return new Or({
          ...this._def,
          exactLength: {
              value: e,
              message: ir.toString(t)
          }
      })
  }
  nonempty(e) {
      return this.min(1, e)
  }
}
function Nr(e) {
  if (e instanceof Mr) {
      const t = {};
      for (const n in e.shape) {
          const r = e.shape[n];
          t[n] = Xr.create(Nr(r))
      }
      return new Mr({
          ...e._def,
          shape: ()=>t
      })
  }
  return e instanceof Or ? new Or({
      ...e._def,
      type: Nr(e.element)
  }) : e instanceof Xr ? Xr.create(Nr(e.unwrap())) : e instanceof Qr ? Qr.create(Nr(e.unwrap())) : e instanceof zr ? zr.create(e.items.map((e=>Nr(e)))) : e
}
Or.create = (e,t)=>new Or({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: lo.ZodArray,
  ...cr(t)
});
class Mr extends dr {
  constructor() {
      super(...arguments),
      this._cached = null,
      this.nonstrict = this.passthrough,
      this.augment = this.extend
  }
  _getCached() {
      if (null !== this._cached)
          return this._cached;
      const e = this._def.shape()
        , t = Dn.objectKeys(e);
      return this._cached = {
          shape: e,
          keys: t
      }
  }
  _parse(e) {
      if (this._getType(e) !== Vn.object) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.object,
              received: t.parsedType
          }),
          Qn
      }
      const {status: t, ctx: n} = this._processInputParams(e)
        , {shape: r, keys: o} = this._getCached()
        , a = [];
      if (!(this._def.catchall instanceof Pr && "strip" === this._def.unknownKeys))
          for (const e in n.data)
              o.includes(e) || a.push(e);
      const i = [];
      for (const e of o) {
          const t = r[e]
            , o = n.data[e];
          i.push({
              key: {
                  status: "valid",
                  value: e
              },
              value: t._parse(new sr(n,o,n.path,e)),
              alwaysSet: e in n.data
          })
      }
      if (this._def.catchall instanceof Pr) {
          const e = this._def.unknownKeys;
          if ("passthrough" === e)
              for (const e of a)
                  i.push({
                      key: {
                          status: "valid",
                          value: e
                      },
                      value: {
                          status: "valid",
                          value: n.data[e]
                      }
                  });
          else if ("strict" === e)
              a.length > 0 && (Jn(n, {
                  code: Gn.unrecognized_keys,
                  keys: a
              }),
              t.dirty());
          else if ("strip" !== e)
              throw new Error("Internal ZodObject error: invalid unknownKeys value.")
      } else {
          const e = this._def.catchall;
          for (const t of a) {
              const r = n.data[t];
              i.push({
                  key: {
                      status: "valid",
                      value: t
                  },
                  value: e._parse(new sr(n,r,n.path,t)),
                  alwaysSet: t in n.data
              })
          }
      }
      return n.common.async ? Promise.resolve().then((async()=>{
          const e = [];
          for (const t of i) {
              const n = await t.key;
              e.push({
                  key: n,
                  value: await t.value,
                  alwaysSet: t.alwaysSet
              })
          }
          return e
      }
      )).then((e=>Xn.mergeObjectSync(t, e))) : Xn.mergeObjectSync(t, i)
  }
  get shape() {
      return this._def.shape()
  }
  strict(e) {
      return ir.errToObj,
      new Mr({
          ...this._def,
          unknownKeys: "strict",
          ...void 0 !== e ? {
              errorMap: (t,n)=>{
                  var r, o, a, i;
                  const s = null !== (a = null === (o = (r = this._def).errorMap) || void 0 === o ? void 0 : o.call(r, t, n).message) && void 0 !== a ? a : n.defaultError;
                  return "unrecognized_keys" === t.code ? {
                      message: null !== (i = ir.errToObj(e).message) && void 0 !== i ? i : s
                  } : {
                      message: s
                  }
              }
          } : {}
      })
  }
  strip() {
      return new Mr({
          ...this._def,
          unknownKeys: "strip"
      })
  }
  passthrough() {
      return new Mr({
          ...this._def,
          unknownKeys: "passthrough"
      })
  }
  extend(e) {
      return new Mr({
          ...this._def,
          shape: ()=>({
              ...this._def.shape(),
              ...e
          })
      })
  }
  merge(e) {
      return new Mr({
          unknownKeys: e._def.unknownKeys,
          catchall: e._def.catchall,
          shape: ()=>({
              ...this._def.shape(),
              ...e._def.shape()
          }),
          typeName: lo.ZodObject
      })
  }
  setKey(e, t) {
      return this.augment({
          [e]: t
      })
  }
  catchall(e) {
      return new Mr({
          ...this._def,
          catchall: e
      })
  }
  pick(e) {
      const t = {};
      return Dn.objectKeys(e).forEach((n=>{
          e[n] && this.shape[n] && (t[n] = this.shape[n])
      }
      )),
      new Mr({
          ...this._def,
          shape: ()=>t
      })
  }
  omit(e) {
      const t = {};
      return Dn.objectKeys(this.shape).forEach((n=>{
          e[n] || (t[n] = this.shape[n])
      }
      )),
      new Mr({
          ...this._def,
          shape: ()=>t
      })
  }
  deepPartial() {
      return Nr(this)
  }
  partial(e) {
      const t = {};
      return Dn.objectKeys(this.shape).forEach((n=>{
          const r = this.shape[n];
          e && !e[n] ? t[n] = r : t[n] = r.optional()
      }
      )),
      new Mr({
          ...this._def,
          shape: ()=>t
      })
  }
  required(e) {
      const t = {};
      return Dn.objectKeys(this.shape).forEach((n=>{
          if (e && !e[n])
              t[n] = this.shape[n];
          else {
              let e = this.shape[n];
              for (; e instanceof Xr; )
                  e = e._def.innerType;
              t[n] = e
          }
      }
      )),
      new Mr({
          ...this._def,
          shape: ()=>t
      })
  }
  keyof() {
      return Kr(Dn.objectKeys(this.shape))
  }
}
Mr.create = (e,t)=>new Mr({
  shape: ()=>e,
  unknownKeys: "strip",
  catchall: Pr.create(),
  typeName: lo.ZodObject,
  ...cr(t)
}),
Mr.strictCreate = (e,t)=>new Mr({
  shape: ()=>e,
  unknownKeys: "strict",
  catchall: Pr.create(),
  typeName: lo.ZodObject,
  ...cr(t)
}),
Mr.lazycreate = (e,t)=>new Mr({
  shape: e,
  unknownKeys: "strip",
  catchall: Pr.create(),
  typeName: lo.ZodObject,
  ...cr(t)
});
class jr extends dr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = this._def.options;
      if (t.common.async)
          return Promise.all(n.map((async e=>{
              const n = {
                  ...t,
                  common: {
                      ...t.common,
                      issues: []
                  },
                  parent: null
              };
              return {
                  result: await e._parseAsync({
                      data: t.data,
                      path: t.path,
                      parent: n
                  }),
                  ctx: n
              }
          }
          ))).then((function(e) {
              for (const t of e)
                  if ("valid" === t.result.status)
                      return t.result;
              for (const n of e)
                  if ("dirty" === n.result.status)
                      return t.common.issues.push(...n.ctx.common.issues),
                      n.result;
              const n = e.map((e=>new Hn(e.ctx.common.issues)));
              return Jn(t, {
                  code: Gn.invalid_union,
                  unionErrors: n
              }),
              Qn
          }
          ));
      {
          let e;
          const r = [];
          for (const o of n) {
              const n = {
                  ...t,
                  common: {
                      ...t.common,
                      issues: []
                  },
                  parent: null
              }
                , a = o._parseSync({
                  data: t.data,
                  path: t.path,
                  parent: n
              });
              if ("valid" === a.status)
                  return a;
              "dirty" !== a.status || e || (e = {
                  result: a,
                  ctx: n
              }),
              n.common.issues.length && r.push(n.common.issues)
          }
          if (e)
              return t.common.issues.push(...e.ctx.common.issues),
              e.result;
          const o = r.map((e=>new Hn(e)));
          return Jn(t, {
              code: Gn.invalid_union,
              unionErrors: o
          }),
          Qn
      }
  }
  get options() {
      return this._def.options
  }
}
jr.create = (e,t)=>new jr({
  options: e,
  typeName: lo.ZodUnion,
  ...cr(t)
});
const Lr = e=>e instanceof Gr ? Lr(e.schema) : e instanceof Jr ? Lr(e.innerType()) : e instanceof Hr ? [e.value] : e instanceof qr ? e.options : e instanceof Wr ? Object.keys(e.enum) : e instanceof eo ? Lr(e._def.innerType) : e instanceof Ir ? [void 0] : e instanceof $r ? [null] : null;
class Rr extends dr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== Vn.object)
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.object,
              received: t.parsedType
          }),
          Qn;
      const n = this.discriminator
        , r = t.data[n]
        , o = this.optionsMap.get(r);
      return o ? t.common.async ? o._parseAsync({
          data: t.data,
          path: t.path,
          parent: t
      }) : o._parseSync({
          data: t.data,
          path: t.path,
          parent: t
      }) : (Jn(t, {
          code: Gn.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n]
      }),
      Qn)
  }
  get discriminator() {
      return this._def.discriminator
  }
  get options() {
      return this._def.options
  }
  get optionsMap() {
      return this._def.optionsMap
  }
  static create(e, t, n) {
      const r = new Map;
      for (const n of t) {
          const t = Lr(n.shape[e]);
          if (!t)
              throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
          for (const o of t) {
              if (r.has(o))
                  throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
              r.set(o, n)
          }
      }
      return new Rr({
          typeName: lo.ZodDiscriminatedUnion,
          discriminator: e,
          options: t,
          optionsMap: r,
          ...cr(n)
      })
  }
}
function Zr(e, t) {
  const n = Fn(e)
    , r = Fn(t);
  if (e === t)
      return {
          valid: !0,
          data: e
      };
  if (n === Vn.object && r === Vn.object) {
      const n = Dn.objectKeys(t)
        , r = Dn.objectKeys(e).filter((e=>-1 !== n.indexOf(e)))
        , o = {
          ...e,
          ...t
      };
      for (const n of r) {
          const r = Zr(e[n], t[n]);
          if (!r.valid)
              return {
                  valid: !1
              };
          o[n] = r.data
      }
      return {
          valid: !0,
          data: o
      }
  }
  if (n === Vn.array && r === Vn.array) {
      if (e.length !== t.length)
          return {
              valid: !1
          };
      const n = [];
      for (let r = 0; r < e.length; r++) {
          const o = Zr(e[r], t[r]);
          if (!o.valid)
              return {
                  valid: !1
              };
          n.push(o.data)
      }
      return {
          valid: !0,
          data: n
      }
  }
  return n === Vn.date && r === Vn.date && +e == +t ? {
      valid: !0,
      data: e
  } : {
      valid: !1
  }
}
class Br extends dr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e)
        , r = (e,r)=>{
          if (nr(e) || nr(r))
              return Qn;
          const o = Zr(e.value, r.value);
          return o.valid ? ((rr(e) || rr(r)) && t.dirty(),
          {
              status: t.value,
              value: o.data
          }) : (Jn(n, {
              code: Gn.invalid_intersection_types
          }),
          Qn)
      }
      ;
      return n.common.async ? Promise.all([this._def.left._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
      }), this._def.right._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
      })]).then((([e,t])=>r(e, t))) : r(this._def.left._parseSync({
          data: n.data,
          path: n.path,
          parent: n
      }), this._def.right._parseSync({
          data: n.data,
          path: n.path,
          parent: n
      }))
  }
}
Br.create = (e,t,n)=>new Br({
  left: e,
  right: t,
  typeName: lo.ZodIntersection,
  ...cr(n)
});
class zr extends dr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== Vn.array)
          return Jn(n, {
              code: Gn.invalid_type,
              expected: Vn.array,
              received: n.parsedType
          }),
          Qn;
      if (n.data.length < this._def.items.length)
          return Jn(n, {
              code: Gn.too_small,
              minimum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array"
          }),
          Qn;
      !this._def.rest && n.data.length > this._def.items.length && (Jn(n, {
          code: Gn.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
      }),
      t.dirty());
      const r = [...n.data].map(((e,t)=>{
          const r = this._def.items[t] || this._def.rest;
          return r ? r._parse(new sr(n,e,n.path,t)) : null
      }
      )).filter((e=>!!e));
      return n.common.async ? Promise.all(r).then((e=>Xn.mergeArray(t, e))) : Xn.mergeArray(t, r)
  }
  get items() {
      return this._def.items
  }
  rest(e) {
      return new zr({
          ...this._def,
          rest: e
      })
  }
}
zr.create = (e,t)=>{
  if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new zr({
      items: e,
      typeName: lo.ZodTuple,
      rest: null,
      ...cr(t)
  })
}
;
class Dr extends dr {
  get keySchema() {
      return this._def.keyType
  }
  get valueSchema() {
      return this._def.valueType
  }
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== Vn.object)
          return Jn(n, {
              code: Gn.invalid_type,
              expected: Vn.object,
              received: n.parsedType
          }),
          Qn;
      const r = []
        , o = this._def.keyType
        , a = this._def.valueType;
      for (const e in n.data)
          r.push({
              key: o._parse(new sr(n,e,n.path,e)),
              value: a._parse(new sr(n,n.data[e],n.path,e))
          });
      return n.common.async ? Xn.mergeObjectAsync(t, r) : Xn.mergeObjectSync(t, r)
  }
  get element() {
      return this._def.valueType
  }
  static create(e, t, n) {
      return new Dr(t instanceof dr ? {
          keyType: e,
          valueType: t,
          typeName: lo.ZodRecord,
          ...cr(n)
      } : {
          keyType: yr.create(),
          valueType: e,
          typeName: lo.ZodRecord,
          ...cr(t)
      })
  }
}
class Ur extends dr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== Vn.map)
          return Jn(n, {
              code: Gn.invalid_type,
              expected: Vn.map,
              received: n.parsedType
          }),
          Qn;
      const r = this._def.keyType
        , o = this._def.valueType
        , a = [...n.data.entries()].map((([e,t],a)=>({
          key: r._parse(new sr(n,e,n.path,[a, "key"])),
          value: o._parse(new sr(n,t,n.path,[a, "value"]))
      })));
      if (n.common.async) {
          const e = new Map;
          return Promise.resolve().then((async()=>{
              for (const n of a) {
                  const r = await n.key
                    , o = await n.value;
                  if ("aborted" === r.status || "aborted" === o.status)
                      return Qn;
                  "dirty" !== r.status && "dirty" !== o.status || t.dirty(),
                  e.set(r.value, o.value)
              }
              return {
                  status: t.value,
                  value: e
              }
          }
          ))
      }
      {
          const e = new Map;
          for (const n of a) {
              const r = n.key
                , o = n.value;
              if ("aborted" === r.status || "aborted" === o.status)
                  return Qn;
              "dirty" !== r.status && "dirty" !== o.status || t.dirty(),
              e.set(r.value, o.value)
          }
          return {
              status: t.value,
              value: e
          }
      }
  }
}
Ur.create = (e,t,n)=>new Ur({
  valueType: t,
  keyType: e,
  typeName: lo.ZodMap,
  ...cr(n)
});
class Vr extends dr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== Vn.set)
          return Jn(n, {
              code: Gn.invalid_type,
              expected: Vn.set,
              received: n.parsedType
          }),
          Qn;
      const r = this._def;
      null !== r.minSize && n.data.size < r.minSize.value && (Jn(n, {
          code: Gn.too_small,
          minimum: r.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.minSize.message
      }),
      t.dirty()),
      null !== r.maxSize && n.data.size > r.maxSize.value && (Jn(n, {
          code: Gn.too_big,
          maximum: r.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.maxSize.message
      }),
      t.dirty());
      const o = this._def.valueType;
      function a(e) {
          const n = new Set;
          for (const r of e) {
              if ("aborted" === r.status)
                  return Qn;
              "dirty" === r.status && t.dirty(),
              n.add(r.value)
          }
          return {
              status: t.value,
              value: n
          }
      }
      const i = [...n.data.values()].map(((e,t)=>o._parse(new sr(n,e,n.path,t))));
      return n.common.async ? Promise.all(i).then((e=>a(e))) : a(i)
  }
  min(e, t) {
      return new Vr({
          ...this._def,
          minSize: {
              value: e,
              message: ir.toString(t)
          }
      })
  }
  max(e, t) {
      return new Vr({
          ...this._def,
          maxSize: {
              value: e,
              message: ir.toString(t)
          }
      })
  }
  size(e, t) {
      return this.min(e, t).max(e, t)
  }
  nonempty(e) {
      return this.min(1, e)
  }
}
Vr.create = (e,t)=>new Vr({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: lo.ZodSet,
  ...cr(t)
});
class Fr extends dr {
  constructor() {
      super(...arguments),
      this.validate = this.implement
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== Vn.function)
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.function,
              received: t.parsedType
          }),
          Qn;
      function n(e, n) {
          return Yn({
              data: e,
              path: t.path,
              errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Wn(), Kn].filter((e=>!!e)),
              issueData: {
                  code: Gn.invalid_arguments,
                  argumentsError: n
              }
          })
      }
      function r(e, n) {
          return Yn({
              data: e,
              path: t.path,
              errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Wn(), Kn].filter((e=>!!e)),
              issueData: {
                  code: Gn.invalid_return_type,
                  returnTypeError: n
              }
          })
      }
      const o = {
          errorMap: t.common.contextualErrorMap
      }
        , a = t.data;
      return this._def.returns instanceof Yr ? tr((async(...e)=>{
          const t = new Hn([])
            , i = await this._def.args.parseAsync(e, o).catch((r=>{
              throw t.addIssue(n(e, r)),
              t
          }
          ))
            , s = await a(...i);
          return await this._def.returns._def.type.parseAsync(s, o).catch((e=>{
              throw t.addIssue(r(s, e)),
              t
          }
          ))
      }
      )) : tr(((...e)=>{
          const t = this._def.args.safeParse(e, o);
          if (!t.success)
              throw new Hn([n(e, t.error)]);
          const i = a(...t.data)
            , s = this._def.returns.safeParse(i, o);
          if (!s.success)
              throw new Hn([r(i, s.error)]);
          return s.data
      }
      ))
  }
  parameters() {
      return this._def.args
  }
  returnType() {
      return this._def.returns
  }
  args(...e) {
      return new Fr({
          ...this._def,
          args: zr.create(e).rest(Er.create())
      })
  }
  returns(e) {
      return new Fr({
          ...this._def,
          returns: e
      })
  }
  implement(e) {
      return this.parse(e)
  }
  strictImplement(e) {
      return this.parse(e)
  }
  static create(e, t, n) {
      return new Fr({
          args: e || zr.create([]).rest(Er.create()),
          returns: t || Er.create(),
          typeName: lo.ZodFunction,
          ...cr(n)
      })
  }
}
class Gr extends dr {
  get schema() {
      return this._def.getter()
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      return this._def.getter()._parse({
          data: t.data,
          path: t.path,
          parent: t
      })
  }
}
Gr.create = (e,t)=>new Gr({
  getter: e,
  typeName: lo.ZodLazy,
  ...cr(t)
});
class Hr extends dr {
  _parse(e) {
      if (e.data !== this._def.value) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              received: t.data,
              code: Gn.invalid_literal,
              expected: this._def.value
          }),
          Qn
      }
      return {
          status: "valid",
          value: e.data
      }
  }
  get value() {
      return this._def.value
  }
}
function Kr(e, t) {
  return new qr({
      values: e,
      typeName: lo.ZodEnum,
      ...cr(t)
  })
}
Hr.create = (e,t)=>new Hr({
  value: e,
  typeName: lo.ZodLiteral,
  ...cr(t)
});
class qr extends dr {
  _parse(e) {
      if ("string" != typeof e.data) {
          const t = this._getOrReturnCtx(e)
            , n = this._def.values;
          return Jn(t, {
              expected: Dn.joinValues(n),
              received: t.parsedType,
              code: Gn.invalid_type
          }),
          Qn
      }
      if (-1 === this._def.values.indexOf(e.data)) {
          const t = this._getOrReturnCtx(e)
            , n = this._def.values;
          return Jn(t, {
              received: t.data,
              code: Gn.invalid_enum_value,
              options: n
          }),
          Qn
      }
      return tr(e.data)
  }
  get options() {
      return this._def.values
  }
  get enum() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  get Values() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  get Enum() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  extract(e) {
      return qr.create(e)
  }
  exclude(e) {
      return qr.create(this.options.filter((t=>!e.includes(t))))
  }
}
qr.create = Kr;
class Wr extends dr {
  _parse(e) {
      const t = Dn.getValidEnumValues(this._def.values)
        , n = this._getOrReturnCtx(e);
      if (n.parsedType !== Vn.string && n.parsedType !== Vn.number) {
          const e = Dn.objectValues(t);
          return Jn(n, {
              expected: Dn.joinValues(e),
              received: n.parsedType,
              code: Gn.invalid_type
          }),
          Qn
      }
      if (-1 === t.indexOf(e.data)) {
          const e = Dn.objectValues(t);
          return Jn(n, {
              received: n.data,
              code: Gn.invalid_enum_value,
              options: e
          }),
          Qn
      }
      return tr(e.data)
  }
  get enum() {
      return this._def.values
  }
}
Wr.create = (e,t)=>new Wr({
  values: e,
  typeName: lo.ZodNativeEnum,
  ...cr(t)
});
class Yr extends dr {
  unwrap() {
      return this._def.type
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== Vn.promise && !1 === t.common.async)
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.promise,
              received: t.parsedType
          }),
          Qn;
      const n = t.parsedType === Vn.promise ? t.data : Promise.resolve(t.data);
      return tr(n.then((e=>this._def.type.parseAsync(e, {
          path: t.path,
          errorMap: t.common.contextualErrorMap
      }))))
  }
}
Yr.create = (e,t)=>new Yr({
  type: e,
  typeName: lo.ZodPromise,
  ...cr(t)
});
class Jr extends dr {
  innerType() {
      return this._def.schema
  }
  sourceType() {
      return this._def.schema._def.typeName === lo.ZodEffects ? this._def.schema.sourceType() : this._def.schema
  }
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e)
        , r = this._def.effect || null;
      if ("preprocess" === r.type) {
          const e = r.transform(n.data);
          return n.common.async ? Promise.resolve(e).then((e=>this._def.schema._parseAsync({
              data: e,
              path: n.path,
              parent: n
          }))) : this._def.schema._parseSync({
              data: e,
              path: n.path,
              parent: n
          })
      }
      const o = {
          addIssue: e=>{
              Jn(n, e),
              e.fatal ? t.abort() : t.dirty()
          }
          ,
          get path() {
              return n.path
          }
      };
      if (o.addIssue = o.addIssue.bind(o),
      "refinement" === r.type) {
          const e = e=>{
              const t = r.refinement(e, o);
              if (n.common.async)
                  return Promise.resolve(t);
              if (t instanceof Promise)
                  throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
              return e
          }
          ;
          if (!1 === n.common.async) {
              const r = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              return "aborted" === r.status ? Qn : ("dirty" === r.status && t.dirty(),
              e(r.value),
              {
                  status: t.value,
                  value: r.value
              })
          }
          return this._def.schema._parseAsync({
              data: n.data,
              path: n.path,
              parent: n
          }).then((n=>"aborted" === n.status ? Qn : ("dirty" === n.status && t.dirty(),
          e(n.value).then((()=>({
              status: t.value,
              value: n.value
          }))))))
      }
      if ("transform" === r.type) {
          if (!1 === n.common.async) {
              const e = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              if (!or(e))
                  return e;
              const a = r.transform(e.value, o);
              if (a instanceof Promise)
                  throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
              return {
                  status: t.value,
                  value: a
              }
          }
          return this._def.schema._parseAsync({
              data: n.data,
              path: n.path,
              parent: n
          }).then((e=>or(e) ? Promise.resolve(r.transform(e.value, o)).then((e=>({
              status: t.value,
              value: e
          }))) : e))
      }
      Dn.assertNever(r)
  }
}
Jr.create = (e,t,n)=>new Jr({
  schema: e,
  typeName: lo.ZodEffects,
  effect: t,
  ...cr(n)
}),
Jr.createWithPreprocess = (e,t,n)=>new Jr({
  schema: t,
  effect: {
      type: "preprocess",
      transform: e
  },
  typeName: lo.ZodEffects,
  ...cr(n)
});
class Xr extends dr {
  _parse(e) {
      return this._getType(e) === Vn.undefined ? tr(void 0) : this._def.innerType._parse(e)
  }
  unwrap() {
      return this._def.innerType
  }
}
Xr.create = (e,t)=>new Xr({
  innerType: e,
  typeName: lo.ZodOptional,
  ...cr(t)
});
class Qr extends dr {
  _parse(e) {
      return this._getType(e) === Vn.null ? tr(null) : this._def.innerType._parse(e)
  }
  unwrap() {
      return this._def.innerType
  }
}
Qr.create = (e,t)=>new Qr({
  innerType: e,
  typeName: lo.ZodNullable,
  ...cr(t)
});
class eo extends dr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      let n = t.data;
      return t.parsedType === Vn.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({
          data: n,
          path: t.path,
          parent: t
      })
  }
  removeDefault() {
      return this._def.innerType
  }
}
eo.create = (e,t)=>new eo({
  innerType: e,
  typeName: lo.ZodDefault,
  defaultValue: "function" == typeof t.default ? t.default : ()=>t.default,
  ...cr(t)
});
class to extends dr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = {
          ...t,
          common: {
              ...t.common,
              issues: []
          }
      }
        , r = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: {
              ...n
          }
      });
      return ar(r) ? r.then((e=>({
          status: "valid",
          value: "valid" === e.status ? e.value : this._def.catchValue({
              get error() {
                  return new Hn(n.common.issues)
              },
              input: n.data
          })
      }))) : {
          status: "valid",
          value: "valid" === r.status ? r.value : this._def.catchValue({
              get error() {
                  return new Hn(n.common.issues)
              },
              input: n.data
          })
      }
  }
  removeCatch() {
      return this._def.innerType
  }
}
to.create = (e,t)=>new to({
  innerType: e,
  typeName: lo.ZodCatch,
  catchValue: "function" == typeof t.catch ? t.catch : ()=>t.catch,
  ...cr(t)
});
class no extends dr {
  _parse(e) {
      if (this._getType(e) !== Vn.nan) {
          const t = this._getOrReturnCtx(e);
          return Jn(t, {
              code: Gn.invalid_type,
              expected: Vn.nan,
              received: t.parsedType
          }),
          Qn
      }
      return {
          status: "valid",
          value: e.data
      }
  }
}
no.create = e=>new no({
  typeName: lo.ZodNaN,
  ...cr(e)
});
const ro = Symbol("zod_brand");
class oo extends dr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = t.data;
      return this._def.type._parse({
          data: n,
          path: t.path,
          parent: t
      })
  }
  unwrap() {
      return this._def.type
  }
}
class ao extends dr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.common.async) {
          return (async()=>{
              const e = await this._def.in._parseAsync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              return "aborted" === e.status ? Qn : "dirty" === e.status ? (t.dirty(),
              er(e.value)) : this._def.out._parseAsync({
                  data: e.value,
                  path: n.path,
                  parent: n
              })
          }
          )()
      }
      {
          const e = this._def.in._parseSync({
              data: n.data,
              path: n.path,
              parent: n
          });
          return "aborted" === e.status ? Qn : "dirty" === e.status ? (t.dirty(),
          {
              status: "dirty",
              value: e.value
          }) : this._def.out._parseSync({
              data: e.value,
              path: n.path,
              parent: n
          })
      }
  }
  static create(e, t) {
      return new ao({
          in: e,
          out: t,
          typeName: lo.ZodPipeline
      })
  }
}
const io = (e,t={},n)=>e ? Tr.create().superRefine(((r,o)=>{
  var a, i;
  if (!e(r)) {
      const e = "function" == typeof t ? t(r) : "string" == typeof t ? {
          message: t
      } : t
        , s = null === (i = null !== (a = e.fatal) && void 0 !== a ? a : n) || void 0 === i || i
        , l = "string" == typeof e ? {
          message: e
      } : e;
      o.addIssue({
          code: "custom",
          ...l,
          fatal: s
      })
  }
}
)) : Tr.create()
, so = {
  object: Mr.lazycreate
};
var lo;
!function(e) {
  e.ZodString = "ZodString",
  e.ZodNumber = "ZodNumber",
  e.ZodNaN = "ZodNaN",
  e.ZodBigInt = "ZodBigInt",
  e.ZodBoolean = "ZodBoolean",
  e.ZodDate = "ZodDate",
  e.ZodSymbol = "ZodSymbol",
  e.ZodUndefined = "ZodUndefined",
  e.ZodNull = "ZodNull",
  e.ZodAny = "ZodAny",
  e.ZodUnknown = "ZodUnknown",
  e.ZodNever = "ZodNever",
  e.ZodVoid = "ZodVoid",
  e.ZodArray = "ZodArray",
  e.ZodObject = "ZodObject",
  e.ZodUnion = "ZodUnion",
  e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
  e.ZodIntersection = "ZodIntersection",
  e.ZodTuple = "ZodTuple",
  e.ZodRecord = "ZodRecord",
  e.ZodMap = "ZodMap",
  e.ZodSet = "ZodSet",
  e.ZodFunction = "ZodFunction",
  e.ZodLazy = "ZodLazy",
  e.ZodLiteral = "ZodLiteral",
  e.ZodEnum = "ZodEnum",
  e.ZodEffects = "ZodEffects",
  e.ZodNativeEnum = "ZodNativeEnum",
  e.ZodOptional = "ZodOptional",
  e.ZodNullable = "ZodNullable",
  e.ZodDefault = "ZodDefault",
  e.ZodCatch = "ZodCatch",
  e.ZodPromise = "ZodPromise",
  e.ZodBranded = "ZodBranded",
  e.ZodPipeline = "ZodPipeline"
}(lo || (lo = {}));
const co = yr.create
, uo = _r.create
, po = no.create
, ho = xr.create
, fo = kr.create
, go = Cr.create
, mo = Sr.create
, bo = Ir.create
, vo = $r.create
, yo = Tr.create
, wo = Er.create
, _o = Pr.create
, xo = Ar.create
, ko = Or.create
, Co = Mr.create
, So = Mr.strictCreate
, Io = jr.create
, $o = Rr.create
, To = Br.create
, Eo = zr.create
, Po = Dr.create
, Ao = Ur.create
, Oo = Vr.create
, No = Fr.create
, Mo = Gr.create
, jo = Hr.create
, Lo = qr.create
, Ro = Wr.create
, Zo = Yr.create
, Bo = Jr.create
, zo = Xr.create
, Do = Qr.create
, Uo = Jr.createWithPreprocess
, Vo = ao.create
, Fo = {
  string: e=>yr.create({
      ...e,
      coerce: !0
  }),
  number: e=>_r.create({
      ...e,
      coerce: !0
  }),
  boolean: e=>kr.create({
      ...e,
      coerce: !0
  }),
  bigint: e=>xr.create({
      ...e,
      coerce: !0
  }),
  date: e=>Cr.create({
      ...e,
      coerce: !0
  })
}
, Go = Qn;
var Ho = Object.freeze({
  __proto__: null,
  defaultErrorMap: Kn,
  setErrorMap: function(e) {
      qn = e
  },
  getErrorMap: Wn,
  makeIssue: Yn,
  EMPTY_PATH: [],
  addIssueToContext: Jn,
  ParseStatus: Xn,
  INVALID: Qn,
  DIRTY: er,
  OK: tr,
  isAborted: nr,
  isDirty: rr,
  isValid: or,
  isAsync: ar,
  get util() {
      return Dn
  },
  get objectUtil() {
      return Un
  },
  ZodParsedType: Vn,
  getParsedType: Fn,
  ZodType: dr,
  ZodString: yr,
  ZodNumber: _r,
  ZodBigInt: xr,
  ZodBoolean: kr,
  ZodDate: Cr,
  ZodSymbol: Sr,
  ZodUndefined: Ir,
  ZodNull: $r,
  ZodAny: Tr,
  ZodUnknown: Er,
  ZodNever: Pr,
  ZodVoid: Ar,
  ZodArray: Or,
  ZodObject: Mr,
  ZodUnion: jr,
  ZodDiscriminatedUnion: Rr,
  ZodIntersection: Br,
  ZodTuple: zr,
  ZodRecord: Dr,
  ZodMap: Ur,
  ZodSet: Vr,
  ZodFunction: Fr,
  ZodLazy: Gr,
  ZodLiteral: Hr,
  ZodEnum: qr,
  ZodNativeEnum: Wr,
  ZodPromise: Yr,
  ZodEffects: Jr,
  ZodTransformer: Jr,
  ZodOptional: Xr,
  ZodNullable: Qr,
  ZodDefault: eo,
  ZodCatch: to,
  ZodNaN: no,
  BRAND: ro,
  ZodBranded: oo,
  ZodPipeline: ao,
  custom: io,
  Schema: dr,
  ZodSchema: dr,
  late: so,
  get ZodFirstPartyTypeKind() {
      return lo
  },
  coerce: Fo,
  any: yo,
  array: ko,
  bigint: ho,
  boolean: fo,
  date: go,
  discriminatedUnion: $o,
  effect: Bo,
  enum: Lo,
  function: No,
  instanceof: (e,t={
      message: `Input not instance of ${e.name}`
  })=>io((t=>t instanceof e), t),
  intersection: To,
  lazy: Mo,
  literal: jo,
  map: Ao,
  nan: po,
  nativeEnum: Ro,
  never: _o,
  null: vo,
  nullable: Do,
  number: uo,
  object: Co,
  oboolean: ()=>fo().optional(),
  onumber: ()=>uo().optional(),
  optional: zo,
  ostring: ()=>co().optional(),
  pipeline: Vo,
  preprocess: Uo,
  promise: Zo,
  record: Po,
  set: Oo,
  strictObject: So,
  string: co,
  symbol: mo,
  transformer: Bo,
  tuple: Eo,
  undefined: bo,
  union: Io,
  unknown: wo,
  void: xo,
  NEVER: Go,
  ZodIssueCode: Gn,
  quotelessJson: e=>JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  ZodError: Hn
});
const Ko = Ho.object({
  id: Ho.string(),
  groupId: Ho.string(),
  outgoingEdgeId: Ho.string().optional()
})
, qo = Ho.object({
  variableId: Ho.string().optional()
});
Ho.object({
  id: Ho.string(),
  createdAt: Ho.date(),
  workspaceId: Ho.string(),
  name: Ho.string(),
  iv: Ho.string()
});
const Wo = qo.merge(Ho.object({
  isRequired: Ho.boolean().optional(),
  isMultipleAllowed: Ho.boolean(),
  labels: Ho.object({
      placeholder: Ho.string(),
      button: Ho.string(),
      clear: Ho.string().optional(),
      skip: Ho.string().optional()
  }),
  sizeLimit: Ho.number().optional()
}));
Ko.merge(Ho.object({
  type: Ho.literal(Ae.FILE),
  options: Wo
}));
const Yo = {
  placeholder: "<strong>\n      Click to upload\n    </strong> or drag and drop<br>\n    (size limit: 10MB)",
  button: "Upload",
  clear: "Clear",
  skip: "Skip"
}
, Jo = ue('<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="upload-progress-bar h-2.5 rounded-full">')
, Xo = ue('<span class="relative"><div class="total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 w-4 h-4">')
, Qo = ue('<div class="flex flex-col justify-center items-center"><p class="text-sm text-gray-500 text-center">')
, ea = ue('<input id="dropzone-file" type="file" class="hidden">')
, ta = ue('<div class="flex justify-end">')
, na = ue('<div class="flex justify-end"><div class="flex gap-2">')
, ra = ue('<p class="text-red-500 text-sm">')
, oa = ue('<form class="flex flex-col w-full gap-2"><label for="dropzone-file">')
, aa = ue('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16">')
, ia = ue('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9">')
, sa = e=>{
  const [t,n] = x([])
    , [r,o] = x(!1)
    , [a,i] = x(0)
    , [s,l] = x(!1)
    , [c,d] = x()
    , u = r=>{
      d(void 0);
      const o = Array.from(r);
      return o.some((t=>t.size > 1024 * (e.block.options.sizeLimit ?? 10) * 1024)) ? d(`A file is larger than ${e.block.options.sizeLimit ?? 10}MB`) : !e.block.options.isMultipleAllowed && r ? h(o[0]) : void n([...t(), ...o])
  }
    , p = async e=>{
      e.preventDefault(),
      0 !== t().length && f(t())
  }
    , h = async t=>{
      if (e.context.isPreview)
          return e.onSubmit({
              label: "File uploaded",
              value: "http://fake-upload-url.com"
          });
      o(!0);
      const n = await Be({
          basePath: `${e.context.apiHost ?? ft()}/api/typebots/${e.context.typebot.id}/blocks/${e.block.id}`,
          files: [{
              file: t,
              path: `public/results/${e.context.resultId}/${e.block.id}/${t.name}`
          }]
      });
      if (o(!1),
      n.length)
          return e.onSubmit({
              label: "File uploaded",
              value: n[0] ?? ""
          });
      d("An error occured while uploading the file")
  }
    , f = async t=>{
      if (e.context.isPreview)
          return e.onSubmit({
              label: `${t.length} file ${t.length > 1 ? "s" : ""} uploaded`,
              value: t.map(((e,t)=>`http://fake-upload-url.com/${t}`)).join(", ")
          });
      o(!0);
      const n = await Be({
          basePath: `${e.context.apiHost ?? ft()}/api/typebots/${e.context.typebot.id}/blocks/${e.block.id}`,
          files: t.map((t=>({
              file: t,
              path: `public/results/${e.context.resultId}/${e.block.id}/${t.name}`
          }))),
          onUploadProgress: i
      });
      if (o(!1),
      i(0),
      n.length !== t.length)
          return d("An error occured while uploading the files");
      e.onSubmit({
          label: `${n.length} file ${n.length > 1 ? "s" : ""} uploaded`,
          value: n.join(", ")
      })
  }
    , g = e=>{
      e.preventDefault(),
      l(!0)
  }
    , m = ()=>l(!1)
    , b = e=>{
      e.preventDefault(),
      e.stopPropagation(),
      e.dataTransfer?.files && u(e.dataTransfer.files)
  }
    , v = ()=>n([])
    , y = ()=>e.onSkip(e.block.options.labels.skip ?? Yo.skip);
  return (()=>{
      const n = oa()
        , o = n.firstChild;
      return n.addEventListener("submit", p),
      o.addEventListener("drop", b),
      o.addEventListener("dragleave", m),
      o.addEventListener("dragover", g),
      be(o, G(ne, {
          get children() {
              return [G(re, {
                  get when() {
                      return r()
                  },
                  get children() {
                      return G(te, {
                          get when() {
                              return t().length > 1
                          },
                          get fallback() {
                              return G(xt, {})
                          },
                          get children() {
                              const e = Jo()
                                , t = e.firstChild;
                              return t.style.setProperty("transition", "width 150ms cubic-bezier(0.4, 0, 0.2, 1)"),
                              k((()=>null != `${a() > 0 ? a : 10}%` ? t.style.setProperty("width", `${a() > 0 ? a : 10}%`) : t.style.removeProperty("width"))),
                              e
                          }
                      })
                  }
              }), G(re, {
                  get when() {
                      return !r()
                  },
                  get children() {
                      return [(()=>{
                          const n = Qo()
                            , r = n.firstChild;
                          return be(n, G(te, {
                              get when() {
                                  return t().length
                              },
                              get fallback() {
                                  return G(la, {})
                              },
                              get children() {
                                  const e = Xo()
                                    , n = e.firstChild;
                                  return be(e, G(ca, {}), n),
                                  n.style.setProperty("bottom", "5px"),
                                  be(n, (()=>t().length)),
                                  e
                              }
                          }), r),
                          k((()=>r.innerHTML = e.block.options.labels.placeholder)),
                          n
                      }
                      )(), (()=>{
                          const t = ea();
                          return t.addEventListener("change", (e=>{
                              e.currentTarget.files && u(e.currentTarget.files)
                          }
                          )),
                          k((()=>t.multiple = e.block.options.isMultipleAllowed)),
                          t
                      }
                      )()]
                  }
              })]
          }
      })),
      be(n, G(te, {
          get when() {
              return 0 === t().length && !1 === e.block.options.isRequired
          },
          get children() {
              const t = ta();
              return be(t, G(Ct, {
                  "on:click": y,
                  get children() {
                      return e.block.options.labels.skip ?? Yo.skip
                  }
              })),
              t
          }
      }), null),
      be(n, G(te, {
          get when() {
              return S((()=>!!(e.block.options.isMultipleAllowed && t().length > 0)))() && !r()
          },
          get children() {
              const n = na()
                , r = n.firstChild;
              return be(r, G(te, {
                  get when() {
                      return t().length
                  },
                  get children() {
                      return G(Ct, {
                          variant: "secondary",
                          "on:click": v,
                          get children() {
                              return e.block.options.labels.clear ?? Yo.clear
                          }
                      })
                  }
              }), null),
              be(r, G(St, {
                  type: "submit",
                  disableIcon: !0,
                  get children() {
                      return S((()=>e.block.options.labels.button === Yo.button))() ? `Upload ${t().length} file ${t().length > 1 ? "s" : ""}` : e.block.options.labels.button
                  }
              }), null),
              n
          }
      }), null),
      be(n, G(te, {
          get when() {
              return c()
          },
          get children() {
              const e = ra();
              return be(e, c),
              e
          }
      }), null),
      k((()=>fe(o, "typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 " + (s() ? "dragging-over" : "")))),
      n
  }
  )()
}
, la = ()=>aa()
, ca = ()=>ia();
let da = function(e) {
  return e.STRIPE = "Stripe",
  e
}({});
const ua = ue('<div class="typebot-input-error-message mt-4 text-center animate-fade-in">')
, pa = ue('<form id="payment-form" class="flex flex-col p-4 typebot-input w-full items-center"><slot name="stripe-payment-form">');
let ha, fa = null, ga = null;
const ma = e=>{
  const [t,n] = x()
    , [r,o] = x(!1)
    , [a,i] = x(!1);
  $((async()=>{
      var t;
      if (ba(ha),
      fa = await (t = e.options.publicKey,
      new Promise((e=>{
          if (window.Stripe)
              return e(window.Stripe(t));
          const n = document.createElement("script");
          n.src = "https://js.stripe.com/v3",
          document.body.appendChild(n),
          n.onload = ()=>{
              if (!window.Stripe)
                  throw new Error("Stripe.js failed to load.");
              e(window.Stripe(t))
          }
      }
      ))),
      !fa)
          return;
      ga = fa.elements({
          appearance: {
              theme: "stripe",
              variables: {
                  colorPrimary: getComputedStyle(ha).getPropertyValue("--typebot-button-bg-color")
              }
          },
          clientSecret: e.options.paymentIntentSecret
      });
      ga.create("payment", {
          layout: "tabs"
      }).mount("#payment-element"),
      setTimeout((()=>o(!0)), 1e3)
  }
  ));
  const s = async t=>{
      if (t.preventDefault(),
      !fa || !ga)
          return;
      var r;
      i(!0),
      r = {
          sessionId: e.context.sessionId,
          typebot: e.context.typebot
      },
      sessionStorage.setItem("typebotPaymentInProgress", JSON.stringify(r));
      const {error: o, paymentIntent: a} = await fa.confirmPayment({
          elements: ga,
          confirmParams: {
              return_url: window.location.href,
              payment_method_data: {
                  billing_details: {
                      name: e.options.additionalInformation?.name,
                      email: e.options.additionalInformation?.email,
                      phone: e.options.additionalInformation?.phoneNumber,
                      address: {
                          ...e.options.additionalInformation?.address,
                          postal_code: e.options.additionalInformation?.address?.postalCode
                      }
                  }
              }
          },
          redirect: "if_required"
      });
      return mt(),
      i(!1),
      "validation_error" !== o?.type ? "card_error" === o?.type ? n(o.message) : o || "succeeded" !== a.status ? void 0 : e.onSuccess() : void 0
  }
  ;
  return (()=>{
      const n = pa()
        , o = n.firstChild;
      n.addEventListener("submit", s);
      return "function" == typeof ha ? me(ha, o) : ha = o,
      o._$owner = g,
      be(n, G(te, {
          get when() {
              return r()
          },
          get children() {
              return G(St, {
                  get isLoading() {
                      return a()
                  },
                  class: "mt-4 w-full max-w-lg animate-fade-in",
                  disableIcon: !0,
                  get children() {
                      return [S((()=>e.options.labels.button)), " ", S((()=>e.options.amountLabel))]
                  }
              })
          }
      }), null),
      be(n, G(te, {
          get when() {
              return t()
          },
          get children() {
              const e = ua();
              return be(e, t),
              e
          }
      }), null),
      n
  }
  )()
}
, ba = e=>{
  const t = e.getRootNode().host
    , n = document.createElement("div");
  n.style.width = "100%",
  n.slot = "stripe-payment-form",
  t.appendChild(n);
  const r = document.createElement("div");
  r.id = "payment-element",
  n.appendChild(r)
}
, va = e=>G(ne, {
  get children() {
      return G(re, {
          get when() {
              return e.options.provider === da.STRIPE
          },
          get children() {
              return G(ma, {
                  get onSuccess() {
                      return e.onSuccess
                  },
                  get options() {
                      return e.options
                  },
                  get context() {
                      return e.context
                  }
              })
          }
      })
  }
})
, ya = ue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12">')
, wa = e=>(()=>{
  const t = ya();
  return ge(t, e, !0, !0),
  t
}
)()
, _a = ue("<div>")
, xa = e=>(()=>{
  const t = _a();
  return be(t, G(te, {
      get when() {
          return e.isChecked
      },
      get children() {
          return G(wa, {})
      }
  })),
  k((()=>fe(t, "w-4 h-4 typebot-checkbox" + (e.isChecked ? " checked" : "") + (e.class ? ` ${e.class}` : "")))),
  t
}
)()
, ka = ue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">')
, Ca = e=>(()=>{
  const t = ka();
  return ge(t, e, !0, !0),
  t
}
)()
, Sa = ue('<button class="w-5 h-5">')
, Ia = ue('<div class="flex justify-between items-center gap-2 w-full pr-4"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">')
, $a = e=>{
  const [t,n] = x("")
    , [r,o] = J(e, ["onInput", "ref"])
    , a = ()=>{
      n(""),
      e.onClear()
  }
  ;
  return (()=>{
      const i = Ia()
        , s = i.firstChild;
      s.$$input = e=>(e=>{
          n(e),
          r.onInput(e)
      }
      )(e.currentTarget.value);
      const l = e.ref;
      return "function" == typeof l ? me(l, s) : e.ref = s,
      s.style.setProperty("font-size", "16px"),
      ge(s, Y({
          get value() {
              return t()
          }
      }, o), !1, !1),
      be(i, G(te, {
          get when() {
              return t().length > 0
          },
          get children() {
              const e = Sa();
              return e.addEventListener("click", a),
              be(e, G(Ca, {})),
              e
          }
      }), null),
      i
  }
  )()
}
;
pe(["input"]);
let Ta = function(e) {
  return e[e.BUTTON = 0] = "BUTTON",
  e[e.CONDITION = 1] = "CONDITION",
  e[e.AB_TEST = 2] = "AB_TEST",
  e[e.PICTURE_CHOICE = 3] = "PICTURE_CHOICE",
  e
}({});
const Ea = Ho.object({
  id: Ho.string(),
  blockId: Ho.string(),
  outgoingEdgeId: Ho.string().optional()
})
, Pa = "Send";
let Aa = function(e) {
  return e.OR = "OR",
  e.AND = "AND",
  e
}({})
, Oa = function(e) {
  return e.EQUAL = "Equal to",
  e.NOT_EQUAL = "Not equal",
  e.CONTAINS = "Contains",
  e.NOT_CONTAINS = "Does not contain",
  e.GREATER = "Greater than",
  e.LESS = "Less than",
  e.IS_SET = "Is set",
  e.IS_EMPTY = "Is empty",
  e.STARTS_WITH = "Starts with",
  e.ENDS_WITH = "Ends with",
  e.MATCHES_REGEX = "Matches regex",
  e.NOT_MATCH_REGEX = "Does not match regex",
  e
}({});
const Na = Ho.object({
  id: Ho.string(),
  variableId: Ho.string().optional(),
  comparisonOperator: Ho.nativeEnum(Oa).optional(),
  value: Ho.string().optional()
})
, Ma = Ho.object({
  logicalOperator: Ho.nativeEnum(Aa),
  comparisons: Ho.array(Na)
})
, ja = Ea.merge(Ho.object({
  type: Ho.literal(Ta.CONDITION),
  content: Ma
}));
Ko.merge(Ho.object({
  type: Ho.enum([Ne.CONDITION]),
  items: Ho.array(ja)
})),
Aa.AND;
const La = qo.merge(Ho.object({
  isMultipleChoice: Ho.boolean(),
  buttonLabel: Ho.string(),
  dynamicVariableId: Ho.string().optional(),
  isSearchable: Ho.boolean().optional(),
  searchInputPlaceholder: Ho.string().optional()
}))
, Ra = "Filter the options..."
, Za = Ea.merge(Ho.object({
  type: Ho.literal(Ta.BUTTON),
  content: Ho.string().optional(),
  displayCondition: Ho.object({
      isEnabled: Ho.boolean().optional(),
      condition: Ma.optional()
  }).optional()
}));
Ko.merge(Ho.object({
  type: Ho.enum([Ae.CHOICE]),
  items: Ho.array(Za),
  options: La
}));
const Ba = ue('<div class="flex items-end typebot-input w-full">')
, za = ue('<form class="flex flex-col items-end gap-2 w-full"><div>')
, Da = ue('<span><div role="checkbox"><div class="flex items-center gap-2"><span>')
, Ua = ue('<span><div role="checkbox" aria-checked class="w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable selected"><div class="flex items-center gap-2"><span>')
, Va = e=>{
  let t;
  const [n,r] = x(e.defaultItems)
    , [o,a] = x([]);
  $((()=>{
      !bt() && t && t.focus()
  }
  ));
  const i = e=>{
      s(e)
  }
    , s = e=>{
      const t = o().indexOf(e);
      a(-1 !== t ? t=>t.filter((t=>t !== e)) : t=>[...t, e])
  }
    , l = ()=>e.onSubmit({
      value: o().map((t=>e.defaultItems.find((e=>e.id === t))?.content)).join(", ")
  })
    , c = t=>{
      r(e.defaultItems.filter((e=>e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = za()
        , s = a.firstChild;
      return a.addEventListener("submit", l),
      be(a, G(te, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = Ba();
              return be(n, G($a, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: c,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? Ra
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), s),
      be(s, G(ee, {
          get each() {
              return n()
          },
          children: e=>(()=>{
              const t = Da()
                , n = t.firstChild
                , r = n.firstChild
                , a = r.firstChild;
              return n.addEventListener("click", (()=>i(e.id))),
              be(r, G(xa, {
                  get isChecked() {
                      return o().some((t=>t === e.id))
                  }
              }), a),
              be(a, (()=>e.content)),
              k((r=>{
                  const a = "relative" + (bt() ? " w-full" : "")
                    , i = o().some((t=>t === e.id))
                    , s = "w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable" + (o().some((t=>t === e.id)) ? " selected" : "")
                    , l = e.id;
                  return a !== r._v$ && fe(t, r._v$ = a),
                  i !== r._v$2 && he(n, "aria-checked", r._v$2 = i),
                  s !== r._v$3 && fe(n, r._v$3 = s),
                  l !== r._v$4 && he(n, "data-itemid", r._v$4 = l),
                  r
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0
              }),
              t
          }
          )()
      }), null),
      be(s, G(ee, {
          get each() {
              return o().filter((e=>n().every((t=>t.id !== e))))
          },
          children: t=>(()=>{
              const n = Ua()
                , r = n.firstChild
                , o = r.firstChild
                , a = o.firstChild;
              return r.addEventListener("click", (()=>i(t))),
              he(r, "data-itemid", t),
              be(o, G(xa, {
                  isChecked: !0
              }), a),
              be(a, (()=>e.defaultItems.find((e=>e.id === t))?.content)),
              k((()=>fe(n, "relative" + (bt() ? " w-full" : "")))),
              n
          }
          )()
      }), null),
      be(a, (()=>{
          const t = S((()=>o().length > 0));
          return ()=>t() && G(St, {
              disableIcon: !0,
              get children() {
                  return e.options?.buttonLabel ?? "Send"
              }
          })
      }
      )(), null),
      k((()=>fe(s, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, Fa = ue('<div class="flex items-end typebot-input w-full">')
, Ga = ue('<div class="flex flex-col gap-2 w-full"><div>')
, Ha = ue("<span>")
, Ka = ue('<span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"><span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 brightness-150">')
, qa = e=>{
  let t;
  const [n,r] = x(e.defaultItems);
  $((()=>{
      !bt() && t && t.focus()
  }
  ));
  const o = t=>{
      r(e.defaultItems.filter((e=>e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = Ga()
        , i = a.firstChild;
      return be(a, G(te, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = Fa();
              return be(n, G($a, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: o,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? Ra
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), i),
      be(i, G(ee, {
          get each() {
              return n()
          },
          children: (t,r)=>(()=>{
              const o = Ha();
              return be(o, G(Ct, {
                  get "on:click"() {
                      return t = r(),
                      ()=>e.onSubmit({
                          value: n()[t].content ?? ""
                      });
                      var t
                  },
                  get "data-itemid"() {
                      return t.id
                  },
                  class: "w-full",
                  get children() {
                      return t.content
                  }
              }), null),
              be(o, (()=>{
                  const t = S((()=>!(0 !== e.inputIndex || 1 !== e.defaultItems.length)));
                  return ()=>t() && Ka()
              }
              )(), null),
              k((()=>fe(o, "relative" + (bt() ? " w-full" : "")))),
              o
          }
          )()
      })),
      k((()=>fe(i, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, Wa = ue('<div class="flex items-end typebot-input w-full">')
, Ya = ue('<div class="flex flex-col gap-2 w-full"><div>')
, Ja = ue('<button><img fetchpriority="high" class="m-auto"><div><span class="font-semibold"></span><span class="text-sm whitespace-pre-wrap text-left">')
, Xa = e=>{
  let t;
  const [n,r] = x(e.defaultItems);
  $((()=>{
      !bt() && t && t.focus()
  }
  ));
  const o = t=>{
      r(e.defaultItems.filter((e=>e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = Ya()
        , i = a.firstChild;
      return be(a, G(te, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = Wa();
              return be(n, G($a, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: o,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? ""
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), i),
      be(i, G(ee, {
          get each() {
              return n()
          },
          children: (t,r)=>(()=>{
              const o = Ja()
                , a = o.firstChild
                , i = a.nextSibling
                , s = i.firstChild
                , l = s.nextSibling;
              var c;
              return o.addEventListener("click", (c = r(),
              ()=>{
                  const t = n()[c].pictureSrc;
                  if (t)
                      return e.onSubmit({
                          value: n()[c].title ?? t
                      })
              }
              )),
              be(s, (()=>t.title)),
              be(l, (()=>t.description)),
              k((e=>{
                  const n = t.id
                    , s = "flex flex-col typebot-picture-button focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  " + (De(t.pictureSrc) ? "has-svg" : "")
                    , l = t.pictureSrc
                    , c = t.title ?? `Picture ${r() + 1}`
                    , d = `Picture choice ${r() + 1}`
                    , u = "flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full" + (t.description ? " items-start" : "");
                  return n !== e._v$ && he(o, "data-itemid", e._v$ = n),
                  s !== e._v$2 && fe(o, e._v$2 = s),
                  l !== e._v$3 && he(a, "src", e._v$3 = l),
                  c !== e._v$4 && he(a, "alt", e._v$4 = c),
                  d !== e._v$5 && he(a, "elementtiming", e._v$5 = d),
                  u !== e._v$6 && fe(i, e._v$6 = u),
                  e
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0
              }),
              o
          }
          )()
      })),
      k((()=>fe(i, "gap-2 flex flex-wrap justify-end" + (e.options.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, Qa = qo.merge(Ho.object({
  isMultipleChoice: Ho.boolean().optional(),
  isSearchable: Ho.boolean().optional(),
  buttonLabel: Ho.string(),
  searchInputPlaceholder: Ho.string(),
  dynamicItems: Ho.object({
      isEnabled: Ho.boolean().optional(),
      titlesVariableId: Ho.string().optional(),
      descriptionsVariableId: Ho.string().optional(),
      pictureSrcsVariableId: Ho.string().optional()
  }).optional()
}))
, ei = Ea.merge(Ho.object({
  type: Ho.literal(Ta.PICTURE_CHOICE),
  pictureSrc: Ho.string().optional(),
  title: Ho.string().optional(),
  description: Ho.string().optional(),
  displayCondition: Ho.object({
      isEnabled: Ho.boolean().optional(),
      condition: Ma.optional()
  }).optional()
}));
Ko.merge(Ho.object({
  type: Ho.enum([Ae.PICTURE_CHOICE]),
  items: Ho.array(ei),
  options: Qa
}));
const ti = Pa
, ni = "Filter the options..."
, ri = ue('<div class="flex items-end typebot-input w-full">')
, oi = ue('<form class="flex flex-col gap-2 w-full items-end"><div>')
, ai = ue('<span class="font-semibold">')
, ii = ue('<span class="text-sm whitespace-pre-wrap text-left">')
, si = ue('<div class="flex flex-col gap-1 ">')
, li = ue('<div role="checkbox"><img fetchpriority="high" class="m-auto"><div>')
, ci = ue('<div role="checkbox" aria-checked class="flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture selected"><img fetchpriority="high"><div>')
, di = e=>{
  let t;
  const [n,r] = x(e.defaultItems)
    , [o,a] = x([]);
  $((()=>{
      !bt() && t && t.focus()
  }
  ));
  const i = e=>{
      s(e)
  }
    , s = e=>{
      const t = o().indexOf(e);
      a(-1 !== t ? t=>t.filter((t=>t !== e)) : t=>[...t, e])
  }
    , l = ()=>e.onSubmit({
      value: o().map((t=>{
          const n = e.defaultItems.find((e=>e.id === t));
          return n?.title ?? n?.pictureSrc
      }
      )).join(", ")
  })
    , c = t=>{
      r(e.defaultItems.filter((e=>e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = oi()
        , s = a.firstChild;
      return a.addEventListener("submit", l),
      be(a, G(te, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = ri();
              return be(n, G($a, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: c,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? ni
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), s),
      be(s, G(ee, {
          get each() {
              return n()
          },
          children: (e,t)=>(()=>{
              const n = li()
                , r = n.firstChild
                , a = r.nextSibling;
              return n.addEventListener("click", (()=>i(e.id))),
              be(a, G(xa, {
                  get isChecked() {
                      return o().some((t=>t === e.id))
                  },
                  get class() {
                      return "flex-shrink-0" + (e.title || e.description ? " mt-1" : void 0)
                  }
              }), null),
              be(a, G(te, {
                  get when() {
                      return e.title || e.description
                  },
                  get children() {
                      const t = si();
                      return be(t, G(te, {
                          get when() {
                              return e.title
                          },
                          get children() {
                              const t = ai();
                              return be(t, (()=>e.title)),
                              t
                          }
                      }), null),
                      be(t, G(te, {
                          get when() {
                              return e.description
                          },
                          get children() {
                              const t = ii();
                              return be(t, (()=>e.description)),
                              t
                          }
                      }), null),
                      t
                  }
              }), null),
              k((i=>{
                  const s = o().some((t=>t === e.id))
                    , l = "flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture" + (o().some((t=>t === e.id)) ? " selected" : "") + (De(e.pictureSrc) ? " has-svg" : "")
                    , c = e.id
                    , d = e.pictureSrc
                    , u = e.title ?? `Picture ${t() + 1}`
                    , p = `Picture choice ${t() + 1}`
                    , h = "flex gap-3 py-2 flex-shrink-0" + (Re(e.title) && Re(e.description) ? " justify-center" : " px-3");
                  return s !== i._v$ && he(n, "aria-checked", i._v$ = s),
                  l !== i._v$2 && fe(n, i._v$2 = l),
                  c !== i._v$3 && he(n, "data-itemid", i._v$3 = c),
                  d !== i._v$4 && he(r, "src", i._v$4 = d),
                  u !== i._v$5 && he(r, "alt", i._v$5 = u),
                  p !== i._v$6 && he(r, "elementtiming", i._v$6 = p),
                  h !== i._v$7 && fe(a, i._v$7 = h),
                  i
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
              }),
              n
          }
          )()
      }), null),
      be(s, G(ee, {
          get each() {
              return o().filter((e=>n().every((t=>t.id !== e)))).map((t=>e.defaultItems.find((e=>e.id === t)))).filter(je)
          },
          children: (t,n)=>(()=>{
              const r = ci()
                , a = r.firstChild
                , s = a.nextSibling;
              return r.addEventListener("click", (()=>i(t.id))),
              be(s, G(xa, {
                  get isChecked() {
                      return o().some((e=>e === t.id))
                  },
                  get class() {
                      return "flex-shrink-0" + (t.title || t.description ? " mt-1" : void 0)
                  }
              }), null),
              be(s, G(te, {
                  get when() {
                      return t.title || t.description
                  },
                  get children() {
                      const e = si();
                      return be(e, G(te, {
                          get when() {
                              return t.title
                          },
                          get children() {
                              const e = ai();
                              return be(e, (()=>t.title)),
                              e
                          }
                      }), null),
                      be(e, G(te, {
                          get when() {
                              return t.description
                          },
                          get children() {
                              const e = ii();
                              return be(e, (()=>t.description)),
                              e
                          }
                      }), null),
                      e
                  }
              }), null),
              k((o=>{
                  const i = t.id
                    , l = e.defaultItems.find((e=>e.id === t.id))?.pictureSrc
                    , c = t.title ?? `Selected picture ${n() + 1}`
                    , d = `Selected picture choice ${n() + 1}`
                    , u = "flex gap-3 py-2 flex-shrink-0" + (Re(t.title) && Re(t.description) ? " justify-center" : " pl-4");
                  return i !== o._v$8 && he(r, "data-itemid", o._v$8 = i),
                  l !== o._v$9 && he(a, "src", o._v$9 = l),
                  c !== o._v$10 && he(a, "alt", o._v$10 = c),
                  d !== o._v$11 && he(a, "elementtiming", o._v$11 = d),
                  u !== o._v$12 && fe(s, o._v$12 = u),
                  o
              }
              ), {
                  _v$8: void 0,
                  _v$9: void 0,
                  _v$10: void 0,
                  _v$11: void 0,
                  _v$12: void 0
              }),
              r
          }
          )()
      }), null),
      be(a, (()=>{
          const t = S((()=>o().length > 0));
          return ()=>t() && G(St, {
              disableIcon: !0,
              get children() {
                  return e.options?.buttonLabel ?? ti
              }
          })
      }
      )(), null),
      k((()=>fe(s, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, [ui,pi] = x([])
, hi = ue('<div class="flex justify-end animate-fade-in gap-2">')
, fi = ue("<div>")
, gi = e=>{
  const [t,n] = x()
    , [r,o] = x()
    , a = async({label: t, value: r})=>{
      n(t ?? r),
      e.onSubmit(r ?? t)
  }
    , i = t=>{
      n(t),
      e.onSkip()
  }
  ;
  return C((()=>{
      const t = ui().find((t=>t.inputId === e.block.id))?.formattedMessage;
      t && o(t)
  }
  )),
  G(ne, {
      get children() {
          return [G(re, {
              get when() {
                  return t() && !e.hasError
              },
              get children() {
                  return G(hn, {
                      get message() {
                          return r() ?? t()
                      },
                      get showAvatar() {
                          return e.guestAvatar?.isEnabled ?? !1
                      },
                      get avatarSrc() {
                          return e.guestAvatar?.url && e.guestAvatar.url
                      }
                  })
              }
          }), G(re, {
              get when() {
                  return Le(t()) || e.hasError
              },
              get children() {
                  const t = hi()
                    , n = e.ref;
                  return "function" == typeof n ? me(n, t) : e.ref = t,
                  be(t, (()=>{
                      const t = S((()=>!!e.hasHostAvatar));
                      return ()=>t() && (()=>{
                          const e = fi();
                          return k((()=>fe(e, "flex flex-shrink-0 items-center " + (bt() ? "w-6 h-6" : "w-10 h-10")))),
                          e
                      }
                      )()
                  }
                  )(), null),
                  be(t, G(mi, {
                      get context() {
                          return e.context
                      },
                      get block() {
                          return e.block
                      },
                      get inputIndex() {
                          return e.inputIndex
                      },
                      get isInputPrefillEnabled() {
                          return e.isInputPrefillEnabled
                      },
                      onSubmit: a,
                      onSkip: i
                  }), null),
                  k((()=>he(t, "data-blockid", e.block.id))),
                  t
              }
          })]
      }
  })
}
, mi = e=>{
  const t = t=>e.onSubmit(t)
    , n = ()=>e.isInputPrefillEnabled ? e.block.prefilledValue : void 0
    , r = ()=>e.onSubmit({
      value: e.block.options.labels.success ?? "Success"
  });
  return G(ne, {
      get children() {
          return [G(re, {
              get when() {
                  return e.block.type === Ae.TEXT
              },
              get children() {
                  return G(gn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.NUMBER
              },
              get children() {
                  return G(bn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.EMAIL
              },
              get children() {
                  return G(yn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.URL
              },
              get children() {
                  return G(_n, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.PHONE
              },
              get children() {
                  return G($n, {
                      get labels() {
                          return e.block.options.labels
                      },
                      get defaultCountryCode() {
                          return e.block.options.defaultCountryCode
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.DATE
              },
              get children() {
                  return G(On, {
                      get options() {
                          return e.block.options
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return bi(e.block)
              },
              keyed: !0,
              children: n=>G(ne, {
                  get children() {
                      return [G(re, {
                          get when() {
                              return !n.options.isMultipleChoice
                          },
                          get children() {
                              return G(qa, {
                                  get inputIndex() {
                                      return e.inputIndex
                                  },
                                  get defaultItems() {
                                      return n.items
                                  },
                                  get options() {
                                      return n.options
                                  },
                                  onSubmit: t
                              })
                          }
                      }), G(re, {
                          get when() {
                              return n.options.isMultipleChoice
                          },
                          get children() {
                              return G(Va, {
                                  get inputIndex() {
                                      return e.inputIndex
                                  },
                                  get defaultItems() {
                                      return n.items
                                  },
                                  get options() {
                                      return n.options
                                  },
                                  onSubmit: t
                              })
                          }
                      })]
                  }
              })
          }), G(re, {
              get when() {
                  return vi(e.block)
              },
              keyed: !0,
              children: e=>G(ne, {
                  get children() {
                      return [G(re, {
                          get when() {
                              return !e.options.isMultipleChoice
                          },
                          get children() {
                              return G(Xa, {
                                  get defaultItems() {
                                      return e.items
                                  },
                                  get options() {
                                      return e.options
                                  },
                                  onSubmit: t
                              })
                          }
                      }), G(re, {
                          get when() {
                              return e.options.isMultipleChoice
                          },
                          get children() {
                              return G(di, {
                                  get defaultItems() {
                                      return e.items
                                  },
                                  get options() {
                                      return e.options
                                  },
                                  onSubmit: t
                              })
                          }
                      })]
                  }
              })
          }), G(re, {
              get when() {
                  return e.block.type === Ae.RATING
              },
              get children() {
                  return G(Zn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.FILE
              },
              get children() {
                  return G(sa, {
                      get context() {
                          return e.context
                      },
                      get block() {
                          return e.block
                      },
                      onSubmit: t,
                      get onSkip() {
                          return e.onSkip
                      }
                  })
              }
          }), G(re, {
              get when() {
                  return e.block.type === Ae.PAYMENT
              },
              get children() {
                  return G(va, {
                      get context() {
                          return e.context
                      },
                      get options() {
                          return {
                              ...e.block.options,
                              ...e.block.runtimeOptions
                          }
                      },
                      onSuccess: r
                  })
              }
          })]
      }
  })
}
, bi = e=>e?.type === Ae.CHOICE ? e : void 0
, vi = e=>e?.type === Ae.PICTURE_CHOICE ? e : void 0
, yi = ue("<div><div>")
, wi = e=>{
  let t;
  const [n,r] = x(0)
    , o = new ResizeObserver((e=>r(e[0].target.clientHeight - (bt() ? 24 : 40))));
  return $((()=>{
      t && o.observe(t)
  }
  )),
  T((()=>{
      t && o.unobserve(t)
  }
  )),
  (()=>{
      const r = yi()
        , o = r.firstChild;
      return "function" == typeof t ? me(t, r) : t = r,
      o.style.setProperty("transition", "top 350ms ease-out, opacity 250ms ease-out"),
      be(o, G(un, {
          get initialAvatarSrc() {
              return e.hostAvatarSrc
          }
      })),
      k((t=>{
          const a = "flex flex-shrink-0 items-center relative typebot-avatar-container " + (bt() ? "w-6" : "w-10")
            , i = "absolute flex items-center top-0" + (bt() ? " w-6 h-6" : " w-10 h-10") + (e.hideAvatar ? " opacity-0" : " opacity-100")
            , s = `${n()}px`;
          return a !== t._v$ && fe(r, t._v$ = a),
          i !== t._v$2 && fe(o, t._v$2 = i),
          s !== t._v$3 && (null != (t._v$3 = s) ? o.style.setProperty("top", s) : o.style.removeProperty("top")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
      }),
      r
  }
  )()
}
, [_i,xi] = x()
, ki = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis opacity-100 h-full">')
, Ci = e=>{
  let t;
  const [n,r] = x("");
  return C((()=>{
      _i()?.id === e.streamingMessageId && r(_i()?.content ?? "")
  }
  )),
  (()=>{
      const e = ki()
        , r = e.firstChild.firstChild.firstChild
        , o = r.nextSibling;
      return "function" == typeof t ? me(t, e) : t = e,
      r.style.setProperty("width", "100%"),
      r.style.setProperty("height", "100%"),
      be(o, n),
      e
  }
  )()
}
, Si = ue('<div><div class="flex flex-col flex-1 gap-2">')
, Ii = ue('<div class="flex flex-col w-full min-w-0 gap-2">')
, $i = e=>{
  let t;
  const [n,r] = x(0);
  $((()=>{
      e.streamingMessageId || (0 === e.messages.length && e.onAllBubblesDisplayed(),
      e.onScrollToBottom(t?.offsetTop ? t?.offsetTop - 50 : void 0))
  }
  ));
  const o = async t=>{
      const o = e.messages[n()].id;
      await e.onNewBubbleDisplayed(o),
      r(n() === e.messages.length ? n() : n() + 1),
      e.onScrollToBottom(t),
      n() === e.messages.length && e.onAllBubblesDisplayed()
  }
  ;
  return (()=>{
      const r = Ii();
      return be(r, G(te, {
          get when() {
              return e.messages.length > 0
          },
          get children() {
              const t = Si()
                , r = t.firstChild;
              return be(t, G(te, {
                  get when() {
                      return e.theme.chat.hostAvatar?.isEnabled && e.messages.length > 0
                  },
                  get children() {
                      return G(wi, {
                          get hostAvatarSrc() {
                              return e.theme.chat.hostAvatar?.url
                          },
                          get hideAvatar() {
                              return e.hideAvatar
                          }
                      })
                  }
              }), r),
              be(r, G(ee, {
                  get each() {
                      return e.messages.slice(0, n() + 1)
                  },
                  children: t=>G(sn, {
                      message: t,
                      get typingEmulation() {
                          return e.settings.typingEmulation
                      },
                      onTransitionEnd: o
                  })
              })),
              k((n=>{
                  const o = "flex" + (bt() ? " gap-1" : " gap-2")
                    , a = e.theme.chat.guestAvatar?.isEnabled ? bt() ? "32px" : "48px" : void 0;
                  return o !== n._v$ && fe(t, n._v$ = o),
                  a !== n._v$2 && (null != (n._v$2 = a) ? r.style.setProperty("margin-right", a) : r.style.removeProperty("margin-right")),
                  n
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0
              }),
              t
          }
      }), null),
      be(r, (()=>{
          const r = S((()=>!(!e.input || n() !== e.messages.length)));
          return ()=>r() && G(gi, {
              ref(e) {
                  "function" == typeof t ? t(e) : t = e
              },
              get block() {
                  return e.input
              },
              get inputIndex() {
                  return e.inputIndex
              },
              get hasHostAvatar() {
                  return e.theme.chat.hostAvatar?.isEnabled ?? !1
              },
              get guestAvatar() {
                  return e.theme.chat.guestAvatar
              },
              get context() {
                  return e.context
              },
              get isInputPrefillEnabled() {
                  return e.settings.general.isInputPrefillEnabled ?? !0
              },
              get hasError() {
                  return e.hasError
              },
              get onSubmit() {
                  return e.onSubmit
              },
              get onSkip() {
                  return e.onSkip
              }
          })
      }
      )(), null),
      be(r, G(te, {
          get when() {
              return e.streamingMessageId
          },
          keyed: !0,
          children: t=>(()=>{
              const n = Si()
                , r = n.firstChild;
              return be(n, G(te, {
                  get when() {
                      return e.theme.chat.hostAvatar?.isEnabled
                  },
                  get children() {
                      return G(wi, {
                          get hostAvatarSrc() {
                              return e.theme.chat.hostAvatar?.url
                          },
                          get hideAvatar() {
                              return e.hideAvatar
                          }
                      })
                  }
              }), r),
              be(r, G(Ci, {
                  streamingMessageId: t
              })),
              k((t=>{
                  const o = "flex" + (bt() ? " gap-1" : " gap-2")
                    , a = e.theme.chat.guestAvatar?.isEnabled ? bt() ? "32px" : "48px" : void 0;
                  return o !== t._v$3 && fe(n, t._v$3 = o),
                  a !== t._v$4 && (null != (t._v$4 = a) ? r.style.setProperty("margin-right", a) : r.style.removeProperty("margin-right")),
                  t
              }
              ), {
                  _v$3: void 0,
                  _v$4: void 0
              }),
              n
          }
          )()
      }), null),
      r
  }
  )()
}
, Ti = Object.getPrototypeOf((async function() {}
)).constructor
, Ei = async({content: e, args: t})=>{
  const n = Ti(...t.map((e=>e.id)), Pi(e));
  try {
      await n(...t.map((e=>e.value)))
  } catch (e) {
      console.error(e)
  }
}
, Pi = e=>e.replace(/<script>/g, "").replace(/<\/script>/g, "")
, Ai = async e=>{
  e?.trackingId && (e=>{
      e && (window.gtag ? window.gtag("event", e.action, {
          event_category: Re(e.category) ? void 0 : e.category,
          event_label: Re(e.label) ? void 0 : e.label,
          value: e.value,
          send_to: Re(e.sendTo) ? void 0 : e.sendTo
      }) : console.error("Google Analytics was not properly initialized"))
  }
  )(e)
}
;
let Oi = null;
const Ni = Object.getPrototypeOf((async function() {}
)).constructor
, Mi = e=>{
  if (!Le(e)) {
      if ("string" == typeof e)
          return e;
      try {
          return JSON.stringify(e)
      } catch {
          return void console.warn("Failed to safely stringify variable value", e)
      }
  }
}
, ji = async e=>{
  Re(e?.pixelId) || (e=>{
      if (!e.eventType || !e.pixelId)
          return;
      if (!window.fbq)
          return void console.error("Facebook Pixel was not properly initialized");
      const t = e.params?.length ? e.params.reduce(((e,t)=>t.key && t.value ? {
          ...e,
          [t.key]: t.value
      } : e), {}) : void 0;
      if ("Custom" === e.eventType) {
          if (!e.name)
              return;
          window.fbq("trackCustom", e.name, t)
      }
      window.fbq("track", e.eventType, t)
  }
  )(e)
}
, Li = async e=>{
  const t = e.customHeadCode;
  Ze(t) && (e=>{
      e.split("</noscript>").forEach((e=>{
          const [t,n] = e.split("<noscript>")
            , r = document.createRange().createContextualFragment(t);
          if (document.head.append(r),
          Le(n))
              return;
          const o = document.createElement("noscript")
            , a = document.createRange().createContextualFragment(n);
          o.append(a),
          document.head.append(o)
      }
      ))
  }
  )(t);
  const n = e.gtmId;
  Ze(n) && document.body.prepend((e=>{
      if (document.getElementById("gtm-noscript"))
          return "";
      const t = document.createElement("noscript");
      t.id = "gtm-noscript";
      const n = document.createElement("iframe");
      return n.src = `https://www.googletagmanager.com/ns.html?id=${e}`,
      n.height = "0",
      n.width = "0",
      n.style.display = "none",
      n.style.visibility = "hidden",
      t.appendChild(n),
      t
  }
  )(n));
  const r = e.googleAnalyticsId;
  var o;
  Ze(r) && await (o = r,
  je(window.gtag) ? Promise.resolve() : new Promise((e=>{
      const t = document.getElementById("gtag");
      if (!t) {
          const t = document.createElement("script");
          t.src = `https://www.googletagmanager.com/gtag/js?id=${o}`,
          t.id = "gtag";
          const n = document.createElement("script");
          n.innerHTML = `window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', '${o}');\n      `,
          document.body.appendChild(t),
          document.body.appendChild(n),
          t.onload = ()=>{
              e()
          }
      }
      t && e()
  }
  )));
  const a = e.pixelId;
  Ze(a) && (e=>{
      const t = document.createElement("script");
      t.innerHTML = `!function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '${e}');\n  fbq('track', 'PageView');`,
      document.head.appendChild(t);
      const n = document.createElement("noscript");
      n.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${e}&ev=PageView&noscript=1"/>`,
      document.head.appendChild(n)
  }
  )(a)
}
, Ri = async({clientSideAction: e, context: t, onMessageStream: n})=>{
  if ("chatwoot"in e)
      return r = e.chatwoot,
      void Ei(r.scriptToExecute);
  var r;
  if ("googleAnalytics"in e)
      return Ai(e.googleAnalytics);
  if ("scriptToExecute"in e)
      return Ei(e.scriptToExecute);
  if ("redirect"in e)
      return (({url: e, isNewTab: t})=>{
          if (!e)
              return;
          return window.open(e, t ? "_blank" : "_self") ? void 0 : {
              blockedPopupUrl: e
          }
      }
      )(e.redirect);
  if ("wait"in e)
      return (async({secondsToWaitFor: e})=>{
          await new Promise((t=>setTimeout(t, 1e3 * e)))
      }
      )(e.wait);
  if ("setVariable"in e)
      return (async({content: e, args: t})=>{
          try {
              const n = Ni(...t.map((e=>e.id)), e.includes("return ") ? e : `return ${e}`)
                , r = await n(...t.map((e=>e.value)));
              return {
                  replyToSend: Mi(r)
              }
          } catch (t) {
              return console.error(t),
              {
                  replyToSend: Mi(e)
              }
          }
      }
      )(e.setVariable.scriptToExecute);
  if ("streamOpenAiChatCompletion"in e) {
      const {error: r, message: o} = await (e=>async(t,{onMessageStream: n})=>{
          try {
              Oi = new AbortController;
              const r = e.apiHost
                , o = await fetch(`${Ze(r) ? r : ft()}/api/integrations/openai/streamer`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      sessionId: e.sessionId,
                      messages: t
                  }),
                  signal: Oi.signal
              });
              if (!o.ok)
                  return {
                      error: await o.json() || "Failed to fetch the chat response."
                  };
              if (!o.body)
                  throw new Error("The response body is empty.");
              let a = "";
              const i = o.body.getReader()
                , s = new TextDecoder;
              for (; ; ) {
                  const {done: e, value: t} = await i.read();
                  if (e)
                      break;
                  if (a += s.decode(t),
                  n && n(a),
                  null === Oi) {
                      i.cancel();
                      break
                  }
              }
              return Oi = null,
              {
                  message: a
              }
          } catch (e) {
              return console.error(e),
              "AbortError" === e.name ? (Oi = null,
              {
                  error: {
                      message: "Request aborted"
                  }
              }) : e instanceof Error ? {
                  error: {
                      message: e.message
                  }
              } : {
                  error: {
                      message: "Failed to fetch the chat response."
                  }
              }
          }
      }
      )(t)(e.streamOpenAiChatCompletion.messages, {
          onMessageStream: e.streamOpenAiChatCompletion.displayStream ? n : void 0
      });
      return r ? {
          replyToSend: void 0,
          logs: [{
              status: "error",
              description: "Failed to stream OpenAI completion",
              details: JSON.stringify(r, null, 2)
          }]
      } : {
          replyToSend: o
      }
  }
  if ("webhookToExecute"in e) {
      return {
          replyToSend: await (async e=>{
              const {url: t, method: n, body: r, headers: o} = e;
              try {
                  const e = await fetch(t, {
                      method: n,
                      body: "GET" !== n && r ? JSON.stringify(r) : void 0,
                      headers: o
                  })
                    , a = e.status
                    , i = await e.json();
                  return JSON.stringify({
                      statusCode: a,
                      data: i
                  })
              } catch (e) {
                  return console.error(e),
                  JSON.stringify({
                      statusCode: 500,
                      data: "An error occured while executing the webhook on the client"
                  })
              }
          }
          )(e.webhookToExecute)
      }
  }
  return "startPropsToInject"in e ? Li(e.startPropsToInject) : "pixel"in e ? ji(e.pixel) : void 0
}
, Zi = ue('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><p class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative opacity-0 h-6 text-ellipsis">')
, Bi = ()=>(()=>{
  const e = Zi()
    , t = e.firstChild.firstChild.firstChild;
  return t.style.setProperty("width", "64px"),
  t.style.setProperty("height", "32px"),
  be(t, G($t, {})),
  e
}
)()
, zi = ue('<div class="flex w-full"><div class="flex flex-col w-full min-w-0"><div class="flex gap-2">')
, Di = e=>(()=>{
  const t = zi()
    , n = t.firstChild.firstChild;
  return be(n, G(te, {
      get when() {
          return e.theme.chat.hostAvatar?.isEnabled
      },
      get children() {
          return G(wi, {
              get hostAvatarSrc() {
                  return e.theme.chat.hostAvatar?.url
              }
          })
      }
  }), null),
  be(n, G(Bi, {}), null),
  t
}
)()
, Ui = ue('<div class="w-full max-w-xs p-4 text-gray-500 bg-white shadow flex flex-col gap-2 typebot-popup-blocked-toast" role="alert"><div class="flex flex-col gap-1"><span class=" text-sm font-semibold text-gray-900">Popup blocked</span><div class="text-sm font-normal">The bot wants to open a new tab but it was blocked by your broswer. It needs a manual approval.</div></div><a target="_blank" class="py-1 px-4 justify-center text-sm font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 filter hover:brightness-90 active:brightness-75 typebot-button" rel="noreferrer">Continue in new tab')
, Vi = e=>(()=>{
  const t = Ui()
    , n = t.firstChild.nextSibling;
  return n.$$click = ()=>e.onLinkClick(),
  k((()=>he(n, "href", e.url))),
  t
}
)();
pe(["click"]);
const Fi = ue('<div class="flex flex-col overflow-y-scroll w-full min-h-full px-3 pt-10 relative scrollable-container typebot-chat-view scroll-smooth gap-2">')
, Gi = ue('<div class="flex justify-end">')
, Hi = ue('<div class="w-full h-32 flex-shrink-0">')
, Ki = e=>{
  let t;
  const [n,r] = x([{
      input: e.initialChatReply.input,
      messages: e.initialChatReply.messages,
      clientSideActions: e.initialChatReply.clientSideActions
  }])
    , [o,a] = x(e.initialChatReply.dynamicTheme)
    , [i,l] = x(e.initialChatReply.typebot.theme)
    , [c,d] = x(!1)
    , [u,p] = x()
    , [h,f] = x(!1);
  $((()=>{
      (async()=>{
          const t = n()[0];
          if (t.clientSideActions) {
              const n = t.clientSideActions.filter((e=>Le(e.lastBubbleBlockId)));
              for (const t of n) {
                  ("streamOpenAiChatCompletion"in t || "webhookToExecute"in t) && d(!0);
                  const n = await Ri({
                      clientSideAction: t,
                      context: {
                          apiHost: e.context.apiHost,
                          sessionId: e.initialChatReply.sessionId
                      },
                      onMessageStream: g
                  });
                  if (n && "replyToSend"in n)
                      return void m(n.replyToSend, n.logs);
                  n && "blockedPopupUrl"in n && p(n.blockedPopupUrl)
              }
          }
      }
      )()
  }
  ));
  const g = e=>{
      d(!1);
      const t = [...n()].pop();
      if (!t)
          return;
      const o = t.streamingMessageId ?? function() {
          const e = s.context;
          return e ? `${e.id}${e.count++}` : "cl-" + X++
      }();
      t.streamingMessageId || r((e=>[...e, {
          messages: [],
          streamingMessageId: o
      }])),
      xi({
          id: o,
          content: e
      })
  }
  ;
  C((()=>{
      l(((e,t)=>({
          ...e,
          chat: {
              ...e.chat,
              hostAvatar: e.chat.hostAvatar && t?.hostAvatarUrl ? {
                  ...e.chat.hostAvatar,
                  url: t.hostAvatarUrl
              } : e.chat.hostAvatar,
              guestAvatar: e.chat.guestAvatar && t?.guestAvatarUrl ? {
                  ...e.chat.guestAvatar,
                  url: t?.guestAvatarUrl
              } : e.chat.guestAvatar
          }
      }))(e.initialChatReply.typebot.theme, o()))
  }
  ));
  const m = async(t,o)=>{
      o && e.onNewLogs?.(o),
      f(!1);
      const i = [...n()].pop()?.input;
      i?.id && e.onAnswer && t && e.onAnswer({
          message: t,
          blockId: i.id
      }),
      i?.type === Ae.FILE && e.onNewLogs?.([{
          description: "Files are not uploaded in preview mode",
          status: "info"
      }]);
      const s = setTimeout((()=>{
          d(!0)
      }
      ), 1e3)
        , {data: l, error: c} = await (({apiHost: e, ...t})=>Me({
          method: "POST",
          url: `${Ze(e) ? e : ft()}/api/v1/sendMessage`,
          body: t
      }))({
          apiHost: e.context.apiHost,
          sessionId: e.initialChatReply.sessionId,
          message: t,
          clientLogs: o
      });
      if (clearTimeout(s),
      d(!1),
      c && (f(!0),
      e.onNewLogs?.([{
          description: "Failed to send the reply",
          details: c,
          status: "error"
      }])),
      l) {
          if (l.lastMessageNewFormat && pi([...ui(), {
              inputId: [...n()].pop()?.input?.id ?? "",
              formattedMessage: l.lastMessageNewFormat
          }]),
          l.logs && e.onNewLogs?.(l.logs),
          l.dynamicTheme && a(l.dynamicTheme),
          l.input?.id && e.onNewInputBlock && e.onNewInputBlock({
              id: l.input.id,
              groupId: l.input.groupId
          }),
          l.clientSideActions) {
              const t = l.clientSideActions.filter((e=>Le(e.lastBubbleBlockId)));
              for (const n of t) {
                  ("streamOpenAiChatCompletion"in n || "webhookToExecute"in n) && d(!0);
                  const t = await Ri({
                      clientSideAction: n,
                      context: {
                          apiHost: e.context.apiHost,
                          sessionId: e.initialChatReply.sessionId
                      },
                      onMessageStream: g
                  });
                  if (t && "replyToSend"in t)
                      return void m(t.replyToSend, t.logs);
                  t && "blockedPopupUrl"in t && p(t.blockedPopupUrl)
              }
          }
          r((e=>[...e, {
              input: l.input,
              messages: [...n()].pop()?.streamingMessageId ? l.messages.slice(1) : l.messages,
              clientSideActions: l.clientSideActions
          }]))
      }
  }
    , b = e=>{
      setTimeout((()=>{
          t?.scrollTo(0, e ?? t.scrollHeight)
      }
      ), 50)
  }
    , v = async()=>{
      const t = [...n()].pop();
      t && Le(t.input) && e.onEnd?.()
  }
    , y = async t=>{
      const r = [...n()].pop();
      if (r && r.clientSideActions) {
          const n = r.clientSideActions.filter((e=>e.lastBubbleBlockId === t));
          for (const t of n) {
              ("streamOpenAiChatCompletion"in t || "webhookToExecute"in t) && d(!0);
              const n = await Ri({
                  clientSideAction: t,
                  context: {
                      apiHost: e.context.apiHost,
                      sessionId: e.initialChatReply.sessionId
                  },
                  onMessageStream: g
              });
              if (n && "replyToSend"in n)
                  return void m(n.replyToSend, n.logs);
              n && "blockedPopupUrl"in n && p(n.blockedPopupUrl)
          }
      }
  }
    , w = ()=>m(void 0);
  return (()=>{
      const r = Fi();
      return "function" == typeof t ? me(t, r) : t = r,
      be(r, G(ee, {
          get each() {
              return n()
          },
          children: (t,r)=>G($i, {
              get inputIndex() {
                  return r()
              },
              get messages() {
                  return t.messages
              },
              get input() {
                  return t.input
              },
              get theme() {
                  return i()
              },
              get settings() {
                  return e.initialChatReply.typebot.settings
              },
              get streamingMessageId() {
                  return t.streamingMessageId
              },
              get context() {
                  return e.context
              },
              get hideAvatar() {
                  return S((()=>!(t.input || t.streamingMessageId)))() && r() < n().length - 1
              },
              get hasError() {
                  return S((()=>!!h()))() && r() === n().length - 1
              },
              onNewBubbleDisplayed: y,
              onAllBubblesDisplayed: v,
              onSubmit: m,
              onScrollToBottom: b,
              onSkip: w
          })
      }), null),
      be(r, G(te, {
          get when() {
              return c()
          },
          get children() {
              return G(Di, {
                  get theme() {
                      return i()
                  }
              })
          }
      }), null),
      be(r, G(te, {
          get when() {
              return u()
          },
          keyed: !0,
          children: e=>(()=>{
              const t = Gi();
              return be(t, G(Vi, {
                  url: e,
                  onLinkClick: ()=>p(void 0)
              })),
              t
          }
          )()
      }), null),
      be(r, G(qi, {}), null),
      r
  }
  )()
}
, qi = ()=>Hi()
, Wi = ue('<div class="h-full flex justify-center items-center flex-col"><p class="text-2xl text-center"></p><p class="text-center">')
, Yi = e=>(()=>{
  const t = Wi()
    , n = t.firstChild
    , r = n.nextSibling;
  return be(n, (()=>e.error.message)),
  be(r, (()=>e.error.cause)),
  t
}
)()
, Ji = "resultId"
, Xi = e=>{
  if (e)
      try {
          return sessionStorage.getItem(`${Ji}-${e}`) ?? localStorage.getItem(`${Ji}-${e}`) ?? void 0
      } catch {}
}
;
let Qi = function(e) {
  return e.COLOR = "Color",
  e.IMAGE = "Image",
  e.NONE = "None",
  e
}({});
const es = {
  bgImage: "--typebot-container-bg-image",
  bgColor: "--typebot-container-bg-color",
  fontFamily: "--typebot-container-font-family",
  color: "--typebot-container-color"
}
, ts = {
  hostBubbles: {
      bgColor: "--typebot-host-bubble-bg-color",
      color: "--typebot-host-bubble-color"
  },
  guestBubbles: {
      bgColor: "--typebot-guest-bubble-bg-color",
      color: "--typebot-guest-bubble-color"
  },
  inputs: {
      bgColor: "--typebot-input-bg-color",
      color: "--typebot-input-color",
      placeholderColor: "--typebot-input-placeholder-color"
  },
  buttons: {
      bgColor: "--typebot-button-bg-color",
      bgColorRgb: "--typebot-button-bg-color-rgb",
      color: "--typebot-button-color"
  },
  checkbox: {
      bgColor: "--typebot-checkbox-bg-color",
      color: "--typebot-checkbox-color",
      baseAlpha: "--selectable-base-alpha"
  }
}
, ns = (e,t)=>{
  const {background: n, font: r} = e;
  n && ls(n, t),
  r && t.setProperty(es.fontFamily, r)
}
, rs = (e,t)=>{
  const {hostBubbles: n, guestBubbles: r, buttons: o, inputs: a, roundness: i} = e;
  n && os(n, t),
  r && as(r, t),
  o && is(o, t),
  a && ss(a, t),
  i && ds(i, t)
}
, os = (e,t)=>{
  e.backgroundColor && t.setProperty(ts.hostBubbles.bgColor, e.backgroundColor),
  e.color && t.setProperty(ts.hostBubbles.color, e.color)
}
, as = (e,t)=>{
  e.backgroundColor && t.setProperty(ts.guestBubbles.bgColor, e.backgroundColor),
  e.color && t.setProperty(ts.guestBubbles.color, e.color)
}
, is = (e,t)=>{
  e.backgroundColor && (t.setProperty(ts.buttons.bgColor, e.backgroundColor),
  t.setProperty(ts.buttons.bgColorRgb, Ue(e.backgroundColor).join(", "))),
  e.color && t.setProperty(ts.buttons.color, e.color)
}
, ss = (e,t)=>{
  e.backgroundColor && t.setProperty(ts.inputs.bgColor, e.backgroundColor),
  e.color && t.setProperty(ts.inputs.color, e.color),
  e.placeholderColor && t.setProperty(ts.inputs.placeholderColor, e.placeholderColor)
}
, ls = (e,t)=>{
  t.setProperty(es.bgImage, null),
  t.setProperty(es.bgColor, null),
  t.setProperty(e?.type === Qi.IMAGE ? es.bgImage : es.bgColor, cs(e)),
  t.setProperty(ts.checkbox.bgColor, e?.type === Qi.IMAGE ? "rgba(255, 255, 255, 0.75)" : (e?.type === Qi.COLOR ? e.content : "#ffffff") ?? "#ffffff");
  const n = e.type === Qi.IMAGE ? "#000000" : e?.type === Qi.COLOR && Ze(e.content) ? e.content : "#ffffff";
  t.setProperty(es.color, Ve(n) ? "#303235" : "#ffffff"),
  e.type === Qi.IMAGE ? t.setProperty(ts.checkbox.baseAlpha, "0.40") : t.setProperty(ts.checkbox.baseAlpha, "0")
}
, cs = ({type: e, content: t})=>{
  switch (e) {
  case Qi.NONE:
      return "transparent";
  case Qi.COLOR:
      return t ?? "#ffffff";
  case Qi.IMAGE:
      return `url(${t})`
  }
}
, ds = (e,t)=>{
  switch (e) {
  case "none":
      t.setProperty("--typebot-border-radius", "0");
      break;
  case "medium":
      t.setProperty("--typebot-border-radius", "6px");
      break;
  case "large":
      t.setProperty("--typebot-border-radius", "20px")
  }
}
;
const us = ue("<style>")
, ps = ue('<div><div class="flex w-full h-full justify-center">')
, hs = e=>{
  const [t,n] = x()
    , [r,o] = x("")
    , [a,i] = x(!1)
    , [s,l] = x()
    , c = async()=>{
      i(!0);
      const t = new URLSearchParams(location.search);
      e.onInit?.();
      const r = {};
      t.forEach(((e,t)=>{
          r[t] = e
      }
      ));
      const a = "string" == typeof e.typebot ? e.typebot : void 0
        , {data: s, error: c} = await async function({typebot: e, isPreview: t, apiHost: n, prefilledVariables: r, startGroupId: o, resultId: a, stripeRedirectStatus: i}) {
          if (Le(e))
              throw new Error("Typebot ID is required to get initial messages");
          const s = gt() ?? void 0
            , l = s ? JSON.parse(s) : void 0;
          l && mt();
          const {data: c, error: d} = await Me({
              method: "POST",
              url: `${Ze(n) ? n : ft()}/api/v1/sendMessage`,
              body: {
                  startParams: l ? void 0 : {
                      isPreview: t,
                      typebot: e,
                      prefilledVariables: r,
                      startGroupId: o,
                      resultId: a,
                      isStreamEnabled: !0
                  },
                  sessionId: l?.sessionId,
                  message: l ? "failed" === i ? "fail" : "Success" : void 0
              }
          });
          return {
              data: c ? {
                  ...c,
                  ...l ? {
                      typebot: l.typebot
                  } : {}
              } : void 0,
              error: d
          }
      }({
          stripeRedirectStatus: t.get("redirect_status") ?? void 0,
          typebot: e.typebot,
          apiHost: e.apiHost,
          isPreview: e.isPreview ?? !1,
          resultId: Ze(e.resultId) ? e.resultId : Xi(a),
          startGroupId: e.startGroupId,
          prefilledVariables: {
              ...r,
              ...e.prefilledVariables
          }
      });
      if (c && "code"in c && "string" == typeof c.code) {
          if ("string" != typeof e.typebot || e.isPreview)
              return l(new Error("An error occurred while loading the bot.",{
                  cause: c.message
              }));
          if (["BAD_REQUEST", "FORBIDDEN"].includes(c.code))
              return l(new Error("This bot is now closed."));
          if ("NOT_FOUND" === c.code)
              return l(new Error("The bot you're looking for doesn't exist."))
      }
      if (!s)
          return c && console.error(c),
          l(new Error("Error! Couldn't initiate the chat."));
      s.resultId && a && ((e="session")=>(t,n)=>{
          try {
              return ("session" === e ? localStorage : sessionStorage).removeItem(`${Ji}-${t}`),
              ("session" === e ? sessionStorage : localStorage).setItem(`${Ji}-${t}`, n)
          } catch {}
      }
      )(s.typebot.settings.general.rememberUser?.storage)(a, s.resultId),
      n(s),
      o(s.typebot.theme.customCss ?? ""),
      s.input?.id && e.onNewInputBlock && e.onNewInputBlock({
          id: s.input.id,
          groupId: s.input.groupId
      }),
      s.logs && e.onNewLogs?.(s.logs)
  }
  ;
  return C((()=>{
      Le(e.typebot) || a() || c().then()
  }
  )),
  C((()=>{
      Le(e.typebot) || "string" == typeof e.typebot || o(e.typebot.theme.customCss ?? "")
  }
  )),
  T((()=>{
      i(!1)
  }
  )),
  [(()=>{
      const e = us();
      return be(e, r),
      e
  }
  )(), (()=>{
      const e = us();
      return be(e, "#lite-badge{background-color:#fff!important;border-radius:4px!important;border-width:1px!important;bottom:20px!important;color:#111827!important;display:flex!important;font-size:14px!important;font-weight:600!important;gap:8px!important;left:auto!important;line-height:20px!important;opacity:1!important;padding:4px 8px!important;position:absolute!important;right:auto!important;top:auto!important;transition:background-color .2s ease-in-out!important;visibility:visible!important;z-index:50!important}#lite-badge:hover{background-color:#f7f8ff!important}"),
      e
  }
  )(), G(te, {
      get when() {
          return s()
      },
      keyed: !0,
      children: e=>G(Yi, {
          error: e
      })
  }), G(te, {
      get when() {
          return t()
      },
      keyed: !0,
      children: t=>G(fs, {
          get class() {
              return e.class
          },
          get initialChatReply() {
              return {
                  ...t,
                  typebot: {
                      ...t.typebot,
                      settings: "string" == typeof e.typebot ? t.typebot?.settings : e.typebot?.settings,
                      theme: "string" == typeof e.typebot ? t.typebot?.theme : e.typebot?.theme
                  }
              }
          },
          get context() {
              return {
                  apiHost: e.apiHost,
                  isPreview: "string" != typeof e.typebot || (e.isPreview ?? !1),
                  resultId: t.resultId,
                  sessionId: t.sessionId,
                  typebot: t.typebot
              }
          },
          get onNewInputBlock() {
              return e.onNewInputBlock
          },
          get onNewLogs() {
              return e.onNewLogs
          },
          get onAnswer() {
              return e.onAnswer
          },
          get onEnd() {
              return e.onEnd
          }
      })
  })]
}
, fs = e=>{
  let t;
  const n = new ResizeObserver((e=>vt(e[0].target.clientWidth < 400)));
  return $((()=>{
      t && n.observe(t)
  }
  )),
  C((()=>{
      (()=>{
          const t = document.getElementById("bot-font");
          if (t?.getAttribute("href")?.includes(e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"))
              return;
          const n = document.createElement("link");
          n.href = `https://fonts.bunny.net/css2?family=${e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"}:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');')`,
          n.rel = "stylesheet",
          n.id = "bot-font",
          document.head.appendChild(n)
      }
      )(),
      t && ((e,t)=>{
          if (!e)
              return;
          const n = t?.style;
          n && (e.general && ns(e.general, n),
          e.chat && rs(e.chat, n))
      }
      )(e.initialChatReply.typebot.theme, t)
  }
  )),
  T((()=>{
      t && n.unobserve(t)
  }
  )),
  (()=>{
      const n = ps()
        , r = n.firstChild;
      return "function" == typeof t ? me(t, n) : t = n,
      be(r, G(Ki, {
          get context() {
              return e.context
          },
          get initialChatReply() {
              return e.initialChatReply
          },
          get onNewInputBlock() {
              return e.onNewInputBlock
          },
          get onAnswer() {
              return e.onAnswer
          },
          get onEnd() {
              return e.onEnd
          },
          get onNewLogs() {
              return e.onNewLogs
          }
      })),
      be(n, G(te, {
          get when() {
              return e.initialChatReply.typebot.settings.general.isBrandingEnabled
          },
          get children() {
              return G(ht, {
                  botContainer: t
              })
          }
      }), null),
      k((()=>fe(n, "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center typebot-container " + e.class))),
      n
  }
  )()
}
, gs = ue("<style>")
, ms = ue('<div part="bot">')
, bs = e=>{
  const [t,n] = J(e, ["onOpen", "onClose", "previewMessage", "onPreviewMessageClick", "theme", "autoShowDelay"])
    , [r,o] = x(n.prefilledVariables)
    , [a,i] = x(!1)
    , [s,l] = x({
      message: t.previewMessage?.message ?? "",
      avatarUrl: t.previewMessage?.avatarUrl
  })
    , [c,d] = x(!1)
    , [u,p] = x(!1);
  $((()=>{
      window.addEventListener("message", h);
      const e = t.autoShowDelay
        , n = t.previewMessage?.autoShowDelay;
      gt() && f(),
      je(e) && setTimeout((()=>{
          f()
      }
      ), e),
      je(n) && setTimeout((()=>{
          v()
      }
      ), n)
  }
  )),
  T((()=>{
      window.removeEventListener("message", h)
  }
  )),
  C((()=>{
      e.prefilledVariables && o((t=>({
          ...t,
          ...e.prefilledVariables
      })))
  }
  ));
  const h = e=>{
      const {data: t} = e;
      t.isFromTypebot && ("open" === t.command && f(),
      "close" === t.command && g(),
      "toggle" === t.command && m(),
      "showPreviewMessage" === t.command && v(t.message),
      "hidePreviewMessage" === t.command && y(),
      "setPrefilledVariables" === t.command && o((e=>({
          ...e,
          ...t.variables
      }))))
  }
    , f = ()=>{
      u() || p(!0),
      y(),
      d(!0),
      c() && t.onOpen?.()
  }
    , g = ()=>{
      d(!1),
      c() && t.onClose?.()
  }
    , m = ()=>{
      c() ? g() : f()
  }
    , b = ()=>{
      t.onPreviewMessageClick?.(),
      f()
  }
    , v = e=>{
      e && l(e),
      c() || i(!0)
  }
    , y = ()=>{
      i(!1)
  }
  ;
  return [(()=>{
      const e = gs();
      return be(e, Pe),
      e
  }
  )(), G(te, {
      get when() {
          return a()
      },
      get children() {
          return G(lt, Y(s, {
              get placement() {
                  return t.theme?.placement
              },
              get previewMessageTheme() {
                  return t.theme?.previewMessage
              },
              get buttonSize() {
                  return t.theme?.button?.size
              },
              onClick: b,
              onCloseClick: y
          }))
      }
  }), G(nt, Y((()=>t.theme?.button), {
      get placement() {
          return t.theme?.placement
      },
      toggleBot: m,
      get isBotOpened() {
          return c()
      }
  })), (()=>{
      const o = ms();
      return o.style.setProperty("height", "calc(100% - 80px)"),
      o.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"),
      o.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"),
      o.style.setProperty("z-index", "42424242"),
      be(o, G(te, {
          get when() {
              return u()
          },
          get children() {
              return G(hs, Y(n, {
                  get prefilledVariables() {
                      return r()
                  },
                  class: "rounded-lg"
              }))
          }
      })),
      k((n=>{
          const r = "left" === e.theme?.placement ? "bottom left" : "bottom right"
            , a = c() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)"
            , i = t.theme?.chatWindow?.backgroundColor
            , s = "fixed rounded-lg w-full sm:w-[400px] max-h-[704px]" + (c() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === e.theme?.button?.size ? " bottom-24" : " bottom-20") + ("left" === e.theme?.placement ? " sm:left-5" : " sm:right-5");
          return r !== n._v$ && (null != (n._v$ = r) ? o.style.setProperty("transform-origin", r) : o.style.removeProperty("transform-origin")),
          a !== n._v$2 && (null != (n._v$2 = a) ? o.style.setProperty("transform", a) : o.style.removeProperty("transform")),
          i !== n._v$3 && (null != (n._v$3 = i) ? o.style.setProperty("background-color", i) : o.style.removeProperty("background-color")),
          s !== n._v$4 && fe(o, n._v$4 = s),
          n
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
      }),
      o
  }
  )()]
}
, vs = ue("<style>")
, ys = ue('<div class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in" part="overlay"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div>')
, ws = e=>{
  const [t,n] = J(e, ["onOpen", "onClose", "autoShowDelay", "theme", "isOpen", "defaultOpen"])
    , [r,o] = x(n.prefilledVariables)
    , [a,i] = x(t.isOpen ?? !1);
  $((()=>{
      const e = gt();
      (t.defaultOpen || e) && c(),
      window.addEventListener("message", l);
      const n = t.autoShowDelay;
      je(n) && setTimeout((()=>{
          c()
      }
      ), n)
  }
  )),
  T((()=>{
      window.removeEventListener("message", l)
  }
  )),
  C((()=>{
      Le(e.isOpen) || e.isOpen === a() || u()
  }
  )),
  C((()=>{
      e.prefilledVariables && o((t=>({
          ...t,
          ...e.prefilledVariables
      })))
  }
  ));
  const s = e=>{
      e.stopPropagation()
  }
    , l = e=>{
      const {data: t} = e;
      t.isFromTypebot && ("open" === t.command && c(),
      "close" === t.command && d(),
      "toggle" === t.command && u(),
      "setPrefilledVariables" === t.command && o((e=>({
          ...e,
          ...t.variables
      }))))
  }
    , c = ()=>{
      i(!0),
      t.onOpen?.(),
      document.body.style.overflow = "hidden",
      document.addEventListener("pointerdown", d)
  }
    , d = ()=>{
      i(!1),
      t.onClose?.(),
      document.body.style.overflow = "auto",
      document.removeEventListener("pointerdown", d)
  }
    , u = ()=>{
      a() ? d() : c()
  }
  ;
  return G(te, {
      get when() {
          return a()
      },
      get children() {
          return [(()=>{
              const e = vs();
              return be(e, Pe),
              e
          }
          )(), (()=>{
              const t = ys()
                , o = t.firstChild
                , a = o.nextSibling.nextSibling.firstChild.firstChild;
              return be(o, Pe),
              a.addEventListener("pointerdown", s),
              be(a, G(hs, Y(n, {
                  get prefilledVariables() {
                      return r()
                  }
              }))),
              k((n=>{
                  const r = e.theme?.zIndex ?? 42424242
                    , o = "relative h-[80vh] transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg" + (e.theme?.backgroundColor ? " shadow-xl" : "")
                    , i = e.theme?.backgroundColor ?? "transparent";
                  return r !== n._v$ && (null != (n._v$ = r) ? t.style.setProperty("z-index", r) : t.style.removeProperty("z-index")),
                  o !== n._v$2 && fe(a, n._v$2 = o),
                  i !== n._v$3 && (null != (n._v$3 = i) ? a.style.setProperty("background-color", i) : a.style.removeProperty("background-color")),
                  n
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0
              }),
              t
          }
          )()]
      }
  })
}
, _s = ue("<style>\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: hidden;\n}\n")
, xs = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "close"
  })
}
, ks = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "hidePreviewMessage"
  })
}
, Cs = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "open"
  })
}
, Ss = e=>{
  const t = {
      isFromTypebot: !0,
      command: "setPrefilledVariables",
      variables: e
  };
  window.postMessage(t)
}
, Is = e=>{
  const t = {
      isFromTypebot: !0,
      command: "showPreviewMessage",
      message: e
  };
  window.postMessage(t)
}
, $s = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "toggle"
  })
}
, Ts = e=>{
  const t = {
      isFromTypebot: !0,
      command: "setInputValue",
      value: e
  };
  window.postMessage(t)
}
, Es = e=>{
  const t = e.id ? document.getElementById(e.id) : document.querySelector("typebot-standard");
  if (!t)
      throw new Error("<typebot-standard> element not found.");
  Object.assign(t, e)
}
, Ps = e=>{
  const t = document.createElement("typebot-popup");
  Object.assign(t, e),
  document.body.appendChild(t)
}
, As = e=>{
  const t = document.createElement("typebot-bubble");
  Object.assign(t, e),
  document.body.appendChild(t)
}
;
"undefined" != typeof window && (Ie("typebot-standard", $e, ((e,{element: t})=>{
  const [n,r] = x(!1)
    , o = new IntersectionObserver((e=>{
      e.some((e=>e.isIntersecting)) && r(!0)
  }
  ));
  return $((()=>{
      o.observe(t)
  }
  )),
  T((()=>{
      o.disconnect()
  }
  )),
  [(()=>{
      const e = _s()
        , t = e.firstChild;
      return be(e, Pe, t),
      e
  }
  )(), G(te, {
      get when() {
          return n()
      },
      get children() {
          return G(hs, e)
      }
  })]
}
)),
Ie("typebot-bubble", Ee, bs),
Ie("typebot-popup", Te, ws));
const Os = {
  initStandard: Es,
  initPopup: Ps,
  initBubble: As,
  close: xs,
  hidePreviewMessage: ks,
  open: Cs,
  setPrefilledVariables: Ss,
  showPreviewMessage: Is,
  toggle: $s,
  setInputValue: Ts
};
(e=>{
  "undefined" != typeof window && (window.Typebot = {
      ...e
  })
}
)(Os);
export {Os as default};
