import axios from 'axios';
import config from '@/config/app-config';
import reLogin from './reLogin';
import { messageError } from './message';
import router from '@/router';

// axios.defaults.withCredentials = true;

const baseURL = config.apiHost;

const option = {
  baseURL: baseURL,
};

// 创建 axios 实例
const service = axios.create(option);
// http request 拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.code === 0 && res.success) {
      // 小程序配置清单接口处理 /myResource/proxy
      return res.data;
    }
    if (!res.ok) {
      if (res.customErrorAlert && typeof res.customErrorAlert === 'function') {
        res.customErrorAlert();
      } else {
        messageError(res && res.message);
      }
      // 重新登录
      if (res.code === 10 || res.code === 1011) {
        const curPath = router.currentRoute?.value?.path || '';
        const isOperate = curPath.startsWith('/operate');
        reLogin(isOperate);
      }
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res.data;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
      return null;
    }
    messageError('系统异常');
    return Promise.reject(error);
  }
);

export default service;
