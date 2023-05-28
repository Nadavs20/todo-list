import { Provider } from "react-redux";
import { Provider as Prov } from "use-http";
import store from "./Store/index";
import HomePage from "./Pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Prov url="http://localhost:3000">
        <div className="App">
          <HomePage />
        </div>
      </Prov>
    </Provider>
  );
}

export default App;
