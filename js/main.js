var Animal = Animal || {};
var View = View || {};

// View = {
//   initialise = function(){

//   }
// }

Animal = {
  all: function (){
    this.request("/animals", "get").done(this.appendAnimals);
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
      animalTemplate = "<tr id='" + animal.id + "'>";
      animalTemplate += "<td>" + animal.name + "</td>";
      animalTemplate += "<td>" + animal.breed + "</td>";
      animalTemplate += "<td>" + animal.dob + "</td>";
      animalTemplate += "<td>" + animal.gender + "</td>";
      animalTemplate += "<td>" + animal.family + "</td>";
      animalTemplate += "<td class='js-update'><a href='#'>" + animal.status + "</a></td>";
      animalTemplate += "<td><button class='js-kill' data-id='" + animal.id + "'>Kill!</button></td>";
      animalTemplate += "</tr>";
      $("#animals").append(animalTemplate);
    })
  }
}

$(document).on("ready", function(){
  Animal.all();
  // View.initialise();
})


