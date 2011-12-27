$(function(){  	 
	
	var journies = [];          
	if(localStorage.journies){  
		
		journies = JSON.parse(localStorage.journies); 
		  
		window.debug = journies;
		 
		var totalPoints =  _.reduce(journies, function(total, num){ return total + parseInt(num.points); }, 0);
		var totalStories = _.reduce(journies, function(total, num){ return total + parseInt(num.count); }, 0); 

	  	$("#totalPoints").html(totalPoints);
	  	$("#totalStories").html(totalStories);
	  	$("#totalJournies").html(journies.length); 
		
	}
	
	var options = {
		chart: {
			renderTo: 'container',
			type: 'column',
			height: 250
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
			categories : journies.map(function(x){ return x.name }) 
		},
		yAxis: {
			title: {
				text: '# of Stories'
			}
		},
		series: [{data: journies.map(function(x){ return parseInt(x.points) })}]
	};  
	var chart = new Highcharts.Chart(options);  
	
	var loadGraph = function(){
		
		var journies = [];          
		if(localStorage.journies){
			journies = JSON.parse(localStorage.journies);
		}
		
		window.debug = journies;
		
		var selectedItem = $(this).val();	   
		options.yAxis.title.text = (selectedItem == 'Points' ? '# of Points' : '# of Stories');  
		options.xAxis.categories = journies.map(function(x){ return x.name });
		options.series = [{data: journies.map(function(x){ return parseInt(x.points) })}];
		chart = new Highcharts.Chart(options);
		
	}               
	
	$( '#viewGraph' ).live( 'pageshow',function(event){
	   	loadGraph();
	});
	  
	$( "#slider-stories" ).bind( "change", function(event, ui) {
	    loadGraph();
	});   
	
	$( "#add" ).bind( "click", function(event, ui) { 
		  
		var journies = localStorage.journies ? JSON.parse(localStorage.journies) : [];

		journies.push({
			name: $("#name").val(),  
			count: $("#storyCount").val(),
			points: $("#points").val()
		});  

		console.log(JSON.stringify(journies));
		localStorage.journies = JSON.stringify(journies);   
		
	}); 
	
});    