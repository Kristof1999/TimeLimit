"use strict";

let timerId;
let storageCounter = 0;

document.addEventListener("load", loadAllFromLocalStorage());

function loadAllFromLocalStorage() {
    let i = 0;
    while (true) {
        if (localStorage.getItem(i + "," + 0) == null) {
            break;
        } else {
            addRow(
                localStorage.getItem(i + "," + 0),
                localStorage.getItem(i + "," + 1),
                localStorage.getItem(i + "," + 2));
            i++;
        }
    }
}

function saveAllToLocalStorage() {
    localStorage.clear();
    let table = document.getElementById("webPageNamesTable");
    let rows = table.rows;
    let length = rows.length;
    for (let i = 0; i < length; i++) {
        localStorage.setItem(i + "," + 0, rows[i].cells[0].innerHTML);
        localStorage.setItem(i + "," + 1, rows[i].cells[1].innerHTML);
        localStorage.setItem(i + "," + 2, rows[i].cells[2].innerHTML);
    }
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
    //TODO: CSS-el allitani inputLimit width-jet
    tdSetLimit.appendChild(inputLimit);
    let setButton = document.createElement("button");
    setButton.innerHTML = "Set";
    setButton.addEventListener("click", function() {
        tdLimit.innerHTML = inputLimit.value;
    });
    tdSetLimit.appendChild(setButton);

    let tdButton = row.insertCell(4);
    let startOrStopButton = document.createElement("button");
    startOrStopButton.innerHTML = "Start";
    tdButton.addEventListener("click", function() {
        if (startOrStopButton.innerHTML === "Start") {
            let index = getIndex(name, table);
            timerId = setInterval(function() {table.rows[index].cells[1].innerHTML++;}, 1000);
            open(name);
            startOrStopButton.innerHTML = "Stop";
        } else if (startOrStopButton.innerHTML === "Stop") {
            clearInterval(timerId);
            startOrStopButton.innerHTML = "Start";
        }
    });
                
    tdButton.appendChild(startOrStopButton);
      
    let tdRemove = row.insertCell(5);                
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    //removeButton.id = name + "RemoveButton"; -> egyenlore nem kell
    removeButton.addEventListener("click", function() { 
        //lehet itt kelleni fog removeEventListener hivas -> ehhez jol jon majd a buttonoknak egy id-t is bellitani, ld. fentebb
        let index = getIndex(name, table);
        table.deleteRow(index);
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