$("#sub").click(function (e) { 
    e.preventDefault();
    //login();
    shake();
});


async function login() {
    const user = await fetch('/api/users/' + document.getElementById("exampleInputEmail1").value, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let uArray = await user.json();

    let roleName = uArray.roleName;

    const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email : document.getElementById("exampleInputEmail1").value,
            password: document.getElementById("exampleInputPassword1").value,
            roleName: roleName,
            profession: "DEVELOPER"
        })
    });
    const resp = await request.text();
    if(resp == 'FAIL'){
        alert("Usuario o contraseña invalida");
    }else{
        localStorage.role = roleName;
        localStorage.token = resp;     
        
        if (roleName == "ADMIN") {
            location.href = "admin-courses.html"
        }
    }
}

let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");

//const email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//const email_reg = /[a-z0-9._%+-]+@\.+[//b@elpoli.edu.co//b]{2,}$/
const email_reg = /(\W|^)[\w.\-]{0,25}@(elpoli)\.edu.co(\W|$)/
email.addEventListener('input', validate);
password.addEventListener('input', validate);

async function shake() {
    if (email.classList.contains("invalid")) {
        email.classList.add("animate__shakeX")
    }
    if (password.classList.contains("invalid")) {
        password.classList.add("animate__shakeX")
    }
    
    if (email.classList.contains("invalid") || password.classList.contains("invalid")) {
        alert("wrong email and/or password")
    }

    if (!email.classList.contains("invalid") && !password.classList.contains("invalid")){
        console.log("Login");
        login();
    }

    setTimeout(() => {
        email.classList.remove("animate__shakeX")
        password.classList.remove("animate__shakeX")
    }, "2000")
}

function validate(e) {
     let target = e.target;

    if (target.name == "email") {
        if (email_reg.test(target.value)) {
            target.style.color = 'green'
            target.style.setProperty('borderColor', 'green')
            target.classList.add("valid")
            target.classList.remove("invalid")
        }else{
            target.style.color = '#f59e0b'
            target.style.setProperty('borderColor', '#f59e0b')
            target.classList.remove("valid")
            target.classList.add("invalid")
        }
    }else if (target.name = "password"){
        if (target.value.length < 8) {
            target.style.color = '#f59e0b'
            target.classList.remove("valid")
            target.classList.add("invalid")
        }else{
            target.style.color = 'green'
            target.classList.add("valid")
            target.classList.remove("invalid")
        }
    } 
}