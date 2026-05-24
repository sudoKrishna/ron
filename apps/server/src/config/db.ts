import {PrismaPg} from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({connectionString});

const primsa = new PrismaClient({ adapter});

export {primsa};
