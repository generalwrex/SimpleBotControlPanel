module.exports = {
   
    // The name of the event
    name: "message",
       
    // the category of the event
    category: "util",

    // this is what is fired when the event is called, 
    // it returns io ( to run socket functions)
    // and the data that is sent between.
    //ex: this.events.util.message("hello!");
    event: function(data){
     
		console.log(data);
	 
        this.io.sockets.emit('broadcast', data.toString());                  
    },
	
	init: function(sbcp){
		
	}
       
};
    
    
    