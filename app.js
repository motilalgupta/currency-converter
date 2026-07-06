document.addEventListener("DOMContentLoaded", () => {
    updateExchangeRate();
})
const dropdows = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(select of dropdows){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value =currCode;

        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<0){
        amtVal =1;
        amount.value = "1"; 
    }
    const URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_RPlpf1bxjJiXfJhzYnCROB4gDXIkA8oU2SNNmOwe&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value].value;
    console.log(rate);

    let finalAmt = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode]; // IN AU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;    
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
// window.document.addEventListener("load", () => {
//     updateExchangeRate();
// })