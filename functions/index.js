const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase)

exports.uploadImage = functions.storage.object().onFinalize( async (object) => {
    //const filePath = event.data.name
    //const object = event.data

    const fileBucket = object.bucket
    const filePath = object.name
    //const file = gcs.bucket(object.bucket).file(object.name)

    //gcs.bucket.file(filePath).download 

    //const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/' +
    //    fileBucket + '/o/' + filePath + '?alt=media&token=' +
    //    object.owner. metadata.firebaseStorageDownloadTokens

    const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/' + 
        object.bucket + '/o/' + 
        object.name + '?alt=media&token=' +
        object.downloadTokens


    //const downloadUrl = object.metadata.firebaseStorageDownloadTokens
    
        admin.database().ref('/images').push({url: downloadUrl})
})

// https://firebasestorage.googleapis.com/v0/b/lab13-6db12.appspot.com/o/images%2FaUWJmMpWemj3Eh0nuSQx?alt=media&token=3d436fd1-b78b-45b4-841f-459f04dacb6f
// https://firebasestorage.googleapis.com/v0/b/ + 'fileBucket ' + '/o' + 


// https://firebasestorage.googleapis.com/v0/b/lab13-6db12.appspot.com/o/lab13-6db12.appspot.com/images/hjapIBfTvnwN0pUrWvFs/1574961645966680?alt=media&token=https://www.googleapis.com/download/storage/v1/b/lab13-6db12.appspot.com/o/images%2FhjapIBfTvnwN0pUrWvFs?generation=1574961645966680&alt=media

// object.bucket = lab13-6db12.appspot.com
// object.id = lab13-6db12.appspot.com/images/hjapIBfTvnwN0pUrWvFs/1574961645966680
// object.name = lab13-6db12.appspot.com/images/hjapIBfTvnwN0pUrWvFs/1574961645966680
// object.mediaLink = https://www.googleapis.com/download/storage/v1/b/lab13-6db12.appspot.com/o/images%2FhjapIBfTvnwN0pUrWvFs?generation=1574961645966680&alt=media



// https://firebasestorage.googleapis.com/v0/b/lab13-6db12.appspot.com/o/images/ya4ysLOttzXjoCPyvwbU




//                                            lab13-6db12.appspot.com/images/hjapIBfTvnwN0pUrWvFs/1574961645966680?alt=media&token=https://www.googleapis.com/download/storage/v1/b/lab13-6db12.appspot.com/o/images%2FhjapIBfTvnwN0pUrWvFs?generation=1574961645966680&alt=media