import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "../Components/PaymentForm"

const PUBLIC_KEY = "pk_test_51OnwGpJI3CdeoOHilsPeQavfgXteayfwxgu93u7tWBqmPvpzErf3GQVBgUCwRaFR0BmKGNyTSMwA79zn5P7VxanT005ClwZ4hs"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}