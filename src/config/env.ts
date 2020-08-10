// 是否开发环境
const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';

// 是否生产环境
const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

export { IS_DEVELOPMENT, IS_PRODUCTION };
