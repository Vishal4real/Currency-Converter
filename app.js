const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".selector select");
const btn = document.querySelector("button");
const msg = document.querySelector(".op-amt");

const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
for (let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }

        select.append(newoption);
        select.addEventListener("change",(evt) =>{
            updateFlag(evt.target);
        });
    }
}

const  updateFlag = (elem) =>{
    let currencyCode = elem.value;
    let countryCode = countryList[currencyCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img")
    img.src = newsrc;
}
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amt");
    let amtvalue = amount.value;
    if(amtvalue == "NULl" || amtvalue < 1){
        alert("Please Enter Value Greater Than 0")
        amount.value = "1";
        amtvalue = 1;
    }
    //console.log(from.value,to.value)

    const URL = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[ to.value.toLowerCase()]
   // console.log(rate)

   let finalAmout = amtvalue * rate;
    msg.innerText = `${amtvalue} ${from.value} = ${finalAmout} ${to.value}`
})

