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
    this.state = {
      characters: []
    }
  }
  componentDidMount() {
    fetchData('scripts/characters.json')
        .then(data => {
          this.setState({characters: data.characters});
        });
  }
  render() {
    return (
      <div>
        <Header
          title="Movie List App"
          subtitle="May the Force Be With _____"
        />
        <Aside characters={this.state.characters}/>
        <Main />
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
  handleChange(event) {
    console.log(event.target.value);
  }
  render() {
    return (
      <aside>
        <select onChange={this.handleChange} value="select">
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
      <Movies />
    </main>
  );
};

const Movies = (props) => {
  return (
    <ul>
      <li>Movie one</li>
      <li>Movie two</li>
    </ul>
  );
}

ReactDOM.render(<MovieListApp />, document.getElementById('app'));
