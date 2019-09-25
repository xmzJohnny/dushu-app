module.exports = {
    //打包生成的dist里面的css，js等都是通过baseUrl过去的
    // process.env.NODE_ENV 环境变量  
    // production 开发模式
    baseUrl:process.env.NODE_ENV === 'production'
    ? './'  //将baseUrl获取当前路径下
    : '/'   //如果是在测试模式或者开发模式依然通过/来配置baseUrl
}