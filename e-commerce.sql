-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 09 août 2021 à 01:14
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `e-commerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent_category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `parent_category_id`) VALUES
(247, 'Smart Phones ', NULL),
(248, 'Android Phones', 247),
(249, 'IOS phones ', 247),
(250, 'Sumsung', 248),
(264, 'Computing', NULL),
(265, 'Desktops', 264),
(266, 'Laptops', 264);

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(270);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `image`, `description`, `name`, `price`) VALUES
(251, '11be850b-fc89-4b82-9531-5b7b54283277.jpg', 'Upgrade to the Galaxy A32 5G and speed up your smartphone experience.', 'Samsung Galaxy A32', 100),
(252, '1ecb9ea9-e3e0-4a47-837c-e497ed58da88.jpg', 'The Galaxy M31s sports a 6.5-inch AMOLED display with a hole-punch at the Centre. Just like the Galaxy M31, this too packs a big 6,000mAh battery ', 'Samsung Galaxy M31', 150),
(253, '130a63e8-ab0b-444e-9c80-588ada416164.jpg', 'super speed dual pixel 12MP OIS (F1.5/F2.4)+12MP OIS(F2.4)Super flow-mo8AMP AF Selfie Camera IP68 WATER & DUST Resistance Iris Scanner 64GB Memory', 'Samsung Galaxy S9 Plus', 900),
(254, 'dfb4cbd9-07af-4a68-b2d0-2b0c519be948.jpg', 'The Samsung S10 range captures the belief that there is no limit. The no-notch Near Infinity Screen delivers life-like graphics and the intuitive interface makes gaming super fun ', 'Samsung Galaxy S10 ', 1000),
(255, '1f7c33a2-2972-4451-8734-a08b25c05dd8.jpg', '146.5 mm(5.8\",fullrectangle)/143.3 mm(5.6\",rounded corners)1 Quad HD+ sAMOLEDDual pixel 12MP /8MP AF', 'Samsung Galaxy S8', 700),
(256, 'a9a6d91e-1f40-48a5-b9dc-af1153e10624.jpg', 'Samsung Galaxy A12', 'Samsung Galaxy A12', 130),
(257, 'd7c2350b-e1f3-4fb8-bf34-eb23fea9aaf5.jpg', 'Platform: Android 10, MIUI 12\nProcessor: MediaTek Helio G25 (Octa-core 2.0 GHz Cortex-A53)', 'XIAOMI Redmi 9A ', 283.94),
(258, '658827f7-92d9-44e5-bcee-b840c9657013.jpg', 'iPhone 12, the new one in the iPhone 12 series was launched on October 13, 2020.', 'Apple IPhone 12', 1000),
(259, '68c58eb5-4553-42f2-83f0-5365d486e3d2.jpg', 'Shoot amazing videos and photos with the Ultra Wide, Wide, and Telephoto cameras.', 'Apple IPhone 11 Pro ', 1100),
(260, 'de0ab4c2-5322-48e1-8425-b533ac59255a.jpg', 'Network Technology GSM / HSPA / LTELaunch Announced 2017, SeptemberStatus Available. Released 2017', 'Apple Iphone X', 1000),
(261, '898901de-4264-408a-ad79-e94cfc44a996.jpg', '4G bands LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), ', 'Apple IPhone 6S ', 300),
(262, 'd3267d39-745d-4c08-bf32-5de0187dc274.jpg', '5G transforms iPhone with accelerated wireless speeds and better performance on congested networks.', 'Apple IPhone 12', 1600),
(263, 'feebe8d9-3e89-403a-ad96-daa230fe16ec.jpg', 'Network Technology GSM / HSPA / LTELaunch Announced 2017, SeptemberStatus Available. Released 2017,', 'Apple Iphone X', 500),
(267, '18e2b318-b56c-4723-9949-ff42b5674db6.jpg', 'HP 200 G4 22 AIO PC- INTEL® CORE™ I3-10110U (2.1 GHZ BASE FREQUENCY, UP TO 4.1 GHZ WITH INTEL® TURBO BOOST', 'Hp 200 G4 22 AIO PC', 500),
(268, '3f3fed38-a5ef-400a-b26e-b87e3fcdd7b5.jpg', 'boutThe Lenovo IdeaPad  is a 15.6-inch laptop with a screen resolution of 1920 x 1080.', 'Lenovo Ideapad', 800),
(269, 'fa664fd2-4577-4fb6-b184-e0995790f67c.jpg', 'tay connected to what matters most with long-lasting battery life and a thin micro-edge bezel design.', 'Hp 14 AMD ATHLON', 900);

-- --------------------------------------------------------

--
-- Structure de la table `product_category`
--

CREATE TABLE `product_category` (
  `product_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product_category`
--

INSERT INTO `product_category` (`product_id`, `category_id`) VALUES
(251, 247),
(251, 248),
(251, 250),
(252, 247),
(252, 248),
(252, 250),
(253, 247),
(253, 248),
(253, 250),
(254, 247),
(254, 248),
(254, 250),
(255, 247),
(255, 248),
(255, 250),
(256, 247),
(256, 248),
(256, 250),
(257, 247),
(257, 248),
(258, 247),
(258, 249),
(259, 247),
(259, 249),
(260, 247),
(260, 249),
(261, 247),
(261, 249),
(262, 247),
(262, 249),
(263, 247),
(263, 249),
(267, 264),
(267, 265),
(268, 264),
(268, 266),
(269, 264),
(269, 266);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`),
  ADD KEY `FKs2ride9gvilxy2tcuv7witnxc` (`parent_category_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `FKkud35ls1d40wpjb5htpp14q4e` (`category_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FKs2ride9gvilxy2tcuv7witnxc` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`);

--
-- Contraintes pour la table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `FK2k3smhbruedlcrvu6clued06x` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKkud35ls1d40wpjb5htpp14q4e` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
