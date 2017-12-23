module.exports = function (SBCP) {
  var module =  {};

	module.Path = "";
	module.DBM = null;
	module.IsLoaded = false;
	module.IsRunning = false;

	module.Load = function(botPath){	
		this.Path = botPath
		delete this.DBM;
		this.DBM = require(SBCP.path.join(botPath, 'bot.js'));	
		this.IsLoaded = true;
	};

	module.shutdownMods = function() {					
		SBCP.fs.readdirSync(this.DBM.Actions.location).forEach(function(file) {
			if(file.match(/\.js/i)) {
				const mod = require(require('path').join(this.location, file));			
				delete this[mod.name]
				
				this[mod.name] = mod.action;
			}
		}.bind(this.DBM.Actions));					
	};

	module.Stop = function() {
		if(!this.IsRunning) return;
		this.shutdownMods();
		if(this.DBM.Bot.bot){
			this.DBM.Bot.bot.destroy();
		}			
	};

	module.Start = function() {
		
		if(!this.IsLoaded) return;
		if(this.IsRunning) return;
		this.DBM.Actions.location = SBCP.path.join(this.Path, 'actions');	
		if(SBCP.fs.existsSync(this.DBM.Actions.location)) {
			this.DBM.Actions.initMods();
			this.IsRunning = true;
			this.DBM.Files.readData(this.DBM.Bot.init.bind(this.DBM.Bot));
		} else {
			console.error('Please copy the "Actions" folder from the Discord Bot Maker directory to this bot\'s directory: \n' + this.DBM.Actions.location);
		}			
	};
	
	return module;
};