config.frameDivider = 4
config.bufferSize = 32

function quantize(input, division) {
	return Math.round(input * division) / division
}

let prev = 0;

function process(block) {
	// Per-block inputs:
	// block.knobs[i]
	// block.switches[i]
	
	for (let j = 0; j < block.bufferSize; j++) {
		// Per-sample inputs:
		// block.inputs[i][j]

		// Per-sample outputs:
		// block.outputs[i][j]

		// drum arrangement by bitpacking a sequence
		block.outputs[0][j] = block.inputs[0][j] & 1 ? 10 : 0;
		block.outputs[1][j] = block.inputs[0][j] & 2 ? 10 : 0;
		block.outputs[2][j] = block.inputs[0][j] & 4 ? 10 : 0;


		// the idea to fix uneven loops: just quantize end knob to values which are dividers of the max input. (10V)
		// looping support by looping an input phase to an adjustable CV range by 2 knobs
		// start of loop
		let [k3, k4] = [block.knobs[3], block.knobs[4]].map(k => quantize(k, 32) * 10)
		let offset = k3;
		// end of loop
		let end = k4 + offset > 10 ? 10 : k4 + offset;

		let input = block.inputs[3][j]
		let oin = offset + input;
		let out = oin > end ? oin % end + offset : oin;
		block.outputs[3][j] = out;
		block.outputs[5][j] = prev > out + 0.1 ? 10 : 0;
		prev = block.outputs[3][j];
	}

	// Per-block outputs:
	// block.lights[i][color]
	// block.switchLights[i][color]
}
