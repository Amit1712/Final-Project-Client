import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Thankyou() {
  return (
    <Container fluid>
      <Row>
        <h2 className="p-5 m-auto mt-5">Thank you for reaching out!</h2>
      </Row>
      <Row>
        <p className="p-3 m-auto mb-L">
          We want to thank you for sending us your concerns and we will reach
          out to you shortly!
        </p>
      </Row>
    </Container>
  );
}

function ContactPage() {
  const [isSubmitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setSubmitted(true);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/contact`, data);
  };

  return (
    <div>
      {isSubmitted ? (
        <Thankyou />
      ) : (
        <Container fluid>
          <Row>
            <div className="m-auto p-3 text-center">
              <h2>Contact Us</h2>
              <p>We would love to hear from you...</p>
            </div>
          </Row>
          <Row className="mb-5">
            <Col lg={12} className="p-3">
              <Form
                className="form"
                id="contactForm"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Form.Row>
                  <Form.Group className="mb-2 p-3">
                    <Form.Label htmlFor="Fname">First Name</Form.Label>
                    <Form.Control
                      ref={register}
                      type="text"
                      name="Fname"
                      id="Fname"
                      placeholder="Enter your first name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2 p-3">
                    <Form.Label htmlFor="Lname">Last Name</Form.Label>
                    <Form.Control
                      ref={register}
                      type="text"
                      name="Lname"
                      id="Lname"
                      placeholder="Enter your last name"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="mb-2 p-3">
                    <Form.Label htmlFor="to">Email</Form.Label>
                    <Form.Control
                      ref={register({ required: true })}
                      type="email"
                      name="to"
                      id="to"
                      placeholder="Enter your email address"
                    />
                    {errors.to && (
                      <span className="invalid-feedback d-block ml-2">
                        This field is required
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2 p-3">
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control
                      ref={register}
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group className="mb-2 p-3">
                  <Form.Label htmlFor="subject">Subject</Form.Label>
                  <Form.Control
                    ref={register({ required: true })}
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter a title"
                  />
                  {errors.subject && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 p-3">
                  <Form.Label htmlFor="text">Message</Form.Label>
                  <Form.Control
                    ref={register({ required: true })}
                    rows="5"
                    as="textarea"
                    name="text"
                    id="text"
                    placeholder="Enter your message here"
                  />
                  {errors.text && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Form.Group>
                <Button className="d-flex center" variant="dark" type="submit">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ContactPage;
