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

    //% subcategory="Upload"
    //% weight=29
    //% blockGap=8
    //% blockId=ihmc_upload_loop
    //% block="Upload to ThingSpeak with loop|loopcount %coi|Write API key %wAKd|Field 1 %fd1||Field 2 %fd2|Field 3 %fd3|Field 4 %fd4|Field 5 %fd5|Field 6 %fd6|Field 7 %fd7|Field 8 %fd8"
    export function ctrluploadThingspeak(   
                                        coi: number,
                                        wAKd: string,
                                        fd1: number,
                                        fd2: number = null,
                                        fd3: number = null,
                                        fd4: number = null,
                                        fd5: number = null,
                                        fd6: number = null,
                                        fd7: number = null,
                                        fd8: number = null  ) 
    {
        esp8266.uploadThingspeak(wAKd,fd1,fd2,fd3,fd4,fd5,fd6,fd7,fd8)
        for (let index = 0; index <= coi; index++) 
        {
            if (!(esp8266.isThingspeakUploaded())) 
            {
                esp8266.uploadThingspeak(wAKd,fd1,fd2,fd3,fd4,fd5,fd6,fd7,fd8)
                if (index == coi) 
                {
                    control.reset()
                }
            }
        }
    }

}
