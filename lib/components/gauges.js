'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HalfGauge = exports.FullGauge = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CIRCLE = {
    cx: '150',
    cy: '150',
    r: '100'
};

var CIRCUMFERENCE = 2 * Math.PI * CIRCLE.r;

var CLASSNAME = 'react-mini-chart-gauge';

var BaseGauge = function (_React$Component) {
    _inherits(BaseGauge, _React$Component);

    function BaseGauge(props) {
        _classCallCheck(this, BaseGauge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseGauge).call(this, props));

        _this.state = {
            type: 'FullGauge'
        };
        return _this;
    }

    _createClass(BaseGauge, [{
        key: 'appendCss',
        value: function appendCss(head) {
            var style = document.createElement('style');
            style.id = CLASSNAME;
            style.innerHTML = '\n        .react-mini-chart.radial-gauge {\n            width: 15em;\n            height: auto;\n        }\n        .react-mini-chart.radial-gauge circle {\n            fill: transparent;\n            stroke-dashoffset: ' + CIRCUMFERENCE + 'px;\n            stroke-dasharray: ' + CIRCUMFERENCE + ';\n            transition: stroke-dashoffset .25s ease-in-out;\n        }\n        .react-mini-chart.radial-gauge.full-gauge {\n            transform: rotate(-90deg);\n            transform-origin: center;\n        }';
            head.appendChild(style);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var head = document.head;
            if (!document.head.querySelector('style[id=\'' + CLASSNAME + '\']')) {
                this.appendCss(head);
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var strokeDashoffset = void 0;
            if (this.state.type === 'HalfGauge') {
                // Note: Units ('px') are required for animation in Microsoft Edge.
                strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE / 2) + 'px';
            } else {
                strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE) + 'px';
            }

            return {
                stroke: this.props.color,
                strokeWidth: this.props.width,
                strokeDashoffset: strokeDashoffset
            };
        }
    }, {
        key: 'getViewBox',
        value: function getViewBox() {
            return this.state.type === 'HalfGauge' ? '0 0 300 150' : '0 0 300 300';
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'svg',
                { viewBox: this.getViewBox(),
                    preserveAspectRatio: 'xMaxYMax meet',
                    className: 'react-mini-chart radial-gauge ' + this.state.type,
                    version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                _react2.default.createElement('circle', {
                    cx: CIRCLE.cx, cy: CIRCLE.cy, r: CIRCLE.r,
                    style: this.getStyles() })
            );
        }
    }]);

    return BaseGauge;
}(_react2.default.Component);

BaseGauge.propTypes = {
    color: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string,
    value: function value(props, propName, componentName) {
        var prop = props[propName];
        var max = 100;
        var min = 0;
        if (prop) {
            if (typeof prop !== 'number') {
                return new Error('Warning: Failed propType: Invalid prop `' + propName + '` of type ' + ('`' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `number` ') + ('between `' + min + '` and `' + max + '`.'));
            } else if (prop < 0 || prop > 100) {
                return new Error('Warning: Failed propType: Invalid value `' + prop + '` for prop ' + ('`' + propName + '` supplied to `' + componentName + '`, expected `number` between ') + ('`' + min + '` and `' + max + '`.'));
            }
        }
        return null;
    },

    width: _react2.default.PropTypes.string
};

BaseGauge.defaultProps = {
    color: 'Orange',
    value: 50,
    width: '2em'
};

var FullGauge = function (_BaseGauge) {
    _inherits(FullGauge, _BaseGauge);

    function FullGauge() {
        _classCallCheck(this, FullGauge);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FullGauge).apply(this, arguments));
    }

    return FullGauge;
}(BaseGauge);

var HalfGauge = function (_BaseGauge2) {
    _inherits(HalfGauge, _BaseGauge2);

    function HalfGauge(props) {
        _classCallCheck(this, HalfGauge);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(HalfGauge).call(this, props));

        _this3.state = {
            type: 'HalfGauge'
        };
        return _this3;
    }

    return HalfGauge;
}(BaseGauge);

exports.FullGauge = FullGauge;
exports.HalfGauge = HalfGauge;