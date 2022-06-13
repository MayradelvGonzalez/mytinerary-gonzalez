import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import data from './data.json'
import City from '../city/City';
           
function SearchPage({cardFilter}) {
    return cardFilter.map((data) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="container-search">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {data.name}
          </Typography>
        
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  )
})}

    
    

export default SearchPage
