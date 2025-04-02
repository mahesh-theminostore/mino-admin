import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VendorsList from "@/components/vendors/vendors-list";

export const metadata: Metadata = {
  title: "Vendors | List",
  description:
    "Vendors List",
};

export default function Vendors() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Vendors List"  />
      <div>
        <VendorsList />
      </div>
    </div>
  )
}