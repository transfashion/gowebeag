import _, { map } from '/asset/data/jslibs/underscore-esm-min.mjs'
import * as promoter from '/template/promoter.mjs'
import * as search from '/template/search.mjs'
import * as mainmenumobile from '/template/mainmenu-mobile.mjs'

const obj_pageheader_container = document.getElementById("container-pageheader")
const obj_pageheader = document.getElementById("pageheader")


var previousScrollPosition = 0;
var headerHeight = 0;


var lastY = 0


export async function Init(opt) {
	console.log("initialising layout");
	loadModules(opt)

	window.addEventListener("scroll", _.throttle(window_scroll, 100), { passive: true});  // ref: https://dev.to/robole/how-to-detect-scroll-direction-in-vanilla-javascript-to-make-a-goofy-logo-animation-njc
	window.addEventListener('resize', _.throttle(window_resize, 500), { passive: true});

	setTimeout(()=>{
		window_resize()
	}, 500)
}

async function loadModules(opt) {
	window.$modules.promoter = promoter
	window.$modules.search = search
	window.$modules.mainmenumobile = mainmenumobile
	for (var mname in window.$modules) {
		window.$modules[mname].Init(opt)
	}
}

function window_scroll() {
	if (isscrolldown()) {
		window_scroll_down(window.scrollY, lastY)
	} else {
		window_scroll_up(window.scrollY, lastY)
	}
	lastY = window.scrollY
}

function window_resize() {
	console.log("resize")
	if (obj_pageheader_container) {
		var rect = obj_pageheader_container.getBoundingClientRect()
		headerHeight = rect.height
	}
}

function isscrolldown() {
	var goingDown = false;
	var scrollPosition = window.scrollY;
	if (scrollPosition > previousScrollPosition) {
	  goingDown = true;
	}
	previousScrollPosition = scrollPosition;
	return goingDown;
}

function getHeaderHeight() {
	return headerHeight
}

function window_scroll_up(cy, ly) {
	var h = getHeaderHeight()
	
	var dy =   ly - cy // header harus turun dy px (top: -dy px)
	var rect = obj_pageheader_container.getBoundingClientRect()
	var newtop;

	if (rect.top < -h) {
		newtop = -h
		obj_pageheader_container.style.top = newtop + "px"
		setHeaderBorderBottom(h, cy)
		return
	}

	newtop = rect.top + dy
	if (newtop > 0) {
		newtop = 0
	}

	// turunkan header sebesar newtop px
	obj_pageheader_container.style.top = newtop + "px"
	setHeaderBorderBottom(h, cy)
}

function window_scroll_down(cy, ly) {
	var h = getHeaderHeight()
	
	// kondisi
	// cy > ly
	var dy =   cy - ly // header harus naik dy px (top: -dy px)
	var rect = obj_pageheader_container.getBoundingClientRect()
	var newtop = rect.top - dy
	if (newtop < -h) {
		newtop = -h
	}

	// naikkan header sebesar newtop px
	obj_pageheader_container.style.top = newtop + "px"
	setHeaderBorderBottom(h, cy)
}


function setHeaderBorderBottom(h, cy) {
	if (cy > h + 100) {
		// jika scrollnya sudah jauh, munculkan garis bawah pada header
		obj_pageheader.classList.add("pageheader-scroll-down")
	} else {
		obj_pageheader.classList.remove("pageheader-scroll-down")
	}
}