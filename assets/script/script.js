const cash = document.getElementById('cash')
const price = document.getElementById('price')
const oneHundred = document.getElementById('one-hundred')
const twenty = document.getElementById('twenty')
const ten = document.getElementById('ten')
const five = document.getElementById('five')
const one = document.getElementById('one')
const quarter = document.getElementById('quarter')
const dime = document.getElementById('dime')
const nickel = document.getElementById('nickel')
const penny = document.getElementById('penny')
const form = document.getElementById('cash-register')
const resultPara = document.getElementById('result')

function checkCashRegister (price, cash, cid) {
  // Variable declarations
  const currency = [
    { name: 'PENNY', value: 0.01 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'DIME', value: 0.10 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'ONE', value: 1.0 },
    { name: 'FIVE', value: 5.0 },
    { name: 'TEN', value: 10.0 },
    { name: 'TWENTY', value: 20.0 },
    { name: 'ONE HUNDRED', value: 100.0 }
  ]
  const cashInRegister = {}
  let cashTotalAmount = 0
  let returnAmount = Math.round((cash - price) * 100) / 100
  const result = { status: '', change: [] }

  // Make an object from cid array
  cid.forEach((element) => {
    cashInRegister[element[0]] = element[1]
    cashTotalAmount += element[1]
  })

  // If the amount of money in register is smaller than the return amount, display INSUFFICIENT FUNDS
  if (returnAmount > cashTotalAmount) {
    result.status = 'INSUFFICIENT_FUNDS'
    result.change = []
  } else if (returnAmount === cashTotalAmount) {
    // If the amount of money in register is equal to the return amount, display CLOSED;
    result.status = 'CLOSED'
    result.change = cid
  } else {
    // Else cycle throught the currency array and make a new array of returned money values
    currency.forEach((element) => {
      let amount = 0
      while (
        returnAmount >= element.val &&
        cashInRegister[element.name] >= element.val
      ) {
        returnAmount -= element.val
        cashInRegister[element.name] -= element.val
        amount += element.val
        returnAmount = Math.round(returnAmount * 100) / 100
      }
      if (amount > 0) {
        result.change.push([element.name, amount])
      }
    })

    // If we returned everything display OPEN, else INSUFFICIENT FUNDS
    if (returnAmount === 0) {
      result.status = 'OPEN'
    } else {
      result.status = 'INSUFFICIENT_FUNDS'
      result.change = []
    }
  }

  console.log(result)
  resultPara.innerHTML = `${result.status} ; ${result.change}`
  return result
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const registerArray = [
    ['PENNY', penny.value],
    ['NICKEL', nickel.value],
    ['DIME', dime.value],
    ['QUARTER', quarter.value],
    ['ONE', one.value],
    ['FIVE', five.value],
    ['TEN', ten.value],
    ['TWENTY', twenty.value],
    ['ONE HUNDRED', oneHundred.value]
  ]

  checkCashRegister(price.value, cash.value, registerArray)
  console.log(registerArray)
})

// const bill = document.querySelectorAll('.input1')
// const note = document.querySelectorAll('.input2')
// const penny = document.getElementById('penny')
// const nickel = document.getElementById('nickel')
// const dime = document.getElementById('dime')
// const quarter = document.getElementById('quarter')
// const one = document.getElementById('one')
// const five = document.getElementById('five')
// const ten = document.getElementById('ten')
// const twenty = document.getElementById('twenty')
// const oneHundred = document.getElementById('hundred')
// const form = document.querySelector('.calculate')
// const displayResults = document.querySelector('.result')

// form.addEventListener = ('submit', (e) => {
//     e.preventDefault()
//     const enteredArray = [
//       ['PENNY', penny.value],
//       ['NICKEL', nickel.value],
//       ['DIME', dime.value],
//       ['QUARTER', quarter.value],
//       ['ONE', one.value],
//       ['FIVE', five.value],
//       ['TEN', ten.value],
//       ['TWENTY', twenty.value],
//       ['ONE HUNDRED', oneHundred.value]
//     ]

//   checkCashRegister(bill.value, note.value, enteredArray)
//   console.log(enteredArray);
// })

// function checkCashRegister(price, cash, cid) {
//   // Declare variables
//   const currency = [
//     { name: 'PENNY', value: 0.01 },
//     { name: 'NICKEL', value: 0.05 },
//     { name: 'DIME', value: 0.10 },
//     { name: 'QUARTER', value: 0.25 },
//     { name: 'ONE', value: 1.0 },
//     { name: 'FIVE', value: 5.0 },
//     { name: 'TEN', value: 10.0 },
//     { name: 'TWENTY', value: 20.0 },
//     { name: 'ONE HUNDRED', value: 100.0 }
//   ]
//   const cashInRegister = {}
//   let totalAmountInCash = 0
//   let returnAmount = Math.round((cash - price) * 100) / 100
//   const result = { status: ' ', change: []}

//   // Make an object from cash-in-drawer array
//   cid.forEach((element) => {
//     cashInRegister[element[0]] = element[1]
//     totalAmountInCash += element[1]
//   })

//   if (returnAmount > totalAmountInCash) {
//   // Return Insufficient funds if amount of money in register is less than return amount
//     result.status = 'INSUFFICIENT_FUNDS'
//     result.change = []
//       this.style.color = '#b22222'
//   } else if (returnAmount === totalAmountInCash) {
//   // Return Closed if amount of money in register is equal to the return amount
//     result.status = 'CLOSED'
//     result.change = cid
//     this.style.color = '#b8860b'
//   } else {
//     currency.forEach((element) => {
//       let amount = 0
//       while (
//         returnAmount >= element.val && 
//         cashInRegister[element.name] >= element.val
//       ) {
//         returnAmount -= element.val
//         cashInRegister[element.name] -= element.val
//         amount += element.val
//         returnAmount = Math.random(returnAmount * 100) / 100
//       }
//       if (amount > 0) {
//         result.change.push([element.name, amount]) 
//       }
//     })

//     // If return everything, then display Open else Insufficient funds
//     if (returnAmount === 0) {
//       result.status = 'OPEN'
//     } else {
//       result.status = 'INSUFFICIENT_FUNDS'
//       result.change = []
//     }
//   }

//   console.log(result);
//   displayResults.innerHTML = `${result.status} // ${result.change}`
//   return result
// }
