// ==UserScript==
// @name         Mail Decorator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  精简QQ邮箱界面
// @author       Chegde
// @match        *://mail.qq.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    if (location.pathname.indexOf('frame_html') >= 0) {
    }
    window.addEventListener('load', function () { });

    var remove = function (dom) {
        if (dom instanceof HTMLElement) {
            dom.remove();
            return;
        }
        var s = document.querySelector(dom);
        if (s) {
            s.remove();
        }
    }

    var list = [
        // 左上角logo
        '.imglogo',
        '.header_logo',

        // 首页中间横屏展示
        '#todayMain2',
        '#todayTool2',
        '#TodayRightInbox',

        // 更多应用
        '#folder_morefunction_td',

        // favicon
        "link[rel*='icon']",
        '#folder_129_td',

        // 底部
        '.todaybottominfo',
    ];


    for (var i = 0; i < list.length; i = i + 1) {
        remove(list[i]);
    }

    // 顶部个人信息
    var info = document.querySelector('#logotips');
    if (info) {
        info.style.marginLeft = '20px';
    }

    var commerce = document.querySelectorAll('span');
    for (var i = 0; i < commerce.length; i = i + 1) {
        if (commerce[i].innerText.indexOf('Tencent') >= 0) {
            commerce[i].innerText = commerce[i].innerText.replace('Tencent', '');
            // remove(commerce[i]);
        }
    }
})();