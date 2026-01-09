-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pin_code` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `selected` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKda8tuywtf0gb6sedwk7la1pgi` (`user_id`),
  CONSTRAINT `FKda8tuywtf0gb6sedwk7la1pgi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(52,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(152,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(202,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(203,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(252,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(302,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(402,'123 Le Loi Street','Ho Chi Minh City','District 1','0905123456','Warehouse','700000','Ward 1',NULL,_binary '\0'),(452,'Nguyễn Hữu Thọ, Tân Phong','Ho Chi Minh','TDTU','0123456789','Khoi Nguyen','700000','Tan Phong',NULL,_binary '\0'),(502,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456999','Nguyen Duong','700000','Tan Hung',1,_binary '\0'),(552,'Nguyễn Hữu Thọ, Tân Phong','Ho Chi Minh','TDTU','0686868686','Duong Ngoc Khoi Nguyen','700000','Tan Phong',1,_binary ''),(602,'Nguyễn Hữu Thọ, Tân Phong','Ho Chi Minh City','Hi','0896875093','Khoi Nguyen','700000','Tan Phong',1,_binary '\0'),(652,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(653,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(654,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(655,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(656,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(657,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(658,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(659,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(660,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(661,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(662,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','hihihi','700000','Tan Hung',NULL,_binary '\0'),(702,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456777','lala','700000','Tan Hung',NULL,_binary '\0'),(703,'19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City','Ho Chi Minh City','TDTU','0123456789','huhuhu','700000','Tan Hung',NULL,_binary '\0'),(752,'123, XYZ','Ho Chi Minh','TDTU','0123456789','Duong Ngoc Khoi Nguyen','700000','Ong Lanh',202,_binary '');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address_seq`
--

DROP TABLE IF EXISTS `address_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_seq`
--

LOCK TABLES `address_seq` WRITE;
/*!40000 ALTER TABLE `address_seq` DISABLE KEYS */;
INSERT INTO `address_seq` VALUES (851);
/*!40000 ALTER TABLE `address_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL,
  `coupon_code` varchar(255) DEFAULT NULL,
  `discount` int NOT NULL,
  `total_item` int NOT NULL,
  `total_mrp_price` int NOT NULL,
  `total_selling_price` double NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9emlp6m95v5er2bcqkjsw48he` (`user_id`),
  CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,NULL,25,2,40,30,1),(52,NULL,0,0,0,0,52),(102,NULL,0,0,0,0,102),(152,NULL,4,1,300,286,152),(202,NULL,4,2,2300,2186,202);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL,
  `mrp_price` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `selling_price` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (102,300,1,286,'Free',152,152,102),(154,50,2,40,'Free',152,152,52);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_seq`
--

DROP TABLE IF EXISTS `cart_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_seq`
--

LOCK TABLES `cart_item_seq` WRITE;
/*!40000 ALTER TABLE `cart_item_seq` DISABLE KEYS */;
INSERT INTO `cart_item_seq` VALUES (1251);
/*!40000 ALTER TABLE `cart_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_seq`
--

DROP TABLE IF EXISTS `cart_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_seq`
--

LOCK TABLES `cart_seq` WRITE;
/*!40000 ALTER TABLE `cart_seq` DISABLE KEYS */;
INSERT INTO `cart_seq` VALUES (301);
/*!40000 ALTER TABLE `cart_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `level` int NOT NULL,
  `parent_category_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKop35ifsyq39mxtmfs1asvbltv` (`category_id`),
  KEY `FKs2ride9gvilxy2tcuv7witnxc` (`parent_category_id`),
  CONSTRAINT `FKs2ride9gvilxy2tcuv7witnxc` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'hi',1,NULL,NULL),(103,'Fashion',1,NULL,NULL),(402,'Men',2,103,NULL),(403,'T-Shirt',3,402,NULL),(452,'women',1,NULL,NULL),(453,'women_accessories',2,452,NULL),(454,'women_accessories_bags',3,453,NULL),(502,'women_jewellery',2,452,NULL),(503,'women_jewellery_necklaces',3,502,NULL),(552,'men_topwear',2,402,NULL),(553,'men_t_shirts',3,552,NULL),(602,'electronics',1,NULL,NULL),(603,'electronics_laptops',2,602,NULL),(604,'electronics_laptops_business',3,603,NULL),(605,'men_bottomwear',2,402,NULL),(606,'men_jeans',3,605,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_seq`
--

DROP TABLE IF EXISTS `category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (701);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `id` bigint NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `discount_percentage` double NOT NULL,
  `is_active` bit(1) NOT NULL,
  `minimum_order_value` double NOT NULL,
  `validity_end_date` date DEFAULT NULL,
  `validity_start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES (52,'P02',10,_binary '',50,'2025-10-24','2025-10-21'),(53,'P03',20,_binary '',200,'2025-10-26','2025-10-21'),(102,'P04',15,_binary '',30,'2025-10-24','2025-10-22'),(152,'P05',10,_binary '',40,'2025-11-04','2025-10-27'),(153,'P06',10,_binary '',30,'2025-10-29','2025-10-28'),(202,'P07',10,_binary '',20,'2025-10-27','2025-10-26'),(203,'P08',10,_binary '',20,'2025-10-30','2025-10-23'),(204,'P09',10,_binary '',20,'2025-10-30','2025-10-24'),(252,'P10',10,_binary '',30,'2025-10-30','2025-10-24');
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_seq`
--

DROP TABLE IF EXISTS `coupon_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_seq`
--

LOCK TABLES `coupon_seq` WRITE;
/*!40000 ALTER TABLE `coupon_seq` DISABLE KEYS */;
INSERT INTO `coupon_seq` VALUES (351);
/*!40000 ALTER TABLE `coupon_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal`
--

DROP TABLE IF EXISTS `deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal` (
  `id` bigint NOT NULL,
  `discount` int DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4mvlrtylin5pjn8y52o23b5io` (`category_id`),
  CONSTRAINT `FK14u5urp9o5t1vwhvk47npo005` FOREIGN KEY (`category_id`) REFERENCES `home_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal`
--

LOCK TABLES `deal` WRITE;
/*!40000 ALTER TABLE `deal` DISABLE KEYS */;
INSERT INTO `deal` VALUES (2,15,32),(3,10,33),(4,10,35),(5,10,34),(6,10,36),(7,10,37),(8,10,38),(52,13,1);
/*!40000 ALTER TABLE `deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_seq`
--

DROP TABLE IF EXISTS `deal_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_seq`
--

LOCK TABLES `deal_seq` WRITE;
/*!40000 ALTER TABLE `deal_seq` DISABLE KEYS */;
INSERT INTO `deal_seq` VALUES (151);
/*!40000 ALTER TABLE `deal_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_category`
--

DROP TABLE IF EXISTS `home_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_category` (
  `id` bigint NOT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `section` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `home_category_chk_1` CHECK ((`section` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_category`
--

LOCK TABLES `home_category` WRITE;
/*!40000 ALTER TABLE `home_category` DISABLE KEYS */;
INSERT INTO `home_category` VALUES (1,'gaming_laptops','http://res.cloudinary.com/direwpt4c/image/upload/v1761151580/laptop_nysqwe.jpg','Gaming Laptops',0),(2,'office_laptops','http://res.cloudinary.com/direwpt4c/image/upload/v1761929031/laptops_oliqzz.png','Gaming Laptops',0),(3,'smart_phones','http://res.cloudinary.com/direwpt4c/image/upload/v1761977280/smp_qwauib.png','Mobiles',0),(4,'mobiles','http://res.cloudinary.com/direwpt4c/image/upload/v1761969751/mobile_csvvzl.png','Mobiles',0),(5,'smart_watches','http://res.cloudinary.com/direwpt4c/image/upload/v1761929145/smartwatch_x7oirj.png','Smart Watches',0),(6,'watches','http://res.cloudinary.com/direwpt4c/image/upload/v1761977315/watch_y52kkb.png','Smart Watches',0),(7,'headphones','http://res.cloudinary.com/direwpt4c/image/upload/v1761929185/headphones_s2qqqo.png','Headphones',0),(8,'headphones','http://res.cloudinary.com/direwpt4c/image/upload/v1761969684/headphones_kk1qrt.png','Headphones',0),(9,'tablets','http://res.cloudinary.com/direwpt4c/image/upload/v1761969709/tablet_e1yxor.png','Tablets',0),(10,'tablets','http://res.cloudinary.com/direwpt4c/image/upload/v1761929235/tablet_ryyji8.png','Tablets',0),(11,'laptops_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761798795/laptop_akoyue.jpg','Laptops Grid',1),(12,'mobiles_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928136/mobile_bdu68g.png','Laptops Grid',1),(13,'laptops_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928202/laptops_lxgggw.png','Mobiles Grid',1),(14,'furniture_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928438/furniture_csw9mq.png','Mobiles Grid',1),(15,'fashion_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928301/fashions_dvdky0.png','Fashion Grid',1),(16,'fashion_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928625/fs2_sq0u6p.png','Fashion Grid',1),(17,'electronics_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928736/elec_pwelcx.png','Electronics Grid',1),(18,'electronics_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928557/electronics_o5oajm.png','Electronics Grid',1),(19,'appliances_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928794/appliance2_rb3xqe.png','Appliances Grid',1),(20,'appliances_grid','http://res.cloudinary.com/direwpt4c/image/upload/v1761928495/appliance_lrjlug.png','Appliances Grid',1),(21,'jewelry','http://res.cloudinary.com/direwpt4c/image/upload/v1761151275/jw1_g0zhjx.jpg','Men\'s Clothing',2),(22,'men_jackets','http://res.cloudinary.com/direwpt4c/image/upload/v1761969841/Puffer_Jacket_tr1r0s.png','Men\'s Clothing',2),(23,'men_t_shirts','http://res.cloudinary.com/direwpt4c/image/upload/v1761970618/t-shirt_wm75pj.png','Women\'s Clothing',2),(24,'women_topwear_tops','http://res.cloudinary.com/direwpt4c/image/upload/v1761970544/women_top_ho2yyz.png','Women\'s Clothing',2),(25,'furniture_decor_rugs','http://res.cloudinary.com/direwpt4c/image/upload/v1761970425/rugs_in5vs5.png','Kids Clothing',2),(26,'kids_clothing','http://res.cloudinary.com/direwpt4c/image/upload/v1761970201/kids-clothing_gvygnd.png','Kids Clothing',2),(27,'footwear','http://res.cloudinary.com/direwpt4c/image/upload/v1761970689/footwear_r8l4kk.png','Footwear',2),(28,'footwear','http://res.cloudinary.com/direwpt4c/image/upload/v1761970724/footwear2_d7xzap.png','Footwear',2),(29,'accessories','http://res.cloudinary.com/direwpt4c/image/upload/v1761970819/accessories2_hymiwu.png','Accessories',2),(30,'accessories','http://res.cloudinary.com/direwpt4c/image/upload/v1761969952/accessories_gralb0.png','Accessories',2),(31,'daily_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761971188/cl_oarsj4.png','Daily Deals',3),(32,'daily_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761971664/el43_twx3xe.jpg','Daily Deals',3),(33,'fashion_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761971751/cap_r7qape.png','Fashion Deals',3),(34,'fashion_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761971910/makeup_tpboxg.png','Fashion Deals',3),(35,'electronics_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761971320/phone_zzlqpq.png','Electronics Deals',3),(36,'electronics_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761972171/electronics3_gdnnom.png','Electronics Deals',3),(37,'appliances_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761972014/app_ja5rk7.png','Appliances Deals',3),(38,'appliances_deals','http://res.cloudinary.com/direwpt4c/image/upload/v1761972075/appliance_s4gq9e.png','Appliances Deals',3);
/*!40000 ALTER TABLE `home_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_category_seq`
--

DROP TABLE IF EXISTS `home_category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_category_seq`
--

LOCK TABLES `home_category_seq` WRITE;
/*!40000 ALTER TABLE `home_category_seq` DISABLE KEYS */;
INSERT INTO `home_category_seq` VALUES (101);
/*!40000 ALTER TABLE `home_category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL,
  `deliver_date` datetime(6) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `order_status` tinyint DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_link_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_link_reference_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_link_status` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `payment_status` tinyint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `total_item` int NOT NULL,
  `total_mrp_price` double NOT NULL,
  `total_selling_price` int DEFAULT NULL,
  `shipping_address_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5w1hq48lwcqxmh1bvkdcpr4yh` (`shipping_address_id`),
  KEY `FKcpl0mjoeqhxvgeeeq5piwpd3i` (`user_id`),
  CONSTRAINT `FK5w1hq48lwcqxmh1bvkdcpr4yh` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKcpl0mjoeqhxvgeeeq5piwpd3i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `order_chk_1` CHECK ((`order_status` between 0 and 5)),
  CONSTRAINT `order_chk_2` CHECK ((`status` between 0 and 3)),
  CONSTRAINT `order_chk_3` CHECK ((`payment_status` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2025-09-19 21:02:29.843011',NULL,'2025-09-12 21:02:29.843011',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,4,600000,600000,452,1),(2,'2025-10-09 22:15:33.152914',NULL,'2025-10-02 22:15:33.152914',NULL,4,NULL,NULL,NULL,NULL,NULL,0,0,252,2,50,40,502,1),(3,'2025-10-09 22:16:16.388654',NULL,'2025-10-02 22:16:16.388654',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,2,50,40,502,1),(52,'2025-10-09 22:33:17.271785',NULL,'2025-10-02 22:33:17.271785',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,502,1),(102,'2025-10-22 13:13:52.147173',NULL,'2025-10-15 13:13:52.147173',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,300,286,502,1),(152,'2025-10-22 20:55:50.629932',NULL,'2025-10-15 20:55:50.629932',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,502,1),(202,'2025-10-22 21:16:10.709688',NULL,'2025-10-15 21:16:10.708679',NULL,4,NULL,NULL,NULL,NULL,NULL,0,0,252,2,50,40,552,1),(252,'2025-10-22 21:30:26.535087',NULL,'2025-10-15 21:30:26.535087',NULL,4,NULL,NULL,NULL,NULL,NULL,0,0,252,2,50,40,552,1),(253,'2025-10-22 21:37:19.393582',NULL,'2025-10-15 21:37:19.393582',NULL,4,NULL,NULL,NULL,NULL,NULL,0,0,252,1,300,286,552,1),(254,'2025-10-22 21:48:45.994505',NULL,'2025-10-15 21:48:45.994505',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,552,1),(302,'2025-10-22 22:09:31.148646',NULL,'2025-10-15 22:09:31.148646',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,552,1),(352,'2025-10-22 22:18:32.542639',NULL,'2025-10-15 22:18:32.542639',NULL,2,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,552,1),(402,'2025-10-29 23:09:29.459298',NULL,'2025-10-22 23:09:29.459298',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,7,450,406,502,1),(452,'2025-10-30 23:10:38.082332',NULL,'2025-10-23 23:10:38.082332',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,2,40,30,502,1),(502,'2025-11-03 21:56:24.603268',NULL,'2025-10-27 21:56:24.603268',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,5,100,75,502,1),(503,'2025-11-03 22:07:06.131096',NULL,'2025-10-27 22:07:06.131096',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,2,320,301,752,202),(552,'2025-11-05 22:12:37.137141',NULL,'2025-10-29 22:12:37.137141',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,2,40,36,552,1),(553,'2025-11-05 22:16:30.600975',NULL,'2025-10-29 22:16:30.600975',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,1,25,20,502,1),(602,'2025-11-06 11:29:58.746778',NULL,'2025-10-30 11:29:58.746778',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,2,40,30,552,1),(652,'2025-11-06 18:22:05.338769',NULL,'2025-10-30 18:22:05.338769',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,3,60,45,752,202),(653,'2025-11-06 18:29:25.713672',NULL,'2025-10-30 18:29:25.713672',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,4,80,60,752,202),(702,'2025-11-06 18:34:07.366706',NULL,'2025-10-30 18:34:07.366706',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,300,286,752,202),(703,'2025-11-06 18:47:44.704355',NULL,'2025-10-30 18:47:44.704355',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,2,600,572,752,202),(704,'2025-11-06 18:51:56.027454',NULL,'2025-10-30 18:51:56.027454',NULL,5,NULL,NULL,NULL,NULL,NULL,0,0,252,1,300,286,752,202),(752,'2025-11-06 18:58:36.469725',NULL,'2025-10-30 18:58:36.469725',NULL,0,NULL,NULL,NULL,NULL,NULL,0,0,252,1,300,286,752,202),(802,'2025-11-06 19:08:41.197414',NULL,'2025-10-30 19:08:41.197414',NULL,4,NULL,NULL,NULL,NULL,NULL,0,2,252,1,300,286,752,202),(852,'2025-11-06 19:11:01.356119',NULL,'2025-10-30 19:11:01.356119',NULL,4,NULL,NULL,NULL,NULL,NULL,0,2,252,1,300,286,752,202),(902,'2025-11-06 19:17:39.794942',NULL,'2025-10-30 19:17:39.794942',NULL,4,NULL,NULL,NULL,NULL,NULL,0,2,252,1,20,15,752,202),(952,'2025-11-10 11:01:37.491146',NULL,'2025-11-03 11:01:37.491146',NULL,4,NULL,NULL,NULL,NULL,NULL,0,2,252,2,2300,2186,752,202);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL,
  `mrp_price` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `selling_price` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  KEY `FKsgmrolp8skulmo2vyb20c4mfk` (`order_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKsgmrolp8skulmo2vyb20c4mfk` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,800000,4,600000,'M',1,1,3),(2,50,2,40,'Free',1,2,52),(3,50,2,40,'Free',1,3,52),(52,25,1,20,'Free',1,52,52),(102,300,1,286,'Free',1,102,102),(152,25,1,20,'Free',1,152,52),(202,50,2,40,'Free',1,202,52),(252,50,2,40,'Free',1,252,52),(253,300,1,286,'Free',1,253,102),(254,25,1,20,'Free',1,254,52),(302,25,1,20,'Free',1,302,52),(352,25,1,20,'Free',1,352,52),(402,300,1,286,'Free',1,402,102),(403,150,6,120,'Free',1,402,52),(452,40,2,30,'L',1,452,3),(502,100,5,75,'L',1,502,3),(503,20,1,15,'L',202,503,3),(504,300,1,286,'Free',202,503,102),(552,40,2,36,'XL',1,552,152),(553,25,1,20,'XL',1,553,203),(602,40,2,30,'M',1,602,3),(652,60,3,45,'XL',202,652,3),(653,80,4,60,'XL',202,653,3),(702,300,1,286,'Free',202,702,102),(703,600,2,572,'Free',202,703,102),(704,300,1,286,'Free',202,704,102),(752,300,1,286,'Free',202,752,102),(802,300,1,286,'Free',202,802,102),(852,300,1,286,'Free',202,852,102),(902,20,1,15,'L',202,902,3),(952,300,1,286,'Free',202,952,102),(953,2000,1,1900,'512GB',202,952,202);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item_seq`
--

DROP TABLE IF EXISTS `order_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item_seq`
--

LOCK TABLES `order_item_seq` WRITE;
/*!40000 ALTER TABLE `order_item_seq` DISABLE KEYS */;
INSERT INTO `order_item_seq` VALUES (1051);
/*!40000 ALTER TABLE `order_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_seq`
--

DROP TABLE IF EXISTS `order_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_seq`
--

LOCK TABLES `order_seq` WRITE;
/*!40000 ALTER TABLE `order_seq` DISABLE KEYS */;
INSERT INTO `order_seq` VALUES (1051);
/*!40000 ALTER TABLE `order_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_order`
--

DROP TABLE IF EXISTS `payment_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_order` (
  `id` bigint NOT NULL,
  `amount` bigint DEFAULT NULL,
  `payment_link_id` varchar(255) DEFAULT NULL,
  `payment_method` tinyint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdkj084gg4ak2uy5183lo7qu3q` (`user_id`),
  CONSTRAINT `FKdkj084gg4ak2uy5183lo7qu3q` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `payment_order_chk_1` CHECK ((`payment_method` between 0 and 1)),
  CONSTRAINT `payment_order_chk_2` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_order`
--

LOCK TABLES `payment_order` WRITE;
/*!40000 ALTER TABLE `payment_order` DISABLE KEYS */;
INSERT INTO `payment_order` VALUES (1,600000,NULL,NULL,0,1),(2,40,NULL,NULL,0,1),(3,40,NULL,NULL,0,1),(52,20,NULL,NULL,0,1),(102,286,NULL,NULL,0,1),(152,20,NULL,NULL,0,1),(202,0,NULL,NULL,0,1),(252,40,NULL,NULL,0,1),(302,40,NULL,NULL,0,1),(303,286,'mock_pl_id_303',NULL,0,1),(304,20,'mock_pl_id_304',NULL,0,1),(352,20,'mock_pl_id_352',NULL,0,1),(402,20,'mock_pl_id_402',NULL,0,1),(452,406,'mock_pl_id_452',NULL,0,1),(502,30,NULL,NULL,0,1),(552,75,'mock_pl_id_552',NULL,0,1),(553,301,NULL,NULL,0,202),(602,36,NULL,NULL,0,1),(603,20,'mock_pl_id_603',NULL,0,1),(652,30,NULL,NULL,0,1),(702,45,'mock_pl_id_702',NULL,0,202),(703,60,NULL,NULL,0,202),(752,286,NULL,NULL,0,202),(753,572,'mock_pl_id_753',NULL,0,202),(754,0,'mock_pl_id_754',NULL,0,202),(755,286,'mock_pl_id_755',NULL,0,202),(802,286,'802',NULL,0,202),(852,286,'852',NULL,1,202),(902,286,'902',NULL,1,202),(952,15,'952',NULL,1,202),(1002,2186,'1002',NULL,1,202);
/*!40000 ALTER TABLE `payment_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_order_orders`
--

DROP TABLE IF EXISTS `payment_order_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_order_orders` (
  `payment_order_id` bigint NOT NULL,
  `orders_id` bigint NOT NULL,
  PRIMARY KEY (`payment_order_id`,`orders_id`),
  UNIQUE KEY `UK2ujbjdd8nj7rnnybygk520rov` (`orders_id`),
  CONSTRAINT `FKg5ba6n6ksqou77epbn9h6738t` FOREIGN KEY (`payment_order_id`) REFERENCES `payment_order` (`id`),
  CONSTRAINT `FKi8e8miihoccpml1syt397m0c3` FOREIGN KEY (`orders_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_order_orders`
--

LOCK TABLES `payment_order_orders` WRITE;
/*!40000 ALTER TABLE `payment_order_orders` DISABLE KEYS */;
INSERT INTO `payment_order_orders` VALUES (1,1),(2,2),(3,3),(52,52),(102,102),(152,152),(252,202),(302,252),(303,253),(304,254),(352,302),(402,352),(452,402),(502,452),(552,502),(553,503),(602,552),(603,553),(652,602),(702,652),(703,653),(752,702),(753,703),(755,704),(802,752),(852,802),(902,852),(952,902),(1002,952);
/*!40000 ALTER TABLE `payment_order_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_order_seq`
--

DROP TABLE IF EXISTS `payment_order_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_order_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_order_seq`
--

LOCK TABLES `payment_order_seq` WRITE;
/*!40000 ALTER TABLE `payment_order_seq` DISABLE KEYS */;
INSERT INTO `payment_order_seq` VALUES (1101);
/*!40000 ALTER TABLE `payment_order_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_percent` int NOT NULL,
  `mrp_price` int NOT NULL,
  `num_ratings` int NOT NULL,
  `quantity` int NOT NULL,
  `selling_price` int NOT NULL,
  `sizes` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKesd6fy52tk7esoo2gcls4lfe3` (`seller_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKesd6fy52tk7esoo2gcls4lfe3` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'Blue','2025-08-11 18:56:59.128305','Áo thun unisex, chất liệu cotton 100%, thoáng mát',25,20,0,97,15,'S M L XL','T-shirt',553,252),(52,'Peach','2025-09-07 21:20:28.777987','For you',20,25,0,100,20,'Free','Women bag',454,252),(102,'Cream','2025-09-29 13:35:55.600259','Beautiful',4,300,0,95,286,'Free','PNJ Necklace',503,252),(152,'Green','2025-10-23 19:58:01.161489','Uia iiuiauuia iiuiauuia iiuiauuiaaa',10,20,0,98,18,'XL','UIA',553,252),(202,'White','2025-10-27 19:52:51.812930','Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla....',5,2000,0,9,1900,'512GB','Macbook Pro M2',604,252),(203,'Blue','2025-10-27 20:04:31.261830','Hehehehehehehehehehohohooohohoho...',20,25,0,20,20,'XL','Jeans',606,252);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `product_id` bigint NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  KEY `FKi8jnqq05sk5nkma3pfp3ylqrt` (`product_id`),
  CONSTRAINT `FKi8jnqq05sk5nkma3pfp3ylqrt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (52,'http://res.cloudinary.com/direwpt4c/image/upload/v1757254804/fs1_c1bshf.png'),(102,'http://res.cloudinary.com/direwpt4c/image/upload/v1759127656/jw1_crnkn1.jpg'),(102,'http://res.cloudinary.com/direwpt4c/image/upload/v1759127695/jw2_iyfull.png'),(152,'http://res.cloudinary.com/direwpt4c/image/upload/v1761224231/t-shirt2_pqnzdn.png'),(3,'http://res.cloudinary.com/direwpt4c/image/upload/v1761224111/t-shirt_yjuuza.png'),(202,'http://res.cloudinary.com/direwpt4c/image/upload/v1761569413/el42_simbtq.jpg'),(202,'http://res.cloudinary.com/direwpt4c/image/upload/v1761569424/el41_c0p6iy.jpg'),(203,'http://res.cloudinary.com/direwpt4c/image/upload/v1761570224/jeans_kmcvq8.png');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_seq`
--

DROP TABLE IF EXISTS `product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (301);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `rating` double NOT NULL,
  `review_text` varchar(255) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiyof1sindb9qiqr9o8npj8klt` (`product_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKiyof1sindb9qiqr9o8npj8klt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,'2025-10-21 22:49:01.103997',4.7,'A good Product',3,1),(3,'2025-10-21 22:49:46.042642',4.7,'Really Like it',52,1),(52,'2025-10-21 23:24:06.160244',4.7,'Very Good. I love it',102,1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_product_images`
--

DROP TABLE IF EXISTS `review_product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_product_images` (
  `review_id` bigint NOT NULL,
  `product_images` varchar(255) DEFAULT NULL,
  KEY `FKnh48ff6jnr2aym490rnn5q2ly` (`review_id`),
  CONSTRAINT `FKnh48ff6jnr2aym490rnn5q2ly` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_product_images`
--

LOCK TABLES `review_product_images` WRITE;
/*!40000 ALTER TABLE `review_product_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_seq`
--

DROP TABLE IF EXISTS `review_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_seq`
--

LOCK TABLES `review_seq` WRITE;
/*!40000 ALTER TABLE `review_seq` DISABLE KEYS */;
INSERT INTO `review_seq` VALUES (151);
/*!40000 ALTER TABLE `review_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `id` bigint NOT NULL,
  `gstin` varchar(255) DEFAULT NULL,
  `account_status` enum('ACTIVE','BANNED','CLOSED','DEACTIVATED','PENDING_VERIFICATION','SUSPENDED') NOT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `business_address` varchar(255) DEFAULT NULL,
  `business_email` varchar(255) DEFAULT NULL,
  `business_mobile` varchar(255) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_email_verified` bit(1) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_CUSTOMER','ROLE_SELLER') NOT NULL,
  `seller_name` varchar(255) DEFAULT NULL,
  `pickup_address_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcrgbovyy4gvgsum2yyb3fbfn7` (`email`),
  UNIQUE KEY `UKjj970igwpuystjwkx6i5jp0o6` (`pickup_address_id`),
  CONSTRAINT `FK211igkobsc9a1ujun15vg8yd` FOREIGN KEY (`pickup_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `seller_chk_1` CHECK ((`account_status` between 0 and 5)),
  CONSTRAINT `seller_chk_2` CHECK (((`is_email_verified` = true) or (`account_status` = _utf8mb4'PENDING_VERIFICATION')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (252,'GST123456789','ACTIVE','Nguyen Duong','123456789012','SBIN0001234',NULL,'123 Main Street','contact@duongstore.com','0905123456','Duong E-commerce',NULL,'nd@gmail.com',_binary '','0905123456','$2a$10$4c84XKhfgHNCjHgNSPoOAu5iE0a59.rPI7Wm2XKpnrnf.ZU0gJ8We','ROLE_SELLER','Nguyen Duong Store',402),(352,'MST88888888','PENDING_VERIFICATION','NGUYEN DUONG','12345678','ACBVVN','','19 Nguyen Huu Tho, Tan Hung, HCM City','hi@gmail.com','0898888999','hixinchao','','email@gmail.com',_binary '','0896857999','$2a$10$6/gaKleZXZu1VL4EFEtwle/tAcveMCz40oSHNkpuwkX57VnwcD9B2','ROLE_SELLER','',662),(402,'MST88888899','DEACTIVATED','HEHE','123456789','ACBVVN','','19 Nguyen Huu Tho, Tan Hung, HCM City','hello@gmail.com','0898888998','hhihi','','hihi@gmail.com',_binary '','','$2a$10$mO9dPEUuSAxWpp.aLDeTM.BuBm1v5/gQTa6qygIY27iOWGINvj.Iu','ROLE_SELLER','',702),(403,'MST8888886868','ACTIVE','HUHUHUHU','12345678','ACBVNVN','','19 Nguyen Huu Tho, Tan Hung, HCM City','hic@gmail.com','0898888998','hic','','metqua@gmail.com',_binary '','','$2a$10$KQBI.t94YsfPqMzgjq6fkeKspoYttExx/19Auby0rtr9x/NXLykA2','ROLE_SELLER','',703);
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_report`
--

DROP TABLE IF EXISTS `seller_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_report` (
  `id` bigint NOT NULL,
  `canceled_orders` int DEFAULT NULL,
  `net_earnings` bigint DEFAULT NULL,
  `total_earnings` bigint DEFAULT NULL,
  `total_orders` int DEFAULT NULL,
  `total_refunds` bigint DEFAULT NULL,
  `total_sales` bigint DEFAULT NULL,
  `total_tax` bigint DEFAULT NULL,
  `total_transactions` int DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKled1p942vldbtov2q7fp264r1` (`seller_id`),
  CONSTRAINT `FKryorwmoc988nw53yhins0xwl8` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_report`
--

LOCK TABLES `seller_report` WRITE;
/*!40000 ALTER TABLE `seller_report` DISABLE KEYS */;
INSERT INTO `seller_report` VALUES (1,5,0,2773,4,983,5,0,0,252),(2,0,0,0,0,0,0,0,0,352),(52,0,0,0,0,0,0,0,0,403);
/*!40000 ALTER TABLE `seller_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_report_seq`
--

DROP TABLE IF EXISTS `seller_report_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_report_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_report_seq`
--

LOCK TABLES `seller_report_seq` WRITE;
/*!40000 ALTER TABLE `seller_report_seq` DISABLE KEYS */;
INSERT INTO `seller_report_seq` VALUES (151);
/*!40000 ALTER TABLE `seller_report_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_seq`
--

DROP TABLE IF EXISTS `seller_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_seq`
--

LOCK TABLES `seller_seq` WRITE;
/*!40000 ALTER TABLE `seller_seq` DISABLE KEYS */;
INSERT INTO `seller_seq` VALUES (501);
/*!40000 ALTER TABLE `seller_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpiu8sb2aby57a9iiuqe614hut` (`order_id`),
  KEY `FKaaw4rl1eesbyd56wunm03tkpd` (`seller_id`),
  KEY `FKsg7jp0aj6qipr50856wf6vbw1` (`user_id`),
  KEY `FKq9mudodpwcab2p6kt6tyfw9nj` (`customer_id`),
  CONSTRAINT `FKaaw4rl1eesbyd56wunm03tkpd` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`),
  CONSTRAINT `FKc8f5x53y9r4mu712tdy019v6t` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `FKq9mudodpwcab2p6kt6tyfw9nj` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKsg7jp0aj6qipr50856wf6vbw1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'2025-10-30 19:08:42.073401',802,252,NULL,202),(2,'2025-10-30 19:11:02.303659',852,252,NULL,202),(52,'2025-10-30 19:17:40.488067',902,252,NULL,202),(102,'2025-11-03 11:01:38.837621',952,252,NULL,202);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_seq`
--

DROP TABLE IF EXISTS `transaction_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_seq`
--

LOCK TABLES `transaction_seq` WRITE;
/*!40000 ALTER TABLE `transaction_seq` DISABLE KEYS */;
INSERT INTO `transaction_seq` VALUES (201);
/*!40000 ALTER TABLE `transaction_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_CUSTOMER','ROLE_SELLER') NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_chk_1` CHECK ((`role` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nguyenduong939705@gmail.com','NguyenDuong','0896857093','$2a$10$oq1OuhuzzXFEWVl0Ui6X8O8cqie23jfr7dPALLGi7dscHhLjkOmXG','ROLE_CUSTOMER'),(52,'mn@gmail.com','Minh Nguyet','0123456789','$2a$10$sQiABD9w80qNwPsVCBQ4Se.wDvVJKqtWQFqQghCq4XNvdQb/Vc34y','ROLE_CUSTOMER'),(102,'email@gmail.com','nd','0123456789','$2a$10$iVC4N2Uh9TFU4bQD18PzoehNJ33MFZOmgFTtqw.j2x14hNi9DhRSG','ROLE_CUSTOMER'),(152,'nd@gmail.com','Nguyen Duong',NULL,'$2a$10$2yJxOEGZQ9St.Jve57qa4eBLVo3inB0P4g/pRF.iDBb33sY9wAF2a','ROLE_ADMIN'),(202,'ndg@gmail.com','Nguyen Duong','0123456789','$2a$10$8enDI3kq4qWzehA0J42tU.iFIzWOalTTedToQSFmLO02JXI9/hsaG','ROLE_ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_addresses`
--

DROP TABLE IF EXISTS `user_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_addresses` (
  `user_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`addresses_id`),
  UNIQUE KEY `UKi5lp1fvgfvsplfqwu4ovwpnxs` (`addresses_id`),
  CONSTRAINT `FKfm6x520mag23hvgr1oshaut8b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKth1icmttmhhorb9wiarm73i06` FOREIGN KEY (`addresses_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_addresses`
--

LOCK TABLES `user_addresses` WRITE;
/*!40000 ALTER TABLE `user_addresses` DISABLE KEYS */;
INSERT INTO `user_addresses` VALUES (1,452);
/*!40000 ALTER TABLE `user_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (301);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_used_coupons`
--

DROP TABLE IF EXISTS `user_used_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_used_coupons` (
  `used_by_users_id` bigint NOT NULL,
  `used_coupons_id` bigint NOT NULL,
  PRIMARY KEY (`used_by_users_id`,`used_coupons_id`),
  KEY `FK6v6jcmjfnqrg0gesn4udodddf` (`used_coupons_id`),
  CONSTRAINT `FK6v6jcmjfnqrg0gesn4udodddf` FOREIGN KEY (`used_coupons_id`) REFERENCES `coupon` (`id`),
  CONSTRAINT `FKma4ddhc2870cafng7hxksnwlg` FOREIGN KEY (`used_by_users_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_used_coupons`
--

LOCK TABLES `user_used_coupons` WRITE;
/*!40000 ALTER TABLE `user_used_coupons` DISABLE KEYS */;
INSERT INTO `user_used_coupons` VALUES (1,52),(1,53),(1,102),(202,202),(1,203),(202,203),(1,204),(1,252),(202,252);
/*!40000 ALTER TABLE `user_used_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_code`
--

DROP TABLE IF EXISTS `verification_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_code` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdmpcy75hhu65imv7xw7ui6okw` (`seller_id`),
  UNIQUE KEY `UKn576esytmxxfkgon3ja83h5vp` (`user_id`),
  CONSTRAINT `FK6xv2fg9bam0hdm7ybw71a8x40` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`),
  CONSTRAINT `FKgy5dhio3a6c9me7s0x9v1y4d2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_code`
--

LOCK TABLES `verification_code` WRITE;
/*!40000 ALTER TABLE `verification_code` DISABLE KEYS */;
INSERT INTO `verification_code` VALUES (1,'nguyenduong939705@gmail.com','051549',NULL,NULL),(3,'mn@gmail.com','110823',NULL,NULL),(353,'nd@gmail.com','010766',NULL,NULL),(453,'nduong@gmail.com','998965',NULL,NULL),(503,'hi@gmail.com','556388',NULL,NULL),(504,'email@gmail.com','741444',NULL,NULL),(553,'hihi@gmail.com','941052',NULL,NULL),(602,'metqua@gmail.com','242382',NULL,NULL);
/*!40000 ALTER TABLE `verification_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_code_seq`
--

DROP TABLE IF EXISTS `verification_code_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_code_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_code_seq`
--

LOCK TABLES `verification_code_seq` WRITE;
/*!40000 ALTER TABLE `verification_code_seq` DISABLE KEYS */;
INSERT INTO `verification_code_seq` VALUES (701);
/*!40000 ALTER TABLE `verification_code_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrcuy9aqx9c6q56x1xdoty8r3q` (`user_id`),
  CONSTRAINT `FKd4r80jm8s41fgoa0xv9yy5lo8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,1),(2,152),(52,202);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_products`
--

DROP TABLE IF EXISTS `wishlist_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_products` (
  `wishlist_id` bigint NOT NULL,
  `products_id` bigint NOT NULL,
  PRIMARY KEY (`wishlist_id`,`products_id`),
  KEY `FK6o1bb3qhyvhwmph1e48nlud0e` (`products_id`),
  CONSTRAINT `FK6o1bb3qhyvhwmph1e48nlud0e` FOREIGN KEY (`products_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKhlq0ylq5sxd70s0pembuumc1d` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_products`
--

LOCK TABLES `wishlist_products` WRITE;
/*!40000 ALTER TABLE `wishlist_products` DISABLE KEYS */;
INSERT INTO `wishlist_products` VALUES (1,52),(52,102),(2,152);
/*!40000 ALTER TABLE `wishlist_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_seq`
--

DROP TABLE IF EXISTS `wishlist_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_seq`
--

LOCK TABLES `wishlist_seq` WRITE;
/*!40000 ALTER TABLE `wishlist_seq` DISABLE KEYS */;
INSERT INTO `wishlist_seq` VALUES (151);
/*!40000 ALTER TABLE `wishlist_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-09  9:10:56
