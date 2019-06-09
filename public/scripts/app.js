'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fetchData = function fetchData(url) {

  var checkStatus = function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }; // end checkStatus()

  return fetch(url).then(checkStatus).then(function (res) {
    return res.json();
  }).catch(function (error) {
    return console.log('Looks like there was a problem', error);
  });
}; // end fetchData()

var MovieListApp = function (_React$Component) {
  _inherits(MovieListApp, _React$Component);

  function MovieListApp(props) {
    _classCallCheck(this, MovieListApp);

    var _this = _possibleConstructorReturn(this, (MovieListApp.__proto__ || Object.getPrototypeOf(MovieListApp)).call(this, props));

    _this.state = {
      characters: []
    };
    return _this;
  }

  _createClass(MovieListApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetchData('scripts/characters.json').then(function (data) {
        _this2.setState({ characters: data.characters });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Header, {
          title: 'Movie List App',
          subtitle: 'May the Force Be With _____'
        }),
        React.createElement(Aside, null),
        React.createElement(Main, null)
      );
    }
  }]);

  return MovieListApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'header',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'p',
      null,
      props.subtitle
    )
  );
};

var Aside = function Aside(props) {

  return React.createElement(
    'aside',
    null,
    React.createElement(
      'p',
      null,
      'Select a Character:'
    ),
    React.createElement(
      'select',
      null,
      React.createElement(
        'option',
        { value: 'one' },
        'One'
      ),
      React.createElement(
        'option',
        { value: 'two' },
        'Two'
      ),
      React.createElement(
        'option',
        { value: 'three' },
        'Three'
      )
    )
  );
};

var Main = function Main(props) {
  return React.createElement(
    'main',
    null,
    React.createElement(
      'p',
      null,
      'Character has appeared in the following movies:'
    ),
    React.createElement(Movies, null)
  );
};

var Movies = function Movies(props) {
  return React.createElement(
    'ul',
    null,
    React.createElement(
      'li',
      null,
      'Movie one'
    ),
    React.createElement(
      'li',
      null,
      'Movie two'
    )
  );
};

ReactDOM.render(React.createElement(MovieListApp, null), document.getElementById('app'));
