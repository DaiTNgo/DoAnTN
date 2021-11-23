/**
 *  0 - 10  : 50deg
 *  11 - 20 :150deg
 *  21 - 30 :250deg
 *  31 - 40 :350deg
 */

function currentVolt(val) {
	const volt = document.querySelector('.volt-value');
	const value = parseFloat(val);
	const rotor_volt = document.querySelector('.rotor-volt');
	const stator_volt = document.querySelector('.stator-volt');
	volt.innerHTML = val;
	if (value <= 10 && value >= 0) {
		Object.assign(rotor_volt.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(50deg)',
		});
	}
	if (value <= 20 && value >= 11) {
		Object.assign(rotor_volt.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
	}
	if (value <= 30 && value >= 21) {
		Object.assign(rotor_volt.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transform: 'rotate(50deg)',
			transition: 'transform 0.3s',
			// 'box-shadow': 'black 0px 3px 10px 0px inset',
		});
	}
	if (value >= 31) {
		Object.assign(rotor_volt.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
		Object.assign(stator_volt.style, {
			'background-image': 'linear-gradient(to right, blue 90%, red)',
		});
	}
}
function currentPower(val) {
	const power = document.querySelector('.power-value');
	const value = parseFloat(val);
	const rotor_power = document.querySelector('.rotor-power');
	const stator_power = document.querySelector('.stator-power');
	power.innerHTML = val;
	if (value <= 10 && value >= 0) {
		Object.assign(rotor_power.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(50deg)',
		});
	}
	if (value <= 20 && value >= 11) {
		Object.assign(rotor_power.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
	}
	if (value <= 30 && value >= 21) {
		Object.assign(rotor_power.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transform: 'rotate(50deg)',
			transition: 'transform 0.3s',
		});
	}
	if (value >= 31) {
		Object.assign(rotor_power.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
		Object.assign(stator_power.style, {
			'background-image': 'linear-gradient(to right, blue 90%, red)',
		});
	}
}
function currentAmp(val) {
	const amp = document.querySelector('.amp-value');
	const value = parseFloat(val);
	const rotor_amp = document.querySelector('.rotor-amp');
	const stator_amp = document.querySelector('.stator-amp');
	amp.innerHTML = val;
	if (value <= 10 && value >= 0) {
		Object.assign(rotor_amp.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(50deg)',
		});
	}
	if (value <= 20 && value >= 11) {
		Object.assign(rotor_amp.style, {
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
	}
	if (value <= 30 && value >= 21) {
		Object.assign(rotor_amp.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transform: 'rotate(50deg)',
			transition: 'transform 0.3s',
		});
	}
	if (value >= 31) {
		Object.assign(rotor_amp.style, {
			'background-image': 'linear-gradient(to right, blue, red)',
			transition: 'transform 0.3s',
			transform: 'rotate(150deg)',
		});
		Object.assign(stator_amp.style, {
			'background-image': 'linear-gradient(to right, blue 90%, red)',
		});
	}
}
async function getCurrentValue() {
	const { data } = await axios.get('http://localhost:3000/api/current-time');
	const { volt, amp } = data[0];
	currentVolt(volt.toFixed(2));
	currentAmp(amp.toFixed(2));
	currentPower((volt * amp).toFixed(2));
}
getCurrentValue();
setInterval(async () => {
	const { data } = await axios.get('http://localhost:3000/api/current-time');
	const { volt, amp } = data[0];
	currentVolt(volt.toFixed(2));
	currentAmp(amp.toFixed(2));
}, 60000);
