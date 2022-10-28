$(document).ready(function () {
    loadCourses();
});

async function loadCourses() {
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
                            <div class='col-md-4'>\n\
                            <img src='/imgs/ena1.png' class='img-fluid rounded-start' alt='...'/>\n\
                        </div>\n\
                        <div class='col-md-8'>\n\
                        <div class='card-body'>\n\
                        <h5 class='card-title' style='display: inline-block;'>"+iterator[3]+"</h5>\n\
                        <a href='https://www.politecnicojic.edu.co/images/downloads/facultades/ingenieria/programa-ingenieria-informatica-plan-10.jpg' target='_blank' rel='noopener noreferrer' style='display: inline-block; margin-left: 10px;'>(See the content of this course)</a>\n\
                        <p class='card-text'>"+iterator[1]+"</p>\n\
                        <span class='teacher'><b>Teacher ID:</b><span>"+iterator[3]+"</span></span>\n\
                        <button class='btn btn-primary' onclick=assignTeacher()>Assign a Teacher</button>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                        </div>\n\
                    <div class='card-right'>\n\
                    <div class='subject-container'>\n\
                    <h6><b>Subjects:</b></h6>\n\
                    <ul class='list-group'>\n\
                    <li class='list-group-item'>Grammar</li>\n\
                    <li class='list-group-item'>Listening</li>\n\
                    <li class='list-group-item'>Reading</li>\n\
                    <li class='list-group-item'>Speaking</li>\n\
                    <li class='list-group-item'>Writing</li>\n\
                    </ul>\n\
                    <a href=''>Add a subject</a></div> \n\
                    <div class='information'></div>\n\
                </div>\n\
                </div>";
        list += card;
    }

    document.getElementById('prueba').innerHTML = list;
}

async function assignTeacher(){
    
    let teacher = {
        id:21556089
    }
    
    console.log(teacher);
    
    const request = await fetch('/api/groups/' + 'GP001', {
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