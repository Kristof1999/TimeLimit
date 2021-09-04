chrome.tabs.onActivated.addListener((activeInfo) => {
    alert(activeInfo.tabId);
});