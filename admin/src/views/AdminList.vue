<template>
  <div class="list">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240px"></el-table-column>
      <el-table-column prop="username" label="管理员"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            @click="$router.push(`/admins/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/admins");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除管理员"${row.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         const res= await this.$http.delete(`rest/admins/${row._id}`);
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