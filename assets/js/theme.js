(function () {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#131313" : "#fbf9f9");
    }
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      var next = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
      toggle.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  window.__setTheme = function (theme) {
    applyTheme(theme);
    setStoredTheme(theme);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var stored = getStoredTheme();
    applyTheme(stored || systemTheme());

    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") || systemTheme();
        var next = current === "dark" ? "light" : "dark";
        window.__setTheme(next);
      });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  });
})();
