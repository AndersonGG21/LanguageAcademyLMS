$(document).ready(function () {
    loadCourses();
    localStorage.email = "anderson@elpoli.edu.co"
    loadCompletedCourses();
    // console.log(replace("Anderson","Garces"));
});

async function loadCourses() {
    const request = await fetch('/api/students/' + "sergio@elpoli.edu.co" , {
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
    
        console.log(response);
    
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
    console.log(style);
    // console.log(randomNumber())
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

// ---------------------------------------------------------------------------------------------------------

async function loadCompletedCourses(){

    const request = await fetch('/api/students-completed/' + "sergio@elpoli.edu.co" , {
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
    
        console.log(response);
    
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
    url = "url(/imgs/card-header-bg-"+randomNumber()+".png)";
    style = "style='background-image:"+url+"'";
    console.log(style);
    // console.log(randomNumber())
    const card ="<div class='card course-cardCompleted'><div class='card-header'"+style+"><h3>"+title+"</h3><p>"+cod+"</p></div><div class='card-bodyCompleted'><p class='card-text'>Completed</p></div></div>"
    return card;
}