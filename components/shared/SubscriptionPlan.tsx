"use client";

import { Button } from "../ui/button";
import { initializeRazorpay } from "@/constants";
import { subscribePlan } from "@/lib/actions/plan.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SubscriptionPlan = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setIsLoading(false);
      return;
    }
    const response = await subscribePlan();
    const options = {
      key: response.key,
      subscription_id: response.data,
      name: "Suggest Solutions",
      handler: async function (r: any) {
        try {
          const handleData = await fetch(
            "https://suggestsolutions.com/api/paymentverify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                razorpay_payment_id: r.razorpay_payment_id,
                razorpay_subscription_id: r.razorpay_subscription_id,
                razorpay_signature: r.razorpay_signature,
              }),
            }
          );

          if (!handleData.ok) {
            throw new Error(
              `Server error in handler function sending response: ${handleData.statusText}`
            );
          }

          const handleResponse = await handleData.json();
          if (handleResponse?.message === "success") {
            router.push("https://suggestsolutions.com/experts");
          } else {
            router.push("https://suggestsolutions.com/payment-failed");
          }
        } catch (error) {
          console.log("handle response ", error);
        } finally {
          setIsLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
          console.log("Payment modal closed");
        },
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    
    paymentObject.on("payment.failed", function (response: any) {
      console.log(
        "Payment failed. Please try again. Contact support for help ",
        response
      );
      setIsLoading(false);
    });
  }

  return (
    <div className="flex px-4 sm:px-0">
      <div className="w-full lg:w-2/5 bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
        <div className="pt-[15px] px-[25px] pb-[25px]">
          <div className="flex justify-end">
            <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
              <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                Pro
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
              For Experts
            </p>
            <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
              ₹2,000
            </p>
          </div>

          <div>
            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
              per month
            </p>
          </div>
        </div>

        <hr />

        <div className="pt-[15px] px-[25px] pb-[25px] flex items-center justify-between">
          <div>
            <h1 className="line-through text-lg font-light">Rs. 24000 / year</h1>
            <h1 className="text-2xl font-bold text-primary">Rs. 20000 / year</h1>
          </div>
          <div className="px-4 py-2 bg-primary text-white rounded-full">
            16% OFF
          </div>
          
        </div>

        <div className="pt-[25px] px-[25px] pb-[35px]">
          <div>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Expert Tag
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Post Unlimited Content
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Increase Your Reach
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Build a global network
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Help millions with your expertise
            </p>
          </div>

          <div className="mt-[25px]">
            <Button onClick={handlePayment} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
