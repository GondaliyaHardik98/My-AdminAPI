-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 10:51 AM
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
-- Database: `company_dir`
--

-- --------------------------------------------------------

--
-- Table structure for table `amcrecord`
--

CREATE TABLE `amcrecord` (
  `amcId` int(11) NOT NULL,
  `sellId` int(11) NOT NULL,
  `amcDate` date DEFAULT NULL,
  `amcRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amcrecord`
--

INSERT INTO `amcrecord` (`amcId`, `sellId`, `amcDate`, `amcRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '2025-11-30', NULL, '2024-11-30 11:48:49', NULL, NULL),
(2, 2, '2025-12-06', NULL, '2024-12-07 11:39:21', NULL, NULL),
(3, 3, '2026-02-10', NULL, '2024-12-07 11:39:46', NULL, NULL),
(4, 4, '2025-12-07', NULL, '2024-12-07 11:40:11', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `challanmaster`
--

CREATE TABLE `challanmaster` (
  `challanId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `engineerId` int(11) DEFAULT NULL,
  `challanPrice` int(11) DEFAULT NULL,
  `challanDate` date DEFAULT NULL,
  `challanRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challanmaster`
--

INSERT INTO `challanmaster` (`challanId`, `customerId`, `productId`, `engineerId`, `challanPrice`, `challanDate`, `challanRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 4, 2, 1600, '2024-09-22', NULL, '2024-11-30 11:44:19', '2024-11-30 12:15:54', '2024-11-30 12:16:16'),
(2, 2, 6, 3, 60, '2024-07-26', NULL, '2024-11-30 11:56:10', '2024-11-30 12:15:54', '2024-11-30 12:16:12'),
(3, 2, 4, 2, 450, '2024-11-11', NULL, '2024-11-30 11:59:28', NULL, '2024-11-30 11:59:57'),
(4, 2, 6, 3, 60, '2024-07-29', NULL, '2024-11-30 11:59:28', NULL, '2024-11-30 11:59:50'),
(5, 3, 14, 5, 450, '2024-09-23', NULL, '2024-11-30 12:13:55', NULL, NULL),
(6, 2, 12, 3, 60, '2024-09-12', '', '2024-11-30 12:14:40', '2024-11-30 12:15:54', '2024-11-30 12:16:08'),
(7, 2, 13, 6, 60, '2024-07-05', '', '2024-11-30 12:15:54', NULL, '2024-11-30 12:16:05'),
(8, 2, 12, 6, 60, '2024-09-30', '', '2024-11-30 12:15:54', NULL, '2024-11-30 12:16:01'),
(9, 2, 4, 2, 1800, '2024-09-24', NULL, '2024-11-30 12:16:38', '2024-11-30 12:19:25', NULL),
(10, 2, 6, 3, 60, '2024-07-28', NULL, '2024-11-30 12:17:03', '2024-11-30 12:19:25', NULL),
(11, 2, 12, 3, 50, '2024-09-12', NULL, '2024-11-30 12:17:32', '2024-11-30 12:19:25', NULL),
(12, 2, 13, 6, 60, '2024-07-04', NULL, '2024-11-30 12:18:29', '2024-11-30 12:19:25', NULL),
(13, 2, 12, 6, 60, '2024-07-04', NULL, '2024-11-30 12:18:29', '2024-11-30 12:19:25', NULL),
(14, 2, 14, 7, 500, '2024-04-08', NULL, '2024-11-30 12:19:03', '2024-11-30 12:19:25', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `challan_view`
-- (See below for the actual view)
--
CREATE TABLE `challan_view` (
`challanId` int(11)
,`customerId` int(11)
,`customarName` varchar(200)
,`productId` int(11)
,`productName` varchar(255)
,`engineerId` int(11)
,`engineerName` varchar(100)
,`challanPrice` int(11)
,`challanDate` date
,`challanRemark` varchar(255)
,`deleted_at` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `customer_table`
--

CREATE TABLE `customer_table` (
  `customerId` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `gstNo` varchar(30) NOT NULL,
  `mobileNo` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_table`
--

INSERT INTO `customer_table` (`customerId`, `name`, `gstNo`, `mobileNo`, `address`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Customer 1', 'GS569874105', 2147483647, 'Amroli', 'Demo entry', '2024-11-30 10:48:10', NULL, NULL),
(2, 'Manishbhai', 'NA', 2147483647, 'Miranagar', '', '2024-11-30 11:42:11', NULL, NULL),
(3, 'bipinbhai', '', 2147483647, '', '', '2024-11-30 12:12:48', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `contact_details` text NOT NULL,
  `emergency_contact_1` int(11) NOT NULL,
  `emergency_contact_2` int(11) DEFAULT NULL,
  `photo` text NOT NULL,
  `id_proof` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`id`, `name`, `salary`, `contact_details`, `emergency_contact_1`, `emergency_contact_2`, `photo`, `id_proof`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Rakesh Makani', 0, '9327458885', 1236547890, 1236547890, 'uploads/employees/photos/1732943290159-178545357.jpg', 'uploads/employees/documents/1732943290162-456285985.png', '2024-11-30 10:38:10', NULL, NULL),
(2, 'Mihir', 20000, '9033583359', 2147483647, 2147483647, 'uploads/employees/photos/1732947041607-693775285.jpg', 'uploads/employees/documents/1732947041616-82901813.png', '2024-11-30 11:40:41', NULL, NULL),
(3, 'vipul', 20000, '6352318285', 2147483647, 2147483647, 'uploads/employees/photos/1732947939487-22072986.jpg', 'uploads/employees/documents/1732947939509-440332696.png', '2024-11-30 11:55:39', NULL, NULL),
(4, 'sunny', 20000, '6352318285', 2147483647, 2147483647, 'uploads/employees/photos/1732948592348-38700281.jpg', 'uploads/employees/documents/1732948592349-734356613.png', '2024-11-30 12:06:32', NULL, NULL),
(5, 'alpesh', 2000, '9033583359', 1236547890, 2147483647, 'uploads/employees/photos/1732948641660-488288976.jpg', 'uploads/employees/documents/1732948641662-433538873.png', '2024-11-30 12:07:21', NULL, NULL),
(6, 'alok', 20000, '9033583359', 1236547890, 2147483647, 'uploads/employees/photos/1732948757828-472873141.jpg', 'uploads/employees/documents/1732948757829-939610708.png', '2024-11-30 12:09:17', NULL, NULL),
(7, 'rutvik', 20000, '9327458885', 2147483647, 2147483647, 'uploads/employees/photos/1732948783340-789997252.jpg', 'uploads/employees/documents/1732948783401-456573880.png', '2024-11-30 12:09:43', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productmachinemaster`
--

CREATE TABLE `productmachinemaster` (
  `productId` int(11) NOT NULL,
  `productMachineCode` varchar(100) DEFAULT NULL,
  `vendorId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `productDesription` varchar(255) DEFAULT NULL,
  `productPrice` int(11) DEFAULT NULL,
  `productQuantity` int(11) DEFAULT NULL,
  `productRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productmachinemaster`
--

INSERT INTO `productmachinemaster` (`productId`, `productMachineCode`, `vendorId`, `productName`, `productDesription`, `productPrice`, `productQuantity`, `productRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Machine 1', 2, NULL, NULL, NULL, NULL, NULL, '2024-12-07 14:21:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productmaster`
--

CREATE TABLE `productmaster` (
  `productId` int(11) NOT NULL,
  `productCode` varchar(100) DEFAULT NULL,
  `vendorId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `productDesription` varchar(255) DEFAULT NULL,
  `productPrice` int(11) DEFAULT NULL,
  `productQuantity` int(11) DEFAULT NULL,
  `productRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productmaster`
--

INSERT INTO `productmaster` (`productId`, `productCode`, `vendorId`, `productName`, `productDesription`, `productPrice`, `productQuantity`, `productRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Dummy_1', 1, 'Dummy Product 1', 'Demo product Entry', 25000, 3, 'Demo Entry', '2024-11-30 10:49:07', NULL, NULL),
(2, 'Dummy_2', 1, 'Dummy Product 2', 'Dummy 2', 150, 3, 'Demo entry', '2024-11-30 10:49:36', NULL, NULL),
(3, 'Dummy_3', 1, 'Dummy Product 3', 'Demo product entry', 750, 1, 'Demo Entry', '2024-11-30 10:50:01', NULL, NULL),
(4, 'TMP_MTR', 2, 'Temperature Meter', '', 1800, 7, '', '2024-11-30 11:43:38', NULL, NULL),
(5, 'MARUTI_01', 3, 'Maruti DM', '', 15000, 1, '', '2024-11-30 11:48:25', NULL, NULL),
(6, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:08', NULL, NULL),
(7, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:19', NULL, '2024-11-30 11:53:40'),
(8, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:19', NULL, '2024-11-30 11:53:37'),
(9, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:19', NULL, '2024-11-30 11:53:34'),
(10, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:19', NULL, '2024-11-30 11:53:28'),
(11, 's1', 2, 'soras seal', '', 60, 100, '', '2024-11-30 11:53:19', NULL, '2024-11-30 11:53:24'),
(12, 't1', 2, 'top seal', '', 60, 0, '', '2024-11-30 12:00:28', NULL, NULL),
(13, 'o1', 2, 'oil seal(12x24)', '', 40, 0, '', '2024-11-30 12:02:30', NULL, NULL),
(14, 'ac', 2, 'ssr 25a ac', '', 500, 15, '', '2024-11-30 12:12:14', NULL, NULL),
(15, 'M1', 2, 'Galaxy Machine', '', 10, 0, '', '2024-12-07 11:38:36', NULL, NULL),
(16, 'M2', 2, 'Galaxy', '', 10, 0, '', '2024-12-07 11:38:46', NULL, NULL),
(17, 'M3', 2, 'Ghanti', '', 10, 0, '', '2024-12-07 11:38:56', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `productmaster_view`
-- (See below for the actual view)
--
CREATE TABLE `productmaster_view` (
`productId` int(11)
,`productMachineCode` varchar(100)
,`vendorId` int(11)
,`vendorName` varchar(200)
,`productName` varchar(255)
,`productDesription` varchar(255)
,`productPrice` int(11)
,`productQuantity` int(11)
,`productRemark` varchar(255)
,`deleted_at` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `product_view`
-- (See below for the actual view)
--
CREATE TABLE `product_view` (
`productId` int(11)
,`productCode` varchar(100)
,`vendorId` int(11)
,`vendorName` varchar(200)
,`productName` varchar(255)
,`productDesription` varchar(255)
,`productPrice` int(11)
,`productQuantity` int(11)
,`productRemark` varchar(255)
,`deleted_at` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `salarymaster`
--

CREATE TABLE `salarymaster` (
  `salaryId` int(11) NOT NULL,
  `engineerId` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `salaryDate` date DEFAULT NULL,
  `salaryMonth` varchar(255) DEFAULT NULL,
  `salaryRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salarymaster`
--

INSERT INTO `salarymaster` (`salaryId`, `engineerId`, `salary`, `salaryDate`, `salaryMonth`, `salaryRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 4, 50000, '2024-12-07', 'Dec', '', '2024-12-07 11:52:49', NULL, NULL),
(2, 3, 2000, '2025-01-10', 'Jan', '', '2024-12-07 11:53:11', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `salary_view`
-- (See below for the actual view)
--
CREATE TABLE `salary_view` (
`salaryId` int(11)
,`engineerId` int(11)
,`engineerName` varchar(100)
,`salary` int(11)
,`salaryDate` date
,`salaryMonth` varchar(255)
,`salaryRemark` varchar(255)
,`deleted_at` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `sellmaster`
--

CREATE TABLE `sellmaster` (
  `sellId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `sellDate` date DEFAULT NULL,
  `sellPrice` int(11) DEFAULT NULL,
  `sellQuantity` int(11) DEFAULT NULL,
  `sellRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellmaster`
--

INSERT INTO `sellmaster` (`sellId`, `productId`, `customerId`, `sellDate`, `sellPrice`, `sellQuantity`, `sellRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 5, 1, '2024-11-30', 20000, 1, 'Payment pending', '2024-11-30 11:48:49', NULL, NULL),
(2, 15, 2, '2024-12-06', 10000, 0, '', '2024-12-07 11:39:21', NULL, NULL),
(3, 16, 2, '2025-02-10', 10, 0, '', '2024-12-07 11:39:46', NULL, NULL),
(4, 15, 2, '2024-12-07', 10, 0, '', '2024-12-07 11:40:11', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `sell_view`
-- (See below for the actual view)
--
CREATE TABLE `sell_view` (
`sellId` int(11)
,`productId` int(11)
,`productName` varchar(255)
,`customerId` int(11)
,`customerName` varchar(200)
,`sellDate` date
,`sellPrice` int(11)
,`sellQuantity` int(11)
,`sellRemark` varchar(255)
,`deleted_at` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `vendormaster`
--

CREATE TABLE `vendormaster` (
  `vendorId` int(11) NOT NULL,
  `vendorName` varchar(200) DEFAULT NULL,
  `vendorGSTNo` varchar(200) DEFAULT NULL,
  `vendorMobileNo` int(11) DEFAULT NULL,
  `vendorAddress` varchar(255) DEFAULT NULL,
  `vendorRemark` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendormaster`
--

INSERT INTO `vendormaster` (`vendorId`, `vendorName`, `vendorGSTNo`, `vendorMobileNo`, `vendorAddress`, `vendorRemark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Vendor 1', 'GS4546977774', 2147483647, 'Kamrej', 'Demo Entry', '2024-11-30 10:48:35', NULL, NULL),
(2, 'Sanjaybhai (STORE)', 'NA', 2147483647, 'Store', '', '2024-11-30 11:42:52', NULL, NULL),
(3, 'BHARAT', 'GS8855521', 2147483647, '', '', '2024-11-30 11:47:32', '2024-11-30 11:47:42', NULL);

-- --------------------------------------------------------

--
-- Structure for view `challan_view`
--
DROP TABLE IF EXISTS `challan_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `challan_view`  AS SELECT `cm`.`challanId` AS `challanId`, `cm`.`customerId` AS `customerId`, `ct`.`name` AS `customarName`, `cm`.`productId` AS `productId`, `pm`.`productName` AS `productName`, `cm`.`engineerId` AS `engineerId`, `et`.`name` AS `engineerName`, `cm`.`challanPrice` AS `challanPrice`, `cm`.`challanDate` AS `challanDate`, `cm`.`challanRemark` AS `challanRemark`, `cm`.`deleted_at` AS `deleted_at` FROM (((`challanmaster` `cm` join `customer_table` `ct` on(`cm`.`customerId` = `ct`.`customerId`)) join `productmaster` `pm` on(`cm`.`productId` = `pm`.`productId`)) join `employee_table` `et` on(`cm`.`engineerId` = `et`.`id`)) WHERE `cm`.`deleted_at` is null ;

-- --------------------------------------------------------

--
-- Structure for view `productmaster_view`
--
DROP TABLE IF EXISTS `productmaster_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productmaster_view`  AS SELECT `pm`.`productId` AS `productId`, `pm`.`productMachineCode` AS `productMachineCode`, `pm`.`vendorId` AS `vendorId`, `vm`.`vendorName` AS `vendorName`, `pm`.`productName` AS `productName`, `pm`.`productDesription` AS `productDesription`, `pm`.`productPrice` AS `productPrice`, `pm`.`productQuantity` AS `productQuantity`, `pm`.`productRemark` AS `productRemark`, `pm`.`deleted_at` AS `deleted_at` FROM (`productmachinemaster` `pm` join `vendormaster` `vm` on(`pm`.`vendorId` = `vm`.`vendorId`)) WHERE `pm`.`deleted_at` is null ;

-- --------------------------------------------------------

--
-- Structure for view `product_view`
--
DROP TABLE IF EXISTS `product_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `product_view`  AS SELECT `pm`.`productId` AS `productId`, `pm`.`productCode` AS `productCode`, `pm`.`vendorId` AS `vendorId`, `vm`.`vendorName` AS `vendorName`, `pm`.`productName` AS `productName`, `pm`.`productDesription` AS `productDesription`, `pm`.`productPrice` AS `productPrice`, `pm`.`productQuantity` AS `productQuantity`, `pm`.`productRemark` AS `productRemark`, `pm`.`deleted_at` AS `deleted_at` FROM (`productmaster` `pm` join `vendormaster` `vm` on(`pm`.`vendorId` = `vm`.`vendorId`)) WHERE `pm`.`deleted_at` is null ;

-- --------------------------------------------------------

--
-- Structure for view `salary_view`
--
DROP TABLE IF EXISTS `salary_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `salary_view`  AS SELECT `sm`.`salaryId` AS `salaryId`, `sm`.`engineerId` AS `engineerId`, `et`.`name` AS `engineerName`, `sm`.`salary` AS `salary`, `sm`.`salaryDate` AS `salaryDate`, `sm`.`salaryMonth` AS `salaryMonth`, `sm`.`salaryRemark` AS `salaryRemark`, `sm`.`deleted_at` AS `deleted_at` FROM (`salarymaster` `sm` join `employee_table` `et` on(`sm`.`engineerId` = `et`.`id`)) WHERE `sm`.`deleted_at` is null ;

-- --------------------------------------------------------

--
-- Structure for view `sell_view`
--
DROP TABLE IF EXISTS `sell_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sell_view`  AS SELECT `sm`.`sellId` AS `sellId`, `sm`.`productId` AS `productId`, `pm`.`productName` AS `productName`, `sm`.`customerId` AS `customerId`, `ct`.`name` AS `customerName`, `sm`.`sellDate` AS `sellDate`, `sm`.`sellPrice` AS `sellPrice`, `sm`.`sellQuantity` AS `sellQuantity`, `sm`.`sellRemark` AS `sellRemark`, `sm`.`deleted_at` AS `deleted_at` FROM ((`sellmaster` `sm` join `productmaster` `pm` on(`pm`.`productId` = `sm`.`productId`)) join `customer_table` `ct` on(`ct`.`customerId` = `sm`.`customerId`)) WHERE `sm`.`deleted_at` is null ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amcrecord`
--
ALTER TABLE `amcrecord`
  ADD PRIMARY KEY (`amcId`);

--
-- Indexes for table `challanmaster`
--
ALTER TABLE `challanmaster`
  ADD PRIMARY KEY (`challanId`);

--
-- Indexes for table `customer_table`
--
ALTER TABLE `customer_table`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productmachinemaster`
--
ALTER TABLE `productmachinemaster`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `productmaster`
--
ALTER TABLE `productmaster`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `salarymaster`
--
ALTER TABLE `salarymaster`
  ADD PRIMARY KEY (`salaryId`);

--
-- Indexes for table `sellmaster`
--
ALTER TABLE `sellmaster`
  ADD PRIMARY KEY (`sellId`);

--
-- Indexes for table `vendormaster`
--
ALTER TABLE `vendormaster`
  ADD PRIMARY KEY (`vendorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amcrecord`
--
ALTER TABLE `amcrecord`
  MODIFY `amcId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `challanmaster`
--
ALTER TABLE `challanmaster`
  MODIFY `challanId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `customer_table`
--
ALTER TABLE `customer_table`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `productmachinemaster`
--
ALTER TABLE `productmachinemaster`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productmaster`
--
ALTER TABLE `productmaster`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `salarymaster`
--
ALTER TABLE `salarymaster`
  MODIFY `salaryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sellmaster`
--
ALTER TABLE `sellmaster`
  MODIFY `sellId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendormaster`
--
ALTER TABLE `vendormaster`
  MODIFY `vendorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
