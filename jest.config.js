module.exports = {
  "testMatch": ["**/__tests__/**/*.test.[jt]s?(x)"],  //从哪里找测试文件   tests下的
  "moduleFileExtensions": [ //测试模块倒入的后缀
    "js",
    "json",
    // 告诉 Jest 处理 `*.vue` 文件
    "vue",
    "ts"
  ],
  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    // 用 `babel-jest` 处理 js 降
    ".*\\.(js|ts)$": "babel-jest" 
  },
  "moduleNameMapper" : {
    "\\.(css|less|scss|sss|styl)$" : "<rootDir>/node_modules/jest-css-modules"
  }
}