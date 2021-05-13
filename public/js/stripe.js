/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert';

const stripe = Stripe('pk_test_jgyXYo6twj9ESMWRBB3xDf5Z');

export const bookTour = async (tourId) => {
  try {
    // get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }

};
