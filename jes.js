function showinp() {
    var userForm = document.getElementById('userForm');
    userForm.classList.toggle('show');
}
function debts() {
    var debt_bar = document.getElementById('debt_bar');
    debt_bar.classList.toggle('show2');
}
function calculate() {
    var calculateBar = document.getElementById('calculateBar');
    calculateBar.classList.toggle('show3')
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
const money = document.getElementById('money'); 
const bank_users = JSON.parse(localStorage.getItem("bankUsers")) ?? [
    {   id: new Date().getTime(),
        name: "Firdavs",
        surname: "Rustamov",
        number: +998915682148,
        debt: 220000
    },

]
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
            debt: +inp_debt.value
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
        <td onclick="debts()">${val.debt}</td>
        <td>
        <button id="plus" onclick="plus(${val.id})">+</button> 
        <button id="minus" onclick="minus(${val.id})">-</button>
        <button id="del" onclick="deletee(${val.id})">delete</button>
        </td>
        </tr>`;
        
    }
}

function plus(id) {
    const money = document.getElementById('money'); 
    bank_users.forEach((user) => {
        if(user.id == id) {
            user.debt += +money.value;
            showResults(bank_users)
        }
    })
    
}
function minus(id) {
    const money = document.getElementById('money'); 
    bank_users.forEach((user) => {
        if(user.id == id) {
            user.debt -= +money.value;
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


const debt_users = []
enter.addEventListener('click', function(e) {
    e.preventDefault();
    if(add.value.trim() == "") {
        alert("Write how much money you pay")
    }
    else{
     debt_users.push(
        {
            debt: 'debt',
            money: add.value,
            day: new Date().toLocaleString("uz")
        });
        showResults2(debt_users);
        add.value = "";

    }
});
function showResults2(arr) {
    res2.innerHTML = "";
    for(let i = 0; i < arr.length; i++) {
        const val2 = arr[i];
        res2.innerHTML += `
        <span>${val2.debt};</span>
        <span><u>${val2.money}sum</u></span>  
        <span>${val2.day}</span>`;
    }
}
showResults(bank_users)
showResults2(debt_users)