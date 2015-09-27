var mongoose = require("mongoose");

var animalSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  breed: {type: String, required: true},
  dob: {type: Date, required: true},
  gender: {type: String, required: true},
  family: {type: String, required: true},
  status: String,
  updatedAt: {type: Date, default: Date.now}
});

animalSchema.methods.availableActions = function(status) {
 var actions = {
    adopt: "adopted",
    abandon: "abadoned"
  };
  $.each(actions, function(k,v){
      if (v === status) delete actions[k];
      return actions;
  })
}

var Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;