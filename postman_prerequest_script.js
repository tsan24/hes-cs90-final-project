var months = 12
var days = 30
var hours = 24;

var arrSolarArrayIds = [
    "fl-0001", //10% speed
    "fl-0012", //10% speed
    "fl-0015", //10% speed
    "fl-0101", //50% speed
    "fl-0102", //50% speed
    "fl-1001", //100% speed
    "tx-0101", //50% speed
    "tx-0102", //50% speed
    "tx-0103", //50% speed
    "tx-1001", //100% speed
    "tx-1002", //100% speed
    "ga-0101", //50% speed
    "ga-0102", //50% speed
    "ga-0103", //50% speed
    "ga-1001", //100% speed
    "ga-1002", //100% speed
    "az-1001", //100% speed
    "az-1002", //100% speed
    "az-1003", //100% speed
    "az-1004", //100% speed
    "az-1005", //100% speed
    "az-1006", //100% speed
];

var arrData = [];

for (var m = 1; m <= months; m++) {
    for (var d = 1; d <= days; d++) {
        for (var h = 0; h <= hours; h++) {
            var randomUpperBound = Math.floor(Math.random() * arrSolarArrayIds.length);
            var randomLowerBound = Math.floor(Math.random() * arrSolarArrayIds.length) + randomUpperBound;

            for (var a = randomLowerBound; a <= randomUpperBound; a++) {
                var arrayId = arrSolarArrayIds[a];

                if (arrayId) {
                    var minutes = Math.floor(Math.random() * 59);
                    var watts = Math.floor(Math.random() * 100);
                    var seconds = Math.floor(Math.random() * 59);
                    var dateString = ["2021", pad(m), pad(d)].join("-");
                    var timeString = String([pad(h), pad(minutes), pad(seconds)].join(":")  + ".000Z");
                    var fullDateString = [dateString, timeString].join("T");
                    var region = arrayId.split('-')[0];
                    var speed = m % d !== 0 ? 100 : m === d ? 50 : 10; //random for data example

                    /**
                     * @typedef {Object} SolarData
                     * @property {Number} year
                     * @property {Number} month
                     * @property {Number} day
                     * @property {Number} hour
                     * @property {Number} minute
                     * @property {Number} second
                     * @property {Date} date
                     * @property {String} solarArrayId
                     * @property {String} region
                     * @property {Number} speed
                     * @property {Number} watts
                     */
                    var objData = {
                        "year": 2021,
                        "month": m,
                        "day": d,
                        "hour": h,
                        "minute": minutes,
                        "second": seconds,
                        "date": fullDateString,
                        "solarArrayId": arrayId,
                        "region" : region,
                        "speed" : speed,
                        "watts": watts
                    };

                    arrData.push(objData);
                }

                arrData.push(objData);
            }
        }
    }
}

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

pm.collectionVariables.set("arrSolarData", JSON.stringify(arrData));