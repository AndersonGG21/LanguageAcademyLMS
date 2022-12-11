$(document).ready(function () {
  $(".download-button").click(function () {
    $("#content").printThis({
      importCSS: true,
      importStyle: true,
      printContainer: true,
      header: "<h1>Students List</h1>",
    });
  });

  validateRole("TEACHER");
});

var resp = [];

$(document).ready(function () {
  loadStudents();
});

async function loadStudents() {
  const request = await fetch("api/teacher-students/" + localStorage.email, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const studentsHTML = await request.json();

  let listHTML = "";

  for (let it_students of studentsHTML) {
    const btnGrade =
      '<button class="btn btn btn-outline-danger btn-sm" style="margin-left: 5px;" onclick=offcanvasData(' +
      it_students[0] +
      "," +
      '"' +
      it_students[4] +
      '")>Grade</button>';

    it_students[5] == null ? (it_students[5] = "-") : true;
    it_students[6] == null ? (it_students[6] = "-") : true;
    it_students[7] == null ? (it_students[7] = "-") : true;

    let studentsHTML =
      "<tr>\n\
                       <td>" +
      it_students[0] +
      "</td>\n\
                       <td>" +
      it_students[1] +
      "</td>\n\
                       <td>" +
      it_students[2] +
      "</td> \n\
                       <td>" +
      it_students[3] +
      "</td> \n\
                       <td>" +
      it_students[4] +
      "</td> \n\
                       <td>" +
      it_students[5] +
      "</td> \n\
                       <td>" +
      it_students[6] +
      "</td> \n\
                       <td>" +
      it_students[7] +
      "</td> \n\
                       <td>" +
      it_students[8] +
      "</td> \n\
                       <td>" +
      btnGrade +
      "</td> \n\
                       </tr>";
    listHTML += studentsHTML;
  }
  document.querySelector("#tableStudents tbody").outerHTML = listHTML;
}

$(".btnClose").click(function (e) {
  e.preventDefault();
  $("#card-modal").toggle();
  location.reload()
});

async function offcanvasData(student, course) {
  $("#card-modal").toggle();
  console.table(student, course);
  const data = JSON.stringify({
    student: { id: student },
    course: { code: course },
  });

  const request = await fetch("api/enrollment/v1", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  let response = await request.json();
  console.log(response.length);
    let note1 = 0;
    let note2 = 0;
    let note3 = 0;
  
  if (response.length == 0) {
    showAlert("warning", "This student doesn't have notes yet", "4000");
  } else {
    note1 = response[0][4];
    note2 = response[0][5];
    note3 = response[0][6];

    $("#note1").html(note1);
    $("#note2").html(note2);
    $("#note3").html(note3);
  }

  $("#resul").click(function (e) {
    e.preventDefault();
    if (note1 == 0) {
      showAlert("warning", "You can grade this student because one or more notes left", "4000");

    }else{
      prom = (note1 + note2 + note3) / 3;
      $("#prom").html(prom.toFixed(2));
      $("#reprove-btn").toggle();
      $("#approve-btn").toggle();
    }
  });

  $("#approve-btn").click(async function (e) { 
    e.preventDefault();
    $("#loader").toggle();
    const approve = await fetch("api/approve", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (approve.ok) {
      showAlert("success", "The grade has been sent to the student correctly 👍🏻", "4000");
      $(".lds-ring").toggle();
    }else{
      showAlert("warning", "There was an error 😕", "4000");
      $(".lds-ring").toggle();
    }

    setInterval(() => {
      location.reload()  
    }, 4000);
    
  });

  $("#reprove-btn").click(async function (e) { 
    e.preventDefault();
    $("#loader").toggle();
    const reprove = await fetch("api/reprove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (reprove.ok) {
      showAlert("success", "The grade has been sent to the student correctly 👍🏻", "4000");
      $(".lds-ring").toggle();
    }else{
      showAlert("warning", "There was an error 😕", "4000");
      $(".lds-ring").toggle();
    }

    setInterval(() => {
      location.reload()  
    }, 4000);
  });
}

function showData(name, email, phone, course, times) {
  $("#card-modal").toggle();
  times = `This student has viewed the course "${course}" ${times} times`;
  phone = `Phone Number: ${phone}`;
  $("#phone-number").html(phone);
  $("#email").html(email);
  $("#name").html(name);
  $("#times").html(times);
}
