<template>
    <div class="main">
        <div class="header">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
            <p>{{msg_text.download}}</p>
            <a @click="p_log('Top_Banner_Download_Click')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
        </div>
        <div class="content">
            <img :src="video.activity.img" style="width: 100%;" v-if="video.activity">
            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                <span><img :src="idol.avatar?idol.avatar: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png'" onerror="this.src='http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png'" alt=""></span>
                <div class="video_desc">
                    <h3>{{idol.nickname?idol.nickname:'Groupy'}}</h3>
                    <p>{{idol.introduce?idol.introduce:msg_text.waiting}}</p>
                </div>
            </div>
            <div class="vip_show" v-show="vipShow">
                <p><span style="color: #00B4BB" v-if="video.activity">#{{video.activity.tag}}#</span>{{video.title}}</p>
                <div class="video_banner">
                    <img :src="video.thumbnail" alt="">
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/icon_menbership.png" alt="">
                </div>
                <div class="video_bg"></div>
                <div class="vip_download">
                    <p v-html="msg_text.videoTips"></p>
                    <a @click="p_log('Video_Bottom_Download_Click')" target="_blank" :href="hrefs" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">{{msg_text.download_2}}</a>
                </div>
            </div>
            <div class="public_show"v-show="publicShow">
                <p><span style="color: #00B4BB;margin-right: 5px;" v-if="video.activityTag">#{{video.activityTag}}#</span>{{video.title}}</p>
                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
                <a @click="p_log('Video_Bottom_Download_Click')" target="_blank" :href="hrefs" class="download">{{msg_text.download_2}}</a>
            </div>
            <div class="default_page" v-show="pageNone">
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20like.png" alt="">
                <p v-show="pageNone2" v-html="msg_text.noneComment"></p>
                <a @click="p_log('Video_Bottom_Download_Click')" target="_blank" :href="hrefs" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">{{msg_text.download_2}}</a>
            </div>
            <div class="more_video">
                <h3>{{msg_text.recommend}}</h3>
                <ul>
                    <li class="con_left" :class="{'left_show':videos.length>0}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
                        <div class="video_bigImg">
                            <img :src="videos.length>0?videos[0].thumbnail:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_video.png'" class="video_poster" alt=""><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/timeline_icon_play.png" class="btn_play" alt="">
                            <div>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_bg_play%20times.png" class="time_bg" alt="">
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_icon_time.png" class="time_play" alt="">
                                <span v-html="videos.length>0?formatTime(videos[0].duration):'00:00'"></span>
                            </div>
                        </div>
                        <p class="video_content">{{videos.length>0?videos[0].title:msg_text.waiting}}</p>
                    </a></li>
                    <li class="con_left" :class="{'left_show':videos.length>2}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
                        <div class="video_bigImg">
                            <img :src="videos.length>2?videos[2].thumbnail:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_video.png'" class="video_poster" alt=""><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/timeline_icon_play.png" class="btn_play" alt="">
                            <div>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_bg_play%20times.png" class="time_bg" alt="">
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_icon_time.png" class="time_play" alt="">
                                <span v-html="videos.length>2?formatTime(videos[2].duration):'00:00'"></span>
                            </div>
                        </div>
                        <p class="video_content">{{videos.length>2?videos[2].title:msg_text.waiting}}</p>
                    </a></li>
                </ul>
                <ul>
                    <li class="con_left" :class="{'left_show':videos.length>1}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
                        <div class="video_bigImg">
                            <img :src="videos.length>1?videos[1].thumbnail:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_video.png'" class="video_poster" alt=""><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/timeline_icon_play.png" class="btn_play" alt="">
                            <div>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_bg_play%20times.png" class="time_bg" alt="">
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_icon_time.png" class="time_play" alt="">
                                <span v-html="videos.length>1?formatTime(videos[1].duration):'00:00'"></span>
                            </div>
                        </div>
                        <p class="video_content">{{videos.length>1?videos[1].title:msg_text.waiting}}</p>
                    </a></li>
                    <li class="con_left" :class="{'left_show':videos.length>3}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
                        <div class="video_bigImg">
                            <img :src="videos.length>3?videos[3].thumbnail:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_video.png'" class="video_poster" alt=""><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/timeline_icon_play.png" class="btn_play" alt="">
                            <div>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_bg_play%20times.png" class="time_bg" alt="">
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_icon_time.png" class="time_play" alt="">
                                <span v-html="videos.length>3?formatTime(videos[3].duration):'00:00'"></span>
                            </div>
                        </div>
                        <p class="video_content">{{videos.length>3?videos[3].title:msg_text.waiting}}</p>
                    </a></li>
                </ul>
            </div>
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@api/js/http.js';
    import $ from 'n-zepto';
    require('@api/js/common.js')
    export default {
        data() {
          return {
            playerOptions: {

              // component options
              start: 0,
              playsinline: true,
              autoplay: true,
              preload: true,
              // videojs options
              language: 'en',
              // playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "video/mp4",
                src: ""
              }],
              poster: "",
            },
            vipShow: false,
            publicShow: false,
            video: {},
            videos:[],
            idol: {},
            pageNone: true,
            pageNone2: false,
            // loadingBig: true,
            idolShow: false,
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            msg_text: {
                noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
                download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                downTips: 'インストール',
                waiting: 'Groupyで待ってまーす。',
                videoTips: 'この動画は会員のみ視聴可能です',
                vip: '会員登録へ',
                write: 'コメントする',
                total: '件すべてを表示',
                commentTips: 'コメント',
                download_2: 'Groupyをダウンロードしてもっと見よう'
            }
          }
        },
        methods: {
            formatTime(key) {
                let _m = Math.floor(key/60) >= 10 ? Math.floor(key/60) : '0'+ Math.floor(key/60);
                let _s = (key-Math.floor(key/60)*60) >= 10 ? (key-Math.floor(key/60)*60) : '0'+ (key-Math.floor(key/60)*60);
                return _m+":"+_s;
              },
            getURL(url) {
                    var xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP");
                    xmlhttp.open("GET", url, false);
                    xmlhttp.send();
                    console.log(xmlhttp)
                    if(xmlhttp.readyState==4) {
                        if(xmlhttp.Status != 200) alert("不存在");
                        return xmlhttp.Status==200;
                    }
                    return false;
            },
            getVideo() {
                var self = this;
                http.get('/video/get',{
                    params: {
                        videoId: getParams('videoId')
                    }
                }).then(function(res){
                    console.log(res);
                    if(res) {
                        if(res.data.related) {
                            self.videos = res.data.related;
                        }

                        if(res.data.idol) {
                            self.idolShow = true;
                            self.idol = res.data.idol;
                            // $('.htmlTilte').html(res.data.idol.nickname);
                            // $('.metaTitle').attr('content',res.data.idol.nickname);
                        }
                        if(res.data.video) {
                            self.video = res.data.video;
                            if(res.data.video.active == 1) {
                                self.pageNone = false;
                                self.pageNone2 = false;
                                // $('.metaDesc').attr('content',res.data.video.title);
                                // $('.metaImg').attr('content',res.data.video.thumbnail);
                                if(res.data.video.publicType == 1) {
                                    self.vipShow = true;
                                    self.publicShow = false;
                                }else {
                                    self.vipShow = false;
                                    self.publicShow = true;
                                    self.playerOptions.poster = res.data.video.thumbnail;
                                    let videoItem = res.data.video.videoItemList;
                                    let videoitem = {
                                        hd: '',
                                        ld: '',
                                        sd: ''
                                    };
                                    videoItem.forEach(function(item){
                                        if(item.resolution == 'sd') {
                                            $.ajax({
                                                url: item.url,
                                                type: 'head',
                                                async: false,
                                                success: function(res) {
                                                    videoitem.sd = item.url;
                                                }
                                            })
                                        }
                                        else if(item.resolution == 'ld') {
                                            $.ajax({
                                                url: item.url,
                                                type: 'head',
                                                async: false,
                                                success: function(res) {
                                                    videoitem.ld = item.url;
                                                }
                                            })
                                        }else {
                                            $.ajax({
                                                url: item.url,
                                                type: 'head',
                                                async: false,
                                                success: function(res) {
                                                    videoitem.hd = item.url;
                                                }
                                            })
                                        }
                                    })
                                    if(videoitem.hd) {
                                        self.playerOptions.sources[0].src = videoitem.hd
                                    }else if(videoitem.ld) {
                                        self.playerOptions.sources[0].src = videoitem.ld
                                    }else {
                                        self.playerOptions.sources[0].src = videoitem.sd
                                    }

                                }
                            } else {
                                self.pageNone = true;
                                self.pageNone2 = true;
                            }

                        }else {
                            self.pageNone = true;
                            self.pageNone2 = true;
                        }
                    }else {
                        self.pageNone = true;
                        self.pageNone2 = true;
                        self.vipShow = false;
                        self.publicShow = false;
                    }
                    // self.loadingBig = false;
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
                    videoId: getParams('videoId')
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
            }
        },
        mounted() {
          // console.log('this is current player instance object', this.player)
        },
        computed: {
          player() {
            return this.$refs.videoPlayer.player
          }
        },
        created() {
            this.getVideo();
            this.p_log('idol_shareVideo_h5_open');
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                this.hrefs = 'itms-apps://itunes.apple.com/app/id1270083927';
            }else if(/android/.test(ua)) {
                this.hrefs = 'http://play.google.com/store/apps/details?id=com.groupy.app.fans';
            }else {
                this.hrefs = 'http://itunes.apple.com/app/id1270083927';
            }
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                this.msg_text = {
                    noneComment: '还没有收到粉丝的评论<br>分享视频能让更多粉丝关注',
                    download: '会员独有的私密状态查看，一键应援，共同守护爱豆的成长!',
                    downTips: '下载',
                    waiting: '我在Groupy等你哦！',
                    videoTips: '成为爱豆守护者才能观看此视频',
                    vip: '成为守护者',
                    write: '添加评论',
                    total: '条评论',
                    commentTips: '共',
                    download_2: '下载groupy查看更多视频',
                    recommend: '相关视频'
                }
                $('.htmlTilte').html('Groupy');
                $('.metaTitle').attr('content','Groupy')
                $('.metaDesc').attr('content','快来Groupy跟偶像亲密互动吧')
              } else {
                this.msg_text = {
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
                    download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                    downTips: 'インストール',
                    waiting: 'Groupyで待ってまーす。',
                    videoTips: '会員のみ視聴可能です<br>会員登録して、アイドルのプライベート動画を見よう',
                    vip: '会員登録へ',
                    write: 'コメントする',
                    total: '件すべてを表示',
                    commentTips: 'コメント',
                    download_2: 'Groupyをダウンロードしてもっと見よう',
                    recommend: 'おすすめ'
                }
              }
        }
      }
</script>

<style scoped lang="scss">
    .default_page {
        a {
            display: block;
            color: #fff;
            width: 300px;
            height: 44px;
            line-height: 44px;
            opacity: 0.9;
            background: #FC4083;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 7.5px;
            margin: 20px auto;
        }
    }
</style>

<style lang="scss">
    .vjs_video_417-dimensions {
        height: auto !important;
        video {
            position: inherit !important;
        }
    }
    .vjs_video_3-dimensions {
        height: auto !important;
    }
    .vjs_video_375-dimensions,.vjs_video_388-dimensions {
        width: 100%;
        height: auto;
    }
    .video-js .vjs-tech {
        position: inherit !important;
    }
    .vjs-playback-rate-value {
        display: none;
    }
    .video-js.vjs-custom-skin .vjs-control-bar .vjs-fullscreen-control  {
        display: none;
    }
    .video-player .video-js.vjs-custom-skin .vjs-big-play-button {
        width: 41px !important;
        height: 41px !important;
        line-height: 41px !important;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: -20.5px;
        margin-top: -20.5px;
    }
    .public_show >p {
        font-size: 16px;
        padding: 0 12px 7.5px;
    }
    .video_bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.66) 100%);
        height: 155px;
    }
    .con_left {
        opacity: 0.2;
        transition: opacity 0.3s;
     }
    .left_show {
        opacity: 1;
    }
</style>
