-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2026 at 11:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_ordering`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama_menu` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `harga`, `kategori`) VALUES
(1, 'Nasi Goreng Special', 30000, 'Makanan'),
(2, 'Ocean Blue', 15000, 'Minuman'),
(3, 'French Fries', 20000, 'Appetizer'),
(4, 'Chicken Steak', 32000, 'Makanan');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `total`, `status`, `tanggal`) VALUES
(1, 60000, 'Selesai', '2026-07-28 21:06:17'),
(2, 30000, 'Selesai', '2026-07-28 21:06:17'),
(3, 20000, 'Selesai', '2026-07-28 21:06:17'),
(4, 32000, 'Selesai', '2026-07-28 21:06:17'),
(5, 60000, 'Selesai', '2026-07-28 21:06:17'),
(6, 30000, 'Selesai', '2026-07-28 21:11:34'),
(7, 30000, 'Selesai', '2026-07-28 21:12:27'),
(8, 15000, 'Selesai', '2026-07-28 21:12:33'),
(9, 60000, 'Selesai', '2026-07-28 21:27:24'),
(10, 30000, 'Pending', '2026-07-28 21:29:25'),
(11, 30000, 'Selesai', '2026-07-29 06:41:13'),
(12, 45000, 'Selesai', '2026-07-29 06:44:44'),
(13, 30000, 'Selesai', '2026-07-29 06:49:30'),
(14, 30000, 'Selesai', '2026-07-29 06:58:16'),
(15, 20000, 'Selesai', '2026-07-29 07:00:39'),
(16, 65000, 'Selesai', '2026-07-29 07:05:21'),
(17, 15000, 'Selesai', '2026-07-29 07:09:57'),
(18, 67000, 'Selesai', '2026-07-29 07:31:12'),
(19, 20000, 'Selesai', '2026-07-29 07:44:19'),
(20, 35000, 'Selesai', '2026-07-29 08:05:33'),
(21, 15000, 'Selesai', '2026-07-29 08:07:57'),
(22, 62000, 'Selesai', '2026-07-29 08:29:09'),
(23, 62000, 'Selesai', '2026-07-29 09:30:20'),
(24, 32000, 'Selesai', '2026-07-29 09:33:35'),
(25, 62000, 'Selesai', '2026-07-29 09:41:28'),
(26, 77000, 'Selesai', '2026-07-29 09:47:07'),
(27, 77000, 'Selesai', '2026-07-30 17:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id_detail` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id_detail`, `id_order`, `id_menu`, `jumlah`, `subtotal`) VALUES
(1, 11, 1, 1, 30000),
(2, 12, 1, 1, 30000),
(3, 12, 2, 1, 15000),
(4, 13, 1, 1, 30000),
(5, 14, 1, 1, 30000),
(6, 15, 3, 1, 20000),
(7, 16, 3, 1, 20000),
(8, 16, 2, 1, 15000),
(9, 16, 1, 1, 30000),
(10, 17, 2, 1, 15000),
(11, 18, 3, 1, 20000),
(12, 18, 2, 1, 15000),
(13, 18, 4, 1, 32000),
(14, 19, 3, 1, 20000),
(15, 20, 2, 1, 15000),
(16, 20, 3, 1, 20000),
(17, 21, 2, 1, 15000),
(18, 22, 4, 1, 32000),
(19, 22, 1, 1, 30000),
(20, 23, 4, 1, 0),
(21, 23, 1, 1, 0),
(22, 24, 4, 1, 0),
(23, 25, 4, 1, 0),
(24, 25, 1, 1, 0),
(25, 26, 1, 1, 0),
(26, 26, 4, 1, 0),
(27, 26, 2, 1, 0),
(28, 27, 1, 1, 0),
(29, 27, 4, 1, 0),
(30, 27, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','manager') NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`) VALUES
(1, 'Gabriell', 'gabriell@gmail.com', 'gabriell2104', 'manager'),
(2, 'manager', 'manager@gmail.com', 'manager123', 'manager'),
(3, 'user', 'user@gmail.com', 'user123', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`Id_menu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
