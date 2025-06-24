-- CreateTable
CREATE TABLE "MC" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "MC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batalha" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fase" TEXT NOT NULL,
    "campeaoId" TEXT NOT NULL,
    "viceId" TEXT,
    "mCId" TEXT,

    CONSTRAINT "Batalha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pontuacao" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "pontos" INTEGER NOT NULL,
    "mcId" TEXT NOT NULL,
    "batalhaId" TEXT NOT NULL,

    CONSTRAINT "Pontuacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Batalha" ADD CONSTRAINT "Batalha_campeaoId_fkey" FOREIGN KEY ("campeaoId") REFERENCES "MC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batalha" ADD CONSTRAINT "Batalha_viceId_fkey" FOREIGN KEY ("viceId") REFERENCES "MC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batalha" ADD CONSTRAINT "Batalha_mCId_fkey" FOREIGN KEY ("mCId") REFERENCES "MC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pontuacao" ADD CONSTRAINT "Pontuacao_mcId_fkey" FOREIGN KEY ("mcId") REFERENCES "MC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pontuacao" ADD CONSTRAINT "Pontuacao_batalhaId_fkey" FOREIGN KEY ("batalhaId") REFERENCES "Batalha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
