# eleme-candy

这个应用的诞生仅仅是为了提高自己的 JS 代码水平与样式布局能力，为了锻炼自己模块组织思维，以严格的标准要求自己，完全复原设计稿。

本应用是非商用应用。

项目总结：[点我][click-me]

[master分支][master]使用 `Global Event Bus`

[vuex分支][vuex]使用 `Vuex`

[click-me]:https://lbwa.github.io/2018/03/28/note-for-food-app/
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
|    ├── api                         // 公有接口
|    |
|    ├── assets                      // 图片资源，将会转为 base 64 格式存于打包 JS 中
|    |     └── AppHeader             // AppHeader 中引用的所有静态资源
|    |
|    ├── common                      // 公共 scss webfont
|    |
|    ├── components                  // 单文件组件
|    |     ├── AppHeader             // header
|    |     ├── AppTab                // 导航
|    |     ├── BaseCartBtn           // 基础购物车按钮
|    |     ├── BaseGoodDetail        // 基础商品详情
|    |     ├── BaseRatingsSelector   // 基础评价选择器组件
|    |     ├── BaseSplit             // 基础分割组件（仅作样式）
|    |     ├── BaseStar              // 基础星星评价组件
|    |     ├── ContentGoods          // 商品页
|    |     ├── ContentGoodsCart      // 购物车 bar
|    |     ├── ContentRatings        // 评价页
|    |     └── ContentSeller         // 商家页
|    |
|    ├── App.vue                     // 主页面组件
|    |
|    ├── router                      // 路由配置
|    |     └── index.js              // 路由入口
|    |
|    └── main.js                     // Webpack 预编译入口
|
├── index.html                       // 项目入口文件
|
└── package.json                     // 项目依赖
```


[standard]:https://github.com/standard/standard

[vue-style]:https://cn.vuejs.org/v2/style-guide/

[master]:https://github.com/lbwa/eleme-candy/tree/master

[vuex]:https://github.com/lbwa/eleme-candy/tree/vuex