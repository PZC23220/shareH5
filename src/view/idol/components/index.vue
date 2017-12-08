<template>
    <div class="main">
        <div class="header">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
            <p>{{msg_text.download}}</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
        </div>
        <div class="content">
            <div class="idol_desc">
                <!-- <div class="idol_desc_bg" :style="groupInfo.bgImg?'background-image: url('+ idol.bgImg +');':'background-image: url(http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png);'"></div> -->
                <img class="idol_desc_bg" :src="groupInfo.bgImg?groupInfo.bgImg:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/bg.png'" alt="">
                <div class="idol_desc_content">
                    <div>
                        <a :href="hrefs" class="cursor" target="_blank"><span class="avatar"><img v-lazy="idol.avatar"></span></a>
                        <span class="ranking_position">{{idol.rankingPosition?idol.rankingPosition:0}}位</span>
                        <span class="idol_name">{{idol.nickname?idol.nickname:'...'}}</span>
                        <span class="idol_org" v-if="organization.name">@{{organization.name}}</span>
                        <div class="idol_support">
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_follow_1.png" alt=""><em>{{totalFollowed?Number(totalFollowed).toLocaleString():0}}</em></span>
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_vip_1.png" alt=""><em>{{idol.fansNums?Number(idol.fansNums).toLocaleString():0}}</em></span>
                            <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes_1.png" alt=""><em>{{idol.popularityScore?Number(idol.popularityScore).toLocaleString():0}}</em></span>
                        </div>
                        <div class="attention">
                            <a class="cursor" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_follow.png"><i>{{msg_text.come}}</i></a>
                            <a class="cursor" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_vip.png"><i>{{msg_text.protector}}</i></a>
                        </div>
                        <a class="idol_fans_ranking cursor" :href="hrefs" target="_blank"><i>{{msg_text.fans}}</i><div><img v-for="img in fansList" v-lazy="img.avatar"></div><div class="no_fans" v-if="fansList.length<=0">No.1になって目立とう！</div><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png"></a>
                        <div class="ativity" v-if="activities.length > 0">{{msg_text.shows}}<a v-for="activity in activities" class="cursor" target="_blank" :href="hrefs">#{{activity.tag}}#</a></div>
                    </div>
                </div>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{msg_text.video}}</a>
                <a class="tabs" @click="changePages(1)">{{msg_text.comment}}</a>
                <a class="tabs" :href="hrefs" target="_blank">{{msg_text.msg}}</a>
                <a class="tabs" :href="hrefs" target="_blank">{{msg_text.shop}}</a>
            </div>
            <div class="share_content">
                <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                    <!-- slides -->
                    <swiper-slide id="swiper1">
                        <div class="video_content" v-for="(hot,key) in hotList" v-if="key < 5">
                            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                                <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                <div class="video_desc">
                                    <h3>{{idol.nickname?idol.nickname:'...'}}</h3>
                                    <p>{{formatTime(hot.data.publishTime)}}</p>
                                </div>
                            </div>
                            <div class="public_show">
                                <video-player  ref="videoPlayer" :options="hot.data.videoItemList[2]?getSrc(hot.data.videoItemList[2],hot.data.thumbnail):{}"></video-player>
                                <div class="Masked" v-if="hot.data.publicType == 1"></div>
                                <div class="gift_content">
                                    <a :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/Like.png" class="cursor">10</a>
                                    <a :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/gift.png" class="cursor"></a>
                                </div>
                                <img :src="msg_text.hot" alt="" class="featuremask" v-if="hot.data.featureMask == 3">
                                <img :src="msg_text.recommend" alt="" class="featuremask" v-if="hot.data.featureMask == 4">
                                <img :src="msg_text.good" alt="" class="featuremask" v-if="hot.data.featureMask == 2">
                                <!-- <span class="play_times"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/video_icon_play%20times.png">{{hot.data.readCount}}</span> -->
                                <div class="Masked2" v-if="hot.data.publicType == 1">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/icon_vip.png">
                                    <p>{{msg_text.videoTips}}</p>
                                    <a :href="hrefs" target="_blank">{{msg_text.vip}}</a>
                                </div>
                            </div>
                            <div class="video_desc_content">
                                <a :href="hrefs" target="_blank" class="video_option"><span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png">{{hot.data.giftCount}}</span><span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png">{{hot.data.popularity}}</span><div><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/icon_comment.png">{{msg_text.write}}</div></a>
                                <p class="video_text"><span style="color: #00B4BB" v-if="hot.data.activity">#{{hot.data.activity.tag}}#</span>{{hot.data.title}}</p>
                                <ul class="comment_list" style="background: #fff;">
                                    <div class="comment_total"><span><i>{{msg_text.commentTips}}{{hot.data.postCount}}{{msg_text.total}}</i></span></div>
                                    <li v-for="comment in hot.data.postList" style="border: none;padding: 0 12px 3px;">
                                       <div class="comment_content"><span>{{comment.nickname?comment.nickname:'...'}}</span>{{comment.content}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 40px;">{{msg_text.download_2}}</a>
                    </swiper-slide>
                    <swiper-slide id="swiper2">
                        <ul class="comment_list dynamic">
                        <!-- <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                            <p>{{msg_text.load}}</p>
                            <span></span>
                        </div> -->
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
                                <img v-lazy="comment.avatar" class="avatar">
                                <span>{{comment.nickname?comment.nickname:'...'}}</span>
                                <span class="level" v-if="comment.userType == 'fans'">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
                                <i v-html="formatTime(comment.createTime)"></i>
                            </div>
                            <div class="comment_content">
                                <p>{{comment.content}}</p>
                                <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                                    <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="img in JSON.parse(comment.imgs)"><img :src="img" alt="" class="autoHeight" @click="showBigImg(img)"></span>
                                </div>
                            </div>
                        </li>
                        <div class="default_page" v-show="commentList.length == 0 && idx!=0">
                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                            <p v-html="msg_text.noneComment"></p>
                        </div>
                    </ul>
                    <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 20px;">{{msg_text.download_2}}</a>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- <div class="bullet_box" v-show="boxShow">
            <div class="bullet_box_content" :class="{'bullet_box_show':boxShow}">
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/box.png" class="box_bg">
                <div class="box_content">
                    <img src="/img/icon_cancel_2.png" class="close" @click="boxShow = false">
                    <img src="/img/icon_groupy_120.png" class="groupy">
                    <p class="tips">请下载Groupy查看更多内容</p>
                    <span class="tips2">前往下载</span>
                    <a :href="hrefs" class="appstore"><img src="/img/btn_appstore.png"></a>
                </div>
            </div>
        </div> -->
        <div class="bigImg" @click="bigImgShow = false" :class="{'bullet_box_show':bigImgShow}"><img :src="Imgsrc"><span></span></div>
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            swiperOption: {
                  notNextTick: true,
                  // grabCursor : true,
                  setWrapperSize :true,
                  // autoHeight: true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
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
            activities: [],
            totalFollowed: 0,
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
                vip: '会員登録へ',
                write: 'コメントする',
                total: '件すべてを表示',
                commentTips: 'コメント',
                shows: '参加中のイベント',
                download_2: 'Groupyをダウンロードしてもっと見よう',
                good: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_good.png',
                hot: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hot.png',
                recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend.png'
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
                http.get('/group/idolHomeAsFans',{
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
                        self.hotList = res.data.hotList;
                        for(var i=0;i<res.data.hotList.length;i++) {

                        }
                    }
                    if(res.data.totalFollowed) {
                        self.totalFollowed = res.data.totalFollowed;
                    }
                    if(res.data.fansList) {
                        self.fansList = res.data.fansList;
                    }
                }).catch(function(){

                });
            },
            getActivity() {
                var self = this;
                http.get('/groupyuser/profile',{
                    params: {
                        id: getParams('idolId'),
                        type: 'idol'
                    }
                }).then(function(res){
                    console.log(res);
                    if(res.data.activities) {
                        self.activities = res.data.activities;
                    }
                    if(res.data.organization) {
                        self.organization = res.data.organization;
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
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            this.getIdolInfo();
            this.getActivity();
            this.getComments();
            this.p_log('idol_shareIdolHome_h5_open');
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                this.hrefs = 'itms-apps://itunes.apple.com/app/id1270083927';
            }else if(/android/.test(ua)) {
                this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
            }else {
                this.hrefs = 'https://itunes.apple.com/app/id1270083927';
            }
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
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
                    recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend_cn.png'
                }
                $('.htmlTilte').html('Groupy');
                $('.metaTitle').attr('content','Groupy')
                $('.metaDesc').attr('content','快来Groupy跟偶像亲密互动吧')
              } else {
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
                    recommend: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_commend.png'
                }
              }
        }
      }
</script>