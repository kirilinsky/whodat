import { EntityCategory } from "../constants/entities.constants";
import DashboardScreen from "@/screens/dashboard/dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCategory = cat || EntityCategory.ANCIENT;

  return <DashboardScreen activeCategory={activeCategory} />;
}
