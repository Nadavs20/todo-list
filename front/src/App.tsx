import { Provider } from "react-redux";
import { Provider as FetchProvider } from "use-http";
import store from "./Store/index";
import HomePage from "./Pages/Home";

function App() {
  return (
    <Provider store={store}>
      <FetchProvider url="http://localhost:8000">
        <div className="App">
          <HomePage />
        </div>
      </FetchProvider>
    </Provider>
  );
}

export default App;
