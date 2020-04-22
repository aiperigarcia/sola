let students = document.getElementById('myChart').getContext('2d');

// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let grades = new Chart(students, {
  type:'bar',
  data:{
    labels:['Zikre', 'Ken', 'Sebastian', 'Sam', 'Eric', 'Jessie', 'Asiah', 'Abbey', 'Nyah', 'Orson'],
    datasets:[{
      label:'Grades',
      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072,
        153210,
        136340,
        243450,
        34452
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 181, 197, 0.6)',
        'rgba(131, 111, 255, 0.6)',
        'rgba(156, 102, 131, 0.6)',
        'rgba(113, 113, 198, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:'Grades',
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});
