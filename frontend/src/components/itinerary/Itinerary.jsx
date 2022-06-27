import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import {Animated} from "react-animated-css";

function Itinerary() {

  const { id } = useParams()
  const dispatch = useDispatch()

   useEffect(() => {
    dispatch(itinerariesActions.getItinerariesByCity(id))
    dispatch(itinerariesActions.getItineraries())
   }, [id])
   
  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
  const todos = useSelector(store => store.itinerariesReducer.itineraries)

    return (
     <>
      {itineraries.map((itinerary) =>
         <div key={itinerary._id} className="itinerarios">
          <Card  css={{ w: "100%", h: "400px" }} >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} color="black" weight="bold" transform="uppercase" className='textoItinerario' >
                  {itinerary.name}
                </Text>
                <Text h3 color="black" className='textoIt'>
                  <p>Description:</p>
                  {/* {itineraries.activities} */}
                  {itinerary.description}
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }} className="bodyItineraries">
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
                <Col>
                  <Text color="black" size={14}>
                    <div><div className="icono">⌛</div>{itinerary.duration}</div>
                    <div><div className="icono">💲</div>{itinerary.price}</div>
                  </Text>
                  <Text color="black" size={12}>
                    <div><div className='icono'>💭</div>{itinerary.hashtags}</div>
                    </Text>
                  <Text color="black" size={12}>
                    <div><div className="icono">💖</div>{itinerary.likes}</div>
                  </Text>
                </Col>
              <Col>
                  <Card.Image
                        src={itinerary.image}
                        css={{ bg: "black", br: "50%" }}
                        height={50}
                        width={60}
                        alt="Name User"
                        className='img'
                      />
              </Col>
             </Row>
            </Col>
              <Col>
                <Row justify="flex-end">
                  <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase">
                      <h6>User:</h6>
                      {itinerary.nameUser}
                  </Text>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </div>
      )}
    </>
  )
}

export default Itinerary