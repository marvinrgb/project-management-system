-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'default',
    "text" TEXT NOT NULL DEFAULT 'default',
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "length" INTEGER NOT NULL DEFAULT 0,
    "genre" TEXT NOT NULL DEFAULT 'default',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "releaseDate" TEXT NOT NULL DEFAULT '0',
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Track_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("createdAt", "description", "explicit", "genre", "id", "length", "name", "projectId", "releaseDate", "status", "text") SELECT "createdAt", "description", "explicit", "genre", "id", "length", "name", "projectId", "releaseDate", "status", "text" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genres" TEXT NOT NULL DEFAULT 'default',
    "description" TEXT NOT NULL DEFAULT 'default',
    "length" INTEGER NOT NULL DEFAULT 0,
    "releaseDate" TEXT NOT NULL DEFAULT '0',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("createdAt", "description", "genres", "id", "length", "name", "releaseDate") SELECT "createdAt", "description", "genres", "id", "length", "name", "releaseDate" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
