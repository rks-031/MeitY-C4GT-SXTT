"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactPdf = require("react-pdf");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // src/PdfComp.js
function PdfComp(_ref) {
  var pdfFile = _ref.pdfFile;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    numPages = _useState2[0],
    setNumPages = _useState2[1];
  var _useState3 = (0, _react.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    pageNumber = _useState4[0],
    setPageNumber = _useState4[1];
  var _useState5 = (0, _react.useState)(1.5),
    _useState6 = _slicedToArray(_useState5, 2),
    scale = _useState6[0],
    setScale = _useState6[1];
  function onDocumentLoadSuccess(_ref2) {
    var numPages = _ref2.numPages;
    setNumPages(numPages);
  }
  function goToPrevPage() {
    setPageNumber(function (prevPage) {
      return Math.max(prevPage - 1, 1);
    });
  }
  function goToNextPage() {
    setPageNumber(function (prevPage) {
      return Math.min(prevPage + 1, numPages);
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "pdf-div"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "navigation"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-secondary",
    onClick: goToPrevPage,
    disabled: pageNumber <= 1
  }, "Previous Page"), /*#__PURE__*/_react["default"].createElement("span", null, "Page ", pageNumber, " of ", numPages), /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-secondary",
    onClick: goToNextPage,
    disabled: pageNumber >= numPages
  }, "Next Page")), /*#__PURE__*/_react["default"].createElement(_reactPdf.Document, {
    file: pdfFile,
    onLoadSuccess: onDocumentLoadSuccess
  }, /*#__PURE__*/_react["default"].createElement(_reactPdf.Page, {
    pageNumber: pageNumber,
    renderTextLayer: false,
    renderAnnotationLayer: false,
    scale: scale
  })));
}
var _default = exports["default"] = PdfComp;