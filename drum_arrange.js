config.frameDivider = 4
config.bufferSize = 32

function process(block) {
	// Per-block inputs:
	// block.knobs[i]
	// block.switches[i]
	
	for (let j = 0; j < block.bufferSize; j++) {
		// Per-sample inputs:
		// block.inputs[i][j]

		// Per-sample outputs:
		// block.outputs[i][j]
		block.outputs[0][j] = block.inputs[0][j] & 1 ? 10 : 0;
		block.outputs[1][j] = block.inputs[0][j] & 2 ? 10 : 0;
		block.outputs[2][j] = block.inputs[0][j] & 4 ? 10 : 0;
	}

	// Per-block outputs:
	// block.lights[i][color]
	// block.switchLights[i][color]
}
