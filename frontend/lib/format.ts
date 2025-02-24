export const formatPrice = ( price: number) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
    }).format(price);
};
export const formatPriceOutPut = ( price: number) => {
    return new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 3,
    }).format(price);
};
export const formatType = (type: string) => {
    return type === "house"
        ? "Дом"
        : type === "apartment"
          ? "Квартира"
          : "Апартаменты";
};
export const formatStatus = (status: string) => {
    return status === "for-rent"
        ? "Сдается в аренду"
        : status === "for-sale"
          ? "Продается"
          : "Продано";
};
