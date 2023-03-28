import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import fetch from 'node-fetch';


const downloadZipFromLatestRelease = async () => {
    const response = await fetch('https://api.github.com/repos/komppa/LoRaChat_v4/releases/latest');
    console.log(response.status)
    const releaseData: any = await response.json();

    let zipUrl = '';

    for (const asset of releaseData.assets) {
        if (asset.content_type === 'application/zip') {
        zipUrl = asset.browser_download_url;
        break;
        }
    }

    if (!zipUrl) {
        throw new Error('ZIP file not found in the latest release');
    }

    const zipResponse = await fetch(zipUrl);
    const zipBuffer = await zipResponse.buffer();

    return zipBuffer;
};


export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const zipBuffer = await downloadZipFromLatestRelease();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename=firmware.zip',
            },
            body: zipBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: 'An error occurred',
        };
    }
};
