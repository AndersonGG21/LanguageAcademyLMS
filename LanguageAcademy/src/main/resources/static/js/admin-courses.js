$(document).ready(function () {
    createCourseMaterial();
});

async function createCourse(){
    let condicion=true;
    let data={};
    data.code=Date.now().toString();
    data.name = document.getElementById("recipient-name").value;
    data.img = document.getElementById("recipient-Image").value;
    data.desc = document.getElementById("message-Description").value;

    if (data.name===""|| data.name===" "){
        condicion=false;
        document.getElementById("conditionName").classList.add('conditionColor');
    }else{
        document.getElementById("conditionName").classList.remove('conditionColor');
    }
    if (data.img===""||data.img===" "){
        condicion=false;
        document.getElementById("conditionImage").classList.add('conditionColor');
    }else{
        document.getElementById("conditionImage").classList.remove('conditionColor');
    }
    if (data.desc===""||data.desc===" "){
        condicion=false;
        document.getElementById("conditionDescription").classList.add('conditionColor');
    }else{
        document.getElementById("conditionDescription").classList.remove('conditionColor');
    }
    if(condicion){
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
        cleanModalCourse();
        let btnClose=document.getElementById("btnClose");
        btnClose.click();

    }

}

async function createCourseMaterial(){
    
    const request = await fetch('/api/courses', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const coursesHTML = await request.json();
    console.log(coursesHTML);
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
        let modalElement="<div class='modal fade' id='ModalCourse"+iterator[0]+"' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>\n\
            <div class='modal-dialog'>\n\
        <div class='modal-content'>\n\
        <div class='modal-header'>\n\
            <h1 class='modal-title fs-5' id='exampleModalLabel'>Course material-"+iterator[3]+"</h1>\n\
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' onclick='cleanModalBtn()'></button>\n\
        </div>\n\
        <div class='modal-body'>\n\
            <form>\n\
            <div class='mb-3'>\n\
                <label for='recipient-name' class='col-form-label modalGreen'><strong>Grammar</strong></label>\n\
                <input type='file'  accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-grammar"+iterator[1]+"'>\n\
            </div>\n\
            <div class='mb-3'>\n\
                <label for='recipient-name' class='col-form-label modalGreen'> <strong>Listening</strong></label>\n\
                <input type='text' class='form-control' id='recipient-listening"+iterator[1]+"'>\n\
            </div>\n\
            <div class='mb-3'>\n\
              <label for='recipient-name' class='col-form-label modalGreen'> <strong>Reading</strong></label>\n\
              <input type='file'  accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-reading"+iterator[1]+"'>\n\
            </div>\n\
            <div class='mb-3'>\n\
              <label for='recipient-name' class='col-form-label modalGreen'> <strong>Speaking</strong></label>\n\
              <input type='file'  accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-speaking"+iterator[1]+"'>\n\
            </div>\n\
            <div class='mb-3'>\n\
              <label for='recipient-name' class='col-form-label modalGreen'> <strong>Writing</strong></label>\n\
              <input type='file'  accept='application/pdf,application/vnd.ms-excel' class='form-control' id='recipient-writing"+iterator[1]+"'>\n\
            </div>\n\
            </form>\n\
            </div>\n\
        <div class='modal-footer'>\n\
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' id='btnClose' onclick='cleanModalBtn()'>Close</button>\n\
            <button type='button' class='btn btn-primary' onClick='createCourse()' >Create scourse material</button>\n\
        </div>\n\
        </div>\n\
        </div>\n\
        </div>";
        list += modalElement;
    }
    document.getElementById('containerModal').innerHTML = list;
}    


function cleanModalCourse(){
    document.getElementById("recipient-name").value=" ";
    document.getElementById("recipient-Image").value=" ";
    document.getElementById("message-Description").value=" ";
}