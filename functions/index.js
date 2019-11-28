const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase)

exports.uploadImage = functions.storage.object().onFinalize(event => {
    const filePath = event.data.name
    const object = event.data
    const file = gcs.bucket(object.bucket).file(object.name)

    const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/' +
        event.data.bucket + '/o/' + file.id + '?alt=media&token=' +
        event.data.metadata.firebaseStorageDownloadTokens
    
        admin.database().ref('/images').push({url: downloadUrl})
})