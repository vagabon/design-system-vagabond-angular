export const removeDuplicate = <U>(datas: U[] = [], name: string = 'id'): U[] => {
    return datas.filter(
        (item, index, self) => index === self.findIndex((t) => t[name as keyof U] === item[name as keyof U])
    );
};