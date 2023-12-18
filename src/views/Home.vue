<template>
  <div class="common-layout">
    <el-container>
      <el-main class="main">
        <el-container>
          <el-container class="title">
            <el-aside width="20%" class="title_font">
              <span>GEFormer</span>
            </el-aside>
            <el-main class="title_main">
              <h1 class="title_intro">jieshaowenzi</h1>
            </el-main>
          </el-container>
        </el-container>
        <div class="toolslist">
          <el-container v-for="tool in toolslist" class="toolitem bgc" :key="tool.path"
            @click="handleToolItem(tool.path)">
            <el-aside width="120px"><el-image width="100px" height="100px" style="display: inline;"
                src="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=cc9ff2b63101213fcf6646da64d71ae9/4e4a20a4462309f7d1dd6b7d7a0e0cf3d7cad62b.jpg"
                alt=""></el-image></el-aside>
            <el-main style="font-size: 20px;text-align: center;overflow: hidden;">
              <span style="transform: translateX(-50%);">{{ tool.title }}</span>
              <span class="tool_intro">xxxx</span>
            </el-main>
          </el-container>
        </div>
      </el-main>

      <el-aside width="25%" style="padding-top: 20px;overflow-x:hidden;">
        <el-space direction="vertical" :size="30" style="width: 100%" fill>
          <!-- <div v-for="news in newslist" :key="news.title" class="box-card">
            <div class="fndivItem ui raised segment">
              <a class="ui teal ribbon label">{{ news.title }}</a>
            </div>
            <div v-for="item in news.item" :key="item" class="text_item">
              {{ item }}
            </div>
          </div> -->
          <el-card v-for="news in newslist" :key="news.title" class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ news.title }}</span>
              </div>
            </template>
            <div v-for="item in news.item" :key="item" class="text_item">
              {{ item }}
            </div>
          </el-card>
        </el-space>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup name="Home">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toolslist = [{ path: 'datasets', title: 'Datasets', imgUrl: '' },
{ path: 'models', title: 'Models', imgUrl: '' },
{ path: 'trainning', title: 'Trainning Models', imgUrl: '' },
{ path: 'prediction', title: 'Prediction', imgUrl: '' },
{ path: 'study', title: 'Study Results', imgUrl: '' },
{ path: 'tutorial', title: 'Tutorial', imgUrl: '' }];

const newslist = [{
  title: 'news',
  item: ['1、GEFormer model added(December 10, 2023)', '2、Application scenario 1:Predicting crop phenotypes across environments added(December 10, 2023)']
}, {
  title: 'xxxx',
  item: ['1、xxxxxxxxxxx', '2、xxxxxxxxxxx']
}];

// click toolitem
function handleToolItem(path) {
  router.push(`/species/${path}`);
}
</script>
<style scoped>
/* height */
.common-layout {
  /* height: 100vh; */
}

.main {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 5px;
  border: black solid 1px;
  border-radius: 3px;
}

.title {
  height: 100px;
  margin-bottom: 10px;
}

.title_font {
  font-size: 30px;
  font-style: italic;
  color: rgba(0, 96, 186, 0.8);
  margin-left: 10px;
  /* text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5); */
  text-shadow: 3px 3px 8px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  text-align: center;
  line-height: 70px;
}

.title_main {
  border: 1px solid black;
  text-align: center;
}

.title_intro {
  font-size: 30px;
}

.toolslist {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  grid-auto-rows: 150px;
}

.toolitem {
  border: 1px black solid;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease;
  /* 延长过渡时间为0.6秒 */
  padding: 20px;
  border-radius: 10px;
  line-height: 60px;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
}

.toolitem:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tool_intro {
  display: block;
  font-size: 10px;
  position: relative;
  top: -10px;
}

.box-card {
  box-shadow: black;
  background: linear-gradient(to bottom, rgba(143, 221, 221, 0.8), transparent);
  transition: all 0.6s ease;
  overflow: hidden;
}

.box-card:hover {
  transform: scale(1.05);
}

.text_item {
  padding: 2px 0;
  font-size: 14px;
  overflow-wrap: break-word;
}

/* card style */
.card-header {
  text-align: center;
  font-size: 20px;
}

.bgc:nth-of-type(1) {
  background: linear-gradient(to top right, rgba(35, 1, 1, 0.5), #fff);
}

.bgc:nth-of-type(2) {
  background: linear-gradient(to top right, rgba(94, 224, 97, 0.4), #fff);
}

.bgc:nth-of-type(3) {
  background: linear-gradient(to top right, rgba(94, 194, 224, 0.4), #fff);
}

.bgc:nth-of-type(4) {
  background: linear-gradient(to top right, rgba(224, 94, 129, 0.4), #fff);
}

.bgc:nth-of-type(5) {
  background: linear-gradient(to top right, rgba(224, 196, 94, 0.4), #fff);
}

.bgc:nth-of-type(6) {
  background: linear-gradient(to top right, rgba(224, 126, 94, 0.4), #fff);
}

/* 新闻小标题 */
/* .ui.raised.segment {
  -webkit-box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
}

.ui.segment {
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  margin: 1rem 0;
  padding: 1em 1em;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
}

.ui.segment:first-child {
  margin-top: 0;
}

.ui.segment:last-child {
  margin-bottom: 0;
}

.ui.teal.ribbon.label {
  border-color: #00827c !important;
}

.ui.teal.label,
.ui.teal.labels .label {
  background-color: #00b5ad !important;
  color: #fff !important;
}

.ui.ribbon.label {
  left: calc(-1rem - 1.2em);
  margin-right: -1.2em;
  padding-left: calc(1rem + 1.2em);
  padding-right: 1.2em;
}

.ui.ribbon.label {
  cursor: default;
  position: relative;
  margin: 0;
  min-width: -webkit-max-content;
  min-width: 400px;
  min-width: max-content;
  border-radius: 0 0.28571429rem 0.28571429rem 0;
  border-color: rgba(0, 0, 0, 0.15);
}

.ui.label,
.ui.labels .label {
  font-size: 0.95rem;
}

.ui.label {
  display: inline-block;
  line-height: 1;
  vertical-align: baseline;
  margin: 0 0.14285714em;
  background-color: #e8e8e8;
  background-image: none;
  padding: 0.5833em 0.833em;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  font-weight: 700;
  border: 0 solid transparent;
  border-radius: 0.28571429rem;
  -webkit-transition: background 0.1s ease;
  transition: background 0.1s ease;
}

.ui.ribbon.label:after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  background-color: transparent !important;
  border-style: solid;
  border-width: 0 1.2em 1.2em 0;
  border-color: transparent;
  border-right-color: inherit;
  width: 0;
  height: 0;
}

.ui.teal.labels .label:hover,
a.ui.teal.label:hover {
  background-color: #009c95 !important;
  border-color: #009c95 !important;
  color: #fff !important;
}*/
</style>
