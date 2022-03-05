import { log } from "deck.gl";
import React ,{ useState} from "react";
import LayerCard from "./layerCard";


export default function LayerList(props) {
    const [layerColor,setLayerColor] = useState([])

    console.log(layerColor);
    //props.setActiveLayerColor(layerColor.r,layerColor.g,layerColor.b,layerColor.a)
    return (
        <div>
            {
                props.layerList.map((layer, index) => {
                    console.log(layer.id);
                    return (
                        <LayerCard key={index} setColor={setLayerColor}  name={layer.id} onRemove={() => {
                            const newLayerList = props.layerList.filter(item => item.id !== layer.id);
                            props.setLayerList(newLayerList)
                        }} />
                    )
                })
            }
        </div>
    )
}
