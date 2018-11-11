$(document).ready(() => {
	const [maximum, minimum] = [99, 0]
	const [maxX1, minX1, maxY1, minY1] = [525, 0, 680, 0];
	const [maxX2, minX2, maxY2, minY2] = [1000, 526, 680, 0];

	//Save Formation changes
	$('button.js-save-btn').on('click', () => {
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
	$('#js-fork-btn').on('click', () => {
		//redirect the user back to list of formations
		let newPosition = {'dots':JSON.stringify(dots)}
		let name = prompt("Provide formation name", $('#formName').text());
		if(name == null){
			return
		}
		newPosition.name = name;

		$.post('/forkForm', newPosition, () => {});
	});

	//Delete formation
	$('button.js-delete-btn').on('click', () => {
		$.ajax({
		    url: '',
		    type: 'DELETE',
		    success: result => {
		        window.location.replace("/profile");
		    }
		})
	});

	//Add Player button - Team1
	$('button.js-addPlayer-btn').on('click', () => {
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		let randomXCoord = Math.floor(Math.random() * (maxX1 - minX1 + 1)) + minX1;
		let randomYCoord = Math.floor(Math.random() * (maxY1 - minY1 + 1)) + minY1;

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
	$('button.js-addPlayer-btn2').on('click', () => {
		let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		let randomXCoord = Math.floor(Math.random() * (maxX2 - minX2 + 1)) + minX2;
		let randomYCoord = Math.floor(Math.random() * (maxY2 - minY2 + 1)) + minY2;

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
	$('button#js-remove-player').on('click', () => {
		let id = $(this).parent().parent().data('player-id');

  		for(let i=0; i<dots.length; i++) {
  			if(dots[i].id == id) {
					// console.log('dots', dots);
					// console.log('i', i);
  				dots.splice(i, 1);
  			}

				dots.forEach(i => {
				console.log('forEach', dots);
				// console.log('apple', i);
				// 	if(i.id == id) {
				// 		dots.splice(i, 1);
				// 	}
				});

  		}
    	//remove player from table
		$("table").find(`[data-player-id='${id}']`).remove();
		modified = true;
	});

	//Update data in player table
	$('tr').keyup(e => {
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
 	$(window).resize(e => toggleTable());
});

//toggle navbar open and close
$(document).ready(() => {
	toggleTable();
	$('label').click(() => {
		$('#nav-icon3').toggleClass('open')})
});

//auto resize comment textarea
$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', () => {
        let savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', () => {
        let minRows = this.getAttribute('data-min-rows')|0, rows;
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
