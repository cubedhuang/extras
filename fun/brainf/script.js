const debug = Vue.createApp({
	data: () => ({
		output: "",
		input: "",
		running: false,
		fast: false,
		steps: 0,
		instance: 0,

		instruction: "?",
		memory: [0],
		pointer: 0,
		position: 0
	}),
	methods: {
		run(fast) {
			// validate brackets
			let balance = 0;
			for (const char of this.input) {
				if (char === "[") balance++;
				if (char === "]") balance--;
			}
			if (balance !== 0) return (this.output = "The brackets are invalid!");

			this.output = "";
			this.running = true;
			this.fast = fast;
			this.steps = 0;

			this.instruction = "?";
			this.memory = [0];
			this.position = 0;
			this.pointer = 0;
			const current = ++this.instance;

			if (!fast) return this.step();

			const fastStep = () => {
				if (!this.running || current !== this.instance) return;
				requestAnimationFrame(fastStep);
				this.step();
			};
			requestAnimationFrame(fastStep);
		},

		step() {
			if (!this.running) return;

			const textarea = document.getElementById("input");
			textarea.focus();
			textarea.setSelectionRange(this.position, this.position + 1);

			const instruction = this.input[this.position];

			if (instruction === undefined) {
				this.running = false;
				this.output += "\n-------------";
				this.output += "\nProgram done!";
			}

			const INSTRUCTIONS = {
				">": () => {
					this.pointer++;
					if (this.memory[this.pointer] === undefined)
						this.memory[this.pointer] = 0;
				},
				"<": () => {
					this.pointer--;
					if (this.memory[this.pointer] === undefined)
						this.memory[this.pointer] = 0;
				},
				"+": () => {
					this.memory[this.pointer]++;
				},
				"-": () => {
					this.memory[this.pointer]--;
				},
				".": () => {
					this.output += String.fromCodePoint(this.memory[this.pointer]);
				},
				",": () => {
					this.memory[this.pointer] = prompt("Enter the input:").charCodeAt(0);
				},
				"[": () => {
					if (this.memory[this.pointer] !== 0) return;

					let depth = 1;
					for (let i = this.position + 1; i < this.input.length; i++) {
						switch (this.input[i]) {
							case "[":
								depth++;
								break;
							case "]":
								if (--depth === 0) {
									this.position = i;
									return;
								}
								break;
						}
					}
				},
				"]": () => {
					if (this.memory[this.pointer] === 0) return;

					let depth = 1;
					for (let i = this.position - 1; i >= 0; i--) {
						switch (this.input[i]) {
							case "]":
								depth++;
								break;
							case "[":
								if (--depth === 0) {
									this.position = i;
									return;
								}
								break;
						}
					}
				}
			};

			const func = INSTRUCTIONS[instruction];
			if (func) {
				func();
				this.instruction = instruction;
				this.steps++;
			}
			this.position++;
		}
	}
}).mount("#app");
