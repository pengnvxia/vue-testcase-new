// 是否开发环境
const IS_DEVELOPMENT: boolean = process.env.VUE_APP_SERVER === 'development';

// 是否测试环境
const IS_TESTSERVER: boolean = process.env.VUE_APP_SERVER === 'devServer';

// 是否生产环境
const IS_PRODUCTION: boolean = process.env.VUE_APP_SERVER === 'prodServer';

export { IS_DEVELOPMENT, IS_TESTSERVER, IS_PRODUCTION };
