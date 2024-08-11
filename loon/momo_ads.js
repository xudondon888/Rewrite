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
                delete obj.ui.live_section; // 删除可能的直播部分
            }
            if (obj.ui.tabs) {
                obj.ui.tabs = obj.ui.tabs.filter(tab => !tab.title.includes('直播')); // 移除任何标题包含“直播”的标签
            }
        }
        
        // 去除广告相关内容
        if (obj.ads) {
            delete obj.ads;
        }

        // 删除其他可能的广告或无用内容
        delete obj.promotions;
        delete obj.popups;
        delete obj.recommendations;
    }
} catch (error) {
    // 捕获并忽略错误
}

$done({body: JSON.stringify(obj)});