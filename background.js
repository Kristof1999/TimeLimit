chrome.tabs.onCreated.addListener((activeInfo) => {
    
    //Alarms API
    //ha A oldal lett megnyitva (csonkítani) és még nem lett elindítva a számláló, akkor számoljunk
    /*timerId = setInterval(function() {
        if (parseInt(tdTime.innerHTML) < parseInt(tdLimit.innerHTML)) {
            tdTime.innerHTML++;
        } else {
            clearInterval(timerId);
            alert("Time is up! You have spent " + tdTime.innerHTML + " seconds on" + name 
            + " today, and so you have reached your limit: " + tdLimit.innerHTML);
            startOrStopButton.innerHTML = "Start";
            startOrStopButton.setAttribute("disabled", "true");        
        }
    }, 1000);*/
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    //clearInterval(timerId);
});