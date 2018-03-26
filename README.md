# To start
This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)

本系统采用多页面方式（每个页面是个独立SPA） 整合多个子系统系统。

* 测试环境
``` bash
# run server-side
npm run server

# run client-side
npm run dev-client


```

* 生产环境
```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run
npm run server

```



# 文件结构
```
|--server             -   服务端（提供API服务和生产环境的web服务）
|--build              -   构建
|--dist               -   构建结果目录
|--config             -   系统配置
|  |--dev.env.js
|  |--index.js 
|  |--prod.env.js 
|--models             -   数据库模型文件
|--src                -   客户端目录
|  |--api             -   外部api
|  |--assets          -   资产目录
|  |--images          -   图片
|  |--js              -   js
|  |--sytels          -   样式
|  |--uploads         -   上传
|  |--views           -   视图
|  |--router          -   客户端路由
|  |--vuex            -   状态
|--packga.json        -   项目信息
|--index.html         -   模板html

```



