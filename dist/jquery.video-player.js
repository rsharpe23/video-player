"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($) {
  'use strict';

  var VideoPlayer =
  /*#__PURE__*/
  function () {
    function VideoPlayer(target) {
      _classCallCheck(this, VideoPlayer);

      this.target = target;
    }

    _createClass(VideoPlayer, [{
      key: "html",
      value: function html() {
        throw new Error('Not implemented');
      }
    }]);

    return VideoPlayer;
  }();

  var YouTube =
  /*#__PURE__*/
  function (_VideoPlayer) {
    _inherits(YouTube, _VideoPlayer);

    function YouTube() {
      _classCallCheck(this, YouTube);

      return _possibleConstructorReturn(this, _getPrototypeOf(YouTube).apply(this, arguments));
    }

    _createClass(YouTube, [{
      key: "html",
      value: function html() {
        return "<iframe src=\"https://www.youtube.com/embed/".concat(this.target, "?controls=0&autoplay=1\"\n              frameborder=\"0\" \n              allow=\"autoplay\">\n            </iframe>");
      }
    }]);

    return YouTube;
  }(VideoPlayer); // $.fn.videoPlayer = function () {
  //   const $element = $(this[0]);
  //   if (!$element.children('iframe').length) {
  //     const target = $element.data('target');
  //     $element.html(`
  //       <iframe src="https://www.youtube.com/embed/${target}?controls=0&autoplay=1" 
  //         frameborder="0" 
  //         allow="autoplay">
  //       </iframe>`
  //     );
  //   }
  //   return this;
  // };


  $.fn.videoPlayer = function () {
    var $element = $(this[0]);

    if (!$element.children().length) {
      var target = $element.data('target');
      $element.html(new YouTube(target).html());
    }

    return this;
  };
})($);
//# sourceMappingURL=jquery.video-player.js.map
