import process = require('process')

export { isDefined, getVariable, getNumber }

/**
 * Checks if variable is defined in CLI call.
 * @param variable Variable to check.
 */
function isDefined(variable: string): boolean {

    /* Track whether found */
    let success: boolean = false

    process.argv.forEach((value, index) => {
        /* --${name}=${value} */
        let name: string = (value.split('--').length > 1) ? value.split('--')[1] : ""
        if (name == "") return
        name = name.split('=')[0]
        if (name == variable) success = true
    })
    
    /* Return whether found */
    return success

}

/**
 * Returns variable from CLI call as string.
 * @param variable Variable to return.
 */
function getVariable(variable: string): string {

    /* Return null if not defined */
    if (!isDefined(variable)) return ''

    /* Seach for variable */
    let result: string = ""   
    process.argv.forEach((argument, index) => {
        /* --${name}=${value} */
        let name: string = (argument.split('--').length > 1) ? argument.split('--')[1] : ""
        if (name == "") return
        let value: string = (name.split('=').length > 1) ? name.split('=')[1] : ""
        name = name.split('=')[0]
        if (value == "") return
        if (name == variable) result = value
    })

    /* Return value */
    return result
}

/**
 * Returns variable from CLI call as number.
 * @param variable Variable to return.
 */
function getNumber(variable: string): number {
    return Number(getVariable(variable))
}