<template>
  <div class="wrapper">
    <el-upload
      drag
      action="uploadUrl"
      :multiple="true"
      :show-file-list="false"
      accept=".xls,.xlsx"
      :http-request="httpRequest"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text"><em>上传Excel</em></div>
	</el-upload>
  </div>
</template>

<script>
// import XLSX from 'xlsx';
export default {
  name: "index",
  data() {
    return {
      uploadUrl: '',
    }
  },
  methods: {
   UploadUrl() {

   },
   httpRequest (e) {
      const file = e.file;
      if (!file) return;

      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }

      const _fromData= new FormData();
      _fromData.append('file', file);
      this.$axios({
        method:"post",
        url: "http://localhost:3000/upload",
        headers:{
          'Content-type': 'multipart/form-data'
        },
        data: _fromData
      }).then(res => {
        console.log(res);
      })
    }
  }
};
</script>
<style scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
