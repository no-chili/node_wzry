<template>
  <div class="card bg-white p-3 mt-3">
       <div class="card-header fs-xxl d-flex ai-center mb-3"
        :class="{'border-bottom': !plain, 'pb-3': !plain}">
         <i class="iconfont " :class="`icon-${icon}`"></i>
         <div class="px-2 flex-1"> <strong>{{title}}</strong></div>
          <i class="iconfont icon-menu" v-if="!plain"></i>
       </div>
      <slot>
      </slot>
    </div>
</template>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain: { type: Boolean }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.card-header{
    padding-bottom: .384615rem;
    border-bottom:1px solid map-get($colors, "grey");
}
</style>