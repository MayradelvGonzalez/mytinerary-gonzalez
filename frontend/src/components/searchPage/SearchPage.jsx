// import * as React from 'react';
// import { Link as LinkRouter } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import {  Col, Row, Text } from "@nextui-org/react";

// export default function SearchPage({ cardFilter }) {
//   return (
//     cardFilter?.map((data) =>
//       <Card sx={{ maxWidth: 345 }} className="card">
//         <CardActionArea>
//           <CardMedia

//             component="img"
//             height="140"
//             image={data.image}
//             alt={data.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div" className="card-container">
//               {data.name}
//             </Typography>
//             <Typography gutterBottom variant="h5" component="div" className="card-container">
//               {data.country}
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//         <CardActions className="boton-card-container">
//           <LinkRouter to={`/cities/city/${data._id}`}
//             key={data._id}>
//             <Button size="small" className="botonMore">
//               More
//             </Button>
//           </LinkRouter>
//         </CardActions>
//       </Card> 
     
       
//     )

   
//   )
  
 
// }
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Card } from '@nextui-org/react';
import { Col, Row, Button, Text } from "@nextui-org/react";
export default function SearchPage({cardFilter}) {
  return (
    cardFilter?.map((data) =>(

      <Card 
      css={{ w: "25%", h: "400px" }} 
      key={data._id} className="card">
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5,  bgBlur: "#ffffff66"}}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA" className="textCard">
            {data.name}
            </Text>
            <Text h3 color="black">
              {data.country}
            
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={data.image}
            width="100%"
            height="100%"
            objectFit="cover"
            alt="Card example background"
            className="imagenCard"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col cols={2}>
          
              <Text
               color="#000" size={14}>
              
              </Text>
            </Col>
          </Row>
          <Col>
              <Row justify="flex-end">
              <LinkRouter to={`/cities/city/${data._id}`}
           key={data._id}>
                <Button flat auto rounded color="secondary" className="botonMore">
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    More
                  </Text>
                  </Button>

           </LinkRouter>
                
              </Row>
            </Col>
            
        </Card.Footer>
      </Card>
    )
    )
    )
    
  
}