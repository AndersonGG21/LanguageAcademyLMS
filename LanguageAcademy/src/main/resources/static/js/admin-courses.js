$(document).ready(function () {
    loadCourses();
});

async function loadGroups(course) {
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
        let item = "<tr><td>"+iterator[0]+"</td><td>"+iterator[1]+"</td><td>"+iterator[2]+"</td><td><button class= 'btn btn.edit'onclick=assignTeacher('"+iterator[0]+"')><i class='bi bi-pen'></i></button></td></tr>"
        trs += item;
    }
    document.getElementById('groupTableBody').innerHTML = trs;
    console.log(groupsHTML);
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

async function assignTeacher(id){
    
    let teacher = {
        id:21556089
    }
    
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

    $("#table-responsive").load(" #table-responsive");
}