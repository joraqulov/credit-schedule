function showinp() {
    var userForm = document.getElementById('userForm');
    userForm.classList.toggle('show');
}
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const number = document.getElementById('number');
const inp_debt = document.getElementById('inp_debt');
const submit = document.getElementById('submit');
const res = document.getElementById('res');
const addUserForm = document.getElementById('addUserForm');
const bank_users = [
    {
        name: "Firdavs",
        surname: "Rustamov",
        number: +998915682148,
        debt: 220000
    },
    {
        name: "Sunnat",
        surname: "Joraqulov",
        number: +998949432242,
        debt: 220000   
    }

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
        {
            name: name.value,
            surname: surname.value,
            number: number.value,
            debt: inp_debt.value
        });
        showResults(bank_users);
        name.value = "";
        surname.value = "";
        number.value = "";
        inp_debt.value = "";
    }
});
function showResults(arr) {
    res.innerHTML = "";
    for(let i = 0; i < arr.length; i++) {
        const val = arr[i];
        res.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${val.name}</td>
        <td>${val.surname}</td>
        <td>${val.number}</td>
        <td>${val.debt}</td>
        </tr>`;
        
    }
}
showResults(bank_users)