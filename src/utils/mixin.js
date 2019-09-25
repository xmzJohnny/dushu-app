import {mapGetters,mapActions} from "vuex"
import {themeList,addCss, removeAllCss} from './book'
import{saveLocation} from './localStorage'
export const ebookMixin = {
    computed:{
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark',
            'speakingIconBottom'
          ]),
          themeList(){
            return themeList(this)
        }
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark',
            'setSpeakingIconBottom'
          ]),
          initGlobalStyle(){
              removeAllCss()
            //   切换全局主题
             switch(this.defaultTheme){
              case 'Default':
              addCss('http://192.168.9.35:8081/theme/theme_default.css')
              break
              case 'Eye':
              addCss('http://192.168.9.35:8081/theme/theme_eye.css')
              break
              case 'Gold':
              addCss('http://192.168.9.35:8081/theme/theme_gold.css')
              break
              case 'Night':
              addCss('http://192.168.9.35:8081/theme/theme_night.css')
              break
              default: addCss('http://192.168.9.35:8081/theme/theme_default.css')
              break
      
             }
           
           },
                 // 点击上下章时进度条跳转到当前的位置
      refreshLocation(){
        // 先获取百分比
        const currentLocation = this.currentBook.rendition.currentLocation()
        // console.log(currentLocation)
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        // console.log(progress,currentLocation,startCfi)
        // console.log(progress)
        // 实现跳转章节进度百分比的取整
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName,startCfi)

      },
      display(target,cb){
        if(target){
         this.currentBook.rendition.display(target).then(()=>{
           this.refreshLocation()
           if(cb){
             cb()
           }
         })
        }else{
         this.currentBook.rendition.display().then(()=>{
        this.refreshLocation()
        if(cb){
          cb()
        }
      })
        }
   },
    }
}