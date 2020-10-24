import {format,formatDistanceToNow} from "date-fns";

export const formatDate = (date) => {
    return format(new Date(date), "do MMM yy, hh:mm aaaa");
}

export const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date),{ addSuffix: true })
}
