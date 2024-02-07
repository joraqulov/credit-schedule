function showinp() {
    var userForm = document.getElementById('userForm');
    userForm.classList.toggle('show');
}
function debts(id) {
    var debt_bar = document.getElementById('debt_bar');
    debt_bar.classList.toggle('show2');
    var userHistory = bank_users.filter((user) => user.id == id)[0].history;
    res2.innerHTML = userHistory.map((iteam) => {


            var {time, status, howMuch} = iteam;
            return `
            <span>${status};</span>
            <span>${howMuch}</span>  
            <span>${time}</span>
            `
        
    }).join('');
}


const name = document.getElementById('name');
const surname = document.getElementById('surname');
const number = document.getElementById('number');
const inp_debt = document.getElementById('inp_debt');
const submit = document.getElementById('submit');
const res = document.getElementById('res');
const addUserForm = document.getElementById('addUserForm');
const calculateBar = document.getElementById('calculateBar');
const add = document.getElementById('add');
const debt_bar = document.getElementById('debt_bar');
const res2 = document.getElementById('res2');
const enter = document.getElementById('enter');
const bank_users = JSON.parse(localStorage.getItem("bankUsers")) ?? [
    {   id: new Date().getTime(),
        name: "Firdavs",
        surname: "Rustamov",
        number: +998915682148,
        debt: 22000
    },

]
function dateHandler() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() +1;
    var day = new Date().getDate();
    return `${day}.${month}.${year}`
  }
addUserForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(name.value.trim() == "" ||
    surname.value.trim() == "" ||
    number.value.trim() == "" ||
    inp_debt.value.trim() == ""
    ) {
        alert('Enter full information of user')
    }
    else{
     bank_users.push(
        {   id: new Date().getTime(),
            name: name.value,
            surname: surname.value,
            number: number.value,
            debt: +inp_debt.value,
            history: [{
                time: dateHandler(),
                status: 'add debt',
                howMuch: 2000
            }
            ]
        });
        showResults(bank_users);
        name.value = "";
        surname.value = "";
        number.value = "";
        inp_debt.value = "";
    }
});
function showResults(arr) {
    localStorage.setItem("bankUsers", JSON.stringify(bank_users))
    res.innerHTML = "";
    for(let i = 0; i < arr.length; i++) {
        const val = arr[i];
        res.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${val.name}</td>
        <td>${val.surname}</td>
        <td>${val.number}</td>
        <td onclick="debts(${val.id})">${val.debt}</td>
        <td>
        <input type="number"  id="money${val.id}" placeholder="Enter action">
        <button id="plus" onclick="plus(${val.id})">+</button> 
        <button id="minus" onclick="minus(${val.id})">-</button>
        <button id="del" onclick="deletee(${val.id})">delete</button>
        </td>
        </tr>`;
        
    }
}

function plus(id) {
    const money = document.getElementById(`money${id}`); 
    bank_users.forEach((user) => {
        if(user.id == id) {
            user.debt += +money.value;
            user.history.push({
                time: dateHandler(),
                status: 'add debt',
                howMuch: money.value
            })
            showResults(bank_users)
        }
    })
    
}
function minus(id) {
    const money = document.getElementById(`money${id}`); 
    bank_users.forEach((user) => {
        if(user.id == id) {
            user.debt -= +money.value;
            user.history.push({
                time: dateHandler(),
                status: 'remove debt',
                howMuch: money.value
            })
            showResults(bank_users)
        }
    })
    
}
function deletee(id) {
    for(let i = 0; i < bank_users.length; i++)
    if(bank_users[i].id == id){
        bank_users.splice(i, 1);
        showResults(bank_users)
        break;
    }
}
showResults(bank_users)
