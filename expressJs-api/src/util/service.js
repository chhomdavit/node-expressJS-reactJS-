const isEmptyOrNull = (value) => {
    if(value == null || value == "" || value == "null"){
        return true
    }
    return false
}
module.exports = isEmptyOrNull;