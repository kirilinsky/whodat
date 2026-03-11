import Image from "next/image";
import { css } from "@/styled-system/css";
import { styled, HStack } from "@/styled-system/jsx";

interface TableItemProps {
  rank: number;
  username: string;
  avatar: string;
  xpProgress: number;
  isFriend: boolean;
}

export const TableItem = ({
  rank,
  username,
  avatar,
  xpProgress,
  isFriend,
}: TableItemProps) => {
  return (
    <styled.div
      display="grid"
      gridTemplateColumns="50px 60px 1fr 150px 200px 150px"
      alignItems="center"
      bg="rgba(255, 255, 255, 0.02)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      px="4"
      py="3"
      _hover={{ bg: "whiteAlpha.50" }}
      fontFamily="mono"
    >
      <styled.div fontSize="md" color="dip.gray" fontWeight="bold">
        {rank.toString().padStart(2, "0")}
      </styled.div>
      <styled.div position="relative" w="40px" h="40px">
        <Image
          src={avatar}
          alt={username}
          fill
          className={css({
            borderRadius: "sm",
            border: "1px solid",
            borderColor: isFriend ? "dip.green" : "dip.red",
            objectFit: "cover",
          })}
        />
        <styled.div
          position="absolute"
          inset="0"
          bg="repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 3px)"
          pointerEvents="none"
        />
      </styled.div>

      <styled.div pl="2">
        <styled.div
          fontSize="sm"
          fontWeight="bold"
          color="white"
          textTransform="uppercase"
        >
          {username}
        </styled.div>
      </styled.div>
      <HStack gap="3" pr="4">
        <styled.div flex="1" h="4px" bg="whiteAlpha.100" position="relative">
          <styled.div
            h="full"
            bg="dip.red"
            w={`${xpProgress * 100}%`}
            boxShadow="0 0 10px rgba(255,0,0,0.5)"
          />
        </styled.div>
        <styled.span fontSize="10px" color="dip.gray">
          {Math.round(xpProgress * 100)}%
        </styled.span>
      </HStack>

      <styled.div justifySelf="end">
        <styled.div
          px="3"
          py="1"
          fontSize="10px"
          fontWeight="bold"
          border="1px solid"
          borderRadius="sm"
          textTransform="uppercase"
          display="flex"
          alignItems="center"
          gap="1.5"
          borderColor={isFriend ? "dip.green" : "dip.red"}
          color={isFriend ? "dip.green" : "dip.red"}
          bg={isFriend ? "rgba(0, 255, 100, 0.05)" : "rgba(255, 0, 0, 0.05)"}
        >
          {isFriend ? (
            <>
              <styled.span fontSize="8px">●</styled.span> TRUSTED_NODE
            </>
          ) : (
            <>
              <styled.span fontSize="8px">○</styled.span> UNKNOWN_ENTITY
            </>
          )}
        </styled.div>
      </styled.div>
    </styled.div>
  );
};
