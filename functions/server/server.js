const express = require("express");
const cors = require("cors");
const errorHandler = require("api-error-handler");
const {
  createError,
  logger,
  defineRawBody,
  writeFileToLocal
} = require("./middleware");
const { uploadImage } = require("../cloudinary");

const app = express();

app.use(cors({ origin: true }));
app.use(logger);

app.all("/upload", defineRawBody, writeFileToLocal, async (req, res, next) => {
  try {
    const result = await uploadImage(res.locals.imageDir.file, {
      subFolder: "test"
    });
    res.json(result);
  } catch (error) {
    next(createError(400, error));
  }
});

app.use(errorHandler());

exports.server = app;

/*
firefunctions error obj
{
    "error": {
        "code": 500,
        "status": "INTERNAL",
        "message": "function crashed",
        "errors": [
            "socket hang up"
        ]
    }
}

customised error obj
{
    "status": 500,
    "stack": "Error: Wrong request method\n    at exports.writeFileToLocal (/Users/.../route.js:131:14)",
    "message": "Internal Server Error"
}

*/
