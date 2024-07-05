const btn_open = document.getElementById("mainmenu-mobile-btn_open")
const btn_close = document.getElementById("mainmenu-mobile-btn_close")
const pnl_menu = document.getElementById("mainmenu-mobile")
const mainmenu = document.querySelector("#mainmenu-mobile nav")

export function Init(opt) {

	btn_open.addEventListener('click', () => {
		btn_open_click()
	});

	btn_close.addEventListener('click', () => {
		btn_close_click()
	});
	
	var acc = mainmenu.getElementsByClassName("accordion");
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			this.classList.toggle("accordion-active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});

		
	}
	

}


function btn_open_click() {
	pnl_menu.classList.add('mainmenu-visible')

}

function btn_close_click() {
	pnl_menu.classList.remove('mainmenu-visible')
}