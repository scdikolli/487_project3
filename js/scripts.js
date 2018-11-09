$(document).ready(function() {
    console.log('scripts loaded');

//graph1
    function buildChart(data) {

        var myChart = Highcharts.chart('container', {

            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
              title: {
                  text: 'Location'
              },
                categories: ['Middle', 'High School', 'College']
                //  categories:['Category']
            },
            yAxis: {
                title: {
                    text: 'Number of Shootings'
                }
            },
            series: [data]
            // [{
            //   showInLegend: false,
            //   name:'Incidents',
            //   data: [[data]]
            // }]

            // [{
            //     name: '',
            //     data: [23, 87, 10]
            // }
            // {
            //     name: 'High School',
            //     data: [87]
            // },
            // {
            //   name: 'College',
            //   data: [10]
            // }
            //]
        });
    } //close buildChart

//graph2
    var url = './js/school-shootings.json';
    var data = [];
    var xCat = [];
    var schoolType = [];
    var incidents = [{y:0, color: 'blue'},
    {y:0, color: 'green'},
    {y:0, color: 'purple'}];

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: data,
        url: url,
        async: true,
        success: function(data) {
            console.log(data);
            for (i = 0; i < data.length; ++i) {
                //xCat.push(data[i].City);
                //schoolType.push((data[i].School));
                var type = ['MS', 'HS', 'C'].indexOf(data[i].School);
                if (type !== -1) incidents[type].y++;
            }
            buildChart({
                name: " ",
                data: incidents

            });
        } //close success function
    }); //close AJAX call

    //datatable
    $('#mass-shootings-table').DataTable({
      "ajax": "/js/mass-shootings.txt",
      "columns": [
        {"data":"case"},
        {"data":"year"},
        {"data":"location"},
        {"data":"total_victims"}
      ],

      "columnDefs": [ {
              //"className": "dt-body-left",//CHANGE ALIGNMENT OF COLUMNs 1 & 3 (with INDEX values)
              "targets": [0, 3],//YOU MUST SPECIFY THE TARGET COLUMNS FOR TOOLTIPS, ETC.
                "createdCell": function (td, cellData, rowData, row, col) {
                  if ( cellData > 1000 ) {
                      $(td).css('color', 'red');//HIGHLIGHT CELLS USING CONDITIONAL LOGIC
                    }
                    $(td).on({//CREATE A TOOLTIP
                      mouseenter: function(){
                        var txt = $(this).text();
                        console.log(txt);
                        $('#' + txt).toggleClass('hidden');
                        },
                      mouseleave: function(){
                        var txt = $(this).text();
                        $('#' + txt).toggleClass('hidden');
                      }
                  });
                }//close createdCell
              }]//close columnDefs
          });//close DataTable

//graph3
        var url2 = 'js/gun-approval.json';
        var gunApproval = [];
          $.ajax({
            type:'GET',
            url:url2,
            data:gunApproval,
            async:true,
            dataType:'json',
            success:function(gunApproval){
              console.log(gunApproval);

              var chart = new Taucharts.Chart({
                  data: gunApproval,
                  type: 'bar',
                  x: 'Approval Gun Violence',
                  y: 'Percentage',
                  plugins:[
                     Taucharts.api.plugins.get('tooltip')({
                       fields: ['Approval Gun Violence', '18-24']
                     }),
                     Taucharts.api.plugins.get('legend')()
                  ]
              });
              chart.renderTo('#bar');

              }//close success
            });//close AJAX

      }); //close ready function
