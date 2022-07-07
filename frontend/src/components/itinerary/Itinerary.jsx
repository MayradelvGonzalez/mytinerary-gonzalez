import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useEffect } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions';
import { Card, Col, Row, Button, Text, Collapse } from "@nextui-org/react";
import { Animated } from "react-animated-css";
import Description from './Description';


function Itinerary() {

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesByCity(id))
    dispatch(itinerariesActions.getItineraries())
  }, [id])

  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)

  return (
    <>
      {itineraries?.map(itinerary =>
        <div key={itinerary._id} className="itinerarios" >
          <Col>
            <Text color="black" size={14}>
              <div className="contenedorIconos">
                <Col>
                  <Row justify="flex-end">

                    <Text

                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      className="user"
                     
                      transform="uppercase">
                      User:
                      {itinerary.nameUser}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Card.Image
                    src={itinerary.image}
                    css={{ bg: "black", br: "50%" }}
                    height={50}
                    width={70}
                    alt="Name User"
                    className='img'
                  />
                </Col>
                <div className="icono">Duration⌛:{itinerary.duration}</div>
                <div className="icono">Price💲:{itinerary.price}</div>
              </div>
            </Text>
            <Text color="black" size={14}>
              <div className="contenedorIconos"><div className='icono'>Hashtags💭:{itinerary.hashtags}</div></div>
            </Text>
            <Text color="black" size={14}>
              <div className="contenedorIconos"><div className="icono">Likes💖:{itinerary.likes}</div></div>
            </Text>
          </Col>


          <Collapse.Group>
            <Collapse title={itinerary.name} subtitle={itinerary.description}>
              <Card css={{ w: "100%", h: "400px", paddingBottom: "0.5em" }} >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 3 }}>
                  <Col>
                    <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>

                    </Text>

                    <Text h3 color="black" className='textoIt'>
                      {/* <p>Description:</p> */}

                      {/* {itinerary.description} */}
                      {/* {itineraries.activities} */}
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
                    paddingTop: "0.8em",
                  }}
                >
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          {itinerary.activities?.map(act =>

                            <>

                              <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>
                                {act.names}
                              </Text>
                          
                              <Col>
                              <Card.Image
                                src={act.image}
                                css={{ bg: "black", br: "50%" }}
                                height={100}
                                width={100}
                              /></Col>
                            </>

                          )



                          }



                        </Col>
                      </Row>
                    </Col>


                  </Row>
                </Card.Footer>

              </Card>

            </Collapse>
          </Collapse.Group>
        </div>
      )
      }
    </>



  );

}

export default Itinerary