# 打包插件命令： yarn buildTiny:dev
# 打包插件对应的主题命令： yarn build:theme  


该项目使用yarn管理，下载。

storybook 指定了6.2.9 版本  6.3版本 无法生docs 纯文档   官方6.3都有这个问题  等待官方解决 后再考虑是否升级把

组件库swiper  用了项目中的dhn-swiper  因为原版 swiper 在setup阶段调用了默认插槽获取值  会有问题


组件库的代码逻辑在packages文件中
dist中的package.json依据el中的package.json和最外部的package.json（生产依赖配置，Vue的版本指定） 结合生成


storybook 启动本地开发
storybookPre 命令是生成本地预览
build-storybook 命令生成文档，同步到dhn-ui项目中的build中

build:dev 命令是构建项目，未压缩
build:prod 构建项目，压缩

注意：theme-chalk 中的样式需要-的形式，如果有驼峰需要手动更改

构建之前 需要下载一个全局包   -g increase-memory-limit

然后在当前组件库所在 目录执行increase-memory-limit   来扩展一下node执行内存

部署：
1、build:dev
2、登录npm（需要有部署权限）
3、cd /dist
4、处于npm源
5、npm pub
6、同步ui 文档




