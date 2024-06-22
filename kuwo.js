/******************************************
 * @name 酷我音乐去广告
 * @description 〔酷我音乐打击广告🪧简单软件〕

******************************************

[mitm]

hostname = img?.kuwo.cn, mg1.kwcdn.kuwo.cn

[rewrite_local]

^https?:\/\/img\d\.kuwo\.cn\/star\/albumcover$ reject
^https?:\/\/img1\.kwcdn\.kuwo\.cn\/star\/userpl2015$ reject

[filter_local]

DOMAIN, img?.kuwo.cn, REJECT
DOMAIN, mg1.kwcdn.kuwo.cn, REJECT

******************************************/