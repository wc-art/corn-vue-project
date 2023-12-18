<template>
  <div id="app">
    <div>
      <div id="nav" :style="opacityStyle">
        <div id="title" @click="$router.push('/')">
          <span>GEFormer</span>
          <!-- <img src="./img/logo/logo.png" style="height: 55px" /> -->
        </div>

        <div class="link_wrapper">
          <router-link to="/">Home</router-link>
          <router-link to="/species/datasets">Datesets</router-link>
          <router-link to="/species/models">Models</router-link>
          <el-dropdown ref="dropRef" style="position: relative;top:38px;text-align: center;height: 24px;font-size: 20px;">
            <span class="special" :style="specialStyle">
              Trainning Models
              <el-icon style="transform: translateY(3px);">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleTrainning('HPO')">HPO</el-dropdown-item>
                <el-dropdown-item @click="handleTrainning('RUN')">RUN</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <router-link to="/species/prediction">Prediction</router-link>
          <router-link to="/species/study" class="special" :style="specialStyle">Study Results</router-link>
          <router-link to="/species/tutorial">Tutorial</router-link>
          <router-link to="/species/contact">Contact</router-link>
        </div>
      </div>
      <section class="featured1"></section>
      <div class="main">
        <router-view />
        <div class="themeBg"></div>
      </div>
      <div class="foot">
        <div style="display: flex;width: 80%;margin: 0 auto;">
          <div style="flex: 1;">
            <h3 style="color: #fff;font-size: 1rem;font-weight: 500;">POWERED BY</h3>
            <el-row>
              <el-col :span="24">
                <a href="http://www.hzau.edu.cn/" target="_blank">
                  <img src="@/assets/img/footImg/hzau_logo_h100.png" alt="" class="img-fluid">
                </a>
              </el-col>
            </el-row>
          </div>

          <div style="flex: 7;text-align: center;">
            <el-row :gutter="40" type="flex" justify="center">
              <el-col :span="3">
                <a href="https://figshare.com/articles/dataset/Gossypium_anomalum_B1_genome/17280074" target="_blank">
                  <img src="@/assets/img/footImg/Cotton-1-logo.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="3">
                <a href="https://maizegdb.org/" target="_blank">
                  <img src="@/assets/img/footImg/maizeGDB.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="3">
                <a href="http://maizego.org/index.html" target="_blank">
                  <img src="@/assets/img/footImg/maizego_h100.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="3">
                <a href="https://meme-suite.org/meme/index.html" target="_blank">
                  <img src="@/assets/img/footImg/MEME.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="2">
                <a href="http://plantdeepsea.ncpgr.cn/" target="_blank">
                  <img src="@/assets/img/footImg/PlantDeepSEA.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="3">
                <a href="http://planttfdb.gao-lab.org/index.php" target="_blank">
                  <img src="@/assets/img/footImg/PlantTFDB.png" alt="" class="img-fluid">
                </a>
              </el-col>
              <el-col :span="3">
                <a href="http://rice.hzau.edu.cn/rice_rs2/" target="_blank">
                  <img src="@/assets/img/footImg/Rice-data-logo.png" alt="" class="img-fluid">
                </a>
              </el-col>
            </el-row>
          </div>
        </div>
        <p style="
            width: 80%;
            text-align: center;
            margin: 0 auto;
            padding: 10px 0;
          ">
          Huazhong Agricultural university, Wuhan, 430070, China
        </p>
      </div>
    </div>
  </div>
</template>

<script setup name="App">
import { ref, onMounted, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();

const backShow = ref(false);
const opacityStyle = ref({
  opacity: 1, // 渐变色从0开始
});

const specialStyle = ref({});

const dropRef = ref(null)

// 路由跳转
function handleTrainning(path) {
  if(path==='HPO') {
    router.push('/species/hpo')
  } else {
    router.push('/species/trainningmodels')
  }
}

// function handleScroll() {
//   // 逐渐填充start
//   const scrollTop = document.documentElement.scrollTop;
//   if (scrollTop > 0) {
//     let opacity = 0.3 + scrollTop / 210;
//     let height = 100 - 40 * (scrollTop / 300);
//     height = height < 60 ? 60 : height;
//     opacity = opacity > 1 ? 1 : opacity; //渐变色从0到1
//     opacityStyle.value = {
//       // opacity: opacity,
//       height: height + "px",
//       "line-height": height + "px",
//     };
//     console.log(dropRef.value)
//     backShow.value = true;
//   } else {
//     backShow.value = false;
//   }
//   //逐渐填充end
// }

onMounted(() => {
  // window.addEventListener("scroll", handleScroll);
});

</script>

<style scoped>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* height: 1000px; */
  margin: 0 auto;
}

#title {
  flex: 1;
  font-size: 30px;
  font-style: italic;
  color: #fff;
  margin-left: 10vw;
  /* text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5); */
  text-shadow: 3px 3px 8px rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

/* #welcome{
  width: 100%;
  background-image:url('../dist/img/welcome.jpg');
} */
#nav {
  line-height: 100px;
  background-color: #004b5f;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 100px;
  margin-bottom: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
}

/* #nav a {
  font-weight: bold;
  font-size: 25px;
  color: #fff;
} */

#nav .link_wrapper {
  flex: 3;
}

.link_wrapper {
  font-size: 20px;
  align-self: flex-end;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.link_wrapper a,.link_wrapper span {
  max-width: 250px;
  color: #fff;
  flex: 1;
  text-align: center;
  /* display: block; */
}

#nav .special {
  /* line-height: 1; */
  flex: 2;
  /* margin-top: 35px; */
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#tool a {
  height: 50px;
  font-weight: bold;
  font-size: 20px;
  color: #42b983;
}

.main {
  min-height: calc(100vh - 200px);
}

.foot {
  bottom: 0px;
  background-color: #2a2730;
  color: white;
  height: 160px;
  /* text-align: center; */
  /* margin: 0 auto; */
  padding-top: 2em;
}

section.featured1 {
  padding: 40px 0 60px;
  background-color: #004b5f;

  color: #fdfdfd;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

/* .themeBg {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  --color-filter: hue-rotate(25.4219deg);
  background-size: cover;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)),
    url("@/assets/img/homeback2.png");
  z-index: -2;
} */
</style>
