import { MutationTree } from 'vuex';

const mutations: MutationTree<State> = {
  demo: (state, data) => state.demo = data
};
export default mutations;
