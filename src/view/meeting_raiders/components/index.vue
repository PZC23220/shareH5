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
                        <a class="swiper-download" @click="get_app('meetingRaiders_header_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('meetingRaiders_header_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('meetingRaiders_header_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('meetingRaiders_header_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <img :src="meeting_text.banner" class="live_banner">
            <h2 class="live_title">{{meeting_text.what}}</h2>
            <span class="live_border_bottom"></span>
            <p class="live_desc">{{meeting_text.what_desc}}</p>
            <h2 class="live_title">{{meeting_text.how}}</h2>
            <span class="live_border_bottom"></span>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_1.png" class="live_step">
            <p class="live_desc">{{meeting_text.live}}</p>
            <div class="live_process"><span class="process_tips">{{meeting_text.entrance}}</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips">{{meeting_text.tickets}}</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips two" v-html="meeting_text.numbers"></span></div>
            <div class="live_imgs"><img :src="meeting_text.img1"><img :src="meeting_text.img2"><img :src="meeting_text.img3"></div>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_2.png" class="live_step">
            <p class="live_desc">{{meeting_text.videos}}</p>
            <div class="live_process live_process_blue"><span class="process_tips" :class="{'two': meeting_text.coming != '进入'}" v-html="meeting_text.coming"></span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips" :class="{'two': meeting_text.waitng != '等候'}" v-html="meeting_text.waitng"></span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips" :class="{'two': meeting_text.meet != '见面'}" v-html="meeting_text.meet"></span></div>
            <div class="live_imgs"><img  :src="meeting_text.img4"><img  :src="meeting_text.img5"><img  :src="meeting_text.img6"></div>
        </div>
        <div class="groupy-footer">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.dream}}</p>
                <a @click="get_app('meetingRaiders_bottom_download')" target="_blank" :href="hrefs">{{hederText.supportdownload}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '@api/js/http.js';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    require('@api/js/common.js')
    export default {
        data() {
            return {
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
                    what: '1V1生配信とは？',
                    what_desc: '1V1生配信とは、アイドルがオンラインでファンミーティングを開催することができるGroupyの絶賛新機能です。1対1生配信にて、アイドルとファンは1対1ビデオチャットすることができます。',
                    how: '参加方法',
                    live: 'チケットを購入  Groupy-【LIVE】画面にアイドルの1V1生配信チケットを購入してください。整理番号順に配信していただきます',
                    entrance: '選択',
                    tickets: '購入',
                    numbers: '番号を<br>入手',
                    videos: 'アイドルと生配信  配信当日にホームからお早めに入室してお待ちください。順番になると、自動的にアイドル側との接続を行います。配信の終了時間になると、接続が自動的に切断されます。',
                    coming: '入室<br>する',
                    waitng: '順番を<br>待つ',
                    meet: '生配信<br>開始',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_jp.jpg',
                    img1: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/1.jpg',
                    img2: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/2.jpg',
                    img3: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/3.jpg',
                    img4: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/4.jpg',
                    img5: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/5.jpg',
                    img6: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/6.jpg',
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
                    result: "success"
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                })
            }
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            let ua = navigator.userAgent.toLowerCase();
             if(_lan === 'zh-cn') {
                if(/android/.test(ua)) {
                    this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'http://itunes.apple.com/cn/app/groupy-%E8%B6%85%E8%90%8C%E4%B8%89%E6%AC%A1%E5%85%83%E6%97%A5%E7%B3%BB%E7%88%B1%E8%B1%86%E7%9F%AD%E8%A7%86%E9%A2%91/id1270083927?mt=8';
                }
                 self.meeting_text= {
                    what: '是什么',
                    what_desc: '1V1见面会是Groupy推出的偶像粉丝互动新模式：偶像进行线上直播，与粉丝一对一视频连线，即可单独见面。',
                    how: '怎么参加',
                    live: '购买见面券   在Groupy-【LIVE】发现偶像的见面会，购买见面券获得入场番号，当天根据番号进行见面',
                    entrance: '入口',
                    tickets: '购票',
                    numbers: '获得<br>番号',
                    videos: '视频连线见面   见面会当天，从首页进入直播间等候，到了番号即自动与偶像进行视频连线。见面时间结束后，将自动断开连接。',
                    coming: '进入',
                    waitng: '等候',
                    meet: '见面',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_cn.jpg',
                    img1: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/1.jpg',
                    img2: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/2.jpg',
                    img3: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/3.jpg',
                    img4: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/4.jpg',
                    img5: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/5.jpg',
                    img6: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/cn/6.jpg',
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
                    what: '1V1生配信とは？',
                    what_desc: '1V1生配信とは、アイドルがオンラインでファンミーティングを開催することができるGroupyの絶賛新機能です。1対1生配信にて、アイドルとファンは1対1ビデオチャットすることができます。',
                    how: '参加方法',
                    live: 'チケットを購入  Groupy-【LIVE】画面にアイドルの1V1生配信チケットを購入してください。整理番号順に配信していただきます',
                    entrance: '選択',
                    tickets: '購入',
                    numbers: '番号を<br>入手',
                    videos: 'アイドルと生配信  配信当日にホームからお早めに入室してお待ちください。順番になると、自動的にアイドル側との接続を行います。配信の終了時間になると、接続が自動的に切断されます。',
                    coming: '入室<br>する',
                    waitng: '順番を<br>待つ',
                    meet: '生配信<br>開始',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_jp.jpg',
                    img1: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/1.jpg',
                    img2: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/2.jpg',
                    img3: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/3.jpg',
                    img4: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/4.jpg',
                    img5: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/5.jpg',
                    img6: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/jp/6.jpg',
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
