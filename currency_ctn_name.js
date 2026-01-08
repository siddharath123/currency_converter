let base_url = 'https://api.frankfurter.app/latest';


const dropdowns = document.querySelectorAll('.dropdown select');

const btn = document.querySelector('button')
const fromcurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
let msg = document.querySelector('.msg')

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === 'from' && currCode === 'USD'){
      newOption.selected = 'selected';
    }
    if(select.name === 'to' && currCode === 'INR'){
      newOption.selected = 'selected';
    }
    select.append(newOption);
  }
  // flag upadate
  select.addEventListener('change' , (evt)=>{
    updateFlg(evt.target)
  })
}

// flag upadate
const updateFlg = (element) =>{
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode]
  console.log(countryCode);
  let newSrch = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img =  element.parentElement.querySelector('img')
  img.src = newSrch
}

//get exchange rate button

btn.addEventListener('click', async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector('.amount input');
  let amountValue = amount.value;

  if (amountValue === '' || amountValue < 1) {
    amountValue = 1;
    amount.value = '1';
  }

  const URL = `${base_url}?from=${fromcurr.value}&to=${toCurr.value}`;

  let response = await fetch(URL);
// console.log(response);
  if (!response.ok) {
    console.log("Error:", response.status);
    return;
  }

  let data = await response.json();
  console.log(data);

  let rate = data.rates[toCurr.value];
  let finalAmount = (amountValue * rate).toFixed(2);
  console.log(finalAmount);

  msg.innerText =   `${amountValue} ${fromcurr.value} = ${finalAmount} ${toCurr.value}`;
});




