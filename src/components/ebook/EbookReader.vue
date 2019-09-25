<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
// import { mapGetters } from 'vuex'
import Epub from 'epubjs'
import { 
  getFontFamily,
 saveFontFamily, 
 getFontSize,
 saveFontSize, 
 getTheme, 
 saveTheme, 
 saveLocation,
 getLocation} from '../../utils/localStorage';

global.ePub = Epub
export default {
  mixins: [ebookMixin],
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  // computed: {
  //  ...mapGetters(['fileName','menuVisible'])
  // },
  methods: {
    prevPage(){
      if(this.rendition){
          this.rendition.prev().then(()=>{
               this.refreshLocation()
          })
          this.hideTitleAndMenu()
      }
    },
    nextPage(){
        if(this.rendition){
           this.rendition.next().then(()=>{
                this.refreshLocation()
           })
         this.hideTitleAndMenu()
         
        }
    },
    hideTitleAndMenu(){
      // this.$store.dispatch('setMenuVisible',false)
      this.setMenuVisible(false)
       this.setSettingVisible(-1)
       this.setFontFamilyVisible(false)// 实现点击屏幕，字体设置面板消失
    },
    toggleTitleAndMenu(){
      if (this.menuVisible) {
    //  隐藏字号设置面板
       this.setSettingVisible(-1)
       this.setFontFamilyVisible(false)// 实现点击屏幕，字体设置面板消失
     }
  // 显示标题和菜单栏
  this.setMenuVisible(!this.menuVisible)
  //  this.$store.dispatch('setMenuVisible',!this.menuVisible)
    },
    // 主题初始化
     initTheme(){
      //  设置主题缓存
       let defaultTheme = getTheme(this.fileName)
       if (!defaultTheme) {
       defaultTheme = this.themeList[0].name
     
      saveTheme(this.fileName, defaultTheme)
        }
     // 设置到vuex中
       this.setDefaultTheme(defaultTheme)
      //  先注册
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name,theme.style)
      });

      // 设置默认的主题
      this.rendition.themes.select(defaultTheme)  
     },
     initRendition(){
                // 进行渲染
       this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
         // 微信兼容性配置
          // method: 'default'
          })
      const location = getLocation(this.fileName)
      this.display(location,()=>{
        //  设置主题
        this.initTheme()
        // text动态添加样式
        this.initGlobalStyle()
        // 调用阅读缓存
        this.refreshLocation()

        // 初始化字体
        let font = getFontFamily(this.fileName)
        if(!font){
          // this.defaultFontFamily 默认值  在VueX中存在
        saveFontFamily(this.fileName,this.defaultFontFamily)
        }else{
         this.rendition.themes.font(font)
         this.setDefaultFontFamily(font)
        }


          // 初始化字号
  // let fontSize = getFontSize(this.fileName)
  // if (!fontSize) {
  //   saveFontSize(this.fileName, this.defaultFontSize)
  // } else {
  //   this.rendition.themes.font(fontSize)
  //   this.setDefaultFontFamily(fontSize)
  // }

        // 引入字体样式文件
      // addStylesheet方法会返回一个promise对象
         this.rendition.hooks.content.register(contents => {
           Promise.all([
          //  contents.addStylesheet(`${process.env.VUE_APP_RES_URl}/fonts/daysOne.css`),
          //  contents.addStylesheet(`${process.env.VUE_APP_RES_URl}/fonts/cabin.css`),
          //  contents.addStylesheet(`${process.env.VUE_APP_RES_URl}/fonts/montserrat.css`),
          //  contents.addStylesheet(`${process.env.VUE_APP_RES_URl}/fonts/tangerine.css`)
             contents.addStylesheet('http://192.168.9.35:8081/fonts/daysOne.css'),
             contents.addStylesheet('http://192.168.9.35:8081/fonts/cabin.css'),
             contents.addStylesheet('http://192.168.9.35:8081/fonts/montserrat.css'),
             contents.addStylesheet('http://192.168.9.35:8081/fonts/tangerine.css')
           ]).then(()=>{
             console.log("字体全部加载完毕。。。")
           })
        
          })

          })
         
     },
     initGesture(){
        this.rendition.on('touchstart',event=>{
        // console.log(event)
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend',event=>{
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        // console.log(offsetX,time)
        if(time < 500 && offsetX > 40){
        this.prevPage() // 向前翻页事件
        }else if(time < 500 && offsetX < -40){
        this.nextPage() // 向后翻页事件
        }else{
         this.toggleTitleAndMenu() // 显示标题和菜单
        }
      //  event.preventDefault() // 禁用事件默认方法调用
         event.stopPropagation() // 禁止事件传播
      })
      },
   initEpub () {
       const url = 'http://192.168.9.27:8081/epub/' + this.fileName + '.epub'
       console.log(url)
         // 实例化
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      // 实现分页
      this.book.ready.then(()=>{
        return this.book.locations.generate(750*(window.innerWidth/375)*(getFontSize(this.fileName)/16)).then(locations=>{
          // console.log(locations)
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      })

        }
  },
  created() {},
  mounted() {
   this.setFileName(this.$route.params.fileName.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/global";
</style>