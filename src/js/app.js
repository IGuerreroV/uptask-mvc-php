const mobileMenuBtn = document.querySelector("#mobile-menu");
const sidebar = document.querySelector(".sidebar");

if (mobileMenuBtn) {
	mobileMenuBtn.addEventListener("click", () => {
		sidebar.classList.toggle("mostrar");
	});
}
