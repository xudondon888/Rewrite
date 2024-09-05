/*************************************

毒舌电影广告

[rewrite_local]

^https:\/\/vf\.kkys5\.com\/units\/vod\/v1.* url reject-dict

^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img.* url reject-dict

^https:\/\/vres\.kkys6\.com\/vod1\/vod\/upload.* url reject-dict

^https:\/\/vf\.qumzgz\.cn\/vod_ios_static_dsdy\/v20468\/img\/.* url reject-dict

[mitm]
hostname = vf.kkys5.com, vf.qumzgz.cn, vres.kkys6.com, vf.qumzgz.cn

*************************************/

const url = $request.url;
const method = $request.method;
const headers = $request.headers;

// 定义要拦截的资源类型（如图片、视频等）
const blockResourceTypes = ['image', 'video'];

// 获取请求头中的Accept字段，检查请求的资源类型
const acceptHeader = headers['Accept'] || '';

// 检查是否请求图片或其他资源
if (blockResourceTypes.some(type => acceptHeader.includes(type))) {
    // 如果匹配到要拦截的资源类型，直接返回禁止加载
    console.log(`Blocked request for resource: ${url}`);
    $done({ response: { status: 403, body: 'Blocked' } }); // 返回403禁止状态码
} else {
    // 如果不是指定的资源类型，正常发出请求
    const myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: $request.body || ''
    };

    $task.fetch(myRequest).then(response => {
        console.log(response.statusCode + "\n\n" + response.body);
        $done(response);  // 确保正常返回响应结果
    }, reason => {
        console.log(reason.error);
        $done({ response: { status: 500, body: 'Request failed' } });  // 错误处理，返回500状态
    });
}