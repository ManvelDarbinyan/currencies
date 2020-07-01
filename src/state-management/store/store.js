import { createStore } from "redux";
import counter from "../reducers/index";

const store = createStore(counter);

export default store;
