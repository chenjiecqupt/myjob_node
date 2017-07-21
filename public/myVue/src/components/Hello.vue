<template>
  <div class="hello">
    <my-header></my-header>
    <div class="container">
      <div class="row">
        <div class="col-xs-2 col-md-2 col-ms-3">
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div class="col-xs-10 col-md-10 col-ms-9">
          <div class="jumbotron">
            <h1>Hello, world!</h1>
            <p>...</p>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
          </div>
        </div>
      </div>
      <button v-on:click="getting">点击请求数据</button>
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
      </table>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myHeader from './myHeader';
  import myFooter from './myFooter'
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
    myFooter
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
