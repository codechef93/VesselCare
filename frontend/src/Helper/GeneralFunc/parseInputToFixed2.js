export const parseInputToFixed2 = (input) => {

    if (input === undefined || input === 'NaN' || input === '') {
        return 0 
    } else {
        input = parseFloat(input)
    }
    return input.toFixed(2)
}
export const parseInputwLeadzero4 = (input) => {
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    if (input === undefined || input === 'NaN' || input === '') {
        return zeroPad(0, 4)
    } else {
        input = parseInt(input)
    }
    return zeroPad(input, 4)
}
export const getColorCode = (index)=>{

    const colorArray = ["#00ffff", "#ff9f0f", "#92c0d1", "#8884d8", "#82ca9d", "#ff0000","#5198b3","#045b7b","#034057"];
    const randomColorCode = colorArray[index];
    return randomColorCode
}
  