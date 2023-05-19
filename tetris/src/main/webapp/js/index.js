let generated_tetris_now = [];
let generated_tetris_next = [];
let key_location_arr = [];
let tetris_num = 0;
let rotation_num = 0
let flow_id;
function init_generatior() {
	generated_tetris_now = array_generator();
	generated_tetris_next = array_generator();
	tetris_generator();
	flow_turn();
}
function array_generator() {
	const tetris_array = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
	tetris_array.sort(() => Math.random() - 0.5);
	return tetris_array;
}
function tetris_generator() {
	rotation_num = 0;
	key_location_arr[0] = '2_5';
	console.log('현재 배열 : ' + generated_tetris_now);
	shape_rotation();
}
window.addEventListener('keydown', e => {
	if ((e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' || e.keyCode == '32') && e.shiftKey == false) {
		tetris_eraze();
		if (e.keyCode == '37' && e.shiftKey == false) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) - 1);
		}
		else if (e.keyCode == '39' && e.shiftKey == false) {
			key_location_arr[0] = key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')) + '_' + (parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) + 1);
		}
		else if (e.keyCode == '40' && e.shiftKey == false) {
			key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
			clearTimeout(flow_id);
			flow_turn();
		}
		else if ((e.keyCode == '32') && e.shiftKey == false) {
			if (rotation_num == 3)
				rotation_num = 0;
			else
				rotation_num++;
		}
		else {

		}
		shape_rotation();
	}
});
function shape_rotation() {
	let U = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) - 1;
	let C1 = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_')));
	let D = parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1;
	let L = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) - 1;
	let C2 = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1));
	let R = parseInt(key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1)) + 1;
	let color;
	switch (generated_tetris_now[tetris_num]) {
		case 'I': case 'T': case 'L': case 'J': {
			if (rotation_num == 0 || rotation_num == 2) {
				key_location_arr[1] = C1 + '_' + L;
				key_location_arr[2] = C1 + '_' + R;
				if (generated_tetris_now[tetris_num] == 'I') {
					key_location_arr[3] = C1 + '_' + (R + 1);
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
					key_location_arr[3] = (D + 1) + '_' + C2;
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
			if (rotation_num == 0 || rotation_num == 2) {
				key_location_arr[1] = U + '_' + C2;
				key_location_arr[2] = U + '_' + R;
				key_location_arr[3] = C1 + '_' + L;
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
			if (rotation_num == 0 || rotation_num == 2) {
				key_location_arr[1] = U + '_' + L;
				key_location_arr[2] = U + '_' + C2;
				key_location_arr[3] = C1 + '_' + R;
			}
			else {
				key_location_arr[1] = U + '_' + R;
				key_location_arr[2] = C1 + '_' + R;
				key_location_arr[3] = D + '_' + C2;
			}
			color = 'red';
			break;
		}
	}
	tetris_coloring(color);
}
function tetris_coloring(color) {
	for (let i of key_location_arr)
		$('#' + i).css('background-color', color);
}
function tetris_eraze() {
	tetris_coloring('gray');
}
function flow_turn() {
	flow_id = setTimeout(() => {
		tetris_eraze();
		key_location_arr[0] = (parseInt(key_location_arr[0].substring(0, key_location_arr[0].indexOf('_'))) + 1) + '_' + key_location_arr[0].substring(key_location_arr[0].indexOf('_') + 1);
		console.log('키 로케이션' + key_location_arr[0]);
		shape_rotation();
		return flow_turn();
	}, 1000);
};
init_generatior();