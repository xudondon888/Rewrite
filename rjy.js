

/*
软件源
[rewrite_local]
https://app.appds.cn/appstore url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/appds.js

[mitm]
hostname = app.appds.cn
*/
var updatedUrl = $request.url.replace(/udid=[^&]*/, 'udid=00008120-000A14A01EE0A01E');
$done({ url: updatedUrl });



