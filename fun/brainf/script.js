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
		awaiting: false,

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

	created() {
		window.addEventListener("keypress", e => {
			if (this.awaiting && e.key.length === 1) {
				this.memory[this.ptr] = e.key.charCodeAt(0);
				this.awaiting = false;
			}
		});
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
			this.awaiting = false;

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
			if (!this.running || this.awaiting) return;

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
					this.awaiting = true;
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
			while (
				!KEYS.includes(this.input[++this.pos]) &&
				this.input[this.pos] !== undefined
			) {}

			if (!this.fast)
				this.memDisplay = Object.entries(this.memory)
					.sort((a, b) => a[0] - b[0])
					.map((v, i) =>
						i === this.ptr ? `<span class="ptr">${v[1]}</span>` : `${v[1]}`
					)
					.join(" ");
		},

		abort() {
			this.running = false;
			this.awaiting = false;
		},

		empty() {
			this.memory[this.ptr] = 0;
			this.awaiting = false;
		}
	}
}).mount("#app");
