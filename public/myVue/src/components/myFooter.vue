<template>
    <div class="myFooter">
      <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <a class="navbar-brand" href="#">这是一个个人网站</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <!--<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
              <li class="dropdown">
                <a href="#">Dropdown</a>
              </li>
            </ul>
          </div>&lt;!&ndash; /.navbar-collapse &ndash;&gt;-->
        </div><!-- /.container-fluid -->
      </nav>
    </div>
</template>

<script>
    export default {
        name: 'myFooter',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    .myFooter .container-fluid{
      width: 1200px;
    }
</style>

