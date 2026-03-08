import { UserType } from "@/types/user.types";
import { getEntitiesByCategory } from "../actions/entity";
import { getProfileData } from "../actions/profile";
import {
  EntityCategory,
  EntityCategoryType,
} from "../constants/entity.constants";
import DashboardScreen from "@/screens/dashboard/dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const { user } = await getProfileData();

  const categoryId = cat ? parseInt(cat, 10) : EntityCategory.ANCIENT;

  const isValidCategory = Object.values(EntityCategory).includes(
    categoryId as EntityCategoryType,
  );

  const activeCategory = isValidCategory
    ? (categoryId as EntityCategoryType)
    : EntityCategory.ANCIENT;

  const entities = await getEntitiesByCategory(activeCategory);

  return (
    <DashboardScreen
      user={user as UserType}
      entities={entities}
      activeCategory={activeCategory}
    />
  );
}
