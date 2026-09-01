// ==UserScript==
// @name         K12 Launch Pad -> Canvas style
// @namespace    http://www.github.io/e016/k12-plus
// @version      2026-9-1
// @description  Makes the Stride K12 Launch Pad look like the rest of the Canvas OLS!
// @author       d016
// @match        https://home.k12.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=k12.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let styleTag = document.createElement("style");
    styleTag.innerHTML = `:root {
--border: #0000 !important;
--radius-md: 4px !important;
--color-primary-100: var(--color-neutral-100) !important;
--color-surface-primary-100: var(--color-neutral-100) !important;
--color-surface-primary-200: var(--color-neutral-200) !important;
--color-surface-primary-300: var(--color-neutral-300) !important;
--color-surface-primary-400: var(--color-neutral-400) !important;
--color-primary-alternate-100: var(--color-foreground) !important;
--custom-background: var(--color-surface-neutral-main) !important;
}
[data-theme=dark] {
--color-neutral-200: var(--global-neutral-800);
--color-neutral-300: var(--global-neutral-700);
--color-neutral-400: var(--global-neutral-600);
}
.bg-surface-primary-600 {
background: rgba(0, 0, 0, 0.5) !important;
}
.fill-surface-primary-600 {
fill: rgba(0, 0, 0, 0) !important;
}
body {
--font-sans: "Lato Extended","Lato","Helvetica Neue",Helvetica,Arial,sans-serif !important;
}
.rounded-full:not(.bg-red-500):not(span[data-slot="badge"]):not(div.bg-primary-alternate-400) {
border-radius: 4px !important;
}
.shadow-sm, .shadow-xs {
box-shadow: initial !important;
}
.border-neutral-100 {
border-color: #0000 !important
}
.focus\\:bg-accent:focus {
background-color: var(--color-primary-500) !important;
}
.data-\\[state\\=active\\]\\:border-t-surface-primary-300[data-state="active"]{
border-top-color:var(--color-neutral-500) !important
}

.data-\\[state\\=active\\]\\:border-x-surface-primary-300[data-state="active"] {
border-inline-color: var(--color-neutral-500) !important;
}
.bg-primary-500\\/10 {
background: var(--color-neutral-500) !important
}
span[data-slot="badge"] {
background: #0000 !important;
border: 1px solid var(--color-primary-500);
color: var(--color-primary-500);
}
.after\:bg-surface-primary-300:after {
border: 1px solid var(--color-muted-foreground);
}
.after\\:bg-surface-primary-300:after {
background: var(--color-neutral-500) !important;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'text-\\'\\]\\)\\]\\:text-muted-foreground svg:not([class*=text-]) {
color: var(--color-neutral-700) !important;
}
svg.lucide-calendar, svg.text-surface-primary-500,
svg.lucide.lucide-chevron-right.text-primary-500.w-4.h-4.shrink-0, svg.ml-2.h-4.w-4.text-primary-500 {
color: var(--color-foreground) !important
}
span.text-xs.text-primary-500\/70 {
color: var(--color-surface-400) !important;
}
span.text-primary-500 {
color: var(--color-surface-800);
}
`;
    document.head.appendChild(styleTag);
})();
