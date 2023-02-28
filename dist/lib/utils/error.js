import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";

var DhnUiError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(DhnUiError, _Error);

  function DhnUiError(m) {
    var _this;

    _this = _Error.call(this, m) || this;
    _this.name = 'CDhnActUIError';
    return _this;
  }

  return DhnUiError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

export default (function (scope, m) {
  throw new DhnUiError("[" + scope + "] " + m);
});
export function warn(scope, m) {
  console.warn(new DhnUiError("[" + scope + "] " + m));
}