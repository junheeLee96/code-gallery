-- CreateTable
CREATE TABLE `Posts` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `language` VARCHAR(40) NOT NULL,
    `like` INTEGER NOT NULL DEFAULT 0,
    `comment` INTEGER NOT NULL DEFAULT 0,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mod_dt` DATETIME(3) NOT NULL,

    INDEX `Posts_uuid_idx`(`uuid`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `comment` TEXT NOT NULL,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Comment_post_id_idx`(`post_id`),
    INDEX `Comment_uuid_idx`(`uuid`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Likes_post_id_idx`(`post_id`),
    INDEX `Likes_uuid_idx`(`uuid`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_uuid_fkey` FOREIGN KEY (`uuid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_uuid_fkey` FOREIGN KEY (`uuid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_uuid_fkey` FOREIGN KEY (`uuid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
