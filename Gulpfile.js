var fs = require('fs');
var gulp = require('gulp');
var bower = require('gulp-bower');
var nodemon = require('gulp-nodemon');
var sqlite3 = require('sqlite3').verbose();
var models = require('Soen387Final/db-master/models');
var exec = require('child_process').exec;

gulp.task('bootstrap-database', function(callback) {
  // Create required folder
  if (!fs.existsSync('db-master')){
    fs.mkdirSync('db-master');
  }

  // Create empty database file
  var db = new sqlite3.Database('db-master/test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  models.sequelize.sync().then(function() {
    callback();
    db.close();
  });
});

gulp.task('bootstrap', ['bootstrap-database'], function() {
  exec('sqlite3 db-master/test.db < node_modules/Soen387Final/db-master/data/full.sql');
});

gulp.task('bower', function() {
  return bower({ cwd: 'FRONTEND' });
});

gulp.task('serve', ['bower'], function() {
  nodemon({
    script: 'server.js'
  });
});
