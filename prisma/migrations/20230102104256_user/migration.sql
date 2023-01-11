-- AlterTable
ALTER TABLE `Project` ADD COLUMN `user` VARCHAR(191) NOT NULL DEFAULT 'adminmarv';

-- AlterTable
ALTER TABLE `Track` ADD COLUMN `user` VARCHAR(191) NOT NULL DEFAULT 'adminmarv';
