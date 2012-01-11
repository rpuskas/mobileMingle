MM = {};
MM.Chart = {   
	
	options : {
		chart: { renderTo: 'container', type: 'column', height: 250 }, 
		tooltip: { enabled: false },
		legend: { enabled: false },
		title: { text: 'User Journey Backlog'}, 
		yAxis: {title:{text:""}},
		xAxis: {categories:""},
		series: ""
	},  
	
	load : function(sliderValue){ 
		                
		var journies = window.Journeys.models;
		sliderValue = sliderValue || 'Points';
		   
		this.options.yAxis.title.text = (sliderValue == 'Points' ? '# of Points' : '# of Stories' ); 
		this.options.xAxis.categories = journies.map(function(x){ return x.get("name") });  
		  
		if(sliderValue == 'Points'){
			this.options.series = [{data: journies.map(function(x){ return parseInt(x.get("points")) })}]; 
		}   
		else{
			this.options.series = [{data: journies.map(function(x){ return parseInt(x.get("stories")) })}]; 
		}

		chart = new Highcharts.Chart(this.options);
	}
}

$(function(){ 
	
	_.extend(Backbone.View.prototype,{
		renderFromTemplate: function(file,element,obj){
		   	var that = this;
			var view = $.get(file, function(data){ 
				var template = _.template(data);     
			    element.html(template(obj));  
			   	$.mobile.activePage.trigger('create');
			});          
		}
	});
	
	_.extend(Backbone.Model.prototype,{
		idAttribute: "_id",
	});
 
	window.Journey = Backbone.Model.extend(
	{   
		destroy: function(){ Backbone.Model.prototype.destroy.call(this,{url:this.url+'/'+this.id}) },
		url: '/journeys',
		initialize: function(attributes) { this.id = attributes['_id']; },
		defaults: {
		    "name": "",
		    "points": "0",
		    "stories": "0"
	   	}
	
	});  
	
	window.JourneyList = Backbone.Collection.extend({ 
		//localStorage: new Store("Journeys"),
		url: '/journeys',
		model: Journey,
		points: function(){ 
			return _.reduce(this.models, function(total, num){ return total + parseInt(num.get("points")); }, 0);
		},
		stories: function(){
            return _.reduce(this.models, function(total, num){ return total + parseInt(num.get("stories")); }, 0); 
		} 
	});  
	
	window.Journeys = new JourneyList;   
	Journeys.fetch();
	
	window.JourneyView = Backbone.View.extend({
		
		el: $("#journeyView"),  
  
		clear: function(){   
			_.each($(this.el).find("input"),function(y){$(y).val("");})         
		},
		render: function(){ 
			this.renderFromTemplate("_journeyView.html",$('#journeyView'),this.model.attributes);                             
			return this; 
		},
		events: {
		    "click #add" : "addJourney",
			"click #erase" : "eraseAll"
		}, 
		addJourney: function(){
			
			//this previously worked with the local storage as simply using the collection create. seems the async nature of it prevented it?
			//or was it something to due with the strange pending request?
			var journey = new window.Journey();
			journey.set({name: this.$("#name").val() || journey.get("name")});
			journey.set({points: this.$("#points").val() || journey.get('points')});
			journey.set({stories: this.$("#storyCount").val() || journey.get('stories')});
			journey.save();
			window.Journeys.add(journey);
			this.clear();
		},
		eraseAll: function(){  
			_.each($.extend(true, [], window.Journeys.models),function(x){ 
				console.log('here');
				x.destroy({
					success: function(model, response) { console.log('success'); }
				})
			});
		}  
		
	});	 
	
	window.JourneysSummaryView = Backbone.View.extend({
		el: $("#journeys"), 
		initialize: function(){
			this.model.bind('all', this.render, this);  
		},
		render: function(){ 
			this.$("#totalPoints").html(this.model.points());
		  	this.$("#totalStories").html(this.model.stories());
		  	this.$("#totalJournies").html(this.model.length);   
		
		}
	});
	
	window.JourneyViewInstance = new JourneyView({model: new Journey});  
	window.JourneyViewInstance.render();
	window.summary = new JourneysSummaryView({model: window.Journeys}); 
	
	                 
	$( '#viewGraph' ).live( 'pageshow',function(event){
		MM.Chart.load($("#slider-stories").val());
	}); 
		  
	$( "#slider-stories" ).bind( "change", function(event, ui) {  
		MM.Chart.load($(this).val());
	});
	
});    