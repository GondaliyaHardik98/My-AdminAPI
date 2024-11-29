-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 06:04 PM
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
(1, 3, '2025-11-28', NULL, '2024-11-10 20:24:39', NULL, NULL),
(2, 4, '2025-11-13', NULL, '2024-11-10 21:01:51', NULL, NULL),
(3, 5, '2025-11-13', NULL, '2024-11-10 21:02:09', NULL, '2024-11-11 10:17:21'),
(4, 6, '2025-11-29', NULL, '2024-11-27 22:12:06', NULL, NULL);

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
(2, 2, 6, 3, 25, '2024-11-12', 'a', '2024-11-10 14:41:33', '2024-11-27 21:58:52', NULL),
(3, 1, 6, 4, 362, '2024-11-19', 'csfs', '2024-11-10 14:41:33', '2024-11-12 01:21:58', NULL),
(8, 4, 5, 4, 25, '2024-11-11', 'abgh', '2024-11-11 16:39:52', '2024-11-12 01:21:33', '2024-11-27 21:47:37'),
(9, 4, 6, 3, 30, '2024-11-14', 'bbff', '2024-11-11 16:39:52', '2024-11-12 01:21:33', NULL),
(10, 4, 5, 4, 25, '2024-11-13', 'abdd', '2024-11-11 16:43:24', '2024-11-12 01:21:33', '2024-11-27 21:48:16'),
(11, 4, 6, 5, 30, '2024-11-21', 'bbdb', '2024-11-11 16:43:24', '2024-11-12 01:21:33', '2024-11-12 09:11:10'),
(12, 2, 6, 4, 25121, '2024-11-13', 's', '2024-11-11 16:48:21', '2024-11-27 21:58:52', NULL),
(13, 2, 6, 4, 322, '2024-11-12', 'b', '2024-11-11 16:48:21', '2024-11-27 21:58:52', NULL),
(14, 3, 5, 3, 25, '2024-11-14', 'a', '2024-11-11 17:06:29', NULL, NULL),
(15, 3, 6, 5, 352, '2024-11-12', 'b', '2024-11-11 17:06:29', NULL, NULL),
(16, 1, 5, 3, 15112, '2024-11-14', 'sfsfsf', '2024-11-12 01:21:58', NULL, NULL),
(17, 5, 6, 4, 10000, '2024-11-27', '1st', '2024-11-27 21:49:20', '2024-11-27 21:59:25', '2024-11-27 22:10:34'),
(18, 5, 8, 5, 5000, '2024-11-28', '2nd', '2024-11-27 21:49:20', '2024-11-27 21:59:25', '2024-11-27 22:10:22'),
(19, 2, 7, 3, 2522, '2024-11-27', 'j;l', '2024-11-27 21:58:39', '2024-11-27 21:58:52', '2024-11-27 22:10:26'),
(20, 3, 6, 4, 25, '2024-11-28', '25', '2024-11-27 22:07:31', NULL, '2024-11-27 22:10:31'),
(21, 2, 6, 3, 25, '2024-11-28', 'ada', '2024-11-27 22:10:12', NULL, '2024-11-27 22:10:28');

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
(1, 'Hardik Gondaliya', '4135', 24258, 'fs', 'sfs', '2024-10-29 22:08:00', '2024-11-27 21:22:26', '2024-11-27 21:29:14'),
(2, 'Mitesh Boricha', '252525', 325236, 'secound test', 'done o', '2024-10-30 11:28:43', '2024-11-27 21:36:33', NULL),
(3, 'Niraj Gondaliya', '522ll', 25641, 'Nansad road, kamrej, surat 394180', 'test 2', '2024-10-30 12:25:04', NULL, NULL),
(4, 'Kaushal Gondaliya', '41', 24, 'fslkkmn', 'sfs njhn', '2024-10-30 12:25:30', NULL, NULL),
(5, 'porch SERVICE', '251625', 956425, 'address', 'markss', '2024-11-27 21:15:47', NULL, NULL),
(6, 'porch SERVICE', '251625', 956425, 'address', 'markss', '2024-11-27 21:17:37', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `contact_details` text DEFAULT NULL,
  `emergency_contact_1` int(11) DEFAULT NULL,
  `emergency_contact_2` int(11) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `id_proof` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`id`, `name`, `salary`, `contact_details`, `emergency_contact_1`, `emergency_contact_2`, `photo`, `id_proof`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'John Doe', 50000, 'john@example.com', 1234567890, 987654321, 'photo_url', 'proof123', '2024-10-29 17:22:08', NULL, '2024-11-05 10:04:42'),
(2, 'John Doe33', 50006, 'john@example.com', 12345678, 987654321, 'photo_url', 'proof123', '2024-10-29 17:31:47', '2024-11-05 10:06:29', '2024-11-06 17:25:02'),
(3, 'John Doe', 500005, 'john@example.com', 1234567890, 987654321, 'photo_url', 'proof123', '2024-10-29 19:00:00', '2024-11-27 21:36:13', NULL),
(4, 'Niraj Gondaliya', 250000, '3265235', 21235252, 3254652, 'uploads/employees/photos/1730383472685-152679047.png', 'uploads/employees/documents/1730383472692-295506688.png', '2024-10-31 19:34:32', NULL, NULL),
(5, 'Hardik Gondaliya', 2500000, '3265235', 1234567890, 3254652, 'uploads/employees/photos/1730788368677-957887924.JPG', 'uploads/employees/documents/1730788368716-259490792.JPG', '2024-11-05 12:02:48', NULL, NULL),
(6, 'Mitesh Boricha', 25800, '3265235', 1234567890, 3254652, 'uploads/employees/photos/1732350464381-784683583.png', 'uploads/employees/documents/1732350464392-891090265.png', '2024-11-23 13:57:44', NULL, NULL),
(7, 'porch SERVICE', 2563, 'john@example.com', 1234567890, 3254652, NULL, NULL, '2024-11-27 21:35:57', NULL, '2024-11-27 21:36:02');

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
(4, 'TEST', 2, 'NEW Pkj', 'DS', 300, 210, 'TEST', '2024-11-09 22:32:34', NULL, '2024-11-09 23:43:51'),
(5, 'NDH202fr', 2, 'NEW P', 'New Product', 2655, 50, 'DONEvv', '2024-11-09 23:28:50', '2024-11-09 23:44:12', '2024-11-27 21:45:53'),
(6, 'VALYYS', 11, 'NNDDSH', 'New Product VALS', 5033, 369, 'TEST done', '2024-11-09 23:29:33', '2024-11-27 21:45:49', NULL),
(7, 'TEST202', 12, 'NEW P', 'check done', 2500, 3000, 'check done', '2024-11-27 21:45:37', NULL, NULL),
(8, 'hardik', 2, 'NEW Product', 'done', 50000, 10, 'done', '2024-11-27 21:47:14', NULL, NULL);

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
(1, 3, 25123, '2024-11-29', 'FEB', 'RHISadad', '2024-11-10 16:59:16', '2024-11-10 17:38:40', '2024-11-10 17:53:16'),
(2, 4, 1524, '2024-11-17', 'FEB', 'RHISadad da', '2024-11-10 17:38:59', '2024-11-27 22:27:35', NULL),
(3, 5, 6524, '2024-11-20', 'JAN', 'RHIS', '2024-11-10 17:39:14', '2024-11-27 22:25:37', NULL);

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
(3, 8, 4, '2024-11-28', 113515, 32, 'adadada', '2024-11-10 20:24:39', NULL, NULL),
(4, 5, 1, '2024-11-13', 20512, 23, 'done Save', '2024-11-10 21:01:51', NULL, NULL),
(5, 6, 2, '2024-11-13', 2055, 32, 'done Save3', '2024-11-10 21:02:09', NULL, '2024-11-11 10:17:21'),
(6, 6, 4, '2024-11-29', 352, 51, 'hardik', '2024-11-27 22:12:06', NULL, NULL);

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
(1, 'Hardik', 'dadad215412', 95864845, 'Suart', 'this is remark', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Hardik Gondaliya', 'ada5', 235, 'adda', 'adadad', '2024-11-07 19:59:27', '2024-11-27 21:37:19', NULL),
(10, 'JAYESH', 'JAS2525HSS', 800000065, 'KAMREJ', 'Kamrej main vandor', '2024-11-09 22:50:35', NULL, '2024-11-27 21:43:05'),
(11, 'vallabhbhai', 'bal251546K', 9000025, 'nansad', 'kamrej second main vendor', '2024-11-09 22:50:35', NULL, NULL),
(12, 'adadad', 'Kaus1234', 1515, 'adadada', '2ddad', '2024-11-10 13:57:07', NULL, NULL),
(13, 'kaushal', '25da25', 958641425, 'kamrej', 'done', '2024-11-27 21:42:58', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure for view `challan_view`
--
DROP TABLE IF EXISTS `challan_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `challan_view`  AS SELECT `cm`.`challanId` AS `challanId`, `cm`.`customerId` AS `customerId`, `ct`.`name` AS `customarName`, `cm`.`productId` AS `productId`, `pm`.`productName` AS `productName`, `cm`.`engineerId` AS `engineerId`, `et`.`name` AS `engineerName`, `cm`.`challanPrice` AS `challanPrice`, `cm`.`challanDate` AS `challanDate`, `cm`.`challanRemark` AS `challanRemark`, `cm`.`deleted_at` AS `deleted_at` FROM (((`challanmaster` `cm` join `customer_table` `ct` on(`cm`.`customerId` = `ct`.`customerId`)) join `productmaster` `pm` on(`cm`.`productId` = `pm`.`productId`)) join `employee_table` `et` on(`cm`.`engineerId` = `et`.`id`)) WHERE `cm`.`deleted_at` is null ;

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
  MODIFY `challanId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `customer_table`
--
ALTER TABLE `customer_table`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `productmaster`
--
ALTER TABLE `productmaster`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `salarymaster`
--
ALTER TABLE `salarymaster`
  MODIFY `salaryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sellmaster`
--
ALTER TABLE `sellmaster`
  MODIFY `sellId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vendormaster`
--
ALTER TABLE `vendormaster`
  MODIFY `vendorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
