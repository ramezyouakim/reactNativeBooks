
import values from '../values/mainValues';

export default function fontMake (fontSize = values.fontMeduim, fontWeight = 'normal', fontColor = values.header){
    return {
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: fontColor
    }
}