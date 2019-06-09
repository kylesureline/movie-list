class MovieListApp extends React.Component {
  render() {
    return (
      <div>
        <Header title="Movie List App" subtitle="May the Force Be With _____" />

        <aside>
          dropdown here
        </aside>

        <main>
          results here
        </main>
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

ReactDOM.render(<MovieListApp />, document.getElementById('app'));
