/*

[rewrite_local]
# 将指定URL中的udid参数替换为新的值
^https:\/\/afzs\.iosoi\.cn\/appstore\?udid=[^&]* https:\/\/afzs\.iosoi\.cn\/appstore?udid=00008110-001C2DEC1A9B801E header
url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/af.js
[mitm]
hostname = afzs.iosoi.cn
*/

// 检查URL中是否包含udid参数，并进行替换
var url = $request.url;
var pattern = /udid=[^&]*/;
if (pattern.test(url)) {
    var updatedUrl = url.replace(pattern, 'udid=00008110-001C2DEC1A9B801E');
    $done({ url: updatedUrl });
} else {
    // 如果URL中不存在udid参数，不做修改直接返回
    $done({});
}