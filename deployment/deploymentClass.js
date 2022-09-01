class Deployment {
  constructor(depoymentJsonData, args) {
    // Set arguments to variables
    this.data = depoymentJsonData;
    this.access = args.access;
    this.service = args.service.toLowerCase();
    this.fork = args.fork.toLowerCase();
    this.protocol = args.protocol.toLowerCase();
    this.network = args.network.toLowerCase();
    this.target = args.target.toLowerCase();
    this.type = args.type.toLowerCase();
    this.printlogs = args.printlogs.toLowerCase();
    this.merge = args.merge.toLowerCase();
    this.scripts = new Map();
  }

  prepare() {
    this.isValidInput();
    this.flattenFirstJsonLevel();
    this.isValidJsonData();
    this.prepareScripts();
  }

  // Internal functions
  preprocessing() {
    this.flattenFirstJsonLevel();
    this.isValidDeploymentData();
  }

  // Checks if you are wanting to deploy a single network, all networks for a protocol, or all protocols and networks for a fork
  prepareScripts() {
    let scope = this.getDeploymentScope();
    if (scope == "network") {
      this.generateScripts(
        this.protocol,
        this.network,
        this.getTemplate(this.protocol, this.network)
      );
    }
    if (scope == "protocol") {
      for (const network in this.data[this.protocol]["networks"]) {
        this.generateScripts(
          this.protocol,
          network,
          this.getTemplate(this.protocol, network)
        );
      }
    }
    if (scope == "fork") {
      let forkProtocols = this.getAllForks();
      for (const protocol in forkProtocols) {
        for (const network in this.data[protocol]["networks"]) {
          this.generateScripts(
            protocol,
            network,
            this.getTemplate(protocol, network)
          );
        }
      }
    }
  }

  // Generates scripts necessary for deployment of each network
  generateScripts(protocol, network, template) {
    let scripts = [];

    let location = this.getLocation(protocol, network);

    scripts.push("rm -rf build");
    scripts.push("rm -rf generated");
    scripts.push("rm -rf results.txt");
    scripts.push("rm -rf configurations/configure.ts");
    scripts.push("rm -rf subgraph.yaml");

    scripts.push(
      "npm run prepare:yaml --PROTOCOL=" +
        protocol +
        " --NETWORK=" +
        network +
        " --TEMPLATE=" +
        template
    );
    if (
      this.data[protocol]["networks"][network]["options"][
        "prepare:constants"
      ] == true
    ) {
      scripts.push(
        "npm run prepare:constants --PROTOCOL=" +
          protocol +
          " --NETWORK=" +
          network
      );
    }
    scripts.push("graph codegen");

    // We don't want to deploy if we are building or just testing.
    if (this.type == "deploy") {
      scripts.push(this.getDeploymentScript(location));
    } else {
      scripts.push("graph build");
    }

    this.scripts.set(location, scripts);
  }

  // Just flattens the first level of the json file so you have networks as keys, instead of protocol type.
  flattenFirstJsonLevel() {
    let result = {};
    Object.keys(this.data).forEach((key1) =>
      Object.keys(this.data[key1]).forEach(
        (key2) => (result[key2] = this.data[key1][key2])
      )
    );
    this.data = result;
  }

  // Makes sure the input arguments for the deployments you want are sensible.
  checkValidScope() {
    if (!this.fork && !this.protocol) {
      throw "--PROTOCOL, --NETWORK, --FORK: Please specify a protocol, protocol and network, or fork.";
    }
    if (!this.protocol && this.network) {
      throw "--PROTOCOL, --NETWORK,: Please specify a protocol for a deployment to a specific network.";
    }
    if (this.fork && (this.protocol || this.network)) {
      throw "--PROTOCOL, --NETWORK, --FORK: If you specify a fork, you must not specify a protocol or network";
    }
  }

  // Checks if the input arguments are valid for the deployment location.
  checkValidService() {
    switch (this.service) {
      case "subgraph-studio":
      case "studio":
      case "s":
      case "decentralized-network":
      case "d":
      case "hosted-service":
      case "hosted":
      case "h":
      case "cronos-portal":
      case "cronos":
      case "c":
        return true;
      default:
        throw (
          "--SERVICE: Service is not valid or is missing: service=" +
          this.service
        );
    }
  }

  // Makes sure the version specified in the json file is valid.
  checkValidVersion(version) {
    this.checkVersionLengthIsThree(version);
    this.checkVersionIsNumber(version);
  }

  checkVersionLengthIsThree(version) {
    if (version.split(".").length != 3) {
      throw "See deployment.json: (1) version is not valid - should be 3 integers separated by periods - must be in format x.x.x (e.g. 1.3.1)";
    }
  }

  checkVersionIsNumber(version) {
    let array = version.split(".");
    if (
      !array.every((element) => {
        return !isNaN(element);
      })
    ) {
      throw "See deployment.json: (2) version is not valid - make sure to use integers between the periods - must be in format x.x.x (e.g. 1.3.1)";
    }
  }

  // Checks if the protocol level data in the deployment json file is present and/or valid.
  checkProtocolLevelData(protocol) {
    if ([undefined, ""].includes(this.data[protocol])) {
      throw (
        "Check --PROTOCOL spelling as argument or in deployment.json: protocol= " +
        protocol
      );
    }
    if (Object.keys(this.data[protocol]).length == 0) {
      throw (
        "See deployment.json: No networks are defined for: protocol=" + protocol
      );
    }
  }

  // Checks if the network level data necessary to build this subgraph is present and/or valid.
  checkNetworkLevelBuildData(protocol, network) {
    let networkData = this.data[protocol]["networks"][network];
    if ([undefined, ""].includes(networkData)) {
      throw (
        "Check --NETWORK spelling as argument or in deployment.json: network=" +
        network
      );
    }
    if ([undefined, ""].includes(networkData["files"]["template"])) {
      throw (
        "See deployment.json: template is missing for " +
        protocol +
        " " +
        network
      );
    }
  }

  // Checks if the network level data necessary to build and deploy this subgraph is present and/or valid.
  checkNetworkLevelDeployData(protocol, network) {
    let networkData = this.data[protocol]["networks"][network];
    if ([undefined, ""].includes(networkData)) {
      throw "Check --NETWORK spelling as argument or in deployment.json: network=network";
    }
    if ([undefined, ""].includes(networkData[this.getServiceByAlias()])) {
      throw (
        "See deployment.json: Service is missing for: protocol=" +
        protocol +
        " and network=" +
        network
      );
    }
    if (
      [undefined, ""].includes(
        networkData[this.getServiceByAlias()]["subgraph-slug"]
      )
    ) {
      throw (
        "See deployment.json: subgraph-slug is not defined for: protocol=" +
        protocol +
        " network=" +
        network
      );
    }
    if (
      [undefined, ""].includes(networkData[this.getServiceByAlias()]["version"])
    ) {
      throw (
        "version is not defined for protocol=" +
        protocol +
        " network=" +
        network
      );
    }
    if ([undefined, ""].includes(networkData["files"]["template"])) {
      throw (
        "See deployment.json: template is missing for: protocol=" +
        protocol +
        " network=" +
        network
      );
    }
    this.checkValidVersion(networkData[this.getServiceByAlias()]["version"]);
  }

  checkNetworkLevelData(protocol, network) {
    if (this.type == "deploy" || this.type == "check") {
      this.checkNetworkLevelDeployData(protocol, network);
    } else {
      this.checkNetworkLevelBuildData(protocol, network);
    }
  }

  checkAuthorization() {
    if (!this.access && this.getServiceByAlias() == "cronos-portal") {
      throw "please specify an authorization token";
    }
  }

  // Runs all checks for valid input data.
  isValidInput() {
    if (!this.target && this.type != "build") {
      throw "Please specify a target location if you are deploying. If you are trying to build, set type=build";
    }
    if (!["build", "deploy", "check"].includes(this.type)) {
      throw "Please specify a valid type: type=" + this.type;
    }
    if (this.type != "build") {
      this.checkAuthorization();
      this.checkValidService();
    }
    this.checkValidScope();
  }

  // This checks if the deployment json file is valid for the deployments that you want to execute.
  isValidJsonData() {
    let scope = this.getDeploymentScope();
    if (scope == "network") {
      this.checkProtocolLevelData(this.protocol);
      this.checkNetworkLevelData(this.protocol, this.network);
    }
    if (scope == "protocol") {
      this.checkProtocolLevelData(this.protocol);
      for (const network in this.data[this.protocol]["networks"]) {
        this.checkNetworkLevelData(this.protocol, network);
      }
    }
    if (scope == "fork") {
      let forkProtocols = this.getAllForks();
      if (forkProtocols.length == 0) {
        throw (
          "See deployment.json: fork is missing or not defined for: fork=" +
          this.fork
        );
      }
      for (const protocol in forkProtocols) {
        this.checkProtocolLevelData(protocol);
        for (const network in this.data[protocol]["networks"]) {
          this.checkNetworkLevelData(protocol, network);
        }
      }
    }
  }

  getServiceByAlias() {
    switch (this.service) {
      case "subgraph-studio":
      case "studio":
      case "s":
      case "decentralized-network":
      case "d":
        return "decentralized-network";
      case "hosted-service":
      case "hosted":
      case "h":
        return "hosted-service";
      case "cronos-portal":
      case "cronos":
      case "c":
        return "cronos-portal";
      default:
        throw "Service is missing or not valid for: service=" + this.service;
    }
  }

  getAllForks() {
    returnObj = [];
    for (const protocol in this.data) {
      if (this.data[protocol]["fork"].toLowerCase() == this.fork)
        returnObj.push(protocol);
    }
    return returnObj;
  }

  getVersion(protocol, network, service) {
    return this.data[protocol]["networks"][network][service]["version"];
  }

  getTemplate(protocol, network) {
    return this.data[protocol]["networks"][network]["files"]["template"];
  }

  getLocation(protocol, network) {
    // Check if build first since you may not have a service and target prepared for build.
    if (this.type == "build") {
      return this.protocol + "/" + network;
    }
    let service = this.getServiceByAlias();
    if (
      this.data[protocol]["networks"][network][service][this.target] ==
      undefined
    ) {
      if (this.getServiceByAlias() == "hosted-service") {
        return (
          this.target +
          "/" +
          this.data[protocol]["networks"][network][service]["subgraph-slug"]
        );
      } else {
        return this.data[protocol]["networks"][network][service][
          "subgraph-slug"
        ];
      }
    } else {
      return this.data[protocol]["networks"][network][service][this.target];
    }
  }

  getDeploymentScope() {
    if (this.protocol && this.network) {
      return "network";
    }
    if (this.protocol) {
      return "protocol";
    }
    if (this.fork) {
      return "fork";
    }
  }

  // Get the deployment script with the proper endpoint, version, and authorization token.
  getDeploymentScript(location) {
    let deploymentScript = "";
    switch (this.getServiceByAlias()) {
      case "decentralized-network":
        let version = this.getVersion(
          protocol,
          network,
          this.getServiceByAlias()
        );
        if (this.access) {
          deploymentScript =
            "graph deploy --auth=" +
            this.access +
            " --product subgraph-studio " +
            location +
            " --versionLabel " +
            version;
        } else {
          deploymentScript =
            "graph deploy --product subgraph-studio " +
            location +
            " --versionLabel " +
            version;
        }
        break;
      case "hosted-service":
        if (this.access) {
          deploymentScript =
            "graph deploy --auth=" +
            this.access +
            " --product hosted-service " +
            location;
        } else {
          deploymentScript =
            "graph deploy --product hosted-service " + location;
        }
        break;
      case "cronos-portal":
        deploymentScript =
          "graph deploy " +
          location +
          " --access-token=" +
          this.access +
          " --node https://portal-api.cronoslabs.com/deploy --ipfs https://api.thegraph.com/ipfs";
        break;
      default:
        throw "Service is missing or not valid for: service=" + this.service;
    }

    return deploymentScript;
  }
}

module.exports = { Deployment };
