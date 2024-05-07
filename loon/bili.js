var headers = $request['headers'];
delete headers["Authorization"];
delete headers["Cookie"];
// headers['buvid'] = $persistentStore.read("Bilibili_buvid");
headers['authorization'] = $persistentStore.read("Bilibili_Authorization");
headers['user-agent'] = $persistentStore.read("Bilibili_Cookie");
$done({ 'headers': headers });