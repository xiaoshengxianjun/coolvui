import Vue from 'vue';
import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast);
let toastPool = [];

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
};

let removeDom = event => {
  console.log(event)
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
  returnAnInstance(this);
};

let ToastPlugin = (options = {}) => {
  let duration = options.duration || 2000;
  let instance = getAnInstance();
  instance.closed = false;
  clearTimeout(instance.timer);
  
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  instance.type = options.type || 'default';

  document.body.appendChild(instance.$el);

  Vue.nextTick(function() {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    ~duration && (instance.timer = setTimeout(function() {
      // if (instance.closed) return;
      instance.close();
    }, duration));
  })
};

export default ToastPlugin;
