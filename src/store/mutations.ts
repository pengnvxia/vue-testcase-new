import { MutationTree } from 'vuex';

const mutations: MutationTree<State> = {
  demo: (state, data) => state.demo = data,
  caseGroupEditConfig: (state, data) => state.caseGroupEditConfig = data,
  caseGroupEditCase: (state, data) => state.caseGroupEditCase = data,
};
export default mutations;
