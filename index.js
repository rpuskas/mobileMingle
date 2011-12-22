var options = {
	chart: {
		renderTo: 'container',
		type: 'column',
		height: 225
	}, 
	tooltip: {
   enabled: false
  },
	legend: {
		enabled: false	
	},
	title: {
		text: 'User Journey Backlog'
	},
	xAxis: {
		categories: ["Step 1","Step 1","Step 3"]
	},
	yAxis: {
		title: {
			text: '# of Stories'
		}
	},
	series: [{data:[1,2,4]}]
};

$(function(){  			
	var chart = new Highcharts.Chart(options);
});