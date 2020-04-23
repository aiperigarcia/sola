module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  // HOMEWORK ==============================
  app.get('/homework', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('homework.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  app.post('/homework', (req, res) => {
    db.collection('messages').save({
      day: req.body.day,
      homeworkType: req.body.homeworkType,
      message: req.body.message,
      completed: false
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/homework')
    })
  })

  app.put('/completedStatus', (req, res) => {
    console.log(req.body.completed)
    console.log(req.body.message);
    db.collection('messages')
      .findOneAndUpdate({
        message: req.body.message
      }, {
        $set: {
          completed: req.body.completed
        }
      }, {
        upsert: false,
        new: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/homework', (req, res) => {
    db.collection('messages').findOneAndDelete({
      message: req.body.message
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })


  // Attendace ==============================
  app.get('/attendance', isLoggedIn, function(req, res) {
    db.collection('attendance').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('attendance.ejs', {
        user: req.user,
        attendance: result
      })
    })
  });



  app.post('/updateattendance', (req, res) => {
    Object.keys(req.body).forEach((name, i) => {
      db.collection('attendance').updateOne({
          name: name
        },
        {
          $set: {
             name: name,
             attendance: req.body[name]
          }
        },
        {
          upsert: true
        },
        (err, result) => {
          if (err) return console.log(err);
          console.log('saved to database');
        })
     })
  })



  // Progress ==============================
  app.get('/progress', isLoggedIn, function(req, res) {
    db.collection('chart').find().toArray((err, result) => {
      console.log(result)
      if (err) return console.log(err)
      res.render('progress.ejs', {
        user: req.user,
        chart: result
      })
    })
  });

  app.get('/progressChart', isLoggedIn, function(req, res) {
    db.collection('chart').find().toArray((err, result) => {
      console.log(result)
      if (err) return console.log(err)
      res.json(result)
    })
  });


  app.post('/gradeChart', (req, res) => {
    console.log(req.body)
    db.collection('chart').save({
      student: req.body.student,
      grade: req.body.grade
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/progress')
    })
  })


  // Events ==============================
  app.get('/events', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('events.ejs', {
        user: req.user,
        messages: result
      })
    })
  });


  // chat ==============================
  app.get('/messages', isLoggedIn, function(req, res) {
    db.collection('chatroom').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('messages.ejs', {
        user: req.user,
        chatroom: result
      })
    })
  });

  app.post('/chat', (req, res) => {
        db.collection('chatroom').save({name: req.body.name, msg: req.body.msg}, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/messages')
        })
      })


      app.delete('/chat', (req, res) => {
        db.collection('chatroom').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
      })


  // PARENT INFO ==============================
  app.get('/myinfo', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('myinfo.ejs', {
        user: req.user,
        messages: result
      })
    })
  });



  // message board routes ===============================================================

  app.post('/messages', (req, res) => {
    db.collection('messages').save({
      name: req.body.name,
      msg: req.body.msg,
      thumbUp: 0,
      thumbDown: 0
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })

  app.put('/messages', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({
        name: req.body.name,
        msg: req.body.msg
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })


  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({
      name: req.body.name,
      msg: req.body.msg
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
