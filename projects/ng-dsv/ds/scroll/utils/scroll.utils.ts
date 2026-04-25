export const scrollOnClassTo = (scrollClass: string, x: number = 0, y: number = 0, index?: number) => {
    const scrolls = document.getElementsByClassName(scrollClass);
    if (index) {
        scrolls[index]?.scrollTo(x, y);
    } else {
        Array.from(scrolls).forEach((scroll) => {
            scroll?.scrollTo(x, y);
        });
    }
};
