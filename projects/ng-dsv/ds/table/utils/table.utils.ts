import { JSONObject } from "@ng-vagabond-lab/ng-dsv/api";
import { formatDate } from "@ng-vagabond-lab/ng-dsv/date";

export const initTable = (datas: JSONObject[], max: number) => {
    const links = [];
    const newDatas = [];
    for (let i = 0, length = (max > 0 ? max : datas.length); i < length; i++) {
        let data = datas?.[i];
        if (data) {
            links.push(data['id' as keyof JSONObject]);
        } else {
            data = { id: -1 * (i + 1) } as JSONObject;
            links.push(null);
        }
        newDatas.push(data);
    }

    return {
        links: links,
        datas: newDatas
    }
}

export const getValue = (obj: JSONObject, key: string, isDate: boolean): any => {
    let value: string = obj[key as keyof JSONObject];
    if (key.includes('.')) {
        const keys = key.split('.');
        let recurse: JSONObject = obj;
        keys.forEach((key2) => {
            if (recurse) {
                if (Array.isArray(recurse)) {
                    recurse = (recurse as JSONObject[])
                        .map((item) => item[key2 as keyof JSONObject])
                        .join(',') as JSONObject;
                } else {
                    recurse = recurse[key2 as keyof JSONObject];
                }
            }
        });
        value = recurse as string;
    }
    if (isDate && value) {
        value = formatDate(value);
    }
    return value;
}