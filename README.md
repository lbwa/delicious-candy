# delicious-candy

这个应用的诞生不仅仅是为了提高自己的 JS 代码水平与模块组织思维，也还是在样式布局方面，以严格的生产标准要求自己，完全复原设计稿。

## 编码风格

本实例中 JS 编写风格是参考 [JavaScript Standard Style][standard]

本实例模块组织以及 Vue 代码风格是参考 [Vue.js 风格指南 (Beta)][vue-style]

## 项目主要结构

```
├── build                            // 配置文件
|
├── mock
|    └──data.json                    // 模拟数据
|
├── config                           // 环境配置
|
├── src                              // 生产目录
|    ├── api                         // 集中所有调用的接口
|    ├── assets                      // 图片资源，将会转为 base 64 格式存于打包 JS 中
|    ├── common                      // 公共css fonts webfont
|    ├── components                  // 单文件组件
|    |     ├── AppHeader             // header
|    |     ├── AppTab                // 导航
|    |     ├── ContentGoods          // 商品页
|    |     ├── ContentRatings        // 评价页
|    |     └── ContentSeller         // 商家页
|    ├── App.vue                     // 主页面组件
|    ├── router                      // 路由配置
|    |     └── index.js              // 路由入口
|    └── main.js                     // Webpack 预编译入口
├── static                           // 静态资源，其中包含 reset.css
├── index.html                       // 项目入口文件
└── package.json                     // 项目依赖
```


[standard]:https://github.com/standard/standard

[vue-style]:https://cn.vuejs.org/v2/style-guide/