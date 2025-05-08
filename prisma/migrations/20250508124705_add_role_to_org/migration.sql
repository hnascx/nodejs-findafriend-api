-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORG', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
