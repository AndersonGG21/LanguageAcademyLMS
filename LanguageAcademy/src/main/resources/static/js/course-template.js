$(document).ready(function () {
  document.title = "Course - " + localStorage.code;
  loadData();
});

$("#g-articles").click(function (e) {
  e.preventDefault();
  const div = document.querySelector(".content-right");

  div.classList.remove("animate__fadeInLeft");
  div.classList.remove("animate__fadeOutLeft");

  div.classList.add("animate__fadeInLeft");
  $(".content-right").toggle();

  const iframe =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/jxsg3EN_EZs?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  const teo =
    "Basically, articles are either definite or indefinite. They combine to a noun to indicate the typeof reference being made by the noun.<br>The definite article is the.The indefinite article is a / an.The article a / an is used when we don't specify the things or people we are talking about:<br><ul><li>I met <b>a</b> friend.</li><li>I work in <b>a</b> factory in New York.</li><li>I borrowed <b>a</b> pencil from a passenger sitting next to me.</li></ul>";

  const quiz =
    '<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">Grammar Test</button><form class="dropdown-menu p-4"><span>Complete the sentences with \'a\', \'an\' or \'the\', or \'-\' if no article is needed.</span><br><br><div class="mb-3"><span>Do you want <input type="text" class="form-control" id="sandwich-q"> sandwich?</span></div><div class="mb-3"><span>She wants to be <input type="text" class="form-control" id="ambulance-q"> ambulance driver when she finishes school.</span></div><div class="mb-3"><span>Did you see <input type="text" class="form-control" id="moon-q"> moon last night?</span></div><div class="custom-loader-container animate__animated animate__fadeInLeft"><div class="custom-loader"></div><span>Keep Trying</span></div><i class="bi bi-check-lg animate__animated animate__fadeInLeft">Congrats!</i></form>';

  document.querySelector(".video-container").innerHTML = iframe;
  document.querySelector("#theme").innerHTML = $("#g-articles").text() + ":";
  document.querySelector("#teory").innerHTML = teo;
  document.querySelector("#quiz").innerHTML = quiz;

  const sanwich_a = document.getElementById("sandwich-q");
  const ambulance_a = document.getElementById("ambulance-q");
  const moon_a = document.getElementById("moon-q");

  sanwich_a.oninput = function () {
    if (this.value == "a") {
      sanwich_a_valid = true;
    }else{
      sanwich_a_valid = false;
    }
    form_valid(sanwich_a_valid, ambulance_a_valid, moon_a_valid);
  }

  ambulance_a.oninput = function () {
    if (this.value == "an") {
      ambulance_a_valid = true;
    }else{
      ambulance_a_valid = false;
    }
    form_valid(sanwich_a_valid, ambulance_a_valid, moon_a_valid);
  }

  moon_a.oninput = function () {
    if (this.value == "the") {
      moon_a_valid = true;
    }else{
      moon_a_valid = false;
    }
    form_valid(sanwich_a_valid, ambulance_a_valid, moon_a_valid);
  }

});

function form_valid(sanwich_a_valid, ambulance_a_valid, moon_a_valid){
  const loader = document.querySelector(".custom-loader-container");
  const check = document.querySelector(".bi-check-lg")
  if (sanwich_a_valid, ambulance_a_valid, moon_a_valid) {
    loader.style.display = "none";
    check.style.display = "block"
  }else{
    loader.style.display = "block";
    check.style.display = "none"
  }
}

$(".close-btn").click(function (e) {
  const div = document.querySelector(".content-right");
  div.classList.remove("animate__fadeOutLeft");
  div.classList.remove("animate__fadeInLeft");
  div.classList.add("animate__fadeOutLeft");

  setTimeout(() => {
    $(".content-right").toggle();
  }, 1000);
});

$("#logout").click(function (e) {
  e.preventDefault();
  localStorage.clear();
  location.href = "login.html";
});

async function loadData() {
  const data = JSON.stringify({
    student: {
      email: "mateo@elpoli.edu.co",
    },
    course: {
      code: localStorage.code,
    },
  });

  const request = await fetch("/api/enrollments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  const response = await request.json();
  console.log(response);

  let a =  `<a href="${response[0][5]}"target="_blank">Pensum<a>`
  console.log(a.includes("null"));

  if (a.includes("null")) {
    a = `<a href="#">Pensum<a>`
    showAlert('warning', "This course doesn't have a pensum");
  }
 
  $("#mondo").click(function (e) { 
    e.preventDefault();
    
  });


  document.getElementById("course-name").innerHTML = response[0][0];
  document.getElementById("course-code").innerHTML = response[0][1];
  // document.getElementById("course-des").innerHTML = response[0][2];
  document.getElementById("course-group").innerHTML = response[0][3];
  document.getElementById("course-teacher").innerHTML = response[0][4];
  document.getElementById("pensum").outerHTML = a;
}

function showAlert(type, message, duration) {
  if (!message) return false;
  if (!type) type = 'info';
  $("<div class='alert alert-message alert-" +
      type +
      " data-alert alert-dismissible'>" +
      "<i class='bi bi-exclamation-triangle-fill'></i>" +
      message + " </div>").hide().appendTo('body').fadeIn(300);
  if (duration === undefined) {
      duration = 5000;
  }
  if (duration !== false) {
      $(".alert-message").delay(duration).fadeOut(500, function() {
          $(this).remove();
      });
  }
}
// Trigger the alert with function
// showAlert('success', 'Oh yeah! Chido buana');

// ...or trigger it using a button
$('.btn').on("click", function() {
  var type = $(this).data('type');
  var message = $(this).data('message');
  var duration = $(this).data('duration');
  showAlert(type, message, duration);
});
