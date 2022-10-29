$("#sub").click(function (e) { 
    e.preventDefault();
    //alert("Mondongo")
    login();
});

async function login() {

    let roleName = "ADMIN";

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
    }
}