window.addEventListener("load", () =>{
    reportSale();
})
// let colores=["#146e18","#d90429"];
// let colores=["#6ED773","#EA8E9F"];
// let colores=["#09230A","#F63F61"];
// let colores=["#A9B1AA","#F63F61"];
// let colores=["#3F4E41","#F63F61"];
let colores=["#43546F","#F63F61"];
function reportSale() {
    
    productValue=[10,2,8,4,13,2,3,13,2,4];
    productValue2=[2,5,8,4,13,2,3,13,2,12];
    productValue3=[8,2,8,4,9,2,3,12,2,4];
    productValue4=[1,1,8,4,10,2,3,11,2,9];
    productValue5=[4,9,8,4,9,2,3,13,2,4];
    
    product=["Grammar","earring","Listening","earring","Reading ","earring","Speaking","earring","Wrinting","earring"];

    Value=[10,22];
    Progress=["Succes","Earring"];

    
    generateBarPie(Progress,Value,colores,'MiGrafica');
    generateBarChart(product,"English A1",colores,productValue,"MiGrafica2");
    generateBarChart(product,"English A2",colores,productValue2,"MiGrafica3");
    generateBarChart(product,"English B1",colores,productValue3,"MiGrafica4");
    generateBarChart(product,"English B2",colores,productValue4,"MiGrafica5");
   
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