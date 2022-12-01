function validateForm() {
  const inputs = document.querySelectorAll("input");
  console.log(inputs);
  const patterns = {
    inputDoc: /.{8,}/,
    username: /^[a-z\d]{5,12}$/i,
    password: /^[\d\w@-]{8,20}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    phone: /.{10,}/,
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      validate(e.target, patterns[e.target.attributes.id.value]);
    });
  });

  function validate(field, regex) {
    if (regex.test(field.value)) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    } else {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    }
  }
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
      icon = "<i class='bi bi-exclamation-triangle-fill'></i>";
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
