export const isBoxFilled = (x, o) => {
    return (
        (x.length === 5 && o.length === 4) || (x.length === 4 && o.length === 5)
    );
}