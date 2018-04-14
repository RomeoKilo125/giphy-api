app = function () {
  let buttons = ["Phineas and Ferb", "Transformers", "Thundercats", "The Jetsons", "Looney Tunes", "Duck Tales", "Talespin", "Darkwing Duck", "Gargoyles", "Rocko's Modern Life"]

  showButtons = function() {
    $('#buttonGroup').empty()
    buttons.forEach(function(element) {
      let b = $('<button>')
      b.text(element);
      b.data("value", element);
      $('#buttonGroup').append(b);
    });
  }

  showButtons();
}

app();
