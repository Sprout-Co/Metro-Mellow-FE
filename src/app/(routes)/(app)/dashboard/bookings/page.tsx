import React from "react";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import BookingsMain from "./_components/BookingsMain/BookingsMain";

const BookingsPage = () => {
  return (
    <DashboardLayout>
      <BookingsMain />
    </DashboardLayout>
  );
};

export default BookingsPage;
