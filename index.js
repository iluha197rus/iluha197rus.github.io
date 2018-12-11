

var player1 = {
    strat1: 0,
    strat2: 0,
    summ: 0,
    strat_ch: true
}


var player2 = {
    strat1: 0,
    strat2: 0,
    summ: 0,
    strat_ch: true
}

// var matrix = [ // [a][b] (ad - bc)/(a + d - b - c)
//     [-4,5],    // [c][d]
//     [8,-7]
// ]

 var a = parseFloat( prompt('a11', -4) ); // convert string to float
 var b = parseFloat( prompt('a12', 5) );
 var c = parseFloat( prompt('a21', 8) );
 var d = parseFloat( prompt('a22', -7) );


 var matrix = [ // [a][b] (ad - bc)/(a + d - b - c)
     [a,b],    // [c][d]
     [c,d]
 ]

var avGain = ((a * d) - (b * c)) / (a + d - b - c);

var i = 0, j = 0;
var v1 = 0, v2 = 0;
var counter = 0;


var mass= [];

for (var k = 0; k < 500; k++) {
    counter++;

    player1.strat_ch ? i = 1 : i = 0;
    player2.strat_ch ? j = 1 : j = 0;

    player1.strat_ch ? player1.strat2++ : player1.strat1++;
    player2.strat_ch ? player2.strat2++ : player2.strat1++;

    player1.summ += matrix[i][j];
    player2.summ += (-1)*matrix[i][j];

    

    v1 = matrix[0][0] * (player2.strat1 / counter) + matrix[1][0] * (player2.strat2 / counter);
    v2 = matrix[0][1] * (player2.strat1 / counter) + matrix[1][1] * (player2.strat2 / counter);

    (v1 > v2) ? player1.strat_ch = false : player1.strat_ch = true;

    //(v1 > v2) ? mass.push([counter, v1, avGain]) : mass.push([counter, v2, avGain]);
   // mass.push([counter, player1.summ, player2.summ]);

    v1 = matrix[0][1] * (player1.strat1 / counter) + matrix[0][0] * (player1.strat2 / counter);
    v2 = matrix[1][1] * (player1.strat1 / counter) + matrix[1][0] * (player1.strat2 / counter);

    (v1 > v2) ? player2.strat_ch = false : player2.strat_ch = true;
    (v1 > v2) ? mass.push([counter, v1, avGain]) : mass.push([counter, v2, avGain]);

 }

 google.charts.load('current', {'packages':['table']});
 google.charts.setOnLoadCallback(drawTable);

 function drawTable() {
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Игроки');
   data.addColumn('number', 'Выигрыш');
  //data.addColumn('boolean', 'Full Time Employee');
   data.addRows([
     ['Первый игрок', player1.summ],
     ['Второй игрок', player2.summ]
   ]);

   var table = new google.visualization.Table(document.getElementById('table_div'));

   table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
 }

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Средний выигрыш');
      data.addColumn('number', 'Цена игры');

      data.addRows(mass);

      var options = {
        hAxis: {
          title: 'Итерации'
        },
        vAxis: {
          title: 'Выигрыш'
        },
        series: {
          1: {curveType: 'function'}
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(data, options);
    }

    