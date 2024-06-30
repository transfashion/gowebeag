import _, { map } from '/asset/data/jslibs/underscore-esm-min.mjs'



export async function Init(opt) {
	console.log("initialising promoter");
	let self = {}

	self.pagecontent = opt.pagecontent
	self.pageheader = opt.pageheader

	// load promoter style
 	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = '/template/promoter.css';
	link.onload = function () {
		promoter_setup(self)
	};  
	opt.head.appendChild(link);

	var window_resize = () => {
		recalculateSize(self)
	}
	window.addEventListener('resize', _.throttle(window_resize, 500), { passive: true});
}


async function promoter_setup(self) {
	self.el = document.createElement('div')
	self.el.id = 'pageheader-promoter'
	self.el.classList.add('hidden')
	self.el.innerHTML = `
		<div></div>
		<div class="promoter-content"></div>
		<div>
			<img id="pageheader-btn_promoter_close" src="/template/assets/icon-close.svg">
		</div>
	`
	self.pageheader.parentNode.insertAdjacentElement("afterbegin", self.el)
	self.btn_close = document.getElementById("pageheader-btn_promoter_close")
	self.content = self.el.querySelector('.promoter-content')

	
	self.btn_close.addEventListener('click', () => {
		btn_promoter_close_click(self);
	});

	fetchMessages(self).then((messages) => {
		if (messages.length > 0) {
			self.el.classList.remove('hidden')
			recalculateSize(self, self.pagecontent)
		}
	});
	
}

function recalculateSize(self) {

	var cst = getComputedStyle(self.pageheader)
	var mtd = parseInt(cst.getPropertyValue('--pageheader-height-desktop'));
	var mtm = parseInt(cst.getPropertyValue('--pageheader-height-mobile'));

	var ph = 0
	if (!self.el.classList.contains('hidden')) {
		var prect = self.el.getBoundingClientRect()
		ph = prect.height
	}
	
	document.documentElement.style.setProperty('--pagecontent-mt-desktop', `${mtd+ph}px`);
	document.documentElement.style.setProperty('--pagecontent-mt-mobile', `${mtm+ph}px`);
}


async function fetchMessages(self) {
	var messages = await getMessages()
	if (messages.length >= 0) {
		self.content.innerHTML = messages[0]
	}
	
	setInterval(async () => {
		var messages = await getMessages()
		if (messages.length == 0) {
			btn_promoter_close_click(self)
		} else if (messages.length==1) {
			self.content.innerHTML = messages[0]
		} else {
			var rnd = Math.floor(Math.random() * messages.length)
			self.content.innerHTML = messages[rnd]
		}
	}, 120000) // setiap 2 menit
	return messages
}

async function getMessages() {
	var rawResponse = await fetch('/api/promoter', {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({})
	});
	var res = await rawResponse.json();
	if (res.Messages==null) {
		return []
	}

	if (!Array.isArray(res.Messages)) {
		return []
	}
	return res.Messages
}


function btn_promoter_close_click(self) {
	self.el.classList.add('hidden')
	document.documentElement.style.removeProperty('--pagecontent-mt-desktop');
	document.documentElement.style.removeProperty('--pagecontent-mt-mobile');
}