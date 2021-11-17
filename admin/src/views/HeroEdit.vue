<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs  type="border-card" v-model="activeName">
        <el-tab-pane label="基础信息" name="base"
          ><el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader el-upload"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
             :on-success="res=>$set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader el-upload"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skills"
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="分数">
            <el-rate
              v-model="model.scores.attack"
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="texterea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="texterea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input
              type="texterea"
              v-model="model.teamTips"
            ></el-input> </el-form-item
        ></el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row v-for="(item, index) in model.skills" :key="index">
            <el-col :md="2"></el-col>
            <el-form-item label="名称">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
                class="avatar-uploader el-upload"
                :action="$http.defaults.baseURL + '/upload'"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(item,'icon',res.url)"
              >
                <img
                  v-if="model.avatar"
                  :src="item.icon"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                v-model="item.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="冷却">
              <el-input type="textarea" v-model="item.delay"></el-input>
            </el-form-item>
            <el-form-item label="消耗">
              <el-input type="textarea" v-model="item.cost"></el-input>
            </el-form-item>
            <el-button type="danger" @click="del(index)" style="margin-left:7.5rem;">删除</el-button>
          </el-row>
        </el-tab-pane>
         <el-tab-pane label="最佳搭档" name="partners">
          <el-button type="text" @click="model.partners.push({})">
            <i class="el-icon-plus"></i>添加搭档
          </el-button>
          <el-row v-for="(item, index) in model.partners" :key="index">
            <el-col :md="2"></el-col>
            <el-form-item label="英雄">
              <el-select filterable v-model="item.hero">
                <el-option 
                v-for="hero in heroes"
                :key="hero._id"
                :value="hero._id"
                :label="hero.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                v-model="item.description"
              ></el-input>
            </el-form-item>
            <el-button type="danger" @click="model.partners.splice(i,1)" style="margin-left:7.5rem;">删除</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top: 1rem"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      //默认展示界面
      activeName: 'base',
      heroes:[],
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        skills: [],
        partners:[],
        categories: [],
        scores: {
          teamTips: "",
          battleTips: "",
          usageTips: "",
        },
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      console.log(res);
      // this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = { ...this.model, ...res.data };
      console.log(res);
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
      console.log(res);
    },
    async fetchHeroes() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
      console.log(res);
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
      console.log(res);
    },
    del(i){
      this.model.skills.splice(i,1)
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchHeroes();
    this.fetchItems();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 178px;
  height: 178px;
  display: block;
}
</style>