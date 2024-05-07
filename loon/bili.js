var headers = $request.headers;
var ck = $persistentStore.read("Bilibili__Cookie");
var au = $persistentStore.read("Bilibili__Authorization");

if (ck) {
    headers['cookie'] = ck;
}

if (au) {
    headers['authorization'] = au;
}

$done({ 'headers': headers });