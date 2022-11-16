import { unref } from 'vue';
import { createLoading } from './createLoading';

export function useLoading(opt) {
  let props;
  // 要挂载的容器
  let target = document.body;

  if (Reflect.has(opt, 'props') || Reflect.has(opt, 'target')) {
    props = opt.props || {};
    target = opt.target || document.body;
  } else {
    props = opt;
  }

  // 创建loading
  const instance = createLoading(props, undefined, true);

  // 打开loading
  const open = () => {
    let t = unref(target);
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

  // 设置loading
  const setLoading = loading => {
    instance.setLoading(loading);
  };

  return [open, close, setTip, setLoading];
}
