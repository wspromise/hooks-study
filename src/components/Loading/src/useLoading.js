import { unref } from 'vue';
import { createLoading } from './createLoading';

export function useLoading(opt) {
  let props;
  // 要挂载的目标元素
  let target = document.body;

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    // 初始化数据
    const options = opt;
    props = options.props || {};
    target = options.target || document.body;
  } else {
    props = opt;
  }
  // 创建loading实例
  const instance = createLoading(props, undefined, true);
  // 打开loading
  const open = () => {
    const t = unref(target);
    if (!t) return;
    instance.open(t);
  };
  // 关闭loading
  const close = () => {
    instance.close();
  };
  // 设置描述信息
  const setTip = tip => {
    instance.setTip(tip);
  };

  return [open, close, setTip];
}
