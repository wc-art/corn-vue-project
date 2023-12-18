<template>
  <div class="top_title">SELECT SPECIES</div>
  <div class="wrapper">
    <el-card v-for="species in specieslist" :key="species.name" class="box-card bgc" style="width: 250px"
      @click="handleSpecies(species.path)">
      <img :src="species.url" class="image" />
      <div class="title">{{ species.name }}</div>
      <div style="padding-top:50px;">
        <div class="bottom">
          <time class="time">{{ species.intro }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup name="Species">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import maizeImg from '@/assets/img/maize.jpg';
import cottonImg from '@/assets/img/cotton.jpeg';
import wheatImg from '@/assets/img/wheat.jpg';

const route = useRoute();
const router = useRouter();
const tool = route.params.tool;


const specieslist = [{ name: 'maize', intro: '3fedfseefesfesfsfesfsfsef', path: 'maize', url: maizeImg },
{ name: 'cotton', intro: 'efesffefefefefefe', path: 'cotton', url: cottonImg },
{ name: 'wheat', intro: 'other species', path: 'wheat', url: wheatImg },
{ name: 'other', intro: 'other species', path: 'other', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
];
const currentDate = ref(new Date());

// 点击物种
function handleSpecies(species) {
  router.push(`/${tool}/${species}`);
}
</script>


<style scoped>
.top_title {
  padding-top: 5vh;
  line-height: 3rem;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  width: 70vw;
  margin: 0 auto;
  padding-top: 5vh;
}

.box-card {
  position: relative;
}

.title {
  color: #fff;
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);;
  text-align: center;
  font-size: 30px;
  width: 150px;
  height: 50px;
  background-color: rgb(137, 211, 245);
}

.image {
  transition: all 0.6s ease;
  display: block;
  height: 200px;
  width: 100%;
}

.image:hover {
  transform: scale(1.05);
}
.box-card:hover .title{
  display: block;
}

.bgc {
  background: linear-gradient(to bottom, rgba(68, 198, 198, 0.8), transparent);
}
</style>
