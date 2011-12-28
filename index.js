MM = {}   
MM.Index = {
	 
	getJournies : function(){
		return localStorage.journies ? JSON.parse(localStorage.journies) : [];            		
	}
}  

MM.Index.Chart = { 
	
	options : {
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
			categories : MM.Index.getJournies().map(function(x){ return x.name }) 
		},
		yAxis: {
			title: {
				text: '# of Stories'
			}
		},
		series: [{data: MM.Index.getJournies().map(function(x){ return parseInt(x.points) })}]
	},  
	
	load : function(){

		var journies = MM.Index.getJournies();

		this.options.xAxis.categories = journies.map(function(x){ return x.name });
		this.options.series = [{data: journies.map(function(x){ return parseInt(x.points) })}];
		chart = new Highcharts.Chart(this.options);

	}
	
}

MM.Index.Grid = {  
	
  refresh : function(){

		var journies = MM.Index.getJournies();

		var totalPoints =  _.reduce(journies, function(total, num){ return total + parseInt(num.points); }, 0);
		var totalStories = _.reduce(journies, function(total, num){ return total + parseInt(num.count); }, 0); 

	  	$("#totalPoints").html(totalPoints);
	  	$("#totalStories").html(totalStories);
	  	$("#totalJournies").html(journies.length);    	
	}  
	
}

$(function(){  	 
	   
	var journies = MM.Index.getJournies();  
	MM.Index.Grid.refresh();
               
	$( '#viewGraph' ).live( 'pageshow',function(event){
	
		MM.Index.Chart.load();
	
	}); 
	
	$( '#main' ).live('main',function(event){
	    
		MM.Index.Grid.refresh()
	 
	});
	  
	$( "#slider-stories" ).bind( "change", function(event, ui) {  
		
		var selectedItem = $(this).val();	   
		options.yAxis.title.text = (selectedItem == 'Points' ? '# of Points' : '# of Stories');
		
		MM.Index.Chart.load();
	});   
	
	$( "#add" ).bind( "click", function(event, ui) { 
		  
		var journies = MM.Index.getJournies();

		journies.push({
			name: $("#name").val(),  
			count: $("#storyCount").val(),
			points: $("#points").val()
		});  

		localStorage.journies = JSON.stringify(journies); 
		MM.Index.Grid.refresh();  
		
	}); 
	
});    