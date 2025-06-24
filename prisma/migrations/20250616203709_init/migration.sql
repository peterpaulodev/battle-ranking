/*
  Warnings:

  - You are about to drop the column `data` on the `Batalha` table. All the data in the column will be lost.
  - You are about to drop the column `fase` on the `Batalha` table. All the data in the column will be lost.
  - You are about to drop the column `mCId` on the `Batalha` table. All the data in the column will be lost.
  - Added the required column `edicaoId` to the `Batalha` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `Pontuacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoPontuacao" AS ENUM ('CAMPEAO', 'VICE', 'SEMI', 'SEGUNDA', 'ED', 'DOIS_A_ZERO');

-- DropForeignKey
ALTER TABLE "Batalha" DROP CONSTRAINT "Batalha_mCId_fkey";

-- AlterTable
ALTER TABLE "Batalha" DROP COLUMN "data",
DROP COLUMN "fase",
DROP COLUMN "mCId",
ADD COLUMN     "edicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MC" ADD COLUMN     "apelido" TEXT,
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Pontuacao" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoPontuacao" NOT NULL;

-- CreateTable
CREATE TABLE "Organizacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edicao" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "organizacaoId" TEXT NOT NULL,

    CONSTRAINT "Edicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participacao" (
    "id" TEXT NOT NULL,
    "mcId" TEXT NOT NULL,
    "batalhaId" TEXT NOT NULL,
    "ordem" INTEGER,

    CONSTRAINT "Participacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizacao_slug_key" ON "Organizacao"("slug");

-- AddForeignKey
ALTER TABLE "Edicao" ADD CONSTRAINT "Edicao_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batalha" ADD CONSTRAINT "Batalha_edicaoId_fkey" FOREIGN KEY ("edicaoId") REFERENCES "Edicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_mcId_fkey" FOREIGN KEY ("mcId") REFERENCES "MC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_batalhaId_fkey" FOREIGN KEY ("batalhaId") REFERENCES "Batalha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
