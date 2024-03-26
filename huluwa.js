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

// 平台AppID定义
const XLTH_APPID = 'wxded2e7e6d60ac09d'; // 新联惠购
const GLYP_APPID = 'wx61549642d715f361'; // 贵旅优品
const KGLG_APPID = 'wx613ba8ea6a002aa8'; // 空港乐购
const HLQG_APPID = 'wx936aa5357931e226'; // 航旅黔购
const ZHCS_APPID = 'wx624149b74233c99a'; // 遵行出山
const GYQP_APPID = 'wx5508e31ffe9366b8'; // 贵盐黔品
const LLSC_APPID = 'wx821fb4d8604ed4d6'; // 乐旅商城
const YLQX_APPID = 'wxee0ce83ab4b26f9c'; // 驿路黔寻
const MAOTAI_APPID = 'wxmaotaiappid';    // 茅台

const HOST = 'https://gw.huiqunchina.com'; // 主机地址
const AK = '00670fb03584fbf44dd6b136e534f495'; // 访问密钥
const SK = '0d65f24dbe2bc1ede3c3ceeb96ef71bb'; // 秘密密钥

let sendMessage = []; // 存储发送消息的数组

/**
 * 延时函数
 * @param {number} time 延时的时间（毫秒）
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 计算消息摘要
 * @param {string} body 请求体
 * @param {string} sk 秘密密钥
 * @returns {string} 摘要结果
 */
function calculateDigest(body, sk) {
    let hash = '';
    for (let i = 0; i < body.length; i++) {
        const c = body.charCodeAt(i);
        const byte = c & 0xff;
        hash += String.fromCharCode(byte);
    }
    const hmac = $text.base64Encode($text.HMACSHA256(hash, sk));
    return hmac;
}

/**
 * 计算签名
 * @param {string} method HTTP方法
 * @param {string} url 请求URL
 * @param {string} ak 访问密钥
 * @param {string} sk 秘密密钥
 * @param {string} date 日期
 * @returns {string} 签名结果
 */
function calculateSignature(method, url, ak, sk, date) {
    const strToSign = `${method.toUpperCase()}\n${url}\n\n${ak}\n${date}\n`;
    const hmac = $text.base64Encode($text.HMACSHA256(strToSign, sk));
    return hmac;
}

/**
 * 构建HTTP请求头
 * @param {string} method HTTP方法
 * @param {string} url 请求URL
 * @param {string} body 请求体
 * @returns {Object} 请求头
 */
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

/**
 * 获取token
 * @param {string} appId 平台AppID
 * @param {string} cookie Cookie
 * @returns {Promise<string>} token
 */
async function getToken(appId, cookie) {
    const url = `${HOST}/front-manager/api/get/token`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['Cookie'] = cookie;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body).token;
    } catch (err) {
        return err;
    }
}

/**
 * 获取用户信息
 * @param {string} appId 平台AppID
 * @param {string} token token
 * @returns {Promise<Object>} 用户信息
 */
async function getUserInfo(appId, token) {
    const url = `${HOST}/front-manager/api/customer/queryById/token`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 获取渠道活动信息
 * @param {string} id 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 渠道活动信息
 */
async function getChannelActivity(id, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/channelActivity`;
    const method = 'post';
    const data = { id };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 获取渠道信息ID
 * @param {string} appId 平台AppID
 * @param {string} token token
 * @returns {Promise<Object>} 渠道信息ID
 */
async function getChannelInfoId(appId, token) {
    const url = `${HOST}/front-manager/api/get/getChannelInfoId`;
    const method




 * @param {string} appId 平台AppID
 * @param {string} token token
 * @returns {Promise<Object>} 渠道信息ID
 */
async function getChannelInfoId(appId, token) {
    const url = `${HOST}/front-manager/api/get/getChannelInfoId`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 预约
 * @param {string} activityId 活动ID
 * @param {string} channelId 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 预约结果
 */
async function appoint(activityId, channelId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/appoint`;
    const method = 'post';
    const data = { activityId, channelId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 检查用户是否已在抢购中
 * @param {string} activityId 活动ID
 * @param {string} channelId 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 检查结果
 */
async function checkCustomerInQianggou(activityId, channelId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/checkCustomerInQianggou`;
    const method = 'post';
    const data = { activityId, channelId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 自动提交
 * @param {string} appId 平台AppID
 * @param {string} token token
 * @param {string} cookie Cookie
 */
async function autoSubmit(appId, token, cookie) {
    const maotai_activity_id = 'your_maotai_activity_id_here'; // 请替换为实际的茅台活动ID
    const maotai_channel_id = 'your_maotai_channel_id_here'; // 请替换为实际的茅台渠道ID

    let channelId = '';
    let channelName = '';

    // 根据AppID设置渠道ID和渠道名称
    switch (appId) {
        case XLTH_APPID:
            channelId = '8';
            channelName = '新联惠购';
            break;
        case GLYP_APPID:
            channelId = '7';
            channelName = '贵旅优品';
            break;
        case KGLG_APPID:
            channelId = '2';
            channelName = '空港乐购';
            break;
        case HLQG_APPID:
            channelId = '6';
            channelName = '航旅黔购';
            break;
        case ZHCS_APPID:
            channelId = '5';
            channelName = '遵行出山';
            break;
        case GYQP_APPID:
            channelId = '3';
            channelName = '贵盐黔品';
            break;
        case LLSC_APPID:
            channelId = '1';
            channelName = '乐旅商城';
            break;
        case YLQX_APPID:
            channelId = '9';
            channelName = '驿路黔寻';
            break;
        case MAOTAI_APPID:
            channelId = maotai_channel_id;
            channelName = '茅台';
            break;
        default:
            break;
    }

    try {
        // 获取用户信息
        const res1 = await getUserInfo(appId, token);
        if (res1.code !== '10000') {
            console.log(`获取用户信息失败: ${res1.message}`);
            sendMessage.push(`获取用户信息失败: ${res1.message}`);
            return;
        }
        const realName = res1.data.realName;
        const phone = res1.data.phone;
        console.log(`当前用户[${phone}]`);
        sendMessage.push(`当前用户[${phone}]`);

        // 获取渠道活动信息
        const res2 = await getChannelActivity(channelId, token);
        if (res2.code !== '10000') {
            console.log(`获取渠道活动信息失败: ${res2.message}`);
            sendMessage.push(`获取渠道活动信息失败: ${res2.message}`);
            return;
        }
        const activityId = res2.data.id;
        const activityName = res2.data.name;
        console.log(`活动名称[${activityName}]`);
        sendMessage.push(`活动名称[${activityName}]`);

        // 检查用户是否已在抢购中
        const res3 = await checkCustomerInQianggou(activityId, channelId, token);
        if (res3.code !== '10000') {
            console.log(`检查用户是否已在抢购中失败: ${res3.message}`);
            sendMessage.push(`检查用户是否已在抢购中失败: ${res3.message}`);
            return;
        }
        const data = res3.data;

        let message = '用户已经预约成功';
        if (!data) {
            // 预约
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

/**
 * 主函数
 */
async function main() {
    const XLTH_COOKIE_ARR = $prefs.valueForKey('XLTH_COOKIE') ? $prefs.valueForKey('XLTH_COOKIE').split(SPLIT) : [];
    const GLYP_COOKIE_ARR = $prefs.valueForKey('GLYP_COOKIE') ? $prefs.valueForKey('GLYP_COOKIE').split(SPLIT) : [];
    const KGLG_COOKIE_ARR = $prefs.valueForKey('KGLG_COOKIE') ? $prefs.valueForKey('KGLG_COOKIE').split(SPLIT) : [];
    const HLQG_COOKIE_ARR = $prefs.valueForKey('HLQG_COOKIE') ? $prefs.valueForKey('HLQG_COOKIE').split(SPLIT) : [];
    const ZHCS_COOKIE_ARR = $prefs.valueForKey('ZHCS_COOKIE') ? $prefs.valueForKey('ZHCS_COOKIE').split(SPLIT) : [];
    const GYQP_COOKIE_ARR = $prefs.valueForKey('GYQP_COOKIE') ? $prefs.valueForKey('GYQP_COOKIE').split(SPLIT) : [];
    const LLSC_COOKIE_ARR = $prefs.valueForKey('LLSC_COOKIE') ? $prefs.valueForKey('LLSC_COOKIE').split(SPLIT) : [];
    const YLQX_COOKIE_ARR = $prefs.valueForKey('YLQX_COOKIE') ? $prefs.valueForKey('YLQX_COOKIE').split(SPLIT) : [];
    const MAOTAI_COOKIE_ARR = $prefs.valueForKey('MAOTAI_COOKIE') ? $prefs.valueForKey('MAOTAI_COOKIE').split(SPLIT) : [];

    for (let item of XLTH_COOKIE_ARR) {
        await autoSubmit(XLTH_APPID, await getToken(XLTH_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of GLYP_COOKIE_ARR) {
        await autoSubmit(GLYP_APPID, await getToken(GLYP_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of KGLG_COOKIE_ARR) {
        await autoSubmit(KGLG_APPID, await getToken(KGLG_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of HLQG_COOKIE_ARR) {
        await autoSubmit(HLQG_APPID, await getToken(HLQG_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of ZHCS_COOKIE_ARR) {
        await autoSubmit(ZHCS_APPID, await getToken(ZHCS_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of GYQP_COOKIE_ARR) {
        await autoSubmit(GYQP_APPID, await getToken(GYQP_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of LLSC_COOKIE_ARR) {
        await autoSubmit(LLSC_APPID, await getToken(LLSC_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of YLQX_COOKIE_ARR) {
        await autoSubmit(YLQX_APPID, await getToken(YLQX_APPID, item.trim()), item.trim());
        await delay(1000);
    }
    for (let item of MAOTAI_COOKIE_ARR) {
        await autoSubmit(MAOTAI_APPID, await getToken(MAOTAI_APPID, item.trim()), item.trim());
        await delay(1000);
    }

    console.log('全部任务完成');
    sendMessage.push('全部任务完成');
    $notify('自动预约结果', sendMessage.join('\n'), '');

    return sendMessage.join('\n');
}

main().catch((err) => {
    console.log(`运行出错: ${err}`);
    $notify('自动预约出错', err, '');
});

/**
 * 延时函数
 * @param {number} time 延时的时间（毫秒）
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 获取token
 * @param {string} appId 平台AppID
 * @param {string} cookie Cookie
 * @returns {Promise<string>} token
 */
async function getToken(appId, cookie) {
    const url = `${HOST}/front-manager/api/get/token`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['Cookie'] = cookie;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body).token;
    } catch (err) {
        return err;
    }
}

/**
 * 获取用户信息
 * @param {string} appId 平台AppID
 * @param {string} token token
 * @returns {Promise<Object>} 用户信息
 */
async function getUserInfo(appId, token) {
    const url = `${HOST}/front-manager/api/customer/queryById/token`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 获取渠道活动信息
 * @param {string} id 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 渠道活动信息
 */
async function getChannelActivity(id, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/channelActivity`;
    const method = 'post';
    const data = { id };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 获取渠道信息ID
 * @param {string} appId 平台AppID
 * @param {string} token token
 * @returns {Promise<Object>} 渠道信息ID
 */
async function getChannelInfoId(appId, token) {
    const url = `${HOST}/front-manager/api/get/getChannelInfoId`;
    const method = 'post';
    const data = { appId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 预约
 * @param {string} activityId 活动ID
 * @param {string} channelId 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 预约结果
 */
async function appoint(activityId, channelId, token) {




    const url = `${HOST}/front-manager/api/customer/promotion/appoint`;
    const method = 'post';
    const data = { activityId, channelId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 检查用户是否已在抢购中
 * @param {string} activityId 活动ID
 * @param {string} channelId 渠道ID
 * @param {string} token token
 * @returns {Promise<Object>} 检查结果
 */
async function checkCustomerInQianggou(activityId, channelId, token) {
    const url = `${HOST}/front-manager/api/customer/promotion/checkCustomerInQianggou`;
    const method = 'post';
    const data = { activityId, channelId };
    const headers = buildHeader(method, url, JSON.stringify(data));
    headers['X-access-token'] = token;

    try {
        const res = await $httpClient.post(url, { body: JSON.stringify(data), headers: headers });
        return JSON.parse(res.body);
    } catch (err) {
        return err;
    }
}

/**
 * 构建HTTP请求头
 * @param {string} method HTTP方法
 * @param {string} url 请求URL
 * @param {string} body 请求体
 * @returns {Object} 请求头
 */
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

/**
 * 计算消息摘要
 * @param {string} body 请求体
 * @param {string} sk 秘密密钥
 * @returns {string} 摘要结果
 */
function calculateDigest(body, sk) {
    let hash = '';
    for (let i = 0; i < body.length; i++) {
        const c = body.charCodeAt(i);
        const byte = c & 0xff;
        hash += String.fromCharCode(byte);
    }
    const hmac = $text.base64Encode($text.HMACSHA256(hash, sk));
    return hmac;
}

/**
 * 计算签名
 * @param {string} method HTTP方法
 * @param {string} url 请求URL
 * @param {string} ak 访问密钥
 * @param {string} sk 秘密密钥
 * @param {string} date 日期
 * @returns {string} 签名结果
 */
function calculateSignature(method, url, ak, sk, date) {
    const strToSign = `${method.toUpperCase()}\n${url}\n\n${ak}\n${date}\n`;
    const hmac = $text.base64Encode($text.HMACSHA256(strToSign, sk));
    return hmac;
}

const AK = '00670fb03584fbf44dd6b136e534f495'; // 访问密钥
const SK = '0d65f24dbe2bc1ede3c3ceeb96ef71bb'; // 秘密密钥
const HOST = 'https://gw.huiqunchina.com'; // 主机地址
const SPLIT = "\n"; // 分割符
let sendMessage = []; // 存储发送消息的数组

/**
 * 主函数
 */
async function main() {
    // 省略上文的代码...

    console.log('全部任务完成');
    sendMessage.push('全部任务完成');
    $notify('自动预约结果', sendMessage.join('\n'), '');

    return sendMessage.join('\n');
}

main().catch((err) => {
    console.log(`运行出错: ${err}`);
    $notify('自动预约出错', err, '');
});

/**
 * 延时函数
 * @param {number} time 延时的时间（毫秒）
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}