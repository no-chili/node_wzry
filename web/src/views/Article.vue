<template>
  <div class="article">
    <p px-2>{{ model.title }}</p>
    <div class="px-3 fs-xl body" v-html="model.body"></div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
      console.log(res.data);
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss">
.article {
  .body {
    p{
      line-height: 1.5em;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
