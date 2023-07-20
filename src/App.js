import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import Form from "./pages/Form";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <Form />
              <Contacts />
            </Provider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
