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
                        <button class='btn btn-dark' style='width: 200px;'>Subjects</button>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                </div>";
        list += card;
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
    
    let data={};
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

async function getTeachersName() {
    alert(courseCode)
    // const request = await fetch('/api/teachers/' + courseCode ,{
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // });
    // let teachersHTML = await request.json();
    // console.log(teachersHTML);
    // let options = '';
    // for (const iterator of teachersHTML) {
    //     let option = "<option>"+iterator+"</option>";
    //     options += option;
    // }

    
    if (data.name===""|| data.name===" "){
        condicion=false;
        document.getElementById("conditionName").classList.add('conditionColor');
    }
    if (data.img===""||data.img===" "){
        condicion=false;
        document.getElementById("conditionImage").classList.add('conditionColor');
    }
    if (data.desc===""||data.desc===" "){
        condicion=false;
        document.getElementById("conditionDescription").classList.add('conditionColor');
    }
    if(condicion){
        const request = await fetch('/api/courses', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
           
            },
            body: JSON.stringify(data)
        });
        let btnClose=document.getElementById("btnClose");
        cleanModalBtn();
        btnClose.click();

    }else{
        document.getElementById("wrongData").classList.remove('conditionDescriptionDisplay');
    }

}
function createCourseMaterial(){
    alert("Vamos que vamos")
}
function cleanModalBtn(){
    document.getElementById("conditionName").classList.remove('conditionColor');
    document.getElementById("conditionImage").classList.remove('conditionColor');
    document.getElementById("conditionDescription").classList.remove('conditionColor');
    document.getElementById("wrongData").classList.add('conditionDescriptionDisplay');

    document.getElementById("recipient-name").value=" ";
    document.getElementById("recipient-Image").value=" ";
    document.getElementById("message-Description").value=" ";
    
}
