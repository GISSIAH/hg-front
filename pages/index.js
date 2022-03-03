import { Box, Button, Card, Container, Divider, IconButton, Paper, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import MapComponent from '../components/map'
import { CgClose } from "react-icons/cg"
import styles from '../styles/Home.module.css'
import LayerCard from '../components/layerCard'
import LayerList from '../components/layerList'
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { GrTableAdd, } from "react-icons/gr"
import { GiWireframeGlobe } from 'react-icons/gi'
import { GeoJsonLayer, TileLayer, BitmapLayer } from 'deck.gl'

const layer = new TileLayer({
  data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

  minZoom: 0,
  maxZoom: 19,
  tileSize: 256,

  renderSubLayers: props => {
    const {
      bbox: { west, south, east, north }
    } = props.tile;

    return new BitmapLayer(props, {
      data: null,
      image: props.data,
      bounds: [west, south, east, north]
    });
  }
});
export default function Home() {
  const [layerList, setLayerList] = useState([layer])
  const [id, setId] = useState(0)
  const [dataPickerOpen, setDataPickerOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '20vw', height: '95vh' }}>
            <Paper sx={{ height: '100%', py: 6, px: 2, display: 'flex', flexDirection: 'column'}}>
              <Typography variant="h1" sx={{fontSize:'1rem',fontWeight:'500',marginBottom:2 }}>Attic</Typography>
              <Divider orientation="horizontal" sx={{marginBottom:2}}/>
              <Typography variant='h4'>Layers</Typography>
              <Button sx={{ marginBottom: 2 }} variant="outlined" onClick={() => {
                setDataPickerOpen(true)
              }} >Add Layer</Button>
              <LayerList layerList={layerList} setLayerList={setLayerList} />
            </Paper>
          </div>
          <Dialog open={dataPickerOpen} maxWidth={true}>
            <DialogTitle sx={{ display: 'flex', px: 2, justifyContent: 'space-between' }}>
              Add data to the map
              <IconButton>
                <CgClose size={20} onClick={() => {
                  setDataPickerOpen(false)
                }} />
              </IconButton>

            </DialogTitle>

            <DialogContent sx={{ display: 'flex', justifyContent: "center", gap: 10 }} >

              <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 2, px: 2 }}>
                <GiWireframeGlobe size={64} />
                <Typography variant="h6">Sample Data</Typography>
                <Typography variant="subtitle1">Dont have any data? Try out our sanple data</Typography>
                <Button variant="contained">Add</Button>
              </Card >
              <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 2, px: 2 }}>
                <GrTableAdd size={64} />
                <Typography variant="h6">Add a CSV </Typography>
                <Typography variant="subtitle1">Load and analyze your own data on the map </Typography>
                <Button variant="contained" onClick={() => {
                  setId((id + 1))
                  setDataPickerOpen(false)
                  const AIR_PORTS =
                    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
                  const alayer = new GeoJsonLayer({
                    id:"airports",
                    data:AIR_PORTS,
                    filled:true,
                    pointRadiusMinPixels:2,
                    pointRadiusScale:2000,
                    getPointRadius:f => 11 - f.properties.scalerank,
                    getFillColor:[10, 100, 40, 100],
                    pickable:true,
                    autoHighlight:true,
                    getElevation: 30
                  });
                setLayerList([...layerList,alayer])
                }}>Add</Button>
            </Card >
          </DialogContent>
        </Dialog>
        <div className="my-container" style={{ height: '95vh', width: '70vw', position: 'relative' }}>
          <MapComponent layerList={layerList} />
        </div>
    </div>




      </main >


    </div >
  )
}
