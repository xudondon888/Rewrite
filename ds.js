/*************************************

毒舌电影广告

[rewrite_local]

^https:\/\/vf\.kkys5\.com\/units\/vod\/v1.* url reject-dict

^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img.* url reject-dict

^https:\/\/vres\.kkys6\.com\/vod1\/vod\/upload.* url reject-dict

^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img.* url reject-dict

^https:\/\/vres\.bbpeyi\.cn\/vod1\/(vod\/(upload|cover)|app\/icons).* url reject-dict

^https:\/\/vlogic\.kvod10\.com\/(vod\/(search\/hotWords|vodState)|app\/announcements)\?appId.* url reject-dict

[filter_local]

DOMAIN-SUFFIX, dsapp01.com, reject

[mitm]
hostname = vf.kkys5.com, vres.kkys6.com, vf.qumzgz.cn, vres.bbpeyi.cn, vlogic.kvod10.com

*************************************/

/**
 * @fileoverview Script to block and skip ads.
 */

const url = $request.url;
const method = $request.method;
const headers = $request.headers;

// 定义要拦截的资源类型（如图片、视频等）
const blockResourceTypes = ['image', 'video', 'media'];

// 定义拦截的广告URL模式
const adUrlPatterns = [
    /^https:\/\/vf\.kkys5\.com\/units\/vod\/v1.*/,
    /^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img.*/,
    /^https:\/\/vres\.kkys6\.com\/vod1\/vod\/upload.*/,
    /^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img.*/,
    /^https:\/\/vres\.bbpeyi\.cn\/vod1\/(vod\/(upload|cover)|app\/icons).*/,
    /^https:\/\/vlogic\.kvod10\.com\/(vod\/(search\/hotWords|vodState)|app\/announcements)\?appId.*/
];

// 获取请求头中的Accept字段，检查请求的资源类型
const acceptHeader = headers['Accept'] || '';
const isAdResource = blockResourceTypes.some(type => acceptHeader.includes(type));

// 检查是否是广告请求
const isAdUrl = adUrlPatterns.some(pattern => pattern.test(url));

if (isAdResource || isAdUrl) {
    // 如果匹配到广告资源类型或广告URL，直接返回禁止加载
    console.log(`Blocked request for resource: ${url}`);
    $done({ response: { status: 403, body: 'Blocked' } }); // 返回403禁止状态码
} else {
    // 如果不是广告资源，正常发出请求
    const myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: $request.body || ''
    };

    $task.fetch(myRequest).then(response => {
        // 如果响应内容包含跳过广告的指示，模拟跳过操作
        if (response.body.includes('跳过广告') || response.body.includes('Skip Ad')) {
            // 模拟点击跳过广告的逻辑（示例代码，需要根据实际页面调整）
            console.log('Found skip ad button');
            // 具体的跳过广告操作需要根据页面结构编写，这里只是示例
            // 比如可以用浏览器自动化工具来模拟点击操作
        }

        console.log(response.statusCode + "\n\n" + response.body);
        $done({ response }); // 返回实际的响应体
    }, reason => {
        console.log(reason.error);
        $done({ response: { status: 500, body: 'Request failed' } });
    });
}