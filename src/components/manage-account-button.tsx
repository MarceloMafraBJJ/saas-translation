"use client";

import { generatePortalLink } from "@/actions/generate-portal-link";

const ManageAccountButton = () => {
  return (
    <form action={generatePortalLink}>
      <button type="submit">Menage Billing</button>
    </form>
  );
};

export default ManageAccountButton;
