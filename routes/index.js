var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((err, docs) => {
    if(err) {
      return console.log(err);
    }
    res.render('index', { docs });
  });
});

router.get('/novo', function (req, res, next){
  res.render('novo', { title:'Cadastro de Cliente', doc: {"nome":"", "idade":"", "uf": ""}, action: '/novo' })
});

/* POST new page */

router.post('/novo', function (req, res, next){
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({ nome, idade, uf}, (err, result) =>{
    if(err) { 
      return console.log(err);
    }
    res.redirect('/');
  });
});

// delete

router.get('/delete/:id', function (req, res){
  var id = req.params.id;
  global.db.deleteOne(id, (err, r) =>{
    if(err){
      return console.log(err)
    }
    res.redirect('/')
  });
});

// upate

router.get('/edit/:id', function(req, res, next){
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.update({ nome, idade, uf}, (err, result) =>{
    if(err) { 
      return console.log(err);
    }
    res.redirect('/');
  });
});


module.exports = router;
