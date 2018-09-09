$(document).ready(function() {

	//Save Formation changes
	$('button.js-save-btn').on('click', function() {
		let newPosition = {'dots':JSON.stringify(dots)}

		$.ajax({
		    url: '',
		    type: 'PUT',
		    data: newPosition
		});

		alert('Formation Saved!');
		modified = false;
	});

	//Fork formation 
	$('#js-fork-btn').on('click', function() {
		//redirect the user back to list of formations
		let newPosition = {'dots':JSON.stringify(dots)}
		let name = prompt("Provide formation name", $('#formName').text());
		if(name == null){
			return 
		}
		newPosition.name = name;

		$.post('/forkForm', newPosition, function() {});
	});

	//Delete formation
	$('button.js-delete-btn').on('click', function() {
		$.ajax({
		    url: '',
		    type: 'DELETE',
		    success: function(result) {
		        window.location.replace("/profile");
		    }
		})
	});

	//Add Player button - Team1
	$('button.js-addPlayer-btn').on('click', function() {
		const maximum = 99;
		const minimum = 0;
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

		const maxX = 525;
		const minX = 0;
		let randomXCoord = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

		const maxY = 680;
		const minY = 0;
		let randomYCoord = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
		
		let addPlayer = '';
		let team = 'Team 1';
		let id = Date.now();
		let name = 'Assign Position';

		dots.push({id: id, x: randomXCoord, y: randomYCoord, player: randomNumber, name: name, team: team});

		addPlayer += `
			<tr data-player-id="${id}" contentEditable="true" class="table-content">
				<td data-team = "${team}" class="hidden">${team}</td>
				<td data-player="${randomNumber}">${randomNumber}</td>
				<td data-name="${name}">${name}</td>
				<td contentEditable="false" class="center"><button id='js-remove-player' class="player-delete">Delete</button></td>
			</tr>`;
			addDot();
		 $('#team1-table').append(addPlayer);
	});

	//Add Player button - Team2
	$('button.js-addPlayer-btn2').on('click', function() {
		const maximum = 99;
		const minimum = 0;
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

		const maxX = 1000;
		const minX = 526;
		let randomXCoord = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

		const maxY = 680;
		const minY = 0;
		let randomYCoord = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

		let addPlayer = '';
		let team = 'Team 2';
		let id = Date.now();
		let name = 'Assign Position';
		
		dots.push({id: id, x: randomXCoord, y: randomYCoord, player: randomNumber, name: name, team: team});

		addPlayer += `
			<tr data-player-id="${id}" contentEditable="true" class="table-content">
				<td data-team = "${team}" class="hidden">${team}</td>
				<td data-player="${randomNumber}">${randomNumber}</td>
				<td data-name="${name}">${name}</td>
				<td contentEditable="false" class="center"><button id='js-remove-player' class="player-delete">Delete</button></td>
			</tr>`;
			addDot();
		 $('#team2-table').append(addPlayer);
	});

	//remove player from player table and player node from formation board
	$('button#js-remove-player').on('click', function() {
		let id = $(this).parent().parent().data('player-id');

  		for(let i=0; i<dots.length; i++) {
  			if(dots[i].id == id) {
  				dots.splice(i, 1);
  			}

  		}
    	//remove player from table
		$("table").find(`[data-player-id='${id}']`).remove();
		modified = true;
	});


	//Update data in player table
	$('tr').keyup(function(e) {
		//look the variable mapping for the variables to the value in .find()
		let team = $(this).find("[data-team]").text();
		let player = $(this).find("[data-player]").text();
		let name = $(this).find("[data-name]").text();
		let id = $(this).data('player-id');
		updateDots({id:id, player:player, team:team, name:name});
		modified = true;
	});

	//toggle the player table accordion to open and close
	$(".accordion").on("click", ".accordion-header", function() {
 		$(this).toggleClass("active").next().slideToggle();
 	});

	//toggle player table based on viewport size gets readjusted
 	$(window).resize(function(e){
        toggleTable();
	});
});

//toggle navbar open and close
$(document).ready(function(){
	toggleTable();
	$('label').click(function(){ 
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

function updateDots(d) {
	for(let i=0; i<dots.length; i++) {
		if(dots[i].id == d.id){
			for (let key in d) {
				dots[i][key] = d[key]
			}
		}
	}
};
