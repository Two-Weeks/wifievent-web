const path = require('path');

module.exports = {
  config: path.resolve(__dirname, '..', 'config'),
  'migrations-path': path.resolve(__dirname, '..', 'migrations'),
  'seeders-path': path.resolve(__dirname, '..', 'seeders'),
  'models-path': path.resolve(__dirname, '..', 'models')
};