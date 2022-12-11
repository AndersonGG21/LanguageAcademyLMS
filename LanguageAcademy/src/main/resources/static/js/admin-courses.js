$(document).ready(function () {
    // createCourseMaterial();
    validateRole("ADMIN");
});

async function createCourse(){
    let condicion=true;
    // let id=Date.now().toString();
    let data={};
    let select=document.getElementById("selectLevelCourse").value;
    let name=document.getElementById("recipient-name").value;
    let code = $("#recipient-code").val();
    data.code= code;
    data.name =name + " "+select;
    data.img = document.getElementById("recipient-Image").value;
    data.desc = document.getElementById("message-Description").value;
    

 
    if(select===""||select===" "){
        condicion=false;
        document.getElementById("conditionNameLevel").classList.add('conditionColor');
        $("#conditionNameLevel").toggle();
    }else{
        document.getElementById("conditionNameLevel").classList.remove('conditionColor');
        $("#conditionNameLevel").toggle();
    }

    if (code === "" || code===" ") {
        condicion=false;
        $("#conditionCode").addClass("conditionColor");
        $("#conditionCode").toggle();
    }else{
        $("#conditionCode").removeClass("conditionColor");
        $("#conditionCode").toggle();
    }

    if (name===""|| name===" "){
        condicion=false;
        document.getElementById("conditionName").classList.add('conditionColor');
        $("#conditionName").toggle();
    }else{
        document.getElementById("conditionName").classList.remove('conditionColor');
        $("#conditionName").toggle();
    }
    if (data.img===""||data.img===" "){
        condicion=false;
        document.getElementById("conditionImage").classList.add('conditionColor');
        $("#conditionImage").toggle();
    }else{
        document.getElementById("conditionImage").classList.remove('conditionColor');
        $("#conditionImage").toggle();
    }
    if (data.desc===""||data.desc===" "){
        condicion=false;
        document.getElementById("conditionDescription").classList.add('conditionColor');
        $("#conditionDescription").toggle();
    }else{
        document.getElementById("conditionDescription").classList.remove('conditionColor');
        $("#conditionDescription").toggle();
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
    
        request.ok
        ? showAlert("success", "Course created 😁", "4000")
        : showAlert("danger", "There was an error");

        setTimeout(() => {
            location.reload();
        }, 4000);

    }

}

function createCourseClose(){
    arrayModal=[];
}

function showCode(code) {
    alert(code)
}

function cleanModalCourse(){
    document.getElementById("recipient-name").value=" ";
    document.getElementById("recipient-Image").value=" ";
    document.getElementById("message-Description").value=" ";
    document.getElementById("selectLevelCourse").value="Level";
}

async function createSubject(subject) {
    const course = {code: localStorage.curso}
    const request = await fetch('api/subjects', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: subject, 
            course
        })
    });

    request.ok ? showAlert("success", "Subject created", "4000") : showAlert("danger", "There was an error", "4000")
}


$("#info").click(function () { 
    const values = [];
    const checkInputs = document.querySelectorAll(".checkbox-input");

    checkInputs.forEach(check => {
        if( $(check).prop('checked') ) {
            values.push($(check).val());
        }
    });

    if (values.length != 0) {
        values.forEach(subject => {
            createSubject(subject);
        });    
    }else{
        showAlert("warning", "You must select a subject", "4000")
    }

    
});
