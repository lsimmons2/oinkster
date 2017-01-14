
import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
import config from '../../../config/aws-config'
import path from 'path'
import fs from 'fs'
import multers3 from 'multer-s3'


AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

let storage = multer.memoryStorage();
let buffer = multer({
  storage: storage
}).single('file');


function upload(req, res){
  buffer(req, res, (err) => {

    if (err){
      return res.status(500).send(err);
    }

    let now = new Date();
    let key = req.params.id + '_' + now.getTime();

    let params = {
      Bucket: 'oinkster',
      Key: key,
      Body: req.file.buffer,
      ContentType: 'image/jpeg'
    };

    s3.putObject(params, (err, data) => {
      if(err){
        return res.status(500).send(err);
      }
      res.status(200).json({
        message: 'Image successfully uploaded to S3',
        key
      });
    })

  })
}

export { upload }
