const ip = '10.201.78.8'; // 服务器地址
const port = '3030'; // 3030在后端项目中写死，可以到后端项目中修改
export const BASE_URL = `http://${ip}:${port}`; // 后端请求地址
export const STATIC_URL = `http://${ip}`; // 前端网站地址
// 小报展示外部博客地址
export const otherBlogs = [
  'https://javascriptweekly.com/issues/latest?layout=bare',
  'https://frontendfoc.us/issues/latest?layout=bare',
  'https://nodeweekly.com/issues/latest?layout=bare',
  'https://mobiledevweekly.com/issues/latest?layout=bare',
];

// 其他链接地址
export const links = {
  // 前端文档跳转地址
  frontDocument: 'https://www.yuque.com/zaotalk/ued/zooteam',
  // 一键内推跳转地址
  recommendationLink: 'https://www.yuque.com/zaotalk/ued/zooteam',
};
