
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
      console.log('err here first');
      console.log(err);
      return res.status(500).send(err);
    }

    let params = {
      Bucket: 'oinkster',
      Key: req.file.originalname,
      Body: req.file.buffer
    };

    s3.putObject(params, (err, data) => {
      if(err){
        console.log(err);
        return res.status(500).send(err);
      }
      console.log('success');
      res.status(200).send(data);
    })

  })
}

export { upload }
