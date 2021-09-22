import RouteComp from "./config/route";
import { Provider } from "react-redux";
import store from "./config/Redux/store";

function App() {
  return (
    <Provider store={store}>
      <RouteComp />
    </Provider>
  );
}

export default App;
