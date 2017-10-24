<template>
    <div class="main">
        <div class="content">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/acticity_banner/activity-halloween.jpg" class="banner">
            <h2 class="activity_title">ハロウィンを盛り上げよう！期間中上位のアイドルは起動画面・次のイベントバナーに掲載など豪華な特典が盛りだくさん！さらに、ファンにも、ハロウィン限定ギフトと推しメンの直筆メッセージカードを用意！</h2>
            <div class="idol-ranking" v-if="ranking.length > 0">
                <div class="ranking-two">
                    <div class="ranking-idol" v-if="ranking.length > 0"><p class="avatar-content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/ranking_1.png"><img :src="ranking[0].avatar?ranking[0].avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'"></p><p class="idolName-content"><span>{{ranking[0].nickname?ranking[0].nickname:'...'}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(ranking[0].popularity?ranking[0].popularity:0).toLocaleString()}}</i></span></p></div>
                    <div class="ranking-idol" v-if="ranking.length > 1"><p class="avatar-content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/ranking_2.png"><img :src="ranking[1].avatar?ranking[1].avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'"></p><p class="idolName-content"><span>{{ranking[1].nickname?ranking[1].nickname:'...'}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(ranking[1].popularity?ranking[1].popularity:0).toLocaleString()}}</i></span></p></div>
                    <div class="ranking-idol" v-if="ranking.length > 2"><p class="avatar-content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/ranking_2.png"><img :src="ranking[2].avatar?ranking[2].avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'"></p><p class="idolName-content"><span>{{ranking[2].nickname?ranking[2].nickname:'...'}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(ranking[2].popularity?ranking[1].popularity:0).toLocaleString()}}</i></span></p></div>
                </div>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download ranking-download">ランキング</a>
            </div>
            <div class="idol-ranking" v-if="ranking.length <= 0">
                <div class="ranking-one">
                   <div class="img_content">
                        <img v-lazy="idol.avatar?idol.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" class="avatar">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_ranking_1.png" class="ranking_pic">
                        <span class="idol_level">NO.{{idol.ranking?idol.ranking:'-'}}</span>
                    </div>
                    <div class="name">{{idol.nickname?idol.nickname:'...'}}</div>
                    <div class="idol_desc">
                        <!-- <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(ranking.length>0?(idol.gcoin?idol.gcoin:0):0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                        <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span></p>
                        <p><span><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i>作品</i></p>
                    </div>
                </div>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="width: 150px;">Groupyへ応援する</a>
            </div>
            <div class="share_content">
                <div class="video_content" v-for="(hot,key) in videos" v-if="key < 10">
                    <div class="userinfo con_left" :class="{'left_show':idolShow}" v-if="hot.idol">
                        <img :src="hot.idol.avatar?hot.idol.avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" onerror="this.src='http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" alt="">
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
                            <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/Like.png" class="cursor">10</a>
                            <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/gift.png" class="cursor"></a>
                        </div>
                        <span class="play_times"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/Video/video_icon_play%20times.png">{{hot.readCount}}</span>
                        <div class="Masked2" v-if="hot.publicType == 1">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_vip.png">
                            <p>この動画は会員のみ視聴可能です</p>
                            <a :href="hrefs" target="_blank">会員登録へ</a>
                        </div>
                    </div>
                    <div class="video_desc_content">
                        <a :href="hrefs" target="_blank" class="video_option"><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png">{{hot.giftCount}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png">{{hot.popularity}}</span><div><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_comment.png">コメントする</div></a>
                        <p class="video_text">{{hot.title}}</p>
                        <ul class="comment_list" style="background: #fff;">
                            <div class="comment_total"><span><i>コメント{{hot.postList.length}}件すべてを表示</i></span></div>
                            <li v-for="comment in hot.postList" style="border: none;padding: 0 12px 3px;">
                               <div class="comment_content"><span>{{comment.nickname?comment.nickname:'...'}}</span>{{comment.content}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a> -->
            </div>
        </div>
        <div class="header">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">インストール</a>
        </div>
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
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
            hotList:[],
            idol: {},
            fansList: [],
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            bigImgShow: false,
            videos: [],
            ranking: []
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
                let timer = new Date(key - 1*60*60*1000);
                return timer.Format('MM.dd') + '  '+ timer.Format('hh:mm');
            },
            getActivityInfo() {
                var self = this;
                http.get('/video/shareActivityVideos',{
                    params: {
                        idolId: getParams('idolId'),
                        activityId: getParams('activityId')
                    }
                }).then(function(res){
                    console.log(res)
                    if(res.data.selfRanking) {
                        self.idol = res.data.selfRanking;
                    }
                    if(res.data.videos) {
                        self.videos = res.data.videos;
                    }
                }).catch(function(){

                });
            },
            getRanking() {
                var self = this;
                http.get('/video/activityIdols',{
                    params: {
                        activityId: getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    if(res.data.ranking) {
                        self.ranking = res.data.ranking;
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
                    console.log(res);
                    if(res.data.videos) {
                        self.videos = res.data.videos;
                    }
                }).catch(function(){

                });
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
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        created() {
            if(getParams('isFans') == 1 || !getParams('idolId')) {
                this.getRanking();
                this.getVideoList();
            }else {
                this.getActivityInfo();
            }
            
            // this.p_log('idol_shareActivity_h5_open');
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