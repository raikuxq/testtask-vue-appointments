import Vue from "vue";

import {
  Form,
  DatePicker,
  TimePicker,
  Input,
  Button,
  PageHeader,
  Icon,
  List,
  Card,
  Descriptions,
  Layout,
  Menu,
  Modal,
  Select,
  Tooltip,
  notification
} from "ant-design-vue";

const components = [
  Form,
  DatePicker,
  TimePicker,
  Input,
  Icon,
  Button,
  PageHeader,
  List,
  Card,
  Descriptions,
  Layout,
  Menu,
  Select,
  Tooltip
];

const installAnt = function(Vue) {
  components.map(component => {
    Vue.use(component);
  });

  // Vue.prototype.$message = message;
  Vue.prototype.$notification = notification;
  Vue.prototype.$info = Modal.info;
  Vue.prototype.$success = Modal.success;
  Vue.prototype.$error = Modal.error;
  Vue.prototype.$warning = Modal.warning;
  Vue.prototype.$confirm = Modal.confirm;
  Vue.prototype.$destroyAll = Modal.destroyAll;
};

installAnt(Vue);
