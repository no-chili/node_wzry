<template>
  <div class="list">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240px"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="medium" @click="remove(scope.row)">删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除物品 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         const res= await this.$http.delete(`rest/heroes/${row._id}`);
         if(res){
               await this.fetch()
         }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          
        })
        .catch(()=>{

        })
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>