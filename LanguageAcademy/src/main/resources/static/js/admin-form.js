$("#sub").click(function (e) { 
    e.preventDefault();
    alert("Siu")
    registerAdmin();    
});

async function registerAdmin() {
    let data = {
        id: document.getElementById("inputID").value,
        email : document.getElementById("exampleInputEmail1").value,
        password: document.getElementById("exampleInputPassword1").value,
        name : document.getElementById("inputName").value,
        phoneNumber: document.getElementById("inputPhone").value,
        roleName : "ADMIN"
    }

    // console.log(document.getElementById("exampleInputEmail1").value)

    const request = await fetch('/api/admins', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById("inputID").value,
            email : document.getElementById("exampleInputEmail1").value,
            password: document.getElementById("exampleInputPassword1").value,
            name : document.getElementById("inputName").value,
            phoneNumber: document.getElementById("inputPhone").value,
            profession: "DEVELOPER",
            roleName : "ADMIN"
        })
    });
}