window.__ModuleLoader__.load({id:'dsh-codex-model-selector',factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);

// src/model-picker-service.tsx
var import_react3 = require("react");

// src/SettingsModelPicker.tsx
var import_react2 = require("react");
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");

// src/ModelSelect.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");

// node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = getAlignment(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

// node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = getWindow(domElement);
    const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
  const scroll = getNodeScroll(html);
  const body = html.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = "viewport";
  }
  const isLayoutViewport = rootBoundary === "layoutViewport";
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft;
        y = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let lastKeptComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        return refresh();
      }
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  const win = getWindow(element);
  const handleResize = () => refresh(ancestorResize);
  win.addEventListener("resize", handleResize);
  refresh(true);
  return () => {
    win.removeEventListener("resize", handleResize);
    cleanup();
  };
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update);
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// src/ModelSelect.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/ModelSelect.module.css
var ModelSelect_default = { "menu": "codex-selector_menu", "providerCaption": "codex-selector_providerCaption", "root": "codex-selector_root", "chevron": "codex-selector_chevron", "retry": "codex-selector_retry", "search": "codex-selector_search", "modelName": "codex-selector_modelName", "cardHeading": "codex-selector_cardHeading", "modelCaption": "codex-selector_modelCaption", "cellLabel": "codex-selector_cellLabel", "cellValue": "codex-selector_cellValue", "effortCaption": "codex-selector_effortCaption", "selected": "codex-selector_selected", "modelHeading": "codex-selector_modelHeading", "triggerEffort": "codex-selector_triggerEffort", "error": "codex-selector_error", "groups": "codex-selector_groups", "group": "codex-selector_group", "optionCopy": "codex-selector_optionCopy", "effortFill": "codex-selector_effortFill", "status": "codex-selector_status", "empty": "codex-selector_empty", "cellChevron": "codex-selector_cellChevron", "triggerFast": "codex-selector_triggerFast", "floating": "codex-selector_floating", "effortCard": "codex-selector_effortCard", "trigger": "codex-selector_trigger", "settingsPicker": "codex-selector_settingsPicker", "cell": "codex-selector_cell", "chevronOpen": "codex-selector_chevronOpen", "effortTrack": "codex-selector_effortTrack", "triggerLabel": "codex-selector_triggerLabel", "option": "codex-selector_option", "energyIcon": "codex-selector_energyIcon", "fastButton": "codex-selector_fastButton", "resetEffort": "codex-selector_resetEffort", "embedded": "codex-selector_embedded", "warning": "codex-selector_warning", "effortStops": "codex-selector_effortStops", "check": "codex-selector_check", "dialog": "codex-selector_dialog", "dialogContent": "codex-selector_dialogContent", "groupTitle": "codex-selector_groupTitle" };
var cssText = '.codex-selector_root {\n  min-width: 0;\n  position: relative;\n}\n\n.codex-selector_settingsPicker .codex-selector_menu {\n  max-height: min(360px, 45vh);\n  inset: calc(100% + 8px) auto auto 0;\n}\n\n.codex-selector_settingsPicker .codex-selector_trigger {\n  max-width: 100%;\n}\n\n.codex-selector_trigger {\n  background: var(--dsw-alias-interactive-bg-hover);\n  min-width: 0;\n  max-width: min(360px, 45cqw);\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  border: none;\n  border-radius: 24px;\n  outline: none;\n  align-items: center;\n  gap: 4px;\n  padding: 0 4px 0 8px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n  display: flex;\n}\n\n.codex-selector_trigger:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-active);\n}\n\n.codex-selector_trigger:focus-visible {\n  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.codex-selector_trigger:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.codex-selector_triggerLabel {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  overflow: hidden;\n}\n\n.codex-selector_triggerFast {\n  color: var(--dsw-alias-label-primary);\n  flex: none;\n}\n\n.codex-selector_triggerEffort {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n}\n\n.codex-selector_chevron {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n  transition: transform .12s;\n}\n\n.codex-selector_chevronOpen {\n  transform: rotate(180deg);\n}\n\n.codex-selector_menu {\n  z-index: 20;\n  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);\n  width: max-content;\n  min-width: min(240px, 100vw - 32px);\n  max-width: min(420px, 100vw - 32px);\n  max-height: min(360px, 100vh - 96px);\n  box-shadow: var(--dsw-elevation-prominent);\n  color: var(--dsw-alias-label-primary);\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n  border: 0;\n  border-radius: 18px;\n  flex-direction: column;\n  padding: 4px;\n  display: flex;\n  position: absolute;\n  bottom: calc(100% + 8px);\n  right: 0;\n  overflow: hidden;\n}\n\n.codex-selector_status, .codex-selector_empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 10px;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.codex-selector_error, .codex-selector_warning {\n  background: var(--dsw-alias-interactive-bg-hover-danger);\n  color: var(--dsw-alias-state-error-primary);\n  border-radius: 8px;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 4px;\n  padding: 7px 8px;\n  font-size: 12px;\n  line-height: 18px;\n  display: flex;\n}\n\n.codex-selector_warning {\n  background: var(--dsw-alias-bg-module-platform);\n  color: var(--dsw-alias-state-warn-label);\n}\n\n.codex-selector_retry {\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n  background: none;\n  border: none;\n  flex: none;\n  padding: 0;\n  font-weight: 600;\n}\n\n.codex-selector_search {\n  box-sizing: border-box;\n  border: .5px solid var(--dsw-alias-border-l4);\n  background: var(--dsw-alias-bg-layer-1);\n  width: 100%;\n  min-height: 32px;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  border-radius: 8px;\n  outline: none;\n  margin: 2px 0 4px;\n  padding: 5px 8px;\n}\n\n.codex-selector_search::placeholder {\n  color: var(--dsw-alias-label-dimmed);\n}\n\n.codex-selector_search:focus-visible {\n  border-color: var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_groups {\n  min-height: 0;\n  overflow-y: auto;\n}\n\n.codex-selector_group + .codex-selector_group {\n  margin-top: 4px;\n}\n\n.codex-selector_groupTitle {\n  z-index: 1;\n  background: var(--dsw-specific-menu);\n  color: var(--dsw-alias-label-tertiary);\n  padding: 5px 8px 3px;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 18px;\n  position: sticky;\n  top: 0;\n}\n\n.codex-selector_option {\n  box-sizing: border-box;\n  width: auto;\n  min-width: 100%;\n  min-height: 38px;\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 10px;\n  outline: none;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  display: flex;\n}\n\n.codex-selector_option:hover:not(:disabled), .codex-selector_option:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_selected {\n  background: none;\n}\n\n.codex-selector_option:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.codex-selector_optionCopy {\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n  display: flex;\n}\n\n.codex-selector_modelName {\n  color: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.codex-selector_check {\n  color: var(--dsw-alias-label-primary);\n  flex: 0 0 18px;\n  place-items: center;\n  display: grid;\n}\n\n.codex-selector_cell {\n  box-sizing: border-box;\n  width: auto;\n  min-width: 100%;\n  height: 40px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  text-align: left;\n  background: none;\n  border: none;\n  border-radius: 10px;\n  align-items: center;\n  gap: 8px;\n  padding: 0 10px;\n  font-size: 14px;\n  line-height: 22px;\n  display: flex;\n}\n\n.codex-selector_cell:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_cellLabel {\n  white-space: nowrap;\n  flex: none;\n}\n\n.codex-selector_cellValue {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  text-align: right;\n  min-width: 0;\n  color: var(--dsw-alias-label-tertiary);\n  flex: auto;\n  overflow: hidden;\n}\n\n.codex-selector_cellChevron {\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n}\n\n.codex-selector_effortCard {\n  width: 246px;\n  max-width: calc(100vw - 48px);\n  padding: 7px 8px 10px;\n}\n\n.codex-selector_cardHeading {\n  grid-template-columns: 24px 1fr 24px;\n  align-items: center;\n  min-height: 22px;\n  display: grid;\n}\n\n.codex-selector_energyIcon {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 23px;\n  line-height: 1;\n}\n\n.codex-selector_modelHeading, .codex-selector_effortCaption, .codex-selector_modelCaption, .codex-selector_resetEffort {\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  font: inherit;\n  background: none;\n  border: none;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  padding: 2px;\n  display: flex;\n}\n\n.codex-selector_effortCaption {\n  color: var(--dsw-alias-brand-primary);\n  font-size: 12px;\n}\n\n.codex-selector_modelCaption {\n  width: 100%;\n  margin: 2px 0 0;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.codex-selector_providerCaption {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 100%;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 16px;\n  overflow: hidden;\n}\n\n.codex-selector_resetEffort {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 20px;\n}\n\n.codex-selector_resetEffort:disabled {\n  opacity: .4;\n  cursor: default;\n}\n\n.codex-selector_effortTrack {\n  background: var(--dsw-alias-interactive-bg-hover);\n  border-radius: 20px;\n  height: 24px;\n  margin: 0 3px;\n  position: relative;\n}\n\n.codex-selector_effortFill {\n  border-radius: inherit;\n  background: var(--dsw-alias-brand-primary);\n  position: absolute;\n  inset: 0 auto 0 0;\n}\n\n.codex-selector_effortStops {\n  pointer-events: none;\n  justify-content: space-between;\n  align-items: center;\n  display: flex;\n  position: absolute;\n  inset: 0 12px;\n}\n\n.codex-selector_effortStops span {\n  background: var(--dsw-alias-label-tertiary);\n  opacity: .7;\n  border-radius: 50%;\n  width: 4px;\n  height: 4px;\n}\n\n.codex-selector_effortTrack input {\n  appearance: none;\n  cursor: pointer;\n  background: none;\n  width: 100%;\n  height: 24px;\n  margin: 0;\n  position: absolute;\n  inset: 0;\n}\n\n.codex-selector_effortTrack input::-webkit-slider-thumb {\n  appearance: none;\n  background: var(--dsw-alias-label-primary);\n  width: 28px;\n  height: 28px;\n  box-shadow: var(--dsw-elevation-prominent);\n  border-radius: 50%;\n}\n\n.codex-selector_effortTrack input::-moz-range-thumb {\n  background: var(--dsw-alias-label-primary);\n  border: none;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n}\n\n.codex-selector_effortTrack input:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 4px;\n  border-radius: 20px;\n}\n\n.codex-selector_effortTrack input:disabled {\n  cursor: default;\n  opacity: .6;\n}\n\n.codex-selector_fastButton {\n  width: 24px;\n  height: 24px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: none;\n  border: none;\n  place-items: center;\n  padding: 0;\n  display: grid;\n}\n\n.codex-selector_fastButton[aria-pressed="true"] {\n  color: var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_fastButton:disabled {\n  opacity: .35;\n  cursor: default;\n}\n\n.codex-selector_modelHeading {\n  border-radius: 6px;\n  flex-direction: column;\n  justify-self: center;\n  gap: 0;\n  width: fit-content;\n  min-width: 0;\n  max-width: 100%;\n  min-height: 44px;\n  padding: 2px 6px;\n}\n\n.codex-selector_modelHeading:hover:not(:disabled), .codex-selector_modelHeading:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_modelHeading:active:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-active);\n}\n\n.codex-selector_modelHeading:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_cardHeading {\n  margin-bottom: 12px;\n}\n\n.codex-selector_embedded .codex-selector_menu {\n  width: 100%;\n  min-width: 0;\n  max-width: 100%;\n  max-height: min(360px, 45vh);\n  margin-top: 8px;\n  position: relative;\n  inset: auto;\n}\n\n.codex-selector_embedded .codex-selector_trigger {\n  max-width: 100%;\n}\n\n.codex-selector_dialog {\n  width: min(560px, 100%);\n  min-height: 0;\n}\n\n.codex-selector_dialogContent {\n  min-height: 0;\n  overflow: hidden;\n}\n\n.codex-selector_dialog .codex-selector_groups {\n  max-height: min(420px, 50vh);\n  overflow-y: auto;\n}\n\n.codex-selector_dialog .codex-selector_search {\n  width: 100%;\n  margin: 0 0 8px;\n}\n\n.codex-selector_root[data-menu-side="below"] .codex-selector_menu {\n  top: calc(100% + 8px);\n  bottom: auto;\n}\n\n.codex-selector_root[data-menu-side="above"] .codex-selector_menu {\n  top: auto;\n  bottom: calc(100% + 8px);\n}\n\n.codex-selector_embedded[data-menu-side] .codex-selector_menu {\n  top: auto;\n  bottom: auto;\n}\n\n.codex-selector_floating {\n  z-index: 1000;\n  position: fixed;\n  bottom: auto;\n  right: auto;\n}\n';

// src/recent-models.ts
var WINDOW = 30 * 24 * 60 * 60 * 1e3;
var KEY = "dsh-codex-model-selector.choices.v1";
var routeKey = (route) => JSON.stringify([route.provider, route.model]);
function rankRecent(records, now) {
  const map = /* @__PURE__ */ new Map();
  for (const row of records) {
    if (row.time < now - WINDOW || row.time > now) continue;
    const key = routeKey(row), previous = map.get(key);
    map.set(key, { ...row, count: row.count + (previous?.count ?? 0), time: Math.max(row.time, previous?.time ?? 0) });
  }
  return [...map.values()].sort((a, b) => b.count - a.count || b.time - a.time || routeKey(a).localeCompare(routeKey(b)));
}
function parseRows(value, usage) {
  if (!Array.isArray(value)) throw new Error("invalid model usage records");
  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const row = entry;
    if (typeof row.provider !== "string" || !row.provider || typeof row.model !== "string" || !row.model || typeof row.time !== "number" || !Number.isFinite(row.time)) return [];
    if (usage && row.purpose && row.purpose !== "assistant") return [];
    const count = usage ? 1 : row.count;
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 1) return [];
    return [{ provider: row.provider, model: row.model, time: row.time, count }];
  });
}
var RecentModels = class {
  constructor(storage, request = (...args) => fetch(...args), now = Date.now) {
    this.storage = storage;
    this.request = request;
    this.now = now;
    try {
      this.choices = parseRows(JSON.parse(storage?.getItem(KEY) ?? "[]"), false);
    } catch {
    }
    this.publish(false, false);
  }
  choices = [];
  requests = [];
  listeners = /* @__PURE__ */ new Set();
  state = { routes: [], loading: false, unavailable: false };
  pending;
  abort = new AbortController();
  getSnapshot = () => this.state;
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  publish(loading, unavailable) {
    this.choices = this.choices.filter((row) => row.time >= this.now() - WINDOW && row.time <= this.now());
    this.state = { routes: rankRecent([...this.requests, ...this.choices], this.now()), loading, unavailable };
    for (const listener of this.listeners) listener();
  }
  /** 仅在会话选择成功后记录，编辑规则草稿和改推理档位不计数。 */
  recordChoice(route) {
    this.readChoices();
    this.choices.push({ provider: route.provider, model: route.model, count: 1, time: this.now() });
    this.publish(this.state.loading, this.state.unavailable);
    try {
      this.storage?.setItem(KEY, JSON.stringify(this.choices));
    } catch {
    }
  }
  /** 每次打开目录读取最新请求记录；并发打开共享同一次读取。 */
  refresh() {
    if (this.pending) return this.pending;
    this.readChoices();
    this.publish(true, false);
    this.pending = this.request("/usage/api", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "list" }), signal: this.abort.signal }).then(async (response) => {
      if (!response.ok) throw new Error("usage unavailable");
      const body = await response.json();
      if (body?.ok !== true) throw new Error("usage unavailable");
      this.requests = parseRows(body.records, true);
      this.publish(false, false);
    }).catch(() => {
      if (!this.abort.signal.aborted) this.publish(false, true);
    }).finally(() => {
      this.pending = void 0;
    });
    return this.pending;
  }
  readChoices() {
    try {
      const saved = this.storage?.getItem(KEY);
      if (saved !== void 0 && saved !== null) this.choices = parseRows(JSON.parse(saved), false);
    } catch {
    }
  }
  dispose() {
    this.abort.abort();
    this.listeners.clear();
  }
};

// src/recent-locales.ts
var recentLocales = {
  zh: { title: "\u9009\u62E9\u8865\u9F50\u6A21\u578B", close: "\u5173\u95ED", search: "\u641C\u7D22\u63D0\u4F9B\u5546\u6216\u6A21\u578B", frequent: "\u5E38\u7528\u6A21\u578B", more: "\u66F4\u591A\u6A21\u578B", back: "\u8FD4\u56DE\u5E38\u7528\u6A21\u578B", empty: "\u6682\u65E0\u6700\u8FD1\u4F7F\u7528\u8BB0\u5F55\uFF0C\u8BF7\u4ECE\u66F4\u591A\u6A21\u578B\u4E2D\u9009\u62E9\u3002", unavailable: "\u8BF7\u6C42\u7528\u91CF\u5237\u65B0\u5931\u8D25\uFF0C\u6682\u7528\u5DF2\u6709\u8BB0\u5F55\u6392\u5E8F\u3002", loading: "\u6B63\u5728\u8BFB\u53D6\u6700\u8FD1\u4F7F\u7528\u8BB0\u5F55\u2026" },
  en: { title: "Choose completion model", close: "Close", search: "Search providers or models", frequent: "Frequent models", more: "More models", back: "Back to frequent models", empty: "No recent usage. Choose from more models.", unavailable: "Usage refresh failed. Ranking existing records.", loading: "Loading recent usage\u2026" }
};

// src/ModelSelect.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var EMPTY_RECENTS = { routes: [], loading: false, unavailable: false };
var noSubscribe = () => () => {
};
var emptyRecents = () => EMPTY_RECENTS;
function ModelSelect({ locked, available, directory, load, select, t, loadSpeed, setSpeed, pickerOnly = false, embedded = false, dialog = false, onOpenChange, recents, recentText = (key) => recentLocales.zh[key] }) {
  const recentState = (0, import_react.useSyncExternalStore)(recents?.subscribe ?? noSubscribe, recents?.getSnapshot ?? emptyRecents);
  const state = (0, import_react.useSyncExternalStore)(
    (fn) => directory.subscribe(fn),
    () => directory.getSnapshot()
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const [menuSide, setMenuSide] = (0, import_react.useState)("above");
  const [menuHeight, setMenuHeight] = (0, import_react.useState)(360);
  (0, import_react.useEffect)(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);
  const dragging = (0, import_react.useRef)(false);
  const [effortDraft, setEffortDraft] = (0, import_react.useState)(null);
  const [pane, setPane] = (0, import_react.useState)("root");
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [speed, updateSpeed] = (0, import_react.useState)(null);
  const [speedBusy, setSpeedBusy] = (0, import_react.useState)(false);
  const speedRef = (0, import_react.useRef)(loadSpeed);
  speedRef.current = loadSpeed;
  (0, import_react.useEffect)(() => {
    if (speedRef.current === void 0) return;
    let cancelled = false;
    updateSpeed(null);
    void speedRef.current().then((value) => {
      if (!cancelled) updateSpeed(value);
    }, () => {
      if (!cancelled) updateSpeed(null);
    });
    return () => {
      cancelled = true;
    };
  }, [open, state.current?.provider, state.current?.model]);
  const lastActionRef = (0, import_react.useRef)("load");
  const [toast, setToast] = (0, import_react.useState)(null);
  const toastSeq = (0, import_react.useRef)(0);
  const rootRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  const floating = !dialog && !embedded;
  const [position, setPosition] = (0, import_react.useState)(null);
  (0, import_react.useLayoutEffect)(() => {
    const anchor = triggerRef.current, panel = menuRef.current;
    if (!available || !open || !floating || !anchor || !panel) {
      setPosition(null);
      return;
    }
    let active = true, revision = 0;
    const update = () => {
      const rect = anchor.getBoundingClientRect();
      const above = rect.top - 24, below = window.innerHeight - rect.bottom - 24;
      const side = below > above ? "below" : "above";
      setMenuSide(side);
      setMenuHeight(Math.max(0, Math.min(360, Math.max(above, below))));
      const request = ++revision;
      void computePosition2(anchor, panel, {
        strategy: "fixed",
        placement: side === "above" ? "top-end" : "bottom-end",
        middleware: [offset2(8), shift2({ padding: 16, crossAxis: true })]
      }).then(({ x, y }) => {
        if (active && request === revision) setPosition({ left: x, top: y });
      });
    };
    const cleanup = autoUpdate(anchor, panel, update, {
      elementResize: typeof ResizeObserver !== "undefined",
      layoutShift: typeof IntersectionObserver !== "undefined",
      animationFrame: false
    });
    return () => {
      active = false;
      cleanup();
    };
  }, [open, floating, available]);
  const modelSearchRef = (0, import_react.useRef)(null);
  const itemRefs = (0, import_react.useRef)([]);
  const id = (0, import_react.useId)();
  const choices = (0, import_react.useMemo)(() => state.groups.flatMap((group) => group.models.map((model) => ({
    group,
    model,
    selection: {
      provider: group.id,
      model: model.id,
      ...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
    }
  }))), [state.groups]);
  const selectedIndex = state.current === null ? -1 : choices.findIndex((c) => c.selection.provider === state.current?.provider && c.selection.model === state.current.model);
  const currentChoice = choices[selectedIndex];
  const recentChoices = (0, import_react.useMemo)(() => {
    const catalog = new Map(choices.map((choice) => [routeKey(choice.selection), choice]));
    return recentState.routes.flatMap((route) => {
      const choice = catalog.get(routeKey(route));
      return choice ? [choice] : [];
    }).slice(0, 6);
  }, [choices, recentState.routes]);
  const deferredSearchQuery = (0, import_react.useDeferredValue)(searchQuery.trim().toLocaleLowerCase());
  const filteredGroups = (0, import_react.useMemo)(() => {
    if (deferredSearchQuery === "") return state.groups;
    return state.groups.flatMap((group) => {
      const providerMatches = `${group.id} ${group.name}`.toLocaleLowerCase().includes(deferredSearchQuery);
      const models = providerMatches ? group.models : group.models.filter((model) => `${model.id} ${model.name}`.toLocaleLowerCase().includes(deferredSearchQuery));
      return models.length === 0 ? [] : [{ ...group, models }];
    });
  }, [deferredSearchQuery, state.groups]);
  const reasoning = currentChoice?.model.reasoning;
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
  const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
  const effortChoices = (0, import_react.useMemo)(() => reasoning === void 0 ? [] : [
    ...reasoning.defaultEffort === void 0 ? [{ key: "provider-default", effort: void 0, label: t("effort.providerDefault") }] : [],
    ...reasoning.efforts.map((effort) => ({
      key: `effort:${effort.id}`,
      effort: effort.id,
      label: effort.name
    }))
  ], [reasoning, t]);
  const busy = state.status === "selecting";
  const effortIndex = Math.max(0, effortChoices.findIndex((choice) => choice.effort === effectiveEffort));
  const previewEffortLabel = effortDraft === null ? effortLabel : effortChoices[effortDraft]?.label;
  const reload = () => {
    lastActionRef.current = "load";
    load();
  };
  (0, import_react.useLayoutEffect)(() => {
    if (!available || !open || dialog) return;
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) setOpen(false);
    };
    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const above = rect.top - 24;
      const below = window.innerHeight - rect.bottom - 24;
      setMenuSide(below > above ? "below" : "above");
      setMenuHeight(Math.max(0, Math.min(360, Math.max(above, below))));
    };
    if (!floating) {
      place();
      window.addEventListener("resize", place);
      window.addEventListener("scroll", place, true);
    }
    document.addEventListener("mousedown", closeOutside);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, dialog, floating, available]);
  const positioned = !floating || position !== null;
  (0, import_react.useEffect)(() => {
    if (!positioned) return;
    if (open && (pane === "model" || pane === "all")) modelSearchRef.current?.focus();
    if (open && !dialog && (pane === "root" || pane === "model" && recents !== void 0)) itemRefs.current[0]?.focus();
  }, [open, pane, positioned]);
  if (!available) return null;
  const show = () => {
    setPane(dialog ? "all" : pickerOnly ? "model" : "root");
    setSearchQuery("");
    setOpen(true);
    reload();
    void recents?.refresh();
  };
  const close = (restoreFocus = false) => {
    setOpen(false);
    setPane("root");
    if (restoreFocus) queueMicrotask(() => {
      triggerRef.current?.focus();
    });
  };
  const moveFocus = (offset3) => {
    const items = itemRefs.current.filter((item) => item !== null);
    if (items.length === 0) return;
    const active = items.findIndex((item) => item === document.activeElement);
    const next = (Math.max(active, 0) + offset3 + items.length) % items.length;
    items[next]?.focus();
  };
  const onRootKeyDown = (event) => {
    if (dialog && open && event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close(true);
      return;
    }
    if (event.target === modelSearchRef.current) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (pane === "all") setPane("model");
        else if (pickerOnly) close(true);
        else setPane("root");
      }
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      if (pane === "all") setPane("model");
      else if (pane !== "root" && !pickerOnly) setPane("root");
      else close(true);
      return;
    }
    if (!open) return;
    if (event.target.tagName === "INPUT") return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
    }
  };
  const onBlur = (event) => {
    if (dialog) return;
    if (event.relatedTarget === null || dragging.current) return;
    if (event.relatedTarget instanceof Node && (rootRef.current?.contains(event.relatedTarget) || menuRef.current?.contains(event.relatedTarget))) return;
    close();
  };
  const settleSelection = (accepted) => {
    if (accepted) {
      if (rootRef.current !== null) close(true);
      return;
    }
    const message = directory.getSnapshot().error;
    if (message !== null) {
      toastSeq.current += 1;
      setToast({ seq: toastSeq.current, text: t("error.action", { message }) });
    }
  };
  const choose = (selection) => {
    if (state.current?.provider === selection.provider && state.current.model === selection.model) {
      close(true);
      return;
    }
    lastActionRef.current = "select";
    void select(selection).then((accepted) => {
      if (accepted && !pickerOnly) recents?.recordChoice(selection);
      settleSelection(accepted);
    });
  };
  const chooseEffort = (effort, keepOpen = false) => {
    if (state.current === null) return;
    if (effectiveEffort === effort) {
      if (!keepOpen) close(true);
      return;
    }
    const selection = {
      provider: state.current.provider,
      model: state.current.model,
      ...effort === void 0 ? {} : { reasoningEffort: effort }
    };
    lastActionRef.current = "select";
    void select(selection).then((accepted) => {
      if (!accepted || !keepOpen) settleSelection(accepted);
    });
  };
  const waiting = state.current === null && state.status === "loading";
  const modelLabel = waiting ? t("trigger.loading") : currentChoice?.model.name ?? (state.current === null ? t("trigger.fallback") : `${state.current.provider}/${state.current.model}`);
  const providerLabel = state.groups.find((group) => group.id === state.current?.provider)?.name ?? state.current?.provider;
  const routeLabel = providerLabel === void 0 ? modelLabel : `${currentChoice?.model.name ?? state.current?.model} \xB7 ${providerLabel}`;
  const triggerLabel = effortLabel === void 0 ? routeLabel : `${routeLabel} \xB7 ${effortLabel}`;
  const triggerAria = waiting ? t("trigger.loading") : state.current === null ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });
  itemRefs.current = [];
  let itemIndex = 0;
  const itemRef = () => {
    const at = itemIndex++;
    return (node) => {
      itemRefs.current[at] = node;
    };
  };
  const Surface = dialog ? import_dsh_client_ui_primitives.Modal : import_dsh_client_ui_primitives.MenuSurface;
  const menu = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Surface,
    {
      ...dialog ? { open, onClose: () => close(true), title: recentText("title"), closeLabel: recentText("close"), contentClassName: ModelSelect_default.dialogContent } : { id: `${id}-menu`, role: "menu", ref: menuRef },
      className: dialog ? ModelSelect_default.dialog : clsx_default(ModelSelect_default.menu, floating && ModelSelect_default.floating),
      style: dialog ? void 0 : { maxHeight: menuHeight, ...floating ? position ?? { visibility: "hidden" } : {} },
      "aria-label": t("menu.aria"),
      "aria-busy": state.status === "loading" || busy,
      children: [
        pane === "root" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.effortCard, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.cardHeading, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.fastButton, disabled: !speed?.visible || speedBusy || locked, "aria-label": speed?.visible ? `\u5FEB\u901F\u6A21\u5F0F\uFF1A${speed.tier === "fast" ? "\u5DF2\u5F00\u542F" : "\u672A\u5F00\u542F"}` : "\u5F53\u524D\u6A21\u578B\u4E0D\u652F\u6301\u5FEB\u901F\u6A21\u5F0F", "aria-pressed": speed?.tier === "fast", title: speed?.visible ? "\u5FEB\u901F\u6A21\u5F0F\uFF08\u6D88\u8017\u66F4\u591A\u7528\u91CF\uFF09" : "\u5F53\u524D\u6A21\u578B\u4E0D\u652F\u6301\u5FEB\u901F\u6A21\u5F0F", onClick: () => {
              if (!speed?.visible || !setSpeed) return;
              setSpeedBusy(true);
              const tier = speed.tier === "fast" ? "standard" : "fast";
              void setSpeed(tier).then((accepted) => {
                if (accepted) updateSpeed({ visible: true, tier });
                else {
                  toastSeq.current += 1;
                  setToast({ seq: toastSeq.current, text: "\u5FEB\u901F\u6A21\u5F0F\u5207\u6362\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5" });
                }
              }).finally(() => setSpeedBusy(false));
            }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 2-9 12h7l-1 8 10-12h-7l0-8Z" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { ref: itemRef(), type: "button", role: "menuitem", "aria-label": `${t("menu.model")} ${modelLabel}`, className: ModelSelect_default.modelHeading, onClick: () => {
              setPane("model");
            }, children: [
              reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.effortCaption, children: [
                previewEffortLabel,
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutlineRegular, {})
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.modelCaption, children: [
                modelLabel,
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutlineRegular, {})
              ] }),
              providerLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.providerCaption, title: providerLabel, children: providerLabel })
            ] }),
            reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.resetEffort, "aria-label": t("effort.providerDefault"), title: t("effort.providerDefault"), disabled: busy || locked, onClick: () => {
              chooseEffort(reasoning.defaultEffort, true);
            }, children: "\u21BA" })
          ] }),
          reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.effortTrack, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.effortFill, style: { width: `${effortChoices.length <= 1 ? 0 : (effortDraft ?? effortIndex) / (effortChoices.length - 1) * 100}%` } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.effortStops, "aria-hidden": "true", children: effortChoices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, choice.key)) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "range",
                "aria-label": t("menu.effort"),
                "aria-valuetext": previewEffortLabel,
                min: 0,
                max: Math.max(0, effortChoices.length - 1),
                step: 1,
                value: effortDraft ?? effortIndex,
                disabled: busy || locked || effortChoices.length < 2,
                onPointerDown: (event) => {
                  dragging.current = true;
                  event.currentTarget.setPointerCapture?.(event.pointerId);
                },
                onPointerUp: (event) => {
                  if (!dragging.current) return;
                  dragging.current = false;
                  setEffortDraft(null);
                  chooseEffort(effortChoices[Number(event.currentTarget.value)]?.effort, true);
                },
                onPointerCancel: () => {
                  dragging.current = false;
                  setEffortDraft(null);
                },
                onChange: (event) => {
                  const index = Number(event.target.value);
                  if (dragging.current) setEffortDraft(index);
                  else chooseEffort(effortChoices[index]?.effort, true);
                }
              }
            )
          ] })
        ] }),
        pane === "model" && recents !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: clsx_default(ModelSelect_default.groups, "scrollable"), children: [
          recentState.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.status, children: recentText("loading") }),
          recentState.unavailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.status, role: "status", children: recentText("unavailable") }),
          recentChoices.map(({ group, model }) => {
            const selected = state.current?.provider === group.id && state.current?.model === model.id;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                ref: itemRef(),
                type: "button",
                role: "menuitemradio",
                "aria-checked": selected,
                className: clsx_default(ModelSelect_default.option, selected && ModelSelect_default.selected),
                title: `${model.name} \xB7 ${group.name}`,
                disabled: busy || locked,
                onClick: () => {
                  choose({ provider: group.id, model: model.id });
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.optionCopy, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.modelName, children: model.name }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.providerCaption, children: group.name })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.check, children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutlineRegular, {}) : null })
                ]
              },
              routeKey({ provider: group.id, model: model.id })
            );
          }),
          !recentState.loading && recentChoices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.empty, children: recentText("empty") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { ref: itemRef(), type: "button", role: "menuitem", className: ModelSelect_default.cell, onClick: () => {
            setSearchQuery("");
            setPane("all");
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.cellLabel, children: recentText("more") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutlineRegular, {})
          ] })
        ] }),
        (pane === "all" || pane === "model" && recents === void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          pane === "all" && !dialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.cell, onClick: () => {
            setPane("model");
          }, children: recentText("back") }),
          state.status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.status, children: t("status.loading") }),
          state.error !== null && lastActionRef.current === "load" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.error, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.retry, onClick: reload, children: t("retry") })
          ] }),
          state.failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.warning, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", { name: failure.name, message: failure.message }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.retry, onClick: reload, children: t("retry") })
          ] }, failure.id)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_dsh_client_ui_primitives.Input,
            {
              ref: modelSearchRef,
              "data-modal-autofocus": dialog || void 0,
              className: ModelSelect_default.search,
              type: "search",
              value: searchQuery,
              placeholder: recentText("search"),
              "aria-label": recentText("search"),
              disabled: busy,
              onChange: (event) => {
                setSearchQuery(event.currentTarget.value);
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: clsx_default(ModelSelect_default.groups, "scrollable"), children: [
            dialog && deferredSearchQuery === "" && recentChoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { role: "group", "aria-label": recentText("frequent"), className: ModelSelect_default.group, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.groupTitle, children: recentText("frequent") }),
              recentChoices.map(({ group, model }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { ref: itemRef(), type: "button", role: "menuitemradio", "aria-checked": state.current?.provider === group.id && state.current?.model === model.id, className: ModelSelect_default.option, disabled: busy || locked, onClick: () => choose({ provider: group.id, model: model.id }), children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.optionCopy, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.modelName, children: model.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.providerCaption, children: group.name })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.check, children: state.current?.provider === group.id && state.current?.model === model.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutlineRegular, {}) : null })
              ] }, routeKey({ provider: group.id, model: model.id })))
            ] }),
            filteredGroups.map((group) => {
              const headingId = `${id}-${group.id}`;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { role: "group", "aria-labelledby": headingId, className: ModelSelect_default.group, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.groupTitle, id: headingId, children: group.name }),
                group.models.map((model) => {
                  const selected = state.current?.provider === group.id && state.current.model === model.id;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "button",
                    {
                      ref: itemRef(),
                      type: "button",
                      role: "menuitemradio",
                      "aria-checked": selected,
                      className: clsx_default(ModelSelect_default.option, selected && ModelSelect_default.selected),
                      title: model.name,
                      disabled: busy || locked,
                      onClick: () => {
                        choose({ provider: group.id, model: model.id });
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.optionCopy, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.modelName, children: model.name }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.check, children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutlineRegular, {}) : null })
                      ]
                    },
                    model.id
                  );
                })
              ] }, group.id);
            })
          ] }),
          state.status === "ready" && choices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.empty, children: t("empty.models") }),
          state.status === "ready" && choices.length > 0 && filteredGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.empty, role: "status", children: "\u6CA1\u6709\u5339\u914D\u7684\u6A21\u578B\u3002" })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rootRef, className: clsx_default(ModelSelect_default.root, pickerOnly && ModelSelect_default.settingsPicker, embedded && ModelSelect_default.embedded), "data-menu-side": menuSide, onKeyDown: onRootKeyDown, onBlur, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        className: ModelSelect_default.trigger,
        "aria-label": triggerAria,
        "aria-haspopup": dialog ? "dialog" : "menu",
        "aria-expanded": open,
        "aria-controls": open && !dialog ? `${id}-menu` : void 0,
        title: speed?.visible && speed.tier === "fast" ? `${triggerLabel} \xB7 \u5FEB\u901F\u6A21\u5F0F` : triggerLabel,
        disabled: locked,
        onClick: () => {
          if (open) {
            close();
          } else {
            show();
          }
        },
        children: [
          speed?.visible && speed.tier === "fast" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: ModelSelect_default.triggerFast, "data-fast-mode": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 2-9 12h7l-1 8 10-12h-7V2Z" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.triggerLabel, children: routeLabel }),
          !pickerOnly && effortLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.triggerEffort, children: effortLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { className: clsx_default(ModelSelect_default.chevron, open && ModelSelect_default.chevronOpen) })
        ]
      }
    ),
    open && (floating ? (0, import_react_dom.createPortal)(menu, document.body) : menu),
    toast !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Toast,
      {
        text: toast.text,
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconWarningOutlineRegular, {}),
        anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
        onDone: () => {
          setToast(null);
        }
      },
      toast.seq
    )
  ] });
}

// src/SettingsModelPicker.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function SettingsModelPicker({ groups, current, locked, select, t, recents, recentText, embedded, dialog, pickerOnly = true, onOpenChange, status = "ready", error = null, failures = [], load = () => {
} }) {
  const directory = (0, import_react2.useMemo)(() => (0, import_dsh_client_store.createSnapshotStore)({
    status,
    error,
    groups,
    failures,
    current,
    routable: true,
    pending: null
  }), []);
  (0, import_react2.useEffect)(() => {
    directory.update((state) => {
      state.groups = groups;
      state.current = current;
      state.status = status;
      state.error = error;
      state.failures = failures;
    });
  }, [directory, groups, current, status, error, failures]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ModelSelect,
    {
      pickerOnly,
      embedded,
      dialog,
      onOpenChange,
      available: true,
      locked,
      directory,
      load,
      recents,
      recentText,
      select: async (selection) => await select(selection) !== false,
      t
    }
  );
}

// src/model-picker-service.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function createModelPickerService(ctx, recents, recentText) {
  const t = ctx.locale.bind("model");
  function View({ sessionId, current, locked, select, onOpenChange, full = false }) {
    const directory = (0, import_react3.useMemo)(() => ctx.modelDirectories.directoryFor(sessionId), [sessionId]);
    const state = (0, import_react3.useSyncExternalStore)((listener) => directory.store.subscribe(listener), () => directory.store.getSnapshot());
    (0, import_react3.useEffect)(() => {
      void directory.load().catch(() => {
      });
    }, [directory]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      SettingsModelPicker,
      {
        groups: state.groups,
        current,
        locked,
        select,
        recents,
        recentText,
        t,
        pickerOnly: !full,
        dialog: !full,
        onOpenChange,
        status: state.status === "loading" ? "loading" : state.error ? "error" : "ready",
        error: state.error,
        failures: state.failures,
        load: () => {
          void directory.load().catch(() => {
          });
        }
      }
    );
  }
  function Picker(props) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(View, { ...props });
  }
  function Control(props) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(View, { ...props, full: true });
  }
  function CatalogPicker(props) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SettingsModelPicker, { ...props, recents, recentText, t, pickerOnly: true });
  }
  return { Picker, Control, CatalogPicker };
}

// src/client.ts
var inject = ["slots", "sessions", "modelDirectories", "remote", "remote.session", "locale"];
function apply(ctx) {
  let storage;
  try {
    storage = window.localStorage;
  } catch {
  }
  const recents = new RecentModels(storage);
  ctx.effect(() => () => recents.dispose());
  ctx.effect(() => ctx.locale.register("codex-model-selector", recentLocales));
  const recentText = ctx.locale.bind("codex-model-selector");
  ctx.effect(() => ctx.provide("modelPickers", createModelPickerService(ctx, recents, recentText)));
  ctx.slots.inject("settings.model-redirect.picker", () => ctx.slots.register({
    name: "settings.model-redirect.picker",
    locale: "model",
    inject: () => ({ recents, recentText })
  }, SettingsModelPicker));
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-codex-model-selector";
    style.textContent = cssText;
    document.head.append(style);
    return () => style.remove();
  });
  ctx.slots.inject("conversation.input.model", () => ctx.slots.register({
    name: "conversation.input.model",
    priority: -10,
    locale: "model",
    inject(sessionId) {
      const directory = ctx.modelDirectories.directoryFor(sessionId);
      const available = ctx.sessions.subagentAddress(sessionId) === void 0;
      const speed = () => ctx.slots.entries("conversation.input.right").find((entry) => entry.options.id === "codex-speed" && entry.inject)?.inject(sessionId);
      return {
        recents,
        recentText,
        available,
        loadSpeed: async () => speed()?.loadSpeed?.() ?? { visible: false, tier: "standard" },
        setSpeed: async (tier) => speed()?.setSpeed?.(tier) ?? false,
        directory: directory.store,
        load: () => {
          if (available) void directory.load().catch(() => {
          });
        },
        select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
      };
    }
  }, ModelSelect));
  ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
    name: "conversation.input.right",
    id: "codex-speed",
    priority: -10
  }, () => null));
}

return module.exports;}});
