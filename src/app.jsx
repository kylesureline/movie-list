class MovieListApp extends React.Component {
  render() {
    return (
      <div>
        <Header
          title="Movie List App"
          subtitle="May the Force Be With _____"
        />
        <Aside />
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

const Aside = (props) => {
  return (
    <aside>
      <p>Select a Character:</p>
      <select>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </select>
    </aside>
  );
};

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
