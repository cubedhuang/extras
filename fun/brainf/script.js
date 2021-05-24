const debug = Vue.createApp({
	data: () => ({
		output: "",
		input: "",
		running: false,
		fast: false,
		steps: 0,
		instance: 0,
		memDisplay: "0",
		sliderSpeed: 0,
		paused: false,

		instruction: "?",
		memory: [0],
		ptr: 0,
		pos: 0
	}),

	computed: {
		speed() {
			return Math.round(2 ** this.sliderSpeed * 10) / 10;
		}
	},

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
			this.paused = false;

			this.instruction = "?";
			this.memory = [0];
			this.pos = 0;
			this.ptr = 0;
			const current = ++this.instance;

			if (!fast) return this.step();

			let adder = 0;

			const fastStep = () => {
				if (!this.running || current !== this.instance) return;

				requestAnimationFrame(fastStep);

				if (this.paused) return;

				adder += this.speed;
				while (adder > 0) {
					this.step();
					if (!this.running) break;
					adder--;
				}

				this.memDisplay = Object.entries(this.memory)
					.sort((a, b) => a[0] - b[0])
					.map((v, i) =>
						i === this.ptr ? `<span class="ptr">${v[1]}</span>` : `${v[1]}`
					)
					.join(" ");
			};
			requestAnimationFrame(fastStep);
		},

		step() {
			if (!this.running) return;

			const KEYS = "><+-.,[]".split("");

			const textarea = document.getElementById("input");
			textarea.focus();
			textarea.setSelectionRange(this.pos, this.pos + 1);

			const instruction = this.input[this.pos];

			if (instruction === undefined) {
				this.running = false;
				this.output += "\n-------------";
				this.output += "\nProgram done!";
			}

			const INSTRUCTIONS = {
				">": () => {
					this.ptr++;
					if (this.memory[this.ptr] === undefined) this.memory[this.ptr] = 0;
				},
				"<": () => {
					this.ptr--;
					if (this.memory[this.ptr] === undefined) this.memory[this.ptr] = 0;
				},
				"+": () => {
					this.memory[this.ptr]++;
				},
				"-": () => {
					this.memory[this.ptr]--;
				},
				".": () => {
					this.output += String.fromCodePoint(this.memory[this.ptr]);
				},
				",": () => {
					const answer = prompt(
						"Enter the input: (type quit if you need to abort)"
					);
					if (answer === "quit") this.running = false;
					this.memory[this.ptr] = answer?.charCodeAt?.(0) || 0;
				},
				"[": () => {
					if (this.memory[this.ptr] !== 0) return;

					let depth = 1;
					for (let i = this.pos + 1; i < this.input.length; i++) {
						switch (this.input[i]) {
							case "[":
								depth++;
								break;
							case "]":
								if (--depth === 0) {
									this.pos = i;
									return;
								}
								break;
						}
					}
				},
				"]": () => {
					if (this.memory[this.ptr] === 0) return;

					let depth = 1;
					for (let i = this.pos - 1; i >= 0; i--) {
						switch (this.input[i]) {
							case "]":
								depth++;
								break;
							case "[":
								if (--depth === 0) {
									this.pos = i;
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
			while (!KEYS.includes(this.input[++this.pos])) {}

			if (!this.fast)
				this.memDisplay = Object.entries(this.memory)
					.sort((a, b) => a[0] - b[0])
					.map((v, i) =>
						i === this.ptr ? `<span class="ptr">${v[1]}</span>` : `${v[1]}`
					)
					.join(" ");
		}
	}
}).mount("#app");
