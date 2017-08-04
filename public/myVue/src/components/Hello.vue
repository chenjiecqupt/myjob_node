<template>
  <div class="hello">
    <my-header></my-header>
    <div class="container">
      <div class="row">
        <div class="col-xs-2 col-md-2 col-ms-3">
          <myLeftNav></myLeftNav>
        </div>
        <div class="col-xs-10 col-md-10 col-ms-9">
          <div class="jumbotron">
            <h1>welcome cj's blog!</h1>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">去写blog</a></p>
          </div>
          <ul class="info-list">
            <li class="info-list">

            </li>
          </ul>
        </div>
      </div>
      <!--<button v-on:click="getting">点击请求数据</button>
      <table class="table">
        <thead>
        <tr>
          <th>id</th>
          <th>idcard</th>
          <th>姓名</th>
          <th>unit_oid</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
          <td>{{ item.id }}</td>
          <td>{{ item.idcard }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.unit_oid }}</td>
        </tr>
        </tbody>
      </table>-->
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myHeader from './myHeader';
  import myFooter from './myFooter';
  import myLeftNav from './myLeftNav';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  components:{
    myHeader,
    myFooter,
    myLeftNav
  },
  methods:{
    getting:function(){
        var _self = this;
        $.ajax({
          url:'/users/query',
          data:{id:4},
          success:function(msgStr){
              console.log(_self);
              console.log(_self.msg);
              _self.items = msgStr.items;
              console.log(_self.items);
          },
          error:function(){
              console.log('ajax error!');
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table thead th{
  text-align: center;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
