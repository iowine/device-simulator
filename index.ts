/* External imports */
import colors = require('colors/safe')

/* Internal imports */
import { setupDevices } from './lib/device-manager'
import { getVariable, getNumber } from './lib/cli-helper'

/**
 * Command-Line Interface Specification
 * 
 *      <command> [-- <args>]
 *  
 *  Target variables 
 *      --endpoint=<iowine> - Cloud Function endpoint to POST data to
 * 
 *  Setup variables
 *      --devices=4         - Number of devices to simulate
 *      --start=0x00010A    - Simulaton device start ID
 * 
 *  Network variables
 *      --delay=15          - Upload frequency in mins
 *                              (0 for sequential)
 */

/* Target variables */
const ENDPOINT_DEFAULT: string = 'https://us-central1-iowine-cloud.cloudfunctions.net/pushData'
let endpoint: string            = getVariable('endpoint')   || ENDPOINT_DEFAULT

/* Setup variables */
const DEVICES_DEFAULT: number   = 4
const START_DEFAULT: number     = 0x00010A
let devices: number             = getNumber('devices')      || DEVICES_DEFAULT
let start: number               = getNumber('start')        || START_DEFAULT

/* Network variables */
const DELAY_DEFAULT: number     = 15
let delay: number               = getNumber('delay')        || DELAY_DEFAULT

/* Print hello world and start */
console.log('Starting', colors.red('IoWine Simulator'))
setupDevices(endpoint, devices, start, delay)