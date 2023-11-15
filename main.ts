//% color=190 weight=100 icon="\uf185" block="IHMC Warmhouse"
namespace IHMCWarmhouse {

    let result = 0
    let down = 0
    let up = 0
    let low = 0
    let high = 0

    //% subcategory="CO2 Sensor"
    //% block="Initialize CO2 Sensor"
    export function Init(): void
    { 
        pins.onPulsed(DigitalPin.P15, PulseValue.High, function () {
            high = pins.pulseDuration() / 1000
        })
        pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
            low = pins.pulseDuration() / 1000
            up = high - 2
            down = high + low - 4
            result = Math.ceil(up / down * 10000)
        })
    }

    //% subcategory="CO2 Sensor"
    //% block="CO2 Readings"
    export function read(): number
    { 
        return result
    }

}
