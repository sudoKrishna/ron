import {prisma} from "@repo/db";

export const getAssets  = async(userId : string) => {
    const assest = await prisma.asset.findMany({
        orderBy : {
            symbol : "asc"
        }
    })
    return assest
}

export const getUserBalances = async (userId: string) => {
  const balances = await prisma.userAsset.findMany({
    where: {
      userId,
    },
    include: {
      asset: true,
    },
  });

  return balances;
};

