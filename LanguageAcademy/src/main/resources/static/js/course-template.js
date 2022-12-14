$(document).ready(function () {
  document.title = "Course - " + localStorage.code;
  loadData();
  validateRole("STUDENT");
  getImg();
});


 
const iframes = [
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/1lVqOZ4FKQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/jxsg3EN_EZs?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/P3FloKSln5k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/hWzmwCbz6ow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/wEI_O8Ugid0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/0hp7GuJaD64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
];

$(".dropdown-item").click(function (e) {
  e.preventDefault();
  const div = document.querySelector(".content-right");

  div.classList.remove("animate__fadeInLeft");
  div.classList.remove("animate__fadeOutLeft");

  div.classList.add("animate__fadeInLeft");
  $(".content-right").toggle();

  const teo = [
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur mollitia eveniet dignissimos similique praesentium, quis inventore ex, hic debitis iste doloribus officiis perferendis aliquid veniam natus deserunt fugit commodi quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolorem minus praesentium illo sunt odio, voluptatem error optio voluptates, repellendus rerum, ad dolore perspiciatis. Molestias voluptas at non impedit pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam expedita necessitatibus, atque quos esse omnis iusto quod nemo ipsa placeat amet facere ipsum. Suscipit ipsam temporibus omnis amet, inventore alias?",
  ];

  document.querySelector(".video-container").innerHTML =
    iframes[randomNumber()];
  document.querySelector("#theme").innerHTML = "Lorem";
  document.querySelector("#teory").innerHTML = teo;
});

function randomNumber() {
  return Math.ceil(Math.random() * (6 - 0) + 0);
}

async function validateQuizP1() {
  let nota1 = 0;
  let nota2 = 0;
  let nota3 = 0;

  $("#sandwich-q").val().toLowerCase() == "a"
    ? (nota1 += 1.666)
    : (nota1 = nota1);
  $("#ambulance-q").val().toLowerCase() == "an"
    ? (nota1 += 1.666)
    : (nota1 = nota1);
  $("#moon-q").val().toLowerCase() == "the"
    ? (nota1 += 1.666)
    : (nota1 = nota1);
  console.log(Math.round(nota1));

  $("#james1-q").val().toLowerCase() == "flight attendant"
    ? (nota2 += 2.5)
    : (nota2 = nota2);
  $("#james2-q").val().toLowerCase() == "travels a lot"
    ? (nota2 += 2.5)
    : (nota2 = nota2);
  console.log(Math.round(nota2));

  if (document.getElementById("tv_false").checked) {
    nota3 += 2.5;
  } else {
    nota3 = nota3;
  }

  if (document.getElementById("tv1_true").checked) {
    nota3 += 2.5;
  } else {
    nota3 = nota3;
  }
  console.log(Math.round(nota3));

  const data = JSON.stringify({
    student: { id: "1", email: localStorage.email },
    course: { code: localStorage.code },
    note1: nota1,
    note2: nota2,
    note3: nota3,
  });

  const request = await fetch("/api/notes", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  request.ok
    ? showAlert(
        "success",
        "Your test result has been sent to your teacher 😉.",
        "4000"
      )
    : showAlert("danger", "There was an error", "4000");

  setTimeout(() => {
    location.reload();
  }, 4000);
}

// function form_valid(input1, input2, input3){
//   // const loader = document.querySelector(".custom-loader-container");
//   // const check = document.querySelector(".bi-check-lg")
//   // if (sanwich_a_valid, ambulance_a_valid, moon_a_valid) {
//   //   loader.style.display = "none";
//   //   check.style.display = "block"
//   // }else{
//   //   loader.style.display = "block";
//   //   check.style.display = "none"
//   // }
//   // let note1;
//   // let note2;
//   // let note3;

//   // if (sanwich_a_valid) {
//   //   note1 += 1.666;
//   // }

//   // if (ambulance_a_valid) {
//   //   note1 += 1.666;
//   // }

//   // if (moon_a_valid) {
//   //   note1 += 1.666;
//   // }

//   alert("Siuu")
// }

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
      email: localStorage.email,
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
 

  let a = `<a href="${response[0][5]}"target="_blank">Pensum<a>`;
  console.log(a.includes("null"));

  if (a.includes("null")) {
    a = `<a href="#">Pensum<a>`;
    showAlert("warning", "This course doesn't have a pensum");
  }

  document.getElementById("course-name").innerHTML = response[0][0];
  document.getElementById("course-code").innerHTML = response[0][1];
  // document.getElementById("course-des").innerHTML = response[0][2];
  document.getElementById("course-group").innerHTML = response[0][3];
  document.getElementById("course-teacher").innerHTML = response[0][4];
  document.getElementById("pensum").outerHTML = a;
}

async function getImg(){
  const img = await fetch("/api/courses/img/" + localStorage.code, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  
  if(img.ok){
    let resp = await img.text();
    let imga = `<img src="${resp}" class="img-fluid" alt="" width="300px"/>`
    $(".img-container").html(imga);
  }

}
