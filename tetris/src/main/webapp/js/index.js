let generated_tetris_now = [];
let generated_tetris_next = [];
let key_location_arr = [];
let tetris_num = 0;
let rotation_num = 0
let is_I_rotation_f;
let flow_id;
let done_id;
let is_done;
let block = [];

function init_block() {
	for (let i = 1; i <= 10; i++)
		block[i] = 25;
}
function init_generatior() {
	generated_tetris_now = array_generator();
	generated_tetris_next = array_generator();
	init_block();
	tetris_generator();
	flow_turn();
}
function array_generator() {
	const tetris_array = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
	tetris_array.sort(() => Math.random() - 0.5);
	return tetris_array;
}
function tetris_generator() {
	is_I_rotation_f = true;
	is_done = false;
	rotation_num = 0;
	key_location_arr[0] = '2_5';
	console.log('현재 배열 : ' + generated_tetris_now);
	shape_rotation();
}
window.addEventListener('keydown', e => {
	if ((e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' || e.keyCode == '32') && e.shiftKey == false) {
		tetris_eraze();
		if (e.keyCode == '37' && check_left_block()) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) - 1);
		}
		else if (e.keyCode == '39' && check_right_block()) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) + 1);
		}
		else if (e.keyCode == '40') {
			if (check_put_block())
				key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
			clearTimeout(flow_id);
			flow_turn();
		}
		else if (e.keyCode == '38') {
			if (rotation_num == 3)
				rotation_num = 0;
			else
				rotation_num++;
			if (generated_tetris_now[tetris_num] == 'I') {
				if (rotation_num == 0 && !is_I_rotation_f)
					key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) -1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1);
				else if (rotation_num == 1) {
					key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1)) +1);
					is_I_rotation_f = false;
				}
				else if (rotation_num == 2)
					key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) +1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1);
				else
					key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1)) -1);
			}
		}
		else {

		}
		shape_rotation();
	}
});
function check_set_arr() {
	let v_location_set = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')));
	let h_location_set = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1));
	let bool_check_arr = true; 
	for (let location of key_location_arr) {
		if (parseInt(location.substring(location.indexOf('_') +1)) < 1) {
			h_location_set++;
			bool_check_arr = false;
		}
		else if (parseInt(location.substring(location.indexOf('_') +1)) > 10) {
			h_location_set--;
			bool_check_arr = false;
		}
		else if (parseInt(location.substring(0, location.indexOf('_'))) > 24) {
			v_location_set--;
			bool_check_arr = false;
		}
	}
	key_location_arr[0] = v_location_set + '_' + h_location_set;
	return bool_check_arr;
}
function shape_rotation() {
	let U = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) - 1;
	let C1 = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')));
	let D = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1;
	let L = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) - 1;
	let C2 = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1));
	let R = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) + 1;
	let color;
	switch (generated_tetris_now[tetris_num]) {
		case 'I' : case 'T': case 'L': case 'J': {
			if (rotation_num == 0 || rotation_num == 2) {
				key_location_arr[1] = C1 + '_' + L;
				key_location_arr[2] = C1 + '_' + R;
				if (generated_tetris_now[tetris_num] == 'I') {
					if (rotation_num == 0)
						key_location_arr[3] = C1 + '_' + (R +1);
					else 
						key_location_arr[3] = C1 + '_' + (L -1);
					color = 'skyblue';
				}
				else if (generated_tetris_now[tetris_num] == 'T') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + C2;
					else
						key_location_arr[3] = D + '_' + C2;
					color = 'purple';
				}
				else if (generated_tetris_now[tetris_num] == 'L') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + R;
					else
						key_location_arr[3] = D + '_' + L;
					color = 'orange';
				}
				else if (generated_tetris_now[tetris_num] == 'J') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + L;
					else
						key_location_arr[3] = D + '_' + R;
					color = 'blue';
				}
			}
			else {
				key_location_arr[1] = U + '_' + C2;
				key_location_arr[2] = D + '_' + C2;
				if (generated_tetris_now[tetris_num] == 'I') {
					if (rotation_num == 1)
						key_location_arr[3] = (D +1) + '_' + C2;
					else if (rotation_num == 3)
						key_location_arr[3] = (U -1) + '_' + C2;
					color = 'skyblue';
				}
				else if (generated_tetris_now[tetris_num] == 'T') {
					if (rotation_num == 1)
						key_location_arr[3] = C1 + '_' + R;
					else
						key_location_arr[3] = C1 + '_' + L;
					color = 'purple';
				}
				else if (generated_tetris_now[tetris_num] == 'L') {
					if (rotation_num == 1)
						key_location_arr[3] = D + '_' + R;
					else
						key_location_arr[3] = U + '_' + L;
					color = 'orange';
				}
				else if (generated_tetris_now[tetris_num] == 'J') {
					if (rotation_num == 1)
						key_location_arr[3] = U + '_' + R;
					else
						key_location_arr[3] = D + '_' + L;
					color = 'blue';
				}
			}
			break;
		}
		case 'O': {
			key_location_arr[1] = U + '_' + C2;
			key_location_arr[2] = U + '_' + R;
			key_location_arr[3] = C1 + '_' + R;
			color = 'yellow';
			break;
		}
		case 'S': {
			if (rotation_num == 0) {
				key_location_arr[1] = D + '_' + L;
				key_location_arr[2] = D + '_' + C2;
				key_location_arr[3] = C1 + '_' + R;
			}
			else if (rotation_num == 1) {
				key_location_arr[1] = U + '_' + L;
				key_location_arr[2] = C1 + '_' + L;
				key_location_arr[3] = D + '_' + C2;
			}
			else if (rotation_num == 2) {
				key_location_arr[1] = C1 + '_' + L;
				key_location_arr[2] = U + '_' + C2;
				key_location_arr[3] = U + '_' + R;
			}
			else {
				key_location_arr[1] = U + '_' + C2;
				key_location_arr[2] = C1 + '_' + R;
				key_location_arr[3] = D + '_' + R;
			}
			color = 'green';
			break;
		}
		case 'Z': {
			if (rotation_num == 0) {
				key_location_arr[1] = C1 + '_' + L;
				key_location_arr[2] = D + '_' + C2;
				key_location_arr[3] = D + '_' + R;
			}
			else if (rotation_num == 1) {
				key_location_arr[1] = U + '_' + C2;
				key_location_arr[2] = C1 + '_' + L;
				key_location_arr[3] = D + '_' + L;
			}
			else if (rotation_num == 2) {
				key_location_arr[1] = U + '_' + L;
				key_location_arr[2] = U + '_' + C2;
				key_location_arr[3] = C1 + '_' + R;
			}
			else {
				key_location_arr[1] = D + '_' + C2;
				key_location_arr[2] = U + '_' + R;
				key_location_arr[3] = C1 + '_' + R;
			}
			color = 'red';
			break;
		}
	}
	if (!check_set_arr())
		return shape_rotation();
	tetris_coloring(color);
}
function tetris_coloring(color) {
	let tetris_child = document.createElement('div');
	tetris_child.setAttribute('class', 'tetris_coloring');
	for (let i of key_location_arr) {
		let tetris_child = document.createElement('div');
		tetris_child.setAttribute('class', 'tetris_coloring');
		$('#'+i).append(tetris_child);
	}
	$('.tetris_coloring').css('background-color', color);
}
function tetris_eraze() {
	for (let i of key_location_arr) {
		$('#'+i).children().remove();
	}
}
function flow_turn() {
	flow_id = setTimeout(() => {
		if (check_put_block()) {
			clearTimeout(done_id);
			tetris_eraze();
			key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
			shape_rotation();
		}
		else {
			done_id = setTimeout(() => {
				is_done = true;
			}, 1500);
		}
		return flow_turn();
	}, 1000);
}
function check_left_block() {
	for (let k of key_location_arr) {
		if (k.substring(k.indexOf('_') +1) == '1')
			return false;
	}
	return true;
}
function check_right_block() {
	for (let k of key_location_arr) {
		if (k.substring(k.indexOf('_') +1) == '10')
			return false;
	}
	return true;
}
function set_block() {
	for (let i = 1; i <= block.length; i++) {
		for (let j = 1; j <= 24; j--) {
			if ($('#'+j+'_'+i).style.backgroundColor != 'gray') {
				block[i] = j -1;
				break;
			}
		}
	}
}
function check_put_block() {
	for (let i of key_location_arr) {
		let block_location = parseInt(i.substring(0, parseInt(i.indexOf('_'))));
		let stacked_block = block[parseInt(i.substring(parseInt(i.indexOf('_')) +1))];
		if (block_location +1 == stacked_block)
			return false;
	}
	return true;
}
function check_done() {
	
}
init_generatior();