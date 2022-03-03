import LayerCard from "./layerCard";


export default function LayerList(props) {
    return (
        <div>
            {
                props.layerList.map((layer, index) => {
                    console.log(layer.id);
                    return (
                        <LayerCard key={index} name={layer.id} onRemove={() => {
                            const newLayerList = props.layerList.filter(item => item.id !== layer.id);
                            props.setLayerList(newLayerList)
                        }} />
                    )
                })
            }
        </div>
    )
}
