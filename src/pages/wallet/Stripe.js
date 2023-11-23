import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Block } from '../../components/Component';
import Head from '../../layout/head/Head';
import Content from '../../layout/content/Content';
import { Col, Row } from 'reactstrap';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51LKbzWSHVsWuQ44k4buiylBq6GXN0n3tJEIl6WgDIOmLLhzAJ9EmJtzruGGRSVEqFY1iAzo8en02LpY9JqUoR35400yYmvumnQ');

const Stripe = () => {
    return (
        <React.Fragment>
            
        <Head title="My Wallet" />
        <Content page="component">
        <Block size="lg">
            <Row className="gy-4">
                <Col sm="8">
                  <Elements stripe={stripePromise}>
                      <CheckoutForm />
                  </Elements>
                </Col>
            </Row>
        </Block>
        </Content>
        </React.Fragment>
      )
    };

export default Stripe;
