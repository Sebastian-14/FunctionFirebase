const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage');
const admin = require('firebase-admin');

const { Storage } = require('@google-cloud/storage')

admin.initializeApp(functions.config().firebase)

const storage = new Storage({
    projectId: 'lab13-6db12'
  });

exports.uploadImage = functions.storage.object().onFinalize( async (object) => {

    const fileBucket = object.bucket
    const filePath = object.name

    const bucket = storage.bucket(fileBucket).file(filePath)

    const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/' + 
        object.bucket + '/o/' + 
        bucket.id + '?alt=media&token=' +
        object.metadata.firebaseStorageDownloadTokens
        admin.database().ref('/images').push({url: downloadUrl})
})

// https://firebasestorage.googleapis.com/v0/b/lab13-6db12.appspot.com/o/images%2FaUWJmMpWemj3Eh0nuSQx?alt=media&token=3d436fd1-b78b-45b4-841f-459f04dacb6f
