window.addEventListener("load", () =>{
    getData();
    // validateRole("STUDENT");
})





async function getData() {
    
    const request = await fetch("/api/enrollments/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    const note = await request.json();
    const noteFilter=[];
    note.map((element)=>{
        if(element[9]==localStorage.email){
            noteFilter.push(element);
        }
    })
    if(noteFilter.length>0){
        loadCanvas(noteFilter);

    }else{
        noData();
    }
    

}
function reportSale(arrayCourse,arrayCourseColor) {
    
    let colores=["#d8c0ee","#F63F61"]; 
    
    
    labelsLanguages=["Grammar","Reading","Listening"];
    Progress=["Succes","Failed or pending"];
    
    let k=0;
    arrayCourse.map((element)=>{
        const courseAux=element[1].slice(0,-3);
        for(let i=0;i<arrayCourseColor.length;i++){
            if(arrayCourseColor[i]==courseAux){
                if(i%2==0){
                    colores=["#d8c0ee","#F63F61"]; 
                }else{
                    colores=["#9764e9","#F63F61"];
                }
            }
        }
        let arrayAux=[];
        let arrayAuxWrog=[];
        arrayAux.push(element[4]);
        arrayAux.push(element[5]);
        arrayAux.push(element[6]);
        arrayAuxWrog.push(5-element[4]);
        arrayAuxWrog.push(5-element[5]);
        arrayAuxWrog.push(5-element[6]);
        
        generatestackedBars(colores,labelsLanguages,arrayAux,arrayAuxWrog,"MiGrafica"+k);
        k++;
        
    })
   
    // generateBarPie(Progress,Value,colores,'MiGrafica');
}

function generateBarChart(product,text,colores,value,id){
    let miCanvas=document.getElementById(id).getContext("2d");

    let chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:product,
        datasets:[
            {
                label:text,
                backgroundColor:colores,
                data:value
                
            }
        ]

        }
    })
}

function generateBarPie(elemento,value,color,id) {
    const ctx = document.getElementById(id).getContext('2d');
    const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: elemento,
                datasets: [{
                    data: value,
                    backgroundColor:color,
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {}
        });
}

function generatestackedBars(color,labelsLanguages,dataSucces,dataPending,id) {
    const data = {
        labels: labelsLanguages,
        datasets: [{
          label: 'Succes',
          data: dataSucces,
          backgroundColor:color[0],
          borderColor: color[0],
          borderWidth: 1
        },{
          label:'Failed or pending',
          data: dataPending,
          backgroundColor: color[1],
          borderColor: color[1],
          borderWidth: 1
        }]
    };
    const config = {
        type: 'bar',
        data,
        options: {
            scales: {
                x:{
                    stacked:true
                },
                y: {
                    beginAtZero: true,
                    stacked:true
                }
            }
        }
    };
    const ctx = document.getElementById(id).getContext('2d');
    const myChart = new Chart(ctx,config);
}


 function loadCanvas(noteFilter) {
    const name=noteFilter[0][10];
    let arrayCourse=[];
    let arrayCourseColor=[];
    filterArrayCourses(noteFilter,arrayCourse,arrayCourseColor);
    let numCourse=arrayCourse.length;
    let containerCanvas2="<div>\n\
                <h1>"+name +" reports</h1>\n\
                <p>Here you can see reports of your grades</p>\n\
                </div>";

    document.getElementById("containerReport").innerHTML = containerCanvas2;
    
    let containerCanvas="";
    for(let i=0;i<numCourse;i++){
        let element="<div>\n\
                        <h1>Course "+arrayCourse[i][1]+"</h1>\n\
                        <h4>Group "+arrayCourse[i][2]+"</h4>\n\
                        <h4>Status "+arrayCourse[i][7]+"</h4>\n\
                        <canvas id='MiGrafica"+i+"' width='100' height='100' class='canvasPie'> </canvas>\n\
                        </div>\n\
                    ";
        containerCanvas+=element;   
    }
    document.getElementById("containerReport2").innerHTML = containerCanvas;
    reportSale(arrayCourse,arrayCourseColor);
    

}

function filterArrayCourses(noteFilter,arrayCourse,arrayCourseColor) {
    
    noteFilter.map((element)=>{
        let auxCourses=element[1].slice(0,-3);
        let bandera=true;
        arrayCourseColor.map(element2=>{
            if(element2==auxCourses){
                bandera=false;
            }
        })
        if(bandera){
            arrayCourseColor.push(auxCourses);
        }
    })
    arrayCourseColor.map((element)=>{
        noteFilter.map((elementNote)=>{
            let course=elementNote[1].slice(0,-3);
            if(element==course){
                arrayCourse.push(elementNote);
            }
        })
    })
    
}


function noData() {
    let containerCanvas2="<div>\n\
                <h1>You have no qualifications.</h1>\n\
                <p>You must enroll in a course</p>\n\
                </div>";

    document.getElementById("containerReport").innerHTML = containerCanvas2;
}

