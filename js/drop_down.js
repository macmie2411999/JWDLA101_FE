const parentLis = document.querySelectorAll('.li-parent');

parentLis.forEach(li => {
  li.addEventListener('click', () => {
    li.classList.toggle('active'); // Toggle active class on click
  });
});
