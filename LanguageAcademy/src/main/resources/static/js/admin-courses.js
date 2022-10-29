$(document).ready(function () {
    
});

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

// async function getTeachersName() {
//     alert(courseCode)
//     // const request = await fetch('/api/teachers/' + courseCode ,{
//     //     method: 'GET',
//     //     headers: {
//     //         'Accept': 'application/json',
//     //         'Content-Type': 'application/json'
//     //     }
//     // });
//     // let teachersHTML = await request.json();
//     // console.log(teachersHTML);
//     // let options = '';
//     // for (const iterator of teachersHTML) {
//     //     let option = "<option>"+iterator+"</option>";
//     //     options += option;
//     // }

    
//     if (data.name===""|| data.name===" "){
//         condicion=false;
//         document.getElementById("conditionName").classList.add('conditionColor');
//     }
//     if (data.img===""||data.img===" "){
//         condicion=false;
//         document.getElementById("conditionImage").classList.add('conditionColor');
//     }
//     if (data.desc===""||data.desc===" "){
//         condicion=false;
//         document.getElementById("conditionDescription").classList.add('conditionColor');
//     }
//     if(condicion){
//         const request = await fetch('/api/courses', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
           
//             },
//             body: JSON.stringify(data)
//         });
//         let btnClose=document.getElementById("btnClose");
//         cleanModalBtn();
//         btnClose.click();

//     }else{
//         document.getElementById("wrongData").classList.remove('conditionDescriptionDisplay');
//     }

// }
// function createCourseMaterial(){
//     alert("Vamos que vamos")
// }
// function cleanModalBtn(){
//     document.getElementById("conditionName").classList.remove('conditionColor');
//     document.getElementById("conditionImage").classList.remove('conditionColor');
//     document.getElementById("conditionDescription").classList.remove('conditionColor');
//     document.getElementById("wrongData").classList.add('conditionDescriptionDisplay');

//     document.getElementById("recipient-name").value=" ";
//     document.getElementById("recipient-Image").value=" ";
//     document.getElementById("message-Description").value=" ";
    
// }
