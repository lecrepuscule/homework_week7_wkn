var Animal = Animal || {};
var View = View || {};

View = {
  initialise: function(){
    $("#new-animal-form").on("submit", function(e){
      e.stopPropagation();
      e.preventDefault;
      Animal.create($(this).serialize());
    })

    $("body").on("click", ".js-kill", function(e){
      e.preventDefault;
      e.stopPropagation();
      Animal.kill($(this).data("id"));
    })

    $("body").on("click", ".js-update", function(e){
      e.stopPropagation();
      e.preventDefault;
      Animal.updateStatus($(this).parent().attr("id"), $(this).data("action"));
    })
  }
}

Animal = {

  actions: {
    adopt: "adopted",
    abandon: "abandoned"
  },

  availableActions: function(status) {
    var availableActions = $.extend(true, {}, Animal.actions);
    $.each(availableActions, function(k,v){
      if (v === status) delete availableActions[k];
    })
    return availableActions;
  },

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
      $(animalId).remove();
    })
  },

  updateStatus: function(animalId, action){
    var status = this.actions[action];
    var data = {
      status: status
    }
    var availableAction = Object.keys(Animal.availableActions(status))[0];
    this.request("/animals/"+ animalId, "put", data).done(function(response){
      animalId = "#" + animalId;
      var toBeUpdated = $(animalId).children(".js-update");
      toBeUpdated.data("action", availableAction);
      toBeUpdated.children().html(availableAction);
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
      var availableActions = $.extend(true, {}, Animal.actions);
      availableAction = Object.keys(Animal.availableActions(animal.status))[0];
      animalTemplate = "<tr id='" + animal._id + "'>";
      animalTemplate += "<td>" + animal.name + "</td>";
      animalTemplate += "<td>" + animal.breed + "</td>";
      animalTemplate += "<td>" + animal.dob + "</td>";
      animalTemplate += "<td>" + animal.gender + "</td>";
      animalTemplate += "<td>" + animal.family + "</td>";
      animalTemplate += "<td class='js-update' data-action=" + availableAction + "><a href='#'>" + availableAction + "</a></td>";
      animalTemplate += "<td><button class='js-kill' data-id=" + animal._id + ">Kill!</button></td>";
      animalTemplate += "</tr>";
      $("#animals").append(animalTemplate);
    })
  }
}

$(document).on("ready", function(){
  Animal.all();
  View.initialise();
})


