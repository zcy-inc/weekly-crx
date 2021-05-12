# weekly-crx

## 介绍

政采云 ZooTeam 开发的前端小报 Chrome 浏览器插件，用于公司内部学习交流，主要功能有：

- 供公司内部开发者随手投稿看到的优秀文章，支持自动读取页面文章标题、描述等。

- 支持便捷展示国一些高质量博客的推送文章，方便随手查阅。

- 支持便捷查看公司内部不同周数的小报。

- 支持按照技术分类标签查询投稿的相关文章。

## 本地启动

```
$ npm run dev
```

访问 `chrome://extensions/` ，开启 `开发者模式`，点击 `加载已解压的扩展程序`，文件夹路径指向 `dist/`。（注：每次修改代码后，点击插件图标，需耐心等待十余秒左右重新加载渲染，才可展示。）

### 提交前打包

```
$ npm run build
```

将 zip/ 路径下的 .zip 文件上传 Google 扩展应用管理

## 主要依赖项

- [element-ui 2.x](https://www.npmjs.com/package/html-webpack-plugin)
- [webpack-chrome-extension-reloader](https://www.npmjs.com/package/webpack-chrome-extension-reloader)
- [fdaciuk/ajax](https://github.com/fdaciuk/ajax)

## 扩展配置

- 在`/src/config/develop.json` 文件下支持配置您的常用推荐模块的图片、文字、链接
- 在`/src/config/config.js` 文件下，修改 `otherBlogs` 配置其他滚动展示的博客页面；修改`links` 配置团队前端文档跳转地址、内推按钮跳转地址等（默认以政采云团队团队介绍为链接）
- 在`src/config/books.json` 文件下，配置图书馆，修改 `source` 配置跳转链接，（默认以政采云团队掘金主页为链接）

## 参考文档

- [Chrome Developers ——Document > Extensions](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
