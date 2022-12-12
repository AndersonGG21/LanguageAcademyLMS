$(document).ready(function () {
    loadCourses();
    // localStorage.email = "manolo@elpoli.edu.co";
    loadCompletedCourses();
    loadCoursesHaventSeen();
    getName();
    validateRole("STUDENT");
});

async function loadCourses() {
    const request = await fetch('/api/students/' + localStorage.email , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    try {
        const response = await request.json(); 
        
        if (response == '' || response == null) {
            alert("No hay datos")
        }
    
        // console.log(response);
    
        let cardList = '';
        for (const iterator of response) {
            let card = replace(iterator[0], iterator[1],iterator[2]);
            cardList+= card;
        }
    
        document.querySelector(".my-courses-container").innerHTML = cardList;  
    } catch (error) {
        alert("No existe")
    }    
}

function replace(title, desc,cod) {
    desc = desc.substring(0,106)+"...";
    url = "url(/imgs/card-header-bg-"+randomNumber()+".png)";
    style = "style='background-image:"+url+"'";
    const card ="<div class='card course-card'><div class='card-header'"+style+"><h3>"+title+"</h3><p>"+cod+"</p></div><div class='card-body'><p class='card-text'>"+desc+"</p><button class='btn btn-primary' onclick=saveCode('"+cod+"')>Continue</button></div></div>"
    return card;
}

function saveCode(code) {
    localStorage.code = code;
    window.location.href = "course-template.html";
}

function randomNumber() {
    return Math.ceil(Math.random() * (3 - 0) + 0);
}

async function getName(){
    const request = await fetch('/api/student/name/' + localStorage.email , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    let response = request.text();
    response = (await Promise.resolve(response)).toString();
    response != null ? document.querySelector("#student-name").innerHTML = response : document.querySelector("#student-name").innerHTML = "No data";
}

// ---------------------------------------------------------------------------------------------------------

async function loadCompletedCourses(){

    const request = await fetch('/api/students-completed/' + localStorage.email , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    try {
        const response = await request.json(); 
        
        if (response == '' || response == null) {
            // alert("No hay datos")
            showAlert("warning", "You have not completed any course. Cheer up 😁", "4000")
        }

        let cardList = '';
        for (const iterator of response) {
            let card = replace2(iterator[0], iterator[1]);
            cardList+= card;
        }
    
        document.querySelector(".courses-completed").innerHTML = cardList;  
    } catch (error) {
        alert("No existe")
    }    
}

function replace2(title,cod) {
    const card ="<div class='courseCompleted'><div class='card-headerCompleted'><h3>"+ title+"</h3><div class='codCompletedCourse'><p>"+cod+"</p></div></div></div>"
    return card;
}

// -----------------------------------------------------------------------------------------------------------------

async function loadCoursesHaventSeen(){

    const request = await fetch('/api/students-havent-seen/' + localStorage.email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    try {
        const response = await request.json(); 
        if (response == '' || response == null) {
            alert("No hay datos")
        }
    
        // console.log(response);
    
        let cardList = '';
        for (const iterator of response) {
            let card = replace3(iterator[0], iterator[1]);
            cardList+= card;
        }
    
        document.querySelector(".courses-havent-seen").innerHTML = cardList;  
    } catch (error) {
        alert("No existe")
    }    
}

function replace3(title,cod) {
    const card = `<div class="carta"><div class="header"><div class="img-box"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="rgba(66,193,110,1)"d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"></path></svg></div><h1 class="title">${title}</h1></div><div class="content"><p>${cod}</p><a class="btn-link">Read More...</a></div></div>`
    return card;
}