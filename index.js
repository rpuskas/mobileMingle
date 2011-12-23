
$(function(){  	 
	
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
	var chart = new Highcharts.Chart(options);    
	
	$( "#slider-stories" ).bind( "change", function(event, ui) {
		var selectedItem = $(this).val();	   
		options.yAxis.title.text = (selectedItem == 'Points' ? '# of Points' : '# of Stories');  
		options.series = (selectedItem == 'Points' ? [{data:[1,2,4]}] : [{data:[5,3,1]}] );    
		chart = new Highcharts.Chart(options);
	});
	
});