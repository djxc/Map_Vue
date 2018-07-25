<template>
  <div id="app">
    <header>
      <router-link to="/home">Home </router-link>
      <router-link to="/about">About </router-link>
     <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
      <router-link to="/my3Dmap">3DMap </router-link>
      <router-link to="/my2Dmap">2DMap1 </router-link>      
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style >
body {
  background: #f0f0f0;
  font-size: 17px;
  line-height: 1.4;
  font-family: 'Jaldi', sans-serif;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.nav {
  background: #31363c;
  min-height: 7rem;
}

.nav-left {
  align-items: center;
  padding-left: 3rem;
}

a img {
  height: 6.5rem;
}

.title {
  text-align: center;
  color: #fff;
}
</style>
