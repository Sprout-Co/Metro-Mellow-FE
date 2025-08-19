import DashboardLayout from "../../_components/DashboardLayout/DashboardLayout";
import AddSubscriptionMain from "./_components/AddSubscriptionMain/AddSubscriptionMain";
import SubscriptionBuilder from "./_components/SubscriptionBuilder/SubscriptionBuilder";

export default function AddSubscriptionPage() {
  return (
    <DashboardLayout>
      {/* <AddSubscriptionMain /> */}
      <SubscriptionBuilder />
    </DashboardLayout>
  );
}
