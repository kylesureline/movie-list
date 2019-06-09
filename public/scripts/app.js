"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieListApp = function (_React$Component) {
  _inherits(MovieListApp, _React$Component);

  function MovieListApp() {
    _classCallCheck(this, MovieListApp);

    return _possibleConstructorReturn(this, (MovieListApp.__proto__ || Object.getPrototypeOf(MovieListApp)).apply(this, arguments));
  }

  _createClass(MovieListApp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: "Movie List App", subtitle: "May the Force Be With _____" }),
        React.createElement(
          "aside",
          null,
          "dropdown here"
        ),
        React.createElement(
          "main",
          null,
          "results here"
        )
      );
    }
  }]);

  return MovieListApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "header",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      "p",
      null,
      props.subtitle
    )
  );
};

ReactDOM.render(React.createElement(MovieListApp, null), document.getElementById('app'));
