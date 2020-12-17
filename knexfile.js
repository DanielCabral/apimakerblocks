module.exports = {
development: {
      client: 'mysql',
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_d3a9b580de36c15',
        user:     'bb3f30639486b2',
        password: '862c56b8'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
    staging: {
      client: 'mysql',
      connection: {
        //mysql://bb3f30639486b2:862c56b8@us-cdbr-east-02.cleardb.com/heroku_d3a9b580de36c15?reconnect=true
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_d3a9b580de36c15',
        user:     'bb3f30639486b2',
        password: '862c56b8'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
    production: {
      client: 'mysql',
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_d3a9b580de36c15',
        user:     'bb3f30639486b2',
        password: '862c56b8'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
  };