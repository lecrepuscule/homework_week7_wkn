var mongoose = require("mongoose");

var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  dob: Date,
  gender: String,
  family: String,
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