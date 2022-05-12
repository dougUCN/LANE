import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "urql";
import { GetHistogramsDocument, GetHistogramsQuery } from "./generated";

const App = () => {
  // Test query to make sure connection with graphql endpoint works
  // TODO: Remove this block once we have a working integration test
  const [result] = useQuery<GetHistogramsQuery>({
    query: GetHistogramsDocument,
  });
  // eslint-disable-next-line no-console
  console.log("result", result);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* Test to see if Tailwind CSS is working */}
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </header>
    </div>
  );
};

export default App;
