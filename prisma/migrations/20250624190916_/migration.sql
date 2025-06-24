/*
  Warnings:

  - Made the column `apelido` on table `MC` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MC" ADD COLUMN     "estado" TEXT,
ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "apelido" SET NOT NULL;
