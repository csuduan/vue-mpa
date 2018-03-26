<template lang="html">
  <div class="admin-container">
    <mavon-editor  ref=md class="set" v-model="value" @imgAdd="imgAdd" @change="getContent" :ishljs = "true"></mavon-editor>

    <div class="footer">
      <el-popover
        ref="popover5"
        placement="top"
        width="160"
        v-model="visible2">
        <p>确定提交吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="modifyArticle">确定</el-button>
        </div>
      </el-popover>
      <el-button v-popover:popover5 class="submit">修改</el-button>
      <div class="left">
      <el-button>修改信息</el-button>
      <el-button>修改分类</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: '',
      content: '',
      visible2: false,
    }
  },
  mounted () {
    this.getValue()
  },
  methods: {
    getContent (value,render) {
      this.content = value
    },
      imgAdd(pos, $file){
          // 第一步.将图片上传到服务器.

          var formdata = new FormData();
          formdata.append('image', $file);

          axios.post("/api/imgAdd",{image:$file}).then((resp)=>{
              var url="/images/md/a34e4960-f44f-11e7-bdb0-d5f2f5133b8e.jpg"
              this.$refs.md.$img2Url(pos, resp.data);
          })
          /*axios({
              url: '/api/imgAdd',
              method: 'post',
              data: formdata,
              headers: { 'Content-Type': 'multipart/form-data' },
          }).then((url) => {
              // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
              // $vm.$img2Url 详情见本页末尾
              $vm.$img2Url(pos, url);
          })*/








      },
    getValue () {
      let articleId = this.$route.query.articleId
      let param = {
        articleId: articleId
      }
      axios.get("/api/articleDetial", {
        params: param
      }).then((result) => {
        let res = result.data
        if (res.status == "0") {
          this.value = res.result.content
        } else {
          this.value = ''
        }
      })
    },
    modifyArticle () {
      let articleId = this.$route.query.articleId
      axios.post("/api/articleModify", {
        articleId: articleId,
        content: this.content
      }).then((response)=>{
        let res = response.data
        if (res.status == '0') {
          this.$message({
            type: 'success',
            message: '文章已修改'
          })
          this.visible2 = false
        } else {
          this.$message.error('未修改')
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
