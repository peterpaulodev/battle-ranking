/*
  Warnings:

  - A unique constraint covering the columns `[apelido]` on the table `MC` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MC_apelido_key" ON "MC"("apelido");
