const cash = document.getElementById('cash')
const price = document.getElementById('price')
const penny = document.getElementById('penny')
const nickel = document.getElementById('nickel')
const dime = document.getElementById('dime')
const quarter = document.getElementById('quarter')
const one = document.getElementById('one')
const five = document.getElementById('five')
const ten = document.getElementById('ten')
const twenty = document.getElementById('twenty')
const oneHundred = document.getElementById('one-hundred')
const form = document.getElementById('cash-register')
const displayResults = document.getElementById('result')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const registerArray = [
    ['ONE HUNDRED', oneHundred.value],
    ['TWENTY', twenty.value],
    ['TEN', ten.value],
    ['FIVE', five.value],
    ['ONE', one.value],
    ['QUARTER', quarter.value],
    ['DIME', dime.value],
    ['NICKEL', nickel.value],
    ['PENNY', penny.value]
  ]

  checkCashRegister(price.value, cash.value, registerArray)
  console.log(registerArray)
})

function checkCashRegister (price, cash, cid) {
  // Declare variables
  const currency = [
    { name: 'ONE HUNDRED', val: 100.0 },
    { name: 'TWENTY', val: 20.0 },
    { name: 'TEN', val: 10.0 },
    { name: 'FIVE', val: 5.0 },
    { name: 'ONE', val: 1.0 },
    { name: 'QUARTER', val: 0.25 },
    { name: 'DIME', val: 0.1 },
    { name: 'NICKEL', val: 0.05 },
    { name: 'PENNY', val: 0.01 }
  ]
  const cashInRegister = {}
  let totalAmountInCash = 0
  let returnAmount = Math.round((cash - price) * 100) / 100
  const result = { status: '', change: [] }

  // Make an object from cid array
  cid.forEach((element) => {
    cashInRegister[element[0]] = element[1]
    totalAmountInCash += element[1]
  })

  if (returnAmount > totalAmountInCash) {
    // Return insufficient funds if amount of money in register is less than return amount
    result.status = 'INSUFFICIENT_FUNDS'
    result.change = []
  } else if (returnAmount === totalAmountInCash) {
    // Return closed if amount of money in register is equal to return amount
    result.status = 'CLOSED'
    result.change = cid
  } else {
    // Else go through the currency array and make a new array of returned values
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

    // If return everything display open, else insufficient funds
    if (returnAmount === 0) {
      result.status = 'OPEN'
    } else {
      result.status = 'INSUFFICIENT_FUNDS'
      result.change = []
    }
  }

  console.log(result)
  displayResults.innerHTML = `${result.status} ; [${result.change}]`
  return result
}
