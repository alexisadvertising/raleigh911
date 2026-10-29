// Shows only upcoming board meetings in the home sidebar and mutes past ones on the Board page.
(function () {
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function past(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]) < today; }
  var side = document.querySelector("[data-next-meetings]");
  if (side) {
    var items = Array.prototype.slice.call(side.querySelectorAll("li[data-date]"));
    var shown = 0;
    items.forEach(function (li) {
      if (past(li.getAttribute("data-date")) || shown >= 2) { li.hidden = true; } else { shown++; }
    });
    if (!shown) { var e = document.querySelector("[data-no-meetings]"); if (e) e.hidden = false; }
  }
  document.querySelectorAll("[data-meeting]").forEach(function (el) {
    if (past(el.getAttribute("data-meeting"))) el.classList.add("is-past");
  });
})();
