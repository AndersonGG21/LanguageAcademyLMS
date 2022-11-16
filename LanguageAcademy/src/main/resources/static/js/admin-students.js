$(document).ready(function () {
    loadStudents();
});

let studentsToModify;

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
        btnEdit = "<button class='btn-icons' onclick=getCourse(\'" + it_students.id + "\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
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

async function getCourse(id) {
    const request = await fetch('/api/students/course/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let resp = await request.json();
    let htmlCode="";
    let name = "";
    let options="";
    groupsModify.clear;
    for (const iterator of resp) {
        if(resp[0].desc!=null){
            name=resp[0].name;
            htmlCode="<h2>"+resp[0].desc+"</h2>";
        }
        else{
            let idLabel="h2"+iterator[3];
            let label = "<label id='"+iterator[3]+"' for='"+id+"'>Course:"+iterator[0]+"</label><br><label id='"+idLabel+"'></label>";
            let option = "<select name='"+id+"Name' class='form-select' aria-label='Default select example' id='"+iterator[1]+"'>"+getGroup(iterator[1])+"</select><hr>";
            getGroupOne(id,iterator[1],idLabel)
            options+= label;
            options+= option;
            htmlCode=options;
            name=resp[0][2]
            groupsModify.set(iterator[0],iterator[1]);
        }
    }
    document.getElementById("selectors").innerHTML = htmlCode;
    document.getElementById("buttonContainer").setAttribute('onclick','modifyStudent('+id+')');
    document.getElementById("studentNameUpdate").innerHTML = "Student: "+name;
}

async function getGroupOne(id,idCourse,id_html) {
    const request = await fetch('/api/students/group/'+id+"-"+idCourse, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let resp = await request.json();
    let options = "";
        for (const iterator of resp) {
            document.getElementById(iterator[0]).selected = true;
        const iterator1 = iterator.join(' - ')
        let option = iterator1;
        options+= option;
    }
    if(options==""){
        document.getElementById(id_html).innerHTML = "sin grupo asignado, seleccionar:";
    }
    else{
        document.getElementById(id_html).innerHTML = "Grupo actual: "+options+"<br>cambiar a :";
    }
}

async function getGroup(idCourse) {
    const request = await fetch('/api/students/groups/'+idCourse, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let resp = await request.json();
    let options = "";
    for (const iterator of resp) {
        const iterator1 = iterator.join(' - ')
        let option = "<option value='"+iterator[0]+"' id='"+iterator[0]+"'>"+iterator1+"</option>";
        options+= option;
    }
    document.getElementById(idCourse).innerHTML = options;
}

async function deleteStudents(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#43546F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const request = await fetch('api/student/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire(
                'Deleted!',
                'The student has been deleted.',
                'success'
            )
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    })
}
