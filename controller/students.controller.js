const mongoose = require('mongoose'); 
const Student = require('../models/students.model.js'); 

// Crear un nuevo estudiante
exports.create = (req, res) => {
  console.log("Creating a student ... soon!");

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Los datos del estudiante no pueden estar vacíos",
    });
  }

  const student = new Student({
    _id: req.body.id || new mongoose.Types.ObjectId(), 
    name: req.body.name,
    age: req.body.age || 0, 
    grade: req.body.grade || 'Sexto', 
  });

  // Guarda el estudiante en la base de datos
  student.save()
    .then((data) => {
      res.status(200).send(data); 
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió algo incorrecto al crear el registro.",
      });
    });
};

// Recuperar y listar todos los estudiantes
exports.findAll = (req, res) => {
  console.log("Listando todos los estudiantes ... soon!");
  Student.find()
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió algo incorrecto al recuperar los registros.",
      });
    });
};

// Obtener un solo estudiante por su id
exports.findOne = (req, res) => {
  console.log("Getting a particular student ... soon!");
  Student.findById(req.params.id)
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          message: "Estudiante no encontrado con id:" + req.params.id,
        });
      }
      res.status(200).send(student);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Estudiante no encontrado con id:" + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Ocurrió algo incorrecto al recuperar el registro con id:" + req.params.id,
      });
    });
};

// Actualizar un estudiante por su id
exports.update = (req, res) => {
  console.log("Updating a particular student ... soon!");
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Los datos del estudiante no pueden estar vacíos",
    });
  }

  // Find the Student and update it with the request body data
  Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age || 0,
      grade: req.body.grade || 'Sexto',
    },
    { new: true }
  )
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          message: "Estudiante no encontrado con id:" + req.params.id,
        });
      }
      res.status(200).send(student);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Estudiante no encontrado con id:" + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Ocurrió algo incorrecto al actualizar el registro con id:" + req.params.id,
      });
    });
};

// Eliminar un estudiante por su id
exports.delete = (req, res) => {
  console.log("Deleting a particular student ... soon!");
  Student.findByIdAndDelete(req.params.id)
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          message: `Estudiante no encontrado con id: ${req.params.id}`,
        });
      }
      res.status(200).send({ message: "Estudiante eliminado con éxito!" });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Estudiante no encontrado con id: ${req.params.id}`,
        });
      }
      res.status(500).send({
        message: `Ocurrió algo incorrecto al eliminar el registro con id: ${req.params.id}`,
      });
    });
};