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
      <h1>This is the Home Page of LAME</h1>
      <p>Should probably talk about what it is and what it does here.</p>
      <p>
        Or we can ditch this and redirect to the LoginPage instead if the user
        isn't authenticated.
      </p>
      <p>If user is authenticated maybe redirect to the ems page instead.</p>
    </div>
  );
};

export default App;
