var taskitem = document.getElementById("task");
var ul = document.getElementById("shoppingList");

taskitem.addEventListener("keyup", submitByEnter);
function submitByEnter(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("btnAdd").click();
    }
}


function addNewTask() {

    // Tarkistaa, että listalle ei lisätä sopimattomia ostoksia
    if (taskitem.value === "" || taskitem.value.length <= 3) {
        taskitem.classList.add("error");
        taskitem.placeholder = "Kirjoita kenttään tehtävä";
        taskitem.value = "";
    } else {
        taskitem.classList.remove("error");
        taskitem.placeholder = "Lisää tehtävä";

        // Luo li elementin
        var li = document.createElement("li");

        // Luo uusi elementti input
        var check = document.createElement("input");

        // Lisää luokka elementille
        check.className = "item-check";

        // Määrittele inputin sisältö
        check.type = "checkbox";

        // Liitä input li elementtiin
        li.appendChild(check);

        // Liitä taskitem.value li elementtiin
        li.appendChild(document.createTextNode(taskitem.value));

        // Luo uusi elementti a deletenapille
        var link = document.createElement("a");

        // Lisää luokka deletelle
        link.className = "delete-icon";

        // Määrittele deletenapin ikoni
        link.innerHTML = '<i class ="fas fa-trash-alt"></i>';

        // Liitä deletenappi li elementtiin
        li.appendChild(link);

        // Linkkaa li HTML:n ul:ään
        ul.appendChild(li);

        // Tallenna local storageen
        storeInLS();

        // Tyhjennä tekstikenttä
        taskitem.value = "";
    }
}

//ul.InnerHtml localStorageen
function storeInLS() {
    localStorage.myItems = ul.innerHTML;
}

//Lataa ul.innerHTML localStoragesta
document.addEventListener("DOMContentLoaded", getItems);
function getItems(){
    var storedValues = localStorage.myItems;
    if(storedValues != null){
        ul.innerHTML = localStorage.myItems;
    }

    //Merkitse done luokan omistavien luokkien checkboxit
    var checkBoxes = document.getElementsByClassName("item-check");
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].parentElement.classList.contains("done")) {
            checkBoxes[i].checked = true;
        }
    }
}

//Poistaa tehtävän listalta
ul.addEventListener("click", deleteItem);
function deleteItem(e) {
    if (e.target.parentElement.classList.contains("delete-icon")) {
        e.target.parentElement.parentElement.remove();

        removeItemFromLS(e.target.parentElement.parentElement);
    }
    if (e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();

        // Poistaa tehtävän local storagesta
        removeItemFromLS(e.target.parentElement);
    }
}

// Poistaa tehtävän local storagesta
function removeItemFromLS(itemLS) {
    var items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    items.forEach(function (item, index) {
        if (itemLS.textContent === item) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem("items", JSON.stringify(items));
}

// Lisää tehtävälle luokan done
ul.addEventListener("click", itemCheck);
function itemCheck(e) {
    if (e.target.classList.contains("item-check")) {
        e.target.parentElement.classList.toggle("done");
    }
    storeInLS();
}

// Näyttää tehtävälistalla ne, joilla luokka done
function showDone(e){
    var items = document.getElementsByTagName("LI");
    for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("done")) {
            items[i].style = "display: block";
        } else {
            items[i].style = "display: none";
        }
    }
    document.getElementById("btnDone").classList.add("btn-active");
    document.getElementById("btnAll").classList.remove("btn-active");
    document.getElementById("btnActive").classList.remove("btn-active");
}

// Näyttää tehtävälistalla ne, joilla ei luokkaa done
function showActive(){
    var items = document.getElementsByTagName("LI");
    for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("done")) {
            items[i].style = "display: none";
        } else {
            items[i].style = "display: block";
        }
    }
    document.getElementById("btnDone").classList.remove("btn-active");
    document.getElementById("btnAll").classList.remove("btn-active");
    document.getElementById("btnActive").classList.add("btn-active");
}

// Näyttää tehtävälistalla kaikki tehtävät
function showAll(){
    var items = document.getElementsByTagName("LI");
    for (var i = 0; i < items.length; i++) {
            items[i].style = "display: block";
    }
    document.getElementById("btnDone").classList.remove("btn-active");
    document.getElementById("btnAll").classList.add("btn-active");
    document.getElementById("btnActive").classList.remove("btn-active");
}




