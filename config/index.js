const enviromentConfig = (env) => {
  try{
    return require(`./config.${env}.json`)
  } catch (error) {
    new Error(`Config file ----> /config.${env}.json could not be found`)
  }
}

module.exports = { enviromentConfig }
