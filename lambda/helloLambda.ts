export const handler = async (event: any) => {
    // Example usage of node-fetch
    // const response = await fetch('https://api.kanye.rest');
    // const data = await response.json();

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Hello, World4!',
            data: 'data',
        }),
    };
};