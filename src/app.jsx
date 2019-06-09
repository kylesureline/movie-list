const fetchData = url => {

  const checkStatus = response => {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }; // end checkStatus()

  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
}; // end fetchData()

class MovieListApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      characters: [],
      films: [],
      error: undefined
    }
  }
  componentDidMount() {
    fetchData('scripts/characters.json')
      .then(data => {
        this.setState({characters: data.characters});
      });
  }
  handleChange(url) {
    fetchData(url)
      .then(data => {
        this.setState(() => ({
          films: [],
          error: undefined
        }));
        data.films.forEach(film => {
          fetchData(film)
          .then(data => {
            this.setState((prevState) => ({
              films: prevState.films.concat(data)
            }));
          });
        });
      }).catch(error => {
        this.setState(() => ({ error: error.message }));
      });
  }
  render() {
    return (
      <div>
        <Header
          title="Movie List App"
          subtitle="May the Force Be With _____"
        />
        <Aside
          characters={this.state.characters}
          handleChange={this.handleChange}
        />
        <Main
          films={this.state.films}
          error={this.state.error}
        />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      {props.subtitle && <p>{props.subtitle}</p>}
    </header>
  );
};

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'select'
    }
  }
  handleChange(event) {
    this.props.handleChange(event.target.value);
    this.setState({
      value: event.target.value
    });
  }
  render() {
    return (
      <aside>
        <select onChange={this.handleChange} value={this.state.value}>
          <option value="select" disabled>Select a character</option>
          {this.props.characters.map(character => (
            <Option
              key={character.name}
              url={character.url}
              name={character.name}
            />
          ))}
        </select>
      </aside>
    );
  }
};

const Option = (props) => {
  return (
    <option value={props.url}>{props.name}</option>
  );
}

const Main = (props) => {
  return (
    <main>
      <p>Character has appeared in the following movies:</p>
      <Movies
        films={props.films}
        error={props.error}
      />
    </main>
  );
};

const Movies = (props) => {
  return (
    <ul>
      {props.error && <li>{props.error}</li>}
      {
        props.films.map((film) => (
          <Movie
            key={film.title}
            title={film.title}
            date={film.release_date}
          />
        ))
      }
    </ul>
  );
};

const Movie = (props) => {
  return (
    <li>{props.title} - {props.date}</li>
  );
}

ReactDOM.render(<MovieListApp />, document.getElementById('app'));
