import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    console.log("payload", payload);

    if (payload.error) {
      setMessage(payload.error.message);
      console.log("error");
      toast.error(payload.error.message, {
        position: "bottom-left",
        autoClose: 1500,
      });
    } else if (payload.paymentIntent.status === "succeeded") {
      console.log("Ready to SaveOrder");
      //create Order
      saveOrder(token, payload)
        .then((res) => {
          console.log(res);
          clearCart();
          toast.success("Payment Success!!", {
            position: "bottom-left",
            autoClose: 1500,
          });
          navigate("/user/history");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("something wrong!!!");
      toast.success("Payment Error!!");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="mt-20 my-auto">
      <h1 className="text-center font-bold text-2xl mb-6">
        Please make the payment within 24 hours.
      </h1>
      <form
        className="space-y-4 w-96 mx-auto h-full"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
