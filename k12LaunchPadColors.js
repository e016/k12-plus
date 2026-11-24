// ==UserScript==
// @name         K12 Launch Pad Colors
// @namespace    http://github.com/e016/k12-colors
// @version      2026-11-23
// @description  Change the K12 Launch Pad Colors to your liking!! (compatible with "K12 Launch Pad -> Canvas Style" userscript)
// @author       d016
// @match        *://home.k12.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=k12.com
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
 
 
(function() {
    'use strict';
    document.navColor = GM_getValue("k12_colors_accent") || "#0035f0"; //"#613492";
    document.fontName = GM_getValue("k12_colors_font") || 'Poppins';
 
    var parseRGB = function (hex) {
        var rgb = Number.parseInt(hex.slice(1), 16),
            r,
            g,
            b;
        r = Math.round(rgb >> 16);
        g = Math.round((rgb >> 8) & 255);
        b = Math.round(255 & rgb);
        return { r: r, g: g, b: b };
    };
    var toHex = function (rgb) {
        return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g
            .toString(16)
            .padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
    };
    var mixColors = function (clr, other, percent) {
        var rgb1 = parseRGB(clr),
            rgb2 = parseRGB(other);
        percent = percent / 100;
        return toHex({
            r: Math.floor(rgb1.r * percent + rgb2.r * (1 - percent)),
            g: Math.floor(rgb1.g * percent + rgb2.g * (1 - percent)),
            b: Math.floor(rgb1.b * percent + rgb2.b * (1 - percent)),
        });
    };
    var darken = function (color, percent) {
        return mixColors("#121212", color, percent);
    };
    var lighten = function (color, percent) {
        return mixColors("#FFFFFF", color, percent);
    };
 
    let styleTag = document.createElement("style");
    function setStyling() {
        GM_setValue("k12_colors_accent", document.navColor);
        GM_setValue("k12_colors_font", document.fontName);
        styleTag.innerHTML = `
:root {
    --color-primary-500: ${document.navColor} !important;
    --global-blue-500: var(--color-primary-500) !important;
    --global-blue-300: ${lighten(document.navColor, 60)} !important;
    --global-blue-dark-500: var(--color-primary-500) !important;
 
    --global-blue-100: ${lighten(document.navColor, 95)} !important;
    --global-blue-200: ${lighten(document.navColor, 75)} !important;
    --global-blue-300: ${lighten(document.navColor, 50)} !important;
    --global-blue-surface-dark-300: ${darken(document.navColor, 50)} !important;
    --global-blue-600: ${darken(document.navColor, 60)} !important;
    --global-blue-dark-600: ${lighten(document.navColor, 70)} !important;
    --global-blue-surface-dark-100: ${darken(document.navColor, 95)} !important;
    --global-blue-surface-dark-200: ${darken(document.navColor, 75)} !important;
}
[data-theme=dark] {
/* NOTHING HERE YET */
}
.data-active\\:dark\\:text-\\[\\#0035F0\\][data-active]:is([data-theme=dark] *) {
color: var(--color-foreground) !important;
}
body {
--font-sans: ${document.fontName};
}
`;
    }
    function showSettingsPage() {
        let blackDiv = document.createElement("div");
        blackDiv.setAttribute("data-state", "open");
        blackDiv.setAttribute("data-slot", "dialog-overlay");
        blackDiv.className = "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50";
        blackDiv.style.pointerEvents = "auto";
        document.body.appendChild(blackDiv);
 
        let dialogDiv = document.createElement("div");
        dialogDiv.className = "bg-surface-neutral-main data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-lg duration-200 sm:max-w-lg p-0 gap-0";
        dialogDiv.setAttribute("role", "dialog");
        dialogDiv.setAttribute("data-state", "open");
        dialogDiv.setAttribute("data-slot", "dialog-overlay");
        dialogDiv.id = "radix-_r_o_";
        dialogDiv.style.pointerEvents = "auto";
 
        let footerDiv = document.createElement("div");
        footerDiv.className = "flex flex-col-reverse gap-2 sm:flex-row border-t p-6 sm:justify-center items-center";
        footerDiv.setAttribute("data-slot", "dialog-footer");
 
        let closeButton = document.createElement("button");
        closeButton.className = "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-transparent font-bold text-primary-500 hover:bg-primary-50 dark:text-neutral-900 dark:hover:bg-primary-50 shadow-none"
        closeButton.setAttribute("data-slot", "dialog-close");
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "Close";
        closeButton.onclick = () => {
            dialogDiv.remove();
            blackDiv.remove();
        }
        footerDiv.appendChild(closeButton);
 
 
        let colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = document.navColor;
        colorInput.onchange = function () {
            document.navColor = this.value;
            colorSelect.value = "#0035ff";
            setStyling()
        };
 
        let colorSelect = document.createElement("select");
 
        colorSelect.innerHTML = `
            <option value="#0035ff" selected hidden>Choose Color...</option>
            <option value="#0035f0">K12 Blue</option>
            <option value="#a2deff">K12 Dark Blue</option>
            <option value="#613492">Purple</option>`;
        colorSelect.onchange = function () {
            document.navColor = this.value;
            colorInput.value = document.navColor;
            setStyling();
        }
        colorSelect.value = colorInput.value;
        colorSelect.className = "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=auto]:h-auto *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 @xs:w-full @sm:w-full @md:w-[200px] rounded-full border-neutral-500";
        colorSelect.style.display = "initial";
        colorSelect.style.color = "#121212";
        colorSelect.style.background = "white";
 
        let colorLabel = document.createElement("label");
        colorLabel.setAttribute("for", "k12_colors_accent");
        colorLabel.innerHTML = "Accent Color: ";
        colorLabel.className = "p-6";
        colorLabel.appendChild(colorInput);
 
        colorLabel.appendChild(colorSelect);
 
        let fontInput = document.createElement("input");
        fontInput.value = document.fontName;
        fontInput.className = "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=auto]:h-auto *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 @xs:w-full @sm:w-full @md:w-[200px] rounded-full border-neutral-500";
        fontInput.style.display = "initial";
        fontInput.onchange = function () {
            document.fontName = this.value;
            setStyling();
        };
 
        let fontLabel = document.createElement("label");
        fontLabel.setAttribute("for", "k12_colors_font");
        fontLabel.innerHTML = "Font: ";
        fontLabel.className = "p-6";
        fontLabel.appendChild(fontInput);
 
        dialogDiv.appendChild(colorLabel);
        dialogDiv.appendChild(fontLabel);
        dialogDiv.appendChild(footerDiv);
 
        document.body.appendChild(dialogDiv);
    };
 
    // add "Settings" to the end of the page
    function addSettingsLink() {
        let footbar = document.querySelector("body > div.p-8 > div > ul");
        let settingsLinkWrapper = document.createElement("li");
        let settingsLink = document.createElement("a");
        settingsLink.innerHTML = "Settings...";
        settingsLink.href = "javascript:void(0)";
        settingsLink.onclick = showSettingsPage;
        settingsLinkWrapper.appendChild(settingsLink);
        footbar.appendChild(settingsLinkWrapper);
 
        let observer = new MutationObserver((mutations, obs) => {
            if (!document.body.contains(footbar)) {
                obs.disconnect();
                addSettingsLink();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
 
    addSettingsLink();
    setStyling()
    document.head.appendChild(styleTag);
})();
