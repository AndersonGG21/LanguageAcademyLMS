$(document).ready(function () {
    loadStudents();
});


let studentsToModify;
var groupsModify = new Map();;

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
        btnDelete = '<button onclick=deleteStudents(' + it_students.id + ') class="btn btn-outline-danger btn-sm px-2">Delete</button>';
        let btnEdit = '<button onclick=getCourse(' + it_students.id + ') data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn btn-outline-danger btn-sm">Groups</button>';
        let student = {
            id: it_students.id,
            name: it_students.name,
            email: it_students.email,
            address: it_students.address,
            phoneNumber: it_students.phoneNumber
        };
        let name = it_students.name;
        let btnView = '<button onclick=viewInfo(' + it_students.id + ') data-bs-toggle="modal" data-bs-target="#viewModal" class="btn btn btn-outline-danger btn-sm">View info</button>';



        let studentsHTML = "<tr>\n\
                        <td>"+ it_students.id + "</td>\n\
                        <td>"+ it_students.name + "</td>\n\
                        <td class='d-flex justify-content-evenly' >"+ btnDelete + btnEdit + btnView + "</td>\n\
                        </tr>";
        listHTML += studentsHTML;
    }

    document.querySelector('#tableStudents tbody').outerHTML = listHTML;

}

async function registerStudent() {

    const request = await fetch('/api/students', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById("document").value,
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value,
            name: document.getElementById("name").value,
            phoneNumber: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            roleName: "STUDENT"
        })
    });
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has been register',
        showConfirmButton: false,
        timer: 1500
    })
}

async function viewInfo(id) {
    const request = await fetch('api/student/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const resp = await request.json();
    document.getElementById('nameStudent').innerHTML = resp.name;
    document.getElementById('idStudent').innerHTML = resp.id;
    document.getElementById('mailStudent').innerHTML = resp.email;
    document.getElementById('phoneStudent').innerHTML = resp.phoneNumber;
    document.getElementById('adressStudent').innerHTML = resp.address;

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
    let htmlCode = "";
    let name = "";
    let options = "";
    groupsModify.clear;
    for (const iterator of resp) {
        if (resp[0].desc != null) {
            name = resp[0].name;
            htmlCode = "<h2 class='text-balck'>" + resp[0].desc + "</h2>";
        }
        else {
            let idLabel = "h2" + iterator[3];
            let option = "<select name='" + id + "Name' class='form-select' aria-label='Default select example' id='" + iterator[1] + "'>" + getGroup(iterator[1]) + "</select>";
            let label = "<div class='courseCompleted'>\n\
                            <div class='card-headerCompleted'>\n\
                            <label id='"+ iterator[3] + "' class='text-balck' for='" + id + "'>Course:" + iterator[0] + "</label>\n\
                            <br><label class='text-balck' id='"+ idLabel + "'></label>\n\
                                <div class='codCompletedCourse'>\n\
                                    "+ option + "\n\
                                </div>\n\
                            </div>\n\
                        </div>";
            let groupOne = getGroupOne(id, iterator[1], idLabel);
            console.log(groupOne);
            options += label;
            htmlCode = options;
            name = resp[0][2]
            groupsModify.set(iterator[0], iterator[1]);
        }
    }
    document.getElementById("selectors").innerHTML = htmlCode;
    document.getElementById("buttonContainer").setAttribute('onclick', 'modifyStudent(' + id + ')');
    document.getElementById("studentNameUpdate").innerHTML = "Student: " + name;
}

async function getGroupOne(id, idCourse, id_html) {
    const request = await fetch('/api/students/group/' + id + "-" + idCourse, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let resp = await request.json();
    let options = "";
    for (const iterator of resp) {
        if (document.getElementById(iterator[0]) != null) {
            document.getElementById(iterator[0]).selected = true;
        }
        const iterator1 = iterator.join(' - ')
        let option = iterator1;
        options += option;
    }
    if (options == "") {
        document.getElementById(id_html).innerHTML = "no group assigned, select:";
    }
    else {
        document.getElementById(id_html).innerHTML = "current group: " + options + "<br>Change to :";
    }
}

async function getGroup(idCourse) {
    const request = await fetch('/api/students/groups/' + idCourse, {
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
        let option = "<option value='" + iterator[0] + "' id='" + iterator[0] + "'>" + iterator1 + "</option>";
        options += option;
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

async function modifyStudent(id) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let data = {};

    // data.name = document.getElementById("inputName").value;


    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        var groupsNew = new Map();
        for (var [key, value] of groupsModify) {
            var option = document.getElementById(value);
            var content = option.value;
            groupsNew.set(value, content);
        }
        const out = Object.create(null)
        groupsNew.forEach((value, key) => {
            if (value instanceof Map) {
                out[key] = map_to_object(value)

            }
            else {
                out[key] = value
            }
        })
        console.log(JSON.stringify({ out }));
        if (result.isConfirmed) {
            const request = await fetch('/api/students/group/' + id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(out)
            });

            Toast.fire({
                icon: 'success',
                title: 'Saved successfully'
            })
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else if (result.isDenied) {
            Toast.fire({
                icon: 'warning',
                title: 'Not Saved'
            })
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    })
}