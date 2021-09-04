let showButton = document.getElementById("showButton");

showButton.addEventListener("click", async () => {
    let url = chrome.runtime.getURL("index.html");
    await chrome.tabs.create({ url });
});
