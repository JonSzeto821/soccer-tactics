$(document).ready(function() {
	console.log("loading client-side js");

	//Save Formation changes
	$('button.js-save-btn').on('click', function() {
		console.log('Formation Saved!');
		let newPosition = {'dots':JSON.stringify(dots)}

		$.post('', newPosition, function() {
			
		});
		alert('Formation Saved!');
	});

	//Cancel button
	$('button.js-cancel-btn').on('click', function() {
		console.log('Formation Cancelled!');
		//create a new post document on click of button
		
	});

	//Fork button
	/*create a new formation for the user of the current formation*/
	$('#js-fork-btn').on('click', function() {
		console.log('Formation Forked!');
		console.log(dots);
		//redirect the user back to list of formations
		let newPosition = {'dots':JSON.stringify(dots)}
		let name = prompt("Please pick a name", $('#formName').text());
		newPosition.name = name;

		$.post('/forkForm', newPosition, function() {
			
		});
	});

	//Delete button
	$('button.js-delete-btn').on('click', function() {
		console.log('Formation Deleted!');
		$.ajax({
		    url: '',
		    type: 'DELETE',
		    success: function(result) {
		        // Do something with the result
		        console.log(result, 'hello');
		    }
		})
	});

	// Edit button
	// $('button.js-edit-btn').on('click', function() {
	// 	console.log('Formation Edited!');
	// });

	//Add Player button - team1
	$('button.js-addPlayer-btn').on('click', function() {
		console.log('Player Node Added to Team 1!');
		const maximum = 99;
		const minimum = 0;
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		let addPlayer = '';
		console.log(dots);
		console.log(dots.length);
		dots.push({id: Date.now(), x: randomNumber, y: randomNumber, player: randomNumber, name: "Assign Position", team: "Team 1"});

		addPlayer += `
			<tr data-player-id="{{this.id}}" contentEditable="true" class="table-content">
				<td data-player="{{this.player}}">{{this.player}}</td>
				<td data-name="{{this.name}}">{{this.name}}</td>
				<td contentEditable="false" class="center"><button id='js-remove-player' class="player-delete">Delete</button></td>
			</tr>`;

		 $('#team1-table').append(addPlayer);

		// use jquery to add this.new player to the list without refresh
		//google adding list item to table with jquery

	});

	//Add Player button - team2
	$('button.js-addPlayer-btn2').on('click', function() {
		console.log('Player Node Added to Team 2!');
		const maximum = 99;
		const minimum = 0;
		let addPlayer = '';
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		//console.log(team2);
		dots.push({id: Date.now(), x: randomNumber, y: randomNumber, player: randomNumber, name: "new Player", team: "Team 2"});

		addPlayer += `
			<tr data-player-id="{{this.id}}" contentEditable="true" class="table-content">
				<td data-player="{{this.player}}">{{this.player}}</td>
				<td data-name="{{this.name}}">Assign Position</td>
				<td contentEditable="false" class="center"><button id='js-remove-player' class="player-delete">Delete</button></td>
			</tr>`;

		 $('#team2-table').append(addPlayer);
	});
		// use jquery to add this.new playerto the list without refresh
		//google adding list item to table with jquery


	//Delete player node
	/*$('button#js-remove-player').on('click', function() {
		let id = $(this).parent().parent().data('player-id');
		console.log('Player Node Deleted!');
		console.log($(this).parent().parent().data('player-id'));

		$.ajax({
		    url: `/formation/delete/${id}`,
		    type: 'DELETE',
		    success: function(result) {
		        // Do something with the result
		        console.log(result, 'hello');
		        $("table").find(`[data-player-id='${id}']`).remove();


	    }
	});*/

	//remove player from player table and player node from formation board
	$('button#js-remove-player').on('click', function() {
		let id = $(this).parent().parent().data('player-id');
		dots.splice(dots.findIndex(function(i){
    		return i.id === id;
    	}), 1);
		$("table").find(`[data-player-id='${id}']`).remove();
	});


	//Update data in player table
	$('tr').keyup(function(e) {

		//look the variable mapping for the variables to the value in .find()
		console.log($(this).data('player-id'));
		console.log($(this).find("[data-team]").text());
		let team = $(this).find("[data-team]").text();
		let player = $(this).find("[data-player]").text();
		let name = $(this).find("[data-name]").text();
		let id = $(this).data('player-id');
		updateDots({id:id, player:player, team:team, name:name});
	});

	//toggle the player table accordion to open and close
	$(".accordion").on("click", ".accordion-header", function() {
 		$(this).toggleClass("active").next().slideToggle();
 	});

	//toggle player table based on viewport size gets readjusted
 	$(window).resize(function(e){
        console.log($(this).width())
        toggleTable();
	});
});

//toggle navbar open and close
$(document).ready(function(){
	toggleTable();
	$('label').click(function(){ 
		console.log('Navbar logging!');
		$('#nav-icon3').toggleClass('open')})
});

//auto resize comment textarea
$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });

//function toggles accordion to open and close
function toggleTable() {
        if($(window).width() > 600 && !$('.accordion-header').hasClass("active")){
        	$('.accordion-header').addClass("active").next().slideToggle();
       }else if($(window).width() < 600 && $('.accordion-header').hasClass("active")) {
       		$('.accordion-header').removeClass("active").next().slideToggle();
       }else {

       }
};

function editDot(d) {
	console.log(d);

};

function updateDots(d) {
	for(let i=0; i<dots.length; i++) {
		if(dots[i].id == d.id){
			console.log(d);
			for (let key in d) {
				console.log(key);
				dots[i][key] = d[key]
			}
		}
	}
	console.log(dots);
};


/*function updateDots(d) {
	for(let i=0; i<dots.length; i++) {
		if(dots[i].id == d.id){
			dots[i] = d;
		}
	}
};*/

