import { createStore } from "vuex";
import homeStore from "./home";
import infoStore from "./info";

const store = createStore({
  modules: {
    homeStore,
    infoStore,
  },
});

export default store;
