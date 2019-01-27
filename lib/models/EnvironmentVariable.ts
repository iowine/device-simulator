export { EnvironmentVariable }

class EnvironmentVariable {

    private value: number

    private changeVelocity: number
    private changeAcceleration: number

    constructor(value: number) {
        this.value = value
        this.changeVelocity = 0
        this.changeAcceleration = Math.random() * 2 - 1
    }

    public get(): number {
        this.changeAcceleration = Math.random() * 0.1 - 0.05
        this.changeVelocity += this.changeAcceleration
        this.value += this.changeVelocity
        return this.value
    }

}