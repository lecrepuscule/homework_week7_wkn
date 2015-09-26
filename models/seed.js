var seeder = require('mongoose-seed');

seeder.connect('mongodb://localhost/animal-shelter', function() {
    
    // Load Mongoose models 
    seeder.loadModels([
        './animal.js'
    ]);
    // Clear specified collections 
    seeder.clearModels(['Animal'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data);
 
    });

    // Animal.find({}, function(err, animals) {
    //   if (err) console.log(err);
    //     console.log(animals);
    // });
});

// Data array containing seed data - documents organized by Model 
var data = [
    { 
        'model': 'Animal',
        'documents': [
            {
                'name': 'fido',
                'breed': "dog"
            },
            {
                'name': 'snoopy',
                'breed': "dog"
            }
        ]
    }
]; 