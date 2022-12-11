$(document).ready(function () {
  loadStudents();
  validateForm();
  offcanvasData();
  onChangeValidation();
  validateRole("ADMIN");
});


// function validateRole() {
//   localStorage.role != "ADMIN" ? location.href = '401.html' : true;
// }

$("#submitBtn").click(function (e) {
  e.preventDefault();
  const form = document.getElementById("form1");
  if (form.checkValidity()) {
    registerStudent();
  } else {
    showAlert("danger", "You must complete correctly the form");
  }
});

let studentsToModify;
var groupsModify = new Map();

async function loadStudents() {
  const request = await fetch("api/students", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const studentsHTML = await request.json();
  let listHTML = "";

  for (let it_students of studentsHTML) {
    btnDelete =
      "<button onclick=deleteStudents(" +
      it_students.id +
      ') class="btn btn-outline-danger btn-sm px-2 rounded">Delete</button>';
    let btnEdit =
      "<button onclick=getCourse(" +
      it_students.id +
      ') data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn btn-outline-danger btn-sm rounded">Groups</button>';
    let student = {
      id: it_students.id,
      name: it_students.name,
      email: it_students.email,
      address: it_students.address,
      phoneNumber: it_students.phoneNumber,
    };
    let name = it_students.name;
    let btnView =
      "<button onclick=viewInfo(" +
      it_students.id +
      ') data-bs-toggle="modal" data-bs-target="#viewModal" class="btn btn btn-outline-danger btn-sm rounded">View info</button>';

    let studentsHTML =
      "<tr>\n\
                        <td>" +
      it_students.id +
      "</td>\n\
                        <td>" +
      it_students.name +
      "</td>\n\
                        <td>" +
      btnDelete +
      btnEdit +
      btnView +
      "</td>\n\
                        </tr>";
    listHTML += studentsHTML;
  }

  document.querySelector("#tableStudents tbody").outerHTML = listHTML;
}

async function registerStudent() {
  $("#loader").toggle();
  const request = await fetch("/api/student", {
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
      roleName: "STUDENT",
    }),
  });

  if (request.ok) {
    showAlert("success", "Enrollment Done", "2000");
    $("#loader").toggle();
  } else {
    showAlert("danger", "There was an error", "2000");
  }

  setTimeout(() => {
    location.reload();
  }, 4000);
}

async function viewInfo(id) {
  const request = await fetch("api/student/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resp = await request.json();
  document.getElementById("nameStudent").innerHTML = resp.name;
  document.getElementById("idStudent").innerHTML = resp.id;
  document.getElementById("mailStudent").innerHTML = resp.email;
  document.getElementById("phoneStudent").innerHTML = resp.phoneNumber;
  document.getElementById("adressStudent").innerHTML = resp.address;
}

async function getCourse(id) {
  const request = await fetch("/api/students/course/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let resp = await request.json();
  let htmlCode = "";
  let name = "";
  let options = "";
  groupsModify.clear;
  for (const iterator of resp) {
    if (resp[0].desc != null) {
      name = resp[0].name;
      htmlCode = "<h2 class='text-balck'>" + resp[0].desc + "</h2>";
    } else {
      let idLabel = "h2" + iterator[3];
      let option =
        "<select name='" +
        id +
        "Name' class='form-select' aria-label='Default select example' id='" +
        iterator[1] +
        "'>" +
        getGroup(iterator[1]) +
        "</select>";
      let label =
        "<div class='courseCompleted'>\n\
                            <div class='card-headerCompleted'>\n\
                            <label id='" +
        iterator[3] +
        "' class='text-balck' for='" +
        id +
        "'><strong>Course: </strong>" +
        iterator[0] +
        "</label>\n\
                            <br><label class='text-balck' id='" +
        idLabel +
        "'></label>\n\
                                <div class='codCompletedCourse'>\n\
                                    " +
        option +
        "\n\
                                </div>\n\
                            </div>\n\
                        </div>";
      let groupOne = getGroupOne(id, iterator[1], idLabel);
      console.log(groupOne);
      options += label;
      htmlCode = options;
      name = resp[0][2];
      groupsModify.set(iterator[0], iterator[1]);
    }
  }
  document.getElementById("selectors").innerHTML = htmlCode;
  document
    .getElementById("buttonContainer")
    .setAttribute("onclick", "modifyStudent(" + id + ")");
  document.getElementById("studentNameUpdate").innerHTML = "Student: " + name;
}

async function getGroupOne(id, idCourse, id_html) {
  const request = await fetch("/api/students/group/" + id + "-" + idCourse, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let resp = await request.json();
  let options = "";
  for (const iterator of resp) {
    if (document.getElementById(iterator[0]) != null) {
      document.getElementById(iterator[0]).selected = true;
    }
    const iterator1 = iterator.join(" - ");
    let option = iterator1;
    options = option;
  }
  if (options == "") {
    document.getElementById(id_html).innerHTML = "no group assigned, select:";
  } else {
    document.getElementById(id_html).innerHTML =
      "<strong>Current group:</strong> " +
      options +
      "<br> <strong>Change to: </strong>";
  }
}

async function getGroup(idCourse) {
  const request = await fetch("/api/students/groups/" + idCourse, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let resp = await request.json();
  let options = "";
  for (const iterator of resp) {
    const iterator1 = iterator.join(" - ");
    let option =
      "<option value='" +
      iterator[0] +
      "' id='" +
      iterator[0] +
      "'>" +
      iterator1 +
      "</option>";
    options += option;
  }
  document.getElementById(idCourse).innerHTML = options;
}

async function deleteStudents(id) {
  const request = await fetch("api/student/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  request.ok
    ? showAlert(
        "success",
        "The student has been successfully deleted. 😁",
        "4000"
      )
    : showAlert("danger", "This student is doing a course, you canot delete him", "4000");

  setTimeout(() => {
    location.reload();
  }, 4000);
}

async function modifyStudent(id) {

  var groupsNew = new Map();
  for (var [key, value] of groupsModify) {
    var option = document.getElementById(value);
    var content = option.value;
    groupsNew.set(value, content);
  }
  const out = Object.create(null);
  groupsNew.forEach((value, key) => {
    if (value instanceof Map) {
      out[key] = map_to_object(value);
    } else {
      out[key] = value;
    }
  });
  console.log(JSON.stringify({ out }));
  const request = await fetch("/api/students/group/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(out),
  });

  request.ok
    ? showAlert("success", "Group Updated 😁", "4000")
    : showAlert("danger", "There was an error");

    setTimeout(() => {
        location.reload();
    }, 4000);
}

// Enrollment validation
async function offcanvasData() {
  let resp = "";
  let options = "";

  if (!$("#selectCourse :selected").val() != undefined) {
    validateCourseSelect();
  }

  const students = await fetch("/api/students/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  resp = await students.json();

  options = "<option>Please select a student:</option>";
  for (const iterator of resp) {
    let option = `<option>${iterator.id} - ${iterator.name}</option>`;
    options += option;
  }

  $("#selectStudent").html(options);

  const courses = await fetch("/api/courses/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  resp = await courses.json();

  options = "<option>Please select a course:</option>";
  for (const iterator of resp) {
    let option = `<option>${iterator[0]}</option>`;
    options += option;
  }

  $("#selectCourse").html(options);
}

function validateCourseSelect() {
  $("#selectGroup").attr("disabled", "true");

  $("#selectCourse").change(async function (e) {
    e.preventDefault();
    flag = $("#selectCourse :selected").val();

    switch (flag) {
      case undefined:
        showAlert("warning", "You must select a course");
        $("#selectGroup").attr("disabled", "true");
        break;
      case "Please select a course:":
        showAlert("warning", "You must select a course");
        $("#selectGroup").attr("disabled", "true");
        break;
      default:
        const groups = await fetch("/api/groups/" + flag, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        resp = await groups.json();

        options = "<option>Please select a group:</option>";
        for (const iterator of resp) {
          let option = `<option>${iterator[0]} - ${iterator[1]}</option>`;
          options += option;
        }

        if (options.length == 39) {
          options = `<option>This course doesn't have groups yet</option>`;
        }

        $("#selectGroup").html(options);

        $("#selectGroup").removeAttr("disabled");
        break;
    }
  });
}

function onChangeValidation() {
  const selects = document.querySelectorAll("select");

  selects.forEach((select) => {
    $(select).change(function (e) {
      e.preventDefault();
      let groupFlag = $("#selectGroup :selected").val();
      let courseFlag = $("#selectCourse :selected").val();
      let studentFlag = $("#selectStudent :selected").val();

      validateSelects(studentFlag, courseFlag, groupFlag);
    });
  });
}

function validateSelects(student, course, group) {
  if (student == "Please select a student:") {
    $("#selectStudent").addClass("is-invalid");
    $("#selectStudent").removeClass("is-valid");
  } else {
    $("#selectStudent").removeClass("is-invalid");
    $("#selectStudent").addClass("is-valid");
  }

  if (
    group == "Please select a group:" ||
    group == "This course doesn't have groups yet" ||
    group == undefined
  ) {
    $("#selectGroup").addClass("is-invalid");
    $("#selectGroup").removeClass("is-valid");
  } else {
    $("#selectGroup").removeClass("is-invalid");
    $("#selectGroup").addClass("is-valid");
  }

  if (course == "Please select a course:") {
    $("#selectCourse").addClass("is-invalid");
    $("#selectCourse").removeClass("is-valid");
  } else {
    $("#selectCourse").removeClass("is-invalid");
    $("#selectCourse").addClass("is-valid");
  }
}

$("#btn-submit").click(async function (e) {
  e.preventDefault();

  let studentSelect = $("#selectStudent").hasClass("is-invalid");
  let courseSelect = $("#selectCourse").hasClass("is-invalid");
  let groupSelect = $("#selectGroup").hasClass("is-invalid");

  console.log();

  if (
    studentSelect ||
    courseSelect ||
    groupSelect ||
    $("#selectStudent").val() == "Please select a student:" ||
    $("#selectCourse").val() == "Please select a course:"
  ) {
    showAlert("danger", "You must complete correctly the form");
  } else {
    const timesValidation = await fetch("/api/enrollments/times", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: { code: $("#selectCourse").val() },
        student: { id: $("#selectStudent :selected").text().split("-")[0] },
      }),
    });

    const times = await timesValidation.json();

    if (times == 1) {
      showAlert(
        "warning",
        "The student already done or are doing this course",
        "3000"
      );
    } else {
      $("#loader").toggle();
      const lostValidation = await fetch("/api/enrollments/lost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: { code: $("#selectCourse").val() },
          student: { id: $("#selectStudent :selected").text().split("-")[0] },
        }),
      });

      const lost = await lostValidation.json();

      if (lost == 2) {
        showAlert(
          "danger",
          "The student has already seen this course more than twice",
          "3000"
        );
      } else {
        const enrollment = await fetch("/api/enrollment/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: { code: $("#selectCourse").val() },
            group: {
              groupCode: $("#selectGroup :selected").text().split("-")[0],
            },
            student: { id: $("#selectStudent :selected").text().split("-")[0] },
            status: "IN PROGRESS",
          }),
        });
        if (enrollment.ok) {
          showAlert("success", "Enrollment Done", "2000");
          $("#loader").toggle();
        } else {
          showAlert("danger", "Complete the form error", "2000");
        }

        setInterval(() => {
          location.reload()  
        }, 2000);
      }
    }
  }
});
