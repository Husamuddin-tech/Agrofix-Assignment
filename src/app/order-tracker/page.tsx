import dynamic from "next/dynamic";

const OrderTracker = dynamic(() => import("@/app/components/OrderTracker"), {
  ssr: false,
});

export default function OrderTrackerPage() {
  return <OrderTracker />;
}
