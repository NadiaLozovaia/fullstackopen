const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authToken = request.get("authorization");
  if (authToken && authToken.startsWith("Bearer ")) {
    request.token = authToken.replace("Bearer ", "");
  }
  next();
};
const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    request.user = await User.findById(decodedToken.id);
  } else {
    return response.status(401).json({ error: "Unauthorized" });
  }
  next();
};



const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "Unauthorized")
    return response.status(401).json({ error: error.message });
   
    
  next(error);
};

const validator = (request, response, next) => {
  console.log(request.body,'v')

  // const { blog } = request.body
  
  if (request.method==='POST' && (request.body.url==='') ) {
    return response.status(400).json({
      error: 'url has to be added'
    })
  }   
  else {
    next()
  }
}


module.exports = {
  validator,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
