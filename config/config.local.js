'use strict'

// exports.middleware = ['devserver']

exports.mysql = {
  client: {
    host: '192.168.120.34',
    port: '3306',
    user: 'HNCDB-frontend',
    password: '654321',
    database: 'HNCDB',
  },
  app: true,
  agent: false,
}
