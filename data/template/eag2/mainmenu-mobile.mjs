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
			/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
			this.classList.toggle("accordion-active");
		
			/* Toggle between hiding and showing the active panel */
			var panel = this.nextElementSibling;
			if (panel.style.display === "block") {
			panel.style.display = "none";
			} else {
			panel.style.display = "block";
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