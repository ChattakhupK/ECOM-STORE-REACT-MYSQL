import moment from "moment/min/moment-with-locales"

export const dateFormatTh = (date) => {
    return moment(date).locale('th').format('LL')
}

export const dateFormat = (date) => {
    return moment(date).format('LL')
}