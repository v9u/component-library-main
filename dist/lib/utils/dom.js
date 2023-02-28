import isServer from './isServer';
import { camelize } from './utils';
export var getScrollContainer = function getScrollContainer(el, isVertical) {
  if (isServer) return;
  var parent = el;

  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }

    if (isScroll(parent, isVertical)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return parent;
};
export var getStyle = function getStyle(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelize(styleName);

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }

  try {
    var _document$defaultView;

    var style = element.style[styleName];
    if (style) return style;
    var computed = (_document$defaultView = document.defaultView) == null ? void 0 : _document$defaultView.getComputedStyle(element, '');
    return computed ? computed[styleName] : '';
  } catch (e) {
    return element.style[styleName];
  }
};
export var isScroll = function isScroll(el, isVertical) {
  if (isServer) return;
  var determinedDirection = isVertical === null || isVertical === undefined;
  var overflow = determinedDirection ? getStyle(el, 'overflow') : isVertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x');
  return overflow == null ? void 0 : overflow.match(/(scroll|auto|overlay)/);
};
export var getOffsetTop = function getOffsetTop(el) {
  var offset = 0;
  var parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return offset;
};
export var getOffsetTopDistance = function getOffsetTopDistance(el, containerEl) {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};