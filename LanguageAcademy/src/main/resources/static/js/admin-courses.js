$(document).ready(function () {
    loadCourses();
});

let groupCode;


function setGroupCode(code) {
    groupCode = code;
    getTeachers();
}

async function loadGroups(course) {
    // courseCode = course;
    const groupRequest = await fetch('/api/groups/' + course ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const groupsHTML = await groupRequest.json();
    let trs = '';
    for (const iterator of groupsHTML) {
        let item = "<tr><td>"+iterator[0]+"</td><td>"+iterator[1]+"</td><td>"+iterator[2]+"</td><td><button class= 'btn btn.edit' data-bs-toggle='modal' data-bs-target='#teacherModal' onclick=setGroupCode('"+iterator[0]+"')><i class='bi bi-pen'></i></button></td></tr>"
        trs += item;
    }
    document.getElementById('groupTableBody').innerHTML = trs;
}

async function loadCourses() {
    const request = await fetch('/api/courses', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const coursesHTML = await request.json();
    
    let list = '';

    for (const iterator of coursesHTML) {
        let card = "<div class='card' style='width: 18rem'>\n\
                        <div class='card-left'>\n\
                            <div class='row g-0'>\n\
                            <div class='col-md-4 img-container'>\n\
                            <img src='/imgs/ena1.png' class='img-fluid rounded-start' alt='...'/>\n\
                        </div>\n\
                        <div class='col-md-8'>\n\
                        <div class='card-body'>\n\
                        <h5 class='card-title' style='display: inline-block;'>"+iterator[3]+"</h5>\n\
                        <a href='https://www.politecnicojic.edu.co/images/downloads/facultades/ingenieria/programa-ingenieria-informatica-plan-10.jpg' target='_blank' rel='noopener noreferrer' style='display: inline-block; margin-left: 10px;'>(See the pensum of this course)</a>\n\
                        <p class='card-text'>"+iterator[1]+"</p>\n\
                        <h6>Actions:</h6>\n\
                        <button class='btn btn-danger' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample' onclick=loadGroups('"+iterator[0]+"')>Groups</button>\n\
                        <button class='btn btn-dark' style='width: 200px;' data-bs-toggle='modal' data-bs-target='#Modal"+iterator[0]+"' data-bs-whatever='@mdo'>Subjects</button>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                </div>";
        list += card;
        let modalCourse="<div class='modal fade' id='Modal"+iterator[0]+"' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>\n\
            <div class='modal-dialog'>\n\
            <div class='modal-content'>\n\
            <div class='modal-header'>\n\
                <h1 class='modal-title fs-5' id='exampleModalLabel'>Course material-"+iterator[3]+"</h1>\n\
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>\n\
            </div>\n\
            <div class='modal-body'>\n\
                <form>\n\
                <div class='mb-3'>\n\
                    <label for='recipient-name' class='col-form-label'>Grammar</label>\n\
                    <input type='file' accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-Grammar'>\n\
                </div>\n\
                <div class='mb-3'>\n\
                    <label for='recipient-name' class='col-form-label'>Listening</label>\n\
                    <input type='text' class='form-control' id='recipient-Listening'>\n\
                </div>\n\
                <div class='mb-3'>\n\
                    <label for='recipient-name' class='col-form-label'>Reading</label>\n\
                    <input type='file' accept='application/pdf,application/vnd.ms-excel'class='form-control' id='recipient-Reading'>\n\
                </div>\n\
                <div class='mb-3'>\n\
                    <label for='recipient-name' class='col-form-label'>Writing</label>\n\
                    <input type='file' accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-Writing'>\n\
                </div>\n\
                </form>\n\
            </div>\n\
            <div class='modal-footer'>\n\
                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'id='btnClose'>Close</button>\n\
                <button type='button' class='btn btn-primary' onClick='createCourseMaterial()'>Course material</button>\n\
            </div>\n\
            </div>\n\
        </div>\n\
        </div>";
        list += modalCourse;
        // console.log(iterator);
        // console.log(iterator[0]);
        // console.log("-----------------------");
    }
    document.getElementById('prueba').innerHTML = list;
}

async function assignTeacher(groupCode, idTeacher){
    let teacher = {
        id: idTeacher
    }
    
    const request = await fetch('/api/groups/' + groupCode, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teacher
        })
    });
}

async function getTeachers() {
    const request = await fetch('/api/teachers/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let resp = await request.json();
    
    let options = "<option>Please select a teacher:</option>";
    for (const iterator of resp) {
        const iterator1 = iterator.join(' - ')
        let option = "<option>"+iterator1+"</option>";
        options+= option;
    }

    document.getElementById("selectTeacher").innerHTML = options;
    document.getElementById("selectTeacherName").innerHTML = options;
}

async function prueba() {
    const splitted = $("#selectTeacher :selected").text().split(" - ");
    if (splitted == '' || splitted == 'Please select a teacher:') {
        alert("Esoge un teacher");
    }else{
        alert("Correcto Pai")
        assignTeacher(groupCode, splitted[0]);
        location.reload();
        
        
    }
}

async function createCourse(){
    let condicion=true;
    let data={};
    data.code=Date.now().toString();
    data.name = document.getElementById("recipient-name").value;
    data.image = document.getElementById("recipient-Image").value;
    data.description = document.getElementById("message-Description").value;

    
    let btnClose=document.getElementById("btnClose");
    btnClose.click();

    const request = await fetch('/api/groups/' + id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teacher
        })
    });

}