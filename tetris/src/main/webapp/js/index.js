let generated_tetris_now = [];
let generated_tetris_next = [];
let key_location_arr = [];
let tetris_num = 0;
let rotation_num = 0
let is_I_rotation_f;
let flow_id;
let done_id;
let is_done;

function init_generatior() {
	generated_tetris_now = array_generator();
	generated_tetris_next = array_generator();
	tetris_generator();
	flow_turn();
}
function array_generator() {
	const tetris_array = [['I', 'skyblue'], ['O', 'yellow'], ['T', 'purple'], ['L', 'orange'], ['J', 'blue'], ['S', 'green'], ['Z', 'red']];
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
window.addEventListener('keyup', e => {
	if ((e.keyCode == '32' || e.keyCode == '38') && e.shiftKey == false) {
		tetris_eraze();
		if (e.keyCode == '38') {
			if (rotation_num == 3)
				rotation_num = 0;
			else
				rotation_num++;
			if (generated_tetris_now[tetris_num][0] == 'I') {
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
			for (let i = 2; i <= 24; i++) {
				if (!check_block_d())
					break;
				key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
				key_location_arr[1] = (parseInt(key_location_arr[1].substring(0, key_location_arr[1].indexOf('_'))) + 1) + '_' + key_location_arr[1].substring(key_location_arr[1].indexOf('_') + 1);
				key_location_arr[2] = (parseInt(key_location_arr[2].substring(0, key_location_arr[2].indexOf('_'))) + 1) + '_' + key_location_arr[2].substring(key_location_arr[2].indexOf('_') + 1);
				key_location_arr[3] = (parseInt(key_location_arr[3].substring(0, key_location_arr[3].indexOf('_'))) + 1) + '_' + key_location_arr[3].substring(key_location_arr[3].indexOf('_') + 1);
			}
		}
		shape_rotation();
	}
});
window.addEventListener('keydown', e => {
	if ((e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '40') && e.shiftKey == false) {
		tetris_eraze();
		if (e.keyCode == '37' && check_block_l()) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) - 1);
		}
		else if (e.keyCode == '39' && check_block_r()) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) + 1);
		}
		else if (e.keyCode == '40') {
			if (check_block_d()) {
				key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
				clearTimeout(flow_id);
				flow_turn();
			}
		}
		shape_rotation();
	}
});
function check_set_arr() {
	let v_location_set = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')));
	let h_location_set = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') +1));
	let bool_check_arr = true; 
	let bool_v_check = true;
	for (let location of key_location_arr) {
		if (parseInt(location.substring(location.indexOf('_') +1)) < 1) {
			h_location_set++;
			bool_check_arr = false;
		}
		else if (parseInt(location.substring(location.indexOf('_') +1)) > 10) {
			h_location_set--;
			bool_check_arr = false;
		}
		else if (bool_v_check && parseInt(location.substring(0, location.indexOf('_'))) > 24) {
			v_location_set--;
			bool_check_arr = false;
			bool_v_check = false;
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
	switch (generated_tetris_now[tetris_num][0]) {
		case 'I' : case 'T': case 'L': case 'J': {
			if (rotation_num == 0 || rotation_num == 2) {
				key_location_arr[1] = C1 + '_' + L;
				key_location_arr[2] = C1 + '_' + R;
				if (generated_tetris_now[tetris_num][0] == 'I') {
					if (rotation_num == 0)
						key_location_arr[3] = C1 + '_' + (R +1);
					else 
						key_location_arr[3] = C1 + '_' + (L -1);
				}
				else if (generated_tetris_now[tetris_num][0] == 'T') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + C2;
					else
						key_location_arr[3] = D + '_' + C2;
				}
				else if (generated_tetris_now[tetris_num][0] == 'L') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + R;
					else
						key_location_arr[3] = D + '_' + L;
				}
				else if (generated_tetris_now[tetris_num][0] == 'J') {
					if (rotation_num == 0)
						key_location_arr[3] = U + '_' + L;
					else
						key_location_arr[3] = D + '_' + R;
				}
			}
			else {
				key_location_arr[1] = U + '_' + C2;
				key_location_arr[2] = D + '_' + C2;
				if (generated_tetris_now[tetris_num][0] == 'I') {
					if (rotation_num == 1)
						key_location_arr[3] = (D +1) + '_' + C2;
					else if (rotation_num == 3)
						key_location_arr[3] = (U -1) + '_' + C2;
				}
				else if (generated_tetris_now[tetris_num][0] == 'T') {
					if (rotation_num == 1)
						key_location_arr[3] = C1 + '_' + R;
					else
						key_location_arr[3] = C1 + '_' + L;
				}
				else if (generated_tetris_now[tetris_num][0] == 'L') {
					if (rotation_num == 1)
						key_location_arr[3] = D + '_' + R;
					else
						key_location_arr[3] = U + '_' + L;
				}
				else if (generated_tetris_now[tetris_num][0] == 'J') {
					if (rotation_num == 1)
						key_location_arr[3] = U + '_' + R;
					else
						key_location_arr[3] = D + '_' + L;
				}
			}
			break;
		}
		case 'O': {
			key_location_arr[1] = U + '_' + C2;
			key_location_arr[2] = U + '_' + R;
			key_location_arr[3] = C1 + '_' + R;
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
			break;
		}
	}
	if (!check_set_arr())
		return shape_rotation();
	tetris_coloring(generated_tetris_now[tetris_num][1]);
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
function set_block_checker() {
	for (let j of key_location_arr) {
		
	}
}
function tetris_eraze() {
	for (let i of key_location_arr) {
		$('#'+i).children().remove();
	}
}
function flow_turn() {
	flow_id = setTimeout(() => {
		if (check_block_d()) {
			tetris_eraze();
			key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
			shape_rotation();
			is_done = false;
		}
		else if (!check_block_d() && done_id == null) {
			console.log('블럭 막힘!');
			is_done = true;
			done_id = setTimeout(() => {
			done_check();
			}, 500);
		}
		return flow_turn();
	}, 1000);
}
function check_block_l() {
	for (let k of key_location_arr) {
		let block_location_l = k.substring(0, k.indexOf('_')) + '_' + (parseInt(k.substring(k.indexOf('_') +1)) -1);
		if ($('#' + block_location_l).css('background-color') != 'rgb(128, 128, 128)' || k.substring(k.indexOf('_') +1) == '1')
			return false;
	}
	return true;
}
function check_block_r() {
	for (let k of key_location_arr) {
		let block_location_r = k.substring(0, k.indexOf('_')) + '_' + (parseInt(k.substring(k.indexOf('_') +1)) +1);
		if ($('#' + block_location_r).css('background-color') != 'rgb(128, 128, 128)' || k.substring(k.indexOf('_') +1) == '10')
			return false;
	}
	return true;
}
function check_block_d() {
	for (let k of key_location_arr) {
		let block_location_d = (parseInt(k.substring(0, parseInt(k.indexOf('_')))) +1) + '_' + k.substring(k.indexOf('_') +1);
		if ($('#' + block_location_d).css('background-color') != 'rgb(128, 128, 128)' || k.substring(k.indexOf('_') +1) == '24')
			return false;
	}
	return true;
}
function done_check() {
	if (is_done) {
		if (!check_block_d()) {
			stack_block();
		}
		else {
			clearTimeout(done_id);
			is_done = false;
		}
	}
	done_id = null;
}
function stack_block() {
	for (let i of key_location_arr) {
		$('#'+i).css('backgroundColor', generated_tetris_now[tetris_num][1]);
	}
	tetris_eraze();
	if (tetris_num == 6) {
		tetris_num = 0;
		generated_tetris_now = generated_tetris_next;
		generated_tetris_now = array_generator();
	}
	else 
		tetris_num++;
	tetris_generator();
}
init_generatior();