"use strict";

chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("index.html");
    await chrome.tabs.create({ url });
});