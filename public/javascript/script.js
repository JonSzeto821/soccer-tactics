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
		//redirect the user back to list of formations
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
		
	});

	//Get value from dropdown
	$('#team1, #team2').change(function(){
    	console.log($(this).val());
    	console.log($(this).attr('id'));
	});

	//Delete player node
	$('button#js-remove-player').on('click', function() {
		console.log('Player Node Deleted!');
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

