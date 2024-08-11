const url = $request.url;
let obj = JSON.parse($response.body);

try {
    if (url.includes('/v4/config/app/start')) {
        // 移除直播相关内容
        if (obj.live) {
            delete obj.live;
        }
        if (obj.ui) {
            if (obj.ui.live_section) {
                delete obj.ui.live_section;  // 删除直播部分
            }
            if (obj.ui.tabs) {
                obj.ui.tabs = obj.ui.tabs.filter(tab => !tab.title.includes('直播')); // 移除标题包含“直播”的标签
            }
        }
    }
} catch (error) {
    // 捕获并忽略错误
}

$done({body: JSON.stringify(obj)});