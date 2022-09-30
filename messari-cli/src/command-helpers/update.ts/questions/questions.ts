import { Input, Select } from './types'

export const askProtocol = {
  type: 'input',
  name: 'protocol',
  message: 'Input the protocol you want to add:',
}

export const askBase: Input = {
  type: 'input',
  name: 'base',
  message: 'Select base directory for this protocol:',
}

export const askDeploymentID: Input = {
  type: 'input',
  name: 'deployment',
  message: 'Input the deployment ID you want to add:',
}

export const askNetwork: Select = {
  type: 'select',
  name: 'network',
  message: 'Select the network for this deployment:',
  choices: [
    'arbitrum',
    'arweave-mainnet',
    'aurora',
    'avalanche',
    'boba',
    'bsc',
    'celo',
    'clover',
    'cosmos',
    'cronos',
    'ethereum',
    'fantom',
    'fuse',
    'harmony',
    'juno',
    'moonbeam',
    'moonriver',
    'near-mainnet',
    'optimism',
    'osmosis',
    'polygon',
    'gnosis',
    'other',
  ],
}

export const askStatus: Select = {
  type: 'select',
  name: 'status',
  message: 'Select the status for this deployment:',
  choices: ['dev', 'prod'],
}

export const askSubgraphVersion: Input = {
  type: 'input',
  name: 'subgraphVersion',
  message: 'Input the subgraph version for this deployment (e.g. 1.0.0):',
}

export const askMethodologyVersion: Input = {
  type: 'input',
  name: 'methodologyVersion',
  message: 'Input the methodology version for this deployment (e.g. 1.0.0):',
}

export const askSchemaVersion: Input = {
  type: 'input',
  name: 'schemaVersion',
  message: 'Input the schema version for this deployment (e.g. 1.0.0):',
}

export const askSubgraphManifestTemplateName: Input = {
  type: 'input',
  name: 'subgraphManifestTemplateName',
  message:
    'Input the subgraph manifest template name for this deployment (e.g. subgraph.template.yaml):',
}

export const askService: Select = {
  type: 'select',
  name: 'service',
  message: 'Input the service name for this deployment:',
  choices: ['hosted-service', 'subgraph-studio', 'none'],
}

export const askSlug: Input = {
  type: 'input',
  name: 'slug',
  message: 'Input the slug for this deployment (e.g. apeswap-bsc):',
}

export const askQueryId: Input = {
  type: 'input',
  name: 'queryId',
  message:
    'Input the query ID for this deployment (e.g. hosted-service - apeswap-bsc | subgraph-studio - 0x1234567890):',
}
