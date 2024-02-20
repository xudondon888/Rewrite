/*

> 应用名称：Bilibili大会员
> 解锁说明：解锁VIP番剧和影视 
不要分享! 人多就挂脚本！


[rewrite_local]

#!name = 哔哩哔哩

#哔哩哔哩解锁大会员
^http[s]?:\/\/((app|api)\.(\w{2,15})?\.(com|cn)).*player\.(v3|v2|v1).Play(URL|View).*$ url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js

^https?:\/\/.*bili.*\/x\/v\d\/account\/(mine|myinfo) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https?:\/\/.*bili.*\/bilibili\.app\.playerunite\.v1\.Player\/PlayViewUnite url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js



# Proto 动态广告,后台播放限制,播放页广告 //app.bilibili.com
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.dynamic\.v2\.Dynamic\/DynAll url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.interface\.v1\.Teenagers\/ModeStatus url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.(view|viewunite)\.v1\.View\/(View|ViewProgress) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.community\.service\.dm\.v1\.DM\/DmView url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.main\.community\.reply\.v1\.Reply\/MainList url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.polymer\.app\.search\.v1\.Search\/SearchAll url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js

# 观影页,直播间商品广告浮窗,搜索框填充词,首页信息流,热搜发现,右上角活动,标签页
^https:\/\/api\.bilibili\.com\/pgc\/page\/(bangumi|cinema\/tab\?) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/api\.live\.bilibili\.com\/xlive\/e-commerce-interface\/v1\/ecommerce-user\/get_shopping_info\? url reject-dict
^https:\/\/(app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.interface\.v1\.Search\/DefaultWords url reject-dict
^https:\/\/app\.bilibili\.com\/x\/v2\/(feed\/index(\/story)?|search\/square)\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/app\.bilibili\.com\/x\/resource\/(top\/activity|show\/tab\/v2)\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js

# 满意度调研
^https:\/\/api\.bilibili\.com\/x\/v2\/dm\/qoe\/show\? url reject-dict

# 开屏广告 //app.bilibili.com
^http:\/\/[\d\.]+:8000\/v1\/resource\/\w{32}-1-SPLASH url reject-dict
^http:\/\/upos-sz-static\.bilivideo\.com\/ssaxcode\/\w{2}\/\w{2}\/\w{32}-1-SPLASH url reject-dict
^https:\/\/api\.bilibili\.com\/x\/mengqi\/v1\/resource\? url reject-dict
^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/(brand\/list|event\/list2|list|show)\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js

# 我的页面 伪装会员,皮肤推送 //app.bilibili.com
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/(mine(\/ipad)?|myinfo)\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js
^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/blbl.js

# IP请求,地理位置请求 //api.bilibili.com
^https:\/\/api\.bilibili\.com\/x\/web-interface\/zone\?jsonp url reject-dict
^https:\/\/app\.bilibili\.com\/x\/resource\/ip url reject-dict

hostname = app.bilibili.com, api.bilibili.com, api.live.bilibili.com, grpc.biliapi.net, *.biliapi.*, *.bilibili.*,  

*/


var modifiedHeaders = $request.headers;

modifiedHeaders['Cookie'] = '_uuid=D8F355A8-198D-E9C0-F5E9-B452CA05DA4604460infoc; buvid3=6348DD35-861F-4058-8BA7-5B150BCDC37C49129infoc; buvid4=424072DA-47FA-D64C-0B3B-C144EB37D19405172-124022005-EgaeCBXlWsIs9qvu3Enw7Q%3D%3D; buvid_fp=d61216908c08ea598e83a4803a4b5770; Buvid=Y141A11CF695463344BDBC01B81A9885DBD5; SESSDATA=6d582075%2C1723959997%2C014f0a22CjDDRinJ6dQT3VFm9KQXtgb1lh9WshvMUDD4QokkOTn4tDWcMhPM-VfNXFg6hwAfeCISVmhmRzlGN1pZdDhESzh3SVZscXBndHhXRjdVa1RvUzFQcFdzcWhER3lINGJod1FPaXNsY1JYdDg0NVUzVUlrOUlrLVJfTV9vcmxkUE5DbWVKZ3lna0tRIIEC; DedeUserID=3537122795456866; DedeUserID__ckMd5=41f17eb1300fa499; bili_jct=fb3d0f27357afaf77bc09e0133229bc1; sid=fv0on8k1';

modifiedHeaders['Authorization'] = 'identify_v1 9bd89a09f2f39001877b03a74738e122CjDDRinJ6dQT3VFm9KQXtgb1lh9WshvMUDD4QokkOTn4tDWcMhPM-VfNXFg6hwAfeCISVmhmRzlGN1pZdDhESzh3SVZscXBndHhXRjdVa1RvUzFQcFdzcWhER3lINGJod1FPaXNsY1JYdDg0NVUzVUlrOUlrLVJfTV9vcmxkUE5DbWVKZ3lna0tRIIEC';

modifiedHeaders['User-Agent'] = 'bili-universal/76700100 os/ios model/iPhone 15 Plus mobi_app/iphone osVer/17.3 network/1;tf:ct;tf:ct';

headers = $request.headers;

headers['Cookie'] = '_uuid=D8F355A8-198D-E9C0-F5E9-B452CA05DA4604460infoc; buvid3=6348DD35-861F-4058-8BA7-5B150BCDC37C49129infoc; buvid4=424072DA-47FA-D64C-0B3B-C144EB37D19405172-124022005-EgaeCBXlWsIs9qvu3Enw7Q%3D%3D; buvid_fp=d61216908c08ea598e83a4803a4b5770; Buvid=Y141A11CF695463344BDBC01B81A9885DBD5; SESSDATA=6d582075%2C1723959997%2C014f0a22CjDDRinJ6dQT3VFm9KQXtgb1lh9WshvMUDD4QokkOTn4tDWcMhPM-VfNXFg6hwAfeCISVmhmRzlGN1pZdDhESzh3SVZscXBndHhXRjdVa1RvUzFQcFdzcWhER3lINGJod1FPaXNsY1JYdDg0NVUzVUlrOUlrLVJfTV9vcmxkUE5DbWVKZ3lna0tRIIEC; DedeUserID=3537122795456866; DedeUserID__ckMd5=41f17eb1300fa499; bili_jct=fb3d0f27357afaf77bc09e0133229bc1; sid=fv0on8k1';

headers['Authorization'] = 'identify_v1 9bd89a09f2f39001877b03a74738e122CjDDRinJ6dQT3VFm9KQXtgb1lh9WshvMUDD4QokkOTn4tDWcMhPM-VfNXFg6hwAfeCISVmhmRzlGN1pZdDhESzh3SVZscXBndHhXRjdVa1RvUzFQcFdzcWhER3lINGJod1FPaXNsY1JYdDg0NVUzVUlrOUlrLVJfTV9vcmxkUE5DbWVKZ3lna0tRIIEC';

headers['User-Agent'] = 'bili-universal/76700100 os/ios model/iPhone 15 Plus mobi_app/iphone osVer/17.3 network/1;tf:ct;tf:ct';

$done({
    headers
});


