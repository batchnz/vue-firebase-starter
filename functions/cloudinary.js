const os = require("os");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "batch",
  api_key: "558412674887397",
  api_secret: "4mqKp-gdntNhEsqHyNUzHOYQFlY"
});

exports.uploadImage = function(imageStr, config) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageStr,
      {
        resource_type: "image",
        folder: `allocate/${config.subFolder}`,
        ...config
      },
      function(error, result) {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

/*
    { public_id: '4srvcynxrf5j87niqcx6w',
      version: 1340625837,
      signature: '01234567890abcdef01234567890abcdef012345',
      width: 200,
      height: 200,
      format: 'jpg',
      resource_type: 'image',
      url: 'http://res.cloudinary.com/demo/image/upload/v1340625837/4srvcynxrf5j87niqcx6w.jpg',
      secure_url: 'https://res.cloudinary.com/demo/image/upload/v1340625837/4srvcynxrf5j87niqcx6w.jpg' } */
