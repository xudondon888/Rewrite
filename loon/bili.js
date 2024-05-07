var headers = $request.headers;

var ck = $persistentStore.read("Bilibili__Cookie");
var au = $persistentStore.read("Bilibili__ Authorization");

if (headers['Cookie'] != undefined) {
    headers['Cookie'] = ck;
} else {
    headers['cookie'] = ck;
}
if (headers['Authorization'] != undefined) {
    headers['Authorization'] = au;
} else {
    headers['authorization'] = au;
}

$done({ 'headers': headers });