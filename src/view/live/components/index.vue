<template>
  <div class="index">
    <div class="header">
      <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
      <p>{{msg_text.download}}</p>
      <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
    </div>
    <a  @click="p_log('share_h5_watch_more')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 20px;">アイドルを応援する</a>
    <div class="more_video">
      <h3>{{msg_text.recommend}}</h3>
      <ul>
          <li class="con_left" :class="{'left_show':videos.length>0}"><a @click="get_app('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
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
          <li class="con_left" :class="{'left_show':videos.length>2}"><a @click="get_app('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
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
          <li class="con_left" :class="{'left_show':videos.length>1}"><a @click="get_app('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
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
          <li class="con_left" :class="{'left_show':videos.length>3}"><a @click="get_app('share_h5_watch_more')" target="_blank" :href="hrefs" title="">
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
</template>
<script>
  import http from '@api/js/http.js';
  export default {
    data() {
      return {
        msg_text: {
          download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
          downTips: 'インストール',
          waiting: 'Groupyで待ってまーす。',
          videoTips: 'この動画は会員のみ視聴可能です',
          vip: '会員登録へ',
          write: 'コメントする',
          total: '件すべてを表示',
          commentTips: 'コメント',
          download_2: 'Groupyをダウンロードしてもっと見よう',
          recommend: 'おすすめ'
        },
        videos: [],
        hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
      }
    },
    methods: {
      formatTime(key) {
        let _m = Math.floor(key/60) >= 10 ? Math.floor(key/60) : '0'+ Math.floor(key/60);
        let _s = (key-Math.floor(key/60)*60) >= 10 ? (key-Math.floor(key/60)*60) : '0'+ (key-Math.floor(key/60)*60);
        return _m+":"+_s;
      },
      getVideo() {
        var self = this;
        http.get('http://api.groupy.vip:8080/video/get',{
            params: {
                videoId: 4
            }
        }).then(function(res){
              if(res.data.related) {
                  self.videos = res.data.related;
                  setTimeout( function() {
                    document.querySelector('.live_bg').style.height = document.querySelector('.content').offsetHeight + 'px';
                  },0)
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
            videoId: getParams('videoId')
        }
        http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
            console.log('success');
        }).catch(function(){

        })
      }
    },
    computed: {

    },
    created: function() {
      let self = this;
      // this.p_log('shareh5_live_open');
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
      this.getVideo();
    }
  }
</script>
