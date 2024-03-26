/*

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
// @hostname gw.huiqunchina.com
// @grant require

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

function calculateDigest(body, sk) {
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(body);
    const signature = hmac.digest('base64');
    return signature;
}

function calculateSignature(method, url, ak, sk, date) {
    const strToSign = `${method.toUpperCase()}\n${url}\n\n${ak}\n${date}\n`;
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(strToSign);
    const signature = hmac.digest('base64');
    return signature;
}

function buildHeader(method, url, body) {
    const date = new Date().toUTCString();
    const signature = calculateSignature(method, url, AK, SK, date);
    const digest = calculateDigest(body, SK);
    const headers = {
        'Content-Type': 'application/json',
        'X-HMAC-SIGNATURE': signature,
        'X-HMAC-ACCESS-KEY': AK,
        'X-HMAC-ALGORITHM': 'hmac-sha256',
        'X-HMAC-DIGEST': digest,
        'X-HMAC-Date': date,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945'
    };
    return headers;
}

function getUserInfo(appId, token) {
    const url = `${HOST}/front-manager/api/customer/queryById/token`;
    const method = 'POST';
    const data = {appId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    let resData;
    $axios.post(url, data, {headers})
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

function getChannelActivity(id, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/channelActivity`;
    const method = 'POST';
    const data = {id};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    let resData;
    $axios.post(url, data, {headers})
        .then(res => {
            resData = res.data;
            sendMessage.push(`获取渠道活动信息成功：${JSON.stringify(resData)}`);
        })
        .catch(err => {
            resData = err.response.data;
            sendMessage.push(`获取渠道活动信息失败：${JSON.stringify(resData)}`);
        });
    return resData;
}

function checkCustomerInQianggou(activityId, channelId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/checkCustomerInQianggou`;
    const method = 'POST';
    const data = {activityId, channelId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    let resData;
    $axios.post(url, data, {headers})
        .then(res => {
            resData = res.data;
            sendMessage.push(`检查用户抢购状态成功：${JSON.stringify(resData)}`);
        })
        .catch(err => {
            resData = err.response.data;
            sendMessage.push(`检查用户抢购状态失败：${JSON.stringify(resData)}`);
        });
    return resData;
}

function autoSubmit(appId, token) {
    let channelId = '';
    let channelName = '';
    if (appId === XLTH_APPID) {
        channelId = '8';
        channelName = '新联惠购';
    }
    if (appId === GLYP_APPID) {
        channelId = '7';
        channelName = '贵旅优品';
    }
    if (appId === KGLG_APPID) {
        channelId = '2';
        channelName = '空港乐购';
    }
    if (appId === HLQG_APPID) {
        channelId = '6';
        channelName = '航旅黔购';
    }
    if (appId === ZHCS_APPID) {
        channelId = '5';
        channelName = '遵行出山';
    }
    if (appId === GYQP_APPID) {
        channelId = '3';
        channelName = '贵盐黔品';
    }
    if (appId === LLSC_APPID) {
        channelId = '1';
        channelName = '乐旅商城';
    }
    if (appId === YLQX_APPID) {
        channelId = '9';
        channelName = '驿路黔寻';
    }

    try {
        const res1 = await getUserInfo(appId, token);
        if (res1.code !== '10000') {
            console.log(`获取用户信息失败：${res1.message}`);
            sendMessage.push(`获取用户信息失败：${res1.message}`);
            return;
        }

        const realName = res1.data.realName;
        const phone = res1.data.phone;
        console.log(`当前用户[${phone}]`);
        sendMessage.push(`当前用户[${phone}]`);

        const res2 = await getChannelActivity(channelId, token);
        if (res2.code !== '10000') {
            console.log(`获取渠道活动信息失败：${res2.message}`);
            sendMessage.push(`获取渠道活动信息失败：${res2.message}`);
            return;
        }

        const activityId = res2.data.id;
        const activityName = res2.data.name;
        console.log(`活动名称[${activityName}]`);
        sendMessage.push(`活动名称[${activityName}]`);

        const res3 = await checkCustomerInQianggou(activityId, channelId, token);
        if (res3.code !== '10000') {
            console.log(`检查用户抢购状态失败：${res3.message}`);
            sendMessage.push(`检查用户抢购状态失败：${res3.message}`);
            return;
        }

        const data = res3.data;
        let message = '用户已经预约成功';
        if (!data) {
            message = '用户未预约，正在尝试预约';
            const res4 = await appoint(activityId, channelId, token);
            if (res4.code !== '10000') {
                console.log(`预约失败：${res4.message}`);
                sendMessage.push(`预约失败：${res4.message}`);
                return;
            }
        }
        console.log(`预约结果[${message}]`);
        sendMessage.push(`预约结果[${message}]`);
    } catch (error) {
        console.log(`运行异常：${error}`);
        sendMessage.push(`运行异常：${error}`);
    }
}

async function appoint(activityId, channelId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/appoint`;
    const method = 'POST';
    const data = { activityId, channelId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    let resData;
    await $axios.post(url, data, { headers })
        .then(res => {
            resData = res.data;
            sendMessage.push(`预约成功：${JSON.stringify(resData)}`);
        })
        .catch(err => {
            resData = err.response.data;
            sendMessage.push(`预约失败：${JSON.stringify(resData)}`);
        });
    return resData;
}

(async () => {
    const token = '===YOUR_TOKEN_HERE===';
    const XLTH_COOKIE_ARR = 'XLTH_COOKIE'.split('\n');
    for (let item of XLTH_COOKIE_ARR) {
        await autoSubmit(XLTH_APPID, item);
        await delay(1000);
    }
    console.log(sendMessage.join('\n'));
    $done();
})();

function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function buildHeader(method, url, body) {
    const date = new Date().toUTCString();
    const signature = calculateSignature(method, url, AK, SK, date);
    const digest = calculateDigest(body, SK);
    const headers = {
        'Content-Type': 'application/json',
        'X-HMAC-SIGNATURE': signature,
        'X-HMAC-ACCESS-KEY': AK,
        'X-HMAC-ALGORITHM': 'hmac-sha256',
        'X-HMAC-DIGEST': digest,
        'X-HMAC-Date': date,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945'
    };
    return headers;
}

function calculateDigest(body, sk) {
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(body);
    const signature = hmac.digest('base64');
    return signature;
}

function calculateSignature(method, url, ak, sk, date) {
    const strToSign = `${method.toUpperCase()}\n${url}\n\n${ak}\n${date}\n`;
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(strToSign);
    const signature = hmac.digest('base64');
    return signature;
}

   