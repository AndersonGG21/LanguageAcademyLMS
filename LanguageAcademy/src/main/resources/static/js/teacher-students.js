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


$(document).ready(function () {
   loadStudents();
});

async function loadStudents() {

   const request = await fetch('api/students', {
       method: 'GET',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   });
   const studentsHTML = await request.json();
   let listHTML = '';


   for (let it_students of studentsHTML) {

       let studentsHTML = "<tr>\n\
                       <td>"+ it_students.id + "</td>\n\
                       <td>"+ it_students.name + "</td>\n\
                       <td>"+ it_students.email + "</td>\n\
                       <td>"+ it_students.phoneNumber + "</td>\n\
                       <td>"+ it_students.address + "</td>\n\
                       </tr>";
       listHTML += studentsHTML;
   }

   document.querySelector('#tableStudents tbody').outerHTML = listHTML;

}

