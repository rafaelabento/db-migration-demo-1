'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

/* Contains code to move the database forward, or up, to the next database version */
exports.up = function(db, callback) {
  db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true
    },
    full_name: {
      type: 'string',
      length: 40
    },
    dob: {
      type: 'date'
    },
    email: {
      type: 'string',
      length: 50
    },
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

/* Contains code to move the database backwards, or down, to the previous database
 * version, i.e. rollback */
exports.down = function(db, callback) {
  db.dropTable('user', callback);
};

exports._meta = {
  "version": 1
};
