import { _ as A, f as F, h as W } from "./Ba-rC5VF.js";
import {
  t as _,
  n as b,
  d as c,
  i as C,
  f as E,
  b as I,
  e as i,
  v as k,
  a as m,
  z as M,
  c as p,
  y as q,
  _ as S,
  o as T,
  A as U,
  r as v,
  k as V,
  F as w,
  x as y,
  j as z,
} from "./C43SaR65.js";
import "./CZAeHPMY.js";
import { _ as P } from "./D2g8G5cE.js";
import { _ as N } from "./DwNZF4XX.js";
import B from "./DxX1J03z.js";
const H = {
    name: "Number",
    inheritAttrs: !1,
    emits: ["update:modelValue"],
    setup(e, { emit: a }) {
      const o = parseInt(e.modelValue.toString()) || 0,
        n = v(o);
      V(
        () => e.modelValue,
        (r) => {
          n.value = parseInt(r.toString()) || 0;
        }
      );
      const l = (r) => {
        e.disabled ||
          e.readonly ||
          ((n.value =
            r === 0
              ? Math.max((n.value || 0) - 1, e.min || 0)
              : Math.min((n.value || 0) + 1, e.max || Number.MAX_SAFE_INTEGER)),
          a("update:modelValue", n.value.toString()));
      };
      return {
        utils: k,
        localValue: n,
        onControl: l,
        onWheel: (r) => {
          r.preventDefault(), l(r.deltaY < 0 ? 1 : 0);
        },
      };
    },
    props: {
      modelValue: { default: "", type: [String, Number] },
      label: { type: String, default: null },
      prefix: { type: String, default: null },
      disabled: { type: Boolean, default: !1 },
      readonly: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
  },
  K = { class: "controls" },
  L = ["onClick"];
function Y(e, a, o, n, l, f) {
  const r = C;
  return (
    m(),
    p(
      "div",
      { class: b(["number", n.utils.on(o.disabled, "disabled")]) },
      [
        o.label
          ? (m(),
            p(
              "label",
              {
                key: 0,
                class: b(["form-label", n.utils.on(o.required, "required")]),
              },
              _(o.label),
              3
            ))
          : y("", !0),
        c(
          "div",
          {
            class: "input-group",
            onWheel: a[0] || (a[0] = (...t) => n.onWheel && n.onWheel(...t)),
          },
          [
            c("div", null, [
              o.prefix
                ? (m(),
                  q(
                    r,
                    {
                      key: 0,
                      icon: o.prefix,
                      size: "input-prefix",
                      class: "me-3 opacity-50",
                    },
                    null,
                    8,
                    ["icon"]
                  ))
                : y("", !0),
              E(" " + _(n.localValue), 1),
            ]),
            c("div", K, [
              (m(),
              p(
                w,
                null,
                I(["hgi-minus-sign", "hgi-plus-sign"], (t, u) =>
                  c(
                    "span",
                    { onClick: (s) => n.onControl(u) },
                    [i(r, { icon: t }, null, 8, ["icon"])],
                    8,
                    L
                  )
                ),
                64
              )),
            ]),
          ],
          32
        ),
      ],
      2
    )
  );
}
const j = S(H, [
    ["render", Y],
    ["__scopeId", "data-v-327726df"],
  ]),
  G = {
    inheritAttrs: !1,
    emits: ["update:modelValue"],
    setup(e, { emit: a }) {
      const o = e.modelValue ? new Date(e.modelValue) : new Date(),
        n = v(k.dateFormat(o, "Y-m-d"));
      V(
        () => e.modelValue,
        (r) => {
          n.value = r;
        }
      );
      const l = (r) => {
        const t = new Date(n.value),
          u = e.minDate ? new Date(e.minDate) : null,
          s = e.maxDate ? new Date(e.maxDate) : null;
        r === 0 ? t.setDate(t.getDate() - 1) : t.setDate(t.getDate() + 1),
          u && t < u && t.setTime(u.getTime()),
          s && t > s && t.setTime(s.getTime()),
          (n.value = k.dateFormat(t, "Y-m-d")),
          a("update:modelValue", n.value);
      };
      return {
        utils: k,
        localValue: n,
        onControl: l,
        onWheel: (r) => {
          r.preventDefault(), l(r.deltaY < 0 ? 1 : 0);
        },
      };
    },
    props: {
      modelValue: { default: "", type: String },
      label: { type: String, default: null },
      prefix: { type: String, default: null },
      disabled: { type: Boolean, default: !1 },
      readonly: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      minDate: { type: String, default: null },
      maxDate: { type: String, default: null },
    },
  },
  O = { class: "controls" },
  R = ["onClick"];
function X(e, a, o, n, l, f) {
  const r = C;
  return (
    m(),
    p(
      "div",
      { class: b(["date", n.utils.on(o.disabled, "disabled")]) },
      [
        o.label
          ? (m(),
            p(
              "label",
              {
                key: 0,
                class: b(["form-label", n.utils.on(o.required, "required")]),
              },
              _(o.label),
              3
            ))
          : y("", !0),
        c(
          "div",
          {
            class: "input-group",
            onWheel: a[0] || (a[0] = (...t) => n.onWheel && n.onWheel(...t)),
          },
          [
            c("div", null, [
              o.prefix
                ? (m(),
                  q(
                    r,
                    {
                      key: 0,
                      icon: o.prefix,
                      size: "input-prefix",
                      class: "me-3 opacity-50",
                    },
                    null,
                    8,
                    ["icon"]
                  ))
                : y("", !0),
              E(" " + _(n.localValue), 1),
            ]),
            c("div", O, [
              (m(),
              p(
                w,
                null,
                I(["hgi-arrow-down-01", "hgi-arrow-up-01"], (t, u) =>
                  c(
                    "span",
                    { onClick: (s) => n.onControl(u) },
                    [i(r, { icon: `${t} fix` }, null, 8, ["icon"])],
                    8,
                    R
                  )
                ),
                64
              )),
            ]),
          ],
          32
        ),
      ],
      2
    )
  );
}
const J = S(G, [
    ["render", X],
    ["__scopeId", "data-v-921bafd4"],
  ]),
  Q = (e, a, o, n) => {
    let l = parseInt(e[n]);
    return (
      o === "up"
        ? n === 0
          ? (l = l === 23 ? 0 : l + 1)
          : (n === 1 || (n === 2 && a === "h:i:s")) &&
            (l = l === 59 ? 0 : l + 1)
        : o === "down" &&
          (n === 0
            ? (l = l === 0 ? 23 : l - 1)
            : (n === 1 || (n === 2 && a === "h:i:s")) &&
              (l = l === 0 ? 59 : l - 1)),
      l
    );
  },
  Z = {
    inheritAttrs: !1,
    emits: ["update:modelValue"],
    props: {
      modelValue: { default: "", type: String },
      label: { type: String },
      disabled: { type: Boolean, default: !1 },
      prefix: { type: String },
      time: { type: Array, default: () => [] },
      format: { type: String, default: "h:i" },
      shape: { type: String, default: "form" },
    },
    setup(e, { emit: a }) {
      v(e.modelValue);
      const o = v(!1),
        n = () =>
          e.format == "h:i"
            ? ["00", "00"]
            : e.format == "h:i:s"
            ? ["00", "00", "00"]
            : ["00", "00"],
        l = v(n()),
        f = (d) => (d < 10 ? `0${d}` : `${d}`),
        r = () => {
          if (e.time.length === 2 && e.format === "h:i")
            l.value = e.time.map((d) => f(parseInt(d)));
          else if (e.time.length === 3 && e.format === "h:i:s")
            l.value = e.time.map((d) => f(parseInt(d)));
          else {
            const d = new Date();
            l.value =
              e.format === "h:i"
                ? [f(d.getHours()), f(d.getMinutes())]
                : [f(d.getHours()), f(d.getMinutes()), f(d.getSeconds())];
          }
          if (e.modelValue)
            if (
              (e.format === "h:i"
                ? /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
                : /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
              ).test(e.modelValue)
            ) {
              const g = e.modelValue.split(":").map((D) => f(parseInt(D)));
              l.value = g;
            } else a("update:modelValue", l.value.join(":"));
        },
        t = (d, g) => {
          const D = Q(l.value, e.format, d, g);
          (l.value[g] = f(D)), a("update:modelValue", l.value.join(":"));
        },
        u = (d, g) => {
          d.preventDefault(), t(d.deltaY < 0 ? "up" : "down", g);
        },
        s = (d) => {
          o.value = !0;
        },
        x = (d) => {
          o.value = !1;
        };
      return (
        T(() => r()),
        V(
          () => e.format,
          () => {
            (l.value = n()), r();
          }
        ),
        V(
          () => e.modelValue,
          () => {
            r();
          }
        ),
        {
          times: l,
          utils: k,
          hasFocus: o,
          onChange: t,
          onWheel: u,
          onFocus: s,
          onBlur: x,
        }
      );
    },
  },
  $ = { key: 0, class: "form-label" },
  ee = ["onWheel"],
  te = ["onClick"],
  le = ["onClick"],
  ne = { class: "time" };
function ae(e, a, o, n, l, f) {
  const r = C;
  return (
    m(),
    p(
      "div",
      {
        class: b([
          "time-picker",
          [
            o.shape,
            { "has-prefix": o.prefix != null },
            n.utils.on(o.disabled, "disabled"),
          ],
        ]),
      },
      [
        o.label ? (m(), p("label", $, _(o.label), 1)) : y("", !0),
        c(
          "div",
          {
            class: b(["input", { focus: n.hasFocus }]),
            tabindex: "0",
            onFocus: a[0] || (a[0] = (...t) => n.onFocus && n.onFocus(...t)),
            onBlur: a[1] || (a[1] = (...t) => n.onBlur && n.onBlur(...t)),
          },
          [
            o.prefix && o.shape == "form"
              ? (m(),
                q(
                  r,
                  {
                    key: 0,
                    icon: o.prefix,
                    style: { margin: "0 10px", color: "#999" },
                  },
                  null,
                  8,
                  ["icon"]
                ))
              : y("", !0),
            c("ul", null, [
              (m(!0),
              p(
                w,
                null,
                I(
                  n.times,
                  (t, u) => (
                    m(),
                    p(
                      "li",
                      { key: u, onWheel: (s) => n.onWheel(s, u) },
                      [
                        c(
                          "span",
                          { class: "up", onClick: (s) => n.onChange("up", u) },
                          null,
                          8,
                          te
                        ),
                        c(
                          "span",
                          {
                            class: "down",
                            onClick: (s) => n.onChange("down", u),
                          },
                          null,
                          8,
                          le
                        ),
                        c("span", ne, _(t), 1),
                      ],
                      40,
                      ee
                    )
                  )
                ),
                128
              )),
            ]),
          ],
          34
        ),
      ],
      2
    )
  );
}
const oe = S(Z, [
    ["render", ae],
    ["__scopeId", "data-v-4bad5479"],
  ]),
  se = M({
    inheritAttrs: !1,
    emits: ["update:modelValue", "enter", "blur", "suffix"],
    props: {
      modelValue: { default: "", type: String },
      label: { type: String, default: null },
      hint: { type: String, default: null },
      disabled: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      autofocus: { type: Boolean, default: !1 },
      maxLength: { type: Number, default: 500 },
      maxHeight: { type: Number, default: 150 },
      prefix: { type: String, default: null },
      suffix: { type: Array, default: () => [] },
      formatters: { type: String, default: "" },
    },
    setup(e, { emit: a }) {
      const o = U(),
        n = v(e.modelValue),
        l = v(e.suffix),
        f = v(null),
        r = (s) => {
          n.value = s.target.value;
        },
        t = (s) => {
          a("suffix", s);
        },
        u = (s) => {
          W(o, a, e, s, n.value, e.formatters.split("|"));
        };
      return (
        V(
          () => e.suffix,
          (s) => {
            l.value = s;
          },
          { immediate: !0 }
        ),
        V(
          () => e.modelValue,
          (s) => {
            n.value = s;
          }
        ),
        V(
          () => n.value,
          (s) => {
            F(e.formatters.split("|"), a, s, "", (x) => {
              (n.value = x), a("update:modelValue", x);
            });
          }
        ),
        T(() => {
          e.autofocus &&
            setTimeout(() => {
              f.value.focus();
            }, 10);
        }),
        {
          utils: k,
          localValue: n,
          inputSuffixs: l,
          textarea: f,
          onInput: r,
          onSuffix: t,
          onKeyPress: u,
        }
      );
    },
  }),
  re = { class: "input-icon" },
  ie = { key: 0, class: "input-icon-addon" },
  ue = [
    "value",
    "placeholder",
    "maxlength",
    "required",
    "disabled",
    "autofocus",
  ],
  de = { key: 1, class: "suffix" },
  me = ["onClick"],
  ce = { key: 0 };
function fe(e, a, o, n, l, f) {
  const r = C;
  return (
    m(),
    p(
      "div",
      { class: b(["input", e.utils.on(e.disabled, "disabled")]) },
      [
        e.label
          ? (m(),
            p(
              "label",
              {
                key: 0,
                class: b(["form-label", e.utils.on(e.required, "required")]),
              },
              _(e.label),
              3
            ))
          : y("", !0),
        c("div", re, [
          e.prefix
            ? (m(),
              p("span", ie, [
                i(r, { icon: e.prefix, size: "input-prefix" }, null, 8, [
                  "icon",
                ]),
              ]))
            : y("", !0),
          c(
            "textarea",
            {
              value: e.localValue,
              class: b(["form-control"]),
              placeholder: e.hint,
              maxlength: e.maxLength,
              required: e.required,
              disabled: e.disabled,
              autofocus: e.autofocus,
              name: "input",
              autocomplete: "off",
              style: z({ maxHeight: `${e.maxHeight}px` }),
              onInput: a[0] || (a[0] = (...t) => e.onInput && e.onInput(...t)),
              onKeypress:
                a[1] || (a[1] = (...t) => e.onKeyPress && e.onKeyPress(...t)),
              ref: "textarea",
            },
            null,
            44,
            ue
          ),
          e.inputSuffixs.length != 0
            ? (m(),
              p("div", de, [
                (m(!0),
                p(
                  w,
                  null,
                  I(
                    e.inputSuffixs,
                    (t, u) => (
                      m(),
                      p(
                        "span",
                        {
                          key: u,
                          class: b([e.utils.on(t.disabled, "disabled")]),
                          onClick: (s) => e.onSuffix(t),
                        },
                        [
                          t != null && t.kbd && t != null && t.text
                            ? (m(), p("kbd", ce, _(t.text), 1))
                            : t != null && t.text
                            ? (m(),
                              p(
                                "span",
                                {
                                  key: 1,
                                  class: b(t == null ? void 0 : t.class),
                                },
                                _(t.text),
                                3
                              ))
                            : t != null && t.icon && !(t != null && t.text)
                            ? (m(),
                              q(
                                r,
                                { key: 2, icon: t == null ? void 0 : t.icon },
                                null,
                                8,
                                ["icon"]
                              ))
                            : y("", !0),
                        ],
                        10,
                        me
                      )
                    )
                  ),
                  128
                )),
              ]))
            : y("", !0),
        ]),
      ],
      2
    )
  );
}
const pe = S(se, [
    ["render", fe],
    ["__scopeId", "data-v-e7aea289"],
  ]),
  he = {
    setup() {
      return {};
    },
    data() {
      return {
        forms: {
          name: "",
          email: "",
          phone: "",
          password: "secret-password",
          price: "",
          date: "",
          time: "",
          note: "",
          quantity: 2,
        },
      };
    },
    methods: {
      onSuffix(e) {
        console.log(e),
          this.$e.utils.cleanMap(this, "forms"),
          this.$e.focus(this, "email");
      },
      onEnter(e) {
        console.log(e);
      },
    },
  },
  be = { class: "row" },
  ye = { class: "col-lg-6 space-y-3" },
  _e = c(
    "p",
    null,
    " This is how the input is displayed and how to use it along with some additional information. Here are the details on its functionalities, advantages, and usage scenarios. ",
    -1
  ),
  ge = c("h2", { class: "mt-5" }, "Number", -1),
  ve = c("h2", { class: "mt-5" }, "Date", -1),
  Ve = c("h2", { class: "mt-5" }, "Time", -1),
  xe = c("h2", { class: "mt-5" }, "Textarea", -1);
function ke(e, a, o, n, l, f) {
  const r = N,
    t = B,
    u = A,
    s = P,
    x = j,
    d = J,
    g = oe,
    D = pe;
  return (
    m(),
    p("div", null, [
      i(r, { title: "Input" }),
      c("div", be, [
        c("div", ye, [
          _e,
          i(t, {
            attrs: [
              "label",
              "hint",
              "type",
              "disabled",
              "readonly",
              "required",
              "autofocus",
              "maxLength",
              "prefix",
              "suffix",
              "password",
              "minDate",
              "maxDate",
              "formatters",
              "mask",
              "v-model",
            ],
          }),
          i(
            u,
            {
              modelValue: l.forms.name,
              "onUpdate:modelValue": a[0] || (a[0] = (h) => (l.forms.name = h)),
              label: "Full Name",
              hint: "Enter your name",
              prefix: "hgi-user",
              required: "",
              formatters: "alpha|ucwords",
              autofocus: "",
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name" formatters="alpha|ucwords" />',
          }),
          i(
            u,
            {
              modelValue: l.forms.email,
              "onUpdate:modelValue":
                a[1] || (a[1] = (h) => (l.forms.email = h)),
              label: "Email Address",
              hint: "Enter your email address",
              prefix: "hgi-mail-01",
              suffix: [
                { icon: "hgi-sent" },
                { icon: "hgi-notification-snooze-01" },
                { icon: "hgi-archive-01", disabled: !0 },
              ],
              required: "",
              onSuffix: f.onSuffix,
              ref: "email",
            },
            null,
            8,
            ["modelValue", "onSuffix"]
          ),
          i(s, {
            class: "mb-3",
            description:
              "suffix value is Object, ex: { icon: 'ti-send', disabled: false }",
            code: '<Input label="Email Address" hint="Enter your email address" prefix="ti-mail" v-model="forms.email" :suffix="[{}]" required @suffix="onSuffix" /> ',
          }),
          i(
            u,
            {
              label: "Phone Number",
              hint: "Enter your phone number",
              prefix: "hgi-contact-01",
              required: "",
              modelValue: l.forms.phone,
              "onUpdate:modelValue":
                a[2] || (a[2] = (h) => (l.forms.phone = h)),
              formatters: "phone",
            },
            null,
            8,
            ["modelValue"]
          ),
          i(
            u,
            {
              label: "Password",
              hint: "Enter your password",
              prefix: "hgi-lock",
              required: "",
              password: "",
              onEnter: f.onEnter,
              modelValue: l.forms.password,
              "onUpdate:modelValue":
                a[3] || (a[3] = (h) => (l.forms.password = h)),
            },
            null,
            8,
            ["onEnter", "modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter" v-model="forms.password" />',
          }),
          i(u, { label: "Date", type: "date", prefix: "hgi-calendar-01" }),
          i(s, {
            class: "mb-3",
            code: '<Input label="Date" type="date" prefix="ti-calendar" />',
          }),
          i(
            u,
            {
              modelValue: l.forms.price,
              "onUpdate:modelValue":
                a[4] || (a[4] = (h) => (l.forms.price = h)),
              label: "Currency",
              hint: "Enter price",
              prefix: "hgi-coins-01",
              required: "",
              formatters: "currency:,",
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Input label="Currency" hint="Enter price" prefix="ti-coins" required formatters="currency:," v-model="forms.price" />',
          }),
          i(
            u,
            {
              label: "Input Mask",
              prefix: "hgi-calendar-02",
              mask: "date:d/m/y",
              modelValue: l.forms.date,
              "onUpdate:modelValue": a[5] || (a[5] = (h) => (l.forms.date = h)),
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Input label="Input Mask" prefix="calendar-event" mask="date:d/m/y" v-model="forms.date" />',
          }),
          ge,
          i(t, {
            attrs: [
              "label",
              "hint",
              "prefix",
              "required",
              "disabled",
              "readonly",
              "min",
              "max",
              "v-model",
            ],
          }),
          i(
            x,
            {
              label: "Number",
              hint: "Enter quantity",
              prefix: "hgi-arrange-by-numbers-1-9",
              required: "",
              modelValue: l.forms.quantity,
              "onUpdate:modelValue":
                a[6] || (a[6] = (h) => (l.forms.quantity = h)),
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Number label="Number" hint="Enter quantity" prefix="hgi-arrange-by-numbers-1-9" required v-model="forms.quantity" /> ',
          }),
          ve,
          i(t, {
            attrs: [
              "label",
              "prefix",
              "disabled",
              "readonly",
              "required",
              "minDate",
              "maxDate",
              "v-model",
            ],
          }),
          i(
            d,
            {
              label: "Date Scroll",
              prefix: "hgi-calendar-01",
              maxDate: e.$e.utils.now(),
            },
            null,
            8,
            ["maxDate"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Date label="Date Scroll" prefix="ti-calendar" />',
          }),
          Ve,
          i(t, {
            attrs: [
              "label",
              "prefix",
              "disabled",
              "readonly",
              "required",
              "time",
              "format",
              "shape",
              "v-model",
            ],
          }),
          i(
            g,
            {
              label: "Time",
              prefix: "hgi-clock-01",
              format: "h:i",
              modelValue: l.forms.time,
              "onUpdate:modelValue": a[7] || (a[7] = (h) => (l.forms.time = h)),
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Time label="Select Time" prefix="clock" format="h:i" v-model="forms.time" />',
          }),
          xe,
          i(t, {
            attrs: [
              "label",
              "hint",
              "disabled",
              "readonly",
              "required",
              "autofocus",
              "maxLength",
              "prefix",
              "suffix",
              "formatters",
              "v-model",
            ],
          }),
          i(
            D,
            {
              label: "Description",
              hint: "Type description about you...",
              prefix: "hgi-note-02",
              formatters: "ucfirst",
              modelValue: l.forms.note,
              "onUpdate:modelValue": a[8] || (a[8] = (h) => (l.forms.note = h)),
            },
            null,
            8,
            ["modelValue"]
          ),
          i(s, {
            class: "mb-3",
            code: '<Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />',
          }),
          c("code", null, _(l.forms), 1),
        ]),
      ]),
    ])
  );
}
const Ee = S(he, [["render", ke]]);
export { Ee as default };
