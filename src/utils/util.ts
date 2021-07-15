/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
export const checkPhoneNumberVietnamese = /(0)+([0-9]{9})\b/;

export function findDateLastestInField(arr: any[]) {
  let array = [];
  if (arr.length) {
    var mostRecentDate = new Date(
      Math.max.apply(
        null,
        arr.map(e => {
          return new Date(e.dateSelected);
        }),
      ),
    );
    console.log('mostRecentDate: ', mostRecentDate);
    array = arr.filter(e => {
      var d = new Date(e.dateSelected);
      return d.getTime() == mostRecentDate.getTime();
    });
  }
  return array;
}
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}

export const sortWithLatLon = (arr: any[], lat: number, lon: number) => {
  var keys = Object.entries(arr).map(([inst, key]) => key);
  var returnedBuilding = keys
    .map(item => {
      var dist = getDistance(lat, lon, item.latitude, item.longitude);
      return { ...item, distance: dist };
    })
    .sort((prevCord, thing) => prevCord.distance - thing.distance);

  return returnedBuilding;
};
