/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import index from './components/index.vue'
import video from './components/video.vue'

const routes =
    [
        {
            path: '/',
            component: index,
        },
        {
            path: '/video',
            component: video,
        },
    ];
export default routes;
