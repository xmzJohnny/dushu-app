<template>
<transition name="Fade-slide-right">
  <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <div class="content">
          <div class="content-page-wrapper">
              <div class="content-page"></div>
              <div class="content-page-tab"></div>
          </div>
      </div>
      <div class="content-bg">

      </div>
  </div>
  <transition>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/global";
  .slide-content-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 300;
      display: flex;
      .content{
          flex: 0 0 85%;
          width: 85%;
          height: 100%;
          .content-page-wrapper{
              .content-page{}
              .content-page-tab{}
          }

      }
      .content-bg{
          flex:  0 0 15%;
          height: 15%;
          width: 100%;
      }
  }
</style>