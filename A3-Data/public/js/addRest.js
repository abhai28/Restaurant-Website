//declaring variables
let rest={}
let numItems = 0;
let id = document.getElementById("id").textContent;
const parseArray = id.split(":");
id = parseArray[1];
rest.id = parseInt(id);
rest.name = document.getElementById("name").value;
rest.min_order = document.getElementById("minorder").value;
rest.delivery_fee = document.getElementById("deliveryFee").value;

/*
    function gets new category information from page and creates a new category in the restaurant menu
 */
function addCategory(){
    let cat = document.getElementById("category").value
    rest.menu[cat] = {};
    var sel = document.createElement("option");
    var text = document.createTextNode(cat);
    sel.appendChild(text);

    let ul = document.createElement("ul");
    let bold = document.createElement('b');
    text = document.createTextNode(cat);
    bold.appendChild(text);
    ul.id = cat;
    ul.appendChild(bold);
    document.getElementById("category").value = "";
    document.getElementById("catList").appendChild(ul);
    document.getElementById("categoryDrop").appendChild(sel);
}

//function makes a get request to get the information of a restaurant
//used primarily to get the menu of the restaurant
function getRestaurant(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(xhttp.readyState===4&&xhttp.status===200){
            let tmpRest = JSON.parse(xhttp.responseText);
            rest.menu = tmpRest.menu;
            for (category in rest.menu){
                for(item in rest.menu[category]){
                    numItems++;
                }
            }
        }
    }
    xhttp.open("GET",`/restaurants/${id}`,true);
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.send();
}
//function gets item information from page and adds it to the category
function addItem(){
    let sel = document.getElementById("categoryDrop");
    let cat = sel.options[sel.selectedIndex].text;

    let item_name = document.getElementById("itemName").value;
    let description = document.getElementById("itemDescription").value;
    let price = parseFloat(document.getElementById("itemPrice").value).toFixed(2);

    let li = document.createElement("li");
    let text = document.createTextNode("Name: "+item_name+" Description "+description+" Price: $"+price);
    li.appendChild(text);
    document.getElementById(cat).appendChild(li);
    let item = {name:item_name,description:description,price:price};
    rest.menu[cat][numItems] = item;
    numItems++;
    document.getElementById("itemName").value = "";
    document.getElementById("itemDescription").value = "";
    document.getElementById("itemPrice").value = "";
}

//function makes a PUT request to server and saves the restaurant information onto server
function saveRest(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.status===200&&this.readyState===4){
            alert(xhttp.response);
        }
    }
    xhttp.open('PUT',`/restaurants/${id}`,true);
    xhttp.send(JSON.stringify(rest));
}
//function used to update restaurant info
function updateRest(){
    rest.name = document.getElementById("name").value;
    rest.min_order = document.getElementById("minorder").value;
    rest.delivery_fee = document.getElementById("deliveryFee").value;
}
//event listeners
document.getElementById("catBtn").addEventListener('click',(event)=>{
    addCategory();
});

document.getElementById("itemBtn").addEventListener('click',(event)=>{
    addItem();
});
document.getElementById("saveBtn").addEventListener('click',(event)=>{
    updateRest();
    saveRest();
});

getRestaurant();
