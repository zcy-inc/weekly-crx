<template>
  <div
    id="app"
    class="app"
  >
    <el-tabs
      v-model="activeTabName"
      type="border-card"
      @tab-click="handleTabClick"
    >
      <!-- 常用推荐 -->
      <el-tab-pane
        label="常用推荐"
        name="tab-tools"
      >
        <h3
          slot="label"
          class="app__target"
        >
          <i class="el-icon-setting" /> 常用推荐
        </h3>

        <ul class="tools">
          <li
            v-for="(group, groupIndex) in tools"
            :key="groupIndex"
            class="tools__item"
            :class="group.key"
            :data-index="groupIndex"
            @click="handleOpenDevelopPage"
          >
            <span
              class="tools__item__icon"
              :style="{ backgroundImage:`url(${group.icon})` }"
            />
            {{ group.title }}
          </li>
        </ul>
        <!-- 此处可加入贵公司的内推网址 -->
        <a
          class="button__neitui"
          :href="recommendationLink"
          target="_blank"
        >一键内推</a>
      </el-tab-pane>

      <!-- 前端学院 -->
      <el-tab-pane
        lazy
        label="前端学院"
        name="tab-recommend"
      >
        <h3
          slot="label"
          class="app__target"
        >
          <i class="el-icon-edit" /> 前端学院
        </h3>
        <el-tabs
          v-model="weekly.activeName"
          @tab-click="handelReadingTabsClick"
        >
          <el-tab-pane
            label="小报"
            name="weekly"
          >
            <el-carousel
              height="400px"
              indicator-position="none"
              :interval="5000"
            >
              <el-carousel-item>
                <ul class="weekly__list">
                  <li
                    v-for="(item, itemIndex) in weekly.data"
                    :key="itemIndex"
                    class="weekly__item"
                  >
                    <el-card shadow="hover">
                      <a
                        class="weekly__item__link"
                        :href="getWeeklyUrl({index:item.count, type:'pageLink'})"
                        target="_blank"
                      >
                        <img
                          class="weekly__item__banner"
                          :src="getWeeklyUrl({index:item.count, type:'bannerUrl'})"
                          alt=""
                        >
                        <h4 class="weekly__item__title">第 {{ item.count }} 期</h4>
                      </a>
                    </el-card>
                  </li>
                </ul>
              </el-carousel-item>
              <el-carousel-item
                v-for="(item, index) in otherBlogs"
                :key="index"
              >
                <iframe
                  :src="item"
                  frameborder="0"
                  width="368"
                  height="400"
                />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane
            label="归档"
            name="file"
          >
            <ul class="weekly__cats">
              <li
                v-for="(catItem, itemIndex) in weekly.cats"
                :key="itemIndex"
                class="weekly__cat__item"
                :style="getTagBackgroundColor()"
                :data-tag="catItem.name"
                @click="handleOpenArticlePage"
              >
                {{ catItem.name }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane
            label="投稿"
            name="recommend"
          >
            <section class="article-recommend">
              <div class="article-recommend__item">
                <h4>○ 文章标题</h4>
                <el-input
                  v-model="article.title"
                  placeholder="请输入文章的标题"
                />
              </div>
              <div class="article-recommend__item">
                <h4>○ 推荐理由</h4>
                <el-input
                  v-model="article.description"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  type="textarea"
                  placeholder="请输入推荐该文章的推荐理由"
                />
              </div>
              <div class="article-recommend__item">
                <h4>○ 投稿人花名</h4>
                <el-select
                  v-model="article.reporter"
                  filterable
                  placeholder="请选择花名"
                >
                  <el-option
                    v-for="item in originData.reporterOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="article-recommend__item">
                <h4>○ 设置分类</h4>
                <el-cascader
                  v-model="article.category"
                  expand-trigger="hover"
                  :options="originData.articleCategories"
                  :show-all-levels="false"
                />

                <el-button
                  class="article-recommend__button--submit"
                  type="primary"
                  @click="handleRecommendArticle"
                >
                  投稿
                </el-button>
              </div>
            </section>
          </el-tab-pane>
          <el-tab-pane
            label="图书馆"
            name="library"
          />
        </el-tabs>
      </el-tab-pane>

      <!-- 前端文档 -->
      <el-tab-pane
        lazy
        name="tab-docs"
      >
        <h3
          slot="label"
          class="app__target"
        >
          <i class="el-icon-tickets" /> 前端文档
        </h3>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ajax from '@fdaciuk/ajax';
import developData from '../config/develop.json';
import {
  BASE_URL, STATIC_URL, otherBlogs, links,
} from '../config';
import { showTips } from '../utils';

export default {
  data() {
    return {
      userName: '',
      activeTabName: 'tab-tools',
      tools: [],
      otherBlogs,
      recommendationLink: links.recommendationLink,
      originData: {
        articleCategories: [],
        reporterOptions: [],
      },
      weekly: {
        data: [],
        cats: [],
        activeName: 'weekly',
      },
      article: {
        title: '',
        link: '',
        description: '',
        category: '',
        reporter: '',

      },
    };
  },
  created() {
    const host = this;
    host.tools = developData;
    ajax({
      method: 'get',
      url: `${BASE_URL}/api/categories/orderedList`,
    }).then((response) => {
      const tagsData = [];

      response.forEach((item, index) => {
        tagsData[index] = {
          value: item.value,
          label: item.value,
          children: item.children && item.children.map((tag) => ({
            value: tag,
            label: tag,
          })),
        };
      });

      host.originData.articleCategories = tagsData;
    });

    // 分类阅读分类
    // 投稿分类数据
    ajax({
      method: 'get',
      url: `${BASE_URL}/api/categories/list`,
    }).then((response) => {
      host.weekly.cats = response;
    });

    // 往期小报数据
    ajax({
      method: 'get',
      url: `${BASE_URL}/api/weeks/list`,
    }).then((response) => {
      host.weekly.data = response.reverse();
    });
  },
  methods: {
    getTagBackgroundColor() {
      // eslint-disable-next-line no-bitwise
      return `background-color: #${(Math.random() * 0xffffff << 0).toString(16)}`;
    },
    getWeeklyUrl(param) {
      switch (param.type) {
        case 'pageLink':
          return `${STATIC_URL}/detail/${param.index}`;

        case 'bannerUrl':
          return `${STATIC_URL}/static/images/${param.index}.png`;
        default:
          return '';
      }
    },

    handleOpenArticlePage(ev) {
      window.open(
        chrome.extension.getURL(`${'article.html?tag='}${ev.target.dataset.tag}`),
      );
    },

    handleOpenDevelopPage(ev) {
      window.open(chrome.extension.getURL(`${'develop.html?tabIndex='}${ev.target.dataset.index}`));
    },

    handleTabClick(activeTab) {
      if (activeTab.name === 'tab-recommend') {
        const host = this;

        // 获取当前窗口 id
        chrome.tabs.query({
          active: true,
          currentWindow: true,
        }, (tabs) => {
          const tabId = tabs.length ? tabs[0].id : null;

          chrome.tabs.executeScript(tabId || null, {
            file: './contentScripts/recommend.js',
          }, () => {
            // 向目标网页进行通信
            chrome.tabs.sendMessage(tabId, {
              message: 'GET_TOPIC_INFO',
            }, (response) => {
              const localArticleReporter = localStorage.getItem('ArticleReporter');

              if (localArticleReporter) {
                host.article.reporter = localArticleReporter;
              }
              if (!response) return;
              host.article.title = response.title;
              host.article.link = response.link;
              host.article.description = response.description;
            });
          });
        });
        // 小报投稿人数据
        ajax({
          method: 'get',
          url: `${BASE_URL}/api/users`,
        }).then((response) => {
          host.originData.reporterOptions = response;
        });
      } else if (activeTab.name === 'tab-docs') {
        // 此处以政采云公司首页为例，可以替换为自己公司的文档站点
        window.open(links.frontDocument);
      }
    },

    handelReadingTabsClick(activeTab) {
      if (activeTab.name === 'library') {
        window.open(chrome.extension.getURL('books.html'));
      }
    },

    // 提交投稿
    handleRecommendArticle() {
      const host = this;

      if (!this.article.title) {
        showTips({
          type: 'error',
          text: '请填写文章标题！',
        });

        return false;
      }

      if (!this.article.description) {
        showTips({
          type: 'error',
          text: '请填写推荐理由！',
        });

        return false;
      }

      if (!this.article.reporter) {
        showTips({
          type: 'error',
          text: '请填写投稿人花名！',
        });

        return false;
      }

      if (!this.article.category) {
        showTips({
          type: 'error',
          text: '请设置文章分类！',
        });

        return false;
      }

      const request = ajax({
        method: 'post',
        url: `${BASE_URL}/api/post`,
        data: {
          title: this.article.title,
          desc: this.article.description,
          category: this.article.category[1] || '默认分类',
          link: this.article.link,
          referrer: this.article.reporter,
        },
      });

      localStorage.setItem('ArticleReporter', this.article.reporter);

      const timer = setTimeout(() => {
        request.abort();
      }, 1000);

      request.always((response, xhr) => {
        clearTimeout(timer);

        if (xhr.status === 0) {
          showTips({
            type: 'error',
            text: '网络异常！请检查网络或稍后再试',
          });
        }

        if (response.code === 1) {
          host.$message({
            showClose: true,
            message: '感谢分享，手有余香~',
            type: 'success',
            center: true,
          });

          // 重置
          host.article = {
            title: '',
            link: '',
            description: '',
            category: '',
          };
        } else {
          host.$message({
            showClose: true,
            message: response.message,
            type: 'error',
            center: true,
          });
        }
      });
      return false;
    },

  },
};
</script>

<style>
    .app {
        width: 400px;
        margin: 10px;
    }

    .app__target {
        font-size: 16px;
    }

    .button__neitui {
        display: block;
        width: 30px;
        height: 30px;
        overflow: hidden;
        color: transparent;
        text-decoration: none;
        background: url("https://sitecdn.zcycdn.com/zcy-front-other-upload/777d611d9ca74be9033162909ef8bc6f.png") no-repeat 0 0;
        background-size: contain;
        position: absolute;
        bottom: 1px;
        right: 1px;
        z-index: 10;
    }

    /* 工具入口 */
    .tools {
        overflow: hidden;

        width: 360px;
        margin: 0 auto;
        padding-top: 10px;
    }

    .tools__item {
        font-size: 14px;
        line-height: 50px;

        float: left;

        width: 108px;
        height: 50px;
        margin: 0 5px 10px;

        cursor: pointer;
        transition: transform .2s linear;
        text-align: center;

        color: #333;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        background: #f9f9f9;
    }

    .tools__item:hover {
        font-weight: bold;

        -webkit-transform: translate3d(0, -3px, 0);
                transform: translate3d(0, -3px, 0);

        color: #1296db;
        border-color: #1296db;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1), 0 4px 6px rgba(0, 0, 0, .1);
    }

    .tools__item__icon {
        line-height: 18px;

        display: inline-block;

        width: 18px;
        height: 18px;

        vertical-align: middle;

        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: cover;
    }

    .tools__item:hover .tools__item__icon {
        background-position: 100% 0;
    }

    /* 文章推荐 */
    .article-recommend__item {
        margin-bottom: 20px;
    }

    .article-recommend h4 {
        font-size: 15px;
        line-height: 40px;
    }
    .article-recommend__item__reporter {
        width: 194px;
    }

    .article-recommend__button--submit {
        float: right;
        margin: 0 auto;
    }

    /* 前端小报 */
    .weekly__list {
        width: 360px;
        margin: 0 auto;
        overflow: hidden;
        min-height: 300px;
        max-height: 400px;
        overflow-y: scroll;
    }

    .weekly__item {
        width: 110px;
        float: left;
        text-align: center;
        margin: 5px 5px 10px;
    }
    .weekly__item .el-card__body {
        padding: 12px;
    }

    .weekly__item__link {
        display: block;
        width: 100%;
        text-decoration: none;
        color: #333;
    }

    .weekly__item__banner {
        display: block;
        width: 100%;
        height: 63px;
    }

    .weekly__item__title {
        font-size: 14px;
        line-height: 30px;
        font-family: 'Pacifico', cursive;
        font-weight: bold;
    }

    .weekly__cats {
        text-align: center;
    }
    .weekly__cat__item {
        display: inline-block;
        padding: 0 10px;
        height: 28px;
        line-height: 26px;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
        margin: 5px;
        color: #FFF;
        cursor: pointer;
        transition: transform .2s linear;
    }
    .weekly__cat__item:hover {
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
    }

    .el-tabs__item {
        padding: 0 15px;
    }
</style>
