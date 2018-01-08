<template>
	<div class="main">
		<div class="header">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide id="swiper1" class="header-swiper">
						<span class="swiper-img"></span>
						<p class="swiper-tips">
							<em>#我爱装扮#初めての写真集です初めての写真集です</em>
						</p>
						<a class="swiper-download" @click="p_log('Top_Banner_Download_Click')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
				</swiper-slide>
				<swiper-slide id="swiper2" class="header-swiper">
						<span class="swiper-img"></span>
						<p class="swiper-tips">
							<span>Groupy</span>
							<em>守护爱豆的梦想，为她应援！</em>
						</p>
						<a class="swiper-download" @click="p_log('Top_Banner_Download_Click')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
				</swiper-slide>
				<swiper-slide id="swiper3" class="header-swiper">
						<span class="swiper-img"></span>
						<p class="swiper-tips">
							<em>#我爱装扮#初めての写真集です初めての写真集です</em>
						</p>
						<a class="swiper-download" @click="p_log('Top_Banner_Download_Click')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
				</swiper-slide>
				<swiper-slide id="swiper4" class="header-swiper">
						<span class="swiper-img"></span>
						<p class="swiper-tips">
							<span>Groupy</span>
							<em>守护爱豆的梦想，为她应援！</em>
						</p>
						<a class="swiper-download" @click="p_log('Top_Banner_Download_Click')" target="_blank" :href="hrefs">{{msg_text.downTips}}</a>
				</swiper-slide>
				<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>
		<div class="content">
			<div class="video_content">
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
	      preload>
	      您的浏览器不支持 video 标签。
	      </video>
	      <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play" v-if="videoPlay" @click="videoPlayed()">
	      <a class="video_likes" :href="hrefs" target="_blank"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/idol/Like.png" alt=""></a>
	      <div class="idol-content">
	      	<a class="idol-avatar" :href="hrefs" target="_blank"><img class="avatar" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"></a>
	      	<a class="idol-info" :href="hrefs" target="_blank"><span>メロメロン</span><em>@popstar</em><main></main></a>
	      	<a class="video_guard" :href="hrefs" target="_blank"><span>守护她</span></a>
	      </div>
	    </div>
	    <div class="feature-video">
	    	<h2 class="feature-title"><span class="left"></span>今日精选视频<span class="right"></span></h2>
	    	<ul class="video-list">
	    		<li>
	    			<a :href="hrefs" target="_blank">
	    				<div class="poster"></div>
	    				<img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
	    			</a>
	    		</li>
	    		<li>
	    			<a :href="hrefs" target="_blank">
	    				<div class="poster"></div>
	    				<img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
	    			</a>
	    		</li>
	    		<li>
	    			<a :href="hrefs" target="_blank">
	    				<div class="poster"></div>
	    				<img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play">
	    			</a>
	    		</li>
	    	</ul>
	    </div>
	  </div>
	</div>
</template>
<style type="text/css">
	.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
	  width: 5px;
	  height: 5px;
	  margin: 0 2px;
	  border-radius: 50%;
    vertical-align: middle;
	}
	.swiper-pagination-bullet-active {
		background: #FC4083;
	}
</style>
<script>
		import { swiper, swiperSlide } from 'vue-awesome-swiper';
		import VideoPlayer from 'vue-video-player';
		import http from '@api/js/http.js';
		import $ from 'n-zepto';
		require('@api/js/common.js')
		export default {
				data() {
					return {
						swiperOption: {
									notNextTick: true,
									// grabCursor : true,
									setWrapperSize :true,
									// autoHeight: true,
									paginationType:"bullets",
									pagination : '.swiper-pagination',
									paginationClickable :true,
									resistanceRatio : 0,
									iOSEdgeSwipeDetection : true,
									loop : true,
									observeParents:true,
									debugger: true,
								},
						vipShow: false,
						publicShow: false,
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
            this.posterSee = false;
            this.videoPlay = false;
          },
          onPlayerEnded() {
            this.videoPlay = true;
          },
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
					},
					swiper() {
						return this.$refs.mySwiper.swiper
					}
				},
				created() {
						this.getVideo();
						// this.p_log('idol_shareVideo_h5_open');
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
	@import "src/css/video.scss";
</style>
