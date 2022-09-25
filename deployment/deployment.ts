const { executeDeployment } = require("./execution");
const args = require("minimist")(process.argv.slice(2));
const {
  validateDeploymentJson,
} = require("./validation/validateDeploymentJson.ts");
const { Deployment } = require("./deploymentClass.ts");
const deploymentJsonData = require("./deployment.json");

validateDeploymentJson(deploymentJsonData);

console.log(process.argv);
console.log(args);
if (
  args.deploy === undefined ||
  args.token === undefined ||
  args.id === undefined ||
  args.service === undefined ||
  args.target === undefined ||
  args.span === undefined ||
  args.slug === undefined ||
  args.printlogs === undefined
) {
  throw new Error(
    "Please check package.json scripts in local subgraph folder. This error is being thrown because it is missing a parameter in the 'build' script. You can find an updated version of the scripts in the deployments folder at the head of the directory."
  );
}

const deploymentJsonMap = JSON.parse(JSON.stringify(deploymentJsonData));

const deployment = new Deployment(deploymentJsonMap, args);

deployment.prepare();
executeDeployment(deployment, () => {});
