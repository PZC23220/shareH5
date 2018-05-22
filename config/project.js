"use strict"
// 在WebPack相关代码中使用ES6语法必须添加"use strict"前缀
// 扩展配置说明
// 获取项目版本号，用以生成目录
let fs = require("fs")
let name = 'groupy_share' // 项目名，提取出来以方便dev环境使用，否则会出现undefined = =
let vcs_type = '' // 设定版本控制工具，用于自动获取版本号，默认是0.0.1
let version = ''
if (vcs_type == 'git') {
    // git项目获取版本号
    version = fs.readdirSync('./.git/refs/tags').pop().trim()// 获取版本库最新tag值
} else {
    if (vcs_type == 'hg') {
        // hg项目获取版本号
        let tag_content = fs.readFileSync("./.hgtags", 'utf8') // 获取hgtags的内容
        version = tag_content.trim().split(' ').pop() // 直接trim后取最后一行，以空格分隔获取最新版本号
    } else {
        version = ''
    }
}
module.exports = {
    // 方便当出现多项目、多页面需求时的进一步扩展。不能与其他项目重名
    name: name, // 项目名：multi_vue_demo。
    version: version, // 版本号，据此生成map.json与项目目录
    static_root: '',// 静态资源路径(线上的assets,html,js文件夹所在路径)
    project: {
        // 项目列表
        // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
        // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
        video: './src/view/video',
        idol: './src/view/idol',
        shows: './src/view/shows',
        activity: './src/view/activity',
        activity_recharge: './src/view/activity_recharge',
        activity_halloween: './src/view/activity_halloween',
        activity_books: './src/view/activity_books',
        activity_someJapanese: './src/view/activity_someJapanese',
        activity_subwayAds: './src/view/activity_subwayAds',
        activity_fun: './src/view/activity_fun',
        activity_fun_begin: './src/view/activity_fun_begin',
        activity_attendance: './src/view/activity_attendance',
        activity_subwayAds_preliminaries: './src/view/activity_subwayAds_preliminaries',
        activity_subwayAds_finals: './src/view/activity_subwayAds_finals',
        activity_christmas: './src/view/activity_christmas',
        activity_spokesman: './src/view/activity_spokesman',
        live: './src/view/live',
        activity_entertainmentWeekly: './src/view/activity_entertainmentWeekly',
        activity_spokesman2: './src/view/activity_spokesman2',
        activity_twitter: './src/view/activity_twitter',
        meeting_raiders: './src/view/meeting_raiders',
        meeting_shows: './src/view/meeting_shows',
        meeting: './src/view/meeting',
        activity_ffacg201805: './src/view/activity_ffacg201805',
        activity_maimeng: './src/view/activity_maimeng',
        activity_interview: './src/view/activity_interview',
        activity_spokesman3: './src/view/activity_spokesman3',
        activity_ffacg201807: './src/view/activity_ffacg201807',
        activity_ffacg201807_preliminaries: './src/view/activity_ffacg201807_preliminaries',
        MayLiveImages: './src/view/MayLiveImages',
        activity_ffacg201807_spokesman: './src/view/activity_ffacg201807_spokesman',
    },
};
