<template>
  <div class="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
 import EbookReader from '../../components/ebook/EbookReader.vue'
 import EbookTitle from '../../components/ebook/EbookTitle.vue'
 import EbookMenu from '../../components/ebook/EbookMenu.vue'
import {ebookMixin} from '../../utils/mixin'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  components:{
      EbookReader,
      EbookTitle,
      EbookMenu
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 当书本一加载完成后马上开始计时
    startLoopReadTime(){
       let readTime = getReadTime(this.fileName)
       if(!readTime){
         readTime = 0
       }
       this.task = setInterval(()=>{
         readTime ++
         if(readTime % 30 === 0 ){
           saveReadTime(this.fileName,readTime)
         }
       },1000)
    }
  },
  created(){},
  mounted(){
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if(this.task){
       clearInterval(this.task)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/global"
</style>