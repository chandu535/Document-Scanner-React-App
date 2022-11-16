import React from "react";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

//Routes
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import redirect from 'react-router'

//Components
import reducer from "./components/User/store";
import FileInput from './components/home'
import UserContainer from "./components/login";


//Creating Redux Store
const store = createStore(reducer, applyMiddleware(thunk));


function App() {
  
  
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route exact path="/" element={<UserContainer />}></Route>
          </Routes>
        </Provider>
          <Routes>
          <Route exact path="/home" element={<FileInput />}></Route>
          </Routes>
      </div>
    </Router>
  );
}
export default App;
