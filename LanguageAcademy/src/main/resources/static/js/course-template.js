$(document).ready(function () {
  document.title = "Course - " + localStorage.code;
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
    '<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">Grammar Test</button><form class="dropdown-menu p-4"><span>Complete the sentences with \'a\', \'an\' or \'the\', or \'-\' if no article is needed.</span><br><br><div class="mb-3"><span>Do you want <input type="text" class="form-control" id="sandwich-q"> sandwich?</span></div><div class="mb-3"><span>She wants to be <input type="text" class="form-control" id="ambulance-q"> ambulance driver when she finishes school.</span></div><div class="mb-3"><span>Did you see <input type="text" class="form-control" id="ambulance-q"> moon last night?</span></div></form>';

  document.querySelector(".video-container").innerHTML = iframe;
  document.querySelector("#theme").innerHTML = $("#g-articles").text() + ":";
  document.querySelector("#teory").innerHTML = teo;
  document.querySelector("#quiz").innerHTML = quiz;
});

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
    location.href = "login.html"
});
