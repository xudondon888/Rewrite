/*
脚本功能：网易云解锁VIP
VIP音乐试听权限+不会变身会员,可以直接听会员歌曲！无法调高音质！
[rewrite_local]

# 播放器会员皮肤
^https:\/\/interface3?\.music\.163\.com\/eapi\/playermode\/ url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 搜索结果会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 播放器会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/v3\/song\/detail url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 侧边栏会员等级
^https:\/\/interface3?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 首页歌单会员歌曲
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

# 会员认证
^https?:\/\/interface3?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://raw.githubusercontent.com/xudondon888/Rewrite/main/wyy.js

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
  header["MConfig-Info"] = '{"zr4bw6pKFDIZScpo":{"version":1366016,"appver":"9.0.25"},"tPJJnts2H31BZXmp":{"version":2775040,"appver":"2.0.30"},"c0Ve6C0uNl2Am0Rl":{"version":598016,"appver":"1.7.50"},"IuRPVVmc3WWul9fT":{"version":32544768,"appver":"9.0.25"}}';
  header["User-Agent"] = 'NeteaseMusic 9.0.25/4742 (iPhone; iOS 17.3; zh_CN)';
  header["Cookie"] = 'EVNSM=1.0.0; NMCID=ncpnft.1699517398000.01.3; NMDI=Q1NKTQcBDAAYPZAlGSy0xQjjeNaWAAAAKKcqc5YwyhdhJ67eA%2FPI1E7idpXcUMXqRa9BhexIMrzNt8HHe%2BtRULo1mACgLyJtCdPMaWLNON6TEnU6%2BmVji8vkA8LosPsCjTulOxXTmnML3vQ%2FsCtn7%2BsdH9q4cQvr4DoiKHQUgMPRK8WOWajmLwzfutfxXID9ZRq0ERgUorXnc6Jc7mQ6rsxwVgATRvgafiCPDRtX; URS_APPID=2A8A2C000049A0D0A5671070ADE1043B687DA79BFCBAE1FB34FA9BABC722B32DB6293116B121D6872A9FEA6913295501; appkey=IuRPVVmc3WWul9fT; appver=9.0.25; buildver=4742; caid={"lastIyunId":"5aa9f4d9f7fcfb3ec1051d59103952a2","iyunId":"d699636c503bd00b532b5de4707e316e","iyunVersion":"20230330","lastIyunVersion":"20220111"}; channel=distribution; deviceId=5bbc9cd3afc14f8252da881bd1f66be5; idfa=00000000-0000-0000-0000-000000000000; idfv=D53C6731-15B0-4AE9-BBAC-502B6ECE4931; machineid=iPhone15.5; os=iPhone OS; osver=17.3; packageType=release; sDeviceId=5bbc9cd3afc14f8252da881bd1f66be5; ntes_kaola_ad=1; JSESSIONID-WYYY=pSOkjBMhtdM%2BVu%2F5wCya5cUjpl%2BHx0sMIOBwY%2F6KJo8b68V13w0Y2R8ZTd6j%2BDS8NEpIeFmhVrM46IcuZ6A9Q65bl9V9w7l6psMN5yWrV2It8T3AGs4%2BCDMd4X6ZZnr2Xj%2F%2FG%2FQOsprEJhYNyJ6%5CWOF0ZHnWW%5CwVcKYCQI1Tx%5CpGrxqP%3A1709363507560; _iuqxldmzr_=33; MUSIC_U=007FFDF44AF26F7F5A0353F9B55CF26838A31F725A63180EA5032D89CB04EED4070F48AF491758C7A4CDD3BBABBFC8E69484B5D7E2161AAC440B4FFA85AC11FDBAA2E581BF5B3F886E49F4679BCAA501878ACE11C3D2200ED03AA8F8488316A697A377FC0DC4C8576551336D1B1376F225C2676055DE4AB0C029EBE473A1ED903E84E16815E807456E8FF2DD2BDDCE751FDDAC695178136145A1E80CEA4DAF6B5F4EADB3B6358FB15F5C95D7BDFBE27F01F3D36053B3E8D28E120FA4F2DDB8493AC9B09ABE3ECEA71CE60FCB1AD7ED0A995CDA90FC878170F7CFD1E0FA35BDF45AECCA74671B8445064774B2BFC6A62AEB8E2255272F6189BE4F5A204AED47F38C17962F1420DF409B684E26E003DEEA65E87C8A775CDC84A3109A5CB80A49F0DD; __csrf=6c0aebdf978d170b7f600fdf7bce639d; NMTID=00OWFFdlzeuDr9pM0Cho7jnHFI8zn8AAAGN6LDcSA; __csrf=75238d12a57a52c31109d65266fc1b19; _ntes_nnid=f0b0cf6f4db54ad2037b6096af19fb38,1708510013672; _ntes_nuid=f0b0cf6f4db54ad2037b6096af19fb38';
} else {
  headers["mconfig-info"] = '{"zr4bw6pKFDIZScpo":{"version":1366016,"appver":"9.0.25"},"tPJJnts2H31BZXmp":{"version":2775040,"appver":"2.0.30"},"c0Ve6C0uNl2Am0Rl":{"version":598016,"appver":"1.7.50"},"IuRPVVmc3WWul9fT":{"version":32544768,"appver":"9.0.25"}}';
  headers["user-agent"] = 'NeteaseMusic 9.0.25/4742 (iPhone; iOS 17.3; zh_CN)';
  headers["cookie"] = 'EVNSM=1.0.0; NMCID=ncpnft.1699517398000.01.3; NMDI=Q1NKTQcBDAAYPZAlGSy0xQjjeNaWAAAAKKcqc5YwyhdhJ67eA%2FPI1E7idpXcUMXqRa9BhexIMrzNt8HHe%2BtRULo1mACgLyJtCdPMaWLNON6TEnU6%2BmVji8vkA8LosPsCjTulOxXTmnML3vQ%2FsCtn7%2BsdH9q4cQvr4DoiKHQUgMPRK8WOWajmLwzfutfxXID9ZRq0ERgUorXnc6Jc7mQ6rsxwVgATRvgafiCPDRtX; URS_APPID=2A8A2C000049A0D0A5671070ADE1043B687DA79BFCBAE1FB34FA9BABC722B32DB6293116B121D6872A9FEA6913295501; appkey=IuRPVVmc3WWul9fT; appver=9.0.25; buildver=4742; caid={"lastIyunId":"5aa9f4d9f7fcfb3ec1051d59103952a2","iyunId":"d699636c503bd00b532b5de4707e316e","iyunVersion":"20230330","lastIyunVersion":"20220111"}; channel=distribution; deviceId=5bbc9cd3afc14f8252da881bd1f66be5; idfa=00000000-0000-0000-0000-000000000000; idfv=D53C6731-15B0-4AE9-BBAC-502B6ECE4931; machineid=iPhone15.5; os=iPhone OS; osver=17.3; packageType=release; sDeviceId=5bbc9cd3afc14f8252da881bd1f66be5; ntes_kaola_ad=1; JSESSIONID-WYYY=pSOkjBMhtdM%2BVu%2F5wCya5cUjpl%2BHx0sMIOBwY%2F6KJo8b68V13w0Y2R8ZTd6j%2BDS8NEpIeFmhVrM46IcuZ6A9Q65bl9V9w7l6psMN5yWrV2It8T3AGs4%2BCDMd4X6ZZnr2Xj%2F%2FG%2FQOsprEJhYNyJ6%5CWOF0ZHnWW%5CwVcKYCQI1Tx%5CpGrxqP%3A1709363507560; _iuqxldmzr_=33; MUSIC_U=007FFDF44AF26F7F5A0353F9B55CF26838A31F725A63180EA5032D89CB04EED4070F48AF491758C7A4CDD3BBABBFC8E69484B5D7E2161AAC440B4FFA85AC11FDBAA2E581BF5B3F886E49F4679BCAA501878ACE11C3D2200ED03AA8F8488316A697A377FC0DC4C8576551336D1B1376F225C2676055DE4AB0C029EBE473A1ED903E84E16815E807456E8FF2DD2BDDCE751FDDAC695178136145A1E80CEA4DAF6B5F4EADB3B6358FB15F5C95D7BDFBE27F01F3D36053B3E8D28E120FA4F2DDB8493AC9B09ABE3ECEA71CE60FCB1AD7ED0A995CDA90FC878170F7CFD1E0FA35BDF45AECCA74671B8445064774B2BFC6A62AEB8E2255272F6189BE4F5A204AED47F38C17962F1420DF409B684E26E003DEEA65E87C8A775CDC84A3109A5CB80A49F0DD; __csrf=6c0aebdf978d170b7f600fdf7bce639d; NMTID=00OWFFdlzeuDr9pM0Cho7jnHFI8zn8AAAGN6LDcSA; __csrf=75238d12a57a52c31109d65266fc1b19; _ntes_nnid=f0b0cf6f4db54ad2037b6096af19fb38,1708510013672; _ntes_nuid=f0b0cf6f4db54ad2037b6096af19fb38';
}

$done({ url: $request.url, headers: $request.headers, body: $request.body });
