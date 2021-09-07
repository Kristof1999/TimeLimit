"use strict";

//This load doesn't seem to fire when it should...
document.getElementsByTagName("body")[0].addEventListener("load", () => { load(); });
document.getElementById("loadButton").addEventListener("click", () => { load(); });
document.getElementById("clearButton").addEventListener("click", () => { clear(); });
document.getElementById("saveButton").addEventListener("click", () => { save(); });
document.getElementById("addButton").addEventListener("click", () => {
    addRow(document.getElementById("form").elements[0].value, 0, 0);
});
document.getElementById("updateButton").addEventListener("click", () => { load(); });

function clear() {
    localStorage.clear();
    let table = document.getElementById("webPageNamesTable");
    let length = table.rows.length;
    for (let i = 1; i < length; i++) {
        table.deleteRow(i);
    }
}

function load() {
    chrome.storage.sync.get(null, (items) => {
        let length = items.length;
        let day = new Date().getDate();
        //first row is header
        for (let i = 1; i < length; i++) {
            let nameKey = i + "," + 0;
            let timeKey = i + "," + 1;
            let limitKey = i + "," + 2;
            let dayKey = i + "," + 3;
            if (day != items[dayKey]) {
                addRow(items[nameKey], 0, items[limitKey]);
            } else {
                addRow(items[nameKey], items[timeKey], items[limitKey]);
            } 
        }
    });
}

function save() {
    //TODO: make little loadbar icon in an upper corner or sg. to make clear for the user that we are saving now
    let syncedStorage = chrome.storage.sync;
    syncedStorage.clear();
    let table = document.getElementById("webPageNamesTable");
    let rows = table.rows;
    let length = rows.length;
    let day = new Date().getDate();
    //first row is header
    for (let i = 1; i < length; i++) {
        let name = rows[i].cells[0].innerHTML;
        let time = rows[i].cells[1].innerHTML;
        let limit = rows[i].cells[2].innerHTML;
        let nameKey = i + "," + 0;
        let timeKey = i + "," + 1;
        let limitKey = i + "," + 2;
        let dayKey = i + "," + 3;
        syncedStorage.set({[nameKey]: name});
        syncedStorage.set({[timeKey]: time});
        syncedStorage.set({[limitKey]: limit});
        syncedStorage.set({[dayKey]: day});
    }
    syncedStorage.set({"length": length});
}

function addRow(name, time, limit) {  
    let table = document.getElementById("webPageNamesTable");
    if (isPresent(name, table)) {
        return;
    }

    let length = table.rows.length;
    let row = table.insertRow(length);
    
    let tdName = row.insertCell(0);
    tdName.innerHTML = name;
    
    let tdTime = row.insertCell(1);    
    tdTime.innerHTML = time;

    let tdLimit = row.insertCell(2);
    tdLimit.innerHTML = limit;

    let tdSetLimit = row.insertCell(3);
    let inputLimit = document.createElement("input");
    inputLimit.setAttribute("type", "number");
    inputLimit.setAttribute("min", 0);
    tdSetLimit.appendChild(inputLimit);
    let setButton = document.createElement("button");
    setButton.innerHTML = "Set";
    setButton.addEventListener("click", function() {
        tdLimit.innerHTML = inputLimit.value;
        inputLimit.value = "";
        save();
    });
    tdSetLimit.appendChild(setButton);

    let tdRemove = row.insertCell(4);                
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    //removeButton.id = name + "RemoveButton"; -> egyenlore nem kell
    removeButton.addEventListener("click", function() { 
        //lehet itt kelleni fog removeEventListener hivas -> ehhez jol jon majd a buttonoknak egy id-t is bellitani, ld. fentebb
        let index = getIndex(name, table);
        table.deleteRow(index);
        save();
    });       
    tdRemove.appendChild(removeButton);
}
         
function isPresent(name, table) {
    if (getIndex(name, table) == -1) {
        return false;
    } else {
        return true;
    }
}

function getIndex(name, table) {
    let rows = table.rows;
    let length = rows.length;
    for (let i = 0; i < length; i++) {
        if (rows[i].cells[0].innerHTML === name) {
            return i;
        }
    }
    return -1;
}