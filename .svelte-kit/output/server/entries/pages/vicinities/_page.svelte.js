import { s as setContext, g as getContext, l as rest_props, p as push, v as value_or_fallback, d as store_get, c as slot, n as spread_attributes, u as unsubscribe_stores, o as bind_props, b as pop, q as sanitize_props, t as spread_props, k as ensure_array_like, w as element, m as mutate_store, e as attr, h as stringify } from "../../../chunks/index2.js";
import { m as minimizeBtn, a as maximizeBtn } from "../../../chunks/minimize-icon.js";
import "dequal";
import { d as derived, g as get_store_value, w as writable, r as readable } from "../../../chunks/index.js";
import { t as tick } from "../../../chunks/index-server.js";
import { nanoid } from "nanoid/non-secure";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function slide(node, { delay = 0, duration = 400, easing = cubic_out, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => (
      /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */
      `${e[0].toUpperCase()}${e.slice(1)}`
    )
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector2 = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector2(part));
  return {
    name: name2,
    attribute,
    selector: selector2,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
const { name, selector } = createElHelpers("accordion");
const defaults$1 = {
  multiple: false,
  disabled: false,
  forceVisible: false
};
const createAccordion = (props) => {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const meltIds = generateIds(["root"]);
  const { disabled, forceVisible } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isSelected = (key, v) => {
    if (v === void 0)
      return false;
    if (typeof v === "string")
      return v === key;
    return v.includes(key);
  };
  const isSelectedStore = derived(value, ($value) => {
    return (key) => isSelected(key, $value);
  });
  const root = makeElement(name(), {
    returned: () => ({
      "data-melt-id": meltIds.root
    })
  });
  const parseItemProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const parseHeadingProps = (props2) => {
    if (typeof props2 === "number") {
      return { level: props2 };
    } else {
      return props2;
    }
  };
  const item = makeElement(name("item"), {
    stores: value,
    returned: ($value) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          "data-state": isSelected(itemValue, $value) ? "open" : "closed",
          "data-disabled": disabledAttr(disabled2)
        };
      };
    }
  });
  const trigger = makeElement(name("trigger"), {
    stores: [value, disabled],
    returned: ([$value, $disabled]) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          disabled: disabledAttr($disabled || disabled2),
          "aria-expanded": isSelected(itemValue, $value) ? true : false,
          "aria-disabled": disabled2 ? true : false,
          "data-disabled": disabledAttr(disabled2),
          "data-value": itemValue,
          "data-state": isSelected(itemValue, $value) ? "open" : "closed"
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const disabled2 = node.dataset.disabled === "true";
        const itemValue = node.dataset.value;
        if (disabled2 || !itemValue)
          return;
        handleValueUpdate(itemValue);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (![kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END].includes(e.key)) {
          return;
        }
        e.preventDefault();
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
          const disabled2 = node.dataset.disabled === "true";
          const itemValue = node.dataset.value;
          if (disabled2 || !itemValue)
            return;
          handleValueUpdate(itemValue);
          return;
        }
        const el = e.target;
        const rootEl = getElementByMeltId(meltIds.root);
        if (!rootEl || !isHTMLElement(el))
          return;
        const items = Array.from(rootEl.querySelectorAll(selector("trigger")));
        const candidateItems = items.filter((item2) => {
          if (!isHTMLElement(item2))
            return false;
          return item2.dataset.disabled !== "true";
        });
        if (!candidateItems.length)
          return;
        const elIdx = candidateItems.indexOf(el);
        if (e.key === kbd.ARROW_DOWN) {
          candidateItems[(elIdx + 1) % candidateItems.length].focus();
        }
        if (e.key === kbd.ARROW_UP) {
          candidateItems[(elIdx - 1 + candidateItems.length) % candidateItems.length].focus();
        }
        if (e.key === kbd.HOME) {
          candidateItems[0].focus();
        }
        if (e.key === kbd.END) {
          candidateItems[candidateItems.length - 1].focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [value, disabled, forceVisible],
    returned: ([$value, $disabled, $forceVisible]) => {
      return (props2) => {
        const { value: itemValue } = parseItemProps(props2);
        const isVisible = isSelected(itemValue, $value) || $forceVisible;
        return {
          "data-state": isVisible ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "data-value": itemValue,
          hidden: isVisible ? void 0 : true,
          style: styleToString({
            display: isVisible ? void 0 : "none"
          })
        };
      };
    },
    action: (node) => {
      tick().then(() => {
        const contentId = generateId();
        const triggerId = generateId();
        const parentTrigger = document.querySelector(`${selector("trigger")}, [data-value="${node.dataset.value}"]`);
        if (!isHTMLElement(parentTrigger))
          return;
        node.id = contentId;
        parentTrigger.setAttribute("aria-controls", contentId);
        parentTrigger.id = triggerId;
      });
    }
  });
  const heading = makeElement(name("heading"), {
    returned: () => {
      return (props2) => {
        const { level } = parseHeadingProps(props2);
        return {
          role: "heading",
          "aria-level": level,
          "data-heading-level": level
        };
      };
    }
  });
  function handleValueUpdate(itemValue) {
    value.update(($value) => {
      if ($value === void 0) {
        return withDefaults.multiple ? [itemValue] : itemValue;
      }
      if (Array.isArray($value)) {
        if ($value.includes(itemValue)) {
          return $value.filter((v) => v !== itemValue);
        }
        $value.push(itemValue);
        return $value;
      }
      return $value === itemValue ? void 0 : itemValue;
    });
  }
  return {
    ids: meltIds,
    elements: {
      root,
      item,
      trigger,
      content,
      heading
    },
    states: {
      value
    },
    helpers: {
      isSelected: isSelectedStore
    },
    options
  };
};
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
});
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getAccordionData() {
  const NAME = "accordion";
  const ITEM_NAME = "accordion-item";
  const PARTS = ["root", "content", "header", "item", "trigger"];
  return { NAME, ITEM_NAME, PARTS };
}
function setCtx(props) {
  const initAccordion = createAccordion(removeUndefined(props));
  const { NAME, PARTS } = getAccordionData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const accordion = {
    ...initAccordion,
    getAttrs,
    updateOption: getOptionUpdater(initAccordion.options)
  };
  setContext(NAME, accordion);
  return accordion;
}
function getCtx() {
  const { NAME } = getAccordionData();
  return getContext(NAME);
}
function setItem(props) {
  const { ITEM_NAME } = getAccordionData();
  setContext(ITEM_NAME, { ...props });
  const ctx = getCtx();
  return { ...ctx, props };
}
function getItemProps() {
  const { ITEM_NAME } = getAccordionData();
  return getContext(ITEM_NAME);
}
function getContent() {
  const ctx = getCtx();
  const { value: props } = getItemProps();
  return {
    ...ctx,
    props
  };
}
function getTrigger() {
  const ctx = getCtx();
  const { value, disabled } = getItemProps();
  return {
    ...ctx,
    props: { value, disabled }
  };
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function Accordion($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "multiple",
    "value",
    "onValueChange",
    "disabled",
    "asChild",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let multiple = value_or_fallback($$props["multiple"], () => false);
  let value = value_or_fallback($$props["value"], () => void 0);
  let onValueChange = value_or_fallback($$props["onValueChange"], () => void 0);
  let disabled = value_or_fallback($$props["disabled"], () => false);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { root },
    states: { value: localValue },
    updateOption,
    getAttrs
  } = setCtx({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (Array.isArray(next)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next)) {
          onValueChange?.(next);
          value = next;
          return next;
        }
        return next;
      }
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  const attrs = getAttrs("root");
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  updateOption("multiple", multiple);
  updateOption("disabled", disabled);
  builder = store_get($$store_subs ??= {}, "$root", root);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    multiple,
    value,
    onValueChange,
    disabled,
    asChild,
    el
  });
  pop();
}
function Accordion_item$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["value", "disabled", "asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let value = $$props["value"];
  let disabled = value_or_fallback($$props["disabled"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { item }, props, getAttrs } = setItem({ value, disabled });
  const attrs = getAttrs("item");
  builder = store_get($$store_subs ??= {}, "$item", item)(props);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { value, disabled, asChild, el });
  pop();
}
function Accordion_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["level", "asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let level = value_or_fallback($$props["level"], () => 3);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { heading: header }, getAttrs } = getCtx();
  const attrs = getAttrs("header");
  builder = store_get($$store_subs ??= {}, "$header", header)(level);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { level, asChild, el });
  pop();
}
function Accordion_trigger$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { trigger }, props, getAttrs } = getTrigger();
  const attrs = getAttrs("trigger");
  builder = store_get($$store_subs ??= {}, "$trigger", trigger)(props);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<button${spread_attributes([builder, { "type": "button" }, $$restProps], true, true)}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]--></button>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Accordion_content$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], () => void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let inTransition = value_or_fallback($$props["inTransition"], () => void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => void 0);
  let outTransition = value_or_fallback($$props["outTransition"], () => void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { content },
    helpers: { isSelected },
    props,
    getAttrs
  } = getContent();
  const attrs = getAttrs("content");
  builder = store_get($$store_subs ??= {}, "$content", content)(props);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (transition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
      $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
      slot(
        $$payload,
        $$props.children,
        {
          get builder() {
            return builder;
          }
        }
      );
      $$payload.out += `<!--]--></div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
        $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
        slot(
          $$payload,
          $$props.children,
          {
            get builder() {
              return builder;
            }
          }
        );
        $$payload.out += `<!--]--></div>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (inTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
          $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
          slot(
            $$payload,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            }
          );
          $$payload.out += `<!--]--></div>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (outTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
            $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
            slot(
              $$payload,
              $$props.children,
              {
                get builder() {
                  return builder;
                }
              }
            );
            $$payload.out += `<!--]--></div>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
              $$payload.out += `<div${spread_attributes([builder, $$restProps], true, true)}><!--[-->`;
              slot(
                $$payload,
                $$props.children,
                {
                  get builder() {
                    return builder;
                  }
                }
              );
              $$payload.out += `<!--]--></div>`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    el
  });
  pop();
}
function Accordion_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "transition", "transitionConfig"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => slide);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => ({ duration: 200 }));
  $$payload.out += `<!--[-->`;
  Accordion_content$1($$payload, spread_props([
    {
      class: cn("overflow-hidden text-sm transition-all", className),
      transition,
      transitionConfig
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<div class="pb-4 pt-0"><!--[-->`;
        slot($$payload2, $$props.children, {});
        $$payload2.out += `<!--]--></div>`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
function Accordion_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let value = $$props["value"];
  $$payload.out += `<!--[-->`;
  Accordion_item$1($$payload, spread_props([
    { value, class: cn("border-b", className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {});
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, value });
  pop();
}
/**
 * @license lucide-svelte v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "mergeClasses",
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name2 = value_or_fallback($$props["name"], () => void 0);
  let color = value_or_fallback($$props["color"], () => "currentColor");
  let size = value_or_fallback($$props["size"], () => 24);
  let strokeWidth = value_or_fallback($$props["strokeWidth"], () => 2);
  let absoluteStrokeWidth = value_or_fallback($$props["absoluteStrokeWidth"], () => false);
  let iconNode = $$props["iconNode"];
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    [
      defaultAttributes,
      $$restProps,
      { "width": size },
      { "height": size },
      { "stroke": color },
      {
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth
      },
      {
        "class": mergeClasses("lucide-icon", "lucide", name2 ? `lucide-${name2}` : "", $$sanitized_props.class)
      }
    ],
    false,
    false
  )}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const $$item = each_array[$$index];
    const [tag, attrs] = $$item;
    $$payload.out += "<!--[-->";
    $$payload.out += `<!--[-->`;
    if (tag)
      element(
        $$payload,
        tag,
        () => {
          $$payload.out += `${spread_attributes([attrs], false, false)}`;
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `<!--[-->`;
  slot($$payload, $$props.children, {});
  $$payload.out += `<!--]--></svg>`;
  bind_props($$props, {
    name: name2,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode,
    mergeClasses
  });
  pop();
}
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {});
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Accordion_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "level"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let level = value_or_fallback($$props["level"], () => 3);
  $$payload.out += `<!--[-->`;
  Accordion_header($$payload, {
    level,
    class: "flex",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Accordion_trigger$1($$payload2, spread_props([
        {
          class: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
        },
        $$restProps,
        {
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            slot($$payload3, $$props.children, {});
            $$payload3.out += `<!--]--> <!--[-->`;
            Chevron_down($$payload3, {
              class: "h-4 w-4 transition-transform duration-200"
            });
            $$payload3.out += `<!--]-->`;
          }
        }
      ]));
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, level });
  pop();
}
const Root = Accordion;
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUI = getContext("currentUI");
  mutate_store($$store_subs ??= {}, "$currentUI", currentUI, store_get($$store_subs ??= {}, "$currentUI", currentUI)["vicinity"] = true);
  const isAmenitiesMinimized = writable();
  let vicinityImg = getContext("vicinityImg");
  let vicinities = [
    "Acharya Atre Metro Station.webp",
    "MTHL.webp",
    "Bandra Worli Sea Link.webp",
    "One International.webp",
    "BKC.webp",
    "Peninsula Business Park.webp",
    "Coastal Road.webp",
    "Peninsula Corporate Park.webp",
    "CSMT.webp",
    "Worli Sewri Corridor.webp",
    "Kamla Mills.webp"
  ];
  let hospitals = [
    "Breach Candy Hospital.webp",
    "TATA Memorial Hospital.webp",
    "Jaslok Hospital.webp",
    "Wockhardt Hospital.webp",
    "P.D.Hinduja Hospital.webp"
  ];
  let temples = [
    "Akshat Sayyam Jain Temple.webp",
    "Shree Panchbalayati Jain Mandir.webp",
    "Mahalaxmi Temple.webp",
    "Siddhivinayak Mandir.webp",
    "Sambhavnath Jain Mandir.webp"
  ];
  let malls = [
    "Atria Mall.webp",
    "Kohinoor Square.webp",
    "Smaash.webp",
    "IKEA.webp",
    "Palladium Mall.webp"
  ];
  let schools = [
    "Bombay Scottish School.webp",
    "Sacred Heart High School.webp",
    "D.Y.Patil International School.webp",
    "Sasmira Institute.webp",
    "JBCN International School.webp",
    "Welingkar Institute of Management.webp",
    "Podar Ort International School.webp"
  ];
  let others = [
    "Gallops Restaurant.webp",
    "Nehru Science Center.webp"
  ];
  let sports = [
    "Mahalaxmi Race Course.webp",
    "Shivaji Park.webp",
    "NSCI.webp",
    "WIllingdon Sports Club.webp"
  ];
  let hospitality = [
    "Four Seasons.webp",
    "ITC Grand Central.webp",
    "St. Regis.webp"
  ];
  const isDay = writable();
  isAmenitiesMinimized.set(false);
  $$payload.out += `<button type="button" id="daynighmodetw" class="day-night-toggle" aria-label="Toggle day/night mode" style="position: fixed; top: 3rem; right: 2rem; cursor: pointer; z-index: 1000001; background: white; padding: .4rem; border-radius: 50%; border: none;"><!--[-->`;
  if (store_get($$store_subs ??= {}, "$isDay", isDay)) {
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-sun" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-moon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</button> <div class="left-panel-wrapper"><div class="left-panel p-2"><div class="left-panel--header flex justify-between gap-[5rem]"><div class="left-title flex items-center font-bold"><svg class="mr-2" width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.90798 13.3021C8.90798 10.1749 8.89311 7.0624 8.90798 3.93517C8.92285 2.07654 10.2613 0.527682 12.031 0.262163C13.9196 -0.0328582 15.6596 0.984965 16.2395 2.74034C16.3436 3.06486 16.418 3.40414 16.4477 3.74341C16.5072 4.46621 16.0462 5.02675 15.377 5.11526C14.7375 5.18901 14.2022 4.73173 14.0832 3.99418C13.9345 3.03536 13.414 2.53382 12.5961 2.57808C11.7633 2.62233 11.2874 3.21237 11.2874 4.21544C11.2874 4.76123 11.2725 5.29227 11.2874 5.83806C11.3171 6.47236 11.0197 7.28366 11.4064 7.68194C11.8079 8.09497 12.6258 7.8147 13.2653 7.8147C15.9124 7.82945 18.5743 7.8147 21.2214 7.82945C21.6973 7.82945 21.8758 7.72619 21.8609 7.22466C21.8312 6.11833 21.8312 5.012 21.8609 3.90567C21.9055 1.88478 23.4373 0.321167 25.4598 0.203159C27.4228 0.0999013 29.1033 1.4865 29.3858 3.47789C29.5048 4.33345 29.1033 4.9825 28.3894 5.10051C27.8392 5.18901 27.051 4.70223 27.0064 3.87617C26.9618 3.00586 26.3223 2.50432 25.5341 2.56333C24.7311 2.62233 24.2403 3.21237 24.2403 4.15644C24.2403 10.2781 24.2403 16.3998 24.2403 22.5067C24.2403 22.728 24.2552 22.9493 24.2255 23.1705C24.166 23.8196 23.6901 24.2769 23.0655 24.2916C22.4558 24.3064 21.9501 23.8491 21.8609 23.2148C21.846 23.0968 21.846 22.964 21.846 22.846C21.8312 21.6364 21.8312 21.6364 20.582 21.6364C17.7564 21.6364 14.9309 21.6512 12.1053 21.6217C11.4807 21.6217 11.1684 21.7249 11.2874 22.4182C11.332 22.6543 11.3023 22.905 11.2874 23.1558C11.2428 23.8048 10.7669 24.2769 10.1423 24.2916C9.50283 24.3064 8.96746 23.8343 8.92285 23.1558C8.89311 22.5658 8.90798 21.9757 8.90798 21.3857C8.90798 18.7157 8.90798 16.0015 8.90798 13.3021ZM16.6113 13.8184C18.1431 13.8184 19.6748 13.8036 21.2214 13.8331C21.7568 13.8479 21.9055 13.6709 21.8758 13.1693C21.8312 12.358 21.8609 11.5467 21.8758 10.7354C21.8907 10.3814 21.8014 10.2044 21.385 10.2044C18.1877 10.2191 15.0052 10.2191 11.8079 10.2044C11.4064 10.2044 11.3023 10.3519 11.3023 10.7207C11.3171 11.5615 11.332 12.3875 11.3023 13.2283C11.2725 13.7299 11.4807 13.8479 11.9417 13.8331C13.4883 13.8036 15.0498 13.8184 16.6113 13.8184ZM16.6113 19.3058C18.1728 19.3058 19.7343 19.291 21.2958 19.3205C21.7568 19.3353 21.8907 19.1878 21.8758 18.7452C21.846 18.0519 21.8609 17.3734 21.8758 16.6801C21.8758 16.3556 21.8163 16.1933 21.4296 16.1933C18.2174 16.208 14.9904 16.208 11.7781 16.1933C11.4212 16.1933 11.3023 16.3113 11.3171 16.6653C11.332 17.3586 11.3617 18.0372 11.3171 18.7305C11.2874 19.2468 11.4956 19.3353 11.9566 19.3353C13.4883 19.291 15.0498 19.3058 16.6113 19.3058Z" fill="#5A4DE3"></path><path d="M25.8935 31.0057C24.6808 31.0057 23.661 30.5336 22.8204 29.6043C22.4483 29.206 22.1038 28.7635 21.5664 28.6013C20.6568 28.3357 19.954 28.7193 19.3615 29.4421C18.5208 30.4451 17.4873 30.9909 16.2195 31.0057C14.9792 31.0204 13.9594 30.5041 13.0913 29.5748C11.7683 28.144 10.9001 28.144 9.59098 29.5601C7.77193 31.522 5.20873 31.5367 3.40347 29.5748C2.87981 28.9995 2.32858 28.5423 1.5293 28.4832C0.867833 28.439 0.481975 27.849 0.550878 27.2147C0.619782 26.5656 1.08832 26.1378 1.74979 26.1673C2.93493 26.2116 3.92714 26.7131 4.74019 27.6129C5.15361 28.0702 5.55325 28.5275 6.21472 28.616C7.09668 28.734 7.68925 28.2472 8.24048 27.6129C9.27402 26.4329 10.5556 25.9756 12.0439 26.2263C12.981 26.3886 13.7665 26.8754 14.4142 27.5982C14.8414 28.0702 15.2686 28.5423 15.9576 28.616C16.8258 28.7045 17.377 28.2177 17.9145 27.6129C19.1685 26.2263 20.6706 25.8281 22.3794 26.3886C23.096 26.6246 23.661 27.1114 24.1847 27.6867C25.3836 28.9995 26.3345 28.9995 27.5334 27.6719C28.3464 26.7574 29.3249 26.2263 30.4962 26.1526C31.2128 26.1083 31.7089 26.5214 31.7778 27.1852C31.8467 27.8785 31.4609 28.4242 30.758 28.4832C30.0139 28.5423 29.4764 28.9405 28.9941 29.5011C28.1673 30.4894 27.1337 30.9909 25.8935 31.0057Z" fill="#5A4DE3"></path></svg> Vicinities</div> <button class="ghost-btn close-btn !px-0 !py-0" id="minimize-toggle-vicinity"><!--[-->`;
  if (!store_get($$store_subs ??= {}, "$isAmenitiesMinimized", isAmenitiesMinimized)) {
    $$payload.out += `<img${attr("src", minimizeBtn, false)} alt="minimize">`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (store_get($$store_subs ??= {}, "$isAmenitiesMinimized", isAmenitiesMinimized)) {
    $$payload.out += `<img${attr("src", maximizeBtn, false)} alt="maximize">`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</button></div> <div${attr("class", !store_get($$store_subs ??= {}, "$isAmenitiesMinimized", isAmenitiesMinimized) ? "block" : "hidden", false)} isInteriorUnitDataMinimized=""><div class="no-hovers pt-3"><div class="inner-btn-group"><!--[-->`;
  Root($$payload, {
    class: "w-full sm:max-w-full",
    multiple: true,
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Accordion_item($$payload2, {
        class: "hidden",
        value: "item-1wqweqweqweqwe",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "station-level-ss",
            class: "hidden",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `asdasdasd`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-11234",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "station-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Connectivity`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="acharya-atre-metro-station"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[0]) >= 0 ? "active" : "inactive"}`, false)}>Acharya Atre Metro Station - 700 M (4 Mins)</button> <button id="mthl"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[1]) >= 0 ? "active" : "inactive"}`, false)}>MTHL - 2.6 KM (8 Mins)</button> <button id="bandra-worli-sea-link"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[2]) >= 0 ? "active" : "inactive"}`, false)}>Bandra Worli Sea Link - 9.5 KM (26 Mins)</button> <button id="one-international"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[3]) >= 0 ? "active" : "inactive"}`, false)}>One International Centre - 2.3 KM (11 Mins)</button> <button id="bkc"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[4]) >= 0 ? "active" : "inactive"}`, false)}>BKC - 13 KM (26 Mins)</button> <button id="peninsula-business-park"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[5]) >= 0 ? "active" : "inactive"}`, false)}>Peninsula Business Park - 900 M (3 Mins)</button> <button id="coastal-road"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[6]) >= 0 ? "active" : "inactive"}`, false)}>Coastal Road - 2.3 KM (Near Copper chimney/ NSCI) (13 Mins)</button> <button id="peninsula-corporate-park"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[7]) >= 0 ? "active" : "inactive"}`, false)}>Peninsula Corporate Park - 900 M (3 Mins)</button> <button id="csmt"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[8]) >= 0 ? "active" : "inactive"}`, false)}>CSMT International Airport - 14.8 KM (58 Mins)</button> <button id="worli-sewri-corridor"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[9]) >= 0 ? "active" : "inactive"}`, false)}>Worli Sewri Corridor - 2.6 KM (8 Mins)</button> <button id="kamala-mills"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(vicinities[10]) >= 0 ? "active" : "inactive"}`, false)}>Kamala Mills - 1.1 KM (8 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-shopping",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "shopping-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Shopping Malls`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="atria-mall"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(malls[0]) >= 0 ? "active" : "inactive"}`, false)}>Atria Mall - 1.5 KM (9 Mins)</button> <button id="kohinoor-square"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(malls[1]) >= 0 ? "active" : "inactive"}`, false)}>Kohinoor Square - 4.4 KM (21 Mins)</button> <button id="smaash"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(malls[2]) >= 0 ? "active" : "inactive"}`, false)}>Smaash - 2.2 KM (13 Mins)</button> <button id="ikea"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(malls[3]) >= 0 ? "active" : "inactive"}`, false)}>IKEA - 2.1 KM (12 Mins)</button> <button id="palladium-mall"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).search(malls[4]) >= 0 ? "active" : "inactive"}`, false)}>Palladium Mall - 1.5 KM (7 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-2",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "ground-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Education Institutes`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="bombay-scottish-school"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[0]) ? "active" : "inactive"}`, false)}>Bombay Scottish School - 5.7 KM (22 Mins)</button> <button id="sacred-heart-high-school"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[1]) ? "active" : "inactive"}`, false)}>Sacred Heart High School - 2.7 KM (11 Mins)</button> <button id="dy-patil-international-school"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[2]) ? "active" : "inactive"}`, false)}>D.Y. Patil International School - 3.3 KM (13 Mins)</button> <button id="sasmira-institute"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[3]) ? "active" : "inactive"}`, false)}>Sasmira Institute - 2.1 KM (9 Mins)</button> <button id="jbcn-international-school"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[4]) ? "active" : "inactive"}`, false)}>JBCN International School - 3.2 KM (14 Mins)</button> <button id="welingkar-institute"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[5]) ? "active" : "inactive"}`, false)}>Welingkar Institute of Management - 5.7 KM (25 Mins)</button> <button id="podar-ort-international-school"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(schools[6]) ? "active" : "inactive"}`, false)}>Podar Ort International School - 3.5 KM (14 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-3",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "temple-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Temples`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="akshat-sayyam-jain-temple"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(temples[0]) ? "active" : "inactive"}`, false)}>Akshat Sayyam Jain Temple - 1.3 KM (5 Mins)</button> <button id="shree-panchbalayati-jain-mandir"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(temples[1]) ? "active" : "inactive"}`, false)}>Shree Panchbalayati Jain Mandir - 400 M (2 Mins)</button> <button id="mahalaxmi-temple"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(temples[2]) ? "active" : "inactive"}`, false)}>Mahalaxmi Temple - 4.5 KM (22 Mins)</button> <button id="siddhivinayak-mandir"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(temples[3]) ? "active" : "inactive"}`, false)}>Siddhivinayak Mandir - 4.2 KM (18 Mins)</button> <button id="sambhavnath-jain-mandir"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(temples[4]) ? "active" : "inactive"}`, false)}>Sambhavnath Jain Mandir - 1.2 KM (5 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-4",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "hospital-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Hospitals`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="breach-candy-hospital"${attr("class", `inner-modal-btn ${hospitals[0].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Breach Candy Hospital - 5.8 KM (19 Mins)</button> <button id="tata-memorial-hospital"${attr("class", `inner-modal-btn ${hospitals[1].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>TATA Memorial Hospital - 2.9 KM (15 Mins)</button> <button id="jaslok-hospital"${attr("class", `inner-modal-btn ${hospitals[2].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Jaslok Hospital - 3.9 KM (15 Mins)</button> <button id="wockhardt-hospital"${attr("class", `inner-modal-btn ${hospitals[3].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Wockhardt Hospital - 3.5 KM (15 Mins)</button> <button id="pd-hinduja-hospital"${attr("class", `inner-modal-btn ${hospitals[4].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>P.D.Hinduja Hospital - 5.7 KM (22 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-hospitality",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "hospitality-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Hospitality`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="four-seasons"${attr("class", `inner-modal-btn ${hospitality[0].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Four Seasons - 1.1 KM (6 Mins)</button> <button id="itc-grand-central"${attr("class", `inner-modal-btn ${hospitality[1].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>ITC Grand Central - 2.0 KM (16 Mins)</button> <button id="st-regis"${attr("class", `inner-modal-btn ${hospitality[2].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>St. Regis - 700 M (4 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-sports",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "sports-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Sports Facilities`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="mahalaxmi-race-course"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(sports[0]) ? "active" : "inactive"}`, false)}>Mahalaxmi Race Course - 2.6 KM (14 Mins)</button> <button id="shivaji-park"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(sports[1]) ? "active" : "inactive"}`, false)}>Shivaji Park - 5.3 KM (19 Mins)</button> <button id="nsci"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(sports[2]) ? "active" : "inactive"}`, false)}>NSCI - 2.5 KM (15 Mins)</button> <button id="willingdon-sports-club"${attr("class", `inner-modal-btn ${store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg).includes(sports[3]) ? "active" : "inactive"}`, false)}>Willingdon Sports Club - 3.9 KM (18 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_item($$payload2, {
        value: "item-others",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Accordion_trigger($$payload3, {
            id: "others-level",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `Others`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Accordion_content($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button id="gallops-restaurant"${attr("class", `inner-modal-btn ${others[0].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Gallops Restaurant - 2.9 KM (15 Mins)</button> <button id="nehru-science-center"${attr("class", `inner-modal-btn ${others[1].includes(store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg)) ? "active" : "inactive"}`, false)}>Nehru Science Center - 900 M (5 Mins)</button>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]--></div></div></div></div></div> <div${attr("class", "d-block visible absolute bottom-0 left-0 right-0 top-0", false)}><div${attr("class", `cloudimage-360  vicinity-box z-50 ${store_get($$store_subs ??= {}, "$isDay", isDay) || store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg) != "-" ? "invisible !absolute" : "visible !absolute"}`, false)} data-folder="https://assets.vestate.io/narang-kane/vicinities/day/"${attr("data-filename", `${stringify("daylight{")}index${stringify("}")}.webp`, false)} data-amount="24" data-keys="false" data-filters="blur:20" data-drag-speed="400" data-request-responsive-images="true" data-info="false" data-ratio="1"></div> <div${attr("class", `cloudimage-360  vicinity-box z-50 ${!store_get($$store_subs ??= {}, "$isDay", isDay) || store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg) != "-" ? "invisible" : "visible  !absolute "}`, false)} data-folder="https://assets.vestate.io/narang-kane/vicinities/night/"${attr("data-filename", `${stringify("night{")}index${stringify("}")}.webp`, false)} data-amount="24" data-keys="false" data-filters="blur:20" data-drag-speed="400" data-request-responsive-images="true" data-info="false" data-ratio="1"></div> <!--[-->`;
  if (store_get($$store_subs ??= {}, "$currentUI", currentUI).vicinityImg != "-") {
    $$payload.out += `<img${attr("src", "https://assets.vestate.io/narang-kane/vicinities/" + store_get($$store_subs ??= {}, "$vicinityImg", vicinityImg), false)} alt="Vicinity" class="absolute top-0 h-full w-full">`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
