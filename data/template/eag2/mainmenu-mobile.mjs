const btn_open = document.getElementById("mainmenu-mobile-btn_open")
const btn_close = document.getElementById("mainmenu-mobile-btn_close")
const pnl_menu = document.getElementById("mainmenu-mobile")

export function Init(opt) {

	btn_open.addEventListener('click', () => {
		btn_open_click()
	});

	btn_close.addEventListener('click', () => {
		btn_close_click()
	});

}


function btn_open_click() {
	pnl_menu.classList.add('mainmenu-visible')

}

function btn_close_click() {
	pnl_menu.classList.remove('mainmenu-visible')
}