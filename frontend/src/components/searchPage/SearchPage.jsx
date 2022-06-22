import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
<<<<<<< HEAD
// import Cities from '../city/City';

export default function SearchPage({ cardFilter }) {
 
  return (
  
    
    cardFilter?.map((data) =>
   
    <div className="cards">
      <Card sx={{ maxWidth: 345 }} className="card">
       
        <CardActionArea className="caja-card">
          <CardMedia 
            className="img"
=======
// import data from '../../../public/data.json'
// import City from '../city/City';

export default function SearchPage({ cardFilter }) {
  return (
    cardFilter?.map((data) =>
      <Card sx={{ maxWidth: 345 }} className="container-search">
        <CardActionArea>
          <CardMedia
>>>>>>> 83e1385d6189f53e3599af9315afcd988256b5e4
            component="img"
            height="140"
            image={data.image}
            alt={data.name}
          />
          <CardContent>
<<<<<<< HEAD
            <Typography gutterBottom variant="h5" component="div" className="card-container">
              {data.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" className="card-container">
              {data.country}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="boton-card-container">
          <LinkRouter to={`/cities/city/${data._id}`}
            key={data._id}>
            <Button size="small" className="botonMore">
=======
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
          <LinkRouter to={`/cities/city/${data._id}`}
            key={data._id}>
            <Button size="small" color="primary">
>>>>>>> 83e1385d6189f53e3599af9315afcd988256b5e4
              More
            </Button>
          </LinkRouter>
        </CardActions>
<<<<<<< HEAD
      </Card> 
      </div>
       
    )

   
  )
  
 
=======
      </Card>
    )
  )
>>>>>>> 83e1385d6189f53e3599af9315afcd988256b5e4
}
