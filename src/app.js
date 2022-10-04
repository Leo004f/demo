const express = require ('express');
const mongoose =require('mongoose');
const Publicacion = require('../models/post');
const Comentarios = require('../models/comment');

let now = new Date();
console.log(now);


mongoose.connect('mongodb+srv://lyons:123@cluster0.jgdnxk5.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectados a MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('FALLA al conectarse a MongoDB Atlas!');
    console.error(error);
  });

  const app = express();

  app.use(express.json())


app.use((req, res, next) => {
    console.log('Solicitud recibida!');
    next();
  });
  
  
  app.use((req, res, next) => {
    console.log('Respuesta enviada con éxito!');
    next();
  });

  app.get('/api/publicaciones', (req, res, next) => {
    Publicacion.find().then(
      (publicaciones) => {
        res.status(200).json(publicaciones);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  //crear una publicacion

  app.post('/api/publicaciones', (req, res, next) => {

    const publicacion = new Publicacion({
      title: req.body.title,
      description: req.body.description,
      time: now,
      userId: req.body.userId,
    });
    publicacion.save().then(
      () => {
        res.status(201).json({
            message: 'se guardo publi',
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.put('/api/publicaciones/:id', (req, res, next) => {
    const publicacion = new Publicacion({
      _id: req.params.id,
      title: req.body.title,
      d_id: req.body.description,
      time: req.body.time,
      userId: req.body.userId
  });
    Publicacion.updateOne({_id: req.params.id}, publicacion).then(
      () => {
        res.status(201).json({
          message: 'publicacion editada!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


app.get('/api/publicaciones/:id', (req, res, next) => {
  Publicacion.findOne({
    _id: req.params.id
  })
  .then(
    (publicacion) => {
      res.status(200).json(publicacion);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

  app.post('/api/comentarios', (req, res, next) => {
    const comentario= new Comentarios({
      publiId: req.body.publiId,
      commentId: req.body.commentId, 
      userId: req.body.userId,
      comDescription: req.body.comDescription,
    });
    comentario.save().then(
      () => {
        res.status(201).json({
            message: 'Coment guardado',
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.get('/api/comentarios', (req, res, next) => {
    Comentarios.find().then(
      (comentarios) => {
        res.status(200).json(comentarios);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


module.exports = app;