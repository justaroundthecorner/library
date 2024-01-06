const config=require("./config.json")
let development=config.development
let testing=config.testing
module.exports={
    client: development.dialect,
    connection: {
      port: development.port,
      host: development.host,
      database: development.database,
      user: development.user,
      password: development.password,
    },

}
