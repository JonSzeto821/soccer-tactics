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
});




function updateDots(d) {
	for(let i=0; i<dots.length; i++) {
		if(dots[i].id == d.id){
			dots[i] = d;
		}
	}
};


