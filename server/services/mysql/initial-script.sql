- -----------------------------------------------------
-- Schema trakstart-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trakstart-db` DEFAULT CHARACTER SET utf8 ;
USE `trakstart-db` ;

-- -----------------------------------------------------
-- Table `trakstart-db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trakstart-db`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `active` BIT NOT NULL DEFAULT b'1',
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));
