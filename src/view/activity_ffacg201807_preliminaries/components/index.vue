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
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="get_app('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <img v-if="isOver" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-ffacg201807_preliminaries-over.jpg" class="banner">
            <img v-else src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-ffacg201807_preliminaries.jpg" class="banner">
            <div class="activity_rule box" style="padding: 12px;font-size:14px;">
                <p>上位1名のグループはGroupy Idol Festival July 2018~in広州~に出演して頂きます！！ぜひご参加ください～♪</p>
                <p>排名第一的团体即可获得Groupy偶像祭 July 2018~in广州~出演权！一定要踊跃参加哦。</p>
            </div>
            <div class="idol-ranking box">
                <div class="ranking-two">
                    <div class="ranking-idol" v-for="(idol , key) in ranking" v-if="key < 3"><p class="avatar-content"><img :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/ranking_'+ (key+1) +'.png'"><span><img v-lazy="idol.orgLogo?idol.orgLogo:idol.avatar"></span></p><p class="idolName-content"><span>{{idol.orgName?idol.orgName:idol.nickname}}</span><span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</i></span></p></div>
                </div>
                <img class="no-ranking" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20ranking.jpg" v-if="ranking.length <= 0">
                <p class="no-ranking-tips" v-if="ranking.length <= 0">ランキング集計中...</p>
                <a v-if="ranking.length > 0" @click="get_app('activityshare_activity_ranking')" target="_blank" :href="hrefs" class="download ranking-download">ランキング</a>
            </div>
            <div class="share_content">
                <div class="activity-video_content box" v-for="(hot,key) in videos" v-if="key < 10">
                    <div class="userinfo con_left" :class="{'left_show':idolShow}" v-if="hot.idol">
                        <span><img v-lazy="hot.idol.avatar" alt=""></span>
                        <div class="video_desc">
                            <h3>{{hot.idol.nickname?hot.idol.nickname:'...'}}</h3>
                            <p>{{formatTime(hot.publishTime)}}</p>
                        </div>
                    </div>
                    <div class="public_show">
                        <video-player  ref="videoPlayer" :options="hot.videoItemList[2]?getSrc(hot.videoItemList[2],hot.thumbnail):false" v-if="hot.publicType != 1"></video-player>
                        <img :src="hot.thumbnail?hot.thumbnail:hot.firstFrame" v-else></img>
                        <div class="Masked" v-if="hot.publicType == 1"></div>
                        <div class="gift_content">
                            <a @click="get_app('activityshare_idol_support')" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/Like.png" class="cursor"></a>
                        </div>
                        <div class="Masked2" v-if="hot.publicType == 1">
                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/icon_vip.png">
                            <p>この動画は守護者のみ視聴可能です</p>
                            <a @click="get_app('activityshare_idol_support')" :href="hrefs" target="_blank">守護者のみ</a>
                        </div>
                    </div>
                    <div class="video_desc_content">
                        <p class="video_text"><span style="color: #00B4BB" v-if="hot.activityTag">#{{hot.activityTag}}#</span>{{hot.title}}</p>
                        <ul class="comment_list" style="background: #fff;">
                            <div class="comment_total"><span><i>コメント{{hot.postList.length}}件すべてを表示</i></span></div>
                            <li v-for="comment in hot.postList" style="border: none;padding: 0 12px 3px;">
                               <div class="comment_content"><span>{{comment.nickname?comment.nickname:'...'}}</span>{{comment.content}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="groupy-footer">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.videomore}}</p>
                <a @click="get_app('activityshare_bottom_download')" target="_blank" :href="hrefs">{{hederText.videodownload}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@api/js/http.js';
    import scrollReveal from  'scrollreveal'
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            scrollReveal:scrollReveal(),
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
                type: "application/x-mpegURL",
                src: '',
                withCredentials: false
              }],
              poster: "",
              techOrder: 'vimeo'
            },
            vipShow: false,
            publicShow: false,
            video: {},
            videos:[],
            idol: {},
            pageNone: true,
            loadingBig: true,
            idolShow: false,
            commentList: [],
            idx: 0,
            boxShow: false,
            havedlast: false,
            msg_text: {
                publish: '投稿',
                pubMsg: '投稿して<br>盛り上がろう',
                noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                load: '読み込み中',
                loadAll: '全て表示されました'

            },
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
            hotList:[],
            idol: {},
            fansList: [],
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            bigImgShow: false,
            videos: [],
            ranking: [],
            isOver: false
          }
        },
        methods: {
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
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '  '+ timer.Format('hh:mm');
            },
            getRanking() {
                var self = this;
                http.get('/ranking/idolActVideoByOrganzation',{
                    params: {
                        activityId: getParams('activityId'),
                        rows: 5
                    }
                }).then(function(res){
                    console.log(res);
                    if(res.data.ranking) {
                        self.ranking = res.data.ranking;
                    }
                    if(res.data.isActivityEnded) {
                        self.isOver = true;
                    }else {
                        self.isOver = false;
                    }
                }).catch(function(){

                });
            },
            getVideoList() {
                var self = this;
                http.get('/video/activityVideos',{
                    params: {
                        activityId: getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    if(res.data.videos) {
                        self.videos = res.data.videos;
                    }
                }).catch(function(){

                });
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
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
            }
        },
        mounted() {
          this.scrollReveal.reveal('.box', {
            duration: 600,
          });
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        created() {
            this.getRanking();
            this.getVideoList();

            this.p_log('shareActivity_ffacg201807Preliminaries_open');
            let ua = navigator.userAgent.toLowerCase();
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                if(/android/.test(ua)) {
                    this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'http://itunes.apple.com/cn/app/groupy-%E8%B6%85%E8%90%8C%E4%B8%89%E6%AC%A1%E5%85%83%E6%97%A5%E7%B3%BB%E7%88%B1%E8%B1%86%E7%9F%AD%E8%A7%86%E9%A2%91/id1270083927?mt=8';
                }
            } else {
                if(/android/.test(ua)) {
                    this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
                }else {
                    this.hrefs = 'http://itunes.apple.com/jp/app/groupy/id1270083927?mt=8';
                }
            }
        }
      }
</script>
