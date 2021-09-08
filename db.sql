-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2021 at 11:38 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2021_05_20_180328_create_users_table', 1),
(2, '2021_05_22_232147_create_past_trades_table', 1),
(3, '2021_05_22_232258_create_open_orders_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `open_orders`
--

CREATE TABLE `open_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `symbol` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coins` double(30,12) NOT NULL,
  `initial_price` double(30,12) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `open_orders`
--

INSERT INTO `open_orders` (`id`, `user_id`, `symbol`, `coins`, `initial_price`, `created_at`, `updated_at`) VALUES
(1, 1, 'ADA', 38.000000000000, 234.780000000000, '2021-05-23 18:09:14', '2021-05-23 18:11:20'),
(4, 1, 'TRX', 3.000000000000, 45.000000000000, '2021-05-23 18:21:32', '2021-05-23 18:21:32'),
(5, 2, 'USDT', 100.000000000000, 100.000000000000, '2021-05-23 18:23:17', '2021-05-23 18:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `past_trades`
--

CREATE TABLE `past_trades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `symbol` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coins` double(30,12) NOT NULL,
  `initial_price` double(30,12) NOT NULL,
  `final_price` double(30,12) NOT NULL,
  `profit_value` double(30,12) NOT NULL,
  `profit_percent` double(30,12) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `past_trades`
--

INSERT INTO `past_trades` (`id`, `user_id`, `symbol`, `coins`, `initial_price`, `final_price`, `profit_value`, `profit_percent`, `created_at`, `updated_at`) VALUES
(1, 1, 'BTC', 1.000000000000, 55788.650000000000, 33554.710000000000, -22233.940000000000, -39.853877087902, '2021-05-23 18:11:57', '2021-05-23 18:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'tester', '$2y$10$RWIveuvPfvxY/r/Fxdmoy.PeOzl2CMhCIFN/BvyTX5NWbmD8jjOTi', '2021-05-23 18:06:37', '2021-05-23 18:06:37'),
(2, 'hoho', '$2y$10$WjjIPoC0iaeELJUfonDBku5c.OL772WfhNzQKRookRFkKphh4.F6K', '2021-05-23 18:22:51', '2021-05-23 18:22:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `open_orders`
--
ALTER TABLE `open_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `open_orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `past_trades`
--
ALTER TABLE `past_trades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `past_trades_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `open_orders`
--
ALTER TABLE `open_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `past_trades`
--
ALTER TABLE `past_trades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `open_orders`
--
ALTER TABLE `open_orders`
  ADD CONSTRAINT `open_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `past_trades`
--
ALTER TABLE `past_trades`
  ADD CONSTRAINT `past_trades_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
