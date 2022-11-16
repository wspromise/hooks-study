import { createVNode, defineComponent, h, reactive, render } from 'vue';
import Loading from './loading.vue';

export function createLoading(props, target, wait = false) {
  // loading的虚拟节点
  let vm = null;

  let data = reactive({
    tip: '', // 当作为包裹元素时，自定义描述文案
    loading: true, // 是否loading
    ...props,
  });

  // loading的包裹容器
  const loadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });
  // 创建虚拟节点
  vm = createVNode(loadingWrap);

  if (wait) {
    // 解决useLoading在onMounted时无法async的bug
    setTimeout(() => {
      render(vm, document.createElement('div'));
    }, 0);
  } else {
    render(vm, document.createElement('div'));
  }
  // 打开loading
  const open = (target = document.body) => {
    if (!vm || !vm.el) return;
    target.appendChild(vm.el);
  };

  // 关闭loading
  const close = () => {
    if (!vm || !vm.el) return;
    vm.el.remove();
  };

  // 如果指定挂载容器，则直接打开loading
  target && open(target);

  return {
    vm,
    open,
    close,
    setTip(tip) {
      data.tip = tip;
    },
    get tip() {
      return data.tip;
    },
    setLoading(loading) {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm.el;
    },
  };
}
