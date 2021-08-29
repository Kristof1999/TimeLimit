"use strict";

let timerId;

function addRow() {        
    let form = document.getElementById("form");
    let table = document.getElementById("webPageNamesTable");
    let name = form.elements[0].value;
    if (isPresent(name, table)) {
        return;
    }

    let row = table.insertRow(table.rows.length);
    
    let tdName = row.insertCell(0);
    tdName.innerHTML = name;
    
    let tdTime = row.insertCell(1);    
    tdTime.innerHTML = 0;

    


    let tdButton = row.insertCell(3);
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
      
    let tdRemove = row.insertCell(4);                
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