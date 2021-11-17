<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/image/8b3d31ac016fa4a6902d98e09b8d9b4f.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/image/8c18838dc86ff3c5dfcffa21a9fd0df1.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/image/6053d0337da40e12c03d08c1d4f12ede.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end-swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in 10" :key="item">
          <i class="sprite sprite-news"></i>
          <div class="py-2 text-grey">爆料站</div>
        </div>
      </div>
      <div class="bg-light fs-sm py-2">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end icons -->
    
    <m-list-card title="新闻资讯" icon="cc-menu-circle" :categories="newscats">
      <template #items="{category}"> 
        <router-link
        tag="div"
        :to="`/article/${news._id}`"
         class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
        <span class="text-info text-grey">[{{news.categoryName}}]</span>
        <span class="px-2">|</span>
        <span class="flex-1 text-ellipsis">{{news.title}}</span>
        <span class="text-grey">{{news.createdAt|day}}</span>
      </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
      <m-list-card title="英雄列表" icon="card-hero" :categories="heroescats">
      <template #items="{category}"> 
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link
          tag="div"
          :to="`/hero/${hero._id}`"
           class="p-2 text-center" style="width:20%" v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- 精彩视频 -->
    <m-card title="精彩视频" icon="cc-menu-circle"> </m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
        day(val){
            return dayjs(val).format('MM/DD')
        }
    },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      newscats:[],
      heroescats:[]
    };
  },
  methods:{
    async fetchNewsCats(){
      const res=await this.$http.get('news/list')
      this.newscats=res.data
    },
     async fetchHeroesCats(){
      const res=await this.$http.get('heroes/list')
      this.heroescats=res.data
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroesCats();
  }
};
</script>

<style lang='scss'>
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.153846rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}
</style>