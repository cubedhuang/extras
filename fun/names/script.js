const $make = document.getElementById("make");
const $name = document.getElementById("name");

const prefixes = [
	"Abstract",
	"Remote",
	"Accessible",
	"Interruptible",
	"Cached",
	"Observable",
	"Immutable"
];

const objects = [
	"Persistence",
	"Cache",
	"Session",
	"Holder",
	"Renderer",
	"Display",
	"Canvas",
	"Command",
	"Selection",
	"Message",
	"Event",
	"Future",
	"Promise",
	"Stream",
	"State",
	"Store",
	"Model",
	"View",
	"Controller",
	"Component",
	"Application",
	"Service",
	"Module",
	"Plugin",
	"Package",
	"Library",
	"Framework",
	"Toolkit",
	"Tool",
	"Utility"
];

const suffixes = [
	"Builder",
	"Manager",
	"Observer",
	"Factory",
	"Proxy",
	"Transaction",
	"Setter",
	"Instance",
	"Singleton",
	"Helper",
	"Decorator",
	"Aspect",
	"Logger",
	"Lock",
	"Container",
	"Listener",
	"Handler"
];

let outputName = "";

const randint = (low, high) => Math.floor(Math.random() * (high - low) + low);
const pick = array => array[randint(0, array.length)];
const maybe = array => {
	if (Math.random() < 0.5) return "";
	const p = pick(array);
	if (outputName.indexOf(p) === -1) return p;
	return "";
};

function forX(x, f) {
	for (let i = 0; i < x; i++) f(i);
}

$make.addEventListener("click", setName);

function setName() {
	outputName = "";
	forX(4, () => (outputName += maybe(prefixes)));
	outputName += pick(prefixes);
	outputName += pick(objects);
	outputName += pick(suffixes);
	forX(5, () => (outputName += maybe(suffixes)));
	$name.textContent = outputName;
}

setName();
