$(document).ready(function () {
    
});

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

