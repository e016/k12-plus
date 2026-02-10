// ==UserScript==
// @name         No Launch Pad
// @namespace    http://github.com/e016/k12-plus
// @version      2026-02-10
// @description  Redirects to Dashboard when logging in, instead of the Launch Pad!
// @author       d016
// @match        https://home.k12.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=k12.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location = 'https://learn2.k12.com/' + window.location.hash;
})();
