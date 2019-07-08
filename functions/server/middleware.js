const os = require("os");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const createError = require("http-errors");

exports.createError = createError;

exports.logger = (req, res, next) => {
  console.log(`Access: ${req.path}`);
  next();
};

exports.defineRawBody = (req, res, next) => {
  if (
    req.rawBody === undefined &&
    req.method === "POST" &&
    req.headers["content-type"] !== undefined &&
    req.headers["content-type"].startsWith("multipart/form-data")
  ) {
    const getRawBody = require("raw-body");
    const contentType = require("content-type");
    getRawBody(
      req,
      {
        length: req.headers["content-length"],
        limit: "10mb",
        encoding: contentType.parse(req).parameters.charset
      },
      (err, string) => {
        if (err) return next(err);
        req.rawBody = string;
        next();
      }
    );
  } else {
    next();
  }
};

exports.writeFileToLocal = async (req, res, next) => {
  try {
    if (req.method !== "POST") throw new Error("Wrong request method");
    const busboy = new Busboy({ headers: req.headers });
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const saveTo = path.join(os.tmpdir(), filename);
      res.locals.imageDir = { file: saveTo, type: mimetype };
      const fsStream = fs.createWriteStream(saveTo);
      fsStream.on("error", function(err) {
        file.unpipe();
        fsStream.end();
        return next(createError(400, err));
      });
      file.pipe(fsStream);
    });
    busboy.on("finish", () => {
      next();
    });
    busboy.end(req.rawBody);
  } catch (error) {
    next(error);
  }
};
