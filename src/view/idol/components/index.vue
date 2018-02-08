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
                        <a class="swiper-download" @click="get_app('pageshare_float_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('pageshare_float_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('pageshare_float_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('pageshare_float_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <div class="idol_desc" :style="groupInfo.bgImg?'background-image:url('+ groupInfo.bgImg +');':''">
                <div class="idol_desc_content">
                    <div>
                        <a @click="get_app('pageshare_idol_info')" :href="hrefs" class="cursor" target="_blank"><span class="avatar" :style="idol.avatar?'background-image:url('+ idol.avatar +');':''"></span></a>
                        <span class="ranking_position">{{monthlyRanking?monthlyRanking:0}}位</span>
                        <span class="idol_name" :class="{'none':!organization.name}">{{idol.nickname?idol.nickname:'...'}}</span>
                        <span class="idol_org" v-if="organization.name">@{{organization.name}}</span>
                        <div class="idol_support">
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_follow_1.png" alt=""><em>{{totalFollower?Number(totalFollower).toLocaleString():0}}</em></span>
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_vip_1.png" alt=""><em>{{totalGuardian?Number(totalGuardian).toLocaleString():0}}</em></span>
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes_1.png" alt=""><em>{{totalPopularity?Number(totalPopularity).toLocaleString():0}}</em></span>
                        </div>
                        <div class="attention">
                            <a class="cursor" @click="get_app('pageshare_idol_follow')" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_follow.png"><i>{{msg_text.come}}</i></a>
                            <a class="cursor" @click="get_app('pageshare_idol_follow')" :href="hrefs" target="_blank"><img style="margin-top: 4px;" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_vip.png"><i>{{msg_text.protector}}</i></a>
                        </div>
                        <a @click="get_app('pageshare_idol_info')" class="idol_fans_ranking cursor" :href="hrefs" target="_blank"><i>{{msg_text.fans}}</i><div><img v-for="img in fansList" v-lazy="img.avatar"></div><div class="no_fans" v-if="fansList.length<=0">No.1になって目立とう！</div><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png"></a>
                    </div>
                </div>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{msg_text.video}}</a>
                <a class="tabs" @click="changePages(1)">{{msg_text.comment}}</a>
                <!-- <a class="tabs" :href="hrefs" target="_blank">{{msg_text.msg}}</a> -->
                <!-- <a class="tabs" :href="hrefs" target="_blank">{{msg_text.shop}}</a> -->
            </div>
            <div class="share_content">
                <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                    <!-- slides -->
                    <swiper-slide id="swiper1">
                        <div class="feature-video">
                            <ul class="video-list">
                                <li v-for="video in videos" @click="openVideo(video.id)">
                                    <div class="poster" :style="video.thumbnail?'background-image:url('+ video.thumbnail +');':''"></div>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
                                </li>
                            </ul>
                            <div class="bottom-line"><span></span><em>{{msg_text.videomore}}</em><span></span></div>
                        </div>
                    </swiper-slide>
                    <swiper-slide id="swiper2">
                        <ul class="comment_list dynamic">
                        <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                            <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                                <div class="userinfo">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                        </div>
                        <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]">
                            <div class="comment_info">
                                <span class="avatar" :style="comment.avatar?'background-image:url('+ comment.avatar +');':''"></span>
                                <span class="nickname">{{comment.nickname?comment.nickname:'...'}}</span>
                                <span class="level" v-if="comment.userType == 'fans'">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_1.png'" v-if="comment.medal&&comment.medal>0" alt="">
                                <!-- <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt=""> -->
                                <i v-html="formatTime(comment.createTime)"></i>
                            </div>
                            <div class="comment_content">
                                <p>{{comment.content}}</p>
                                <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                                    <span @click="showBigImg(img)" :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="img in JSON.parse(comment.imgs)" :style="img?'background-image:url('+ img +');':''"></span>
                                </div>
                            </div>
                        </li>
                        <div class="default_page" v-show="commentList.length == 0 && idx!=0">
                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                            <p v-html="msg_text.noneComment"></p>
                        </div>
                    </ul>
                    <div class="bottom-line"><span></span><em>{{msg_text.commentmore}}</em><span></span></div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="groupy-footer">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.dream}}</p>
                <a @click="get_app('pageshare_bottom_download')" target="_blank" :href="hrefs">{{hederText.supportdownload}}</a>
            </div>
        </div>
        <div class="bigImg" @click="bigImgShow = false" :class="{'bullet_box_show':bigImgShow}"><img :src="Imgsrc"><span></span></div>
    </div>
</template>
<style lang="scss" scoped>
 @import "../../../css/idol.scss";
</style>
<script>
    import VideoPlayer from 'vue-video-player';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
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
            swiperOption: {
                  notNextTick: true,
                  setWrapperSize :true,
                  observeParents:true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                  }
            },
            playerOptions: {

              // component options
              start: 0,
              playsinline: true,
              // autoplay: true,
              preload: true,
              // videojs options
              language: 'en',
              // playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "video/mp4",
                src: ''
              }],
              poster: "",
            },
            vipShow: false,
            publicShow: false,
            video: {},
            videos:[],
            idol: {},
            // activities: [],
            totalFollower: 0,
            totalGuardian: 0,
            totalPopularity: 0,
            monthlyRanking: 0,
            groupInfo: {},
            organization: {},
            pageNone: true,
            pageNone2: false,
            loadingBig: true,
            idolShow: false,
            commentList: [],
            idx: 0,
            boxShow: false,
            havedlast: false,
            msg_text: {
                noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                come: '推しメン',
                protector: '守護者登録へ',
                downTips: 'インストール',
                people: 'ファン',
                like: 'Likes',
                fans: 'ファンランキング',
                waiting: 'Groupyで待ってまーす。',
                video: '動画',
                comment: '掲示板',
                shop: 'ストア',
                msg: '個チャ',
                videoTips: 'この動画は会員のみ視聴可能です',
                write: 'コメントする',
                total: '件すべてを表示',
                commentTips: 'コメント',
                shows: '参加中のイベント',
                download_2: 'Groupyをダウンロードしてもっと見よう',
                good: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_good.png',
                hot: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hot.png',
                recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend.png',
                videomore: 'Groupyで動画をもっと入手しよう',
                commentmore: 'Groupyで推しメンにメッセージしよう'
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
            hotList:[],
            idol: {},
            fansList: [],
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            Imgsrc: 'http://upload.groupy.vip/post/D4AC388D-F977-4A9A-A973-E3CB18A76978.jpg',
            bigImgShow: false
          }
        },
        methods: {
            openVideo(id) {
                this.p_log('pageshare_video_play')
                if(sessionStorage.getItem('openVideo')) {
                    window.open(this.hrefs,'_blank');
                }else {
                    window.open(`${location.href}video?videoId=${id}`,'_blank');
                }
                sessionStorage.setItem('openVideo', 'groupy');
            },
            getSrc(obj,poster) {
               let playerOptions= {

                  // component options
                  start: 0,
                  playsinline: true,
                  // autoplay: true,
                  preload: true,
                  // videojs options
                  language: 'en',
                  // playbackRates: [0.7, 1.0, 1.5, 2.0],
                  sources: [{
                    type: "video/mp4",
                    src: obj.url
                  }],
                  poster: poster,
                }
                return playerOptions;
            },
            showBigImg(img) {
                this.Imgsrc = img;
                this.bigImgShow = true;
            },
            changePages(val) {
                let tabs = $('.tabs');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper.slideTo(val, 500, false)
                if(val == 0) {

                }else if(val == 1) {

                }else {

                }
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '  '+ timer.Format('hh:mm');
            },
            getIdolInfo() {
                var self = this;
                http.get('/share/idolHome',{
                    params: {
                        idolId: getParams('idolId')
                    }
                }).then(function(res){
                    console.log(res);
                    if(res.data.idol) {
                        self.idol = res.data.idol;
                    }
                    if(res.data.groupInfo) {
                        self.groupInfo = res.data.groupInfo;
                    }
                    if(res.data.hotList) {
                        self.videos = res.data.hotList;
                    }
                    if(res.data.totalFollower) {
                        self.totalFollower = res.data.totalFollower;
                    }
                    if(res.data.totalGuardian) {
                        self.totalGuardian = res.data.totalGuardian;
                    }
                    if(res.data.totalPopularity) {
                        self.totalPopularity = res.data.totalPopularity;
                    }
                    if(res.data.fansList) {
                        self.fansList = res.data.fansList;
                    }
                    if(res.data.monthlyRanking) {
                        self.monthlyRanking = res.data.monthlyRanking;
                    }
                })
            },
            getComments() {
                let self = this;
                http.get('/post/listByFans',{
                    params: {
                        idolId: getParams('idolId'),
                        from: 0,
                        rows: 10
                    }
                }).then(function(res){
                    self.loadingBig = false;
                    self.showLoading = false;
                    self.joined = res.data.joined;
                    if(res.data.post.length > 0 ) {
                        for(var i=0;i<res.data.post.length;i++){
                            self.commentList.push(res.data.post[i]);
                        }
                    }else {
                        self.havedlast = true;
                    }
                })
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
                }).catch(function(){

                })
            }
        },
        mounted() {
            window.onscroll = function (e) {
              // 当页面的滚动条滚动时,会执行这里的代码
              if(window.pageYOffset >= 309){
                $('.detailPages').css({'position':'fixed'})
              }else {
                $('.detailPages').css({'position':'static'})
              }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            swiper2() {
                return this.$refs.mySwiper2.swiper
            }
        },
        created() {
            this.getIdolInfo();
            this.getComments();
            this.p_log('pageshare_idol_open');
            var ua = navigator.userAgent.toLowerCase();
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                if(/android/.test(ua)) {
                    this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'https://itunes.apple.com/cn/app/groupy-%E8%B6%85%E8%90%8C%E4%B8%89%E6%AC%A1%E5%85%83%E6%97%A5%E7%B3%BB%E7%88%B1%E8%B1%86%E7%9F%AD%E8%A7%86%E9%A2%91/id1270083927?mt=8';
                }
                this.msg_text = {
                    noneComment: '还没有留言<br>去发布留言，让粉丝来互动吧！',
                    download: '会员独有的私密状态查看，一键应援，共同守护爱豆的成长!',
                    come: '关注',
                    protector: '成为守护者',
                    downTips: '下载',
                    people: '守护者',
                    like: 'Likes',
                    fans: '贡献排行榜',
                    waiting: '我在Groupy等你哦！',
                    video: '动态',
                    comment: '留言板',
                    shop: '商城',
                    msg: '活动',
                    videoTips: '成为爱豆守护者才能观看此视频',
                    vip: '成为守护者',
                    write: '添加评论',
                    total: '条评论',
                    commentTips: '共',
                    shows: '活动参加中',
                    download_2: '下载groupy查看更多视频',
                    good: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_good_cn.png',
                    hot: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hot_cn.png',
                    recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend_cn.png',
                    videomore: '更多视频，尽在Groupy',
                    commentmore: '更多留言，尽在Groupy'
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
                    this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'https://itunes.apple.com/jp/app/groupy/id1270083927?mt=8';
                }
                this.msg_text = {
                    noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                    download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                    come: '推しメン',
                    protector: '守護者登録へ',
                    downTips: 'インストール',
                    people: 'ファン',
                    like: 'Likes',
                    fans: 'ファンランキング',
                    waiting: 'Groupyで待ってまーす。',
                    video: '動画',
                    comment: '掲示板',
                    shop: 'ストア',
                    msg: '個チャ',
                    videoTips: 'この動画は会員のみ視聴可能です',
                    vip: '会員登録へ',
                    write: 'コメントする',
                    total: '件すべてを表示',
                    commentTips: 'コメント',
                    shows: '参加中のイベント',
                    download_2: 'Groupyをダウンロードしてもっと見よう',
                    good: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_good.png',
                    hot: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hot.png',
                    recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend.png',
                    videomore: 'Groupyで動画をもっと入手しよう',
                    commentmore: 'Groupyで推しメンにメッセージしよう'
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
