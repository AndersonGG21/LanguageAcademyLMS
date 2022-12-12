window.addEventListener("load", () =>{
    // loadCanvas();
    getData();
    // validateRole("STUDENT");
})


// let colores=["#146e18","#d90429"];//otra opcion
// let colores=["#A9B1AA","#F63F61"];// otra opcion 
// let colores=["#43546F","#F63F61"];//  la mejor 
// let colores=["#bcbce0","#F63F61"];
let colores=["#d8c0ee","#F63F61"];
// let colores=["#9764e9","#F63F61"];


async function getData() {
    
    const request = await fetch("/api/enrollments/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    const note = await request.json();
    const noteFilter = note.filter(element => element[9]==localStorage.email);
    loadCanvas(noteFilter);

}
function reportSale(arrayCourse) {
    
    productValue=[10,2,8,4,13,2,3,13,2,4];
    productValue2=[2,5,8,4,13,2,3,13,2,12];
    productValue3=[8,2,8,4,9,2,3,12,2,4];
    productValue4=[1,1,8,4,10,2,3,11,2,9];
    productValue5=[4,9,8,4,9,2,3,13,2,4];
    
    product=["Grammar","Pending","Listening","Pending","Reading ","Pending","Speaking","Pending","Wrinting","Pending"];
    labelsLanguages=["Grammar","Listening","Reading ","Speaking","Wrinting"];
    Value=[10,22];
    Progress=["Succes","Pending"];
    dataSucces=[1,2,3,4,5,6];
    dataPending=[9,5,4,3,2,1];

    dataSucces2=[1,1,3,0,5,6];
    dataPending2=[4,5,4,3,2,1];

    dataSucces3=[1,3,3,0,4,6];
    dataPending3=[1,5,4,3,8,1];

    dataSucces4=[3,2,4,5,2,3];
    dataPending4=[1,0,2,2,1,1];
    
    // generateBarPie(Progress,Value,colores,'MiGrafica');
    generatestackedBars(colores,labelsLanguages,dataSucces4,dataPending4,"MiGrafica2");
    // generatestackedBars(colores,labelsLanguages,dataSucces3,dataPending3,"MiGrafica3");
    // generatestackedBars(colores,labelsLanguages,dataSucces2,dataPending2,"MiGrafica4");
    // generatestackedBars(colores,labelsLanguages,dataSucces,dataPending,"MiGrafica5");
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
          label:'Pending',
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
    // console.log(arrayCourse);
    let numCourse=arrayCourse.length;
    // console.log(arrayCourseColor);
    let containerCanvas="<div>\n\
                <h1>"+name +" reports</h1>\n\
                <p>Here you can see reports of your grades</p>\n\
                </div>";

    let total=1;
    for(let i=0;i<numCourse;i++){
        let element="<div>\n\
                        <h1>"+arrayCourse[i][1]+"</h1>\n\
                        <h3>"+arrayCourse[i][2]+"</h3>\n\
                        <canvas id='MiGrafica"+i+"' width='100' height='100' class='canvasPie'> </canvas>\n\
                        </div>\n\
                    ";
        containerCanvas+=element;   
    }
    document.getElementById("containerReport2").innerHTML = containerCanvas;
    reportSale(arrayCourse);
    

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


{/* <div class='divReport2'>\n\
                        <h3>Total progress in the English language</h3>\n\
                        <canvas id='MiGrafica' width='100' height='100' class='canvasPie'> </canvas>\n\
                    </div>\n\
                    <div class='divReport'>\n\
                        <h3>A1 progress</h3>\n\
                        <canvas id='MiGrafica2' width='100' height='100'> </canvas>\n\
                    </div>\n\
                    <div class='divReport'>\n\
                        <h3>A2 progress</h3>\n\
                        <canvas id='MiGrafica3' width='100' height='100'> </canvas>\n\
                    </div>\n\
                    <div class='divReport'>\n\
                        <h3>B1 progress</h3>\n\
                        <canvas id='MiGrafica4' width='100' height='100'> </canvas>\n\
                    </div>\n\
                    <div class='divReport'>\n\
                        <h3>B2 progress</h3>\n\
                        <canvas id='MiGrafica5' width='100' height='100'> </canvas>\n\
                    </div> */}