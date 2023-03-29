import { APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda'
import fetch from 'node-fetch'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event: APIGatewayEvent, context: APIGatewayProxyCallback) => {

    // Example usage of node-fetch
    const response = await fetch('https://api.kanye.rest')
    const data = await response.json()

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Hello, World!',
            data: data,
        }),
    }  
}