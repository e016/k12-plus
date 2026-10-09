// ==UserScript==
// @name         Instant Nearpod Slide Transitions
// @namespace    http://www.github.com/e016/k12-plus
// @version      2026-09-23
// @description  You know how nearpod has that annoying slide transition? This userscript makes those transitions almost instant!
// @author       d016
// @match        *://app.nearpod.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nearpod.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let styleTag = document.createElement("style")
    styleTag.innerHTML = `
    .animatedSlideRight, .animatedSlideLeft, .animatedSlideDown, .animatedSlideUp {
       -webkit-transition: -webkit-transform 0.01s !important;
       transition: transform 0.01s !important;
    }
    `;
    document.head.appendChild(styleTag);
})();
