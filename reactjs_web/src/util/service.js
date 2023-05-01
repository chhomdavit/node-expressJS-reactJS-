import dayjs from "dayjs"

export const Config = {
    pagination : 5,
    imagePath : "http://localhost/image_path/"
}

export const isEmptyOrNull = (value) => {
    if(value === "" || value == null || value === 'null' || value === undefined){
        return true;
    }
    return false;
}

export const formatDateForClient = (date) => {
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("DD/MM/YYYY")
    }
    return null
}