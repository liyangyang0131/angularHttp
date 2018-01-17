1.proxy-conf.json  使用更改默认端口，并配置proxy.config.json进行跨域访问

2.npm安装cnpm报错
首先输入以下命令并回车
npm set registry https://registry.npm.taobao.org # 注册模块镜像
npm set disturl https://npm.taobao.org/dist # node-gyp 编译依赖的 node 源码镜像
npm cache clean --force # 清空缓存

然后再
npm install -g cnpm --registry=https://registry.npm.taobao.org

3.
