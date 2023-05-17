import { Provider } from "react-redux";
import { Provider as Prov } from "use-http";
import store from "./Store/index";
import HomePage from "./Pages/Home";

function App() {
  return (
    <Prov url='localhost:3000'>
      <Provider store={store}>
        <div className="App">
          <HomePage />
        </div>
      </Provider>
    </Prov>
  );
}

export default App;
