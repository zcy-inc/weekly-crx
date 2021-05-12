<template>
  <div
    id="app"
    class="app"
  >
    <el-card class="wrapper">
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="17">
          <div class="grid-content bg-purple-light">
            <el-card
              v-for="(item, index) in articles"
              :key="index"
              class="item"
              shadow="hover"
            >
              <a
                class="item__link"
                :href="item.link"
                target="_blank"
              >
                <h3 class="item__title">
                  {{ item.title }}
                  <span class="item__date">推荐时间：{{ timestampToTime(item.timestamp) }}</span>
                </h3>

                <p class="item__description">{{ item.description }}</p>
              </a>
            </el-card>
            <div
              v-if="articles.length === 0"
              class="item__empty"
            >
              现在暂无该方向的文章，有好文推荐投稿哦~
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <h2 class="tag__title">
              □ 当前标签
            </h2>
            <div class="tag__contain">
              <el-tag type="success">
                {{ pageTitle }}
              </el-tag>
            </div>

            <h2 class="tag__title">
              □ 更多标签
            </h2>
            <div class="tag__contain">
              <li
                v-for="(catItem, itemIndex) in weeklyCats"
                :key="itemIndex"
                class="cat__item"
                :data-tag="catItem.name"
                @click="handleOpenArticlePage"
              >
                {{ catItem.name }}
              </li>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ajax from '@fdaciuk/ajax';
import { BASE_URL } from '../config';
import { getUrlParam } from '../utils';

export default {
  data() {
    return {
      articles: [],
      weeklyCats: [],
      pageTitle: decodeURI(getUrlParam('tag')),
    };
  },
  beforeCreate() {
    const host = this;

    ajax({
      method: 'get',
      url: `${BASE_URL}/api/articles/category?category=${getUrlParam('tag')}`,
    }).then((response) => {
      host.articles = response.reverse();
    });

    ajax({
      method: 'get',
      url: `${BASE_URL}/api/categories/list`,
    }).then((response) => {
      host.weeklyCats = response;
    });
  },
  methods: {
    timestampToTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const Y = `${date.getFullYear()}-`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
      const D = `${date.getDate()} `;

      return Y + M + D;
    },
    handleOpenArticlePage(ev) {
      window.location.href = chrome.extension.getURL(`${'article.html?tag='}${ev.target.innerText}`);
    },
  },
};
</script>

<style>
    body {
        background: #fbfbfb;
        font-family: "Helvetica Neue",Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .app {
        margin: 30px 0;
    }

    .tag__title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .tag__contain {
        margin-bottom: 30px;
    }
    .cat__item {
        margin: 5px;
        height: 20px;
        padding: 0 5px;
        line-height: 19px;
        background-color: rgba(64,158,255,.1);
        display: inline-block;
        font-size: 12px;
        color: #409eff;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
        cursor: pointer;
    }
    .cat__item:hover {
        background-color: rgba(64,158,255,.2);
    }

    .wrapper {
        width: 80%;
        margin: 0 auto;
    }

    .item {
        margin-bottom: 30px;
        background: #FFF;
    }

    .item .el-card__body {
        padding-top: 10px;
    }
    .item__date {
        font-size: 13px;
        font-weight: normal;
        color: #888;
        float: right;
    }

    .item__empty {
        margin: 50px auto;
        text-align: center;
    }
    .item__link {
        display: block;
        /*padding: 15px 25px;*/
        text-decoration: none;
    }

    .item__title {
        line-height: 56px;
        font-size: 17px;
        font-weight: bold;
        color: #333;
    }

    .item__description {
        padding: 0 10px;
        font-size: 14px;
        color: #8c8b8b;
        line-height: 1.5;
    }
</style>
