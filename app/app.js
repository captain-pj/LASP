'use strict';

angular.module('myApp', [])

.controller('MainCtrl', ['$http', function($http) {
    // set user entered inputs
    var self = this;
    self.startDate = '';
    self.endDate = '';

    // set highchart options
    var options = {
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'SORCE TSI'
        },
        xAxis: [],
        yAxis: [],
        series: []
    };

// pull user data into app  
self.submit = function() {
		// clear previous chart and display loading graphic

    $('#container').empty().addClass('loading');
		// retreive data with user entered time
    var url =  "http://lasp.colorado.edu/lisird/tss/sorce_tsi_24hr.csv?time,tsi_1au&time%3E="+self.startDate+"&time%3C"+self.endDate;


    $.get(url, function(data) {
        
        // set variables for dynamic content

        var lines = data.split('\n');
        var series = { 
            data: [] 
        };
        var xaxisTitle = { title: {text: []}};
        var yaxisTitle = { title: {text: []}};
        var weekly = 7;

        // preprocess csv data for highchart preferred format
         for(var i=1;i<lines.length-1;i++){ 
            var currentline=lines[i].split(",");           
            var xaxis = parseFloat(currentline[0]);
            var yaxis = parseFloat(currentline[1]);

            var pair = [xaxis, yaxis];

            series.data.push(pair);         

            }
         // get weekly data
				for (var i=1; i<series.data.length; i+=weekly) {
				    var weeklyarrays = series.data.slice(i,i+weekly);
				}

            xaxisTitle.title.text = (lines[0].split(",")[0]);
            yaxisTitle.title.text = (lines[0].split(",")[1]);

            //update highcharts options
            options.xAxis.push(xaxisTitle);
            options.yAxis.push(yaxisTitle);
            options.series.push(series);

            //draw chart
         var chart = new Highcharts.Chart(options);

});

};
}]);
	