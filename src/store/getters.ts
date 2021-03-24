import { GetterTree } from 'vuex';

const getters: GetterTree<State, RootState> = {
  demo: state => state.demo,
  caseGroupEditConfig: state => state.caseGroupEditConfig,
  caseGroupEditCase: state => state.caseGroupEditCase,
};

export default getters;
