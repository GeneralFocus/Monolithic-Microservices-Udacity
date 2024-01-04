import AWS from 'aws-sdk';

// Create AWS SDK instance
const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE }),
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  params: { Bucket: process.env.AWS_MEDIA_BUCKET },
});

export const getGetSignedUrl = async (key: string, expireSeconds = 300): Promise<string> => {
  try {
    const signedUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_MEDIA_BUCKET,
      Key: key,
      Expires: expireSeconds,
    });
    return signedUrl;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error generating signed GET URL:', error);
    throw error;
  }
};

export const getPutSignedUrl = async (key: string, expireSeconds = 300): Promise<string> => {
  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_MEDIA_BUCKET,
      Key: key,
      Expires: expireSeconds,
    });
    return signedUrl;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error generating signed PUT URL:', error);
    throw error;
  }
};
