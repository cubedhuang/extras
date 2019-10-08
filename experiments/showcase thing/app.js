const vm = new Vue({
	el: "#app",
	data: {
		files: [
			'text.js',
			'text2.css',
		],
		textareas: 2
	},
	mounted() {
		for (let i = 0; i < this.$refs.box.length; i++) {
			console.log(this.$refs.box[i]);
			dragElement(this.$refs.box[i]);
			makeResizableDiv('.box' + i);
		}

		function dragElement(elmnt) {
			let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			elmnt.onmousedown = dragMouseDown;
			elmnt.onmouseup = e => e.preventDefault();
			
			function dragMouseDown(e) {
				if (e.which !== 3) return;
				e = e || window.event;
				e.preventDefault();
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}
			
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
			
			function closeDragElement() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}

		function makeResizableDiv(div) {
			console.log(div)
			const element = document.querySelector(div);
			const resizers = document.querySelectorAll(div + ' .resizer')
			const minimum_size = 20;
			let original_width = 0;
			let original_height = 0;
			let original_x = 0;
			let original_y = 0;
			let original_mouse_x = 0;
			let original_mouse_y = 0;
			for (let i = 0;i < resizers.length; i++) {
				const currentResizer = resizers[i];
				currentResizer.addEventListener('mousedown', function(e) {
					e.preventDefault();
					original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
					original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
					original_x = element.getBoundingClientRect().left;
					original_y = element.getBoundingClientRect().top;
					original_mouse_x = e.pageX;
					original_mouse_y = e.pageY;
					window.addEventListener('mousemove', resize);
					window.addEventListener('mouseup', stopResize);
				})
				
				function resize(e) {
					const width = original_width + (e.pageX - original_mouse_x);
					const height = original_height + (e.pageY - original_mouse_y)
					if (width > minimum_size) {
						element.style.width = width + 'px';
						element.style.left = original_x + 'px';
					}
					if (height > minimum_size) {
						element.style.height = height + 'px'
						element.style.top = original_y + 'px'
					}
				}
				
				function stopResize() {
					window.removeEventListener('mousemove', resize)
				}
			}
		}
	}
});