import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";


function Itinerary(){

    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(id))
    },[])
    const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
    return (

      <>
      {/* {itineraries.map((itinerary) =>  */}
      {itineraries && 
        <Card css={{ w: "100%", h: "400px" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
              {itineraries.city}
            </Text>
            <Text h3 color="white">
              {itineraries.name}
              {/* {itineraries.activities} */}
              {itineraries.description}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="" //colocar imagen
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Itinerary Background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col span={3}>
                  <Card.Image
                    src= {itineraries.image}
                    css={{ bg: "black", br: "50%" }}
                    height={40}
                    width={40}
                    alt={itineraries.nameUser}
                  />
                </Col>
                <Col>
                  <Text color="#d1d1d1" size={12}>
                   <div>⌛{itineraries.duration}</div>  
                    <div>💲{itineraries.price}</div>
                   
                  </Text>
                  <Text color="#d1d1d1" size={12}>
                    <div>💭{itineraries.hashtags}</div>
                   <div>💖{itineraries.likes}</div> 
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Get App
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      }
      </>
    )
}

export default Itinerary