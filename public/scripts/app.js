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

    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      characters: [],
      films: [],
      error: undefined
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
    key: 'handleChange',
    value: function handleChange(url) {
      var _this3 = this;

      fetchData(url).then(function (data) {
        _this3.setState(function () {
          return {
            films: [],
            error: undefined
          };
        });
        data.films.forEach(function (film) {
          fetchData(film).then(function (data) {
            _this3.setState(function (prevState) {
              return {
                films: prevState.films.concat(data)
              };
            });
          });
        });
      }).catch(function (error) {
        _this3.setState(function () {
          return { error: error.message };
        });
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
          subtitle: 'May the Force Be With You'
        }),
        React.createElement(Aside, {
          characters: this.state.characters,
          handleChange: this.handleChange
        }),
        React.createElement(Main, {
          films: this.state.films,
          error: this.state.error
        })
      );
    }
  }]);

  return MovieListApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'header',
    { className: 'header' },
    React.createElement(
      'h1',
      { className: 'title' },
      props.title
    ),
    props.subtitle && React.createElement(
      'p',
      { className: 'subtitle' },
      props.subtitle
    )
  );
};

var Aside = function (_React$Component2) {
  _inherits(Aside, _React$Component2);

  function Aside(props) {
    _classCallCheck(this, Aside);

    var _this4 = _possibleConstructorReturn(this, (Aside.__proto__ || Object.getPrototypeOf(Aside)).call(this, props));

    _this4.handleChange = _this4.handleChange.bind(_this4);
    _this4.state = {
      value: 'select'
    };
    return _this4;
  }

  _createClass(Aside, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.handleChange(event.target.value);
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'aside',
        { className: 'aside' },
        React.createElement(
          'select',
          { className: 'movie-dropdown', onChange: this.handleChange, value: this.state.value },
          React.createElement(
            'option',
            { value: 'select', disabled: true },
            'Select a character'
          ),
          this.props.characters.map(function (character) {
            return React.createElement(Option, {
              key: character.name,
              url: character.url,
              name: character.name
            });
          })
        )
      );
    }
  }]);

  return Aside;
}(React.Component);

;

var Option = function Option(props) {
  return React.createElement(
    'option',
    { value: props.url },
    props.name
  );
};

var Main = function Main(props) {
  return React.createElement(
    'main',
    { className: 'main' },
    React.createElement(
      'p',
      { className: 'message' },
      props.error || 'Character has appeared in the following movies:'
    ),
    React.createElement(Movies, {
      films: props.films
    })
  );
};

var Movies = function Movies(props) {
  return React.createElement(
    'ul',
    { className: 'movie-list' },
    props.films.map(function (film) {
      return React.createElement(Movie, {
        key: film.title,
        title: film.title,
        date: film.release_date
      });
    })
  );
};

var Movie = function Movie(props) {
  return React.createElement(
    'li',
    { className: 'movie' },
    props.title,
    ' - ',
    props.date
  );
};

ReactDOM.render(React.createElement(MovieListApp, null), document.getElementById('app'));
