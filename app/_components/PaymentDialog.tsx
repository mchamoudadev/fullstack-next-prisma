"use client"
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { API } from '@/lib/config'
import { useShoppingCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'


const localPayments = [

  {
    id: 1,
    title: "Evc Plus"
  },
  {
    id: 2,
    title: "Zaad",
  },
  {
    id: 1,
    title: "Sahal",
  }
]


const PaymentDialog = () => {

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'local' | null>(null);

  const [selectedLocalPayment, setSelectedLocalPayment] = useState(localPayments[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const router = useRouter()

  const { cartItems } = useShoppingCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('submitted');
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleStripeSession = async () => {

    try {

      const { data } = await axios.post(`${API}/user/session`, { cartItems })

      router.push(data.url)

    } catch (error) {
      console.log("error", error);
    }


  }

  return (
    <Dialog>
      <DialogTrigger>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-main-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Checkout
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="container mx-auto p-4">
          <h2 className="text-center text-3xl font-bold my-6">Choose Payment Method</h2>
          <div className="flex justify-center space-x-6 my-6">
            <div
              className={`${paymentMethod === 'online' && 'border-green-600'} p-6 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setPaymentMethod('online')}
            >
              Online Payment
            </div>
            <div
              className={`${paymentMethod === 'local' && 'border-green-600'} p-6 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setPaymentMethod('local')}
            >
              Local Payment
            </div>
          </div>

          {paymentMethod === 'local' && (
            <>
              <div className="grid grid-cols-3 gap-4 my-4">
                {
                  localPayments.map((payment) => (
                    <div
                      onClick={() => setSelectedLocalPayment(payment)}

                      className={`p-4 border rounded-lg cursor-pointer ${selectedLocalPayment.title === payment.title && 'border-green-600'}`}>{payment.title}</div>
                  ))
                }
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500"
                />
                <button type="submit" className="mt-4 px-6 py-2 bg-main-500 text-white rounded-lg hover:bg-main-600">
                  Submit
                </button>
              </form>
            </>
          )}


          {paymentMethod === 'online' && (
            <button
              onClick={handleStripeSession}

              className="mx-auto w-full flex items-center justify-center px-6 py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Pay with Stripe
              {/* Include Stripe icon here */}
            </button>
          )}


        </div>



      </DialogContent>
    </Dialog>
  )
}

export default PaymentDialog