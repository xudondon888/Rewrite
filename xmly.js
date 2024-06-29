/*************************************

项目名称：喜马拉雅
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

 ^https?:\/\/.+\.xima.*\.com\/(mobile-user\/v2\/homePage|product\/detail\/v1|mobile\/v1\/album\/track|mobile-playpage\/playpage\/track\/qualityAndEffect|mobile-playpage\/playpage\/tabs\/v2|mobile-playpage\/track|mobile\/quickplay) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/xmly.js

[mitm]

hostname = *.xmcdn.com, *.ximalaya.com, 61.172.194.*,180.153.*.*,180.153.255.*, 180.153.140.*,180.153.250.*,114.80.99.*,114.80.139.2*,61.162.174.*,119.188.123.*,59.83.227.*, 114.80.161.29,1.62.62.64,1.194.255.171, 23.236.99.89, 36.99.200.135, 42.81.4.198, 42.81.26.128, 42.81.120.58, 43.152.24.12, 43.152.24.18, 43.152.25.127, 43.152.29.38, 43.175.16.34, 43.175.22.25, 43.175.44.15, 49.7.69.197, 49.51.224.95, 101.33.11.32, 101.33.11.106, 101.33.20.34, 101.33.29.110, 103.105.60.99, 140.249.84.135, 140.249.85.189, 150.109.90.80, 150.109.91.35, 150.138.47.94, 150.138.136.145, 203.205.13*.*, 203.205.250.*, 211.152.137.*, 47.100.227.85, 61.164.145.12, 106.41.204.126, 112.80.180.72, 112.98.170.228, 112.99.146.108, 118.25.119.177, 223.111.231.198, 120.22*.2*.*, 43.132.8*.*, 101.33.27.*, 43.141.11.*

*************************************/

let header = $request.headers;
const isQuanX = typeof $task !== "undefined";

if (isQuanX) {
  header["User-Agent"] = 'ting_v9.2.60_c5(CFNetwork, iOS 17.3, iPhone15,5)';
  header["Cookie"] = 'channel=ios-b1; 1&_device=iPhone&33A60B32-0B27-4B52-A9F4-3AC5E46F2D13&9.2.60; impl=com.gemd.iting; c-oper=%E7%94%B5%E4%BF%A1; net-mode=WIFI; res=1290%2C2796; 1&_token=458596456&46CEDDE0340C69EA74EE0EB7D8FE6202449E8CD807FA7BF577028BBA7B4923526EC38CC03A5B116MA279A517657E7B6_; idfa=33A60B32-0B27-4B52-A9F4-3AC5E46F2D13; device_model=iPhone%2015%20Plus; XD=E1jJGgQEXT2GOhMHYstFfgiCUfTWFeEg+szXuPXkPCOKj60rfW5yh48G1xHMeC8m/ohZcAo+0ATXD9A+EfKHGA==; fp=009217657x232242vv649050290000k220211100200000001103331000030';
} else {
  header["user-agent"] = 'ting_v9.2.60_c5(CFNetwork, iOS 17.3, iPhone15,5)';
  header["cookie"] = 'channel=ios-b1; 1&_device=iPhone&33A60B32-0B27-4B52-A9F4-3AC5E46F2D13&9.2.60; impl=com.gemd.iting; c-oper=%E7%94%B5%E4%BF%A1; net-mode=WIFI; res=1290%2C2796; 1&_token=458596456&46CEDDE0340C69EA74EE0EB7D8FE6202449E8CD807FA7BF577028BBA7B4923526EC38CC03A5B116MA279A517657E7B6_; idfa=33A60B32-0B27-4B52-A9F4-3AC5E46F2D13; device_model=iPhone%2015%20Plus; XD=E1jJGgQEXT2GOhMHYstFfgiCUfTWFeEg+szXuPXkPCOKj60rfW5yh48G1xHMeC8m/ohZcAo+0ATXD9A+EfKHGA==; fp=009217657x232242vv649050290000k220211100200000001103331000030';
}
// 处理 API 路径
if ($request.url.includes("/business-vip-level-h5-web/api/profile")) {
  // 会员页
  body.data.vipProfileVo.expire = "2029-12-31 23:59:59";
  body.data.vipProfileVo.level = 5;
  body.data.vipProfileVo.value = 28888;
  body.data.vipProfileVo.state = 4;
} else if ($request.url.includes("/business-vip-presale-mobile-web/page")) {
  // 我的会员页
  body.data.modules = body.data.modules.map(module => {
    if (module.key === "userInfo") {
      module.userInfo.userLevel.userLevel = 5;
      module.userInfo.userLevel.userLevelIcon = "http://imagev2.xmcdn.com/storages/2fd2-audiofreehighqps/93/C6/GKwRIDoF9MpUAAAP_AEhz-MP.png";
      module.userInfo.vipStatus = 2;
      module.userInfo.subtitle = "永久会员";
    } else if (module.key === "productAdsResource") {
      module.vipStatus = 2;
    } else if (module.key === "vipProducts") {
      module.vipStatus = 2;
      module.renewTips = "您是永久会员";
    } else if (module.key === "jointVipProducts") {
      module.vipStatus = 2;
    } else if (module.key === "vipLevelPrivilege") {
      module.vipStatus = 2;
      module.userLevel = 5;
      module.level = {
        "title": "会员等级",
        "btnText": "去升级",
        "btnJumpUrl": "https://m.ximalaya.com/gatekeeper/vip-grade?ts=1646193928#grow-tasks",
        "progress": {
          "curLevel": 5,
          "nextLevel": 6,
          "curLevelPoint": 25000,
          "nextLevelPoint": 88888,
          "point": 66666
        }
      };
    } else if (module.key === "vipPrivileges") {
      module.vipStatus = 2;
    }
    return module; // 修正遗漏的返回值
  });
}

// 完成处理请求
$done({ headers: header });

