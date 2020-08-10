import Vue from 'vue';
import {
  Dropdown,
  Menu,
  Button,
  Input,
  Form,
  BackTop,
  Icon,
  Table,
  Tag,
  Tooltip,
  Alert,
  Checkbox,
  Breadcrumb,
  Pagination,
  Select,
  LocaleProvider,
  Affix,
  Anchor,
  Modal,
  Divider,
  Radio,
  Spin,
  Progress,
  message,
  DatePicker,
  ConfigProvider,
  Upload,
  Card,
  Row,
  Col,
  TreeSelect,
  FormModel,
  Tree,
  Popover
} from 'ant-design-vue';
import confirm from 'ant-design-vue/es/modal/confirm';

Vue.use(Dropdown);
Vue.use(Progress);
Vue.use(Anchor);
Vue.use(Radio);
Vue.use(Affix);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(BackTop);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(LocaleProvider);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(ConfigProvider);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(TreeSelect);
Vue.use(Tree);
Vue.use(Popover);
Vue.prototype.$message = message;
Vue.prototype.$confirm = confirm;
