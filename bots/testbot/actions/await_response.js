module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Await Response (Does nothing)",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Messaging",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `Await ${data.max} responses for ${data.time} miliseconds."`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["storage", "varName", "filter", "max", "time", "source", "timeout"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<div style="float: left; width: 35%;">
		Source Channel:<br>
		<select id="storage" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
			${data.channels[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="width: 85%; margin-top: 8px;">
	Filter Eval:<br>
	<input id="filter" class="round" type="text" value="content == 'response'">
</div><br>
<div style="float: left; width: 50%;">
	Max Responses:<br>
	<input id="max" class="round" type="text" value="1"><br>
</div>
<div style="float: right; width: 50%;">
	Max Time (miliseconds):<br>
	<input id="time" class="round" type="text" value="60000"><br>
</div>
<div style="width: 85%;">
	<span id="informer">
		On Respond Event:<br>
		<select id="source" class="round">
		</select><br>
	</span>
	<span id="informer2">
		On Timeout Event:<br>
		<select id="timeout" class="round">
		</select><br>
	</span>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.channelChange(document.getElementById('storage'), 'varNameContainer');

	const $evts = glob.$evts;
	const evet = document.getElementById('source');
	evet.innerHTML = '';
	for(let i = 0; i < $evts.length; i++) {
		if($evts[i] && $evts[i]["event-type"] === "39") {
			evet.innerHTML += `<option value="${$evts[i]._id}">${$evts[i].name}</option>\n`;
		}
	}
	if(evet.innerHTML === '') {
		document.getElementById('informer').innerHTML = "<span id=\"source\"></span><font color=\"#ffff66\">There are no \"Await Response\" events in this project!</font><br><br>";
	}

	const evet2 = document.getElementById('timeout');
	evet2.innerHTML = '';
	for(let i = 0; i < $evts.length; i++) {
		if($evts[i] && $evts[i]["event-type"] === "40") {
			evet2.innerHTML += `<option value="${$evts[i]._id}">${$evts[i].name}</option>\n`;
		}
	}
	if(evet2.innerHTML === '') {
		document.getElementById('informer2').innerHTML = "<span id=\"timeout\"></span><font color=\"#ffff66\">There are no \"Await Response Timeout\" events in this project!</font><br><br>";
	}
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const Files = this.getDBM().Files;
	
	const id = data.source;
	let actions;
	const allData = Files.data.events;
	for(let i = 0; i < allData.length; i++) {
		if(allData[i] && allData[i]._id === id) {
			actions = allData[i].actions;
			break;
		}
	}
	if(!actions) {
		this.callNextAction(cache);
		return;
	}

	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const channel = this.getChannel(storage, varName, cache);

	const act = actions[0];
	if(act && this.exists(act.name)) {
		const js = String(data.filter);
		const max = parseInt(this.evalMessage(data.max, cache));
		const time = parseInt(this.evalMessage(data.time, cache));
		channel.awaitMessages(function(msg) {
			const content = msg.content;
			const author = msg.member || msg.author;
			try {
				return !!eval(js);
			} catch(e) {
				return false;
			}
		}, {
			max: max,
			time: time,
			errors: ['time']
		}).then(function(collected) {
			console.log(collected.size);
		}).catch(function(collected) {
			console.log(collected.size);
		});
	}

/*

		const cache2 = {
			actions: actions,
			index: 0,
			temp: cache.temp,
			server: cache.server,
			msg: (cache.msg || null)
		}
		if(data.type === 'true') {
			cache2.callback = function() {
				this.callNextAction(cache);
			}.bind(this);
			this[act.name](cache2);
		} else {
			this[act.name](cache2);
			this.callNextAction(cache);
		}
	} else {
		this.callNextAction(cache);
	}
	*/
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module