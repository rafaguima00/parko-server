-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: parkodb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abertura_caixa`
--

DROP TABLE IF EXISTS `abertura_caixa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abertura_caixa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_establishment` int DEFAULT NULL,
  `id_colaborator` int DEFAULT NULL,
  `valor_abertura` double DEFAULT NULL,
  `data_abertura` varchar(50) DEFAULT NULL,
  `hora_abertura` varchar(50) DEFAULT NULL,
  `data_fechamento` varchar(50) DEFAULT NULL,
  `hora_fechamento` varchar(50) DEFAULT NULL,
  `aberto` int DEFAULT (1),
  `valor_fechamento` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_est_fk` (`id_establishment`),
  KEY `id_col_fk` (`id_colaborator`),
  CONSTRAINT `id_col_fk` FOREIGN KEY (`id_colaborator`) REFERENCES `colaborators` (`id`),
  CONSTRAINT `id_est_fk` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `desc_item` varchar(50) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `date_created` varchar(50) DEFAULT NULL,
  `date_payment` varchar(50) DEFAULT NULL,
  `status` enum('Pago','Pendente') DEFAULT NULL,
  `cost` enum('Fixo','Variável') DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idestablishment` (`id_establishment`),
  CONSTRAINT `fk_idestablishment` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aportes`
--

DROP TABLE IF EXISTS `aportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_establishment` int DEFAULT NULL,
  `id_colaborator` int DEFAULT NULL,
  `value` double DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `code_confirmation`
--

DROP TABLE IF EXISTS `code_confirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_confirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_reservation` int NOT NULL,
  `code` int NOT NULL,
  `expires_at` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_reservation` (`id_reservation`),
  CONSTRAINT `fk_reservation` FOREIGN KEY (`id_reservation`) REFERENCES `reservations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=445 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `colaborators`
--

DROP TABLE IF EXISTS `colaborators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaborators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `rg` varchar(14) DEFAULT NULL,
  `tel` varchar(30) NOT NULL,
  `data_nasc` varchar(30) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `inicio_contrato` varchar(50) NOT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `e_admin` int DEFAULT NULL,
  `tipo_contratacao` int DEFAULT NULL,
  `unidade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_e_admin` (`e_admin`),
  KEY `fk_hiring` (`tipo_contratacao`),
  KEY `fk_unity` (`unidade`),
  CONSTRAINT `fk_e_admin` FOREIGN KEY (`e_admin`) REFERENCES `type_colaborators` (`id`),
  CONSTRAINT `fk_hiring` FOREIGN KEY (`tipo_contratacao`) REFERENCES `type_hiring` (`id`),
  CONSTRAINT `fk_unity` FOREIGN KEY (`unidade`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `debts`
--

DROP TABLE IF EXISTS `debts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_costumer` int DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  `value` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `date_created` varchar(50) DEFAULT NULL,
  `date_updated` varchar(50) DEFAULT NULL,
  `id_reservation` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_costumer` (`id_costumer`),
  KEY `fk_establishment` (`id_establishment`),
  KEY `fk_status` (`status`),
  KEY `fk_id_reserva` (`id_reservation`),
  CONSTRAINT `fk_customer_debt` FOREIGN KEY (`id_costumer`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_establishment` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_id_reserva` FOREIGN KEY (`id_reservation`) REFERENCES `reservations` (`id`),
  CONSTRAINT `fk_status` FOREIGN KEY (`status`) REFERENCES `status_debts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `establishments`
--

DROP TABLE IF EXISTS `establishments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `establishments` (
  `id` int NOT NULL,
  `razao_social` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `contato` varchar(30) DEFAULT NULL,
  `cnpj` varchar(30) DEFAULT NULL,
  `inscricao_estadual` varchar(50) DEFAULT NULL,
  `inscricao_municipal` varchar(50) DEFAULT NULL,
  `end` varchar(200) DEFAULT NULL,
  `cep` varchar(30) DEFAULT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `numero_vagas` int DEFAULT NULL,
  `vagas_ocupadas` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `type_of_charge` enum('hora_fracao','tabela_fixa') DEFAULT NULL,
  `test` int DEFAULT (0),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` int DEFAULT NULL,
  `pergunta` varchar(500) DEFAULT NULL,
  `resposta` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tipo_faq` (`tipo`),
  CONSTRAINT `fk_tipo_faq` FOREIGN KEY (`tipo`) REFERENCES `tipo_faq` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `parking_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `parking_id` (`parking_id`),
  KEY `fk_customer_fav` (`user_id`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`parking_id`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_customer_fav` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `heritage`
--

DROP TABLE IF EXISTS `heritage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heritage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `date_registry` varchar(50) DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `unit_measurement` varchar(20) DEFAULT 'Prata',
  `value` double DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `fk_id_estab` (`id_establishment`),
  CONSTRAINT `fk_id_estab` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `occurrence`
--

DROP TABLE IF EXISTS `occurrence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occurrence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `local` varchar(50) DEFAULT NULL,
  `data` varchar(20) DEFAULT NULL,
  `numero_comanda` varchar(20) DEFAULT NULL,
  `nome_cliente` varchar(50) DEFAULT NULL,
  `veiculo` varchar(50) DEFAULT NULL,
  `placa_veiculo` varchar(8) DEFAULT NULL,
  `cor_veiculo` varchar(20) DEFAULT NULL,
  `num_doc` varchar(20) DEFAULT NULL,
  `renavam` varchar(25) DEFAULT NULL,
  `data_entrada` varchar(20) DEFAULT NULL,
  `hora_entrada` varchar(20) DEFAULT NULL,
  `value` double DEFAULT '0',
  `desc_item` varchar(200) DEFAULT NULL,
  `bem_furtado` varchar(50) DEFAULT NULL,
  `num_bo` varchar(50) DEFAULT NULL,
  `id_occurrence` int DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  `cod` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_occurrence` (`id_occurrence`),
  KEY `fk_id_establishment` (`id_establishment`),
  CONSTRAINT `fk_id_establishment` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_occurrence` FOREIGN KEY (`id_occurrence`) REFERENCES `type_occurrence` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opening_hour`
--

DROP TABLE IF EXISTS `opening_hour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opening_hour` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_estacionamento` int DEFAULT NULL,
  `dia_semana` enum('Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo') DEFAULT NULL,
  `hora_abertura` time DEFAULT NULL,
  `hora_fechamento` time DEFAULT NULL,
  `closed` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estacionamento` (`id_estacionamento`),
  CONSTRAINT `opening_hour_ibfk_1` FOREIGN KEY (`id_estacionamento`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_customer` int DEFAULT NULL,
  `id_vehicle` int DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  `value` double DEFAULT NULL,
  `data` varchar(30) DEFAULT NULL,
  `hora` varchar(30) DEFAULT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `id_payment` varchar(30) DEFAULT NULL,
  `id_reservation` int DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `card_brand` varchar(30) DEFAULT NULL,
  `value_paid` double DEFAULT NULL,
  `change_to_pay` double DEFAULT NULL,
  `change_paid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_park` (`id_establishment`),
  KEY `fk_id_reservs` (`id_reservation`),
  KEY `fk_stts_payment` (`status`),
  KEY `fk_id_vehicle` (`id_vehicle`),
  KEY `fk_customer_payment` (`id_customer`),
  CONSTRAINT `fk_customer_payment` FOREIGN KEY (`id_customer`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_id_park` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_id_reservs` FOREIGN KEY (`id_reservation`) REFERENCES `reservations` (`id`),
  CONSTRAINT `fk_id_vehicle` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price_table`
--

DROP TABLE IF EXISTS `price_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tempo_tolerancia` int DEFAULT NULL,
  `valor_hora` double DEFAULT NULL,
  `valor_fracao_hora` double DEFAULT NULL,
  `id_estacionamento` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_estacionamento` (`id_estacionamento`),
  CONSTRAINT `fk_id_est` FOREIGN KEY (`id_estacionamento`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `privacy_policy`
--

DROP TABLE IF EXISTS `privacy_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privacy_policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paragraph` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_costumer` int DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `id_reservation` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`id_costumer`),
  KEY `fk_est` (`id_establishment`),
  KEY `fk_id_reserv` (`id_reservation`),
  CONSTRAINT `fk_customer_rate` FOREIGN KEY (`id_costumer`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_est` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_id_reserv` FOREIGN KEY (`id_reservation`) REFERENCES `reservations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `request_end_reservation`
--

DROP TABLE IF EXISTS `request_end_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_end_reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_customer` int NOT NULL,
  `id_reservation` int NOT NULL,
  `id_establishment` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_vehicle` int NOT NULL,
  `notified` tinyint(1) DEFAULT '0',
  `updated_at` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserv` (`id_reservation`),
  KEY `fk_park` (`id_establishment`),
  KEY `fk_id_vehicle_car` (`id_vehicle`),
  KEY `fk_customer_res` (`id_customer`),
  CONSTRAINT `fk_customer_res` FOREIGN KEY (`id_customer`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_id_vehicle_car` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles` (`id`),
  CONSTRAINT `fk_park` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_reserv` FOREIGN KEY (`id_reservation`) REFERENCES `reservations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_reserva` varchar(50) DEFAULT NULL,
  `hora_reserva` varchar(15) DEFAULT NULL,
  `data_entrada` varchar(50) DEFAULT NULL,
  `hora_entrada` varchar(15) DEFAULT NULL,
  `data_saida` varchar(30) DEFAULT NULL,
  `hora_saida` varchar(30) DEFAULT NULL,
  `value` double NOT NULL,
  `id_costumer` int DEFAULT NULL,
  `status_reservation` int DEFAULT NULL,
  `id_vehicle` int DEFAULT NULL,
  `id_establishment` int DEFAULT NULL,
  `parko_app` int DEFAULT NULL,
  `rated` double DEFAULT NULL,
  `data_hora_entrada_real` varchar(50) DEFAULT NULL,
  `data_hora_saida_real` varchar(50) DEFAULT NULL,
  `type_of_charge` enum('tabela_fixa','hora_fracao') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle` (`id_vehicle`),
  KEY `fk_client_res` (`id_costumer`),
  KEY `fk_status_res` (`status_reservation`),
  KEY `fk_estab_res` (`id_establishment`),
  CONSTRAINT `fk_customer_id` FOREIGN KEY (`id_costumer`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_estab_res` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`),
  CONSTRAINT `fk_status_res` FOREIGN KEY (`status_reservation`) REFERENCES `status_reservation` (`id`),
  CONSTRAINT `fk_vehicle` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles` (`id`),
  CONSTRAINT `check_boolean` CHECK ((`parko_app` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `retiradas`
--

DROP TABLE IF EXISTS `retiradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retiradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_establishment` int DEFAULT NULL,
  `id_colaborator` int DEFAULT NULL,
  `value` double DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_debts`
--

DROP TABLE IF EXISTS `status_debts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_debts` (
  `id` int NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_payment`
--

DROP TABLE IF EXISTS `status_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_reservation`
--

DROP TABLE IF EXISTS `status_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_reservation` (
  `id` int NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tabela_fixa`
--

DROP TABLE IF EXISTS `tabela_fixa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabela_fixa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_establishment` int DEFAULT NULL,
  `primeira_hora` varchar(15) DEFAULT NULL,
  `segunda_hora` varchar(15) DEFAULT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_parking` (`id_establishment`),
  CONSTRAINT `fk_id_parking` FOREIGN KEY (`id_establishment`) REFERENCES `establishments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipo_faq`
--

DROP TABLE IF EXISTS `tipo_faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_colaborators`
--

DROP TABLE IF EXISTS `type_colaborators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_colaborators` (
  `id` int NOT NULL,
  `type_colaborator` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_hiring`
--

DROP TABLE IF EXISTS `type_hiring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_hiring` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_occurrence`
--

DROP TABLE IF EXISTS `type_occurrence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_occurrence` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `rg` varchar(14) DEFAULT NULL,
  `tel` varchar(30) DEFAULT NULL,
  `data_nasc` varchar(30) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_costumer` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `color` varchar(15) DEFAULT NULL,
  `license_plate` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_client` (`id_costumer`),
  CONSTRAINT `fk_id_customer` FOREIGN KEY (`id_costumer`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'parkodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-21 16:28:09
