// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var notEatenElem = $("#notEaten");
      var devouredElem = $("#devoured");
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          burgers[i].id + 
          ". "+burgers[i].burger_name +
          "<button class='change-nomState btn btn-primary' data-id='" +
          burgers[i].id +
          "' data-devoured='" +
          !burgers[i].devoured +
          "'>";
  
        if (burgers[i].devoured) {
          new_elem += "Devour";
        }
  
        new_elem += "</button>";
  
        new_elem +=
          "<button class='delete-burger btn btn-danger' data-id='" +
          burgers[i].id +
          "'>Delete </button></li>";
  
        if (burgers[i].devoured) {
          notEatenElem.append(new_elem);
        } else {
          devouredElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-nomState", function(event) {
      
      var id = $(this).data("id");
      var newNom = $(this).data("newNom")===true;
  
      var newNomState = {
        devoured: newNom

      };
  
      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newNomState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed devoured to", newNom);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    // $(".add-burger").on("submit", function(event) {
    //   event.preventDefault();
    //   console.log(event);
  
    //   var newBurger = {
    //     name: $("#ca")
    //       .val()
    //       .trim(),
    //     devoured: false
       
    //   };

      $(".add-burger").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log
    
        var newBurger = {
          name: $("#ca")
            .val()
            .trim(),
         devoured: false
        };
    
      //   // Send the POST request.
      //   $.ajax("/burgers", {
      //     type: "POST",
      //     data: JSON.stringify(newBurger),
      //     dataType:'json',
      //     contentType: 'application/json'
      //   }).then(function() {
      //     console.log("created new cat");
      //     // Reload the page to get the updated list
      //     location.reload();
      //   });
      // });
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-burger", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });