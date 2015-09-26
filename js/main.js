var Animal = Animal || {};
var View = View || {};

View = {
  initialise: function(){
    $("#new-animal-form").on("submit", function(e){
      e.preventDefault;
      Animal.create($(this).serialize());
    })
    $("body").on("click", ".js-kill", function(e){
      e.preventDefault;
      Animal.kill($(this).data("id"));
    })
  }
}

Animal = {
  all: function (){
    this.request("/animals", "get").done(this.appendAnimals);
  },

  create: function(animal){
    this.request("/animals", "post", animal).done(this.appendAnimals);
  },

  kill: function(animalId){
    console.log("in the kill method");
    this.request("/animals/" + animalId, "delete").done(function(response){
      animalId = "#" + animalId;
      console.log($(animalId));
      $(animalId).remove();
    })
  },

  request: function (url, method, data){
    return $.ajax({
      url: url, 
      method: method,
      dataType: "json",
      data: data
    })
  },

  appendAnimals: function (animals){
    $.each(animals, function(index, animal){
      animalTemplate = "<tr id='" + animal._id + "'>";
      animalTemplate += "<td>" + animal.name + "</td>";
      animalTemplate += "<td>" + animal.breed + "</td>";
      animalTemplate += "<td>" + animal.dob + "</td>";
      animalTemplate += "<td>" + animal.gender + "</td>";
      animalTemplate += "<td>" + animal.family + "</td>";
      animalTemplate += "<td class='js-update'><a href='#'>" + animal.status + "</a></td>";
      animalTemplate += "<td><button class='js-kill' data-id='" + animal._id + "'>Kill!</button></td>";
      animalTemplate += "</tr>";
      $("#animals").append(animalTemplate);
    })
  },
}

$(document).on("ready", function(){
  Animal.all();
  View.initialise();
})


