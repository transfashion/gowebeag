const search_containers = document.querySelectorAll(".search-container")
const search_textboxes = document.querySelectorAll(".search-textbox")
const search_buttons = document.querySelectorAll(".search-container img")
const search_content = document.querySelector(".search-content")
const btn_search_mobile = document.getElementById("search-btn_search_mobile")

export async function Init(opt) {
	console.log('initialising search')

	window.addEventListener('click', (event)=>{
		clickOutsideSearch(event)
	})	

	search_content.addEventListener('click', (event)=>{
		event.stopPropagation()
	})

	btn_search_mobile.addEventListener('click', (event)=>{
		event.stopPropagation()
		var cnt = document.querySelector(".search-container.mobile-only")
		search_container_click(cnt)
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
			search_textbox_keyup(obj)
		})
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
}


function search_container_click(cnt) {
	search_content.classList.add("search-content-visible")
	var txt = cnt.querySelector(".search-textbox")
	setTimeout(()=>{
		txt.focus()
	}, 100)
	
}

function clickOutsideSearch(event) {
	if (search_content.classList.contains('search-content-visible')) {
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
		btn.src = "/template/assets/icon-search.svg"
		for (var i = 0; i < search_textboxes.length; i++) {
			var txt = search_textboxes[i]
			txt.value = ""
		}
	}
}	

function search_textbox_keyup(obj) {
	for (var i = 0; i < search_buttons.length; i++) {
		let btn = search_buttons[i]
		if (obj.value == "") {
			btn.src = "/template/assets/icon-search.svg"
		} else {
			btn.src = "/template/assets/icon-close.svg"
		}
		
	}
}