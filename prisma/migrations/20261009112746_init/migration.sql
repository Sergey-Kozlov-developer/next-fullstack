/*
  Warnings:

  - The values [motherBoard] on the enum `ComponentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComponentType_new" AS ENUM ('cpu', 'gpu', 'ram', 'ssd', 'motherboard', 'psu', 'case', 'cooler');
ALTER TABLE "Component" ALTER COLUMN "type" TYPE "ComponentType_new" USING ("type"::text::"ComponentType_new");
ALTER TYPE "ComponentType" RENAME TO "ComponentType_old";
ALTER TYPE "ComponentType_new" RENAME TO "ComponentType";
DROP TYPE "public"."ComponentType_old";
COMMIT;
