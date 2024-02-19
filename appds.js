
[rewrite_local]

https://afzs.iosoi.cn/appstore url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/appds.js

[mitm]
hostname = app.appds.cn


var updatedUrl = $request.url.replace(/udid=[^&]*/, 'udid=00008120-000A14A01EE0A01E');
$done({ url: updatedUrl });
