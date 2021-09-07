const ELEMENTS = [
	{ symbol: "Ac", name: "Actinium", number: 89 },
	{ symbol: "Ag", name: "Silver", number: 47 },
	{ symbol: "Al", name: "Aluminum", number: 13 },
	{ symbol: "Am", name: "Americium", number: 95 },
	{ symbol: "Ar", name: "Argon", number: 18 },
	{ symbol: "As", name: "Arsenic", number: 33 },
	{ symbol: "At", name: "Astatine", number: 85 },
	{ symbol: "Au", name: "Gold", number: 79 },
	{ symbol: "B", name: "Boron", number: 5 },
	{ symbol: "Ba", name: "Barium", number: 56 },
	{ symbol: "Be", name: "Beryllium", number: 4 },
	{ symbol: "Bh", name: "Bohrium", number: 107 },
	{ symbol: "Bi", name: "Bismuth", number: 83 },
	{ symbol: "Bk", name: "Berkelium", number: 97 },
	{ symbol: "Br", name: "Bromine", number: 35 },
	{ symbol: "C", name: "Carbon", number: 6 },
	{ symbol: "Ca", name: "Calcium", number: 20 },
	{ symbol: "Cd", name: "Cadmium", number: 48 },
	{ symbol: "Ce", name: "Cerium", number: 58 },
	{ symbol: "Cf", name: "Californium", number: 98 },
	{ symbol: "Cl", name: "Chlorine", number: 17 },
	{ symbol: "Cm", name: "Curium", number: 96 },
	{ symbol: "Cn", name: "Copernicium", number: 112 },
	{ symbol: "Co", name: "Cobalt", number: 27 },
	{ symbol: "Cr", name: "Chromium", number: 24 },
	{ symbol: "Cs", name: "Cesium", number: 55 },
	{ symbol: "Cu", name: "Copper", number: 29 },
	{ symbol: "Db", name: "Dubnium", number: 105 },
	{ symbol: "Ds", name: "Darmstadtium", number: 110 },
	{ symbol: "Dy", name: "Dysprosium", number: 66 },
	{ symbol: "Er", name: "Erbium", number: 68 },
	{ symbol: "Es", name: "Einsteinium", number: 99 },
	{ symbol: "Eu", name: "Europium", number: 63 },
	{ symbol: "F", name: "Fluorine", number: 9 },
	{ symbol: "Fe", name: "Iron", number: 26 },
	{ symbol: "Fl", name: "Flerovium", number: 114 },
	{ symbol: "Fm", name: "Fermium", number: 100 },
	{ symbol: "Fr", name: "Francium", number: 87 },
	{ symbol: "Ga", name: "Gallium", number: 31 },
	{ symbol: "Gd", name: "Gadolinium", number: 64 },
	{ symbol: "Ge", name: "Germanium", number: 32 },
	{ symbol: "H", name: "Hydrogen", number: 1 },
	{ symbol: "He", name: "Helium", number: 2 },
	{ symbol: "Hf", name: "Hafnium", number: 72 },
	{ symbol: "Hg", name: "Mercury", number: 80 },
	{ symbol: "Ho", name: "Holmium", number: 67 },
	{ symbol: "Hs", name: "Hassium", number: 108 },
	{ symbol: "I", name: "Iodine", number: 53 },
	{ symbol: "In", name: "Indium", number: 49 },
	{ symbol: "Ir", name: "Iridium", number: 77 },
	{ symbol: "K", name: "Potassium", number: 19 },
	{ symbol: "Kr", name: "Krypton", number: 36 },
	{ symbol: "La", name: "Lanthanum", number: 57 },
	{ symbol: "Li", name: "Lithium", number: 3 },
	{ symbol: "Lr", name: "Lawrencium", number: 103 },
	{ symbol: "Lu", name: "Lutetium", number: 71 },
	{ symbol: "Lv", name: "Livermorium", number: 116 },
	{ symbol: "Mc", name: "Moscovium", number: 115 },
	{ symbol: "Md", name: "Mendelevium", number: 101 },
	{ symbol: "Mg", name: "Magnesium", number: 12 },
	{ symbol: "Mn", name: "Manganese", number: 25 },
	{ symbol: "Mo", name: "Molybdenum", number: 42 },
	{ symbol: "Mt", name: "Meitnerium", number: 109 },
	{ symbol: "N", name: "Nitrogen", number: 7 },
	{ symbol: "Na", name: "Sodium", number: 11 },
	{ symbol: "Nb", name: "Niobium", number: 41 },
	{ symbol: "Nd", name: "Neodymium", number: 60 },
	{ symbol: "Ne", name: "Neon", number: 10 },
	{ symbol: "Nh", name: "Nihonium", number: 113 },
	{ symbol: "Ni", name: "Nickel", number: 28 },
	{ symbol: "No", name: "Nobelium", number: 102 },
	{ symbol: "Np", name: "Neptunium", number: 93 },
	{ symbol: "O", name: "Oxygen", number: 8 },
	{ symbol: "Og", name: "Oganesson", number: 118 },
	{ symbol: "Os", name: "Osmium", number: 76 },
	{ symbol: "P", name: "Phosphorus", number: 15 },
	{ symbol: "Pa", name: "Protactinium", number: 91 },
	{ symbol: "Pb", name: "Lead", number: 82 },
	{ symbol: "Pd", name: "Palladium", number: 46 },
	{ symbol: "Pm", name: "Promethium", number: 61 },
	{ symbol: "Po", name: "Polonium", number: 84 },
	{ symbol: "Pr", name: "Praseodymium", number: 59 },
	{ symbol: "Pt", name: "Platinum", number: 78 },
	{ symbol: "Pu", name: "Plutonium", number: 94 },
	{ symbol: "Ra", name: "Radium", number: 88 },
	{ symbol: "Rb", name: "Rubidium", number: 37 },
	{ symbol: "Re", name: "Rhenium", number: 75 },
	{ symbol: "Rf", name: "Rutherfordium", number: 104 },
	{ symbol: "Rg", name: "Roentgenium", number: 111 },
	{ symbol: "Rh", name: "Rhodium", number: 45 },
	{ symbol: "Rn", name: "Radon", number: 86 },
	{ symbol: "Ru", name: "Ruthenium", number: 44 },
	{ symbol: "S", name: "Sulfur", number: 16 },
	{ symbol: "Sb", name: "Antimony", number: 51 },
	{ symbol: "Sc", name: "Scandium", number: 21 },
	{ symbol: "Se", name: "Selenium", number: 34 },
	{ symbol: "Sg", name: "Seaborgium", number: 106 },
	{ symbol: "Si", name: "Silicon", number: 14 },
	{ symbol: "Sm", name: "Samarium", number: 62 },
	{ symbol: "Sn", name: "Tin", number: 50 },
	{ symbol: "Sr", name: "Strontium", number: 38 },
	{ symbol: "Ta", name: "Tantalum", number: 73 },
	{ symbol: "Tb", name: "Terbium", number: 65 },
	{ symbol: "Tc", name: "Technetium", number: 43 },
	{ symbol: "Te", name: "Tellurium", number: 52 },
	{ symbol: "Th", name: "Thorium", number: 90 },
	{ symbol: "Ti", name: "Titanium", number: 22 },
	{ symbol: "Tl", name: "Thallium", number: 81 },
	{ symbol: "Tm", name: "Thulium", number: 69 },
	{ symbol: "Ts", name: "Tennessine", number: 117 },
	{ symbol: "U", name: "Uranium", number: 92 },
	{ symbol: "V", name: "Vanadium", number: 23 },
	{ symbol: "W", name: "Tungsten", number: 74 },
	{ symbol: "Xe", name: "Xenon", number: 54 },
	{ symbol: "Y", name: "Yttrium", number: 39 },
	{ symbol: "Yb", name: "Ytterbium", number: 70 },
	{ symbol: "Zn", name: "Zinc", number: 30 },
	{ symbol: "Zr", name: "Zirconium", number: 40 }
];

ELEMENTS.sort((a, b) => a.number - b.number);

for (const e of ELEMENTS) {
	// basically random
	const value =
		[...e.name].reduce((a, c, i) => a + c.charCodeAt(0) + i * 1337, 0) % 360;
	e.color = `hsl(${value}, 80%, 15%)`;
}

let picked = [];

const $element = document.getElementById("element");
const $answer = document.getElementById("answer");
const $answerWith = document.getElementById("answer-with");

const $elements38 = document.getElementById("1-38");
const $elementsOthers = document.getElementById("others");
const $elementsAll = document.getElementById("all");

const $checkboxes = [$elements38, $elementsOthers, $elementsAll];

let current;

let answerWith = ["name", "symbol"];

function pick() {
	if ($elementsAll.checked) {
		picked = ELEMENTS;
		return;
	}
	picked = [];
	if ($elements38.checked) picked.push(...ELEMENTS.slice(0, 38));
	if ($elementsOthers.checked) {
		// 42, 46-57, 74, 78-89, 92-94
		picked.push(
			...ELEMENTS.filter(
				e =>
					e.number === 42 ||
					(46 <= e.number && e.number <= 57) ||
					e.number === 74 ||
					(78 <= e.number && e.number <= 89) ||
					(92 <= e.number && e.number <= 94)
			)
		);
	}
}

function next() {
	if (picked.length)
		current = picked[Math.floor(Math.random() * picked.length)];
	else current = { symbol: ":(", name: ":(", number: 0, color: "#111" };
	$element.textContent = current[answerWith[1]];
	$answer.value = "";
	document.body.style.background = current.color;
}

$answer.addEventListener("input", () => {
	if ($answer.value.toLowerCase() === current[answerWith[0]].toLowerCase()) {
		next();
	}
});

$answerWith.addEventListener("click", () => {
	[answerWith[0], answerWith[1]] = [answerWith[1], answerWith[0]];
	$answerWith.textContent = `answering with ${answerWith[0]}`;
	next();
});

for (const $checkbox of $checkboxes) {
	$checkbox.addEventListener("click", () => {
		pick();
		next();
	});
}

pick();
next();
