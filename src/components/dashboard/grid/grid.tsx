import { css } from "@/styled-system/css";
import GridItem from "../grid-item/grid-item";
import { EntityType } from "@/types/entities.types";

export default function EntitiesGrid({ entities }: { entities: EntityType[] }) {
  return (
    <div
      className={css({
        display: "grid", 
        gridTemplateColumns: {
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: "6",
        w: "full",
        maxW: "1200px",
        mx: "auto",
      })}
    >
      {entities.map((entity, i) => (
        <GridItem key={i} entity={entity} />
      ))}
    </div>
  );
}
