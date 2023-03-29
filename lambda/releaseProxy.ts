import { APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda'
import fetch from 'node-fetch'
import { ApiResponse } from './types'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event: APIGatewayEvent, context: APIGatewayProxyCallback) => {

    const response = await fetch('https://api.github.com/repos/komppa/LoRaChat_v4/releases/latest')
    const releaseData = (await response.json()) as ApiResponse

    let downloadAddr: string | null = null

    for (const asset of releaseData.assets) {
        if (asset.content_type == 'application/zip') {
            downloadAddr = asset.browser_download_url
        }
    }

    if (downloadAddr == null) {
        return {
            statusCode: 500,
            body: 'Could not download the zip file from GitHub',
        }
    }

    const releaseZipResponse = await fetch(downloadAddr)


    if (!releaseZipResponse.ok) {
        return {
            statusCode: releaseZipResponse.status,
            body: 'Failed to download the zip file',
        }
    }
  
    const zipArrayBuffer = await releaseZipResponse.arrayBuffer()
  
    const zipBase64 = Buffer.from(zipArrayBuffer).toString('base64')
  
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename=release.zip',
            'Access-Control-Allow-Origin': '*'
        },
        isBase64Encoded: true, // Indicate that the response body contains base64-encoded data
        body: zipBase64,
    } 
}