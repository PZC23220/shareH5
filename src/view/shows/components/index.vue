<template>
    <div class="main">
         <div class="header">
            <swiper :options="swiperOption2" ref="mySwiper2">
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper2" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon_groupy_128.png" class="swiper-img">
                        <p class="swiper-tips">
                            <span>Groupy</span>
                            <em>{{hederText.text2}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('activityshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div class="content" :class="{'bottom':applyInfo.id}">
            <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                <div class="idolInfo eBorder">
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar">
                    <p>
                        <span><i class="idol_name">...</i>  {{showstext.pub}}</span>
                        <span>@Groupy</span>
                    </p>
                </div>
                <ul class="shows_detail">
                    <li>
                        <p class="shows_name">@Groupy</p>
                        <p class="shows_time"><span>--.-- --</span><span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/icon_time.png">{{showstext.start}}--:--/{{showstext.shows}}--:--</span></p>
                    </li>
                    <li>
                        <h5 class="li_title">{{showstext.performer}}</h5>
                        <p class="show_groups">@Groupy</p>
                    </li>
                    <li>
                        <h5 class="li_title">{{showstext.tickets}}</h5>
                        <p>{{showstext.reservation}} <i>0</i>{{showstext.yen}}/当日 0{{showstext.yen}}(+1D)</p>
                    </li>
                    <li>
                        <h5 class="li_title">{{showstext.meeting}}</h5>
                        <p>@Groupy</p>
                    </li>
                    <li>
                        <h5 class="li_title">{{showstext.desc}}</h5>
                        <div class="shows_info">
                            <span>@Groupy</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="idolInfo eBorder" v-if="loadingBig == false && pageNone == false">
                <span class="avatar"><img v-lazy="idolInfo.avatar"></span>
                <p>
                    <span :class="{'once': !organization.name}"><i class="idol_name">{{idolInfo.nickname?idolInfo.nickname:'...'}}</i>  {{showstext.pub}}</span>
                    <span v-show="organization.name">{{organization.name}}</span>
                </p>
            </div>
            <div class="mine_info" v-if="applyInfo.id">
                <div class="info_content">
                    <h5 class="li_title">{{showstext.reservation}}</h5>
                    <p>{{applyInfo.firstName}}  {{applyInfo.lastName}}</p>
                    <span><i>{{applyInfo.nums}}</i>{{showstext.nums}} | {{applyInfo.email}}</span>
                    <div class="win_info"><a :href="hrefs" target="_blank" @click="p_log('share_h5_download_groupy')">{{showstext.download_2}}</a></div>
                </div>
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/bg_booked.png">
            </div>
            <div class="default_page" v-show="pageNone && loadingBig == false">
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/default_noactivity.png" alt="">
                <p>該当イベント情報はありません</p>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">{{showstext.download_2}}</a>
            </div>
            <ul class="shows_detail" v-if="loadingBig == false && pageNone == false">
                <li style="border-bottom: 1px solid #eee;">
                    <p class="shows_name">{{showsInfo.title}}</p>
                    <p class="shows_time" style="border: none;"><span>{{showsInfo.startTime?formatTime(showsInfo.startTime,'MM.dd'):'--.--'}} {{showsInfo.startTime?formatDay(showsInfo.startTime):'--'}}</span><span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/icon_time.png">{{showstext.start}}{{showsInfo.startTime?formatTime(showsInfo.startTime,'hh:mm'):'--:--'}}/{{showstext.shows}}{{showsInfo.showTime?formatTime(showsInfo.showTime,'hh:mm'):'--:--'}}</span></p>
                    <div class="win_info" v-if="!applyInfo.id" @click="platform()">{{showstext.nows}}</div>
                </li>
                <li v-if="showsInfo.groups">
                    <h5 class="li_title">{{showstext.performer}}</h5>
                    <p class="show_groups">{{showsInfo.groups}}</p>
                </li>
                <li>
                    <h5 class="li_title">{{showstext.tickets}}</h5>
                    <p>Groupy预约 <i>{{Number(showsInfo.presellPrice?showsInfo.presellPrice:0).toLocaleString()}}</i>{{showstext.yen}}/当日 {{Number(showsInfo.officialPrice?showsInfo.officialPrice:0).toLocaleString()}}{{showstext.yen}}<em v-if="showsInfo.drinkNums">(+{{showsInfo.drinkNums}}D)</em></p>
                </li>
                <li v-if="showsInfo.location">
                    <h5 class="li_title">{{showstext.meeting}}</h5>
                    <p>{{showsInfo.location}}</p>
                </li>
                <li v-if="showsInfo.introduce || showsInfo.imgs">
                    <h5 class="li_title">{{showstext.desc}}</h5>
                    <div class="shows_info">
                        <span>{{showsInfo.introduce}}</span>
                        <p v-if="showsInfo.imgs">
                            <span v-for="img in changeURL(showsInfo.imgs)" :class="{'once':showsInfo.imgs.length == 1}"><img :src="img"></span>
                            <!-- <span><img src=""></span>
                            <span><img src=""></span> -->
                        </p>
                    </div>
                </li>
                <li>
                    <h5 class="li_title">{{fansList.length}}{{showstext.people}}</h5>
                    <div class="fans_list">
                        <p v-for="fans in fansList">
                            <span class="avatar"><img v-lazy="fans.avatar"></span>
                            <span class="idol_name">{{fans.nickname?fans.nickname:'...'}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <div class="footer" @click="reservationShow = true">{{showstext.nows}}</div>
        <div class="footer" v-if="false">Groupyをダウンロードしてもっと見よう</div> -->
        <!-- 预约弹窗 -->
        <div class="reservation" v-if="reservationShow">
            <div class="r_header">
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/icon_cancel_2.png" @click="reservationShow = false">
                {{showstext.nows}}
                <span :class="{'active': canPush}" @click="pushOrder()">{{showstext.nows}}</span>
            </div>
            <div class="lin_k">{{showstext.contact}}</div>
            <div style="overflow: hidden;">
                <p class="names"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/icon_name.png"><i>{{showstext.name}}</i></p>
                <p class="input_content" style="display: inline-block;width: 38%;float: left"><span>姓</span><input v-on:input="updateStyle()" style="width: calc((100vw - 70px)*0.4);max-width: calc((500px - 70px)*0.4);text-align: right;" type="text" name="" v-model="forms.lastName" :placeholder="showstext.pla"></p>
                <p class="input_content" style="display: inline-block;width: 38%;float: right;margin-left: 0;"><span>名</span><input v-on:input="updateStyle()" style="width: calc((100vw - 70px)*0.4);max-width: calc((500px - 70px)*0.4);text-align: right;" type="text" name="" v-model="forms.firstName" :placeholder="showstext.pla"></p>
            </div>
            <div>
                <p class="names"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/shows/icon_email.png"><i>{{showstext.email}}</i></p>
                <p class="input_content"><input v-on:input="updateStyle()" type="email" name="" v-model="forms.email" :placeholder="showstext.pla"></p>
            </div>
            <div class="lin_k" style="background: #00B4BB;">{{showstext.showsNums}}</div>
            <div>
                <p class="input_content" style="margin-top: 12px;border: 1px solid #00B4BB;"><input v-on:input="updateStyle()" v-model="forms.nums" type="tel" name="" :placeholder="showstext.pla"></p>
            </div>
        </div>
        <!-- toast -->
        <div class="toast" :class="{'active':toastShow}">{{toastText}}</div>
    </div>
</template>
<script type="text/javascript" src="http://adodson.com/hello.js/dist/hello.all.js"></script>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    // require('@api/js/vconsole.min.js')
    export default {
        data() {
          return {
            reservationShow: false,
            toastShow: false,
            loadingBig: true,
            pageNone: true,
            forms: {
               firstName: '',
               lastName: '',
               email: '',
               nums: '',
               showsId:''
            },
            fansList: [],
            applyInfo: {},
            showsInfo: {},
            organization: {},
            idolInfo: {},
            canPush: false,
            idx: 0,
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            tokens: '',
            toastText: '预约成功',
            showstext: {
                pub: 'がイベントを登録した',
                start: '開場',
                shows: '開演',
                performer: '出演者',
                tickets: '料金',
                meeting: '会場',
                desc: '説明',
                reservation: 'Groupyで予約',
                yen: '円',
                nums: '枚予約した',
                people: '人予約した',
                nows: '予約する',
                edit: '編集',
                download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                downTips: 'インストール',
                waiting: 'Groupyで待ってまーす。',
                download_2: 'Groupyをダウンロードしてもっと見よう',
                contact: '個人情報',
                name: 'お名前',
                email: 'メールアドレス',
                showsNums: '枚数',
                pla: '入力してください'
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
          }
        },
        methods: {
            p_log(val) {
                var _data = {

                    topic: "groupy",
                    app: "groupy",
                    platform: "h5",
                    system: navigator.userAgent,
                    version: "1.0.0",
                    action: val,
                    result: "success",
                    showsId: getParams('showsId')
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
            },
            formatTime(key,type) {
                let timer = new Date(key);
                return timer.Format(type);
            },
            formatDay(key) {
                let timer = new Date(key).getDay();
                var str;
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                if(_lan === 'zh-cn') {
                    switch (timer) {
                        case 0 :
                                str = "周日";
                                break;
                        case 1 :
                                str = "周一";
                                break;
                        case 2 :
                                str = "周二";
                                break;
                        case 3 :
                                str = "周三";
                                break;
                        case 4 :
                                str = "周四";
                                break;
                        case 5 :
                                str = "周五";
                                break;
                        case 6 :
                                str = "周六";
                                break;
                    }
                }else {
                    switch (timer) {
                        case 0 :
                                str = "日";
                                break;
                        case 1 :
                                str = "月";
                                break;
                        case 2 :
                                str = "火";
                                break;
                        case 3 :
                                str = "水";
                                break;
                        case 4 :
                                str = "木";
                                break;
                        case 5 :
                                str = "金";
                                break;
                        case 6 :
                                str = "土";
                                break;
                    }
                }
                return  str;
            },
            changeURL(val) {
                if(val) {
                    var str = JSON.stringify(val);
                    var len = str.length;
                    var str2 = str.slice(1,len-1);
                    let arr = [];
                    arr = str2.split(',');
                    return arr;
                }
            },
            getShows() {
                var self = this;
                http.get('/shows/detail',{
                    params: {
                        showsId: getParams('showsId')
                    }
                }).then(function(res){
                    if(res.data) {
                        self.showsInfo = res.data;
                        // $('.htmlTilte').html(res.data.title);
                        // $('.metaTitle').attr('content',res.data.title);
                        // $('.metaDesc').attr('content',res.data.introduce);
                        // $('.metaImg').attr('content',self.changeURL(res.data.imgs)[0]);
                        if(res.data.fansList){
                            self.fansList = res.data.fansList;
                        }
                        if(res.data.applyInfo) {
                            self.applyInfo = res.data.applyInfo;
                        }else {
                            if(self.loadingBig == false) {
                                self.reservationShow = true;
                            }
                        }
                        if(res.data.idolInfo) {
                            self.idolInfo = res.data.idolInfo;
                            if(res.data.idolInfo.organization) {
                                self.organization = res.data.idolInfo.organization;
                            }
                        }
                        self.pageNone = false;
                    }
                    self.loadingBig = false;
                }).catch(function(err){
                    self.loadingBig = false;
                });
            },
            updateStyle() {
                if(this.forms.firstName && this.forms.lastName && this.forms.email && this.forms.nums) {
                    return this.canPush = true;
                }else {
                    return this.canPush = false;
                }
            },
            pushOrder() {
                var self = this;
                console.log(self.canPush)
                if(self.tokens) {
                    http.defaults.headers.common['Authorization'] = 'Token '+ self.tokens;
                }
                self.forms.showsId = self.showsInfo.id;
                if(self.canPush) {
                    if(self.idx < 2) {
                        http.post('/shows/apply',JSON.stringify(self.forms)).then(function(res){
                            console.log(res);
                            if(res.status == 200) {
                                self.getShows(self.tokens);
                                self.reservationShow = false;
                                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                                if(_lan === 'zh-cn') {
                                    self.toastText = '预约成功';
                                }else {
                                    self.toastText = '予約しました';
                                }
                                self.toastShow = true;
                                setTimeout(function(){
                                    self.toastShow = false;
                                },1000);
                            }else {
                                self.idx++;
                                self.platform();
                            }
                        }).catch(function(err){
                            self.idx++;
                        });
                    }else {
                        self.reservationShow = false;
                        let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                        if(_lan === 'zh-cn') {
                            self.toastText = '服务器错误';
                        }else {
                            self.toastText = 'エラーが発生しました';
                        }
                        self.toastShow = true;
                        setTimeout(function(){
                            self.toastShow = false;
                        },1000);
                    }
                }
            },
            platform() {
                if(getParams('platform') == 'fb') {
                    this.facebookLogin();
                }else if(getParams('platform') == 'tw') {
                    this.twitterLogin();
                }

            },
            facebookLogin() {
                var self= this;
                window.fbAsyncInit = function() {
                    FB.init({
                      appId            : '247907419038265',
                      autoLogAppEvents : true,
                      xfbml            : true,
                      version          : 'v2.10'
                    });
                    // FB.AppEvents.logPageView();
                    FB.getLoginStatus(function(response) {
                    if (response.status === 'connected' || response.status === 'not_authorized') {
                      // console.log(response);
                      FB.api('/me', {fields: 'name'}, function(response) {
                        // console.log(response);
                        var obj = {
                            snsUid:response.id,
                            snsPlatform:'fb',
                            nickname:response.name,
                            avatar:'https://graph.facebook.com/'+ response.id +'/picture?type=large',
                            sign:'',
                            introduce:''
                        };
                        self.login(obj);
                      });
                    } else {
                      FB.login(function(response) {
                        FB.api('/me', {fields: 'name'}, function(response) {
                            // console.log(response);
                            var obj = {
                                snsUid:response.id,
                                snsPlatform:'fb',
                                nickname:response.name,
                                avatar:'https://graph.facebook.com/'+ response.id +'/picture?type=large',
                                sign:'',
                                introduce:''
                            };
                            self.login(obj);
                        });
                      }, {scope: 'public_profile'});
                    }
                  });
                };
                (function(d, s, id){
                     var js, fjs = d.getElementsByTagName(s)[0];
                     if (d.getElementById(id)) {return;}
                     js = d.createElement(s); js.id = id;
                     js.src = "http://connect.facebook.net/en_US/sdk.js";
                     fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            },
            twitterLogin() {
                var self = this;
                window.twttr = (function(d, s, id) {
                     var js, fjs = d.getElementsByTagName(s)[0],
                      t = window.twttr || {};
                      if (d.getElementById(id)) return t;
                      js = d.createElement(s);
                      js.id = id;
                      js.src = "https://platform.twitter.com/widgets.js";
                      fjs.parentNode.insertBefore(js, fjs);

                      t._e = [];
                      t.ready = function(f) {
                          t._e.push(f);
                      };
                      return t;
                }(document, "script", "twitter-wjs"));
                var log = console.log;
                hello.init({'twitter': '6YNVtKZPe9RhAI32wKCvfp8RN'},{
                  oauth_proxy: 'https://auth-server.herokuapp.com/proxy'
                });
                function login_twitter(network){  //登录方法，并将twitter 作为参数传入
                      // Twitter instance
                      var twitter = hello(network);
                      // Login
                      twitter.login().then(function(r){
                          // Get Profile
                          return twitter.api('/me');
                      },log).then(function(p){
                          //已获取用户信息，在此处理
                          // var response = {'id':p.id,'name':p.name,'picture':p.thumbnail,'link':'https://twitter.com/'+p.screen_name,'login_type':'twitter'};
                          // console.dir(response);
                          var obj = {
                            snsUid:p.id,
                            snsPlatform:'tw',
                            nickname:p.name,
                            avatar:p.thumbnail,
                            sign:'',
                            introduce:''
                        };
                        self.login(obj);
                      }, log );
                }
                login_twitter('twitter');
            },
            login(obj) {
                var self = this;
                http.post('/groupyuser/loginFans?tokenize=true',JSON.stringify(obj)).then(function(res){
                    if(res.status == 200) {
                        self.tokens = res.data.accessToken;
                        self.getShows(res.data.accessToken);
                    }
                }).catch(function(err){
                    // self.getShows();
                    // self.reservationShow = true;
                    self.toastText = '服务器错误';
                    self.toastShow = true;
                    setTimeout(function(){
                        self.toastShow = false;
                    },1000);
                });
            }
        },
        mounted() {
        },
        computed: {
        },
        created() {
            var ua = navigator.userAgent.toLowerCase();
            this.p_log('idol_shareShows_h5_open');
            if (/iphone|ipad|ipod/.test(ua)) {
                this.hrefs = 'itms-apps://itunes.apple.com/app/id1270083927';
            }else if(/android/.test(ua)) {
                this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
            }else {
                this.hrefs = 'https://itunes.apple.com/app/id1270083927';
            }
            // this.platform();
            this.getShows();
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 this.showstext= {
                    pub: '发布活动',
                    start: '开场',
                    shows: '开演',
                    performer: '演出团体',
                    tickets: '门票价格',
                    meeting: '活动场地',
                    desc: '活动信息',
                    reservation: 'Groupy预约',
                    yen: '日元',
                    nums: '张预约',
                    people: '人预约',
                    nows: '立即预约',
                    edit: '编辑',
                    download: '会员独有的私密状态查看，一键应援，共同守护爱豆的成长!',
                    downTips: '下载',
                    waiting: '我在Groupy等你哦！',
                    download_2: '下载groupy查看更多视频',
                    contact: '联系方式',
                    name: '姓名',
                    email: '邮箱',
                    showsNums: '预定数量',
                    pla: '请输入'

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
                $('.htmlTilte').html('Groupy');
                $('.metaTitle').attr('content','Groupy')
                $('.metaDesc').attr('content','快来Groupy跟偶像亲密互动吧')
              } else {
                this.showstext= {
                    pub: 'がイベントを登録した',
                    start: '開場',
                    shows: '開演',
                    performer: '出演者',
                    tickets: '料金',
                    meeting: '会場',
                    desc: '説明',
                    reservation: 'Groupyで予約',
                    yen: '円',
                    nums: '枚予約した',
                    people: '人予約した',
                    nows: '予約する',
                    edit: '編集',
                    download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
                    downTips: 'インストール',
                    waiting: 'Groupyで待ってまーす。',
                    download_2: 'Groupyをダウンロードしてもっと見よう',
                    contact: '個人情報',
                    name: 'お名前',
                    email: 'メールアドレス',
                    showsNums: '枚数',
                    pla: '入力してください'
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

<style scoped lang="scss">
    .page_defalt {
        opacity: 0.4;
        transition: all 0.3s;
        overflow:hidden;
        width: 100%;
        height: calc(100vh - 64px);
    }
    .page_defalt_none {
        opacity:0;
        height: 0;
        border: none;
    }
    .win_info {
        background: #00B4BB;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        height: 48px;
        font-weight: 600;
        line-height: 48px;
         width: 80%;
         margin: 0 auto 12px;
         border-radius: 4px;
          a {
            color: #FFFFFF;
          }
    }
    .reservation {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: 3;
        .r_header {
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #eee;
            font-size: 16px;
            color: #666;
            text-align: center;
            >img {
                float: left;
                width: 25px;
                padding: 12px;
            }
            >span {
                float: right;
                margin-right: 12px;
                padding: 0 20px;
                color: #FC4083;
                opacity: 0.5;
                height: 32px;
                line-height: 32px;
                margin-top: 9px;
                border: 1px solid #FC4083;
                border-radius: 50px;
            }
            span.active {
                opacity: 1;
            }
        }
        .lin_k {
            background: #FC4083;color: #FFFFFF;font-size: 14px;height: 35px;line-height: 35px;font-weight:400;padding-left: 12px;
        }
        .input_content {
            height: 44px;
            line-height: 44px;
            border-bottom: 1px #eee solid;
            margin: 0 12px 8px;
            padding: 0 12px;
            font-size: 16px;
            border: 1px solid #FC4083;
            border-radius: 3px;
            >span {
                font-weight: 400;
                color: #666;
                font-size: 14px;
            }
            input {

                height: 44px;
                line-height: 44px;
                width: 100%;
                font-size: 16px;
            }
        }
        .names {
            padding: 12px 12px 8px;
            font-size: 14px;
            color: #666;
            font-size: 400;
            img {
                width: 20px;
                margin-right: 5.5px;
            }
        }
    }
    .toast {
        opacity: 0.7;
        background: #000000;
        border-radius: 5px;
        font-size: 14px;
        padding: 12px 28px;
        color: #FFFFFF;
        position: fixed;
        bottom: 100px;
        left: 50%;
        z-index: 4;
        margin-left: -57px;
        transition: all 0.3s;
        transform: scale(0);
    }
    .toast.active {
        transform: scale(1);
    }
    .content {
        height: calc(100vh - 120px);
    }
    .li_title {
        background: #FC4083;
        border: 1px solid #FC4083;
        border-radius: 3px;
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 300;
        display: inline-block;
        padding: 1.5px 5px;
        margin: 12px 0 8px 12px;
    }
    .idol_name {
        font-weight: 600;
        display: inline-block;
        max-width: calc(100vw - 180px);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .avatar {
        width: 40px;
        height: 40px;
        img {
            width: 40px;
            min-height: 40px;
        }
    }
    @media screen and (min-width: 500px) {
        .idol_name {
            max-width: calc(500px - 180px);
        }
    }
    .shows_detail li >p {
        border-bottom: 1px solid #eee;
        padding: 0 12px 12px;
        font-weight: 600;
        font-size: 14px;
        display: block;
        overflow: hidden;
        line-height: 20px;
        >i {
            color: #fc3878;
            vertical-align: inherit;
        }
    }
    .idolInfo {
        overflow: hidden;
        padding: 6px 12px;
        >p {
            float: left;
            width: calc(100vw - 80px);
            max-width: calc(500px - 90px);
            >* {
                display: block;
            }
            >span:first-child {
                font-size: 14px;
            }
            >span:last-child {
                color: #999;
            }
        }
    }
    .shows_name {
        border: none !important;
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 7.5px !important;
        color: #00B4BB;
    }
    .shows_time {
        font-weight: 500 !important;
        overflow: hidden;
        span {
            display: block;
            overflow: hidden;
            float: left;
        }
        >span:first-child {
            margin-right: 17px;
        }
        >span:last-child {
            color: #666;
            img {
                width: 15px;
                float: left;
                margin-top: 2px;
                margin-right: 5px;
            }
        }
    }
    .fans_list {
        >p {
            overflow: hidden;
            padding-left: 12px;
        }
        .idol_name {
            border-bottom: 1px solid #eee;
            height: 40px;
            line-height: 40px;
            padding: 3px 0;
            width: calc(100vw - 60px);
            max-width: calc(100vw - 60px);
            font-size: 14px;
        }
        @media screen and (min-width: 500px) {
            .idol_name {
                width: calc(500px - 75px);
                max-width: calc(500px - 75px);
            }
        }
    }
    .shows_info {
        padding: 0 12px 12px;
        border-bottom: 1px solid #eee;
        >span {
            display: block;
            padding-bottom: 8px;
        }
        p {
            overflow: hidden;
            span {
                display: inline-block;
                width: 30%;
                height: calc((100vw - 60px) * 1/3);
                max-height: calc((500px - 60px) * 1/3);
                border-radius: 3px;
                >img {
                    width: 100%;
                    // min-height: calc((100vw - 60px) * 1/3);
                    border-radius: 3px;
                    display: block;
                }
                // @media screen and (min-width: 500px) {
                //     >img {
                //         min-height: calc((500px - 60px) * 1/3);
                //     }
                // }
            }
            span.once {
                width: 100%;
                height: calc((100vw - 24px));
                max-height: calc((500px - 24px));
            }
            span:not(:last-child) {
                margin-right: 3%;
            }
        }
    }
    .mine_info {
        position: relative;
        overflow: hidden;
        .info_content {
            // position: absolute;
            // left: 0;
            // top: 0;
            background: #fff;
            width: 100%;
            >p {
                padding: 0 12px;
                padding-bottom: calc(100vw * 0.026);
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >span {
                padding: 0 12px;
                color: #666;
                display: block;
                font-size: 14px;
                i {
                    color: #fc3878;
                    vertical-align: inherit;
                }
            }
            .win_info {
                margin: 8px auto;
            }
        }
        >img {
            width: 100%;
            background: #eee;
        }
    }
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
