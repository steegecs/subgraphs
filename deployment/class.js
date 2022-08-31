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
    } else if (scope == "protocol") {
      for (const network in this.data[this.protocol]["networks"]) {
        this.generateScripts(
          this.protocol,
          network,
          this.getTemplate(this.protocol, network)
        );
      }
    } else if (scope == "fork") {
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
    let location = this.getLocation(
      protocol,
      network,
      this.getServiceByAlias()
    );

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
    if ((this.type = "deploy" || this.type == "")) {
      scripts.push(this.getDeploymentScript());
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
  checkValidDeploymentScope() {
    if (!this.protocol && !this.fork) {
      throw new Error(
        "please specify a protocol, protocol and network, or fork"
      );
    } else if (this.fork && (this.protocol || this.network)) {
      throw new Error(
        "If you specify a fork, you must not specify a protocol or network"
      );
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
        return true;
      case "hosted-service":
      case "hosted":
      case "h":
        return true;
      case "cronos-portal":
      case "cronos":
      case "c":
        return true;
      case undefined:
        throw new Error("service is not defined");
      default:
        throw new Error("service is not valid");
    }
  }

  // Makes sure the version specified in the json file is valid.
  checkValidVersion(version) {
    this.checkVersionLengthIsTwo(version);
    this.checkVersionIsNumber(version);
  }

  checkVersionLengthIsTwo(version) {
    if (version.split(".").length - 1 != 2) {
      throw new Error(
        "(1) version is not valid - must be in format x.x.x (e.g. 1.3.1)"
      );
    }
  }

  checkVersionIsNumber(version) {
    let array = version.split(".");
    if (
      !array.every((element) => {
        return !isNaN(element);
      })
    ) {
      throw new Error(
        "(2) version is not valid - must be in format x.x.x (e.g. 1.3.1)"
      );
    }
  }

  // Checks if the protocol level data in the deployment json file is present and/or valid.
  checkProtocolLevelData(protocol) {
    if (!this.data[protocol]) {
      throw new Error("protocol is not defined");
    } else if (Object.keys(this.data[protocol]) == []) {
      throw new Error("no networks are defined for " + protocol);
    }
  }

  // Checks if the network level data necessary to build this subgraph is present and/or valid.
  checkNetworkLevelBuildDataOnly(protocol, network) {
    if (!this.data[protocol]["networks"][network]) {
      throw new Error("network is not defined");
    } else if (!this.data[protocol]["networks"][network]["files"]["template"]) {
      throw new Error(
        "template is not defined for " + protocol + " " + network
      );
    }
  }

  // Checks if the network level data necessary to build and deploy this subgraph is present and/or valid.
  checkNetworkLevelData(protocol, network) {
    if (!this.data[protocol]["networks"][network]) {
      throw new Error("network is not defined");
    } else if (
      !this.data[protocol]["networks"][network][this.getServiceByAlias()]
    ) {
      throw new Error("service is not defined for " + protocol + " " + network);
    } else if (
      !this.data[protocol]["networks"][network][this.getServiceByAlias()][
        "subgraph-slug"
      ]
    ) {
      throw new Error(
        "subgraph-slug is not defined for " + protocol + " " + network
      );
    } else if (
      !this.data[protocol]["networks"][network][this.getServiceByAlias()][
        "version"
      ]
    ) {
      throw new Error("version is not defined for " + protocol + " " + network);
    } else if (!this.data[protocol]["networks"][network]["files"]["template"]) {
      throw new Error(
        "template is not defined for " + protocol + " " + network
      );
    }
    this.checkValidVersion(
      this.data[protocol]["networks"][network][this.getServiceByAlias()][
        "version"
      ]
    );
  }

  checkAuthorization() {
    if (!this.access && this.getServiceByAlias() == "cronos-portal") {
      throw new Error("please specify an authorization token");
    }
  }

  // Runs all checks for valid input data.
  isValidInput() {
    if (!this.target && this.type != "build") {
      throw new Error(
        "Please specify a target location if you are deploy. If you are trying to build, set type=build"
      );
    }
    if (!["build", "deploy", "check", ""].includes(this.type)) {
      throw new Error("Please specify a valid type");
    }
    this.checkAuthorization();
    this.checkValidService();
    this.checkValidDeploymentScope();
  }

  // This checks if the deployment json file is valid for the deployments that you want to execute.
  isValidJsonData() {
    let scope = this.getDeploymentScope();
    if (scope == "network") {
      this.checkProtocolLevelData(this.protocol);
      if (this.type == "deploy" || this.type == "check") {
        this.checkNetworkLevelBuildDataOnly(this.protocol, this.network);
      } else if (this.type == "build") {
        this.checkNetworkLevelData(this.protocol, this.network);
      }
    } else if (scope == "protocol") {
      this.checkProtocolLevelData(this.protocol);
      for (const network in this.data[this.protocol]["networks"]) {
        if (this.type == "deploy" || this.type == "check") {
          this.checkNetworkLevelBuildDataOnly(this.protocol, this.network);
        } else if (this.type == "build") {
          this.checkNetworkLevelData(this.protocol, this.network);
        }
      }
    } else if (scope == "fork") {
      let forkProtocols = this.getAllForks();
      if (forkProtocols == []) {
        return [false, "ERROR: fork is not defined"];
      }
      for (const protocol in forkProtocols) {
        this.checkProtocolLevelData(protocol);
        for (const network in this.data[protocol]["networks"]) {
          if (this.type == "deploy" || this.type == "check") {
            this.checkNetworkLevelBuildDataOnly(this.protocol, this.network);
          } else if (this.type == "build") {
            this.checkNetworkLevelData(this.protocol, this.network);
          }
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
        throw new Error("service is not valid");
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

  getLocation(protocol, network, service) {
    if (!this.data[protocol]["networks"][network][service][this.target]) {
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
    } else if (this.protocol) {
      return "protocol";
    } else if (this.fork) {
      return "fork";
    }
  }

  // Get the deployment script with the proper endpoint, version, and authorization token.
  getDeploymentScript() {
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
        throw new Error("service is not valid");
    }

    return deploymentScript;
  }
}

module.exports = { Deployment };
