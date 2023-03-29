import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'


export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // Create a Lambda function
        const releaseProxy = new NodejsFunction(this, 'ReleaseProxyFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            entry: 'lambda/releaseProxy.ts',
            handler: 'handler',
        })

        // Create an API Gateway REST API
        const api = new apigateway.RestApi(this, 'ReleaseProxyApi', {
            restApiName: 'Release Proxy API',
        })

        // Create a Lambda integration with the Lambda function
        const lambdaIntegration = new apigateway.LambdaIntegration(releaseProxy)

        // Add a resource and method for the API Gateway
        api.root.addMethod('GET', lambdaIntegration)
    }
}
