const request = require('request')

const forecast = (latitude, langtitude, callback) => {
    const url = `https://api.darksky.net/forecast/e0524b9608aae95917aad5c02effb084/${latitude},${langtitude}?units=si`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try again!', undefined)
        } else {
            const temperature = body.currently.apparentTemperature
            const precipProbability = body.currently.precipProbability
            const temepratureHigh = body.daily.data[0].apparentTemperatureHigh
            const temperatureLow = body.daily.data[0].apparentTemperatureLow
    
            callback(undefined, `
            ${body.daily.data[0].summary} It is currently ${temperature} °C out. There is a ${precipProbability}% chance of rain.
            The current temperature high will be ${temepratureHigh} °C and the low ${temperatureLow} °C.`)
        }
    })
}

module.exports = forecast