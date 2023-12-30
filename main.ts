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
    //% blockId=ihmc_upload_thingspeak
    //% block="Upload to ThingSpeak|Write API key %wAK|Field 1 %f1||Field 2 %f2|Field 3 %f3|Field 4 %f4|Field 5 %f5|Field 6 %f6|Field 7 %f7|Field 8 %f8"
    export function altuploadThingspeak(   wAK: string,
                                        f1: number,
                                        f2: number = null,
                                        f3: number = null,
                                        f4: number = null,
                                        f5: number = null,
                                        f6: number = null,
                                        f7: number = null,
                                        f8: number = null  ) 
    {
        esp8266.uploadThingspeak(wAK,f1,f2,f3,f4,f5,f6,f7,f8)
        for (let index = 1; index <= 2; index++) 
        {
            if (!(esp8266.isThingspeakUploaded())) 
            {
                esp8266.uploadThingspeak(wAK,f1,f2,f3,f4,f5,f6,f7,f8)
            }
            basic.pause(500)
        }
        if (!(esp8266.isThingspeakUploaded())) 
        {
            control.reset()
        }
    }
    
    //% subcategory="Upload"
    //% weight=29
    //% blockGap=8
    //% blockId=ihmc_upload_loop
    //% coi.min=1 coi.max=10 coi.defl=2
    //% block="Upload to ThingSpeak (Advance)|Number of trial(s) %coi|Write API key %wAKd|Field 1 %fd1||Field 2 %fd2|Field 3 %fd3|Field 4 %fd4|Field 5 %fd5|Field 6 %fd6|Field 7 %fd7|Field 8 %fd8"
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
        for (let index = 1; index <= Math.round(coi); index++) 
        {
            if (!(esp8266.isThingspeakUploaded())) 
            {
                esp8266.uploadThingspeak(wAK,f1,f2,f3,f4,f5,f6,f7,f8)
            }
            basic.pause(500)
        }
    }

}
