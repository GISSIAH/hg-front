import { Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import { CirclePicker } from "react-color";
import { CgClose } from "react-icons/cg";

export default function LayerCard(props) {
    const [color,setColor] = useState("")
    const handleChangeComplete = (color) => {
        setColor(color.rgb);
      };
    return (
        <Card sx={{ px: 1, display: 'flex', flexDirection:'column',marginBottom:2, py:2 }} variant="outlined">
            <Container sx={{ px: 1, display: 'flex', gap: '10px', marginBottom: 2, justifyContent: 'space-between' }}>
                <Typography variant="h6">{props.name}</Typography>
                <div>
                    <CgClose onClick={props.onRemove} />
                </div>
            </Container>
            <div>
                {(props.name !== "TileLayer") ? <CirclePicker onChangeComplete={handleChangeComplete}/> : <></>}
            </div>
        </Card>
    )
}
