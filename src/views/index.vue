<template>
  <div>
    <uploadFile />
    <el-button slot="trigger" size="small" type="primary" @click="downloadXlsx">下载Excel</el-button>
    <a ref="down" style="display: none" :href="downLoadUrl" :download="downLoadUrl"></a>
  </div>
</template>

<script>
import uploadFile from '../components/uploadFile.vue'
export default {
  name: "index",
  components: { uploadFile },
  data() {
    return {
      downLoadUrl: 'http://localhost:3000/exportExcel'
    }
  },
  methods: {
    downloadXlsx() {
      this.$refs.down.click();
    }
  }
};
</script>
<style scoped>
</style>
