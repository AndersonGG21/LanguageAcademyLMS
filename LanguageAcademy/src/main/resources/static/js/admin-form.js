$(document).ready(function () {
  validateRole();
  validateForm();
  console.log(encrypt());
});

// function validateForm() {
//   (() => {
//     "use strict";

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll(".needs-validation");

//     // Loop over them and prevent submission
//     Array.from(forms).forEach((form) => {
//       form.addEventListener(
//         "submit",
//         (event) => {
//           if (!form.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//           } else {
//             registerAdmin();
//           }
//           form.classList.add("was-validated");
//         },
//         false
//       );
//     });
//   })();
// }


// function validateForm() {
//   const inputs = document.querySelectorAll("input");
//   console.log(inputs);
//   const patterns = {
//     inputDoc: /.{8,}/,
//     username: /^[a-z\d]{5,12}$/i,
//     password: /^[\d\w@-]{8,20}$/i,
//     email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
//     phone: /.{10,}/,
//   };

//   inputs.forEach((input) => {
//     input.addEventListener("input", (e) => {
//       validate(e.target, patterns[e.target.attributes.id.value]);
//     });

//   });

//   function validate(field, regex) {
//     if (regex.test(field.value)) {
//       field.classList.remove("is-invalid");
//       field.classList.add("is-valid");
//     } else {
//       field.classList.remove("is-valid");
//       field.classList.add("is-invalid");
//     }
//   }
// }

$("#submitBtn").click(function (e) { 
  e.preventDefault();
  const form = document.getElementById("form");
  if (form.checkValidity()) {
    registerAdmin();
  }else{
    showAlert("danger", "You must complete correctly the form")
  }
});

function validateRole() {
  if (localStorage.role != "ADMIN") {
    location.href = "401.html";
  }
}

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

// function showAlert(type, message, duration) {
//   if (!message) return false;
//   if (!type) type = "info";

//   let icon = "";

//   switch (type) {
//     case "success":
//       icon = "<i class='bi bi-check-circle-fill'></i>";
//       break;
//     case "warning":
//       icon = "<i class='bi bi-exclamation-triangle-fill'></i>";
//       break;
//     default:
//       icon = "<i class='bi bi-exclamation-triangle-fill'></i>";
//       break;
//   }
//   $(
//     "<div class='alert alert-message alert-" +
//       type +
//       " data-alert alert-dismissible'>" +
//       icon +
//       message +
//       " </div>"
//   )
//     .hide()
//     .appendTo("body")
//     .fadeIn(300);
//   if (duration === undefined) {
//     duration = 5000;
//   }
//   if (duration !== false) {
//     $(".alert-message")
//       .delay(duration)
//       .fadeOut(500, function () {
//         $(this).remove();
//       });
//   }
// }
