var headers = $request['headers'];
delete headers["MConfig-Info"];
delete headers["User-Agent"];
delete headers ["Cookie"];

// headers['buvid'] = $persistentStore.read("music_buvid");
headers['MConfig-Info'] = 
$persistentStore.read("music_MConfig-Info");
headers['User-Agent'] = 
$persistentStore.read("music_User-Agent");
headers['Cookie'] = 
$persistentStore.read("music_Cookie");
$done({ 'headers': headers });