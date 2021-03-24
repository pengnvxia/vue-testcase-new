interface RootState {
  demo: string;
  caseGroupEditConfig: EditConfig[];
  caseGroupEditCase: EditCase[];
}

interface State {
  demo: string;
  caseGroupEditConfig: EditConfig[];
  caseGroupEditCase: EditCase[];
}

interface EditConfig {
  id: number;
  configName: string;
}

interface EditCase {
  caseId: number;
  caseName: string;
  caseEnvId: number;
  caseUpdatedAt: string;
}
