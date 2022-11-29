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
  
  // alert($("#msg-body").val());
  let today = new Date();
  const starHour = $(".wcs_popup_input").attr("data-availability").substring(0,1);
  console.log(starHour < today.getHours() && 20 > today.getHours())
  console.log(today.getHours())

});