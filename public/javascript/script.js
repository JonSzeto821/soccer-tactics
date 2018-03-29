$(document).ready(function() {
	console.log("loading client-side js");
	console.log(dots);
	$('button.js-save-btn').on('click', function() {
		console.log('Formation Saved!');
		let newPosition = {'dots':JSON.stringify(dots)}

		$.post('', newPosition, function() {
			

		});
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
		//redirect the user back to list of formations
	});

	//Cancel button
	$('button.js-delete-btn').on('click', function() {
		console.log('Formation Deleted!');
		//redirect the user back to list of formations
	});

	//Edit button
	$('button.js-edit-btn').on('click', function() {
		console.log('Formation Edited!');
		
	});

	//Add Player button
	$('button.js-addPlayer-btn').on('click', function() {
		console.log('Player Node Added!');
		const maximum = 99;
		const minimum = 0;
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		
		console.log(randomNumber);
		dots.push(
			{player: randomNumber, team: "Real Madrid", y: 500, x: 321, id: 4})
		});

	//Get value from dropdown
	$('#team1, #team2').change(function(){
    	console.log($(this).val());
    	console.log($(this).attr('id'));
	});

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

	$('button#js-remove-player').on('click', function() {
		let id = $(this).parent().parent().data('player-id');
		dots.splice(dots.findIndex(function(i){
    		return i.id === id;
    	}), 1);
		$("table").find(`[data-player-id='${id}']`).remove();
	});


	//Update data in player table
	$('tr').keyup(function(e) {
		console.log($(this).data('player-id'));
		console.log($(this).find("[data-team]").text());
		let team = $(this).find("[data-team]").text();
		let player = $(this).find("[data-player]").text();
		let id = $(this).data('player-id');
		updateDots({id:id, player:player, team:team});
	});
});


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

