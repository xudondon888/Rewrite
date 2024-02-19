/*
脚本功能：网易云解锁VIP
VIP音乐试听权限+
不会变身会员,可以直接听会员歌曲！无法调高音质！

[rewrite_local]

# 播放器会员皮肤
^https:\/\/interface3?\.music\.163\.com\/eapi\/playermode\/ url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 搜索结果会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 播放器会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/v3\/song\/detail url script-request-header wyy.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 侧边栏会员等级
^https:\/\/interface3?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 首页歌单会员歌曲
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 会员认证
^https?:\/\/interface3?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

#!name = 网易云音乐
#!desc = 音乐的力量不是用来看广告的
#!author = RuCu6 Keywos
#!update = 2024-01-27 20:10

# 热推 有话想说 分享一下 歌曲下的祝福等小提示 ｜ 评论区 乐迷 星评等级 关注 等图标
^https:\/\/interface3?\.music\.163\.com\/eapi\/(batch|v2\/resource\/comment\/floor\/) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 推荐 | home | 主页
^https:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/block\/page|link\/page\/rcmd\/(block\/resource\/multi\/refresh|resource\/show)) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 底部tab
^https:\/\/interface3?\.music\.163\.com\/eapi\/link\/home\/framework\/tab url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 发现
^https:\/\/interface3?\.music\.163\.com\/eapi\/link\/page\/discovery\/resource\/show url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 我的页面
^https:\/\/interface3?\.music\.163\.com\/eapi\/link\/position\/show\/resource url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 播放页,多余图标,各种小提示
^https:\/\/interface3?\.music\.163\.com\/eapi\/(ios\/version|mlivestream\/entrance\/playpage\/|link\/position\/show\/strategy|link\/scene\/show\/resource|v1\/content\/exposure\/comment\/banner\/) url reject-dict

# 会员伪装
;^https:\/\/interface3?\.music\.163\.com\/eapi\/(music-vip-membership\/client\/vip\/info|vipauth\/app\/auth\/recycle) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/(music-vip-membership\/client\/vip\/info|vipauth\/app\/auth\/recycle) url reject-dict

# 播放音效
;^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/play\/more\/list\/ url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 显示未关注你
^https:\/\/interface3?\.music\.163\.com\/eapi\/user\/follow\/users\/mixed\/ url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 播放页 歌名下方 乐迷团｜关注｜播放页提示｜音乐应用红点｜播放提示
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(community\/friends\/fans-group\/artist\/group\/|mine\/applet\/redpoint|music\/songshare\/text\/recommend\/|resniche\/position\/play\/new\/|resource\/comments?\/musiciansaid\/|user\/sub\/artist) url reject-dict

# 今日运势 商城 Beat专区 音乐收藏家 | type:ACTIVITY | 低至5.2折
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(delivery\/(batch-deliver|deliver)|moment\/tab\/info\/|side-bar\/mini-program\/music-service\/account|yunbei\/account\/entrance\/) url reject-dict

# 开屏广告
^https?:\/\/interface3?\.music\.163\.com\/e?api\/(ocpc\/)?ad\/ url reject-dict

# 搜索页 搜索词 热搜卡片 猜你喜欢 我的应用下方提醒
^https?:\/\/interface3?\.music\.163\.com\/w?eapi\/(activity\/bonus\/playpage\/time\/query|resource-exposure\/|search\/(chart\/|default\/|rcmd\/keyword\/|specialkeyword\/)) url reject-dict


[mitm] 
hostname = interface*.music.163.com

*/

let header = $request.headers;
const isQuanX = typeof $task !== "undefined";

if (isQuanX) {
  header["MConfig-Info"] = '{"zr4bw6pKFDIZScpo":{"version":1355776,"appver":"9.0.25"},"tPJJnts2H31BZXmp":{"version":2727936,"appver":"2.0.30"},"c0Ve6C0uNl2Am0Rl":{"version":595968,"appver":"1.7.50"},"IuRPVVmc3WWul9fT":{"version":31703040,"appver":"9.0.25"}}';
  header["User-Agent"] = 'NeteaseMusic 9.0.25/4742 (iPhone; iOS 17.3; zh_CN)';
  header["Cookie"] = 'EVNSM=1.0.0; NMCID=ncpnft.1699517398000.01.3; NMDI=Q1NKTQcBDAD%2Fk%2BxgdCJ21tOD6f%2BWAAAAhUE6ZGE7rTrNsQ%2F5LlS4GOcXt53dNXXKcFqcSzhYHGsPQldwFuTAy2KqTeDnsHBjmYJ57bNplqd7wEo4TaRpebn2jL2SjLF4L5v2UmwGzTBkWjuxtfxPeayrG0DA1vjB7C7MLRqIt%2F%2FGFmzUzwlYvZvM07PfNTa%2B6VgmfesJWilTTmAVjOEc2%2F9VjDwqQG9Uq8Acba%2FF; URS_APPID=2A8A2C000049A0D0A5671070ADE1043B687DA79BFCBAE1FB34FA9BABC722B32DB6293116B121D6872A9FEA6913295501; appkey=IuRPVVmc3WWul9fT; appver=9.0.25; buildver=4742; caid={"lastIyunId":"5aa9f4d9f7fcfb3ec1051d59103952a2","iyunId":"d699636c503bd00b532b5de4707e316e","iyunVersion":"20230330","lastIyunVersion":"20220111"}; channel=distribution; deviceId=5bbc9cd3afc14f8252da881bd1f66be5; idfa=00000000-0000-0000-0000-000000000000; idfv=D53C6731-15B0-4AE9-BBAC-502B6ECE4931; machineid=iPhone15.5; os=iPhone OS; osver=17.3; packageType=release; sDeviceId=5bbc9cd3afc14f8252da881bd1f66be5; ntes_kaola_ad=1; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; JSESSIONID-WYYY=GSXl%2F1QQWx63%5CGW%2Blxr2OoZpYycGM9kdS5%2BexiZmb4%2FdMAZVTCvZ7%5CoBmt8XkbHh1XCYvUDQR5h9Wl4cgrAJEtkMiHhkaYepS9m3qcfWDsdtZA%2FPxi1wtvZo4HjXKwUluw0VI5Wmp%2F1NESCRJwn%2FiqcDcWjDi0VaTae355XcKwiN0i9F%3A1708354217677; _iuqxldmzr_=33; NMTID=00O86UH6_vQnKRdwEyTkp2djhgS3VcAAAGNwQfGqA; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; WEVNSM=1.0.0; WNMCID=qihswo.1708332882849.01.0; _ntes_nnid=b8be3ada648138251748680e96f75085,1708324860487; _ntes_nuid=b8be3ada648138251748680e96f75085; MUSIC_U=00EC18FF6B8051D7CEE59CF5BCBA2A196077CA1B3CDFB57B02223DCF97AB0EED424A41AC1717C1E8B685D322BC86A7E72386800E55C088093F828CCD089086B85CF7A9906774F3BBFFB10BC36ADE4FDF6091AE9EAF7C7500D5B57F15A346A8CD2B03FE9504FD9B4A41C05C8F996CFD01F20FA2BEFDC7294D7EFA7F283997514BB2B17C63F9DA2A740EF9E4430762CBF5713A8D8B470E68AA1983F77043E02472EEEBB68655716C5ED8CEDC56383D231A4F05D7D2481AA00362585D13FB5C10DEBCBEF3B31DE2FF90B1BDBD5425F14C5B4D50E2F9FBC4A22892E84DED05396B2AC163414136B14EFEDD052A285DD039B4A2E685DB260B1C1A7E867127D913C28604935CA4D07867810750082FEB5BF5CF6D02029CAA5A3E4D8F42A19E8E30182573';
} else {
  headers["mconfig-info"] = '{"zr4bw6pKFDIZScpo":{"version":1355776,"appver":"9.0.25"},"tPJJnts2H31BZXmp":{"version":2727936,"appver":"2.0.30"},"c0Ve6C0uNl2Am0Rl":{"version":595968,"appver":"1.7.50"},"IuRPVVmc3WWul9fT":{"version":31703040,"appver":"9.0.25"}}';
  headers["user-agent"] = 'NeteaseMusic 9.0.25/4742 (iPhone; iOS 17.3; zh_CN)';
  headers["cookie"] = 'EVNSM=1.0.0; NMCID=ncpnft.1699517398000.01.3; NMDI=Q1NKTQcBDAD%2Fk%2BxgdCJ21tOD6f%2BWAAAAhUE6ZGE7rTrNsQ%2F5LlS4GOcXt53dNXXKcFqcSzhYHGsPQldwFuTAy2KqTeDnsHBjmYJ57bNplqd7wEo4TaRpebn2jL2SjLF4L5v2UmwGzTBkWjuxtfxPeayrG0DA1vjB7C7MLRqIt%2F%2FGFmzUzwlYvZvM07PfNTa%2B6VgmfesJWilTTmAVjOEc2%2F9VjDwqQG9Uq8Acba%2FF; URS_APPID=2A8A2C000049A0D0A5671070ADE1043B687DA79BFCBAE1FB34FA9BABC722B32DB6293116B121D6872A9FEA6913295501; appkey=IuRPVVmc3WWul9fT; appver=9.0.25; buildver=4742; caid={"lastIyunId":"5aa9f4d9f7fcfb3ec1051d59103952a2","iyunId":"d699636c503bd00b532b5de4707e316e","iyunVersion":"20230330","lastIyunVersion":"20220111"}; channel=distribution; deviceId=5bbc9cd3afc14f8252da881bd1f66be5; idfa=00000000-0000-0000-0000-000000000000; idfv=D53C6731-15B0-4AE9-BBAC-502B6ECE4931; machineid=iPhone15.5; os=iPhone OS; osver=17.3; packageType=release; sDeviceId=5bbc9cd3afc14f8252da881bd1f66be5; ntes_kaola_ad=1; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; JSESSIONID-WYYY=GSXl%2F1QQWx63%5CGW%2Blxr2OoZpYycGM9kdS5%2BexiZmb4%2FdMAZVTCvZ7%5CoBmt8XkbHh1XCYvUDQR5h9Wl4cgrAJEtkMiHhkaYepS9m3qcfWDsdtZA%2FPxi1wtvZo4HjXKwUluw0VI5Wmp%2F1NESCRJwn%2FiqcDcWjDi0VaTae355XcKwiN0i9F%3A1708354217677; _iuqxldmzr_=33; NMTID=00O86UH6_vQnKRdwEyTkp2djhgS3VcAAAGNwQfGqA; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; WEVNSM=1.0.0; WNMCID=qihswo.1708332882849.01.0; _ntes_nnid=b8be3ada648138251748680e96f75085,1708324860487; _ntes_nuid=b8be3ada648138251748680e96f75085; MUSIC_U=00EC18FF6B8051D7CEE59CF5BCBA2A196077CA1B3CDFB57B02223DCF97AB0EED424A41AC1717C1E8B685D322BC86A7E72386800E55C088093F828CCD089086B85CF7A9906774F3BBFFB10BC36ADE4FDF6091AE9EAF7C7500D5B57F15A346A8CD2B03FE9504FD9B4A41C05C8F996CFD01F20FA2BEFDC7294D7EFA7F283997514BB2B17C63F9DA2A740EF9E4430762CBF5713A8D8B470E68AA1983F77043E02472EEEBB68655716C5ED8CEDC56383D231A4F05D7D2481AA00362585D13FB5C10DEBCBEF3B31DE2FF90B1BDBD5425F14C5B4D50E2F9FBC4A22892E84DED05396B2AC163414136B14EFEDD052A285DD039B4A2E685DB260B1C1A7E867127D913C28604935CA4D07867810750082FEB5BF5CF6D02029CAA5A3E4D8F42A19E8E30182573';
}


headers = $request.headers;

headers['Cookie'] = 'EVNSM=1.0.0; NMCID=ncpnft.1699517398000.01.3; NMDI=Q1NKTQcBDAD%2Fk%2BxgdCJ21tOD6f%2BWAAAAhUE6ZGE7rTrNsQ%2F5LlS4GOcXt53dNXXKcFqcSzhYHGsPQldwFuTAy2KqTeDnsHBjmYJ57bNplqd7wEo4TaRpebn2jL2SjLF4L5v2UmwGzTBkWjuxtfxPeayrG0DA1vjB7C7MLRqIt%2F%2FGFmzUzwlYvZvM07PfNTa%2B6VgmfesJWilTTmAVjOEc2%2F9VjDwqQG9Uq8Acba%2FF; URS_APPID=2A8A2C000049A0D0A5671070ADE1043B687DA79BFCBAE1FB34FA9BABC722B32DB6293116B121D6872A9FEA6913295501; appkey=IuRPVVmc3WWul9fT; appver=9.0.25; buildver=4742; caid={"lastIyunId":"5aa9f4d9f7fcfb3ec1051d59103952a2","iyunId":"d699636c503bd00b532b5de4707e316e","iyunVersion":"20230330","lastIyunVersion":"20220111"}; channel=distribution; deviceId=5bbc9cd3afc14f8252da881bd1f66be5; idfa=00000000-0000-0000-0000-000000000000; idfv=D53C6731-15B0-4AE9-BBAC-502B6ECE4931; machineid=iPhone15.5; os=iPhone OS; osver=17.3; packageType=release; sDeviceId=5bbc9cd3afc14f8252da881bd1f66be5; ntes_kaola_ad=1; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; JSESSIONID-WYYY=GSXl%2F1QQWx63%5CGW%2Blxr2OoZpYycGM9kdS5%2BexiZmb4%2FdMAZVTCvZ7%5CoBmt8XkbHh1XCYvUDQR5h9Wl4cgrAJEtkMiHhkaYepS9m3qcfWDsdtZA%2FPxi1wtvZo4HjXKwUluw0VI5Wmp%2F1NESCRJwn%2FiqcDcWjDi0VaTae355XcKwiN0i9F%3A1708354217677; _iuqxldmzr_=33; NMTID=00O86UH6_vQnKRdwEyTkp2djhgS3VcAAAGNwQfGqA; __csrf=569a3ae245a544c3e7c3c91b14f2a7f1; WEVNSM=1.0.0; WNMCID=qihswo.1708332882849.01.0; _ntes_nnid=b8be3ada648138251748680e96f75085,1708324860487; _ntes_nuid=b8be3ada648138251748680e96f75085; MUSIC_U=00EC18FF6B8051D7CEE59CF5BCBA2A196077CA1B3CDFB57B02223DCF97AB0EED424A41AC1717C1E8B685D322BC86A7E72386800E55C088093F828CCD089086B85CF7A9906774F3BBFFB10BC36ADE4FDF6091AE9EAF7C7500D5B57F15A346A8CD2B03FE9504FD9B4A41C05C8F996CFD01F20FA2BEFDC7294D7EFA7F283997514BB2B17C63F9DA2A740EF9E4430762CBF5713A8D8B470E68AA1983F77043E02472EEEBB68655716C5ED8CEDC56383D231A4F05D7D2481AA00362585D13FB5C10DEBCBEF3B31DE2FF90B1BDBD5425F14C5B4D50E2F9FBC4A22892E84DED05396B2AC163414136B14EFEDD052A285DD039B4A2E685DB260B1C1A7E867127D913C28604935CA4D07867810750082FEB5BF5CF6D02029CAA5A3E4D8F42A19E8E30182573';

headers['User-Agent'] = 'NeteaseMusic 9.0.25/4742 (iPhone; iOS 17.3; zh_CN)';

headers['MConfig-Info'] = '{"zr4bw6pKFDIZScpo":{"version":1355776,"appver":"9.0.25"},"tPJJnts2H31BZXmp":{"version":2727936,"appver":"2.0.30"},"c0Ve6C0uNl2Am0Rl":{"version":595968,"appver":"1.7.50"},"IuRPVVmc3WWul9fT":{"version":31703040,"appver":"9.0.25"}}';

$done({
    headers
});
