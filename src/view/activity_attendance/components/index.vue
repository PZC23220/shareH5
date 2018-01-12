<template>
    <div class="main">
        <div class="header">
            <swiper :options="swiperOption2" ref="mySwiper2">
                <swiper-slide id="swiper2" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" class="swiper-img">
                        <p class="swiper-tips">
                            <span>Groupy</span>
                            <em>{{hederText.text2}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance.jpg" class="banner">
            <img class="attendance-title" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance-title.png" alt="">
            <p class="attendance-desc">Groupyアプリおよび公式Twitter @GGroupyyy にて発表されます。<br>※アプリでの掲載期間は一週間となります。</p>
            <ul class="ranking_list">
                <li v-for="(idol,key) in ranking">
                    <div class="ranking-idol-content" @click="idol.idol_id?showIdolPage(idol.idol_id):false">
                        <span class="avatar"><img v-lazy="idol.avatar"></span>
                        <div class="name">{{idol.nickname?idol.nickname:'...'}}</div>
                        <div class="idol_desc">
                            <p><span>{{Number(idol.followedCount?idol.followedCount:0).toLocaleString()}}</span><i>フォロワー</i></p>
                            <p><span>{{Number(idol.fansCount?idol.fansCount:0).toLocaleString()}}</span><i>守護者</i></p>
                            <p><span>{{Number(idol.popularityCount?idol.popularityCount:0).toLocaleString()}}</span><i>Likes</i></p>
                        </div>
                    </div>
                    <img class="attendance-bg" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-attendance-bg.png" alt="">
                </li>
            </ul>
        </div>
        <div class="groupy-footer">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.videomore}}</p>
                <a @click="p_log('activityshare_bottom_download')" target="_blank" :href="hrefs">{{hederText.videodownload}}</a>
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
          showIdolPage(val) {
            console.log(val)
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showIdolPage', {'idolId': val})
            })
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
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
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
            if (/iphone|ipad|ipod/.test(ua)) {
                this.hrefs = 'itms-apps://itunes.apple.com/app/id1270083927';
            }else if(/android/.test(ua)) {
                this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
            }else {
                this.hrefs = 'https://itunes.apple.com/app/id1270083927';
            }
        }
    }
</script>
