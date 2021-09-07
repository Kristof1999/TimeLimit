"use strict";

chrome.alarms.create("default", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "default") {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.storage.sync.get(null, (items) => {
                    let length = items.length;
                    for (let i = 0; i < length; i++) {
                        let nameKey = i + "," + 0;
                        let name = items[nameKey];
                        if (tab.url.startsWith(name)) {
                            let timeKey = i + "," + 1;
                            let time = items[timeKey];
                            let limitKey = i + "," + 2;
                            let limit = items[limitKey];
                            if (time < limit) {
                                time += 60;
                                chrome.storage.sync.set({[timeKey]: time});
                            } else {
                                chrome.tabs.create({ url: chrome.runtime.getURL("limit.html") });
                            }
                        }
                    }
                });
            });
        });
    }
});

chrome.windows.onRemoved.addListener(() => {
    chrome.alarms.clear("default");
});

function blockTabIfNecessary(tab) {
    chrome.storage.sync.get(null, (items) => {
        let length = items.length;
        for (let i = 0; i < length; i++) {
            let nameKey = i + "," + 0;
            let name = items[nameKey];
            if (tab.url.startsWith(name)) {
                let timeKey = i + "," + 1;
                let time = items[timeKey];
                let limitKey = i + "," + 2;
                let limit = items[limitKey];
                if (time >= limit) {
                   chrome.tabs.create({ url: chrome.runtime.getURL("limit.html") });
                }
            }
        }
    });
}

chrome.tabs.onCreated.addListener((tab) => {
    blockTabIfNecessary(tab);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        blockTabIfNecessary(tab);
    });
});