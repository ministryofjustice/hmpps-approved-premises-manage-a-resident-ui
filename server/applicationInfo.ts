import fs from 'fs'
import config from './config'

const { buildNumber, gitRef, productId, branchName } = config

export type ApplicationInfo = {
  applicationName: string
  buildNumber: string
  gitRef: string
  gitShortHash: string
  productId: string
  branchName: string
}

const { name: applicationName } = JSON.parse(fs.readFileSync('./package.json').toString())

const applicationInfo: ApplicationInfo = {
  applicationName,
  buildNumber,
  gitRef,
  gitShortHash: gitRef.substring(0, 7),
  productId,
  branchName,
}

export { applicationInfo }
