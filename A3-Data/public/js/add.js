//declaring variables
let rest ={};

/*
    function makes a post request to server and submits the information of the newly created restaurant
 */
function submit(){

    let name = document.getElementById("name").value;
    let delivery_fee = parseFloat(document.getElementById("deliveryFee").value).toFixed(2);
    let min_order = parseFloat(document.getElementById("minorder").value).toFixed(2);
    if(name.length<1){
        alert("Please enter a value for name");
    }
    else if(delivery_fee<0){
        alert("Please enter a non-negative value for delivery fee");
    }
    else if(min_order<0){
        alert("Please enter a non-negative value for minimum order");
    }
    else{
        rest.id = 0;
        rest.name = name;
        rest.delivery_fee = delivery_fee;
        rest.min_order = min_order;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(xhttp.readyState===4&&xhttp.status===200){
                window.location.replace(`http://localhost:3000/restaurants/${JSON.parse(xhttp.response)}`);
            }
        }
        xhttp.open("POST",'/restaurants',true);
        xhttp.send(JSON.stringify(rest));
    }
}
//event listen for the submit button
document.getElementById("restBtn").addEventListener('click',(event)=>{
    submit();
});