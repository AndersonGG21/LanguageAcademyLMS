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
   email1="maria@gmail.com";
   // email1=localStorage.email1;
   const request = await fetch('api/teacher-students/' +email1, {
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
                       <td>"+ it_students[0] + "</td>\n\
                       <td>"+ it_students[1] + "</td>\n\
                       <td>"+ it_students[2] + "</td>\n\
                       <td>"+ it_students[3] +"</td>\n\
                       <td>"+ it_students[4] + "</td>\n\
                       <td>"+ it_students[5] + "</td>\n\
                       </tr>";
       listHTML += studentsHTML;
   }

   document.querySelector('#tableStudents tbody').outerHTML = listHTML;

}

