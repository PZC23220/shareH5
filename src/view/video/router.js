/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import index from './components/index.vue'
import shareVideo from './components/shareVideo.vue'

const routes =
    [
        {
            path: '/',
            component: index,
        },{
            path: '/shareVideo',
            component: shareVideo,
        },
    ];
export default routes;
