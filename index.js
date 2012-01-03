MM = {}   
MM.Controllers = {};
MM.Views = {};   

MM.Index = {
	 
	getJournies : function(){
		return localStorage.journies ? JSON.parse(localStorage.journies) : [];            		
	},  
	
	clearFields : function(){ 
		
		$("#name").val("");
		$("#points").val("");
		$("#storyCount").val("");
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
	
	load : function(sliderValue){ 
		  
		sliderValue = sliderValue || 'Points';
		
		var journies = MM.Index.getJournies();    
		this.options.yAxis.title.text = (sliderValue == 'Points' ? '# of Points' : '# of Stories' ); 

		this.options.xAxis.categories = journies.map(function(x){ return x.name });    
		if(sliderValue == 'Points'){
			this.options.series = [{data: journies.map(function(x){ return parseInt(x.points) })}]; 
		}   
		else{
			this.options.series = [{data: journies.map(function(x){ return parseInt(x.count) })}]; 
		}

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
	
	window.Journey = Backbone.Model.extend(
	{   
		defaults: {
		    "name":  "nameless",
		    "points":     0,
		    "stories":    0
	   	}

	});  
	
	window.JourneyList = Backbone.Collection.extend({
		model: Journey,
		points: function(){

		},
		stories: function(){

		} 
	}); 
	window.Journeys = new JourneyList;
	
	window.JourneyView = Backbone.View.extend({
		
		el: $("#journey"),
		clear: function(){   
			_.each($(this.el).find("input"),function(y){$(y).val("0");})         
		},
		render: function(){
			$("#name").val(this.model.get("name"));
			$("#points").val(this.model.get("points"));
			$("#storyCount").val(this.model.get("stories"));
			return this; 
		},
		events: {
		    "click #add" : "addJourney"
		}, 
		addJourney: function(){ 
			var newJourney = new Journey({ name: $("name"),points: $("points"),stories: $("storyCount") });
			window.Journeys.add(newJourney);
		}  
		
	});	 
	
	window.JourneyViewInstance = new JourneyView({model: new Journey}); 
	     
	var journies = MM.Index.getJournies();  
	MM.Index.Grid.refresh();
               
	$( '#viewGraph' ).live( 'pageshow',function(event){
	
		MM.Index.Chart.load();
	
	}); 
	
	$( '#main' ).live('main',function(event){
	    
		MM.Index.Grid.refresh()
	 
	});
	  
	$( "#slider-stories" ).bind( "change", function(event, ui) {  
		
		MM.Index.Chart.load($(this).val());
		
	});   

	$( "#erase" ).bind( "click", function(event, ui) {   
		
		localStorage.journies = "";   
		MM.Index.Grid.refresh();
		
	});
	
	$( "#add" ).bind( "click", function(event, ui) { 
		  
		var journies = MM.Index.getJournies();  

		journies.push({
			name: $("#name").val(),  
			count: $("#storyCount").val(),
			points: $("#points").val()
		});  

		localStorage.journies = JSON.stringify(journies); 
		
		MM.Index.clearFields();
		MM.Index.Grid.refresh();  
		
	}); 
	
});    