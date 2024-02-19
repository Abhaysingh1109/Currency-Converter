const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(let code in countryList)
// console.log(code,countryList[code])

document.addEventListener("load", () => {
  updateExchange();
});

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // console.log(newOption)
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  // console.log(currCode)
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchange();
});

const updateExchange = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal < 1) {
    amountVal = 1;
    amount.value = 1;
  }
  // console.log(amountVal)
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  // console.log(fromCurr.value,toCurr.value)
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  // console.log(rate)

  let finalAmount = amountVal * rate;
  // console.log(finalAmount)
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
