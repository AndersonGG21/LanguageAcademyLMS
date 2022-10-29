$(document).ready(function () {
    
});

async function createCourse(){
    let condicion=true;
    let data={};
    data.code=Date.now().toString();
    data.name = document.getElementById("recipient-name").value;
    data.img = document.getElementById("recipient-Image").value;
    data.desc = document.getElementById("message-Description").value;
    console.log(data);
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
        cleanModalBtn();
        let btnClose=document.getElementById("btnClose");
        btnClose.click();
    
    }else{
        document.getElementById("wrongData").classList.remove('conditionDescriptionDisplay');
    }
    
    
}


async function createCourseMaterial(){
    alert("lll");
    
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
