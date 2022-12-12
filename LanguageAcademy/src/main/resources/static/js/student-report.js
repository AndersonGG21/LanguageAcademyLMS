window.addEventListener("load", () =>{
    // loadCanvas();
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
    const noteFilter = note.filter(element => element[9]==localStorage.email);
    loadCanvas(noteFilter);

}
function reportSale(arrayCourse) {
    // let colores=["#146e18","#d90429"];//otra opcion
    //  let colores=["#A9B1AA","#F63F61"];// otra opcion 
    // let colores=["#43546F","#F63F61"];//  la mejor 
    // let colores=["#bcbce0","#F63F61"];
    let colores=["#d8c0ee","#F63F61"];
    // let colores=["#9764e9","#F63F61"];

    // productValue=[10,2,8,4,13,2,3,13,2,4];
    
    // product=["Grammar","Pending","Listening","Pending","Reading ","Pending","Speaking","Pending","Wrinting","Pending"];
    // labelsLanguages=["Grammar","Listening","Reading ","Speaking","Wrinting"];
    labelsLanguages=["Grammar","Listening","Reading "];
    // Value=[10,22];
    Progress=["Succes","Failed or pending"];
    dataSucces=[1,2,3,4,5,6];
    dataPending=[9,5,4,3,2,1];

    let k=0;
    arrayCourse.map((element)=>{
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
    // generatestackedBars(colores,labelsLanguages,dataSucces4,dataPending4,"MiGrafica2");
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


