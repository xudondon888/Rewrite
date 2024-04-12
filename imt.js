/*

更新时间: 2024/03/11
使用说明: 

# > 此版本茅运不做处理

# > BoxJS相关配置
请见 https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/boxjs.json
# > 青龙参数配置
export YQC_KEY='' # 会员卡密, 不对外开放
# > demo详细见代码
export IMAOTAI_PARAMS='' # 抓包参数, 格式:'[{"headers":{},"userId":""},{"headers":{},"userId":""},{"headers":{},"userId":""},...]'
export IMAOTAI_SPLIT='' # 分隔符, 默认: &
export IMAOTAI_IS_LARGE='' # 投放量最大, 默认false代表使用最近店铺进行预约,多账号使用&分割
# > 如果只填一个后面多账号自动使用第一个参数, 下方所有参数亦是如此
export IMAOTAI_IS_TRAVEL='' # 茅运旅行, 默认false说明不开启茅运, 用户小茅运不足100的请关闭
export IMAOTAI_PROVINCE='' # 预约省份
export IMAOTAI_CITY='' # 预约城市
export IMAOTAI_ITEMS='' # 预约项选择, 多个用,分割, 比如: 10941,10942&10941,10942&...
##################################
# > 这里注意, 详细地址和经纬度二选一, 如果你不知道经纬度, 只填写详细地址即可
# > 经纬度优先级高于详细地址, 如果填写了经纬度, 详细地址将不会生效
export IMAOTAI_ADDR='' # 详细地址
export IMAOTAI_LATLNG='' # 经纬度
##################################

hostname = app.moutai519.com.cn

https://app.moutai519.com.cn/xhr/front/user/info url script-response-body https://gist.githubusercontent.com/Yuheng0101/ac320a985dae31fe59666c63283477a4/raw/imaotai.vip.task.js

*/
const $ = new Env('i茅台')
const notify = $.isNode() ? require('./sendNotify') : ''
const AMAP_KEY = '5bad60ec5538c75612b564a4fbd0694b' // TODO: 使用持久化配置
// 对象大写转小写
const ObjectKeys2LowerCase = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]))
// 数据类型判断
// const getVarType = (t) => (Object.prototype.toString.call(t).match(/\[object (.*?)\]/) || [])[1].toLowerCase()
const getVarType = (r) => (Array.isArray(r) ? 'array' : (Object.prototype.toString.call(r).match(/\[object (.*?)\]/) || [])[1].toLowerCase())
// 自动拼接数组
const adjustArray = (arr, t = MAOTAI_PARAMS) => (arr.length < t.length ? Array(t.length).fill(arr[0]) : arr)
const yqcKey = ($.isNode() ? process.env.YQC_KEY : $.getdata('yqc_vip_key')) || ''
if (!yqcKey) $.msg($.name, `请填写会员卡密, 不对外开放! `), $.done()
$.isRequest = () => typeof $request !== 'undefined'
$.isTrue = (val) => val === 'true' || val === true
// prettier-ignore
$.qs = {stringify(e,n,r,t){var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};return n=n||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(t){var a=encodeURIComponent(o(t))+r;return Array.isArray(e[t])?e[t].map(function(e){return a+encodeURIComponent(o(e))}).join(n):a+encodeURIComponent(o(e[t]))}).filter(Boolean).join(n):t?encodeURIComponent(o(t))+r+encodeURIComponent(o(e)):""},parse(e,n,r,t){function o(e,n){return Object.prototype.hasOwnProperty.call(e,n)}n=n||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(n);var u=1e3;t&&"number"==typeof t.maxKeys&&(u=t.maxKeys);var i=e.length;u>0&&i>u&&(i=u);for(var c=0;c<i;++c){var p,f,y,l,m=e[c].replace(s,"%20"),d=m.indexOf(r);d>=0?(p=m.substr(0,d),f=m.substr(d+1)):(p=m,f=""),y=decodeURIComponent(p),l=decodeURIComponent(f),o(a,y)?Array.isArray(a[y])?a[y].push(l):a[y]=[a[y],l]:a[y]=l}return a}}
// -------------------------------------
// 配置项
const RESERVATION_MAP = {
    10941: '500ml贵州茅台酒（甲辰龙年）', // 2499
    10942: '375ml×2贵州茅台酒（甲辰龙年）', // 3599
    10056: '53%vol 500ml 茅台1935', // 1188
    2478: '贵州茅台酒（珍品）' // 4599
}
// -------------------------------------
const SPLIT = ($.isNode() ? process.env.IMAOTAI_SPLIT : $.getdata('imaotai_split')) || '&'
// 抓包相关参数 ➟ NodeJS环境自行抓包填写, iOS相关工具请开启对应重写按 [打开i茅台APP ➟ 个人中心] 获取, 提示获取成功即可继续使用该脚本
// var MAOTAI_PARAMS = $.toObj($.isNode() ? process.env.IMAOTAI_PARAMS : $.getdata('imaotai_params')) || []
// // 兼容老数据
// getVarType(MAOTAI_PARAMS) === 'object' && (MAOTAI_PARAMS = [MAOTAI_PARAMS])
var MAOTAI_PARAMS = [$.toObj($.isNode() ? process.env.IMAOTAI_PARAMS : $.getdata('imaotai_params')) || {}].flat()
// 店铺方式(投放量最大/最近店铺)
const IS_LARGE_NUM = adjustArray(checkEnv('IMAOTAI_IS_LARGE', 'imaotai__config__islarge') || ['false'])
// 是否开启茅运旅行 ➟ 茅运不足100, 请先关闭对应选项
const IS_TRAVEL = adjustArray(checkEnv('IMAOTAI_IS_TRAVEL', 'imaotai__config__istravel') || ['false'])
// 本月已完成的用户ID ➟ 用于茅运旅行
const FINISH_UID_LIST = [...new Set($.toObj($.getdata(`maotai_travel_${$.time('yyyy/MM')}_finish_uid`) || '[]'))]
// 预约省份 ➟ 如: 贵州省
const PROVINCE = adjustArray(checkEnv('IMAOTAI_PROVINCE', 'imaotai__config__province'))
// 预约城市 ➟ 如: 贵阳市
const CITY = adjustArray(checkEnv('IMAOTAI_CITY', 'imaotai__config__city'))
// 预约项选择 ➟ 如: 10941,10942
const ITEMS = adjustArray(checkEnv('IMAOTAI_ITEMS', 'imaotai__config__items') || ['10941,10942'])
// 详细地址 ➟ 如: 贵阳市南明区花果园
const ADDR = adjustArray(checkEnv('IMAOTAI_ADDR', 'imaotai__config__address') || [])
// 经纬度(请注意, 经纬度优先级高于详细地址, 如果你不知道经纬度, 只填写详细地址即可) ➟ 如: 106.713478,26.573743
const LATLNG = adjustArray(checkEnv('IMAOTAI_LATLNG', 'imaotai__config__location') || [])
// -------------------------------------
// prettier-ignore
const A=t=>new Promise(((e,a)=>{const c={url:"https://yqc-premium.me/api/imaotai/encrypt",type:"post",dataType:"json",headers:{"x-auth-uid":yqcKey},body:{yqc:t}};fetchData(c).then((t=>e(t))).catch((t=>a(t)))}));
// prettier-ignore
const B=o=>($.log(`开始获取经纬度: ${ADDR[o]}`),new Promise(((e,t)=>{fetchData(`https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&output=json&address=${encodeURIComponent(ADDR[o])}`).then((t=>{if("1"===t.status){const{geocodes:[{location:a}]}=t;$.log(`获取经纬度成功: ${a}`),LATLNG[o]=a,$.setdata(LATLNG.join(SPLIT),"imaotai__config__location"),e()}else $.log(`获取经纬度失败 ${t.info}`),$.msg($.name,"⚠️获取经纬度失败","请检查详细地址是否正确!")})).catch(t)})));
// 获取参数
const C = () => {
    if ('get' !== $request.method.toLowerCase()) return
    if ('0' === $.qs.parse($request.url.split('?')[1])?.enable) return
    const {
        data: { userName: e, mobile: t, userId: s, verifyStatus: a }
    } = $.toObj($response?.body || '{}')
    if (!s) return $.msg($.name, '⚠️获取抓包参数失败', '未获取到userId, 请重新抓包获取!')
    if (0 === a) return $.msg($.name, '⚠️请先进行实名认证', `用户(${t})已跳过`)
    const d = ObjectKeys2LowerCase($request.headers),
        { 'mt-token': r, 'mt-device-id': n, 'mt-r': o, 'bs-dvid': m, 'user-agent': i, 'mt-r': y } = d
    if (!(r && n && o && m && i && y)) return $.msg($.name, '⚠️获取抓包参数失败', '请重新抓包获取!')
    var u = $.toObj($.getdata('imaotai_params') || '[]')
    let b = `用户标识: ${s}`
    if (('object' === getVarType(u) && (u = [u]), Object.keys(u).length)) {
        const e = u.findIndex((e) => e.userId === s)
        if (-1 === e) $.log('判断新增'), u.push({ headers: d, userId: s })
        else {
            $.log('更新')
            const { 'mt-token': t, 'mt-device-id': s, 'mt-r': a, 'bs-dvid': o, 'user-agent': l } = u[e].headers
            'undefined' == typeof atob && CompleteBase64()
            const { exp: p, iat: f } = $.toObj(atob(t.split('.')[1]))
            ;(b += t === r && s === n && a === y && o === m && l === i ? '\n更新失败: 缓存一致, 无需更新' : `\n更新成功: ${$.time('yyyy-MM-dd HH:mm:ss')}`),
                (b += `\n登录时间: ${$.time('yyyy-MM-dd', 1e3 * f)}`),
                (b += `\n过期时间: ${$.time('yyyy-MM-dd', 1e3 * p)}`),
                (u[e].headers = d)
        }
    } else {
        $.log('直接新增'), (u = [{ headers: d, userId: s }]), 'undefined' == typeof atob && CompleteBase64()
        const { exp: e, iat: t } = $.toObj(atob(d['mt-token'].split('.')[1]))
        ;(b += `\n新增成功: ${$.time('yyyy-MM-dd HH:mm:ss')}`), (b += `\n登录时间: ${$.time('yyyy-MM-dd', 1e3 * t)}`), (b += `\n过期时间: ${$.time('yyyy-MM-dd', 1e3 * e)}`)
    }
    $.setdata($.toStr(u), 'imaotai_params'), $.msg(`【${$.name}】${e}(${t})`, '🎉获取抓包参数成功', b)
}
// prettier-ignore
const D=(t,a,h,M)=>{var s=a*Math.PI/180,n=M*Math.PI/180,o=s-n,e=t*Math.PI/180-h*Math.PI/180,r=2*Math.asin(Math.sqrt(Math.pow(Math.sin(o/2),2)+Math.cos(s)*Math.cos(n)*Math.pow(Math.sin(e/2),2)));return r*=6378.137,r=Math.round(1e4*r)/1e4};
// prettier-ignore
const E=async()=>{const isEmpty=A=>0===A.length;return isEmpty(MAOTAI_PARAMS)?(await SendNotify($.name,"⚠️请先获取抓包参数","请先获取抓包参数!"),!1):isEmpty(PROVINCE)||isEmpty(CITY)||isEmpty(ITEMS)||isEmpty(ADDR)&&isEmpty(LATLNG)?(await SendNotify($.name,"⚠️请先填写配置项","请检查配置项是否正确!"),!1):isEmpty(ADDR)||ADDR.length===MAOTAI_PARAMS.length?!(!isEmpty(LATLNG)&&LATLNG.length!==MAOTAI_PARAMS.length&&(await SendNotify($.name,"⚠️经纬度填写错误","经纬度填写错误, 请检查配置项是否正确!"),1)):(await SendNotify($.name,"⚠️详细地址填写错误","详细地址填写错误, 请检查配置项是否正确!"),!1)};
// -------------------------------------
// 输出内容
let sendMessage = []
class Maotai {
    constructor(headers = {}, userId = '') {
        // prettier-ignore
        const defaultHeaders={"mt-info":"028e7f96f6369cafe1d105579c5b9377","accept-encoding":"gzip, deflate, br",host:"app.moutai519.com.cn","mt-user-tag":"0","mt-token":"",connection:"keep-alive","mt-device-id":"","accept-language":"zh-Hans-CN;q=1","mt-team-id":"","content-type":"application/json","mt-request-id":`${Date.now()}${Math.floor(9e4*Math.random()+1e4)}`,"mt-app-version":$.version,"user-agent":"iOS;14.3;Apple;iPhone 12","mt-k":Date.now(),"mt-r":"clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdg==","mt-bundle-id":"com.moutai.mall","mt-network-type":"WIFI",accept:"*/*","bs-dvid":"","mt-lat":"","mt-lng":""};
        this.headers = Object.assign(
            defaultHeaders,
            ObjectKeys2LowerCase({
                'mt-token': headers['mt-token'],
                'mt-device-id': headers['mt-device-id'],
                'mt-r': headers['mt-r'],
                'bs-dvid': headers['bs-dvid'],
                'user-agent': headers['user-agent']
            })
        )
        if ($.isSurge()) delete this.headers['host']
        this.userId = userId
    }
    // 今天是否预约
    isTodayApply() {
        const startTime = new Date().setHours(9, 0, 0, 0)
        const endTime = new Date().setHours(10, 0, 0, 0)
        const curTime = Date.now()
        if (curTime >= startTime && curTime < endTime) {
            $.log(`当前时间: ${$.time('HH:mm:ss')}, 可以预约`)
            return true
        } else {
            $.log(`当前时间: ${$.time('HH:mm:ss')}, 不在预约时间范围[9:00-10:00)内, 已跳过`)
            return false
        }
    }
    // 获取版本号
    getVersion() {
        return new Promise((r, j) => {
            fetchData(`https://itunes.apple.com/cn/lookup?id=1600482450`)
                .then(({ results: [{ version: t }] }) => {
                    ;($.version = t), (this['headers']['mt-app-version'] = t), r()
                })
                .catch((e) => j('获取版本号失败 原因: ' + e))
        })
    }
    // 获取今日sessionId
    getSessionId() {
        const timestampByHour = new Date().setHours(0, 0, 0, 0)
        return new Promise((r, j) => {
            fetchData(`https://static.moutai519.com.cn/mt-backend/xhr/front/mall/index/session/get/${timestampByHour}`)
                .then((t) => {
                    const success = t.code === 2000
                    if (success) {
                        const {
                            data: { sessionId }
                        } = t
                        $.sessionId = sessionId
                        r()
                    } else {
                        j('获取今日sessionId失败' + (t.message || ''))
                    }
                })
                .catch((e) => j('获取今日sessionId失败' + ($.toObj(e.data)?.message || '')))
        })
    }
    // 获取用户信息 ➟ 检查参数是否过期
    getUserInfo() {
        return new Promise((r, j) => {
            fetchData({
                url: `https://app.moutai519.com.cn/xhr/front/user/info?enable=0`,
                headers: this.headers
            })
                .then((t) => {
                    const success = t.code === 2000
                    if (success) {
                        const {
                            data: { userName, mobile, userId, verifyStatus }
                        } = t
                        if (verifyStatus === 0) {
                            j(`用户(${mobile})请先进行实名认证!`)
                        } else {
                            this.userId = userId
                            this.userName = userName
                            this.mobile = mobile
                            r()
                        }
                    } else {
                        if (/401/.test(t.code)) {
                            j(`获取用户信息失败, 请重新登录获取最新抓包参数`)
                        } else {
                            j('获取用户信息失败' + (t.message || ''))
                        }
                    }
                })
                .catch((e) => r(`获取用户信息失败 原因: ${e}`))
        })
    }
    // 获取门店地图链接
    getStoreMapLink() {
        return new Promise((r, j) => {
            fetchData(`https://static.moutai519.com.cn/mt-backend/xhr/front/mall/resource/get`)
                .then((t) => {
                    const success = t.code === 2000
                    if (success) {
                        const {
                            data: {
                                mtshops_pc: { url: mapUrl }
                            }
                        } = t
                        r(mapUrl)
                    } else {
                        j('获取门店地图链接失败' + (t.message || ''))
                    }
                })
                .catch((e) => j('获取门店地图链接失败 原因: ' + e))
        })
    }
    // 获取门店位置信息
    getStoreMap(index) {
        return new Promise((r, j) => {
            this.getStoreMapLink()
                .then((url) => {
                    fetchData(url)
                        .then((dataJson) => {
                            this.dictionary = Object.values(dataJson).filter((item) => item.provinceName === PROVINCE[index] && item.cityName === CITY[index])
                            r()
                        })
                        .catch((e) => j('获取门店地图失败 原因: ' + e))
                })
                .catch(j)
        })
    }
    // 获取当前预约项的所有投放门店
    getAllStore(code, index) {
        const timestampByHour = new Date().setHours(0, 0, 0, 0)
        return new Promise((r, j) => {
            fetchData(
                `https://static.moutai519.com.cn/mt-backend/xhr/front/mall/shop/list/slim/v3/${$.sessionId}/${encodeURIComponent(PROVINCE[index])}/${code}/${timestampByHour}`
            )
                .then((t) => {
                    const success = t.code === 2000
                    if (success) {
                        const {
                            data: { shops }
                        } = t
                        this.shops = shops
                        r()
                    } else {
                        j('获取所有门店失败' + (t.message || ''))
                    }
                })
                .catch((e) => j('获取所有门店失败 原因: ' + e))
        })
    }
    // 过滤出包含所选项的列表
    filterItemsList(list, key) {
        return list.reduce((acc, item) => {
            var _item = item.items.find((i) => i.itemId === key)
            if (_item) {
                acc.push({
                    shopId: item.shopId,
                    items: _item
                })
            }
            return acc
        }, [])
    }
    // 获取最近门店
    getNearbyStore(code, index) {
        // 根据经纬度来计算最近的门店
        const [lng, lat] = LATLNG[index].split(',')
        const includedReserveShops = this.filterItemsList(this.shops, code)
        // 查找最近店铺
        const nearbyShop = this.dictionary
            .map((item) => {
                const { lng: longitude, lat: latitude } = item
                const distance = D(lng, lat, longitude, latitude)
                return { ...item, distance }
            })
            // 过滤包含预约项的店铺
            .filter((item) => includedReserveShops.find((_item) => _item.shopId === item.shopId))
            // 根据distance排序
            .sort((a, b) => a.distance - b.distance)[0]
        if (!nearbyShop) {
            $.msg($.name, '⚠️获取最近门店失败', '未获取到最近门店, 请检查配置是否正确!')
            throw new Error('未获取到最近门店')
        }
        this.reserveOpts = {
            Code: code,
            Store_Info: nearbyShop,
            Put_In_Info: includedReserveShops.find((item) => item.shopId === nearbyShop.shopId)
        }
    }
    // 获取投放量最大的门店
    getLargeNumStore(code) {
        const includedReserveShops = this.filterItemsList(this.shops, code).filter((item) => this.dictionary.find((i) => i.shopId === item.shopId))
        if (!includedReserveShops.length) throw new Error('未获取到投放量最大门店')
        const largeNumShop = includedReserveShops.reduce((acc, item) => (acc.items.inventory < item.items.inventory ? item : acc))
        this.reserveOpts = {
            Code: code,
            Store_Info: this.dictionary.find((item) => item.shopId === largeNumShop.shopId),
            Put_In_Info: largeNumShop
        }
    }
    // 开始预约
    doReserve() {
        return new Promise((r) => {
            let resultMsg = []
            const { Code, Store_Info, Put_In_Info } = this.reserveOpts
            resultMsg.push(`预约名称: ${RESERVATION_MAP[Code]}`)
            resultMsg.push(`预约门店: ${Store_Info.name}`)
            const params = {
                itemInfoList: [{ count: 1, itemId: Code }],
                sessionId: parseInt($.sessionId),
                userId: this.userId,
                shopId: Store_Info.shopId
            }
            A(params)
                .then((actParam) => {
                    const opts = {
                        url: `https://app.moutai519.com.cn/xhr/front/mall/reservation/add`,
                        // type: 'post',
                        headers: this.headers,
                        body: JSON.stringify({
                            actParam,
                            ...params
                        })
                    }
                    fetchData(opts)
                        .then((t) => {
                            const success = t.code === 2000
                            if (success) {
                                resultMsg.push(`预约结果: ${t.data.successDesc}`)
                            } else {
                                resultMsg.push(`预约结果: ${t.message}`)
                            }
                        })
                        .catch((error) => {
                            resultMsg.push(`预约结果: 失败 ${error}`)
                        })
                        .finally(() => {
                            sendMessage.push(...resultMsg)
                            r()
                        })
                })
                .catch((e) => r(`加密失败 原因: ${e}`))
        })
    }
    // 领取连续申购奖励
    receiveXmy() {
        return new Promise((r) => {
            const opts = {
                url: `https://h5.moutai519.com.cn/game/xmyApplyingReward/receive7DaysContinuouslyApplyingReward`,
                type: 'post',
                headers: this.headers,
                body: ''
            }
            fetchData(opts)
                .then((t) => {
                    const success = t.code === 2000
                    if (success) {
                        const {
                            data: { rewardAmount }
                        } = t
                        if (rewardAmount > 0) {
                            $.log(`可领取连续小茅运数量为${rewardAmount}`)
                            this.rewardAmount = rewardAmount
                        } else {
                            $.log(`可领取连续小茅运数量为0, 不进行领取`)
                        }
                    } else {
                        $.log(`领取连续申购奖励失败 原因: ${t.message}`)
                    }
                })
                .catch((e) => $.log(`领取连续申购奖励失败 原因: ${e}`))
                .finally(() => r())
        })
    }
}
!(async () => {
    if ($.isRequest()) return C()
    if (!(await E())) return
    for (let j = 0; j < MAOTAI_PARAMS.length; j++) {
        try {
            const { headers: curHders, userId: curId } = MAOTAI_PARAMS[j]
            const ii = new Maotai(curHders, curId)
            $.version || (await ii.getVersion())
            $.log(`获取到最新版本号: ${$.version}`)
            await ii.getUserInfo()
            $.log(`获取到用户信息 用户名: ${ii.userName}(${ii.mobile})`)
            sendMessage.push(`用户信息: ${ii.userName}(${ii.mobile})`)
            // 预约相关
            if (ii.isTodayApply()) {
                $.sessionId || (await ii.getSessionId())
                $.log(`获取到今日sessionId: ${$.sessionId}`)
                await ii.getStoreMap(j)
                const isLargeNum = $.isTrue(IS_LARGE_NUM) == 'array' ? IS_LARGE_NUM[j] : IS_LARGE_NUM
                !LATLNG[j] ? await B(j) : $.log(`获取到经纬度: ${LATLNG[j]}`)
                $.log(`当前选择${isLargeNum ? '投放量最大' : '最近'}门店进行预约`)
                sendMessage.push(`预约方式: ${isLargeNum ? '投放量最大' : '最近'}`)
                $.log(
                    `获取到当前预约选项: ${ITEMS[j]
                        .split(',')
                        .map((item) => RESERVATION_MAP[item])
                        .join(', ')}`
                )
                const TYPE_FN_KEY = isLargeNum ? 'getLargeNumStore' : 'getNearbyStore'
                await Promise.all(
                    ITEMS[j].split(',').map(async (d) => {
                        await ii.getAllStore(d, j)
                        ii[TYPE_FN_KEY](d, j)
                        $.log(`${RESERVATION_MAP[d]}开始预约`)
                        await ii.doReserve()
                    })
                ).catch((e) => {
                    throw e
                })
                // 领取连续申购奖励t
                await ii.receiveXmy()
                ii.rewardAmount > 0 && sendMessage.push(`连申奖励: 领取成功 +${ii.rewardAmount}小茅运`)
            }
        } catch (e) {
            $.log(e)
            sendMessage.push(e)
        } finally {
            if (sendMessage.length <= 1) {
            } else {
                await SendNotify($.name, '', sendMessage.join('\n').replace(/\n$/, ''))
            }
            sendMessage = []
            continue
        }
        // sendMessage.filter((item) => item != '\n').length === MAOTAI_PARAMS.length
    }
})()
    .catch((e) => {
        $.log('', $.name, e, '')
    })
    .finally(async () => $.done({}))

function checkEnv(s, t) {
    const e = ($.isNode() ? process.env[s] : $.getdata(t)) || ''
    return e ? e.split(SPLIT) : null
}
async function fetchData(o) {
    typeof o === 'string' && (o = { url: o })
    if (!o?.url) throw new Error('[发送请求] 缺少 url 参数')
    try {
        // type => 因为env中使用method处理post的特殊请求(put/delete/patch), 所以这里使用type
        const { url: u, type, headers: h, body: b, params, dataType = 'form', deviceType = 'mobile', responseType = 'data', timeout = 1e4 } = o
        const method = type ? type.toLowerCase() : b ? 'post' : 'get'
        // post请求需要处理params参数(get不需要, env已经处理)
        const url = u.concat(method === 'post' ? '?' + $.qs.stringify(params) : '')
        const headers = ObjectKeys2LowerCase(h || {})
        // 根据deviceType给headers添加默认UA
        headers?.['user-agent'] ||
            Object.assign(headers, {
                'user-agent':
                    deviceType === 'pc'
                        ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
                        : 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
            })
        // 根据jsonType处理headers
        dataType === 'json' && Object.assign(headers, { 'content-type': 'application/json;charset=UTF-8' })
        // 超时处理兼容Surge => 单位是s
        const timeOut = $.isSurge() ? timeout / 1e3 : timeout
        // post请求处理body
        // const body = method === 'post' && b ? (o.dataType === 'json' ? typeof b ===  'object' ? $.toStr(b) || b : b : typeof b === 'object' ? $.qs.stringify(b) : b) : ''
        const body = method === 'post' && b && ((o.dataType === 'json' ? $.toStr : $.qs.stringify)(typeof b === 'object' ? b : '') || b)
        const request = {
            'auto-cookie': false,
            ...o,
            ...(o?.opts ? o.opts : {}),
            url,
            headers,
            ...(method === 'post' && { body }),
            ...(method === 'get' && params && { params }),
            timeout: timeOut
        }
        const promise = new Promise((resolve, reject) => {
            $[method](request, (err, response, data) => {
                if (err) {
                    let errorMsg = ''
                    if (response) {
                        // errorMsg = `状态码: ${response.statusCode}`
                        $.log(`状态码: ${response.statusCode}`)
                    }
                    if (data) {
                        errorMsg += $.toObj(data)?.message || data
                    }
                    $.log(`请求接口: ${u} 异常: ${errorMsg}`)
                    reject(errorMsg)
                    //reject({ error: err, response, data })
                } else {
                    resolve(responseType === 'response' ? response : $.toObj(data) || data)
                }
            })
        })
        // 使用Promise.race来给Quantumult X强行加入超时处理
        return $.isQuanX() ? await Promise.race([new Promise((_, r) => setTimeout(() => r(new Error('网络开小差了~')), timeout)), promise]) : promise
    } catch (e) {
        throw new Error(e)
    }
}
// prettier-ignore
async function SendNotify(n,o="",i="",t={}){const e="undefined"!=typeof $app&&"undefined"!=typeof $http,s=t["open-url"],f=t["media-url"];if($.isQuanX()&&$notify(n,o,i,t),$.isSurge()){const t=f?`${i}\n多媒体:${f}`:i;$notification.post(n,o,t,{url:s})}if($.isLoon()){const t={};s&&(t.openUrl=s),f&&(t.mediaUrl=f),"{}"===JSON.stringify(t)?$notification.post(n,o,i):$notification.post(n,o,i,t)}const c=`${i}${s?`\n点击跳转: ${s}`:""}${f?`\n多媒体: ${f}`:""}`;if(e){require("push").schedule({title:n,body:`${o?`${o}\n`:""}${c}`})}if($.isNode())try{await notify.sendNotify(`${n}\n${o}`,c)}catch(n){console.log("没有找到sendNotify.js文件")}console.log(`${n}\n${o}\n${c}\n\n`)}
// prettier-ignore
function CompleteBase64(r=("undefined"!=typeof window?window:globalThis)){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);r.atob=function base64decode(r){var e,t,o,h,i,c,d;for(c=r.length,i=0,d="";i<c;){do{e=a[255&r.charCodeAt(i++)]}while(i<c&&-1==e);if(-1==e)break;do{t=a[255&r.charCodeAt(i++)]}while(i<c&&-1==t);if(-1==t)break;d+=String.fromCharCode(e<<2|(48&t)>>4);do{if(61==(o=255&r.charCodeAt(i++)))return d;o=a[o]}while(i<c&&-1==o);if(-1==o)break;d+=String.fromCharCode((15&t)<<4|(60&o)>>2);do{if(61==(h=255&r.charCodeAt(i++)))return d;h=a[h]}while(i<c&&-1==h);if(-1==h)break;d+=String.fromCharCode((3&o)<<6|h)}return d},r.btoa=function base64encode(r){var a,t,o,h,i,c;for(o=r.length,t=0,a="";t<o;){if(h=255&r.charCodeAt(t++),t==o){a+=e.charAt(h>>2),a+=e.charAt((3&h)<<4),a+="==";break}if(i=r.charCodeAt(t++),t==o){a+=e.charAt(h>>2),a+=e.charAt((3&h)<<4|(240&i)>>4),a+=e.charAt((15&i)<<2),a+="=";break}c=r.charCodeAt(t++),a+=e.charAt(h>>2),a+=e.charAt((3&h)<<4|(240&i)>>4),a+=e.charAt((15&i)<<2|(192&c)>>6),a+=e.charAt(63&c)}return a}}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise(((e,r)=>{s.call(this,t,((t,s,a)=>{t?r(t):e(s)}))}))}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,r)=>e(r)))}))}runScript(t,e){return new Promise((s=>{let r=this.getdata("@chavy_boxjs_userCfgs.httpapi");r=r?r.replace(/\n/g,"").trim():r;let a=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");a=a?1*a:20,a=e&&e.timeout?e.timeout:a;const[i,o]=r.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:a},headers:{"X-Key":i,Accept:"*/*"},timeout:a};this.post(n,((t,e,r)=>s(r)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),r=!s&&this.fs.existsSync(e);if(!s&&!r)return{};{const r=s?t:e;try{return JSON.parse(this.fs.readFileSync(r))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),r=!s&&this.fs.existsSync(e),a=JSON.stringify(this.data);s?this.fs.writeFileSync(t,a):r?this.fs.writeFileSync(e,a):this.fs.writeFileSync(t,a)}}lodash_get(t,e,s=void 0){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let a=t;for(const t of r)if(a=Object(a)[t],void 0===a)return s;return a}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,r)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[r+1])>>0==+e[r+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,r]=/^@(.*?)\.(.*?)$/.exec(t),a=s?this.getval(s):"";if(a)try{const t=JSON.parse(a);e=t?this.lodash_get(t,r,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,r,a]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(r),o=r?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,a,t),s=this.setval(JSON.stringify(e),r)}catch(e){const i={};this.lodash_set(i,a,t),s=this.setval(JSON.stringify(i),r)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,r)=>{!t&&s&&(s.body=r,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,r)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:r,headers:a,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:r,headers:a,body:i,bodyBytes:o},i,o)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:r,statusCode:a,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:r,statusCode:a,headers:i,rawBody:o,body:n},n)}),(t=>{const{message:r,response:a}=t;e(r,a,a&&s.decode(a.rawBody,this.encoding))}))}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,r)=>{!t&&s&&(s.body=r,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,r)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:r,headers:a,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:r,headers:a,body:i,bodyBytes:o},i,o)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let r=require("iconv-lite");this.initGotEnv(t);const{url:a,...i}=t;this.got[s](a,i).then((t=>{const{statusCode:s,statusCode:a,headers:i,rawBody:o}=t,n=r.decode(o,this.encoding);e(null,{status:s,statusCode:a,headers:i,rawBody:o,body:n},n)}),(t=>{const{message:s,response:a}=t;e(s,a,a&&r.decode(a.rawBody,this.encoding))}))}}time(t,e=null){const s=e?new Date(e):new Date;let r={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}queryStr(t){let e="";for(const s in t){let r=t[s];null!=r&&""!==r&&("object"==typeof r&&(r=JSON.stringify(r)),e+=`${s}=${r}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",r="",a){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:return{url:t.url||t.openUrl||t["open-url"]};case"Loon":return{openUrl:t.openUrl||t.url||t["open-url"],mediaUrl:t.mediaUrl||t["media-url"]};case"Quantumult X":return{"open-url":t["open-url"]||t.url||t.openUrl,"media-url":t["media-url"]||t.mediaUrl,"update-pasteboard":t["update-pasteboard"]||t.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,r,i(a));break;case"Quantumult X":$notify(e,s,r,i(a));case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),r&&t.push(r),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
