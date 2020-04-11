<template>
  <header>
    <div class="pocketBook-logo">
      <div>
        <img src="../assets/img/pocketBook-logo.png">
      </div>
      <div>
        <p v-html="`收入￥${incomeSum}`"></p>
        <p v-html="`支出￥${expenseSum}`"></p>
      </div>
    </div>
    <div class="pocketBook-date">
      <el-date-picker
        v-model="date"
        type="month"
        size="small"
        placeholder="月份">
      </el-date-picker>
    </div>
    <div class="pocketBook-category">
      <el-dropdown @command="categoryCheck">
        <span class="el-dropdown-link">
          分类<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="全部">全部</el-dropdown-item>
          <el-dropdown-item 
          v-for="(item,index) in dropdown" 
          :key="index" 
          v-html="item"
          :command="item"
          ></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="pocketBook-add">
      <el-button 
      class="pocketBook-add-btn" 
      icon="el-icon-plus"
      @click="drawer=true"
      ></el-button>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        size="50%">
        <el-input placeholder="金额" v-model="amount"></el-input>
        <div class="pocketBook-add-type">
          <el-radio v-model="type" label="1">收入</el-radio>
          <el-radio v-model="type" label="0">支出</el-radio>
        </div>
        <div class="pocketBook-add-category">
          <el-select slot="prepend" v-model="selected" placeholder="请选择" @change="inputCategory=selected">
            <el-option :label="item" :value="item" :key="index" v-for="(item,index) in dropdown"></el-option>
          </el-select>
          <el-input placeholder="消费类型" v-model="inputCategory" @input="selected=null"/>
        </div>
        <div>
          <el-button @click="drawer=false">取消</el-button>
          <el-button @click="submit">确定</el-button>
        </div>
      </el-drawer>
    </div>
  </header>
</template>

<script>
import Vuex from 'vuex';
import {numberFormat} from '../utils';
import {addBill} from '../api/index';

export default {
  name: 'PocketBookHeader',
  data(){
    return {
      date: null,
      category: '全部',
      drawer: false,
      direction: 'ttb',
      amount: '',
      type: '1',
      selected: null,
      inputCategory: null
    };
  },
  methods: {
    ...Vuex.mapMutations(['changeShowBillByDateAndCategory']),
    ...Vuex.mapActions(['changeBillData']),
    categoryCheck(category){
      this.category = category;
      this.changeShowBillByDateAndCategory({date: this.date, category});
    },
    sum(type){
      let sum = this.showBill.reduce((prev, next)=>{
        return next.type == type ? prev + Number(next.amount): prev;
      }, 0);
      return numberFormat(sum, 2);
    },
    submit(){
      if (!this.inputCategory || !this.amount){
        this.$message({
          message: '输入项不能为空！'
        });
        return;
      }
      addBill(this.type,new Date().getTime(),this.inputCategory,this.amount).then(data=>{
        if (data.code === 0){
          // 列表更新太快，用户体验不太好
          setTimeout(()=>{
            this.changeBillData();
          },1000);

          this.$message({message: '新增成功！'});
          this.drawer = false;
          this.amount = '';
          this.selected = null;
          this.inputCategory = null;
        }
      });
    }
  },
  watch: {
    date(date){
      this.changeShowBillByDateAndCategory({date, category: this.category});
    }
  },
  computed: {
    dropdown(){
      return Array.from(new Set(this.billData.map(item=>item.categoryName)));
    },
    ...Vuex.mapState(['billData', 'showBill']),
    incomeSum(){
      return this.sum(1);
    },
    expenseSum(){
      return this.sum(0);
    }
  }
}
</script>

<style scoped lang="less">
header {
  position: fixed;
  z-index: 100;
  width: 100%;
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 -10px 20px #022b3a;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    flex: 1;
  }
  .pocketBook-logo {
    img {
      width: 50px;
      height: 50px;
      margin-right: -130px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pocketBook-date {
    .el-input {
      width: 89px;
    }
  }

  .pocketBook-category {
    .el-dropdown-link {
      cursor: pointer;
      color: #022b3a;
    }
  }

  .pocketBook-add-btn {
    background: #e7edf1;
  }
  .pocketBook-add-type {
    margin: 20px 0;
  }
  .pocketBook-add-category {
    margin: 20px 0 30px;
    .el-input {
      width: 15%;
    }
  }
  .el-input {
    width: 30%;
  }
}
</style>
