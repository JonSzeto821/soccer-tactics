$(document).ready(function() {
	console.log("loading client-side js");
	console.log(dots);
	$('button#save-btn').on('click', function() {
		console.log('clicked!!!');
		let newPosition = {'dots':JSON.stringify(dots)}

		$.post('', newPosition, function() {
			

		});
	});
});



function updateDots(d) {
	for(let i=0; i<dots.length; i++) {
		if(dots[i].id == d.id){
			dots[i] = d;
		}
	}
};

