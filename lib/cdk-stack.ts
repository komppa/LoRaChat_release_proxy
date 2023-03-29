import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create a Lambda function
        const helloLambda = new lambda.Function(this, 'HelloFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'helloLambda.handler',
            code: lambda.Code.fromAsset('lambda'),
        });

        // Create an API Gateway REST API
        const api = new apigateway.RestApi(this, 'HelloApi', {
            restApiName: 'Hello World API',
        });

        // Create a Lambda integration with the Lambda function
        const lambdaIntegration = new apigateway.LambdaIntegration(helloLambda);

        // Add a resource and method for the API Gateway
        api.root.addMethod('GET', lambdaIntegration);
    }
}
