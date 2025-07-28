-- CreateTable
CREATE TABLE `Entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('Movie', 'TV_Show') NOT NULL,
    `director` VARCHAR(255) NOT NULL,
    `budget` VARCHAR(100) NULL,
    `location` VARCHAR(255) NULL,
    `duration` VARCHAR(100) NULL,
    `releaseYear` INTEGER NOT NULL,
    `endTime` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
