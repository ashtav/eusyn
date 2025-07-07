import {
  t as B,
  n as C,
  o as G,
  _ as I,
  b as Q,
  v as R,
  x as V,
  E as W,
  A as X,
  y as Y,
  i as Z,
  a as c,
  c as f,
  r as h,
  F as j,
  d as r,
  e as u,
  k as w,
  h as x,
  z,
} from "./C43SaR65.js";
import { t as b } from "./CczvJgXj.js";
import "./CZAeHPMY.js";
import { _ as ee } from "./D2g8G5cE.js";
import { _ as J } from "./DwNZF4XX.js";
import M from "./DxX1J03z.js";
const oe = z({
    inheritAttrs: !1,
    emits: ["update:modelValue", "enter", "change"],
    props: {
      modelValue: { default: "", type: [Number, String] },
      label: { type: String, default: null },
      hint: { type: String, default: null },
      disabled: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      autofocus: { type: Boolean, default: !1 },
      busy: { type: Boolean, default: !1 },
      prefix: { type: String, default: null },
      suffix: { type: String, default: null },
      options: { type: Array, default: () => [] },
    },
    setup(e, { emit: o, attrs: v }) {
      var q;
      const p = ((q = W().public.ui) == null ? void 0 : q.icon) == "tabler",
        g = p ? "ti-x" : "hgi-cancel-01",
        l = p ? "ti-chevron-down" : "hgi-arrow-down-01",
        d = X(),
        t = h(e.modelValue),
        m = h(e.options),
        i = h(null),
        _ = h(e.busy),
        y = h(!1),
        S = h(null),
        H = h(null),
        $ = h(e.modelValue),
        A = (n) => {
          (t.value = n.target.value),
            (m.value = e.options.filter((a) =>
              b(a).toLowerCase().includes(t.value.toString().toLowerCase())
            )),
            y.value || (y.value = !0);
        },
        U = (n) => {
          (y.value = !0),
            setTimeout(() => {
              const a = document.querySelector(".select .options li.selected");
              a && a.scrollIntoView({ block: "center" });
            }, 1);
        },
        K = () => {
          (t.value = b(i.value)),
            setTimeout(() => {
              (y.value = !1), (m.value = e.options);
            }, 1);
        },
        T = (n) => {
          (t.value = b(n)),
            (i.value = n),
            o("update:modelValue", b(n, !0)),
            o("change", n);
        },
        N = (n) => {
          var a, k;
          if (
            n.keyCode == 13 &&
            (k =
              (a = d == null ? void 0 : d.vnode) == null ? void 0 : a.props) !=
              null &&
            k.onEnter
          ) {
            const P = m.value;
            setTimeout(() => {
              t.value != b(i.value) &&
                P.length != 0 &&
                t.value != "" &&
                (T(P[0]), S.value.blur());
            }, 10),
              o("enter", t.value),
              (y.value = !1);
          }
        },
        D = () => {
          if (!i.value) return S.value.focus();
          (i.value = null),
            (t.value = ""),
            o("update:modelValue", ""),
            o("change", null);
        },
        L = (n) => {
          if (e.options.length == 0) {
            o("update:modelValue", ""), (t.value = "");
            return;
          }
          const a = e.options.find(
            (k) => `${b(k, !0)}`.toLowerCase() == `${n}`.toLowerCase()
          );
          (i.value = a),
            (t.value =
              (a == null ? void 0 : a.label) ??
              (a == null ? void 0 : a.value) ??
              n);
        },
        E = () => {
          S.value &&
            setTimeout(() => {
              S.value.focus();
            }, 10);
        };
      return (
        w(
          () => e.modelValue,
          (n) => {
            L(n), n == "" && (t.value = n);
          }
        ),
        w(
          () => e.options,
          (n) => {
            (m.value = n), setTimeout(() => L($.value), 0);
          }
        ),
        w(
          () => e.busy,
          (n) => {
            _.value = n;
          }
        ),
        G(() => {
          L(t.value), e.autofocus && E();
        }),
        {
          utils: R,
          localValue: t,
          localOptions: m,
          selected: i,
          isFocus: y,
          refSelect: S,
          refOption: H,
          isLoading: _,
          iconX: g,
          iconChevron: l,
          onInput: A,
          onFocus: U,
          onBlur: K,
          onSelect: T,
          onKeyPress: N,
          onSuffix: D,
          textOption: b,
          doFocus: E,
          setLoading: (n) => {
            _.value = n;
          },
        }
      );
    },
  }),
  ne = { class: "input-icon" },
  te = { key: 0, class: "input-icon-addon" },
  se = ["value", "placeholder", "required", "disabled", "autofocus"],
  le = { class: "suffix" },
  ie = { key: 0, class: "spinner-border spinner-border-sm" },
  ae = { key: 1, class: "options" },
  ue = { ref: "refOption" },
  re = ["onMousedown"],
  de = { key: 0, class: "text-muted pe-none" };
function ce(e, o, v, F, s, p) {
  const g = Z;
  return (
    c(),
    f(
      "div",
      {
        class: C(["select", e.utils.on(e.disabled || e.isLoading, "disabled")]),
      },
      [
        e.label
          ? (c(),
            f(
              "label",
              {
                key: 0,
                class: C(["form-label", e.utils.on(e.required, "required")]),
              },
              B(e.label),
              3
            ))
          : V("", !0),
        r("div", ne, [
          e.prefix
            ? (c(),
              f("span", te, [
                u(g, { icon: e.prefix, size: "input-prefix" }, null, 8, [
                  "icon",
                ]),
              ]))
            : V("", !0),
          r(
            "input",
            {
              ref: "refSelect",
              value: e.localValue,
              class: C(["form-control", e.utils.on(e.isFocus, "has-focus")]),
              placeholder: e.hint,
              maxlength: 255,
              required: e.required,
              disabled: e.disabled || e.isLoading,
              autofocus: e.autofocus,
              name: "select",
              autocomplete: "off",
              onInput: o[0] || (o[0] = (...l) => e.onInput && e.onInput(...l)),
              onFocus: o[1] || (o[1] = (...l) => e.onFocus && e.onFocus(...l)),
              onBlur: o[2] || (o[2] = (...l) => e.onBlur && e.onBlur(...l)),
              onKeypress:
                o[3] || (o[3] = (...l) => e.onKeyPress && e.onKeyPress(...l)),
            },
            null,
            42,
            se
          ),
          r("div", le, [
            r(
              "span",
              {
                onClick:
                  o[4] || (o[4] = (...l) => e.onSuffix && e.onSuffix(...l)),
              },
              [
                e.isLoading
                  ? (c(), f("i", ie))
                  : (c(),
                    Y(
                      g,
                      {
                        key: 1,
                        icon: e.selected ? e.iconX : e.suffix ?? e.iconChevron,
                      },
                      null,
                      8,
                      ["icon"]
                    )),
              ]
            ),
          ]),
          e.isFocus
            ? (c(),
              f("div", ae, [
                r(
                  "ul",
                  ue,
                  [
                    (c(!0),
                    f(
                      j,
                      null,
                      Q(
                        e.localOptions,
                        (l, d) => (
                          c(),
                          f(
                            "li",
                            {
                              key: d,
                              class: C({ selected: l == e.selected }),
                              onMousedown: (t) => e.onSelect(l),
                            },
                            [r("span", null, B(e.textOption(l)), 1)],
                            42,
                            re
                          )
                        )
                      ),
                      128
                    )),
                    e.localOptions.length == 0
                      ? (c(), f("li", de, " Not found. "))
                      : V("", !0),
                  ],
                  512
                ),
              ]))
            : V("", !0),
        ]),
      ],
      2
    )
  );
}
const pe = I(oe, [
    ["render", ce],
    ["__scopeId", "data-v-a3b00017"],
  ]),
  me = [
    { id: 1, name: "Electronics", description: "Devices and gadgets" },
    {
      id: 2,
      name: "Books",
      description: "Literature and educational materials",
    },
    { id: 3, name: "Clothing", description: "Apparel and fashion items" },
    {
      id: 4,
      name: "Home & Kitchen",
      description: "Household items and kitchenware",
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      description: "Equipment and apparel for sports and outdoor activities",
    },
  ],
  O = { categories: me },
  fe = {
    setup() {
      const e = O.categories ?? [];
      return { dummy: O, data: e };
    },
    data() {
      return {
        isLoading: !0,
        isLoadingProvince: !0,
        forms: { hobby: "", province: 3, city: "", option: "" },
        hobbies: [
          "Swimming",
          "Reading",
          "Coding",
          "Drawing",
          "Hiking",
          "Cooking",
          "Traveling",
          "Photography",
          "Gardening",
          "Cycling",
          "Writing",
          "Playing Musical Instruments",
          "Fishing",
          "Yoga",
          "Gaming",
        ],
        provinces: [],
        options: [],
      };
    },
    mounted() {
      (this.isLoading = !0),
        (this.isLoadingProvince = !0),
        setTimeout(() => {
          (this.isLoading = !1),
            (this.forms.hobby = "Traveling"),
            (this.provinces = [
              { label: "Bali", value: 1 },
              { label: "Jakarta", value: 2 },
              { label: "West Java", value: 3 },
              { label: "Central Java", value: 4 },
              { label: "Yogyakarta", value: 5 },
              { label: "East Java", value: 6 },
              { label: "Banten", value: 7 },
            ]),
            (this.isLoadingProvince = !1);
        }, 1e3);
    },
    methods: {
      onEnter(e) {
        console.log(e);
      },
      onSubmit(e) {
        e.submit(),
          setTimeout(() => {
            (this.options = (this.dummy.categories ?? []).map((o) => ({
              label: o.name,
              value: o.id,
            }))),
              e.abort(),
              (this.forms.option = "");
          }, 2e3);
      },
      onFill() {
        this.forms.option = "";
      },
      setLoading() {
        this.$loading(),
          setTimeout(() => {
            this.$loading(!1);
          }, 1e3);
      },
      onSearch(e) {
        this.$loading(!0, "search");
        const o = this.data.filter((v) =>
          v.name.toLowerCase().includes(e.toLowerCase())
        );
        (this.options = o.map((v) => ({ label: v.name, value: v.id }))),
          setTimeout(() => {
            this.$loading(!1, "search"), this.$e.focus(this, "search");
          }, 1e3);
      },
    },
  },
  he = { class: "row" },
  ve = { class: "col-lg-6 space-y-3" },
  be = r(
    "p",
    null,
    " This is how the select option is displayed and how to use it along with some additional information. Here are the details on its functionalities, advantages, and usage scenarios. ",
    -1
  ),
  ge = r("br", null, null, -1),
  ye = r("div", { style: { "margin-bottom": "300px" } }, null, -1);
function Se(e, o, v, F, s, p) {
  const g = J,
    l = M,
    d = pe,
    t = ee,
    m = x;
  return (
    c(),
    f("div", null, [
      u(g, { title: "Select Option" }),
      r("div", he, [
        r("div", ve, [
          be,
          u(l, {
            attrs: [
              "label",
              "hint",
              "type",
              "disabled",
              "required",
              "autofocus",
              "busy",
              "prefix",
              "suffix",
              "options",
              "v-model",
            ],
          }),
          u(
            d,
            {
              modelValue: s.forms.hobby,
              "onUpdate:modelValue":
                o[0] || (o[0] = (i) => (s.forms.hobby = i)),
              label: "Hobby",
              hint: "Select your hobby",
              options: s.hobbies,
              busy: s.isLoading,
              onEnter: p.onEnter,
            },
            null,
            8,
            ["modelValue", "options", "busy", "onEnter"]
          ),
          u(t, {
            class: "mb-5",
            description: "Using label as input.",
            code: '<Select label="Hobby" hint="Select your hobby" :options="hobbies" v-model="forms.hobby" :busy="isLoading" @enter="onEnter" />',
          }),
          u(
            d,
            {
              label: "Province",
              hint: "Select your province",
              suffix: "hgi-map-pinpoint-02",
              required: "",
              options: s.provinces,
              modelValue: s.forms.province,
              "onUpdate:modelValue":
                o[1] || (o[1] = (i) => (s.forms.province = i)),
              busy: s.isLoadingProvince,
            },
            null,
            8,
            ["options", "modelValue", "busy"]
          ),
          u(t, {
            class: "mb-5",
            description: "Using value as input.",
            code: '<Select label="Province" hint="Select your province" suffix="ti-map-2" required :options="provinces" v-model="forms.province" />',
          }),
          u(
            d,
            {
              label: "From Api",
              hint: "Select your data",
              suffix: "ti-file",
              required: "",
              options: s.options,
              modelValue: s.forms.option,
              "onUpdate:modelValue":
                o[2] || (o[2] = (i) => (s.forms.option = i)),
              ref: "select",
            },
            null,
            8,
            ["options", "modelValue"]
          ),
          r("div", null, [
            u(m, { label: "Get Data", onClick: p.onSubmit }, null, 8, [
              "onClick",
            ]),
            u(
              m,
              { label: "Auto Fill", theme: "white ms-2", onClick: p.onFill },
              null,
              8,
              ["onClick"]
            ),
            u(
              m,
              {
                label: "Set Loading",
                theme: "white ms-2",
                onClick: p.setLoading,
                ref: "el",
              },
              null,
              8,
              ["onClick"]
            ),
          ]),
          r("code", null, B(s.forms), 1),
          ge,
          u(
            d,
            {
              label: "Search",
              hint: "Type category name, then press enter",
              suffix: "ti-file",
              required: "",
              options: s.options,
              modelValue: s.forms.option,
              "onUpdate:modelValue":
                o[3] || (o[3] = (i) => (s.forms.option = i)),
              ref: "search",
              onEnter: p.onSearch,
            },
            null,
            8,
            ["options", "modelValue", "onEnter"]
          ),
          u(t, {
            class: "mb-5",
            description:
              "To keep the search input focused after searching, use the ref attribute.",
            code: `this.$e.focus(this, 'search') // focus\r
this.$loading(true, 'search') // set busy`,
          }),
        ]),
      ]),
      ye,
    ])
  );
}
const Te = I(fe, [["render", Se]]);
export { Te as default };
