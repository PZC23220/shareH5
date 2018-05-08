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
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-subwayAdsApply.png" class="banner">
            <h2>{{activity.theme}}</h2>
            <div class="activity_rule">
                <p>決勝上位3名のグループは、中国・広州の中心地にある広州塔駅で大型看板に1ヶ月ジャック！1日40万人が通過するところにあなたのグループの写真が掲載されちゃいます！応募は<i>wanted@groupy.vip‍</i> までイベント参加の旨をお伝えください。</p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.desc.title}}</h4>
                <p v-html="activity.desc.p1"></p>
                <p v-html="activity.desc.p2"></p>
                <p v-html="activity.desc.p3"></p>
                <p v-html="activity.desc.p4"></p>
                <p v-html="activity.desc.p5"></p>
                <p v-html="activity.desc.p6"></p>
                <p v-html="activity.desc.p7"></p>
            </div>
            <div class="activity_time">
                <h4>{{activity.times}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>2017年11月13日（月） 00:00:00 </i></p>
                    <p><span>{{activity.end}}</span><i>2017年11月30日（木） 23:59:59</i></p>
                </div>
            </div>
            <div class="activity_rule">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <p v-html="activity.rule.p2"></p>
            </div>
            <div class="activity_time">
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><i>予選：</i></p>
                    <p><span>{{activity.start}}</span><i>2017年12月1日（金） 00:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年12月5日（火） 23:59:59</i></p>
                </div>
                 <div class="duration_time">
                    <p><i>決勝：</i></p>
                    <p><span>{{activity.start}}</span><i>2017年12月6日（水） 00:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年12月10日（日） 23:59:59</i></p>
                </div>
            </div>
            <ul class="activity_reward">
                <h4>{{activity.award}}</h4>
                <li>
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><span></span><i style="font-weight: 600;">{{activity.rewards[0].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p2}}</i></p>
                    </div>
                </li>
                <li>
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><span></span><i style="font-weight: 600;">{{activity.rewards[1].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p2}}</i></p>
                    </div>
                </li>
            </ul>
            <div class="activity_rule">
                <h4>{{activity.warning.title}}</h4>
                <p v-html="activity.warning.p1"></p>
                <p v-html="activity.warning.p2"></p>
                <p v-html="activity.warning.p3"></p>
                <p v-html="activity.warning.p4"></p>
                <p v-html="activity.warning.p5"></p>
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
<style type="text/css">
    .content {
        background: #fff6e9;
    }
    h2 {
        background: #F3A43F;
    }
    h4 {
        background-image: linear-gradient(-46deg, #F38B07 0%, #F3A43F 100%);
    }
    .activity_reward li {
        background: #FFF3E3;
        border: 1px solid #F1DABA;
    }
    .activity_rule p i {
        color: #F3A43F;
    }
</style>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                ranking: [],
                me: {},
                idx: 0,
                idx2: 0,
                loadingShow: false,
                isOver: false,
                havedMe: false,
                hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
                activity: {
                    theme:'#Groupy広告モデル#',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '特典',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    times: '募集期間',
                    rule: {
                        title: '応募方法',
                        p1: '興味のある方はお気軽に <i>wanted@groupy.vip</i>‍ までスタッフにご連絡ください。',
                        p2: '<i>※今回のイベントは、ユニット全員のLike数を合算した集計となりますがソロの方も参加可能です。</i>'
                    },
                    desc: {
                        title: '掲載について',
                        p1: '中国広州の地下鉄は、一日700万人以上が利用し、全市人口の65.8%を占めています！',
                        p2: 'その中、広州で最も有名な観光スポットである広州タワーの下にあることから、命名された「広州タワー駅」にて、Groupyが広告出稿決定！',
                        p3: '広州タワーは広州のCBD(中心業務地区)として地元の人だけではなく、海外観光客も多い！1日40万人が通過するところにあなたのグループの写真が掲載されちゃいます！',
                        p4: '中国の多くの人々に知ってもらえるこの大チャンスをぜひつかんでくだい！',
                        p5: '<i>※掲載期間：2018年1月1日～2018年1月31日</i>',
                        p6: '<i>※掲載場所：広州地下鉄3号線広州塔駅</i>',
                        p7: '<i>※サイズ：高さ1,520mm × 幅3,020mm</i>'

                    },
                    warning: {
                        title: '注意事項',
                        p1: '1. イベント期間中、<i>「#Groupy広告モデル」</i>タグをつけて投稿してください。投稿内容は自由です。',
                        p2: '2. ユニット全員の参加動画のLike数の合計によってランキングが決まります（ソロの方も参加可能）。',
                        p3: '3.興味のあるアイドルの方は wanted@groupy.vip‍ までご応募ください。応募せず、予選・決勝期間中<i>「#Groupy広告モデル」</i>をつけて投稿しても無効となります。'
                    },
                    rewards: [{
                        p1: '予選特典',
                        p2: '予選ランキング上位5名かつ50万Like達成のユニット・ソロアイドルは決勝イベントへの参加権を獲得！'
                    }, {
                        p1: '決勝特典',
                        p2: '決勝ランキング上位3名のユニット・ソロアイドルはGroupy駅広告モデルとして起用！'
                    }]
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
                isFans: true,
                activityInfo: {}
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
        },
        created() {
            this.p_log('shareActivity_subwayAds_open');
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
