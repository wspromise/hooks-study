import { defineComponent, createVNode, render, reactive, h } from 'vue';
import Loading from './Loading.vue';

export function createLoading(props, target, wait = false) {
  //  loading的实例
  let vm = null;

  const data = reactive({
    tips: '', // 当作为包裹元素时，自定义描述文案
    loading: true, // 是否loading
    ...props,
  });

  // loading的包裹容器
  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });

  // 创建loading实例
  vm = createVNode(LoadingWrap);

  // 是否异步
  if (wait) {
    // useLoading方法导致onMounted无法async
    setTimeout(() => {
      // 到这一步才渲染出loading的el
      render(vm, document.createElement('div'));
    }, 0);
  } else {
    render(vm, document.createElement('div'));
  }

  // 函数式-关闭loading
  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  // 函数式-打开loading
  function open(target = document.body) {
    if (!vm || !vm.el) return;
    target.appendChild(vm.el);
  }

  // 如果指定容器则直接挂载
  target && open(target);

  return {
    vm,
    close,
    open,
    setTip: tip => (data.tip = tip),
    setLoading: loading => (data.loading = loading),
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el;
    },
  };
}
