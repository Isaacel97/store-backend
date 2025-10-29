-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (x86_64)
--
-- Host: 127.0.0.1    Database: store
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `clock_in` timestamp NULL DEFAULT NULL,
  `clock_out` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2025-10-23 09:26:55','2025-10-23 09:27:06');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,8),(2,2,0),(3,3,0);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_movements`
--

DROP TABLE IF EXISTS `inventory_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_movements` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `quantity_change` int NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `reference_id` bigint DEFAULT NULL,
  `created_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `inventory_movements_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_movements_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_movements`
--

LOCK TABLES `inventory_movements` WRITE;
/*!40000 ALTER TABLE `inventory_movements` DISABLE KEYS */;
INSERT INTO `inventory_movements` VALUES (2,1,5,'purchase',NULL,1,'2025-10-23 07:38:57'),(3,1,-2,'sale',1,1,'2025-10-23 07:52:28'),(4,1,-7,'sale',2,1,'2025-10-23 07:53:26'),(5,1,10,'purchase',NULL,1,'2025-10-23 07:55:30'),(6,1,2,'sale_revert',1,1,'2025-10-23 08:10:40');
/*!40000 ALTER TABLE `inventory_movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image_url` text,
  `price` decimal(12,2) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'by-ave1','aceite vegetal','',49.99,'alimento','active','2025-10-23 07:37:07'),(2,'abc123','pluma test',NULL,120.00,'oficina','active','2025-10-29 20:18:23'),(3,'by-ave2','aceite vegetal nutrioli',NULL,49.99,'alimento','active','2025-10-29 23:22:02');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sale_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
INSERT INTO `sale_items` VALUES (1,1,1,2,150.00),(2,2,1,7,150.00);
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seller_id` bigint DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `sale_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('completed','canceled') DEFAULT 'completed',
  PRIMARY KEY (`id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,300.00,'2025-10-23 07:52:28','canceled'),(2,1,1050.00,'2025-10-23 07:53:26','completed');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `day_of_week` tinyint DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (1,1,1,'08:00:00','16:00:00');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `role` enum('admin','seller','viewer') DEFAULT 'seller',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'charly','charly@test.com','$2b$10$RFrKhzvHredt0daXjphp4.yawdfV2nzN61A4i0Tsp8kuZhRgxy1jy','Charly Dev','admin','2025-10-23 07:08:00','2025-10-23 07:08:00'),(2,'iescobar','isaac@test.com','$2b$10$E86msSNE4QCmGtGa.oC.7eVHQOFlPrh6zNhpSRyfN0AOOXmoN49Sq','Charly Dev','admin','2025-10-23 09:24:29','2025-10-23 09:24:29'),(3,'ilopez','isaac2@test.com','$2b$10$J0YmiwgJa2hpqQoLf2eCdOBySgUiRTJ0H64BZySdHV7Paoimt2K56','Charly Dev','viewer','2025-10-23 09:25:00','2025-10-23 09:25:00'),(4,'aescobar2','isacel97@gmail.com','$2b$10$1QAPw2Je3BciJOWjbxcGbu1fi4PeF9ZBN90BIGWPY52KF2jSIVqv.','Aurea Escobar','viewer','2025-10-29 18:34:52','2025-10-29 18:34:52'),(6,'aescobar3','isacel96@gmail.com','$2b$10$TT3C/x4Zjht2s0fTZGwzKeBhzsI8gLAgo/2hmFaS/broBBz/hy8U2','Aurea Escobar','viewer','2025-10-29 19:39:35','2025-10-29 19:39:35'),(7,'aescobar4','isacel95@gmail.com','$2b$10$S0vQfGJBMQbxsdCSE5o.KOuALVgNQFdbw.iWHsaGji3U9/1U/2Lti','Aurea Escobar','viewer','2025-10-29 19:40:01','2025-10-29 19:40:01'),(8,'aescobar5','isacel94@gmail.com','$2b$10$1m3NMyDCnjebS1FkDQWw..CSbY/26tOZEdVVtom6aM1wMeJf9/qJG','Aurea Escobar','viewer','2025-10-29 19:44:57','2025-10-29 19:44:57'),(9,'aescobar6','isacel93@gmail.com','$2b$10$nYPWaNziU/a4/m1MZXOM1.2qe6ZHel.P84Ul8oc3W6iwaoXAOODSS','Aurea Escobar','viewer','2025-10-29 19:54:01','2025-10-29 19:54:01'),(10,'isacel1','isacel1@gmail.com','$2b$10$gjzXc1iD7mpRhLZSHfQ6Ne6YnjjHlqioqhTygsV8vHY7cwLLpw3GO','Aurea Escobar','viewer','2025-10-29 20:02:38','2025-10-29 20:02:38'),(11,'isacel2','isacel2@gmail.com','$2b$10$4nn4EM2WR1sF0nWu/b0gcO7G7C5uthv2jXe1grh8pQusquAqzeItO','Aurea Escobar','viewer','2025-10-29 20:03:53','2025-10-29 20:03:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-29 17:57:40
