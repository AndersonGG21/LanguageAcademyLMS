$(document).ready(function () {
  validateRole("ADMIN");
  validateForm();
  console.log(encrypt());
});

$("#submitBtn").click(function (e) { 
  e.preventDefault();
  const form = document.getElementById("form");
  if (form.checkValidity()) {
    registerAdmin();
  }else{
    showAlert("danger", "You must complete correctly the form")
  }
});


function encrypt() {
  let encrypted = CryptoJS.AES.encrypt("AMDIN", "#4a120*M0nd0ng0");
  return encrypted.toString();
}

async function registerAdmin() {
  const request = await fetch("/api/admins", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: document.getElementById("inputDoc").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      name: document.getElementById("username").value,
      phoneNumber: document.getElementById("phone").value,
      roleName: "ADMIN",
    }),
  });

  request.ok
    ? showAlert("success", "Admin Registered", "2000")
    : showAlert("warning", "There was an error", "2000");

  setTimeout(() => {
    location.reload()
  }, "2000");
}


