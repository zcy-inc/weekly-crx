<template>
  <div
    id="app"
    class="app"
  >
    <div class="wrapper">
      <ul class="list">
        <li
          v-for="(book, bookIndex) in books"
          :key="bookIndex"
          class="item"
        >
          <a
            class="item__link"
            :href="book.source"
            target="_blank"
          >
            <div class="item__thubm__wrap">
              <img
                v-lazy="book.thumb"
                class="item__thubm"
                :alt="book.title"
              >
            </div>
            <h4 class="item__title">{{ book.title }}</h4>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import ajax from '@fdaciuk/ajax';
import books from '../config/books.json';

export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    const host = this;

    host.books = books;
  },
  created() {},
  methods: {},
};
</script>

<style>
.list {
  width: 1000px;
  margin: 30px auto;
  overflow: hidden;
}

.item {
  float: left;

  width: 150px;
  height: 250px;
  margin: 10px;
  padding: 15px 14px;

  cursor: pointer;
  transition: transform 0.2s linear;

  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 0 rgba(170, 170, 170, 0.1);
}

.item:hover {
  -webkit-transform: translate3d(0, -3px, 0);
  transform: translate3d(0, -3px, 0);

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item__link {
  display: block;
  text-decoration: none;
  color: #333;
}

.item__thubm__wrap {
  width: 150px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.item__thubm {
  display: block;
  width: 150px;
  overflow: hidden;
}

.item__title {
  margin-top: 10px;
  height: 40px;
  text-align: center;
  line-height: 20px;
  font-size: 15px;
  overflow: hidden;
}
</style>
