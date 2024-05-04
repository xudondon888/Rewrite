var headers = $request['headers'];
delete headers["MConfig-Info"];
delete headers["User-Agent"];
delete headers["Cookie"];

headers['music_MConfig-Info'] = $persistentStore.read("music_MConfig-Info");
headers['music_User-Agent'] = $persistentStore.read("music_User-Agent");
headers['music_Cookie'] = $persistentStore.read("music_Cookie");
$done({ 'headers': headers });