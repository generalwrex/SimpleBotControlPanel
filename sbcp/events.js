module.exports = function (io) {
  var module =  {};

  module.events = {};

  module.io = io;

  module.sbcp = {};

  module.initEvents = function(){
    var normalizedPath = require("path").join(__dirname, "events");
    
    require("fs").readdirSync(normalizedPath).forEach(function(file) {

      if(file.match(/\.js/i)) {

        var mod = require(require("path").join(__dirname, "events" , file));
    
        const name = mod.name;
        const cat = mod.category;

        if(!this.events[cat]){
          this.events[cat] = {};
        }

        if(mod.event){         
          this.events[cat][name] = mod.event.bind(module);
        }

        try {
          mod.init(this.sbcp);
        } catch(e) {
          console.error(e);
        }
        
      }
    }.bind(module));

  }

  
  module.initEvents();

  module.invokeEvents = function(){

  }


  var control = {};
  control.startBot = function(path){

      try {

          if(!this.IsRunning){
              
              this.BotPath = path;
              
              console.log("Initializing Bot Startup..")
              var mainPath = require('path').join(path, 'js' ,'Main.js');
      
              process.chdir(path);
              this.DBM = require(mainPath);
              
              console.log("Starting Bot...")
              this.DBM.Files.initStandalone();
              this.IsRunning = true;

              return true;
          }

      } catch (error) {
          console.log("[ERROR] SBCP Control (Start): " + error.stack ? error.stack : error);       
      }
      return false;
  }

  control.stopBot = function(){
      try {
          if(this.IsRunning){        
              this.DBM.Bot.bot.destroy();
              isRunning = false;                         
              return true;
          }     
      } catch (error) {
          console.log("[ERROR] SBCP Control (Stop): " + error.stack ? error.stack : error);        
      }
      return false;
  }

  module.events.control = control;

  return module;
};