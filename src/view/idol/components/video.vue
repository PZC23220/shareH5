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
                        <a class="swiper-download" @click="p_log('videoshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper1" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-1.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text4}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('videoshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper3" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-2.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text1}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('videoshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <swiper-slide id="swiper4" class="header-swiper">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/header-3.png" class="swiper-img">
                        <p class="swiper-tips">
                            <em>{{hederText.text3}}</em>
                        </p>
                        <a class="swiper-download" @click="p_log('videoshare_top_download')" target="_blank" :href="hrefs">{{hederText.download}}</a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
		<div class="content">
			<div class="video_content" id="idol-video-content" v-if="!vipShow">
		      <div class="video-poster" id="idol-video-poster" :style="'background-image:url('+ videoPoster +');'"></div>
		      <video :src="videoSrc"
		      :poster="videoPoster"
		      @click="videoPaused()"
		      :muted="dMuted"
		      @ended='onPlayerEnded()'
		      webkit-playsinline="true"
		      playsinline="true"
		      x-webkit-airplay="allow"
		      x5-video-player-fullscreen="false"
		      x5-video-orientation="portraint"
		      controls="false"
		      id="idolVideo"
		      v-show="!videoEnd"
		      preload>
		      お使いのブラウザは<br>html5版プレーヤー非対応です。
		      </video>
		      <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play" v-if="videoPlay" @click="videoPlayed()">
		      <a @click="p_log('videoshare_video_like')" v-show="!videoEnd" class="video_likes" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/Like.png" alt=""></a>
		      <div v-show="!videoEnd" class="idol-content">
		      	<a class="idol-avatar" @click="p_log('videoshare_video_idol')" :href="hrefs" target="_blank"><img class="avatar" :src="idol.avatar?idol.avatar:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png'"></a>
		      	<a class="idol-info" @click="p_log('videoshare_video_idol')" :href="hrefs" target="_blank"><span :class="{'none-org':!idol.organization}">{{idol.nickname?idol.nickname: '...'}}</span><em v-if="idol.organization">@{{idol.organization}}</em><main></main></a>
		      	<a class="video_guard" @click="p_log('videoshare_video_follow')" :href="hrefs" target="_blank"><span>{{msg_text.vip}}</span></a>
		      </div>
		      <div class="video-end-content" v-show="videoEnd">
			      <div class="vip_download">
			      	<div>
			        	<ul class="end-list">
			        		<li class="end-videos" v-for="video in videos">
			        			<a @click="p_log('videoshare_video_related')" :href="hrefs" :style="'background-image:url('+ video.thumbnail +');'" target="_blank">
					    				<img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
					    			</a>
					    			<div class="progress"><span class="progress_span"></span></div>
			        		</li>
			        	</ul>
			        	<div class="video-opt">
			        		<span @click="videoPlayed()">{{msg_text.again}}</span>
			        		<a @click="p_log('videoshare_video_like')" :href="hrefs" target="_blank">{{msg_text.support}}</a>
			        	</div>
			      	</div>
		        </div>
		      </div>
		    </div>
		    <div class="video_content" v-else>
		      <div class="video_bg">
		      	<div class="video-poster" :style="'background-image:url('+ videoPoster +');'"></div>
		      </div>
	        <div class="vip_download">
	          <p v-html="msg_text.videoTips"></p>
	          <a @click="p_log('Video_Bottom_Download_Click')" target="_blank" :href="hrefs" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">{{msg_text.vip}}</a>
	        </div>
		      <a class="video_likes" @click="p_log('videoshare_video_like')" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/Like.png" alt=""></a>
		      <div class="idol-content">
		      	<a class="idol-avatar" @click="p_log('videoshare_video_idol')" :href="hrefs" target="_blank"><img class="avatar" :src="idol.avatar?idol.avatar:'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png'"></a>
		      	<a class="idol-info" @click="p_log('videoshare_video_idol')" :href="hrefs" target="_blank"><span :class="{'none-org':!idol.organization}">{{idol.nickname?idol.nickname: '...'}}</span><em v-if="idol.organization">@{{idol.organization}}</em><main></main></a>
		      	<a class="video_guard" @click="p_log('videoshare_video_follow')" :href="hrefs" target="_blank"><span>{{msg_text.vip}}</span></a>
		      </div>
		    </div>
		    <div class="feature-video">
		    	<h2 class="feature-title"><span class="left"></span>{{msg_text.featured}}<span class="right"></span></h2>
		    	<ul class="video-list">
		    		<li v-for="video in videos">
		    			<a @click="p_log('videoshare_recommend')":href="hrefs" target="_blank">
		    				<div class="poster" :style="'background-image:url('+ video.thumbnail +');'"></div>
		    				<img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
		    			</a>
		    		</li>
		    	</ul>
		    </div>
	    </div>
	    <div class="groupy-footer">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Video/bg_1.png" class="footer-image">
            <div class="groupy-content">
                <p>{{hederText.dream}}</p>
                <a @click="p_log('videoshare_bottom_download')" target="_blank" :href="hrefs">{{hederText.supportdownload}}</a>
            </div>
        </div>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import VideoPlayer from 'vue-video-player';
	import http from '@api/js/http.js';
	import $ from 'n-zepto';
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
				vipShow: false,
				video: {},
				videos:[],
				dMuted: false,
				idol: {},
				isMuted: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png',
				videoSrc: '',
				videoPoster: '',
				videoPlay: true,
				pageNone: true,
				pageNone2: false,
				idolShow: false,
				videoEnd: false,
				second: 1,
				hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
				msg_text: {
					noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
					download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
					downTips: 'インストール',
					waiting: 'Groupyで待ってまーす。',
					videoTips: 'この動画は会員のみ視聴可能です',
					vip: '応援する',
					write: 'コメントする',
					total: '件すべてを表示',
					commentTips: 'コメント',
					download_2: 'Groupyをダウンロードしてもっと見よう',
					support: '応援',
					featured: '今日のおすすめ',
					again: 'もう一回見る'
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
			videoMuted() {
			if(this.isMuted == 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png') {
			this.isMuted = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_off.png'
			}else {
			this.isMuted = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png'
			}
			this.dMuted = !this.dMuted;
			},
			videoPaused() {
			$('#idolVideo')[0].pause();
			this.videoPlay = true;
			},
			videoPlayed() {
			$('#idolVideo')[0].play();
			this.videoEnd = false;
			this.posterSee = false;
			this.videoPlay = false;
			this.p_log('videoshare_video_play')
			},
			onPlayerEnded() {
			this.videoEnd = true;
			this.countDown();
			},
			countDown() {
			let self = this;
			let timer;
			$('.progress_span').addClass('over');
			// clearTimeout(timer)
			// timer = setTimeout(() => {
			// 	self.videos.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
			// },4000);
			clearTimeout(timer)
			timer = setInterval(() => {
				self.videos.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
			},4000)
			},
			getVideo() {
			var self = this;
			http.get('/video/get',{
			params: {
			videoId: self.$route.query.videoId
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
			}
			if(res.data.video) {
			self.video = res.data.video;
			if(res.data.video.active == 1) {
					self.pageNone = false;
					self.pageNone2 = false;
					if(res.data.video.publicType == 1) {
							self.vipShow = true;
					}else {
							self.vipShow = false;
							self.videoPoster = res.data.video.thumbnail;
							let videoItem = res.data.video.videoItemList;
							let videoitem = {
									hd: '',
									ld: '',
									sd: ''
							};
							let videoInfo = res.data.video.videoHeight/res.data.video.videoWidth;
							let VideoMaxHeight= 500*videoInfo;
							let diffHeight,diffWidth,windowInfo,videoHeight;
							if(self.hrefs == 'https://itunes.apple.com/app/id1270083927') {
								windowInfo = 500;
								videoHeight = 500*videoInfo;
							}else {
								windowInfo = window.innerWidth*1.33333;
								videoHeight = window.innerWidth*videoInfo;
							}

							if(videoInfo <= 0.892) {
								console.log(videoInfo)
								diffHeight = (videoHeight/2) * (-1);
								$('#idolVideo').css('margin-top',diffHeight);
							}else if(videoInfo >= 1) {
								let videoWidth = windowInfo/videoInfo;
								diffHeight = (windowInfo/2) * (-1);
								diffWidth = (videoWidth/2) * (-1);
								$('#idolVideo').css({'margin-top':diffHeight,'margin-left':diffWidth});
								$('#idolVideo').height(windowInfo);
								$('.video-end-content').height(windowInfo);
								$('#idolVideo').width(videoWidth);
								$('.video-poster').css({'height':(windowInfo+20) + 'px','max-height':VideoMaxHeight + 'px'})
								$('.vip_download').css({'height':windowInfo,'max-height':VideoMaxHeight + 'px'})
							}else {
								$('#idol-video-content').css({'height':videoHeight + 'px','max-height':VideoMaxHeight + 'px'})
								$('.video-poster').css({'height':(videoHeight + 20) + px,'max-height':VideoMaxHeight + 'px'})
								$('.video-end-content').css({'height':videoHeight + 'px','max-height':VideoMaxHeight + 'px'})
								$('.vip_download').css({'height':videoHeight + 'px','max-height':VideoMaxHeight + 'px'})
								$('#idolVideo').css({'margin-top':diffHeight,'width': window.innerWidth});
							}
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
									self.videoSrc = videoitem.hd
							}else if(videoitem.ld) {
									self.videoSrc = videoitem.ld
							}else {
									self.videoSrc = videoitem.sd
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
				videoId: this.$route.query.videoId
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
			},
			swiper() {
			return this.$refs.mySwiper.swiper
			}
		},
		created() {
			this.getVideo();
			this.p_log('pageshare_video_open');
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
					noneComment: '还没有收到粉丝的评论<br>分享视频能让更多粉丝关注',
					download: '会员独有的私密状态查看，一键应援，共同守护爱豆的成长!',
					downTips: '下载',
					waiting: '我在Groupy等你哦！',
					videoTips: '守护者专属视频<br>只有成为爱豆守护者才有权利查看！',
					vip: '守护她',
					write: '添加评论',
					total: '条评论',
					commentTips: '共',
					download_2: '下载groupy查看更多视频',
					recommend: '相关视频',
					support: '应援',
					featured: '今日精选视频',
					again: '重播'
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
				this.msg_text = {
					noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
					download: 'アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!',
					downTips: 'インストール',
					waiting: 'Groupyで待ってまーす。',
					videoTips: '会員のみ視聴可能です<br>会員登録して、アイドルのプライベート動画を見よう',
					vip: '応援する',
					write: 'コメントする',
					total: '件すべてを表示',
					commentTips: 'コメント',
					download_2: 'Groupyをダウンロードしてもっと見よう',
					recommend: '今日のおすすめ',
					support: '応援',
					featured: '今日のおすすめ',
					again: 'もう一回見る'
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
                    dream: '推しメンの夢を見守ってあげよう',
                }
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "src/css/video.scss";
</style>
