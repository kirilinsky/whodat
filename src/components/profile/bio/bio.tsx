"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";
import Image from "next/image";
import { UserType } from "@/types/user.types";
import { useUser } from "@clerk/nextjs";
import { getRankLabel } from "@/services/get-rank-label";
import { RANK_ICONS } from "@/app/constants/user.constants";
import { t } from "@/services/get-translation";
import { Locale } from "@/services/get-server-locale";

interface BioProps {
  user: UserType;
  locale: Locale;
}

export default function Bio({ user, locale }: BioProps) {
  const { user: clerkUser } = useUser();

  const containerStyle = css({
    bg: "rgba(20, 20, 20, 0.8)",
    border: "1px solid",
    borderColor: "white/10",
    borderRadius: "xl",
    p: "6",
    position: "relative",
    overflow: "hidden",
  });

  const labelStyle = css({
    fontSize: "10px",
    color: "dip.gray",
    textTransform: "uppercase",
    letterSpacing: "widest",
  });

  const Icon = RANK_ICONS[user.rank];

  return (
    <div className={stack({ gap: "8", w: "full" })}>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={containerStyle}
      >
        <div className={stack({ gap: "6" })}>
          <div
            className={css({
              w: "200px",
              h: "200px",
              border: "2px solid",
              borderColor: "dip.blue/30",
              borderRadius: "lg",
              overflow: "hidden",
              mx: "auto",
              mt: 2,
              position: "relative",
              boxShadow: "0 0 20px rgba(0, 150, 255, 0.1)",
            })}
          >
            <Image
              src={clerkUser?.imageUrl ?? "/default.png"}
              alt="Agent Avatar"
              fill
              className={css({
                objectFit: "cover",
                filter: "grayscale(100%) contrast(120%)",
              })}
            />
          </div>

          <div className={stack({ gap: "4" })}>
            <h2
              className={css({
                fontSize: "3xl",
                fontWeight: "bold",
                color: "dip.green",
                textTransform: "uppercase",
                fontFamily: "mono",
                textAlign: "center",
              })}
            >
              {clerkUser?.fullName || t("bio.subject_unknown", locale)}
            </h2>

            <div className={stack({ gap: "1", mt: "3" })}>
              <div className={flex({ align: "center", gap: "3" })}>
                <span className={labelStyle}>
                  {t("bio.status_label", locale)}:
                </span>
                <span
                  className={css({
                    fontSize: "xs",
                    color: "dip.green",
                    fontWeight: "bold",
                  })}
                >
                  {t("bio.status_active", locale)}
                </span>
              </div>

              <div className={flex({ align: "center", gap: "3", mt: "3" })}>
                <span className={labelStyle}>
                  {t("bio.location_label", locale)}:
                </span>
                <span
                  className={css({
                    fontSize: "xs",
                    color: "dip.red",
                    textTransform: "uppercase",
                  })}
                >
                  {t("bio.location_classified", locale)}
                </span>
              </div>

              <div className={flex({ align: "center", gap: "3", mt: "3" })}>
                <span className={labelStyle}>
                  {t("bio.rank_label", locale)}:
                </span>
                <div
                  className={css({
                    fontSize: "xs",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                  })}
                >
                  {getRankLabel(user.rank, locale)}
                  {Icon && (
                    <Icon
                      size={17}
                      strokeWidth={1.5}
                      className={css({ color: "dip.blue" })}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
