/*
  Warnings:

  - Made the column `city` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;
