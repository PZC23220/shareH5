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
                        <a class="swiper-download" @click="get_app('ticketshare_header_download')" target="_blank" :data-url="hrefs" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('ticketshare_header_download')" target="_blank" :data-url="hrefs" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('ticketshare_header_download')" target="_blank" :data-url="hrefs" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('ticketshare_header_download')" target="_blank" :data-url="hrefs" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <div class="meeting_content">
                <h2 class="title"><p></p><em>{{meeting_text.meeting}}</em><p></p></h2>
                <div class="meeting_times"><span class="meeting_begin">{{time.getFullYear()}}</span><i class="meeting_dates">{{((time.getMonth()+1)>9)?(time.getMonth()+1):'0'+(time.getMonth()+1)}}.{{time.getDate()>9?time.getDate():'0'+time.getDate()}}</i><em class="meeting_day">（{{getday}}）</em><span class="meeting_begin">{{meeting_text.start}}</span><i class="meeting_dates">{{time.getHours()>9?time.getHours():'0'+time.getHours()}}:{{time.getMinutes()>9?time.getMinutes():'0'+time.getMinutes()}}</i></div>
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/share/pic_1.png" class="arrow_left">
                <p class="meeting_see">{{meeting_text.tips}}</p>
                <p class="meeting_tips">{{meeting_text.tips_small}}</p>
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/share/pic_2.png" class="arrow_right">
                <span class="avatar" :style="avatar?'background-image:url('+ avatar +');':''"></span>
                <!-- <span class="avatar"></span> -->
                <div class="idolName">{{idolName}}</div>
            </div>
            <div class="meeting_desc">
                <h2 class="how">{{meeting_text.how}}</h2>
                <p class="how_desc">在Groupy {{meeting_text.tips2}}</p>
                <p class="how_tips">{{meeting_text.ios}}</p>
                <img class="live_bg" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/bg_1.jpg">
            </div>
        </div>
        <div class="meeting-footer"><a target="_blank" :data-url="hrefs" :href="hrefs" @click="get_app('ticketshare_bottom_download')">{{meeting_text.invite}}</a></div>
    </div>
</template>

<script>
    import http from '@api/js/http.js';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                idolName: '',
                avatar: '',
                time:'',
                getday:'',
                swiperOption2: {
                      setWrapperSize :true,
                      pagination : '.swiper-pagination',
                      grabCursor: true,
                      paginationClickable: true,
                      autoplayDisableOnInteraction: false,
                      loop : true,
                      autoplay: 3000
                },
                hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
                meeting_text: {
                    meeting: '1V1生配信決定',
                    start: '開始',
                    tips: '1対1思いっきりチャットしない？1V1生配信実施決定！',
                    tips_small: '会いたいから、来てね～',
                    how: '参加方法',
                    tips2: '在Groupy Groupyアプリ内チケットを購入すると、アイドルと1対1ビデオチャットすることができます。整理番号は、1番から順に先着順で発行します。',
                    ios: '※iOS版限定',
                    invite: '会いに行く'
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
            formatDay(key) {
                let timer = key.getDay();
                let self = this;
                if(getParams('language') == 'cn') {
                    switch (timer) {
                        case 0 :
                                self.getday = "周日";
                                break;
                        case 1 :
                                self.getday = "周一";
                                break;
                        case 2 :
                                self.getday = "周二";
                                break;
                        case 3 :
                                self.getday = "周三";
                                break;
                        case 4 :
                                self.getday = "周四";
                                break;
                        case 5 :
                                self.getday = "周五";
                                break;
                        case 6 :
                                self.getday = "周六";
                                break;
                    }
                }else {
                    switch (timer) {
                        case 0 :
                                self.getday = "日";
                                break;
                        case 1 :
                                self.getday = "月";
                                break;
                        case 2 :
                                self.getday = "火";
                                break;
                        case 3 :
                                self.getday = "水";
                                break;
                        case 4 :
                                self.getday = "木";
                                break;
                        case 5 :
                                self.getday = "金";
                                break;
                        case 6 :
                                self.getday = "土";
                                break;
                    }
                }
                return  self.getday;
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
                    idolId: getParams('idolId')
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                })
            }
        },
        created() {
            var self = this;
            self.idolName = decodeURIComponent(getParams('idolName'));
            self.avatar = decodeURIComponent(getParams('avatar'));
            self.time = new Date(decodeURIComponent(getParams('time'))*1000);
            self.formatDay(self.time);
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            let ua = navigator.userAgent.toLowerCase();
             if(_lan === 'zh-cn') {
                if(/android/.test(ua)) {
                    this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'http://itunes.apple.com/cn/app/groupy-%E8%B6%85%E8%90%8C%E4%B8%89%E6%AC%A1%E5%85%83%E6%97%A5%E7%B3%BB%E7%88%B1%E8%B1%86%E7%9F%AD%E8%A7%86%E9%A2%91/id1270083927?mt=8';
                }
                 self.meeting_text= {
                    meeting: '见面会邀请',
                    start: '开始',
                    tips: '想和我面对面聊天？欢迎参加我的1V1线上见面会！',
                    tips_small: '无论你在哪里，都能与我相见哦！',
                    how: '如何参加？',
                    tips2: '在Groupy APP内购买见面券，根据购买的顺序确定入场番号，一次在APP内与爱豆线上见面。',
                    ios: '※目前仅支持iOS',
                    invite: '接受邀请'
                }
                this.hederText = {
                    text1: '心动：她穿和服的样子很可爱？！',
                    text2: '守护爱豆的梦想，为她应援',
                    text3: '今天有握手会，选哪件衣服比较合适？帮她选择...',
                    text4: '首次尝试女仆装，竟然异常适合她',
                    download: '打开应用',
                    videomore: '更多视频，尽在Groupy',
                    commentmore: '更多留言，尽在Groupy',
                    videodownload: '下载Groupy，查看更多视频',
                    supportdownload: '下载Groupy，为她应援',
                    dream: '她的梦想 由你守护'
                }
            } else {
                if(/android/.test(ua)) {
                    this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'http://itunes.apple.com/jp/app/groupy/id1270083927?mt=8';
                }
                self.meeting_text= {
                    meeting: '1V1生配信決定',
                    start: '開始',
                    tips: '1対1思いっきりチャットしない？1V1生配信実施決定！',
                    tips_small: '会いたいから、来てね～',
                    how: '参加方法',
                    tips2: '在Groupy Groupyアプリ内チケットを購入すると、アイドルと1対1ビデオチャットすることができます。整理番号は、1番から順に先着順で発行します。',
                    ios: '※iOS版限定',
                    invite: '会いに行く'
                }
                this.hederText = {
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
                }
            }
        }
    }
</script>
