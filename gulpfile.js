'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const pg = require('pg');
const knexConfig = require('./knexfile');
const Knex = require('knex');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('resetTestDB', (done) => {
  const dbName = knexConfig.test.connection.database;
  const client = new pg.Client('postgres://localhost:5432/');
  client.connect((err) => {
    if (err) {
      console.error(gutil.colors.red('could not connect to test db'));
      done(err);
    }
    client.query(`DROP DATABASE IF EXISTS "${dbName}";`, (err) => {
      if (err) {
        console.error(gutil.colors.red('could not drop test db'));
        done(err);
      } else {
        client.query(`CREATE DATABASE "${dbName}";`, (err) => {
          if (err) {
            console.error(gutil.colors.red('could not re-create test db'));
            done(err);
          }
          gutil.log(gutil.colors.green('test db dropped & re-created!'));
          client.end();
          done();
        });
      }
    });
  });
});

gulp.task('migrate', () => {
  const env = !!process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  const knex = Knex(knexConfig[env]);

  return knex.migrate.latest()
    .then(() => {
      gutil.log(gutil.colors.green(`migrations done for ${env}!`));
    }, (err) => {
      gutil.log(gutil.colors.red(`error while running migrations for ${env}!`));
    });
});

gulp.task('runTests', () => {
  return gulp.src(['tests/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', (err) => {
      gutil.log(gutil.colors.red(`error while running tests!`));
      process.exit(1);
    })
    .once('end', () => process.exit(0));
});

gulp.task('test', (done) => {
  process.env.NODE_ENV = 'test';
  runSequence('resetTestDB', 'migrate', 'runTests');
});
