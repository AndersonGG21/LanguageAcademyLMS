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
        btnDelete = "<button class='btn-icons' onclick=deleteStudents(\'" + it_students.id + "\')>\n\
                    <i class='bi bi-trash'></i>\n\
                    </button>";
        btnEdit = "<button class='btn-icons' onclick=loadDataStudents(\'" + it_students.id + "\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
                    <i class='bi bi-pencil'></i>\n\
                    </button>";


        let studentsHTML = "<tr>\n\
                        <td>"+ it_students.id + "</td>\n\
                        <td>"+ it_students.name + "</td>\n\
                        <td>"+ it_students.email + "</td>\n\
                        <td>"+ it_students.phoneNumber + "</td>\n\
                        <td>"+ it_students.address + "</td>\n\
                        <td>"+ it_students.age + "</td>\n\
                        <td>"+ btnDelete + "</td>\n\
                        <td>"+ btnEdit + "</td>\n\
                        </tr>";
        listHTML += studentsHTML;
    }

    document.querySelector('#tableStudents tbody').outerHTML = listHTML;

}
