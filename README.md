# LoRa Chat - GitHub Release Proxy

Proxy for fetching the newest release of LoRa Chat on GitHub to be given back to WebUSB flasher.

```bash
npm run build   # Build the project
cdk deploy      # Use --profile <PROFILE> if not set via cli
```


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
