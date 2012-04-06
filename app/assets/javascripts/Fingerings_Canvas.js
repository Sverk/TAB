/**
 * @author Max Stillwell
 */

function Fingerings_Canvas(keys_string, note_tone, type) {
	/* Private Variables */
	var fingering_chart1; var fingering_chart2; var fingering_chart3;
	var note_chart = new Array(3);
	var number_of_fingerings;
	var help_hover = false; var help_show = false;
	var add_hover  = false; var remove_hover = false;
	var debug_show = false;
	/* Public Functions */
	this.Update   = Update;
	this.ToString = ToString;
	this.OnClick  = OnClick;
	
	/* Begin Constructor */
	number_of_fingerings = keys_string[0];
	
	if(type == "show" || type == "edit" || type == "new") {
		var k_strings = new Array(number_of_fingerings);
		var n_strings = new Array(number_of_fingerings);
		var t_strings = new Array(number_of_fingerings);
		
		k_strings = parseKeysString(keys_string);
		n_strings = parseNotesString(note_tone);
		t_strings = parseTonesString(note_tone);
	
		scale_X = canvas.width / 200;          // Base canvas size is 200
		scale_Y = (canvas.height - 100) / 200; // by 200, don't go any smaller. Extra 100 is for note.
	
		if(number_of_fingerings >= 1) { fingering_chart1 = new Fingering_Chart(0, 0,   k_strings[0], n_strings[0], t_strings[0], true, type);  };
		if(number_of_fingerings >= 2) { fingering_chart2 = new Fingering_Chart(200, 0, k_strings[1], n_strings[1], t_strings[1], false, type); };
		if(number_of_fingerings >= 3) { fingering_chart3 = new Fingering_Chart(400, 0, k_strings[2], n_strings[2], t_strings[2], false, type); };
	}
	else if (type == "note_search") {
		scale_X = canvas.width  / 200;
		scale_Y = canvas.height / 75;
		
		if(number_of_fingerings >= 1) { note_chart[0] = new Note_Chart(0, 0); };
		if(number_of_fingerings >= 2) { note_chart[1] = new Note_Chart(200, 0); };
		if(number_of_fingerings >= 3) { note_chart[2] = new Note_Chart(400, 0); };
	}
	else if (type == "fingering_search") {
		alert("Warning: Not Implemented!");
		return false;
	}
	else {
		alert("Error: Something went wrong with the canvas!")
		return false;
	};
	
	ctx.canvas.width = (number_of_fingerings > 1)?200 + (200 * scale_X * number_of_fingerings):200 * scale_X;
	
	canvas.onclick     = OnClick;
	canvas.onmousemove = MouseMoved;
		
	return setInterval(Update, 100);
	/* End Constructor */
	
	/* Begin Draw Functions */
	function draw() {
		clear();
		
		if(debug_show)  { draw_debug(); };
		
		draw_help();
		
		if(number_of_fingerings < 3 && type != "show") { draw_add(); };
		if(number_of_fingerings > 1 && type != "show") { draw_remove(); };
	};
	
	function clear() {
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	function draw_add() {
		ctx.save();
			ctx.fillStyle = "black";
			if(add_hover) {
				ctx.fillStyle = "rgb(255, 0, 0)";
			};
			
			ctx.shadowColor = "rgb(190, 190, 190)";
			ctx.shadowOffsetX = 1.5;
			ctx.shadowOffsetY = 1.5;
			
			ctx.font = "12pt Calibri";
			ctx.fillText("Add Note", 25, canvas.height - 25);
		ctx.restore();
	};
	
	function draw_remove() {
		ctx.save();
			ctx.fillStyle = "black";
			if(remove_hover) {
				ctx.fillStyle = "rgb(255, 0, 0)";
			};
			
			ctx.shadowColor = "rgb(190, 190, 190)";
			ctx.shadowOffsetX = 1.5;
			ctx.shadowOffsetY = 1.5;
			
			ctx.font = "12pt Calibri";
			ctx.fillText("Remove Note", 25, canvas.height - 5);
		ctx.restore();
	};
	
	function draw_help() {
		ctx.save()
			ctx.fillStyle = "black";
			if(help_hover) {
				ctx.fillStyle = "rgb(255, 0, 0)";
			};
			
			ctx.shadowColor = "rgb(190, 190, 190)";
			ctx.shadowOffsetX = 1.5;
			ctx.shadowOffsetY = 1.5;
			
			ctx.font = "12pt Calibri";
			ctx.fillText("Help", 25, canvas.height - 45);
			
			if(help_show) {
				
			};
		ctx.restore();
	};
	
	function draw_debug() {
		ctx.save();
			ctx.font = "6pt Calibri";
			ctx.fillStyle = "black";
			ctx.fillText(pointer + " (" + mouse_X + "," + mouse_Y + ")", 100, 235);
		ctx.restore();
	};
	/* End Draw Functions */
	
	/* Begin Update Functions */
	function Update() {
		draw();
		
		update_mouse();
	};
	
	function update_mouse() {
		help_hover = add_hover = remove_hover = false;
		
		if((mouse_X > 20 && mouse_X < 50) && (mouse_Y < (canvas.height - 35) && mouse_Y > (canvas.height - 55))) { help_hover = true; };

		if((mouse_X > 20 && mouse_X < 75) && (mouse_Y < (canvas.height - 15) && mouse_Y > (canvas.height - 35))) { add_hover = true; };
		
		if((mouse_X > 20 && mouse_X < 85) && (mouse_Y < (canvas.height - 5) && mouse_Y > (canvas.height - 15)))  { remove_hover = true; };
		
		if(help_hover       && pointer == '')     { pointer = 'help'; }
		else if(!help_hover && pointer == 'help') { pointer = '' };
		
		if(add_hover       && pointer == '')    { pointer = 'add'; }
		else if(!add_hover && pointer == 'add') { pointer = '' };
		
		if(remove_hover       && pointer == '')    { pointer = 'remove'; }
		else if(!remove_hover && pointer == 'remove') { pointer = '' };

		if(type == "show" || type == "new" || type == "edit") {
			ctx.save();
				ctx.scale(scale_X, scale_Y);
				ctx.save();
					if(number_of_fingerings >= 1) { fingering_chart1.Update(); };
				ctx.restore();
				ctx.save();
					if(number_of_fingerings >= 2) { fingering_chart2.Update(); };
				ctx.restore();
				ctx.save();
					if(number_of_fingerings >= 3) { fingering_chart3.Update(); };
				ctx.restore();
			ctx.restore();
		}
		else if(type == "note_search") {
			ctx.save();
				ctx.scale(scale_X, scale_Y);
				
				for(var i = 0; i < 3; i++) {
					ctx.save();
						if(number_of_fingerings >= i + 1) { note_chart[i].Update();	};
					ctx.restore();
				}
			ctx.restore();
		}
		else if(type == "fingering_search") {
			
		};
	};
	/* End Update Functions */
	
	/* Begin Events */
	function OnClick(e) {
		mouse_X = e.pageX - (canvas.offsetLeft + canvas.offsetParent.offsetLeft);
		mouse_Y = e.pageY - (canvas.offsetTop  + canvas.offsetParent.offsetTop);
		
		if(help_hover) { 
			debug_show = !debug_show;
			help_show  = !help_show;
		}
		else if(add_hover) {
			number_of_fingerings++;
			
			var k_default = "777777777777777777777777777777";
			var n_default = "f3";
			var t_default = "♮";
			
			if(type == "edit" || type == "new") {
				switch(number_of_fingerings) {
					case 2:
						fingering_chart2 = new Fingering_Chart(200, 0, k_default, n_default, t_default, false, "show");
					break;
					case 3:
						fingering_chart3 = new Fingering_Chart(400, 0, k_default, n_default, t_default, false, "show");
					break;
				};
			}
			else if(type == "note_search") {
				switch(number_of_fingerings) {
					case 2:
						note_chart[1] = new Note_Chart(200, 0);
					break;
					case 3:
						note_chart[2] = new Note_Chart(400, 0);
					break;
				};
			}
			

			ctx.canvas.width = 200 + (200 * scale_X * number_of_fingerings);
		}
		else if(remove_hover) {
			number_of_fingerings--;

			ctx.canvas.width = (number_of_fingerings == 1)?200 * scale_X:200 + (200 * scale_X * number_of_fingerings);
		}
		else if(type == "new" || type == "edit") {
			if(number_of_fingerings >= 1) { fingering_chart1.OnClick(); };
			if(number_of_fingerings >= 2) { fingering_chart2.OnClick(); };
			if(number_of_fingerings >= 3) { fingering_chart3.OnClick(); };
		}
		else if(type == "note_search") {
			if(number_of_fingerings >= 1) { note_chart[0].OnClick(); };
			if(number_of_fingerings >= 2) { note_chart[1].OnClick(); };
			if(number_of_fingerings >= 3) { note_chart[2].OnClick(); };
		}
	};
	
	function MouseMoved(e) {
		mouse_X = e.pageX - (canvas.offsetLeft + canvas.offsetParent.offsetLeft);
		mouse_Y = e.pageY - (canvas.offsetTop  + canvas.offsetParent.offsetTop);
		
		if(pointer) { document.body.style.cursor = 'pointer'; }
		else        { document.body.style.cursor = 'default'; };
	};
	/* End Events */
	
	/* Begin Helpers */
	function parseKeysString(keys_string) {
		var retArray = new Array(number_of_fingerings);
		
		if(number_of_fingerings >= 1) { retArray[0] = keys_string.substring(2, 32);   };
		if(number_of_fingerings >= 2) { retArray[1] = keys_string.substring(33, 63);  };
		if(number_of_fingerings >= 3) { retArray[2] = keys_string.substring(64, 94);  };
		
		return retArray;
	};
	
	function parseNotesString(notes_string) {
		var retArray = new Array(number_of_fingerings);
		
		var temp = new Array(number_of_fingerings);
		var str  = notes_string.substring(2);
		temp = str.split(',');

		if(number_of_fingerings >= 1) { retArray[0] = temp[0].substring(0,2); };
		if(number_of_fingerings >= 2) { retArray[1] = temp[1].substring(0,2); };
		if(number_of_fingerings >= 3) { retArray[2] = temp[2].substring(0,2); };
		
		return retArray;
	};

	function parseTonesString(tones_string) {
		var retArray = new Array(number_of_fingerings);
		
		var temp = new Array(number_of_fingerings);
		var str  = tones_string.substring(2);
		temp = str.split(',');
		
		if(number_of_fingerings >= 1) { retArray[0] = temp[0].substring(3); };
		if(number_of_fingerings >= 2) { retArray[1] = temp[1].substring(3); };
		if(number_of_fingerings >= 3) { retArray[2] = temp[2].substring(3); };
	
		for(i in retArray) {
			switch (retArray[i]) {
				case "natural":
					retArray[i] = "♮";
				break;
				case "flat":
					retArray[i] = "♭";
				break;
				case "sharp":
					retArray[i] = "♯";
				break;
			};
		};
	
		return retArray;
	};
	
	function ToString(type) {
		if(type == "show" || type == "edit") {
			switch(type) {
				case "keys":
					var ret = String(number_of_fingerings) + ':' + fingering_chart1.ToString("keys");
					if(number_of_fingerings >= 2) { ret +=   ',' + fingering_chart2.ToString("keys") };
					if(number_of_fingerings >= 3) { ret +=   ',' + fingering_chart3.ToString("keys") };
	
					return ret;
				break;
				case "note_tones":
					var ret = String(number_of_fingerings) + ':' + fingering_chart1.ToString("note_tones");
					if(number_of_fingerings >= 2) { ret +=   ',' + fingering_chart2.ToString("note_tones") };
					if(number_of_fingerings >= 3) { ret +=   ',' + fingering_chart3.ToString("note_tones") };
					
					return ret;
				break;
				default:
					return ToString("keys");
				break;
			};
		}
		else if(type == "note_search") {
			var ret = String(number_of_fingerings) + ':' + note_chart[0].ToString();
			if(number_of_fingerings >= 2) { ret +=   ',' + note_chart[1].ToString() };
			if(number_of_fingerings >= 3) { ret +=   ',' + note_chart[2].ToString() };
		};
	};	
	/* End Helpers */
};
