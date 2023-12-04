export default function createAddresStr(country = '', city = '', district = '', neighbourhood = '') {
    let addressStr = '';

        if(country){
            addressStr += `${country}`
        }

        if(city){
            if(country){
                addressStr += '/'
            }
            addressStr += `${city}`
        }

        if(district){
            if(country || city){
                addressStr += '/'
            }
            addressStr += `${district}`
        }

        if(neighbourhood){
            if(country || city || district){
                addressStr += '/'
            }
            addressStr += `${neighbourhood}`
        }

        return addressStr;
}