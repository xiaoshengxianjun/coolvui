import Toast from '../packages/toast';

const version = "1.0.1"; // 版本号

const install = function(Vue, config = {}) {
  if (install.installed) return;

  Vue.$toast = Vue.prototype.$toast = Toast;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
    install,
    version,
    Toast
}