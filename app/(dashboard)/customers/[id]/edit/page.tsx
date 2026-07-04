import { getCustomer } from "@/lib/customers";
import CustomerForm from "../../components/CustomerForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: PageProps) {
  const { id } = await params;

  const customer = await getCustomer(id);

  return (
    <CustomerForm
      mode="edit"
      initialData={customer}
    />
  );
}