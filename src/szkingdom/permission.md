---
title: "按钮权限处理方法"
---

```ts
// permission.ts
import type { Menu } from "/@/router/types";
import { useSystemStoreWithOut } from "/@/store/system";
import type { App, Directive, DirectiveBinding } from "vue";
import { router } from "/@/router";
export function flatten(data: Menu[]) {
  const result: Menu[] = [];
  function trans(data: Menu[]) {
    (data || []).forEach((item) => {
      if (item) {
        result.push(item);
        if (item.children && item.children.length > 0) {
          trans(item.children);
        }
      }
    });
  }
  trans(data);
  return result;
}

export function isAuth(key: number | string) {
  if (!key) return true;
  const { name } = router.currentRoute.value;
  const { permissions } = useSystemStoreWithOut();
  const flag = permissions.find((item) => {
    const btnKey = item.menuCode.match(/:\s*(.*)/);
    // 兼容按钮权限直接取冒号后的key做比较
    return (
      item.menuCode === key.toString() ||
      // 兼容按钮权限直接取冒号后的key做比较
      (name == item.parentMenu && key == (btnKey ? btnKey[1] : ""))
    );
  });
  return !!flag;
}

const authDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    const value = binding.value;
    if (!value) return;
    if (!isAuth(value)) {
      el.parentNode?.removeChild(el);
    }
  },
};

export function setupPermissionDirective(app: App) {
  app.directive("auth", authDirective);
}
```

```ts
export enum MenuTypeDataEnum {
  // 页签
  MENU = "0",
  TAB = "1",
  BUTTON = "2",
}
```

```ts
import { defineStore } from "pinia";
import { store } from "@/template/store";
import { router } from "@/template/router";
import { usePagePath } from "@/template/hooks";
import { httpClient, setToken } from "@/template/utils";
import { formatDateCn } from "/@/utils/date";
import type { Menu } from "@/template/router/types";
import { flatten } from "/@/utils/permission";
import { MenuTypeDataEnum } from "@/template/enums";
import { pick } from "lodash-es";

interface User {
  userId: Number;
  userName: String;
  organId: Number;
  organName: String;
  roleName: String;
  roleId: Number;
  operId: Number;
  deptId: Number;
}

interface Organ {
  organCode: String;
  organFullName: String;
  organId: Number;
  organName: String;
  organStat: Number;
  deptId: Number;
  deptName: String;
  isBackDept: String;
  rootDept: String;
}

interface SystemState {
  userInfo: User;
  roleMenuData: Array<Fia6Menu>; // 角色菜单数据
  roleList: Array<User>;
  orgInfo: Organ;
  businessDate: BusinessDate;
  permissions: Fia6Menu[]; // 权限
  expiredHold: ExpiredHold[]; // 获取临期持仓数据
  authUserInfo: {};
  sysCfgInfo: [];
}

interface BusinessDate {
  nextDay: Number;
  trday: Number;
  preDay: Number;
}

interface Fia6Menu extends Menu {
  menuCode: String;
}

export interface ExpiredHold {
  investCode: string;
  investName: string;
  securityList: {
    [key: number]: Array<{
      marketAbbr: string;
      marketCode: string;
    }>;
  };
}

export const useSystemStore = defineStore({
  persist: true,
  id: "system",
  state: (): SystemState => ({
    userInfo: {
      userId: 0,
      userName: "",
      organId: 0,
      organName: "",
      roleName: "",
      roleId: 0,
      deptId: 0,
      operId: 0,
    },
    roleMenuData: [],
    roleList: [],
    orgInfo: {
      organCode: "",
      organFullName: "",
      organId: 0,
      organName: "",
      organStat: 0,
      deptId: 0,
      deptName: "",
      isBackDept: "",
      rootDept: "",
    },
    businessDate: {
      nextDay: 0,
      trday: 0,
      preDay: 0,
    },
    expiredHold: [],
    permissions: [],
    authUserInfo: {},
    sysCfgInfo: [],
  }),
  getters: {
    getBusinessDate(): { [key in keyof BusinessDate]: string } {
      return {
        nextDay: formatDateCn(this.businessDate.nextDay),
        trday: formatDateCn(this.businessDate.trday),
        preDay: formatDateCn(this.businessDate.preDay),
      };
    },
  },
  actions: {
    setUserInfo(info) {
      Object.assign(this.userInfo, info);
    },
    setOrgInfo(info) {
      Object.assign(this.orgInfo, info);
    },
    setRoleMenuData(data) {
      this.roleMenuData = data;
      this.initPermission();
    },
    setRoleList(data) {
      this.roleList = data;
    },
    initUserInfo() {
      this.userInfo = {
        userId: 0,
        userName: "",
        organId: 0,
        organName: "",
        roleName: "",
        roleId: 0,
        operId: 0,
        deptId: 0,
      };
      this.orgInfo = {
        organCode: "",
        organFullName: "",
        organId: 0,
        organName: "",
        organStat: 0,
        deptId: 0,
        deptName: "",
        isBackDept: "",
        rootDept: "",
      };
    },
    async changeRole(role) {
      const {
        organId,
        organName,
        roleName,
        roleId,
        operId,
        organCode,
        organFullName,
        organStat,
        deptId,
      } = role;
      const { data } = (await httpClient?.post(`authUser/switchRole`, {
        roleId: roleId,
      })) as any;
      setToken(data?.token ?? "");

      this.setUserInfo({
        organId,
        organName,
        roleName,
        roleId,
        operId,
        deptId,
      });
      this.setOrgInfo({
        organId,
        organName,
        organCode,
        organFullName,
        organStat,
      });
      router.push({
        path: usePagePath().BASE_HOME,
      });
    },
    // 请求业务日期
    setBusinessDate() {
      httpClient?.post("sysCalendar/queryBusinessDate", {}).then((res) => {
        this.businessDate = res.data;
      });
    },
    // 请求当前业务日期即将过期的持仓
    async setExpiredHold() {
      const { data } = (await httpClient?.post("message/getExpiredHold", {})) as any;
      this.expiredHold = data?.reduce((pre, cur) => {
        const securityList = {};
        const { investCode, investName } = cur;
        cur.securityList.forEach((item) => {
          const { expiredDay, marketCode, marketAbbr } = item;
          if (expiredDay < 0) return;
          if (!securityList[expiredDay]) {
            securityList[expiredDay] = [
              {
                marketCode,
                marketAbbr,
              },
            ];
          } else {
            securityList[expiredDay].push({
              marketCode,
              marketAbbr,
            });
          }
        });
        Object.values(securityList).length > 0 &&
          pre.push({
            investCode,
            investName,
            securityList,
          });
        return pre;
      }, []);
    },
    getAllCfgs(data?) {
      if (data) {
        Object.assign(this.sysCfgInfo, data);
        return;
      }
      httpClient?.get("sysCfg/queryAllCfgs").then((res) => {
        this.sysCfgInfo = res.data;
      });
    },
    setAuthUserInfo(data?) {
      if (data) {
        Object.assign(this.authUserInfo, data);
        return;
      }
      httpClient?.post("authUser/getUserInfo", {}).then((res) => {
        this.authUserInfo = res.data;
      });
    },
    initPermission() {
      const flattenedMenuList = flatten(this.roleMenuData);
      this.permissions = flattenedMenuList
        .filter((item) =>
          [MenuTypeDataEnum.TAB, MenuTypeDataEnum.BUTTON].includes(
            (item.menuType + "") as MenuTypeDataEnum,
          ),
        )
        .map(
          (item) =>
            pick(item, [
              "menuId",
              "menuType",
              "menuCode",
              "parentMenu",
              "children",
              "loadType",
            ]) as Fia6Menu,
        ); 
    },
  },
});

export function useSystemStoreWithOut() {
  return useSystemStore(store);
}
export type SystemStoreType = ReturnType<typeof useSystemStore>;
```


```ts
// types.ts
import { defineComponent } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  query?: object;
}

export interface MenuTag {
  type?: "primary" | "error" | "warn" | "success";
  content?: string;
  dot?: boolean;
}

export interface Menu {
  children: Menu[];
  favoriteFlag: string;
  loadType: string;
  menuIcon: string;
  path: string;
  fullPath?: string;
  menuId: string;
  menuName: string;
  menuStatus: string;
  menuType: string;
  menuUrl: string;
  parentMenu: string;
  meta?: Partial<RouteMeta>;
  permissionAlias: string;
  prevMenu: string;
  remark: string;
  rightFlag: string;
  // 菜单拓展属性
  [key: string]: unknown;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;
```
<!-- http -->
```ts
import { STATUS_ALIAS, STATUS_MSG, THROW_MSG } from "/@/template/constants";
import { USER_NO_KEY } from "/@/template/enums";
import { useGlobSetting, usePagePath } from "/@/template/hooks";
import { useLocale } from "/@/template/locales";
import { router } from "/@/template/router";
import { LOCALE } from "/@/template/settings/localeSetting";
import { useAppStoreWithOut } from "/@/template/store/modules/app";
import { useUserStoreWithOut } from "/@/template/store/modules/user";
import { RequestOptions } from "/@/template/types/axios";
import {
  encrypt_ECB,
  removeSessionStorage,
  setLocalStorage,
  setSessionStorage,
  setJWT,
  getJWT,
  removeJWT,
  getTerminalInfo,
} from "/@/template/utils";
import { createSessionStorage } from "/@/template/utils/cache";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import Cookies from "js-cookie";
import fileDownload from "js-file-download";
import { cloneDeep } from "lodash-es";
import nprogress from "nprogress";
import {
  isInIframe,
  sessionExpiration,
  showMessage as showMessageInIframe,
  handleShowMessage as handleShowMessageNotInIframe,
} from "/@/template/utils/IframeMode";

const globSetting = useGlobSetting();

const ss = createSessionStorage();

export interface IKocaOptions {
  interceptorsRequest?(config: AxiosRequestConfig): AxiosRequestConfig;
  interceptorsResponse?(response: AxiosResponse): AxiosResponse | Promise<any>;
  requestFormatter?(config: AxiosRequestConfig, option: IKocaOptions): AxiosRequestConfig;
  responseFormatter?(response: AxiosResponse, option: IKocaOptions): IKocaResponse;
  errorFormatter?(error: AxiosError | any, option?: IKocaOptions, config?: AxiosRequestConfig): any;
  waiting_tip?: number;
  page?: string;
  validateStatus?(status: number): boolean;
  downloadFile?: boolean;
  // 如果地址中存在/undefined, 则该请求不发送
  autoCancel?: boolean;
  timeout?: number;
  headers?: any;
  config?: AxiosRequestConfig;
  isReturnNativeResponse?: boolean;
  isTransformResponse?: boolean;
  joinPrefix?: boolean;
  urlPrefix?: string;
  encrypt?: boolean;
  successMsg?: string;
  msgDuration?: number;
  [propName: string]: any;
  sessionExpirationMessage?: boolean;
}

export interface IKocaResponse<T = any> {
  response: AxiosResponse;
  code?: string;
  msg?: string;
  detail?: string;
  total?: number;
  data: T;
  header?: object;
}

export interface IKocaAxiosRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

const VALIDATE_STATUS = Object.keys(STATUS_MSG).map(Number);

let showSessionExpirationMessageBoxFlag = false;

export const handleSessionExpiration = (data) => {
  data = data || {
    messageAlert: false,
    redirectUri: "",
    expireRedirect: false,
    fullPath: "",
  };
  const { messageAlert, redirectUri, expireRedirect } = data;
  const fullPath = router?.currentRoute?.value?.fullPath ?? data.fullPath;
  const userStore = useUserStoreWithOut();
  userStore.setToken(undefined);
  const callback = async () => {
    await userStore.logout(false);
    if (redirectUri) {
      const toPath = expireRedirect
        ? `${redirectUri}?redirect=${encodeURIComponent(fullPath)}`
        : redirectUri;
      window.location.href = toPath;
    } else {
      const toPath = expireRedirect
        ? `${usePagePath().BASE_LOGIN}?redirect=${encodeURIComponent(fullPath)}`
        : usePagePath().BASE_LOGIN;
      router.push(toPath);
    }
  };
  if (showSessionExpirationMessageBoxFlag) {
    return;
  }
  if (!messageAlert) {
    callback();
  } else {
    showSessionExpirationMessageBoxFlag = true;
    ElMessageBox.alert("当前会话已过期，请重新登录", "提示", {
      confirmButtonText: "重新登录",
      callback: async (action) => {
        showSessionExpirationMessageBoxFlag = false;
        if (action === "confirm") {
          await callback();
        }
      },
    });
  }
};

export const handleShowMessage = (elMessageOption) => {
  if (isInIframe()) {
    showMessageInIframe(elMessageOption);
  } else {
    handleShowMessageNotInIframe(elMessageOption);
  }
};

let loadingInstance = {};
// 默认构造器参数
export const kocaOptions: IKocaOptions = {
  // 拦截器 请求前触发
  interceptorsRequest(config: AxiosRequestConfig) {
    const appStore = useAppStoreWithOut();
    // axios的GET请求，不会对[]等特殊字符转码
    if (config.method?.toUpperCase() === "GET" && config.params) {
      let url = config.url;
      url += "?";
      for (const key of Object.keys(config.params)) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
      config.url = url?.substring(0, url.length - 1);
      config.params = {};
    }

    // 解决火狐浏览器GET接口缓存问题
    if (config.method?.toUpperCase() === "GET") {
      config.headers["Cache-Control"] = "no-cache";
    }

    if (appStore.projectConfig?.checkHardwareEnable) {
      const terminalInfo = getTerminalInfo();
      if (terminalInfo) {
        config.headers["Hardware-Info"] = encrypt_ECB(terminalInfo, "");
      }
    }

    // if (config.url && config.url.startsWith('/')) {
    //   config.baseURL = '';
    // }
    if (
      config.data &&
      config?.headers &&
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  sessionExpirationMessage: false,
  sessionExpirationMessageEnabled: null,
  // 拦截器，处理请求应答
  async interceptorsResponse(response: AxiosResponse) {
    const appStore = useAppStoreWithOut();
    const { status, headers } = response;
    let { data } = response;
    const contentTypeKey = Object.keys(headers).find((key) => key.toLowerCase() === "content-type");
    if (contentTypeKey && headers[contentTypeKey].includes("application/json")) {
      // 文件下载，如果返回的是json数据，需要转换格式为JSON:
      if (data instanceof Blob) {
        try {
          data = JSON.parse(await data.text());
        } catch {
          return Promise.reject(response);
        }
      }

      if (status >= 200 && status < 300) {
        if (data && data.code && data.code !== "0") {
          // 后台约定的错误码 不等于0报错。
          return Promise.reject(data);
        }
        return Promise.resolve(response);
      } else if (VALIDATE_STATUS.indexOf(status) !== -1) {
        if (status === STATUS_ALIAS.SESSION_EXPIRATION) {
          const fullPath = router.currentRoute.value.fullPath;
          if (fullPath && !fullPath.startsWith(usePagePath().BASE_LOGIN)) {
            const expireRedirect = appStore?.projectConfig?.expireRedirect;
            let messageAlert = response?.config?.requestOptions?.sessionExpirationMessage;
            const sessionExpirationMessageEnabled =
              response?.config?.requestOptions?.sessionExpirationMessageEnabled;
            const redirectUri = data.body?.redirectUri;
            const url = (response?.config?.url || "") as string;
            if (url && url.includes(appStore?.getFrameUrlList?.logout)) {
              messageAlert = false;
            }
            if (sessionExpirationMessageEnabled) {
              messageAlert = sessionExpirationMessageEnabled(url);
            }
            const sessionExpirationData = {
              messageAlert,
              redirectUri,
              expireRedirect,
              fullPath,
            };
            const isWujie = window.__POWERED_BY_WUJIE__;
            if (isWujie || isInIframe()) {
              sessionExpiration(sessionExpirationData);
            } else {
              handleSessionExpiration(sessionExpirationData);
            }
          }
        }
        const msg = STATUS_MSG[status]
          ? STATUS_MSG[status][useLocale()?.getLocale.value]
          : STATUS_MSG["unknown"][useLocale()?.getLocale.value];
        return Promise.reject({ status, msg });
      }
    }

    return Promise.resolve(response);
  },

  // 请求体转换方法
  requestFormatter(config: AxiosRequestConfig, option: IKocaOptions) {
    const appStore = useAppStoreWithOut();
    const lang =
      useLocale()?.getLocale.value === "en"
        ? "en-US"
        : useLocale()?.getLocale.value || LOCALE.ZH_CN;
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Lang: lang,
    };
    if (appStore.getAppSettings.JWT_TOKEN_ENABLE) {
      const token = getJWT();
      if (token) {
        const Authorization = "Bearer " + (token || "");
        config.headers["Authorization"] = Authorization;
      }
    } else {
      removeJWT();
      removeSessionStorage("token");
    }
    if (option.headers) {
      config.headers = Object.assign(config.headers, option.headers);
    }
    // 超时设置
    if (option.timeout) {
      config.timeout = option.timeout;
    }
    // Axios的其他配置可以在option.config中设置
    if (option.config) {
      Object.assign(config, option.config);
    }

    // 文件下载
    if (option.downloadFile) {
      config.responseType = "blob";
    }

    if (config.data && config.data.constructor === FormData && config.headers) {
      delete config.headers["Accept"];
      delete config.headers["Content-Type"];
    }
    return config;
  },
  // 转换结果集的方法。
  responseFormatter(response: AxiosResponse, option: IKocaOptions) {
    const appStore = useAppStoreWithOut();
    let res: IKocaResponse;
    if (appStore.getAppSettings.JWT_TOKEN_ENABLE) {
      const token = response.headers["authorization"];
      if (token) {
        setJWT(token);
        //兼容v2
        setSessionStorage("token", token, false);
        setLocalStorage("token", token, false);
      }
    }

    const { isTransformResponse, isReturnNativeResponse } = option;
    if (isReturnNativeResponse) {
      return response;
    }
    if (!isTransformResponse) {
      return response.data;
    }
    // 文件下载
    if (option.downloadFile) {
      const disposition = response.headers["content-disposition"];
      if (disposition) {
        const matched = disposition.match(/filename=(.*)/i);
        matched && fileDownload(response.data, decodeURIComponent(matched[1]));
      }
      res = {
        response: response,
        data: response.data,
        msg: response.data?.msg,
        code: response.data?.code,
      };
    } else {
      const { data } = response;
      // 成功的返回数据，对结果集做转换处理。
      if (data) {
        res = {
          response: response,
          code: data.code,
          msg: data.msg,
          detail: data.detail,
        };
        const { body } = data;
        if (body) {
          if (body.constructor === Array) {
            // 后台直接返回数组
            res.total = body.length;
            res.data = body;
          } else if (body.constructor === Object && body.total !== undefined && body.data) {
            // 后台分页
            res.total = body.total;
            res.data = body.data;
          } else {
            // 其他情况
            res.data = body;
          }
        } else {
          res.data = body;
        }
      } else {
        res = {} as IKocaResponse;
      }
    }
    return res;
  },
  // 默认等待类型 0-无提示，1-loading提示（ELoading），2-进度条提示（nprogress插件）
  waiting_tip: 2,
  // 那些返回状态当做成功返回 401：会话过期，403：无权限。429: 访问次数过于频繁，请稍候再试
  validateStatus(status: number) {
    return VALIDATE_STATUS.indexOf(status) !== -1 || (status >= 200 && status < 300);
  },
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse: false,
  // 是否需要对返回数据进行处理
  isTransformResponse: true,
  // 是否拼接请求url
  joinPrefix: true,
  urlPrefix: globSetting.urlPrefix,
};

export class AxiosClass {
  private instance!: AxiosInstance;
  private options: IKocaOptions;

  // 构造器
  // options 默认的参数配置
  public constructor(options: IKocaOptions) {
    this.options = options;
    this.createInstance();
    this.initInterceptorsRequest();
    this.initInterCeptorsResponse();
  }

  // 创建 axios 对象
  private createInstance() {
    const config: AxiosRequestConfig = {
      baseURL: "/",
      method: "GET",
      responseType: "json",
    };
    if (typeof this.options.validateStatus === "function") {
      config.validateStatus = this.options.validateStatus;
    }
    this.instance = axios.create(config);
  }

  // 构造请求拦截器
  private initInterceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: IKocaAxiosRequestConfig) => {
        const { joinPrefix, urlPrefix } = config.requestOptions || {};
        if (globSetting?.customConfig?.BASE_URL) {
          config.baseURL = globSetting?.customConfig?.BASE_URL;
        }
        if (joinPrefix && !config.url?.startsWith("http") && urlPrefix) {
          if (config.url?.startsWith("/") && urlPrefix.endsWith("/")) {
            config.url = urlPrefix + config.url.substring(1);
          } else if (!config.url?.startsWith("/") && !urlPrefix.endsWith("/")) {
            config.url = urlPrefix + "/" + config.url;
          } else {
            config.url = urlPrefix + config.url;
          }
        }
        // 请求开始前
        if (typeof this.options.interceptorsRequest === "function") {
          return this.options.interceptorsRequest(config);
        } else {
          return config;
        }
      },
      (error) => {
        // 请求错误
        return Promise.reject(error);
      },
    );
  }

  // 构造响应拦截器
  private initInterCeptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        // 响应结果
        if (typeof this.options.interceptorsResponse === "function") {
          return this.options.interceptorsResponse(response);
        } else {
          return response;
        }
      },
      (error) => {
        // 响应错误
        return Promise.reject(error);
      },
    );
  }

  /**
   * 所有请求触发点 request
   * @param config 请求对象
   * @param option 当前请求可以设置的一些参数
   * waiting_tip: 等待类型 0-无提示，1-loading提示（ELoading），2-进度条提示（nprogress插件）
   * downloadFile: 是否是文件下载
   */
  private async request<T = any>(config: AxiosRequestConfig, option?: IKocaOptions): Promise<T> {
    let conf: IKocaAxiosRequestConfig = cloneDeep(config);
    // 如果地址中存在/undefined, 并且开启autoCancel, 则取消该请求
    if (conf.url && conf.url?.indexOf("/undefined") > -1 && option?.autoCancel) {
      throw "💡系统提示：检测到地址" + conf.url + "不合法,自动取消该请求！";
    }
    const userStore = useUserStoreWithOut();
    const appStore = useAppStoreWithOut();
    // 是否登录多个用户
    if (
      ss.get(USER_NO_KEY) &&
      userStore.userInfo &&
      userStore.userInfo.userNo &&
      ss.get(USER_NO_KEY) !== userStore.userInfo.userNo
    ) {
      const fullPath = appStore.getTags.orders.slice(-1)[0];
      if (fullPath && !fullPath.startsWith(usePagePath().BASE_LOGIN)) {
        // router.push(`${usePagePath().BASE_LOGIN}?redirect=${encodeURIComponent(fullPath)}`);
        router.push(`${usePagePath().BASE_LOGIN}?redirect=${fullPath}`);
      }
      userStore.resetState();
      const msg = THROW_MSG.MULTIPLE_USER_LOGIN[useLocale()?.getLocale.value];
      ElMessage({
        showClose: true,
        message: msg,
        type: "error",
        duration: 3000,
      });
      const err = { msg: msg };
      throw err;
    }

    if ((appStore.getApiEncrypt || option?.encrypt) && conf.method !== "GET") {
      const apiEncryptDynamicKey = appStore.getApiEncryptDynamicKey;
      conf.data = encrypt_ECB(JSON.stringify(conf.data), apiEncryptDynamicKey);
    }
    conf.timeout = appStore.getFrameUrlList.queryProfiles
      ? appStore.frontProfiles.timeout
      : globSetting?.customConfig?.TIMEOUT || 1800000;
    option = Object.assign({}, this.options, option);

    // 将请求的配置放到请求对象中，方便对每一次请求进行特殊处理
    conf.requestOptions = option;
    if (typeof option.requestFormatter === "function") {
      if (option.requestFormatter.constructor.name === "AsyncFunction") {
        conf = await option.requestFormatter(conf, option);
      } else {
        conf = option.requestFormatter(conf, option);
      }
      // 增加对xsrf攻击处理
      const xsrftoken = Cookies.get("XSRF-TOKEN");
      if (xsrftoken && conf.headers) {
        conf.headers["X-XSRF-TOKEN"] = xsrftoken;
      }
    }
    const path = router.options.history.location ? router.options.history.location : "";
    try {
      this.requestBegin(option, path);
      const response = await this.instance.request(conf);
      this.requestEnd(option, path, response);
      let res;
      if (typeof option.responseFormatter === "function") {
        res = option.responseFormatter(response, option);
      } else {
        res = response;
      }
      return res;
    } catch (error: any) {
      this.requestEnd(option, path);
      // 如果用户自定义，优先处理用户自定义的错误;
      const errorFormatter = option.errorFormatter;
      if (typeof errorFormatter === "function") {
        return errorFormatter(error, option, config);
      }
      // 没有自定义，默认处理报错信息方法：
      // 1. 如果有msg，则提示msg
      // 2. 如果没有msg，则提示status+statusText
      // 3. 断网的情况，提示message
      let message = error;
      // 返回axiosError类型的错误
      if (error.isAxiosError) {
        if (error.response) {
          message = error.response.status + ": " + error.response.statusText;
        } else if (error.code) {
          message = error.code && error.code + ": " + error.message;
        } else {
          // 断网时没有code
          message = error.message;
        }
      }
      // 后端返回报错
      if (error.msg) {
        message = error.msg;
      }
      // 服务器报错 4XX、5XX
      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      const elMessageOption = {
        showClose: true,
        message: message,
        type: "error",
        grouping: true,
        duration: 3000,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error?.response?.data || error,
        headers: error?.response?.headers,
      };
      // 解决token验证过期,返回登录页面,因为发送多次请求,导致消息多次提示的问题.
      if (error.status && error.status === STATUS_ALIAS.SESSION_EXPIRATION) {
        if (ss.get(USER_NO_KEY)) {
          handleShowMessage(elMessageOption);
        }
        ss.remove(USER_NO_KEY);
      } else {
        handleShowMessage(elMessageOption);
      }
      throw error;
    }
  }

  // 请求开始
  private requestBegin(option: IKocaOptions, path) {
    const { waiting_tip, page } = option;
    if (waiting_tip === 1) {
      this.showLoading(page || path);
    } else if (waiting_tip === 2) {
      nprogress.start();
    }
  }

  // 请求结束
  private requestEnd(option: IKocaOptions, path, response?: AxiosResponse) {
    const { waiting_tip, page } = option;
    if (waiting_tip === 1) {
      this.hideLoading(page || path);
    } else if (waiting_tip === 2) {
      nprogress.done();
    }
    if (response) {
      this.showSuccessMessage(option, response);
    }
  }

  // 显示成功提示消息（复核接口显示接口返回的msg）
  private showSuccessMessage(option: IKocaOptions, response: AxiosResponse) {
    const { data, status, statusText, headers } = response;
    if (status >= 200 && status < 300 && data?.code === "0") {
      const appStore = useAppStoreWithOut();
      const { successMsg } = option;
      let msg = successMsg;
      if (appStore.getProjectConfig?.showReviewRequestMsg && data?.head?.checkflag) {
        msg = data.msg;
      }
      if (msg) {
        const elMessageOption = {
          showClose: true,
          message: msg,
          type: "success",
          duration: 3000,
          status,
          statusText,
          data,
          headers,
        };
        handleShowMessage(elMessageOption);
      }
    }
  }

  // 显示loading
  private showLoading(path) {
    // 如果没有loading或者loading未关闭，则显示
    if (!loadingInstance[path]) {
      // 没有当前页面的loading， loading数 为1
      const nodes = document.querySelectorAll(`[loading-id="${path}"]`);
      const target = nodes[nodes.length - 1];
      const instance = ElLoading.service({
        lock: true,
        text: "Loading",
        target: target as HTMLElement,
        customClass: "frame-loading",
      });
      loadingInstance[path] = { instance, close: false, count: 1 };
    } else if (loadingInstance[path] && loadingInstance[path].close) {
      // 有当前页面的loading, 且loading被关闭，loading数 + 1
      const nodes = document.querySelectorAll(`[loading-id="${path}"]`);
      const target = nodes[nodes.length - 1];
      let instance = loadingInstance[path]?.instance;
      if (target) {
        instance = ElLoading.service({
          lock: true,
          text: "Loading",
          target: target as HTMLElement,
        });
      }
      loadingInstance[path] = { instance, close: false, count: loadingInstance[path].count + 1 };
    } else if (loadingInstance[path]) {
      // 有当前页面的loading, 且loading正在显示， ，loading数 + 1
      // 记录当前页面的loading数
      loadingInstance[path].count += 1;
    }
  }
  // 关闭loading
  private hideLoading(path) {
    // 如果当前页面有loading正在加载，切换另一个页面时，如果上一个加载完成，则状态为true
    if (loadingInstance[path]) {
      loadingInstance[path].count -= 1;
      // 成功后关闭页面最后一个loading
      if (loadingInstance[path].count === 0) {
        if (path !== router.options.history.location) {
          loadingInstance[path].close = true;
        } else {
          this.delLoadingInstance(path);
        }
        this.delLoadingInstance(path);
      }
    }
  }
  // 删除loading记录
  private delLoadingInstance = (path) => {
    if (loadingInstance[path]) {
      if (loadingInstance[path].count === 0) {
        loadingInstance[path].instance.close?.();
        delete loadingInstance[path];
        const data = {};
        Object.keys(loadingInstance).forEach((item) => {
          if (item !== path) {
            data[item] = loadingInstance[item];
          }
        });
        loadingInstance = {
          ...data,
        };
      }
    }
  };

  async get<T = any>(url: string, data?: any, option?: IKocaOptions): Promise<IKocaResponse<T>> {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: url,
      params: data,
    };
    return this.request(config, option);
  }

  async post<T = any>(url: string, data?: any, option?: IKocaOptions): Promise<IKocaResponse<T>> {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: url,
      data: data,
    };
    return this.request(config, option);
  }

  async put<T = any>(url: string, data?: any, option?: IKocaOptions): Promise<IKocaResponse<T>> {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: url,
      data: data,
    };
    return this.request(config, option);
  }

  async patch<T = any>(url: string, data?: any, option?: IKocaOptions): Promise<IKocaResponse<T>> {
    const config: AxiosRequestConfig = {
      method: "PATCH",
      url: url,
      data: data,
    };
    return this.request(config, option);
  }

  async delete<T = any>(url: string, data?: any, option?: IKocaOptions): Promise<IKocaResponse<T>> {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: url,
      data: data,
    };
    return this.request(config, option);
  }
}

const getLoadingInstance = function () {
  return loadingInstance;
};
// const httpClient = new AxiosClass(kocaOptions);
let httpClient: AxiosClass | null = {} as AxiosClass;

const initHttpClient = (adaptorOptions) => {
  // 自定义配置参数
  const options = Object.assign<IKocaOptions, IKocaOptions, IKocaOptions>(
    {},
    kocaOptions,
    adaptorOptions,
  );

  httpClient = new AxiosClass(options);
};
export { getLoadingInstance, httpClient, initHttpClient };
```