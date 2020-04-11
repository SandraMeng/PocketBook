<template>
  <div class="pocketBook-list">
    <ul>
      <li v-for="(item,index) in showBill" :key="index">
        <div class="pocketBook-list-time">
          <i class="iconfont icon-riqi"></i>
          <span v-html="timeFormat(item.time)"></span>
        </div>
        <div class="pocketBook-list-type">
          <i class="iconfont icon-wsdzb_zbgzt_xxzx_sjfl"></i>
          <span v-html="item.categoryName"></span>
        </div>
        <div class="pocketBook-list-amount">
          <p v-html="(item.type == 0 ? '-': '+')+numberFormat(item.amount, 2)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getBill} from '../api/index';
import Vuex from 'vuex';
import {numberFormat, addZero} from '../utils';

export default {
  name: 'PocketBookList',
  computed: {
    ...Vuex.mapState(['showBill'])
  },
  methods: {
    timeFormat(time){
      let date = new Date(Number(time));
      return `${date.toLocaleDateString().replace(/\d+/g, num=>addZero(num)).replace(/\//g, '-')}T${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}+08:00`;
    },
    numberFormat(num, digit){
      return numberFormat(num, digit);
    }
  }
}
</script>

<style scoped lang="less">
.pocketBook-list {
  background: #e7edf1;
  position: relative;
  top: 95px;
  width: 100%;
  ul {
    width: 60%;
    margin: 0 auto;
    li {
      border-bottom: 1px solid #022b3a;
      line-height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:last-child {
        border: 0;
      }
      > * {
        flex: 1;
      }
      i {
        margin-right: 5px;
      }

      .pocketBook-list-amount {
        p {
          width: 5em;
          height: 5em;
          line-height: 5em;
          border-radius: 50%;
          color: #022b3a;
          font-weight: bold;
          margin: 0 auto;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
