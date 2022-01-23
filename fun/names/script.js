const $make = document.getElementById("make");
const $name = document.getElementById("name");

const prefixes = [
	"Abstract",
	"Remote",
	"Accessible",
	"Interruptible",
	"Cached",
	"Observable",
	"Immutable",
	"Persistent",
	"Lazy",
	"Shared",
	"Volatile",
	"Virtual",
	"Internal",
	"Immediate",
	"Concurrent",
	"Native",
	"External",
	"Bean",
	"Anonymous",
	"Dynamic",
	"Strict",
	"Transient"
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
	"Package",
	"Library",
	"Framework",
	"Toolkit",
	"Tool",
	"Utility",
	"Action",
	"Value",
	"Validation"
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
	"Plugin",
	"Handler",
	"Modifier",
	"Router",
	"Resolver",
	"Validator",
	"Finalizer",
	"Definition",
	"Strategy",
	"Bean",
	"Exception",
	"Initializer",
	"Dispatcher",
	"Stream",
	"Collector"
];

let outputName = "";

const randint = (low, high) => Math.floor(Math.random() * (high - low) + low);
const pick = array => {
	const p = array[randint(0, array.length)];
	if (outputName.indexOf(p) === -1) return p;
	return "";
};
const maybe = array => {
	if (Math.random() < 0.5) return "";
	return pick(array);
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
