const Control = {}

Control.BotPath = null;
Control.IsRunning = false;
Control.DBM = null;

Control.startBot = function(path){

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

Control.stopBot = function(){
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


module.exports = Control;