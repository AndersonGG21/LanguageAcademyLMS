$(document).ready(function () {
  loadTeachers();
  validate();
  validateRole();
});

function validateRole() {
  if (localStorage.role != "ADMIN") {
    location.href = "401.html"
  }
}

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

async function loadTeachers() {
  const request = await fetch("/api/teachers/info", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const teacherHTML = await request.json();

  let listHTML = "";

  for (const teacher of teacherHTML) {
    let button = `<button onclick=deleteTeacher(${teacher[0]}) class="delete"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>`;

    let dataTable = `<tr><td>${teacher[0]}</td><td>${teacher[1]}</td><td>${teacher[2]}</td><td>${teacher[3]}</td><td class='td-button'>${button}</td></tr>`;

    listHTML += dataTable;
  }

  document.querySelector("#tableTeachers tbody").innerHTML = listHTML;
}

async function registerTeacher() {
  const request = await fetch("/api/teachers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: document.getElementById("inputDoc").value,
      name: document.getElementById("inputName").value,
      email: document.getElementById("inputEmail").value,
      password: document.getElementById("inputPass").value,
      phoneNumber: document.getElementById("inputPhone").value,
      roleName: "TEACHER",
    }),
  });

  if (request.ok) {
    setTimeout(() => {
      $("#teacherModal").modal("hide");
      showAlert("success", "Teacher created", 1000);
    }, "1000");
  } else {
    setTimeout(() => {
      $("#teacherModal").modal("hide");
      showAlert("warning", "There was a problem", 1000);
    }, "1000");
  }

  refreshPage();
}

async function deleteTeacher(id) {
  const request = await fetch("/api/teachers/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (request.ok) {
    setTimeout(() => {
      showAlert("success", "Teacher deleted", 1000);
    }, "1000");
  }

  refreshPage();
}

function refreshPage() {
  setTimeout(function () {
    location.reload();
  }, 4000);
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
