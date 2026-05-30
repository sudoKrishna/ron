import { prisma } from "@repo/db";

export const getBalance= async (userId : string) => {
  const collateral = await prisma.collateral.findUnique({
    where : {
        userId,
    },
  });
  if(!collateral) {
    throw new Error("wallet not found")
  }

  return {
    available : collateral.available,
    locked : collateral.locked,
    total : collateral.available.plus(collateral.locked)
  }
}


export const deposit = async (userId : string, amount :number) => {
    if(amount <= 0 ) {
        throw new Error("invalid amount")
    }

    const collateral = await prisma.collateral.findUnique({
        where : {
            userId,
        },
    });
    if(!collateral) {
        throw new Error("wallet not found")
    }

    const updated = await prisma.collateral.update({
        where : {
            userId,
        },
        data : {
            available : {
                increment : amount
            }
        }
    });
    return updated
}

export const withdraw = async (userId : string, amount : number) => {
    if(amount <= 0) {
        throw new Error("invalid amount")
    }
    const collateral = await prisma.collateral.findUnique({
        where : {
            userId
        },
    });
    if(!collateral) {
        throw new Error("wallet not found")
    }

    if(Number(collateral.available) < amount) {
        throw new Error("insufficient funds")
    }

    const updated = await prisma.collateral.update({
        where : {
            userId,
        },
        data : {
            available : {
                decrement : amount,
            },
        },
    });

    return updated;
}