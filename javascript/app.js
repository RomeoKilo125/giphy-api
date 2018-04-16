app = function () {
  let buttons = ["Phineas and Ferb", "Transformers", "The Jetsons", "Looney Tunes", "Duck Tales", "Talespin", "Darkwing Duck", "Gargoyles", "Rocko's Modern Life"]

  showButtons = function() {
    $('#buttonGroup').empty()
    buttons.forEach(function(element) {
      let b = $('<button>')
      b.text(element);
      b.addClass("showButton");
      b.attr("data-value", element.replace(/ /g,'+'));
      $('#buttonGroup').append(b);
    });
  }

  makeTheCall = function(showName) {
    let apiKey = "ixY18TyZhxMDm0VMgOEFZJrUtEBOV4l6";

    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + showName + '&api_key=' + apiKey + '&limit=12';

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      $('#gifArea').empty();
      response.data.forEach(function(element) {
        showGif(element);
      });
    }).fail(function() {
      console.log("API Call Failed");
    });

  }

  showGif = function(result) {
    console.log(result);
    let gif = $('<div>');
    gif.attr('class', 'gif');
    let p = $('<p>').text("Rating: " + result.rating);
    let img = $('<img>');
    img.attr('class', "gifImg")
    img.attr('stillUrl', result.images.fixed_width_still.url);
    img.attr('animatedUrl', result.images.fixed_width.url);
    img.attr('src', result.images.fixed_width_still.url);
    img.attr('state', "still");
    gif.append(p);
    gif.append(img);
    $('#gifArea').append(gif);
  }

  $(document).on("click", ".gifImg", function() {
    let state = $(this).attr('state');
    if (state === "still") {
      $(this).attr('src', $(this).attr('animatedUrl'));
      $(this).attr('state', "animate");
    } else {
      $(this).attr('src', $(this).attr('stillUrl'));
      $(this).attr('state', "still");
    }
  });

  $('#submit').on("click", function(e) {
    e.preventDefault();
    buttons.push($('#searchBar').val());
    $('#searchBar').val('');
    showButtons();
    makeTheCall($('#searchBar').val().replace(/ /g,'+'));
  });

  $(document).on("click", ".showButton", function(e) {
    e.preventDefault();
    makeTheCall($(this).data("value"));
  });


  showButtons();
}

app();
