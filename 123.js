/*************************************

[rewrite_local]

^https:\/\/openmobile\.qq\.com\/oauth2\.0\/ url script-redirect-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/123.js

[mitm]

hostname = openmobile.qq.com

*************************************/

var B = '_Callback( {"ret":0, "url":"auth://www.qq.com?#access_token=74663626D754D050FFAAB8FEE258FAC8&expires_in=7776000&openid=8E7A102D470E70B339158F8F68D50EF2&pay_token=F945367CDBA0A39FD12319D6E738642D&state=test&ret=0&pf=openmobile_ios&pfkey=045656b3dcbfd8362845671a69355682&auth_time=1708094908&page_type=0"});';

$done({ body: B });