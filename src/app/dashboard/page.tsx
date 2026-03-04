import { getEntitiesByCategory } from "../actions/entities";
import {
  EntityCategory,
  EntityCategoryType,
} from "../constants/entities.constants";
import DashboardScreen from "@/screens/dashboard/dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCategory = (cat as EntityCategoryType) || EntityCategory.ANCIENT;
  const entities = await getEntitiesByCategory(activeCategory);

  return <DashboardScreen entities={entities} activeCategory={activeCategory} />;
}
