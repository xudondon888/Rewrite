[rewrite_local]
^https:\/\/interface3?\.music\.163\.com\/eapi\/playermode\/ url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https:\/\/interface3?\.music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https:\/\/interface3?\.music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https:\/\/interface3?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https?:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

^https?:\/\/interface3?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://gist.githubusercontent.com/Sliverkiss/479ecf770801bb8d3efa514c56a699e7/raw/WyyCrack.js

[mitm]
hostname = *.music.163.com
