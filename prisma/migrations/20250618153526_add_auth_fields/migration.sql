/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Organizacao` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organizacao" ADD COLUMN     "email" TEXT,
ADD COLUMN     "senhaHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organizacao_email_key" ON "Organizacao"("email");
