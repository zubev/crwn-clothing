import { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux/es/exports";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartPrice } from "../../store/cart/cart.selector";
import { useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement =>  card !== null;

const PaymetForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const totalCartPrice = useSelector(selectCartPrice);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalCartPrice * 100 }),
    }).then((res) => res.json());


    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement)

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false)
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Paymet successful");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Cart Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          {" "}
          Pay now{" "}
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymetForm;
