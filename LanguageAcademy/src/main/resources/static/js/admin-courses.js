$(document).ready(function () {
    // loadCourses();
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
    
    let list = '';

    for (const iterator of coursesHTML) {
        let card = "<div class='card' style='width: 18rem;'> \n\
                    <div class='card-body'>\n\
                    <h5 class='card-title'>" +iterator[3]+ "</h5>\n\
                    <p class='card-text'>"+iterator[1]+"</p>\n\
                    <a href='#' class='btn btn-primary'>Siuu</a></div>\n\
                   </div>";
        list += card;
    }


    document.getElementById("prueba").innerHTML = list;
}