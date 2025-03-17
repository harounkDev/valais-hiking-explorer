document.addEventListener("DOMContentLoaded", () => {
  const showGear = document.getElementById("show-gear-image");
  const modal = document.getElementById("gear-modal");
  const modalImage = modal.querySelector("img");

  showGear.addEventListener("click", () => {
    modal.style.display = "block";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalImage.classList.remove("zoomed");
    }
  });

  modalImage.addEventListener("click", () => {
    modalImage.classList.toggle("zoomed");
  });
});
