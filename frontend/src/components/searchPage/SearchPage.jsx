import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Card } from '@nextui-org/react';
import { Col, Row, Button, Text } from "@nextui-org/react";
import {Animated} from "react-animated-css";

function SearchPage({cardFilter}) {
  return (
    cardFilter?.map((data) =>(
    <Card 
      css={{ w: "25%", h: "400px" }} 
      key={data._id} className="card">
       <Card.Header css={{ position: "absolute", zIndex: 1, top: 5,  bgBlur: "#ffffff66"}} >
        <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA" className="textCard">
          {data.country}
          </Text>
          <Animated animationIn="fadeInRight" animationOut="fadeOut" isVisible={true}><Text h3 color="black">
            {data.name}
          </Text></Animated> 
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
            transform="uppercase">
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

export default SearchPage