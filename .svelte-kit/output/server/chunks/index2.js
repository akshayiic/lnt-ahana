const noop = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    if (invalidate)
      invalidate(void 0);
    return noop;
  }
  const unsub = store.subscribe(
    run,
    // @ts-expect-error
    invalidate
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
const HYDRATION_START = "[";
const HYDRATION_END = "]";
const UNINITIALIZED = Symbol();
const RawTextElements = ["textarea", "script", "style", "title"];
const PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
const DOMBooleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory"
];
function lifecycle_outside_component(name) {
  {
    throw new Error("lifecycle_outside_component");
  }
}
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
var current_component = null;
function getContext(key) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key)
  );
  return result;
}
function setContext(key, context) {
  get_or_init_context_map().set(key, context);
  return context;
}
function get_or_init_context_map(name) {
  if (current_component === null) {
    lifecycle_outside_component();
  }
  return current_component.c ??= new Map(get_parent_context(current_component) || void 0);
}
function push() {
  current_component = { p: current_component, c: null, d: null };
}
function pop() {
  var component = (
    /** @type {import('#server').Component} */
    current_component
  );
  var ondestroy = component.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component.p;
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
const INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
const VoidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function create_payload() {
  return { out: "", head: { title: "", out: "", anchor: 0 }, anchor: 0 };
}
function element(payload, tag, attributes_fn, children_fn) {
  payload.out += `<${tag} `;
  attributes_fn();
  payload.out += `>`;
  if (!VoidElements.has(tag)) {
    if (!RawTextElements.includes(tag)) {
      payload.out += BLOCK_OPEN;
    }
    if (!RawTextElements.includes(tag)) {
      payload.out += BLOCK_CLOSE;
    }
    payload.out += `</${tag}>`;
  }
}
let on_destroy = [];
function render(component, options) {
  const payload = create_payload();
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options.context) {
    push();
    current_component.c = options.context;
  }
  component(payload, options.props, {}, {});
  if (options.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy)
    cleanup();
  on_destroy = prev_on_destroy;
  return {
    head: payload.head.out || payload.head.title ? payload.head.out + payload.head.title : "",
    html: payload.out
  };
}
function head(payload, fn) {
  const head_payload = payload.head;
  payload.head.out += BLOCK_OPEN;
  fn(head_payload);
  payload.head.out += BLOCK_CLOSE;
}
function attr(name, value, boolean) {
  if (value == null || !value && boolean || value === "" && name === "class")
    return "";
  const assignment = boolean ? "" : `="${escape_html(value, true)}"`;
  return ` ${name}${assignment}`;
}
function spread_attributes(attrs, lowercase_attributes, is_html, class_hash, additional) {
  const merged_attrs = {};
  let key;
  for (let i = 0; i < attrs.length; i++) {
    const obj = attrs[i];
    for (key in obj) {
      if (typeof obj[key] !== "function") {
        merged_attrs[key] = obj[key];
      }
    }
  }
  let attr_str = "";
  let name;
  for (name in merged_attrs) {
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name))
      continue;
    if (lowercase_attributes) {
      name = name.toLowerCase();
    }
    const is_boolean = is_html && DOMBooleanAttributes.includes(name);
    attr_str += attr(name, merged_attrs[name], is_boolean);
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key in obj) {
      merged_props[key] = obj[key];
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function store_get(store_values, store_name, store) {
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  store_values[store_name]?.[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function store_set(store, value) {
  store.set(value);
  return value;
}
function mutate_store(store_values, store_name, store, expression) {
  store_set(store, store_get(store_values, store_name, store));
  return expression;
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function value_or_fallback(value, fallback) {
  return value === void 0 ? fallback() : value;
}
function slot(payload, slot_fn, slot_props, fallback_fn) {
  if (slot_fn === void 0)
    ;
  else {
    slot_fn(payload, slot_props);
  }
}
function rest_props(props, rest) {
  const rest_props2 = {};
  let key;
  for (key in props) {
    if (!rest.includes(key)) {
      rest_props2[key] = props[key];
    }
  }
  return rest_props2;
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function bind_props(props_parent, props_now) {
  for (const key in props_now) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key)?.set) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
export {
  run_all as A,
  HYDRATION_START as H,
  PassiveDelegatedEvents as P,
  UNINITIALIZED as U,
  HYDRATION_END as a,
  pop as b,
  slot as c,
  store_get as d,
  attr as e,
  escape_html as f,
  getContext as g,
  stringify as h,
  head as i,
  store_set as j,
  ensure_array_like as k,
  rest_props as l,
  mutate_store as m,
  spread_attributes as n,
  bind_props as o,
  push as p,
  sanitize_props as q,
  render as r,
  setContext as s,
  spread_props as t,
  unsubscribe_stores as u,
  value_or_fallback as v,
  element as w,
  current_component as x,
  noop as y,
  subscribe_to_store as z
};
