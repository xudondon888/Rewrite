*

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

^https?:\/\/gw\.huiqunchina\.com\/front-manager\/api\/customer\/channel url script-request-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/huluwa.js

hostname = gw.huiqunchina.com

*/

// ==UserScript==
// @Name 葫芦娃预约
// @Version 1.0
// @Author Yuheng0101
// @Icon https://example.com/icon.png
// @Supported Quantumult X
// @Description 葫芦娃预约
// @hostname gw.huiqunchina.com
// @grant require
// ==/UserScript==

const $ = new Env("葫芦娃预约");

const XLTH_APPID = 'wxded2e7e6d60ac09d'; // 新联惠购
const GLYP_APPID = 'wx61549642d715f361'; // 贵旅优品
const KGLG_APPID = 'wx613ba8ea6a002aa8'; // 空港乐购
const HLQG_APPID = 'wx936aa5357931e226'; // 航旅黔购
const ZHCS_APPID = 'wx624149b74233c99a'; // 遵行出山
const GYQP_APPID = 'wx5508e31ffe9366b8'; // 贵盐黔品
const LLSC_APPID = 'wx821fb4d8604ed4d6'; // 乐旅商城
const YLQX_APPID = 'wxee0ce83ab4b26f9c'; // 驿路黔寻

const HOST = 'https://gw.huiqunchina.com';
const AK = '00670fb03584fbf44dd6b136e534f495';
const SK = '0d65f24dbe2bc1ede3c3ceeb96ef71bb';

let sendMessage = [];

async function getWeChatToken() {
    const url = "https://api.weixin.qq.com/cgi-bin/token";
    const params = {
        grant_type: "client_credential",
        appid: "YOUR_WECHAT_APPID",   // 替换成你的微信appid
        secret: "YOUR_WECHAT_SECRET"   // 替换成你的微信secret
    };
    const res = await $axios.get(url, { params });
    return res.data.access_token;
}

async function getUserInfo(appId, token) {
    const url = `${HOST}/front-manager/api/customer/queryById/token`;
    const method = 'POST';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    let resData;
    await $axios.post(url, data, { headers })
        .then(res => {
            resData = res.data;
            sendMessage.push(`获取用户信息成功：${JSON.stringify(resData)}`);
        })
        .catch(err => {
            resData = err.response.data;
            sendMessage.push(`获取用户信息失败：${JSON.stringify(resData)}`);
        });
    return resData;
}

async function autoSubmit(appId, cookie, token) {
    try {
        const userInfo = await getUserInfo(appId, token);
        if (userInfo.code === 200) {
            console.log(`用户信息：${JSON.stringify(userInfo.data)}`);
            sendMessage.push(`用户信息：${JSON.stringify(userInfo.data)}`);
        } else {
            console.log(`获取用户信息失败：${userInfo.message}`);
            sendMessage.push(`获取用户信息失败：${userInfo.message}`);
            return;
        }

        const activityInfo = await getChannelActivity(appId, token);
        if (activityInfo.code === 200) {
            console.log(`获取渠道活动信息成功：${JSON.stringify(activityInfo.data)}`);
            sendMessage.push(`获取渠道活动信息成功：${JSON.stringify(activityInfo.data)}`);
        } else {
            console.log(`获取渠道活动信息失败：${activityInfo.message}`);
            sendMessage.push(`获取渠道活动信息失败：${activityInfo.message}`);
            return;
        }

        const activityId = activityInfo.data.id;
        const checkResult = await checkCustomerInQianggou(activityId, appId, token);
        if (checkResult.code === 200) {
            console.log(`检查用户抢购状态成功：${JSON.stringify(checkResult.data)}`);
            sendMessage.push(`检查用户抢购状态成功：${JSON.stringify(checkResult.data)}`);
        } else {
            console.log(`检查用户抢购状态失败：${checkResult.message}`);
            sendMessage.push(`检查用户抢购状态失败：${checkResult.message}`);
            return;
        }

        if (!checkResult.data) {
            const appointResult = await appoint(activityId, appId, token);
            if (appointResult.code === 200) {
                console.log(`预约成功：${JSON.stringify(appointResult.data)}`);
                sendMessage.push(`预约成功：${JSON.stringify(appointResult.data)}`);
            } else {
                console.log(`预约失败：${appointResult.message}`);
                sendMessage.push(`预约失败：${appointResult.message}`);
            }
        } else {
            console.log("用户已预约");
            sendMessage.push("用户已预约");
        }
    } catch (error) {
        console.log(`运行出错：${error}`);
        sendMessage.push(`运行出错：${error}`);
    }
}

async function checkCustomerInQianggou(activityId, appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/checkCustomerInQianggou`;
    const method = 'POST';
    const data = { activityId, appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

async function getChannelActivity(appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion

/channelActivity`;
    const method = 'POST';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

async function appoint(activityId, appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/appoint`;
    const method = 'POST';
    const data = { activityId, appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

function buildHeader(method, url, body) {
    const date = new Date().toUTCString();
    const signStr = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(body)}&${date}`;
    const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(signStr, SK));

    return {
        'Content-Type': 'application/json',
        'X-HMAC-SIGNATURE': sign,
        'X-HMAC-ACCESS-KEY': AK,
        'X-HMAC-ALGORITHM': 'hmac-sha256',
        'X-HMAC-DIGEST': CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(body)),
        'X-HMAC-Date': date,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0.33(0x18000021) NetType/WIFI Language/zh_CN',
    };
}

async function getWeChatToken() {
    const url = "https://api.weixin.qq.com/cgi-bin/token";
    const params = {
        grant_type: "client_credential",
        appid: "YOUR_WECHAT_APPID",   // 替换成你的微信appid
        secret: "YOUR_WECHAT_SECRET"   // 替换成你的微信secret
    };
    const res = await $axios.get(url, { params });
    return res.data.access_token;
}

async function getUserInfo(appId, token) {
    const url = `${HOST}/front-manager/api/customer/queryById/token`;
    const method = 'POST';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

async function checkCustomerInQianggou(activityId, appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/checkCustomerInQianggou`;
    const method = 'POST';
    const data = { activityId, appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

async function getChannelActivity(appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/channelActivity`;
    const method = 'POST';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

async function appoint(activityId, appId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/appoint`;
    const method = 'POST';
    const data = { activityId, appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    const res = await $axios.post(url, data, { headers });
    return res.data;
}

function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

async function main() {
    const wechatToken = await getWeChatToken();
    console.log(`WeChat Token: ${wechatToken}`);
    
    const XLTH_COOKIE_ARR = 'YOUR_COOKIE'.split('\n'); // 替换成你的cookie
    for (let item of XLTH_COOKIE_ARR) {
        const token = wechatToken;
        await autoSubmit(XLTH_APPID, item, token);
        await delay(1000);
    }
    
    console.log(sendMessage.join('\n'));
    notify("葫芦娃预约", sendMessage.join('\n'));
    $done();
}

main().catch((e) => {
    console.error(e);
    notify("葫芦娃预约", `出现错误：${e}`);
});

function notify(title, message) {
    $notify(title, "", message);
}