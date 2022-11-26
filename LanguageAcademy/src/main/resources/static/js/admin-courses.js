$(document).ready(function () {
    createCourseMaterial();
    validateRole();
});

function validateRole() {
    if (localStorage.role != "ADMIN") {
      location.href = "401.html"
    }
  }

async function createCourse(){
    let condicion=true;
    let id=Date.now().toString();
    let data={};
    let select=document.getElementById("selectLevelCourse").value;
    let name=document.getElementById("recipient-name").value;
    data.code=id;
    data.name =name +select;
    data.img = document.getElementById("recipient-Image").value;
    data.desc = document.getElementById("message-Description").value;
    

 
    if(select===""||select===" "){
        condicion=false;
        document.getElementById("conditionNameLevel").classList.add('conditionColor');
    }else{
        document.getElementById("conditionNameLevel").classList.remove('conditionColor');
    }
    if (name===""|| name===" "){
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
        <button type='button' class='btn-close'  onClick='createCourseClose()' data-bs-dismiss='modal' aria-label='Close'></button>\n\
        </div>\n\
        <div class='modal-body'>\n\
            <form class='formModal'>\n\
                <div>\n\
                    <label for='recipient-name' class='col-form-label modalGreen'><strong>Grammar </strong></label>\n\
                    <div>\n\
                        <button type='button'  onClick='modalCreateMaterial(1,"+iterator[0]+")' class='btn btn-success'id='grammar"+iterator[0]+"'>+</button>\n\
                    </div>\n\
                </div>\n\
                <div>\n\
                    <label for='recipient-name' class='col-form-label modalGreen'> <strong>Listening</strong></label>\n\
                    <div>\n\
                        <button type='button'  onClick='modalCreateMaterial(2,"+iterator[0]+")' class='btn btn-success'id='listening"+iterator[0]+"'>+</button>\n\
                    </div>\n\
                </div>\n\
                <div>\n\
                    <label for='recipient-name' class='col-form-label modalGreen'> <strong>Reading</strong></label>\n\
                    <div>\n\
                        <button type='button'  onClick='modalCreateMaterial(3,"+iterator[0]+")' class='btn btn-success'id='reading"+iterator[0]+"'>+</button>\n\
                    </div>\n\
                </div>\n\
                <div>\n\
                    <label for='recipient-name' class='col-form-label modalGreen'> <strong>Speaking</strong></label>\n\
                    <div>\n\
                        <button type='button'  onClick='modalCreateMaterial(4,"+iterator[0]+")' class='btn btn-success'id='speaking"+iterator[0]+"'>+</button>\n\
                    </div>\n\
                </div>\n\
                <div>\n\
                    <label for='recipient-name' class='col-form-label modalGreen'> <strong>Writing</strong></label>\n\
                    <div>\n\
                        <button type='button' onClick='modalCreateMaterial(5,"+iterator[0]+")'class='btn btn-success'id='success-writing"+iterator[1]+"'>+</button>\n\
                    </div>\n\
                </div>\n\
                </form>\n\
            </div>\n\
        <div class='modal-footer'>\n\
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' id='btnCloseCreate'onClick='createCourseClose()'>Close</button>\n\
            <button type='button' class='btn btn-primary' onClick='modalCreateMaterialFull()' >Create scourse material</button>\n\
        </div>\n\
        </div>\n\
        </div>\n\
        </div>";
        list += modalElement;
        
    }
    document.getElementById('containerModal').innerHTML = list;
    checkCreateMaterial();
}    

// class='btn btn-secondary'
// class="btn btn-secondary"
// class='btn btn-success'
let arrayModal=[];
let arraySubjectDB=[]
async function checkCreateMaterial(){
    const request = await fetch('api/subjects', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    arraySubjectDB = await request.json();
    for (const subject of arraySubjectDB){
        // console.log(document.getElementById(subject[1]+subject[2]));
        document.getElementById(subject[1]+subject[2]).classList.add('inactive');
    }

}
function check(id){
    let condicion=true;
    for (const subject of arraySubjectDB){
        if(subject[1]+subject[2]==id){
           return false;
        }
   
    }
    return condicion;
}

function modalCreateMaterial(element,id){
    // checkCreateMaterial(element,id);
    switch (element) {
        case 1:
            if(check("grammar"+id)){
                modalCreateMaterialArray(id,"grammar");
            }
            break;
        case 2:
            if(check("listening"+id)){
                modalCreateMaterialArray(id,"listening");
            }
            break;
        case 3:
            if(check("reading"+id)){
                modalCreateMaterialArray(id,"reading");
            }
            break;    
        case 4:
            if(check("speaking"+id)){
                modalCreateMaterialArray(id,"speaking");
            }
            break;
        case 5:
            if(check("writing"+id)){
                modalCreateMaterialArray(id,"writing");
            }
        break;
        default:
          console.log("Problems");
        }
        
        
}
function modalCreateMaterialFull(){
    for (const data of arrayModal){
        createSubjects(data);
    }
    createCourseClose();
    let btnClose=document.getElementById("btnCloseCreate");
    btnClose.click();
}
function modalCreateMaterialArray(id,name){
    data={};
    data.name=name;
    data.course=id;
    if(checkModal(data)){
        arrayModal.push(data);
    }
    
}
function checkModal(element){
    let condicion=true;
    for (const elementArray of arrayModal){
        if(elementArray.id===element.id){
            condicion=false;
            return condicion

        }
        console.log(elementArray.subject_id);
    }
    return condicion;

}
function createCourseClose(){
    arrayModal=[];
}

function cleanModalCourse(){
    document.getElementById("recipient-name").value=" ";
    document.getElementById("recipient-Image").value=" ";
    document.getElementById("message-Description").value=" ";
    document.getElementById("selectLevelCourse").value="Level";
}


async function createSubjects(data){
    let course={
        code:data.course
    };
    const request = await fetch('api/subjects', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:data.name, 
            course
        })
        
    });
}