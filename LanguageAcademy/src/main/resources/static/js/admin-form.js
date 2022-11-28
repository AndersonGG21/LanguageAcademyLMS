$(document).ready(function () {
    validate();
    // validateRole();
});

$("#submitBtn").click(function (e) {
  e.preventDefault();
  registerAdmin();
});

function validate() {
  (() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            registerTeacher();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
}

function validateRole() {
  if (localStorage.role != "ADMIN") {
    location.href = "401.html";
  }
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
      email: document.getElementById("inputEmail").value, 
      password: document.getElementById("inputPass").value,
      name: document.getElementById("inputName").value, 
      phoneNumber: document.getElementById("inputPhone").value,
      roleName: "ADMIN",
    }),
  });

  request.ok ? showAlert('success','Admin Registered','2000') : showAlert('warning','There was an error','2000')


  setTimeout(() => {
    $("#form").trigger("reset");
  }, "2000");
  
}


function showAlert(type, message, duration) {
    if (!message) return false;
    if (!type) type = "info";
  
    let icon = "";
  
    switch (type) {
      case "success":
        icon = "<i class='bi bi-check-circle-fill'></i>";
        break;
      case "warning":
        icon = "<i class='bi bi-exclamation-triangle-fill'></i>";
        break;
      default:
        break;
    }
    $(
      "<div class='alert alert-message alert-" +
        type +
        " data-alert alert-dismissible'>" +
        icon +
        message +
        " </div>"
    )
      .hide()
      .appendTo("body")
      .fadeIn(300);
    if (duration === undefined) {
      duration = 5000;
    }
    if (duration !== false) {
      $(".alert-message")
        .delay(duration)
        .fadeOut(500, function () {
          $(this).remove();
        });
    }
  }
  
