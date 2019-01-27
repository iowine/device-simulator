import colors = require('colors/safe')
import { Device } from './models/Device'

export { setupDevices }

let deviceList: Array<Device> = []

/**
 * Uploads from every device then calls itself using timeout for next upload.
 */
function setupDevices(endpoint: string, devices: number, start: number, delay: number) {

    /* Log creation */
    console.log('Creating devices targeting', colors.yellow(endpoint))

    /* Create every device */
    Array(devices).fill(NaN).map((_, i) => 
        deviceList.push(new Device(endpoint, start + i, delay))
    )

}