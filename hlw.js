/*
微信小程序搜索
============
新联惠购
贵旅优品
空港乐购
航旅黔购
遵航出山
贵盐黔品
乐旅商城
驿路黔寻
============
先注册并实名认证
1.打开重写脚本 ➟ 进入小程序首页 ➟ 提示获取参数成功即可继续使用该脚本
2.添加cron任务
注： 下方所有cron只是建议不是一致，请自行修改
============
Quantumult X: 在[task_local]下直接添加下放文本
# 茅台预约
32 8 * * * https://gist.githubusercontent.com/Yuheng0101/ac320a985dae31fe59666c63283477a4/raw/maotai.vip.task.js, tag=茅台预约, img-url=https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/70/a4/56/70a456c9-4df9-3bdb-03b6-ecf99f13e7c1/AppIcon-1x_U007epad-0-10-0-85-220.png/144x144bb.png, enabled=true
============
Surge: 在[Script]下添加下方文本
茅台预约 = type=cron,cronexp=44 8 * * *,timeout=20,script-path=https://gist.githubusercontent.com/Yuheng0101/ac320a985dae31fe59666c63283477a4/raw/maotai.vip.task.js,script-update-interval=604800
============
Loon: 在[Script]下添加下方文本
cron "35 8 * * *" script-path=https://gist.githubusercontent.com/Yuheng0101/ac320a985dae31fe59666c63283477a4/raw/maotai.vip.task.js, timeout=20, tag=茅台预约, img-url=https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/70/a4/56/70a456c9-4df9-3bdb-03b6-ecf99f13e7c1/AppIcon-1x_U007epad-0-10-0-85-220.png/144x144bb.png
============
^https?:\/\/gw\.huiqunchina\.com\/front-manager\/api\/customer\/channel url script-request-body https://gist.githubusercontent.com/Yuheng0101/ac320a985dae31fe59666c63283477a4/raw/maotai.vip.task.js

hostname = gw.huiqunchina.com

*/
const $ = new Env('茅台预约')
$.yqcKey = $.getdata('yqc_vip_key') || ''
if (!$.yqcKey) $.msg($.name, `请填写会员卡密, 不对外开放! `), $.done()
$.isRequest = () => typeof $request !== 'undefined'
// prettier-ignore
$.qs = {stringify(e,n,r,t){var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};return n=n||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(t){var a=encodeURIComponent(o(t))+r;return Array.isArray(e[t])?e[t].map(function(e){return a+encodeURIComponent(o(e))}).join(n):a+encodeURIComponent(o(e[t]))}).filter(Boolean).join(n):t?encodeURIComponent(o(t))+r+encodeURIComponent(o(e)):""},parse(e,n,r,t){function o(e,n){return Object.prototype.hasOwnProperty.call(e,n)}n=n||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(n);var u=1e3;t&&"number"==typeof t.maxKeys&&(u=t.maxKeys);var i=e.length;u>0&&i>u&&(i=u);for(var c=0;c<i;++c){var p,f,y,l,m=e[c].replace(s,"%20"),d=m.indexOf(r);d>=0?(p=m.substr(0,d),f=m.substr(d+1)):(p=m,f=""),y=decodeURIComponent(p),l=decodeURIComponent(f),o(a,y)?Array.isArray(a[y])?a[y].push(l):a[y]=[a[y],l]:a[y]=l}return a}}
// -------------------------------------
// 通用函数
const ObjectKeys2LowerCase = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]))
const isTimeRange = (a, b) => new Date().getTime() >= a && new Date().getTime() <= b
// prettier-ignore
const A=e=>new Promise(((t,a)=>{const c={url:`https://yqc-premium.me/api/huluwa/encrypt`,type:"post",dataType:"json",headers:{"x-auth-uid":$.yqcKey},body:{yqc:e}};fetchData(c).then((e=>t(e))).catch((e=>a(e)))}));
// prettier-ignore
const B=async()=>{const{"x-access-token":e}=ObjectKeys2LowerCase($request.headers),{channelId:a}=$.toObj($request?.body||"");if(e&&a){const{appId:s,key:t,name:n}=DATA_SUPPORT.find((e=>e.channelId==a)),o=($.getdata(t.toLowerCase())||"").split(SPLIT).filter(Boolean),{phone:d,realName:c}=await apis.getUserInfo(s,e);$.log(`获取用户信息成功: ${c}(${d})`);const l=c.replace(/[\u4e00-\u9fa5](?=[\u4e00-\u9fa5])/g,"*"),r=d.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),i=o.findIndex((e=>e.split(":")[0]===d));-1===i?(o.push(`${d}:${e}`),$.msg(n,`${l}(${r})新增成功`,e)):o[i]===`${d}:${e}`?$.log(`${l}(${r})缓存数据一致 无需更新`):(o[i]=`${d}:${e}`,$.msg(n,`${l}(${r})更新成功`,e)),$.setdata(o.join(SPLIT),t.toLowerCase())}else $.msg($.name,"获取用户信息失败","请检查请求参数")};
// prettier-ignore
const C=async({url:t,method:a="post",data:o,tk:e},r)=>{try{const r=await A({method:a,url:t,body:$.toStr(o),date:Date.now()});Object.assign(r,{"X-access-token":e});const c={url:"https://gw.huiqunchina.com"+t,headers:r,type:a,body:$.toStr(o)},{code:s,data:n,message:h}=await fetchData(c);if("10000"===s)return n;throw new Error(h)}catch(t){throw new Error(`[茅台预约] ❗${r}失败: ${t}`)}};
/* prettier-ignore */
const apis = {
    // 获取用户信息
    getUserInfo: (appId, tk) => new Promise((resolve, reject) => C({ url: '/front-manager/api/customer/queryById/token', data: { appId }, tk }, '获取用户信息').then(resolve).catch(reject)),
    // 获取相关活动
    getChannelActivity: (id, tk) => new Promise((resolve, reject) => C({ url: '/front-manager/api/customer/promotion/channelActivity', data: { id }, tk }, '获取相关活动').then(resolve).catch(reject)),
    // 检查用户是否抢购
    checkCustomerInQianggou: (activityId, channelId, tk) => new Promise((resolve, reject) => C({ url: '/front-manager/api/customer/promotion/checkCustomerInQianggou', data: { activityId, channelId }, tk }, '检查用户是否抢购').then(resolve).catch(reject)),
    // 预约
    appoint:  (activityId, channelId, tk) => new Promise((resolve, reject) => C({ url: '/front-manager/api/customer/promotion/appoint', data: { activityId, channelId }, tk }, '预约').then(resolve).catch(reject))
}
// -------------------------------------
// 变量区域
const SPLIT = ($.isNode() ? process.env.HULUWA_SPLIT : $.getdata('huluwa_split')) || '&'
// 相关参数
const CACHE_DATAS = {
    // 新联惠购
    XLTH_COOKIES: checkEnv('XLTH_COOKIES') || [],
    // 贵旅优品
    GLYP_COOKIES: checkEnv('GLYP_COOKIES') || [],
    // 空港乐购
    KGLG_COOKIES: checkEnv('KGLG_COOKIES') || [],
    // 航旅黔购
    HLQG_COOKIES: checkEnv('HLQG_COOKIES') || [],
    // 遵航出山
    ZHCS_COOKIES: checkEnv('ZHCS_COOKIES') || [],
    // 贵盐黔品
    GYQP_COOKIES: checkEnv('GYQP_COOKIES') || [],
    // 乐旅商城
    LLSC_COOKIES: checkEnv('LLSC_COOKIES') || [],
    // 驿路黔寻
    YLQX_COOKIES: checkEnv('YLQX_COOKIES') || []
}
// 固定参数
const DATA_SUPPORT = [
    { appId: 'wxded2e7e6d60ac09d', channelId: '8', name: '新联惠购', key: $.isNode() ? `XLTH_COOKIES` : `xlth_cookies` },
    { appId: 'wx61549642d715f361', channelId: '7', name: '贵旅优品', key: $.isNode() ? `GLYP_COOKIES` : `glyp_cookies` },
    { appId: 'wx613ba8ea6a002aa8', channelId: '2', name: '空港乐购', key: $.isNode() ? `KGLG_COOKIES` : `kglg_cookies` },
    { appId: 'wx936aa5357931e226', channelId: '6', name: '航旅黔购', key: $.isNode() ? `HLQG_COOKIES` : `hlqg_cookies` },
    { appId: 'wx624149b74233c99a', channelId: '5', name: '遵航出山', key: $.isNode() ? `ZHCS_COOKIES` : `zhcs_cookies` },
    { appId: 'wx5508e31ffe9366b8', channelId: '3', name: '贵盐黔品', key: $.isNode() ? `GYQP_COOKIES` : `gyqp_cookies` },
    { appId: 'wx821fb4d8604ed4d6', channelId: '1', name: '乐旅商城', key: $.isNode() ? `LLSC_COOKIES` : `llsc_cookies` },
    { appId: 'wxee0ce83ab4b26f9c', channelId: '9', name: '驿路黔寻', key: $.isNode() ? `YLQX_COOKIES` : `ylqx_cookies` }
]
// -------------------------------------
// 通知内容
let output = ''
!(async () => {
    if ($.isRequest()) return await B()
    const needAppointList = DATA_SUPPORT.map((e) => ({ ...e, cookies: CACHE_DATAS[$.isNode() ? e.key : e.key.toUpperCase()] })).filter((e) => e.cookies.length !== 0)
    if (needAppointList.length !== 0) {
        $.log(`[茅台预约] 共找到 ${needAppointList.length} 个类型变量 开始预约`)
        for (const item of needAppointList) {
            $.log(`[茅台预约] [${item.name}] 预约开始`)
            output += (needAppointList.indexOf(item) !== 0 ? `\n` : '') + `【${item.name}】`
            $.log(`[茅台预约] 共找到 ${item.cookies.length} 个用户`)
            for (const cookie of item.cookies) {
                if (item.cookies.indexOf(cookie) !== 0) await $.wait(Math.floor(Math.random() * 1000) + 1000)
                try {
                    const { realName, phone, nickname: encryptName } = await apis.getUserInfo(item.appId, cookie)
                    // const encryptName = realName.replace(/[\u4e00-\u9fa5](?=[\u4e00-\u9fa5])/g, '*')
                    const encryptPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    $.log(`[茅台预约] 当前用户 ${encryptName}(${encryptPhone})`)
                    output += `\n${encryptName}(${encryptPhone})`
                    const {
                        id: activityId, // 活动id
                        name: activityName, // 活动名称
                        appointStartTime, // 预约开始时间
                        appointEndTime // 预约结束时间
                    } = await apis.getChannelActivity(item.channelId, cookie)
                    if (!isTimeRange(appointStartTime, appointEndTime)) {
                        $.log(`[茅台预约] [${item.name}] ${encryptName}(${encryptPhone}) 不在预约时间范围内 跳过`)
                        output += `\n不在预约时间范围内 跳过`
                        continue
                    }
                    $.log(`[茅台预约] 活动名称: ${activityName}`)
                    const isAppoint = await apis.checkCustomerInQianggou(activityId, item.channelId, cookie)
                    if (isAppoint === false) {
                        const result = await apis.appoint(activityId, item.channelId, cookie)
                        output += result ? `\n预约成功` : `\n预约失败`
                    } else {
                        $.log(`[茅台预约] [${item.name}] ${encryptName}已预约 跳过`)
                        output += `\n已预约 跳过`
                    }
                } catch (e) {
                    $.log(e)
                    output += '\n' + e
                    continue
                }
            }
            $.log(`[茅台预约] [${item.name}] 预约结束`)
        }
        $.log(`[茅台预约] 预约结束`)
    } else {
        $.log(`[茅台预约] 未找到任何用户信息 跳过预约`)
    }
    await SendNotify($.name, '', output)
})()
    .catch((e) => $.log('', `❗️${$.name}, 请求失败: ${e}`))
    .finally(() => $.done())
// prettier-ignore
function checkEnv(e){const t=($.isNode()?(require("dotenv").config(),process.env[e.toUpperCase()]):$.getdata(e.toLowerCase()))||"";if(t){return t.split(SPLIT).filter(Boolean).map((e=>e.split(":")[1]))}return null}
// prettier-ignore
async function fetchData(e){if("string"==typeof e&&(e={url:e}),!e?.url)throw new Error("[发送请求] 缺少 url 参数");try{const{url:t,type:o,headers:r,body:s,params:i,dataType:a="form",deviceType:n="mobile",responseType:c="data"}=e,p=o?o.toLowerCase():"get",l=t.concat("post"===p?"?"+$.qs.stringify(i):""),u=ObjectKeys2LowerCase(r||{});u?.["user-agent"]||Object.assign(u,{"user-agent":"pc"===n?"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"}),"json"===a&&Object.assign(u,{"content-type":"application/json;charset=UTF-8"});const y=e?.timeout?$.isSurge()?e.timeout/1e3:e.timeout:5e3,m="post"===p&&s&&(("json"===e.dataType?$.toStr:$.qs.stringify)("object"==typeof s?s:"")||s),b={url:l,headers:u,..."post"===p&&{body:m},..."get"===p&&i&&{params:i},timeout:y},g=new Promise(((e,t)=>{$[p](b,((o,r,s)=>{o?t(o):e("response"===c?r:$.toObj(s)||s)}))}));return $.isQuanX()?await Promise.race([new Promise(((e,t)=>setTimeout((()=>t(new Error("网络开小差了~"))),y))),g]):g}catch(e){throw new Error(e)}}
// prettier-ignore
async function SendNotify(n,o="",i="",t={}){const e="undefined"!=typeof $app&&"undefined"!=typeof $http,s=t["open-url"],f=t["media-url"];if($.isQuanX()&&$notify(n,o,i,t),$.isSurge()){const t=f?`${i}\n多媒体:${f}`:i;$notification.post(n,o,t,{url:s})}if($.isLoon()){const t={};s&&(t.openUrl=s),f&&(t.mediaUrl=f),"{}"===JSON.stringify(t)?$notification.post(n,o,i):$notification.post(n,o,i,t)}const c=`${i}${s?`\n点击跳转: ${s}`:""}${f?`\n多媒体: ${f}`:""}`;if(e){require("push").schedule({title:n,body:`${o?`${o}\n`:""}${c}`})}if($.isNode())try{const i=require("./sendNotify");await i.sendNotify(`${n}\n${o}`,c)}catch(n){console.log("没有找到sendNotify.js文件")}console.log(`${n}\n${o}\n${c}\n\n`)}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
