import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import data from '../../../public/data.json'
// import City from '../city/City';

export default function SearchPage({ cardFilter }) {
  return (
    cardFilter?.map((data) =>
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
          <LinkRouter to={`/cities/city/${data._id}`}
            key={data._id}>
            <Button size="small" color="primary">
              More
            </Button>
          </LinkRouter>
        </CardActions>
      </Card>
    )
  )
}
