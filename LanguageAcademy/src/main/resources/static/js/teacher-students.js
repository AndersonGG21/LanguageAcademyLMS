$(document).ready(function () {
   $('.btn-download').click(function () {
      $('#content').printThis({
         importCSS: true,
         importStyle: true,
         printContainer: true,  
         header: "<h1>Students List</h1>"
       });       
   });
});

