import colors = require('colors/safe')
import { EnvironmentVariable } from './EnvironmentVariable'
import { sendData } from '../network-driver'

export { Device }

/**
 * Device simulator.
 */
class Device {

    /* Device configuration */
    private endpoint: string
    private id: string
    private delay: number

    /* Device variables */
    private temperature: EnvironmentVariable
    private humidity: EnvironmentVariable
    
    /**
     * Device constructor.
     * @param endpoint  Endpoint to upload to.
     * @param id        Device ID to upload with.
     * @param delay     Upload frequency (mins).
     */
    constructor(endpoint: string, id: number, delay: number) {

        /* Log */
        console.log(
            '\tCreating device', colors.cyan(`#<${id}>`), 
            'with delay', colors.magenta(`<${delay}>min`)
        )
        
        /* Device configuration */
        this.endpoint = endpoint
        this.id = `simIOW_${id.toString(16)}`
        this.delay = delay

        /* Device variables */
        this.temperature = new EnvironmentVariable(20 + Math.random() * 5 - 2.5)
        this.humidity = new EnvironmentVariable(60 + Math.random() * 10 - 5)

        /* Log */
        console.log(
            '\t', colors.cyan(`#<${this.id}>`),
            colors.green(`<${this.temperature.get().toFixed(2)}>, <${this.humidity.get().toFixed(2)}>`)
        )

        /* Start upload */
        this.upload()

    }

    /**
     * Upload function.
     * Updates variables and uploads.
     */
    public upload() {

        /* Log */
        console.log('Device', colors.cyan(`#<${this.id}>`), colors.magenta('uploading...'))

        /* Send updated data */
        sendData(this.endpoint, JSON.stringify({
            time: Date.now(),
            device: this.id,
            temperature: this.temperature.get(),
            humidity: this.humidity.get()
        }))

        /* Log */
        console.log('Device', colors.cyan(`#<${this.id}>`), colors.magenta('waiting...'))

        /* Upload again */
        setTimeout(this.upload, this.delay * 60 * 1000)

    }

}