$(document).ready(function () {
  checkAviability();
});

$(".wcs_button").click(function (e) {
  e.preventDefault();
  flag = true;
  $(".wcs_popup").toggle();

  $(".wcs_popup").addClass("animate__fadeInUp");
});

$(".wcs_popup_close").click(function (e) {
  e.preventDefault();
  $(".wcs_popup").removeClass("animate__fadeInUp");
  $(".wcs_popup").addClass("animate__fadeOutDown");
  // $(".wcs_popup").toggle();
  setTimeout(() => {
    $(".wcs_popup").toggle();
    $(".wcs_popup").removeClass("animate__fadeOutDown");
  }, 1000);
});

$(".btn-send").click(function (e) {
  e.preventDefault();
  if ($("#msg-body").val() != '') {
    const WhatsAppUrl = 'https://api.whatsapp.com/send';
    const number = $(".wcs_popup_input").attr("data-number");
    const text = $("#msg-body").val();
    const url = WhatsAppUrl+'?phone='+number+'&text='+text;
    window.open(url, "_blank");
  }else{
    showAlert("warning","You must write a message","2000")
  }
});

function checkAviability() {
  let today = new Date();
  const starHour = $(".wcs_popup_input")
    .attr("data-availability")
    .substring(0, 1);
  const finalHour = $(".wcs_popup_input")
    .attr("data-availability")
    .substring(4, 6);
  let validation = starHour < today.getHours() && finalHour > today.getHours();
  if (!validation) {
    $("#msg-body").attr("disabled", "true");
    $(".btn-send").attr("disabled", "true");
    $("#msg-body").attr("placeholder", "No service during these hours");
  }
}
