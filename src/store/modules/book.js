// 定义book单独成为一个模块化
const book = {
    // 定义共享的值
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1,
        // -1:不显示；0：字号字体设置；1：主题设置；2：进度条设置；3：目录
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        fontFamilyVisible: false,
        defaultTheme: 'Default',
        bookAvailable: false,
        progress: 0,
        section: 0,
        isPaginating: true,
        currentBook: null,
        navigation: null,
        cover: null,
        metadata: null,
        paginate: '',
        pagelist: null,
        offsetY: 0,
        isBookmark: null

    },
    // 改变state的值
    mutations: {
        // SET_TEST 有两个参数 第一个参数是上面共享的对象 第二个是上面对象中test的值
        'SET_FILENAME': (state, fileName) => {
            state.fileName = fileName
          },
          'SET_MENU_VISIBLE': (state, visible) => {
            state.menuVisible = visible
          },
          'SET_SETTING_VISIBLE': (state, visible) => {
            state.settingVisible = visible
          },
          'SET_DEFAULT_FONT_SIZE': (state, fontSize) => {
            state.defaultFontSize = fontSize
          },
          'SET_DEFAULT_FONT_FAMILY': (state, font) => {
            state.defaultFontFamily = font
          },
          'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
            state.fontFamilyVisible = visible
          },
          'SET_DEFAULT_THEME': (state, theme) => {
            state.defaultTheme = theme
          },
          'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
            state.bookAvailable = bookAvailable
          },
          'SET_PROGRESS': (state, progress) => {
            state.progress = progress
          },
          'SET_SECTION': (state, section) => {
            state.section = section
          },
          'SET_IS_PAGINATING': (state, isPaginating) => {
            state.isPaginating = isPaginating
          },
          'SET_CURRENT_BOOK': (state, currentBook) => {
            state.currentBook = currentBook
          },
          'SET_NAVIGATION': (state, navigation) => {
            state.navigation = navigation
          },
          'SET_COVER': (state, cover) => {
            state.cover = cover
          },
          'SET_METADATA': (state, metadata) => {
            state.metadata = metadata
          },
          'SET_PAGINATE': (state, paginate) => {
            state.paginate = paginate
          },
          'SET_PAGELIST': (state, pagelist) => {
            state.pagelist = pagelist
          },
          'SET_OFFSETY': (state, offsetY) => {
            state.offsetY = offsetY
          },
          'SET_IS_BOOKMARK': (state, isBookmark) => {
            state.isBookmark = isBookmark
          },
          'SET_SPEAKING_ICON_BOTTOM': (state, speakingIconBottom) => {
            state.speakingIconBottom = speakingIconBottom
          }
        }
    }
    // 调用
  


// 将book模块化公开出去
export default book