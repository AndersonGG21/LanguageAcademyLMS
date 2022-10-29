$(document).ready(function () {
    createCourseMaterial();
});

async function createCourse(){
    let condicion=true;
    let id=Date.now().toString();
    let data={};
    data.code=id;
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
        const request = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        createSubjects(id,data.name);
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
    // console.log(coursesHTML);
    let list = '';

    for (const iterator of coursesHTML) {
        let modalElement="<div class='modal fade' id='ModalCourse"+iterator[0]+"' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>\n\
            <div class='modal-dialog'>\n\
        <div class='modal-content'>\n\
        <div class='modal-header'>\n\
            <h1 class='modal-title fs-5' id='exampleModalLabel'>Course material-"+iterator[3]+"</h1>\n\
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>\n\
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
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' id='btnClose'>Close</button>\n\
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


async function createSubjects(idCourse,name){
    let SubjectGram={}
    SubjectGram.name="Grammar-"+name;
    SubjectGram.course=idCourse;
    // SubjectGram.id=22;
    console.log(SubjectGram);

}