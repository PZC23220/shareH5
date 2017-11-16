<template>
    <div class="main">
         <div class="content">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity-fun.jpg" class="banner">
            <h2>{{activity.theme}}</h2>
            <div class="activity_rule">
                <p>イベント期間中に2万LIke達成のアイドルに収益を全て還元！<br><i>注意：</i><br>Groupyは収益の一部をアイドルの活動資金としてアイドル側に配分しています。今回のイベントで、2万LIke達成のアイドルに対し、アプリストアの手数料を引いた収益を全てアイドルに還元しちゃいます。少しでもアイドルたちの活動にサポートできたらと考えています。</p>
            </div>
            <div class="activity_time">
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>2017年11月22日（水）00:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年11月24日（金）23:59:59</i></p>
                </div>
            </div>
            <div class="activity_rule">
                <h4>{{activity.obj.title}}</h4>
                <p v-html="activity.obj.p1"></p>
            </div>
            <ul class="activity_reward">
                <h4>{{activity.award}}</h4>
                <li>
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[0].p1}}</i></p>
                    </div>
                </li>
            </ul>
            <div class="activity_rule">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <p v-html="activity.rule.p2"></p>
                <p v-html="activity.rule.p3"></p>
                <!-- <p v-html="activity.rule.p3"></p> -->
            </div>
            <div class="activity_rule">
                <h4>{{activity.fansrule.title}}</h4>
                <p v-html="activity.fansrule.p1"></p>
                <p v-html="activity.fansrule.p2"></p>
                <p v-html="activity.fansrule.p3"></p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.warning.title}}</h4>
                <p v-html="activity.warning.p1"></p>
                <p v-html="activity.warning.p2"></p>
            </div>
         </div>
    </div>
</template>
<style type="text/css">
    .content {
        background: #fff3f4;
    }
    h2 {
        background: #FA9297;
    }
    h4 {
        background-image: linear-gradient(-46deg,  #EF676D 0%, #F88F94 100%);
    }
    .activity_reward li {
        background:  #FFEAEC;
        border: 1px solid #FFD5D8;
    }
    .activity_rule p i {
        color: #FA9297;
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
                activity: {
                    theme:'#ハロウィン#',
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
                    rule: {
                        title: '応募方法',
                        p1: '1. イベント期間中、<i>「#アイドル応援企画」</i>タグをつけて投稿してください。投稿内容は自由です。',
                        p2: '2.2. イベント期間中は、動画を何本投稿しても問題ありません。',
                        p3: '<i>※投稿する際、タグ欄からタグを選択してください。入力のタグは認識されないのでご注意ください。</i>'
                    },
                    obj: {
                        title: '対象',
                        p1: 'イベント期間中に2万LIke達成のアイドル'
                    },
                    fansrule: {
                        title: '集計方法',
                        p1: '1. 全ての参加動画のLike数（ハート）の合計によってランキングが決まります。',
                        p2: '2. ランキングはイベント詳細ページにリアルタイムで確認できます。',
                        p3: '3.イベント期間外は、<i>「＃アイドル応援企画」</i>をつけて投稿しても集計されません。'
                    },
                    warning: {
                        title: '注意事項：',
                        p1: '1. 最終結果はイベント期間終了の翌日にGroupyアプリおよび公式Twitter@GGroupyyyにて発表いたします。',
                        p2: '2. 特典は、アイドルの11月分の収益として12月に付与されます。'
                    },
                    rewards: [{
                        p1: 'アプリストアの手数料を引いた収益を全てアイドルに還元'
                    }]
                },
                isFans: true,
                showsStart: false,
                activityInfo: {}
            }
        },
        methods: {
        },
        mounted() {
        },
        created() {
        }
    }
</script>