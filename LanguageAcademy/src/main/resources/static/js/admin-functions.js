$(document).ready(function () {
  loadCourses();
  offcanvasData();

  onChangeValidation();
});

let groupCode;
let courseCode;

$("#logout").click(function (e) {
  e.preventDefault();
  localStorage.clear();
  location.href = "login.html";
});

function setGroupCode(code) {
  groupCode = code;
  getTeachers();
}

async function loadGroups(course) {
  courseCode = course;
  const groupRequest = await fetch("/api/groups/" + course, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const groupsHTML = await groupRequest.json();
  let trs = "";
  for (const iterator of groupsHTML) {
    let item =
      "<tr><td>" +
      iterator[0] +
      "</td><td>" +
      iterator[1] +
      "</td><td>" +
      iterator[2] +
      "</td><td><button class= 'btn btn.edit' data-bs-toggle='modal' data-bs-target='#teacherModal' onclick=setGroupCode('" +
      iterator[0] +
      "')><i class='bi bi-pen'></i></button></td></tr>";
    trs += item;
  }
  document.getElementById("groupTableBody").innerHTML = trs;
}

async function loadCourses() {
  const request = await fetch("/api/courses", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const coursesHTML = await request.json();

  let list = "";

  for (const iterator of coursesHTML) {
    let card =
      "<div class='card' style='width: 18rem'>\n\
                        <div class='card-left'>\n\
                            <div class='row g-0'>\n\
                            <div class='col-md-4 img-container'>\n\
                            <img src='/imgs/ena1.png' class='img-fluid rounded-start' alt='...'/>\n\
                        </div>\n\
                        <div class='col-md-8'>\n\
                        <div class='card-body'>\n\
                        <h5 class='card-title' style='display: inline-block;'>" +
      iterator[3] +
      "</h5>\n\
                        <a href='https://www.politecnicojic.edu.co/images/downloads/facultades/ingenieria/programa-ingenieria-informatica-plan-10.jpg' target='_blank' rel='noopener noreferrer' style='display: inline-block; margin-left: 10px;'>(See the pensum of this course)</a>\n\
                        <p class='card-text'>" +
      iterator[1] +
      "</p>\n\
                        <h6>Actions:</h6>\n\
                        <button class='btn btn-danger' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample' onclick=loadGroups('" +
      iterator[0] +
      "')>Groups</button>\n\
                        <button class='btn btn-dark' style='width: 200px;' data-bs-toggle='modal' data-bs-target='#ModalCourse" +
      iterator[0] +
      "' data-bs-whatever='@mdo'>Subjects</button>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                </div>";
    list += card;
  }
  document.getElementById("prueba").innerHTML = list;
}

async function assignTeacher(groupCode, idTeacher) {
  let teacher = {
    id: idTeacher,
  };

  const request = await fetch("/api/groups/" + groupCode, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teacher,
    }),
  });
}

async function getTeachers() {
  const request = await fetch("/api/teachers/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let resp = await request.json();

  let options = "<option>Please select a teacher:</option>";
  for (const iterator of resp) {
    const iterator1 = iterator.join(" - ");
    let option = "<option>" + iterator1 + "</option>";
    options += option;
  }

  document.getElementById("selectTeacher").innerHTML = options;
  document.getElementById("selectTeacherName").innerHTML = options;
}

async function prueba() {
  const splitted = $("#selectTeacher :selected").text().split(" - ");
  if (splitted == "" || splitted == "Please select a teacher:") {
    alert("You must select a teacher");
  } else {
    assignTeacher(groupCode, splitted[0]);
    location.reload();
  }
}

async function createGroup() {
  const splitted = $("#selectTeacherName :selected").text().split(" - ");
  if (splitted == "" || splitted == "Please select a teacher:") {
    alert("Esoge un teacher");
  } else {
    let teacher = {
      id: splitted[0],
    };

    let course = {
      code: courseCode,
    };

    const request = await fetch("/api/groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupCode: document.getElementById("groupCodeInput").value,
        groupName: document.getElementById("groupNameInput").value,
        teacher,
        course,
      }),
    });

    if (request.status == 200) {
      alert("Group Created");
      $("#grgroupTableBody").toggle();
      $("#grgroupTableBody").toggle();
    }
  }
}

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

  if (studentSelect || courseSelect || groupSelect) {
    showAlert("danger", "You must complete correctly the form");
  } else {

    
    const enrollment = await fetch("/api/enrollment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: {code: $("#selectCourse").val()},
        group: {groupCode: $("#selectGroup :selected").text().split("-")[0]},
        student: {id:$("#selectStudent :selected").text().split("-")[0]},
        status: "IN PROGRESS"
      }),
    });

    if (enrollment.ok) {
        showAlert("success", "Enrollment Done", "2000")
    }else{
        showAlert("danger", "There was an error", "2000")
    }
  }
});
