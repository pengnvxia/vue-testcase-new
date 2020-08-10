import { GetterTree } from 'vuex';

const getters: GetterTree<State, RootState> = {
  demo: state => state.demo
};

export default getters;
