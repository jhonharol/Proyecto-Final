module.exports = (app) => {
    const students = require('../controller/students.controller');
    // Create a new Student
    app.post('/students', students.create);
    // List all PStudent
    app.get('/students', students.findAll);
    // Get a single Student by id
    app.get('/students/:id', students.findOne);
    // Update a Student by id
    app.put('/students/:id', students.update);
    // Delete a Student by id
    app.delete('/students/:id', students.delete);
  }
  