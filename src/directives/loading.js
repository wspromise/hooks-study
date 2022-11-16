import { createLoading } from '@/components/Loading';

const loadingDirective = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    // 获取loading描述信息
    const tip = el.getAttribute('loading-tip');
    // 获取loading布背景颜色
    const background = el.getAttribute('loading-background');
    // 获取loading大小
    const size = el.getAttribute('loading-size');
    // modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
    const fullscreen = !!binding.modifiers.fullscreen;
    // 创建一个loading
    const instance = createLoading(
      {
        tip,
        background,
        size: size || 'large',
        // value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el
    );
    el.instance = instance;
  },

  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    // oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  // 绑定元素的父组件卸载后调用
  unmounted(el) {
    el?.instance?.close();
  },
};
export function setupLoadingDirective(app) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
