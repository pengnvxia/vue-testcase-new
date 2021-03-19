/**
 * 服务端请求底层封装
 */
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError, CancelTokenSource } from "axios";
import { message } from 'ant-design-vue';

import {
  ERR_OK,

} from '@/config/httpCode.ts';

function getToken(): string|null {
  let token= localStorage.getItem('token');
  return token;
}

function getUserId(): string|null {
  let userId= localStorage.getItem('userId');
  return userId;
}

function isLogin(): boolean {
  if(getToken() && getUserId()){
    return true;
  }else {
    return false;
  }
}

export default function base(propConfig: AxiosRequestConfig, error: boolean = true, id: number = 0): AxiosPromise {

  const defaultConfig: AxiosRequestConfig = {
    method: 'get', // 默认get 请求,
    headers: {},
    timeout: 60000 * 4
  };

  if (!propConfig.headers || propConfig.headers === undefined) {
    propConfig.headers = {};
  }

  isLogin() && ( propConfig.headers = Object.assign(propConfig.headers, {token: getToken(), uid: getUserId()}) );


  const newConfig: AxiosRequestConfig = Object.assign(defaultConfig, propConfig);

  return new Promise((resolve, reject) => {
    axios(newConfig).then((res: AxiosResponse) => {
      const status: httpCode = res.data.errcode;
      if (status === ERR_OK) {
        resolve(res.data);
        return;
      }

      // if (status === ERR_UNLOGIN) {
      //   goLogin();
      //   return;
      // }
      //
      // if (status === ERR_NO_RELEASE) {
      //   reject(res.data);
      //   return;
      // }
      //
      // if (status === ERR_NO_AUTH) {
      //   reject(res.data);
      //   return;
      // }
      //
      // if (status === ERR_LOGIN_TIMEOUT) {
      //   goLogin();
      //   return;
      // }
      //
      if (error) {
        message.error(res.data.errmsg);
      }

      reject(res.data);
    }).catch((err: AxiosError) => {
      handleHttpRequestError(err, resolve, reject);
    });

  });

}


/**
 * 请求错误处理
 */
function handleHttpRequestError(err: any, resolve: any, reject: any): void {
  console.log(err);
  const status: number = err?.request?.status || err?.status || 500;
  message.error(`服务器异常(status code:${status ? status : 'xxxxx'})`);
  reject(err);
}

// 登录
function goLogin(): void {
  window.location.href = "/login";
}
