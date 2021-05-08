import {format,formatDistanceToNow} from "date-fns";

export const APP_LOCAL_DATETIME_FORMAT_Z = "do MMM yy, hh:mm aaaa";

export const formatDate = (date) => {
    return format(new Date(date), APP_LOCAL_DATETIME_FORMAT_Z);
}

export const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date),{ addSuffix: true })
}
