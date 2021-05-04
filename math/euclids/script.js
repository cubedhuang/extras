const debug = new Vue({
	el: "#app",
	data: {
		in1: "",
		in2: "",
		output: ""
	},
	methods: {
		calc(lcm) {
			let output = this.checkNumbers();
			if (output) {
				this.output = output;
				return;
			}

			let d1 = new Decimal(this.in1);
			let d2 = new Decimal(this.in2);

			let a, b, t;
			if (d1.gte(d2)) (a = d1), (b = d2);
			else (a = d2), (b = d1);

			while (!b.eq("0")) {
				t = b;
				b = a.mod(b);
				a = t;
			}
			if (!lcm) {
				this.output = a.toFixed(0);
				return;
			}

			this.output = d1.mul(d2).div(a).toFixed(0);
		},
		checkNumbers() {
			if (!this.in1 || !this.in2) return "Make sure you use both inputs!";

			let highest =
				this.in1.length > this.in2.length ? this.in1.length : this.in2.length;
			Decimal.set({ precision: highest + 1 });

			let d1 = new Decimal(this.in1);
			let d2 = new Decimal(this.in2);

			if (!d1.floor().eq(d1) || !d2.floor().eq(d2))
				return "Make sure both numbers are integers!";
			if (!d1.abs().eq(d1) || d1.eq("0") || !d2.abs().eq(d2) || d2.eq("0"))
				return "Make sure both numbers are positive!";
			else return null;
		}
	}
});
