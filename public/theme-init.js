(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light");
    }
  } catch (_error) {
    // Keep the default dark theme if browser storage is unavailable.
  }
})();
