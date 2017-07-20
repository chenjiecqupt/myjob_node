<template>
  <div class="hello">
    <my-header></my-header>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
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
</template>

<script>
  import myHeader from './myHeader'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  components:{
    myHeader
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

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
