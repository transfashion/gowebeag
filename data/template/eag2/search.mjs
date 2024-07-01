import _, { map } from '/asset/data/jslibs/underscore-esm-min.mjs'
import * as cookie from '/asset/data/jslibs/cookie.mjs'

const search_containers = document.querySelectorAll(".search-container")
const search_textboxes = document.querySelectorAll(".search-textbox")
const search_buttons = document.querySelectorAll(".search-container img")
const search_content = document.querySelector(".search-content")
const btn_search_mobile = document.getElementById("search-btn_search_mobile")

const pnl_searchmask = document.getElementById("search-mask")
const pnl_searchempty = document.getElementById('search-empty')
const pnl_searchresult = document.getElementById('search-result')
const pnl_loading = document.getElementById('search-result-loading')
const pnl_content = document.getElementById('search-result-content')
const pnl_more = document.getElementById('search-result-more')

var prevSearchValue;
var prevSearchIcon;

export async function Init(opt) {
	console.log('initialising search')

	window.addEventListener('click', (event)=>{
		clickOutsideSearch(event)
	})	

	search_content.addEventListener('click', (event)=>{
		event.stopPropagation()
	})




	for (var i = 0; i < search_containers.length; i++) {
		let cnt = search_containers[i]
		cnt.addEventListener('click', (event) => {
			event.stopPropagation()
			search_container_click(cnt)
		})
	}	


	for (var i = 0; i < search_buttons.length; i++) {
		let btn = search_buttons[i]
		btn.addEventListener('click', (event) => {
			event.stopPropagation()
			search_button_click(btn)
		})
	}

	var tb = []
	for (var i = 0; i < search_textboxes.length; i++) {
		let obj = search_textboxes[i]
		obj.addEventListener('keyup', (event) => {
			let curValue = obj.value.trim()
			if (curValue.length>=3) {
				console.log('loading..')
				pnl_searchempty.classList.add('hidden')
				pnl_searchresult.classList.remove('hidden')
				pnl_loading.classList.remove('hidden')
				pnl_loading.innerHTML = `Searching ${curValue}...`
			} else {
				pnl_searchempty.classList.remove('hidden')
				pnl_searchresult.classList.add('hidden')
			}

			search_textbox_keyup(obj)
			if (event.key=="Enter") {
				startSearch(event)
			}
		})
		obj.addEventListener('keyup', _.throttle(startSearch, 2000), { passive: true});
		tb.push(obj)
	}

	tb[0].addEventListener('keyup', (event) => {
		var value = tb[0].value
		tb[1].value = value
	})	

	tb[1].addEventListener('keyup', (event) => {
		var value = tb[1].value
		tb[0].value = value
	})	

	btn_search_mobile.addEventListener('click', (event)=>{
		event.stopPropagation()
		var cnt = document.querySelector(".search-container.mobile-only")
		if (search_content.classList.contains("search-content-visible")) {
			search_content.classList.remove("search-content-visible")
			pnl_searchmask.classList.add('hidden')
			tb[0].value = ""
			tb[1].value = ""
		} else {
			search_container_click(cnt)
		}
	})


}


function search_container_click(cnt) {
	search_content.classList.add("search-content-visible")
	var txt = cnt.querySelector(".search-textbox")
	setTimeout(()=>{
		pnl_searchmask.classList.remove('hidden')
		txt.focus()
	}, 100)
}

function clickOutsideSearch(event) {
	if (search_content.classList.contains('search-content-visible')) {
		pnl_searchmask.classList.add('hidden')
		search_content.classList.remove("search-content-visible")
	}
}

function basename(path) {
	return path.replace(/\/+$/, "").replace( /.*\//, "" );
}

function search_button_click(btn) {
	var cnt = btn.parentNode

	if (basename(btn.src) == "icon-search.svg") {
		search_container_click(cnt)
	} else {
		resetSearch()
		btn.src = "/template/assets/icon-search.svg"
		for (var i = 0; i < search_textboxes.length; i++) {
			var txt = search_textboxes[i]
			txt.value = ""
		}
	}
}	

function search_textbox_keyup(obj) {
	var ico;
	if (obj.value == "") {
		ico =  "/template/assets/icon-search.svg"
	} else {
		ico = "/template/assets/icon-close.svg"
	}
	if (ico==prevSearchIcon) {
		return
	}
	for (var i = 0; i < search_buttons.length; i++) {
		let btn = search_buttons[i]
		btn.src = ico
	}
	prevSearchIcon = ico
}

function startSearch(ev) {
	

	let el = ev.srcElement
	let curValue = el.value.trim()

	console.log('search', curValue)
	if (curValue.length >= 3) { 
		if (curValue != prevSearchValue) {
			doSearch(el.value)
		}
		prevSearchValue = curValue
	} else {
		prevSearchValue = ""
		resetSearch()
	}
}

function resetSearch() {
	pnl_searchempty.classList.remove('hidden')
	pnl_searchresult.classList.add('hidden')
}

async function doSearch(text) {

	pnl_content.classList.remove('hidden')
	
	try {
		var rawResponse = await fetch('/api/search', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: text
			})
		});

		var res = await rawResponse.json();
		if (res.length>0) {
			showSearchResult(text, res)
		} else {
			showSearchNotFound(text)
		}
	} catch (err) {
		// not found
		console.error(err)
		showSearchNotFound(text)
	}
}

function showSearchNotFound(text) {
	pnl_content.innerHTML = `'${text}' not found in our product`
	pnl_content.classList.remove('hidden')

	pnl_loading.classList.add('hidden')
	pnl_more.classList.add('hidden')
	
}

function showSearchResult(text, res) {
	pnl_content.innerHTML = `tampilkan hasil search '${text}'`
	pnl_content.classList.remove('hidden')

	pnl_loading.classList.add('hidden')
	pnl_more.classList.remove('hidden')
	
}