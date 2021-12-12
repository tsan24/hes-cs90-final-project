const AWS = require('aws-sdk');
const CREDENTIALS = './credentials.js';
const BUCKET_NAME = 'santos-solar-data';

const s3 = new AWS.S3({
    accessKeyId: CREDENTIALS.accessKeyId,
    secretAccessKey: CREDENTIALS.secretAccessKey
});

exports.handler = async (event) => {
    var result = {
        success: true,
        message: "",
        results: [],
        errors: []
    };

    var body = JSON.parse(event['body']);
    /** @type {SolarData[]} */
    var arrObjSolarData = body['data'];

    console.log(arrObjSolarData, arrObjSolarData)

    for (var i = 0; i < arrObjSolarData.length; i++) {
        /** @type {SolarData} */
        var objSolarData = arrObjSolarData[i];

        try {
            var fileName = `${objSolarData.solarArrayId}_${objSolarData.date}.json`;
            var filePath = `solar_data/${fileName}`;
            const objectType = 'application/json';

            var params = {
                Bucket: BUCKET_NAME, // your bucket name,
                Key: filePath, // path to the object you're looking for
                Body: JSON.stringify(objSolarData),
                ContentType: objectType
            }
            const s3Result = await s3.putObject(params).promise();
            objSolarData.path = filePath;
            result.results.push(objSolarData);
        } catch (error) {
            result.errors.push(objSolarData);
            console.log('error', error);
        }
    }

    console.log('END')
    result.message = `Successfully added ${result.results.length} Solar Data files to AWS. ${result.errors.length} Failed.`;

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};