<template>
    <div class="main">
        <div class="header">
            <swiper :options="swiperOption2" ref="mySwiper2">
                <swiper-slide id="swiper2" class="header-swiper">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" class="swiper-img">
                        <p class="swiper-tips">
                            <span>Groupy</span>
                            <em>{{hederText.text2}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance.jpg" class="banner">
            <img class="attendance-title" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance-title.png" alt="">
            <p class="attendance-desc">Groupyアプリおよび公式Twitter @GGroupyyy にて発表されます。<br>※アプリでの掲載期間は一週間となります。</p>
            <ul class="ranking_list">
                <li v-for="(idol,key) in ranking">
                    <a target="_blank" :href="hrefs" class="ranking-idol-content" @click="get_app('activityshare_idol_support')">
                        <span class="avatar"><img v-lazy="idol.avatar"></span>
                        <div class="name">{{idol.nickname?idol.nickname:'...'}}</div>
                        <div class="idol_desc">
                            <p><span>{{Number(idol.followedCount?idol.followedCount:0).toLocaleString()}}</span><i>フォロワー</i></p>
                            <p><span>{{Number(idol.fansCount?idol.fansCount:0).toLocaleString()}}</span><i>守護者</i></p>
                            <p><span>{{Number(idol.popularityCount?idol.popularityCount:0).toLocaleString()}}</span><i>Likes</i></p>
                        </div>
                    </a>
                    <img class="attendance-bg" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance-bg.png" alt="">
                </li>
            </ul>
        </div>
        <div class="groupy-footer">
            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.videomore}}</p>
                <a @click="get_app('activityshare_bottom_download')" target="_blank" :href="hrefs">{{hederText.videodownload}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
                ranking: [],
                idx: 0,
                idx2: 0,
                activityInfo:{},
                swiperOption2: {
                      setWrapperSize :true,
                      pagination : '.swiper-pagination',
                      grabCursor: true,
                      paginationClickable: true,
                      autoplayDisableOnInteraction: false,
                      loop : true,
                      autoplay: 3000
                },
                hederText: {
                    text1: '今日は浴衣だけど、どう？似合う...かな？',
                    text2: '推しメンの新たな一面を発見しよう！',
                    text3: '明日には握手会あるんだ、これを着れば良い？(/ω＼*)迷ったなぁ',
                    text4: '初めてのメイド服動画、ヾ(*´∀｀*)ﾉ絶対見てね...',
                    download: 'ダウンロード',
                    videomore: 'プライベート動画が盛りだくさん！',
                    commentmore: 'Groupyで推しメンにメッセージしよう',
                    videodownload: 'ダウンロードして入手する',
                    supportdownload: 'ダウンロードして応援する',
                    dream: '推しメンの夢を見守ってあげよう'
                },
            }
        },
        methods: {
          getList() {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                let startDate = getParams('startDate');
                let endDate = getParams('endDate');
                let dateCount = getParams('dateCount');
                http.get('/ranking/idolVideoAttendance',{
                    params: {
                        startDate:startDate,
                        endDate: endDate,
                        dateCount: dateCount
                        // dateCount: 1,
                    }
                }).then(function(res){
                    self.ranking = res.data;
                }).catch(function(){
                    self.idx++;
                    self.getList();
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          get_app(val) {
                this.p_log(val);
                var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                if (ua.match(/WeiBo/i) == "weibo") {
                    //在新浪微博客户端打开
                    alert('请用浏览器打开此页面，查看更多视频');
                }
            },
          p_log(val) {
                var _data = {

                    topic: "groupy",
                    app: "groupy",
                    platform: "h5",
                    system: navigator.userAgent,
                    version: "1.0.0",
                    action: val,
                    result: "success",
                    activityId: getParams('activityId')
                }
                http.post('https://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
            }
        },
        mounted() {
        },
        created() {
            this.getList();
            this.p_log('shareActivity_attendance_open');
            var ua = navigator.userAgent.toLowerCase();
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                if(/android/.test(ua)) {
                    this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'https://itunes.apple.com/cn/app/groupy-%E8%B6%85%E8%90%8C%E4%B8%89%E6%AC%A1%E5%85%83%E6%97%A5%E7%B3%BB%E7%88%B1%E8%B1%86%E7%9F%AD%E8%A7%86%E9%A2%91/id1270083927?mt=8';
                }
            } else {
                if(/android/.test(ua)) {
                    this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'https://itunes.apple.com/jp/app/groupy/id1270083927?mt=8';
                }
            }
        }
    }
</script>
