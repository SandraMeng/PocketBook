<template>
  <div id="pocketBook">
    <PocketBookHeader />
    <PocketBookList />
    <el-backtop :bottom="90" :right="70">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #022b3a;
          box-shadow: 10px 10px 20px #022b3a;
          text-align: center;
          line-height: 40px;
          color: #fff;
          padding: 5px;
          border-radius: 50%;
        }">
        TOP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import PocketBookHeader from './components/PocketBookHeader.vue';
import PocketBookList from './components/PocketBookList.vue';
import Vuex from 'vuex';

export default {
  name: 'PocketBook',
  components: {
    PocketBookHeader,
    PocketBookList
  },
  created(){
    this.changeBillData();
  },
  methods: {
    ...Vuex.mapActions(['changeBillData'])
  }
}
</script>

<style lang="less">
* {
	padding: 0;
	margin: 0;
}
// 清除padding：新增账单时，el-drawer弹出时会给body添加padding-right样式，造成列表部分无法撑满全屏
.el-popup-parent--hidden {
  padding: 0 !important;
}
ul {
	list-style: none;
}
#pocketBook {
  width: 100%;
  text-align: center;
  color: #022b3a;
}
</style>
