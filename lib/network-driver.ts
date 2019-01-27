import colors = require('colors/safe')
const request = require('request')

export { sendData }

/**
 * Sends raw data to server.
 * @param data Data to send.
 */
function sendData(endpoint: string, payload: string) {

    /* Set up request */
    let options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'content-type': 'application/json'
        },
        encoding: null,
        body: payload
    }

    /* Log */
    console.log(
        '\tSending', colors.yellow(`<${options.method}>`),
        'to', colors.yellow(`<${options.url}>`)
    )

    /* Send request */
    request(options, (error: any, response: any, _: any) => {

        /* Handle request error */
        if (error) {
            console.log(colors.red(error))
            return
        }

        /* Handle response error */
        if (response.statusCode != 200) {
            console.log(colors.red(`\t\t${response.statusCode}: ${response.statusMessage}`))
            console.log(colors.grey(response.body.toLocaleString()))
            return
        } 
        
        /* Handle success */
        console.log(colors.green(`\t\t${response.statusCode}: ${response.statusMessage}`))

    })
}