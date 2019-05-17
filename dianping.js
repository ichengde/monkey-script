// ==UserScript==
// @name         dianping
// @namespace    https://greasyfork.org/zh-CN/users/372485
// @version      0.0.3
// @description  dianping
// @author       Chegde
// @match        http://*/*
// @include      https://*/*
// @run-at document-end
// @connect      localhost
// @grant        GM_xmlhttpRequest
// ==/UserScript==
// fork from https://greasyfork.org/zh-CN/scripts/35251-%E6%99%BA%E8%83%BD%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91
(function () {
    'use strict';

    var saveUrl = 'http://localhost:18888/train/try';

    var actionButton = document.createElement('div');

    actionButton.innerHTML = '打开';

    actionButton.setAttribute('style', '' +
        'background:#fff!important;' +
        'position:fixed!important;' +
        'top:0px!important;' +
        'left:0px!important;' +
        'padding:2px!important;' +
        'cursor:pointer!important;' +
        'z-index:2147483647!important;' +
        '');


    document.documentElement.appendChild(actionButton);

    actionButton.addEventListener('click', () => {
        const a = document.querySelectorAll('.pic>a');
        const currentPageLinkList = Array.from(a).map(p => p.href);
        currentPageLinkList.forEach(p => {
            window.open(p);
        })
    });

    // ajax 跨域访问公共方法
    function ajax(url, method, data, cb) {
        if (!!!method)
            method = 'POST';
        // >>>因为Tampermonkey跨域访问(a.com)时会自动携带对应域名(a.com)的对应cookie
        // 不会携带当前域名的cookie
        // 所以，GM_xmlhttpRequest【不存在】cookie跨域访问安全性问题
        // 以下设置默认headers不起作用<<<
        const headers = { 'cookie': '', 'Content-Type': 'application/json' };
        GM_xmlhttpRequest({
            method: method,
            url: url,
            headers: headers,
            data: data,
            onload: function (res) {
                if (cb) {
                    cb();
                }
            },
            onerror: function (res) {
                console.log(res);
            }
        });
    }

    const r = () => {
        const name = document.querySelector('h1.shop-name').innerText
        const location = Array.from(document.querySelectorAll('.breadcrumb')).map(k => k.innerText);
        const address = document.querySelector('span[itemprop=street-address]').innerText;
        const tel = document.querySelector('span[itemprop=tel]').innerText;

        if (name && address && tel) {
            ajax(saveUrl, 'POST', JSON.stringify({ name: name, address: address, tel: tel, location: location, html: document.body.innerHTML }), function () {
                window.close()
            })
        }
    };

    setInterval(r, 5000);



})();