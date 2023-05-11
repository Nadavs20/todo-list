import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/index';
import HomePage from './Pages/Home';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
