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

const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const SPLIT = "\n"; // 分割符（可自定义）

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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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

function buildHeader(method, url, body) {
    const date = moment().utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
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

async function getUserInfo(appId, token) {
    const url = '/front-manager/api/customer/queryById/token';
    const method = 'post';
    const data = {appId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await axios.post(HOST + url, data, { headers: headers });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getChannelActivity(id, token) {
    const url = '/front-manager/api/customer/promotion/channelActivity';
    const method = 'post';
    const data = {id};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await axios.post(HOST + url, data, { headers: headers });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getChannelInfoId(appId, token) {
    const url = '/front-manager/api/get/getChannelInfoId';
    const method = 'post';
    const data = {appId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await axios.post(HOST + url, data, { headers: headers });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function appoint(activityId, channelId, token) {
    const url = '/front-manager/api/customer/promotion/appoint';
    const method = 'post';
    const data = {activityId, channelId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await axios.post(HOST + url, data, { headers: headers });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function checkCustomerInQianggou(activityId, channelId, token) {
    const url = '/front-manager/api/customer/promotion/checkCustomerInQianggou';
    const method = 'post';
    const data = {activityId, channelId};
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await axios.post(HOST + url, data, { headers: headers });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function autoSubmit(appId, token) {
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
        if (res1.code != '10000') {
            console.log(res1.message);
            sendMessage.push(res1.message);
            return;
        }
        const realName = res1.data.realName;
        const phone = res1.data.phone;
        console.log(`当前用户[${phone}]`);
        sendMessage.push(`当前用户[${phone}]`);

        const res2 = await getChannelActivity(channelId, token);
        if (res2.code != '10000') {
            console.log(res2.message);
            sendMessage.push(res2.message);
            return;
        }
        const activityId = res2.data.id;
        const activityName = res2.data.name;
        console.log(`活动名称[${activityName}]`);
        sendMessage.push(`活动名称[${activityName}]`);

        const res3 = await checkCustomerInQianggou(activityId, channelId, token);
        if (res3.code != '10000') {
            console.log(res3.message);
            sendMessage.push(res3.message);
            return;
        }
        const data = res3.data;

        let message = '用户已经预约成功';
        if (data == false) {
            const res4 = await appoint(activityId, channelId, token);
            message = res4.message;
        }
        console.log(`预约结果[${message}]`);
        sendMessage.push(`预约结果[${message}]`);
    } catch (err) {
        console.log(`运行异常[${err.message}]`);
        sendMessage.push(`运行异常[${err.message}]`);
    }
}

async function main() {
    const XLTH_COOKIE_ARR = $environment.XLTH_COOKIE ? $environment.XLTH_COOKIE.split(SPLIT) : [];
    const GLYP_COOKIE_ARR = $environment.GLYP_COOKIE ? $environment.GLYP_COOKIE.split(SPLIT) : [];
    const KGLG_COOKIE_ARR = $environment.KGLG_COOKIE ? $environment.KGLG_COOKIE.split(SPLIT) : [];
    const HLQG_COOKIE_ARR = $environment.HLQG_COOKIE ? $environment.HLQG_COOKIE.split(SPLIT) : [];
    const ZHCS_COOKIE_ARR = $environment.ZHCS_COOKIE ? $environment.ZHCS_COOKIE.split(SPLIT) : [];
    const GYQP_COOKIE_ARR = $environment.GYQP_COOKIE ? $environment.GYQP_COOKIE.split(SPLIT) : [];
    const LLSC_COOKIE_ARR = $environment.LLSC_COOKIE ? $environment.LLSC_COOKIE.split(SPLIT) : [];
    const YLQX_COOKIE_ARR = $environment.YLQX_COOKIE ? $environment.YLQX_COOKIE.split(SPLIT) : [];

    for (let item of XLTH_COOKIE_ARR) {
        await autoSubmit(XLTH_APPID, item.trim());
        await delay(1000);
    }
    for (let item of GLYP_COOKIE_ARR) {
        await autoSubmit(GLYP_APPID, item.trim());
        await delay(1000);
    }
    for (let item of KGLG_COOKIE_ARR) {
        await autoSubmit(KGLG_APPID, item.trim());
        await delay(1000);
    }
    for (let item of HLQG_COOKIE_ARR) {
        await autoSubmit(HLQG_APPID, item.trim());
        await delay(1000);
    }
    for (let item of ZHCS_COOKIE_ARR) {
        await autoSubmit(ZHCS_APPID, item.trim());
        await delay(1000);
    }
    for (let item of GYQP_COOKIE_ARR) {
        await autoSubmit(GYQP_APPID, item.trim());
        await delay(1000);
    }
    for (let item of LLSC_COOKIE_ARR) {
        await autoSubmit(LLSC_APPID, item.trim());
        await delay(1000);
    }
    for (let item of YLQX_COOKIE_ARR) {
        await autoSubmit(YLQX_APPID, item.trim());
        await delay(1000);
    }

    $done(sendMessage.join('\n'));
}

main().catch((err) => {
    console.log(`执行异常[${err.message}]`);
    $done();
});

 