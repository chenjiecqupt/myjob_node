<template>
    <div class="myLeftNav">
      <h1 class="article-categories btn btn-primary">文章分类</h1>
      <ul class="list-group">
        <li class="list-group-item">类库框架</li>
        <li class="list-group-item">nodejs</li>
        <li class="list-group-item">HTML/CSS</li>
        <li class="list-group-item">性能优化</li>
        <li class="list-group-item">手机移动</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'myLeftNav',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .article-categories{
      font-size: 21px;
      font-weight: 200;
      color: #fff;
      background-color: #337ab7;
      border-color: #2e6da4;
      margin: 0px;
    }
</style>

