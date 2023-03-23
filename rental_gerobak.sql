-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 23, 2023 at 07:05 PM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental_gerobak`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1b0e4500-7023-4835-9abd-b54747999b22', 'Asep', '085720658823', 'kopo', '2023-02-03 19:53:19', NULL, NULL),
('41fe8774-487a-4689-a61b-34f7d55aa6e4', 'pak didin sukataris', '08216584651', 'sukataris', '2023-02-03 19:56:09', '2023-02-03 19:56:17', NULL),
('6032c3f5-e5fa-4063-8c62-518d9cef5b38', 'Ujang', '0878954987895', 'baros kaler', '2023-02-03 19:45:27', NULL, NULL),
('66e30c4f-52e6-46fb-b064-4be5667c85e3', 'Mamat major seven', '12345', 'kolong langit', '2023-02-09 10:21:21', '2023-02-10 20:27:34', NULL),
('6991a6bb-2c66-4e0f-8e4a-45f409eca173', 'dede', '123453', 'kopo kulon', '2023-02-14 12:05:57', NULL, NULL),
('c30363c5-d6ba-4bee-9de8-5dc55fb303a7', 'mbah surip', '12312123', 'tv', '2023-03-14 20:11:00', NULL, NULL),
('f4587426-d942-4c23-ab1e-f4dcedc25cc4', 'pipin arifin', '98555', 'baros', '2023-02-25 13:59:12', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gerobak`
--

CREATE TABLE `gerobak` (
  `id` varchar(36) NOT NULL,
  `code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type_id` int DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'ADA',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gerobak`
--

INSERT INTO `gerobak` (`id`, `code`, `type_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
('04726f4a-9d00-483c-a0c3-bb4a6ee90d74', 'STD-4', 1, 'DISEWA', '2023-02-08 23:16:14', NULL, NULL),
('14fbd111-e9ac-4611-98a5-d73c57e3ccb8', 'STD-17', 1, 'ADA', '2023-03-22 16:12:32', NULL, NULL),
('3006be66-446e-48f9-b22e-050a7d1445ad', 'STD-5', 1, 'ADA', '2023-02-08 23:16:17', NULL, NULL),
('385f359e-9bd2-4f05-adcd-7b94fe58275e', 'STD-11', 1, 'DISEWA', '2023-03-15 10:30:28', NULL, NULL),
('3cc102dc-77bc-4aab-b32b-11c9f7a0873a', 'STD-14', 1, 'DISEWA', '2023-03-15 10:30:42', NULL, NULL),
('44e11a63-f0ec-431b-b4cc-91517c201850', 'KEC-1', 2, 'DISEWA', '2023-02-03 19:52:04', NULL, NULL),
('50780c0b-03f7-46ff-b084-4c748dc56699', 'STD-6', 1, 'ADA', '2023-02-08 23:16:21', NULL, NULL),
('5c0df5d6-47c0-48d2-93e7-77b0473743a6', 'STD-16', 1, 'ADA', '2023-03-22 16:12:29', NULL, NULL),
('61d70475-0683-4182-87f9-82de91d919cf', 'STD-8', 1, 'ADA', '2023-02-25 14:01:51', NULL, NULL),
('6c9efe84-716a-499d-99be-dd66a0496821', 'KEC-2', 2, 'DISEWA', '2023-03-15 10:30:59', NULL, NULL),
('79ccfc51-3419-4812-9413-c35b7448bc9d', 'STD-7', 1, 'ADA', '2023-02-08 23:16:23', NULL, NULL),
('8130df4a-2373-4c2b-9367-d0c7f20273ea', 'STD-3', 1, 'DISEWA', '2023-02-03 19:52:01', NULL, NULL),
('9041dbb2-cc84-478d-a006-632a3c198439', 'SOR-1', 6, 'DISEWA', '2023-02-03 19:52:07', NULL, NULL),
('950836d6-9151-4836-a211-a0c69230f355', 'SOR-2', 6, 'ADA', '2023-02-03 19:52:09', NULL, NULL),
('9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', 'STD-2', 1, 'DISEWA', '2023-02-03 19:52:00', NULL, NULL),
('a1ea5c4f-b3eb-46be-8d04-fd758f77e290', 'STD-9', 1, 'DISEWA', '2023-03-15 10:30:16', NULL, NULL),
('a3c2a949-3735-48fa-b94c-39f37dcfd90f', 'KEC-3', 2, 'ADA', '2023-03-22 16:12:39', NULL, NULL),
('c8be084d-8ccf-4600-827a-e020f6819bfa', 'STD-12', 1, 'DISEWA', '2023-03-15 10:30:30', NULL, NULL),
('e9496b8f-ca8e-482a-8440-5cb791333908', 'STD-1', 1, 'ADA', '2023-02-03 19:45:38', NULL, NULL),
('ea0adb00-49d0-4e16-81c4-fee098faca7e', 'STD-10', 1, 'DISEWA', '2023-03-15 10:30:27', NULL, NULL),
('ec63d6ce-7a69-48e4-ad27-8a052336a90f', 'STD-15', 1, 'ADA', '2023-03-22 16:12:25', NULL, NULL),
('efb39bfe-67e2-49fa-9c61-36487f281bd2', 'SOR-3', 6, 'ADA', '2023-02-25 14:01:42', NULL, NULL),
('f5b6c8a5-cb6e-4979-aad3-6eb6f69af4b5', 'STD-13', 1, 'DISEWA', '2023-03-15 10:30:40', NULL, NULL),
('f6143b90-e1dc-4f3a-bae6-074715d6f8c1', 'SOR-4', 6, 'ADA', '2023-03-22 16:12:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gerobak_type`
--

CREATE TABLE `gerobak_type` (
  `id` int NOT NULL,
  `code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(64) NOT NULL,
  `charge` int NOT NULL,
  `hour_base` int NOT NULL,
  `count` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gerobak_type`
--

INSERT INTO `gerobak_type` (`id`, `code`, `name`, `charge`, `hour_base`, `count`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'STD', 'standar', 25000, 16, 17, '2022-12-15 19:04:33', '2022-12-16 13:21:26', NULL),
(2, 'KEC', 'kecil', 20000, 16, 3, '2022-12-15 19:05:51', '2022-12-15 19:51:26', NULL),
(6, 'SOR', 'sorong', 25000, 16, 4, '2022-12-15 19:54:40', '2022-12-15 19:54:40', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `gerobak_view`
-- (See below for the actual view)
--
CREATE TABLE `gerobak_view` (
`code` varchar(8)
,`created_at` datetime
,`deleted_at` datetime
,`id` varchar(36)
,`name` varchar(64)
,`status` varchar(10)
,`type_id` int
,`updated_at` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `id` varchar(36) NOT NULL,
  `status` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'BERLANGSUNG',
  `customer_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `note` text,
  `last_payment_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`id`, `status`, `customer_id`, `user_id`, `location`, `note`, `last_payment_at`, `created_at`) VALUES
('0b3657f4-ecdf-488d-a2ba-9963c55e176d', 'BERLANGSUNG', '6991a6bb-2c66-4e0f-8e4a-45f409eca173', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'polandia', 'kirim via jnt cargo', NULL, '2023-03-21 21:35:14'),
('0b4ce44d-1fc5-4344-b5b9-5c5ba2f90d9a', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:14:29', '2023-02-08 23:24:16'),
('0f68cdc8-0834-4c25-ade9-b41f65d08b3c', 'OK', 'f4587426-d942-4c23-ab1e-f4dcedc25cc4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-21 08:42:09', '2023-03-16 20:21:57'),
('10a365f5-5479-4e05-a95f-5585eb51a2bf', 'BERLANGSUNG', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'lembur situ', 'ban tambal 2', NULL, '2023-03-22 16:01:47'),
('13a3e9ff-cdd1-4fcf-b434-599879beb0ac', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:12:47', '2023-03-14 20:23:46'),
('1b2fef48-53e1-4122-9ac6-a5a5c02312b0', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:14:14', '2023-02-08 23:17:24'),
('220efb19-f333-45d3-96c6-1a0cdf8b68c3', 'OK', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'dekat sdn sukataris. proyek pak didin', 'ban bocor. ditambal sama yg pinjam', '2023-03-13 11:23:32', '2023-02-03 19:47:58'),
('24aefc9d-5ae1-488e-b6ab-f5763c9057af', 'OK', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'Lembusitu', 'gobag dititip di pak rt', '2023-03-14 20:19:30', '2023-03-14 20:19:00'),
('298790e3-8bce-43f1-a64e-9a81df450f2c', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:14:01', '2023-02-08 23:15:19'),
('34f08001-bc73-4c21-ac6f-15cc800c030b', 'BERLANGSUNG', '66e30c4f-52e6-46fb-b064-4be5667c85e3', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:05:49'),
('41b12fa9-db01-4e58-9ec5-3f4c0eddc1c4', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 15:15:12', '2023-03-09 09:44:36'),
('4dccfac2-b812-42b3-ba44-3e590de9f19b', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'sukataris', '', '2023-03-13 11:47:24', '2023-02-04 19:11:10'),
('680fc0bd-9d74-48e7-af7d-030386b79af6', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:14:18', '2023-03-14 20:24:40'),
('6839e54d-87db-4619-975e-c7d15c1774b5', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 14:44:58', '2023-02-08 23:11:03'),
('6d254e68-09e0-40e7-adba-47689d3782cd', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:13:05', '2023-03-14 16:09:13'),
('72d84d73-a554-4eff-80e4-4a631b11f4db', 'OK', 'f4587426-d942-4c23-ab1e-f4dcedc25cc4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:13:25', '2023-03-14 15:42:42'),
('764151a3-4597-4847-a6d0-880d34ff44e7', 'OK', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:21:03', '2023-03-14 20:20:46'),
('786e281c-735a-4f18-8236-11e917c87e72', 'BERLANGSUNG', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:07:55'),
('78fc2ca3-90d3-4975-b385-3c5eef9838f2', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:14:03', '2023-03-14 20:24:13'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', 'OK', 'c30363c5-d6ba-4bee-9de8-5dc55fb303a7', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 11:53:09', '2023-03-15 10:24:06'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-21 14:58:37', '2023-03-15 14:29:34'),
('8cc66f97-7300-450f-b5d0-fabc677ab0a9', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'samping kantor desa ciberem', 'pinjam singkup 1', '2023-03-13 11:37:26', '2023-02-04 11:11:54'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'OK', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'kp bojong raong', 'singkup 2', '2023-03-15 11:52:53', '2023-03-15 10:23:29'),
('8f92e733-2b38-4b6c-8045-a26fb2bbc3bc', 'OK', '66e30c4f-52e6-46fb-b064-4be5667c85e3', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:14:37', '2023-02-14 12:05:28'),
('ae21d2bb-87b0-47cb-94bf-48f253afca59', 'BERLANGSUNG', 'c30363c5-d6ba-4bee-9de8-5dc55fb303a7', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:08:03'),
('ae6da7dc-8d80-48e3-829c-135c860d1520', 'OK', '6032c3f5-e5fa-4063-8c62-518d9cef5b38', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-22 21:40:54', '2023-03-21 15:02:17'),
('bc0f4548-2f23-422a-8f83-67199fab4fac', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-22 21:40:35', '2023-03-21 15:03:45'),
('c4f76b1c-7be4-48dd-8d6c-ea5a71731d87', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:10:02', '2023-03-14 20:21:21'),
('c565497c-566e-41db-9bcc-919ff1cf1ae8', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:10:14', '2023-03-14 20:23:15'),
('da906684-556f-45a6-8952-d5a3b95f8c93', 'BERLANGSUNG', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:09:39'),
('dd9a60ca-ba9d-449c-9fcc-13a34a6c661c', 'BERLANGSUNG', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:06:21'),
('e6724410-fbce-4ded-9fc8-925da07db014', 'OK', 'c30363c5-d6ba-4bee-9de8-5dc55fb303a7', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'denpasar, bali', '', '2023-03-22 21:41:15', '2023-03-22 16:03:07'),
('eb63210e-42d9-4d03-abab-0801518d6c44', 'BERLANGSUNG', '66e30c4f-52e6-46fb-b064-4be5667c85e3', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', NULL, '2023-03-21 15:07:47'),
('f2a3e094-044a-41ad-b40c-b7d537d7319c', 'OK', '66e30c4f-52e6-46fb-b064-4be5667c85e3', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 14:28:58', '2023-03-15 11:55:32'),
('f3f3b5cc-e4fb-4c70-bacc-d87842e94774', 'OK', 'c30363c5-d6ba-4bee-9de8-5dc55fb303a7', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-21 21:25:19', '2023-03-21 15:00:49'),
('f444c378-3429-4d25-be0c-b0a5c501f232', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:14:11', '2023-03-14 20:24:29'),
('fc0871c4-7b26-4e15-98fd-c024e5af5567', 'OK', '41fe8774-487a-4689-a61b-34f7d55aa6e4', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-15 00:10:46', '2023-03-14 20:23:31'),
('fee79c7d-7b35-4511-abee-d1b343f4ed23', 'OK', '1b0e4500-7023-4835-9abd-b54747999b22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', '', '', '2023-03-14 20:14:22', '2023-02-08 23:21:18');

-- --------------------------------------------------------

--
-- Table structure for table `rent_detail`
--

CREATE TABLE `rent_detail` (
  `rent_id` varchar(36) DEFAULT NULL,
  `gerobak_id` varchar(36) DEFAULT NULL,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  `status` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'BERLANGSUNG',
  `sub_amount` int NOT NULL,
  `info` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rent_detail`
--

INSERT INTO `rent_detail` (`rent_id`, `gerobak_id`, `start_time`, `end_time`, `user_id`, `status`, `sub_amount`, `info`, `created_at`) VALUES
('220efb19-f333-45d3-96c6-1a0cdf8b68c3', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-02-03 19:47:58', '2023-03-13 11:23:32', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 0, NULL, '2023-02-03 19:47:58'),
('8cc66f97-7300-450f-b5d0-fabc677ab0a9', '9041dbb2-cc84-478d-a006-632a3c198439', '2023-02-04 11:11:54', '2023-03-13 11:37:26', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1387000, NULL, '2023-02-04 11:11:54'),
('8cc66f97-7300-450f-b5d0-fabc677ab0a9', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-02-04 11:11:54', '2023-03-13 11:37:26', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1387000, NULL, '2023-02-04 11:11:54'),
('4dccfac2-b812-42b3-ba44-3e590de9f19b', '950836d6-9151-4836-a211-a0c69230f355', '2023-02-04 19:11:10', '2023-03-13 11:47:24', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1375000, NULL, '2023-02-04 19:11:10'),
('6839e54d-87db-4619-975e-c7d15c1774b5', '44e11a63-f0ec-431b-b4cc-91517c201850', '2023-02-08 23:11:03', '2023-03-14 14:44:58', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1008000, NULL, '2023-02-08 23:11:03'),
('298790e3-8bce-43f1-a64e-9a81df450f2c', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-02-08 23:15:19', '2023-03-14 20:14:01', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1275000, NULL, '2023-02-08 23:15:19'),
('1b2fef48-53e1-4122-9ac6-a5a5c02312b0', '79ccfc51-3419-4812-9413-c35b7448bc9d', '2023-02-08 23:17:24', '2023-03-14 20:14:14', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1275000, NULL, '2023-02-08 23:17:24'),
('fee79c7d-7b35-4511-abee-d1b343f4ed23', '50780c0b-03f7-46ff-b084-4c748dc56699', '2023-02-08 23:21:18', '2023-03-14 20:14:22', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1275000, NULL, '2023-02-08 23:21:18'),
('0b4ce44d-1fc5-4344-b5b9-5c5ba2f90d9a', '3006be66-446e-48f9-b22e-050a7d1445ad', '2023-02-08 23:24:16', '2023-03-14 20:14:29', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1275000, NULL, '2023-02-08 23:24:16'),
('8f92e733-2b38-4b6c-8045-a26fb2bbc3bc', '04726f4a-9d00-483c-a0c3-bb4a6ee90d74', '2023-02-14 12:05:28', '2023-03-14 20:14:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 1062000, NULL, '2023-02-14 12:05:28'),
('41b12fa9-db01-4e58-9ec5-3f4c0eddc1c4', 'efb39bfe-67e2-49fa-9c61-36487f281bd2', '2023-03-09 09:44:36', '2023-03-14 15:15:12', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 200000, NULL, '2023-03-09 09:44:36'),
('41b12fa9-db01-4e58-9ec5-3f4c0eddc1c4', '61d70475-0683-4182-87f9-82de91d919cf', '2023-03-09 09:44:36', '2023-03-14 15:15:12', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 200000, NULL, '2023-03-09 09:44:36'),
('72d84d73-a554-4eff-80e4-4a631b11f4db', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-03-14 15:42:42', '2023-03-14 20:13:25', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 15:42:42'),
('72d84d73-a554-4eff-80e4-4a631b11f4db', '9041dbb2-cc84-478d-a006-632a3c198439', '2023-03-14 15:42:42', '2023-03-14 20:13:25', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 15:42:42'),
('6d254e68-09e0-40e7-adba-47689d3782cd', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-14 16:09:13', '2023-03-14 20:13:05', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 16:09:13'),
('24aefc9d-5ae1-488e-b6ab-f5763c9057af', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-14 20:19:00', '2023-03-14 20:19:30', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:19:00'),
('24aefc9d-5ae1-488e-b6ab-f5763c9057af', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-14 20:19:00', '2023-03-14 20:19:30', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:19:00'),
('24aefc9d-5ae1-488e-b6ab-f5763c9057af', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-03-14 20:19:00', '2023-03-14 20:19:30', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:19:00'),
('764151a3-4597-4847-a6d0-880d34ff44e7', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-14 20:20:46', '2023-03-14 20:21:03', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:20:46'),
('764151a3-4597-4847-a6d0-880d34ff44e7', '44e11a63-f0ec-431b-b4cc-91517c201850', '2023-03-14 20:20:46', '2023-03-14 20:21:03', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 20000, NULL, '2023-03-14 20:20:46'),
('764151a3-4597-4847-a6d0-880d34ff44e7', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-14 20:20:46', '2023-03-14 20:21:03', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:20:46'),
('c4f76b1c-7be4-48dd-8d6c-ea5a71731d87', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-14 20:21:21', '2023-03-15 00:10:02', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:21:21'),
('c565497c-566e-41db-9bcc-919ff1cf1ae8', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-14 20:23:15', '2023-03-15 00:10:14', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:23:15'),
('fc0871c4-7b26-4e15-98fd-c024e5af5567', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-14 20:23:31', '2023-03-15 00:10:46', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:23:31'),
('13a3e9ff-cdd1-4fcf-b434-599879beb0ac', '61d70475-0683-4182-87f9-82de91d919cf', '2023-03-14 20:23:46', '2023-03-15 00:12:47', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:23:46'),
('78fc2ca3-90d3-4975-b385-3c5eef9838f2', 'efb39bfe-67e2-49fa-9c61-36487f281bd2', '2023-03-14 20:24:13', '2023-03-15 00:14:03', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:24:13'),
('f444c378-3429-4d25-be0c-b0a5c501f232', '04726f4a-9d00-483c-a0c3-bb4a6ee90d74', '2023-03-14 20:24:29', '2023-03-15 00:14:11', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:24:29'),
('680fc0bd-9d74-48e7-af7d-030386b79af6', '79ccfc51-3419-4812-9413-c35b7448bc9d', '2023-03-14 20:24:40', '2023-03-15 00:14:18', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-14 20:24:40'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-15 10:23:29', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:23:29'),
('8e33e101-6703-4937-95ca-0e601483e1af', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-15 10:23:29', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:23:29'),
('8e33e101-6703-4937-95ca-0e601483e1af', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-03-15 10:23:29', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:23:29'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '9041dbb2-cc84-478d-a006-632a3c198439', '2023-03-15 10:24:06', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:24:06'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-15 10:24:06', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:24:06'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '3006be66-446e-48f9-b22e-050a7d1445ad', '2023-03-15 10:24:06', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:24:06'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '04726f4a-9d00-483c-a0c3-bb4a6ee90d74', '2023-03-15 10:24:06', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 10:24:06'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '44e11a63-f0ec-431b-b4cc-91517c201850', '2023-03-15 11:39:18', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 20000, NULL, '2023-03-15 11:39:18'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '50780c0b-03f7-46ff-b084-4c748dc56699', '2023-03-15 11:40:49', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:40:49'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '79ccfc51-3419-4812-9413-c35b7448bc9d', '2023-03-15 11:40:49', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:40:49'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', 'efb39bfe-67e2-49fa-9c61-36487f281bd2', '2023-03-15 11:40:49', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:40:49'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '61d70475-0683-4182-87f9-82de91d919cf', '2023-03-15 11:40:49', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:40:49'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', 'a1ea5c4f-b3eb-46be-8d04-fd758f77e290', '2023-03-15 11:40:49', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:40:49'),
('7c535296-172b-4147-a67c-31ea8c2a0a02', '6c9efe84-716a-499d-99be-dd66a0496821', '2023-03-15 11:42:37', '2023-03-15 11:53:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 20000, NULL, '2023-03-15 11:42:37'),
('8e33e101-6703-4937-95ca-0e601483e1af', '385f359e-9bd2-4f05-adcd-7b94fe58275e', '2023-03-15 11:47:20', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:47:20'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'f5b6c8a5-cb6e-4979-aad3-6eb6f69af4b5', '2023-03-15 11:50:13', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:50:13'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'f5b6c8a5-cb6e-4979-aad3-6eb6f69af4b5', '2023-03-15 11:50:19', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:50:19'),
('8e33e101-6703-4937-95ca-0e601483e1af', '3cc102dc-77bc-4aab-b32b-11c9f7a0873a', '2023-03-15 11:50:19', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:50:19'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'c8be084d-8ccf-4600-827a-e020f6819bfa', '2023-03-15 11:51:18', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:51:18'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'ea0adb00-49d0-4e16-81c4-fee098faca7e', '2023-03-15 11:52:28', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:52:28'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'ea0adb00-49d0-4e16-81c4-fee098faca7e', '2023-03-15 11:52:37', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:52:37'),
('8e33e101-6703-4937-95ca-0e601483e1af', 'ea0adb00-49d0-4e16-81c4-fee098faca7e', '2023-03-15 11:52:43', '2023-03-15 11:52:53', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:52:43'),
('f2a3e094-044a-41ad-b40c-b7d537d7319c', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-15 11:55:32', '2023-03-15 14:28:58', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:55:32'),
('f2a3e094-044a-41ad-b40c-b7d537d7319c', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-15 11:59:59', '2023-03-15 14:28:58', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 11:59:59'),
('f2a3e094-044a-41ad-b40c-b7d537d7319c', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-03-15 12:02:59', '2023-03-15 14:28:58', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-15 12:02:59'),
('f2a3e094-044a-41ad-b40c-b7d537d7319c', '44e11a63-f0ec-431b-b4cc-91517c201850', '2023-03-15 14:20:18', '2023-03-15 14:28:58', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 20000, NULL, '2023-03-15 14:20:18'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '3006be66-446e-48f9-b22e-050a7d1445ad', '2023-03-15 14:29:34', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 225000, NULL, '2023-03-15 14:29:34'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '50780c0b-03f7-46ff-b084-4c748dc56699', '2023-03-15 14:29:34', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 225000, NULL, '2023-03-15 14:29:34'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '6c9efe84-716a-499d-99be-dd66a0496821', '2023-03-16 09:32:39', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 160000, NULL, '2023-03-16 09:32:39'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '04726f4a-9d00-483c-a0c3-bb4a6ee90d74', '2023-03-16 10:07:00', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 200000, NULL, '2023-03-16 10:07:00'),
('0f68cdc8-0834-4c25-ade9-b41f65d08b3c', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-16 20:21:57', '2023-03-21 08:42:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 175000, NULL, '2023-03-16 20:21:57'),
('0f68cdc8-0834-4c25-ade9-b41f65d08b3c', 'efb39bfe-67e2-49fa-9c61-36487f281bd2', '2023-03-16 20:22:12', '2023-03-21 08:42:09', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 175000, NULL, '2023-03-16 20:22:12'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-21 08:54:21', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-21 08:54:21'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-21 08:54:21', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-21 08:54:21'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '9041dbb2-cc84-478d-a006-632a3c198439', '2023-03-21 08:54:21', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-21 08:54:21'),
('813c73ea-35bb-4e3f-875c-0e47abefe9bf', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-21 14:26:35', '2023-03-21 14:58:37', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-21 14:26:35'),
('f3f3b5cc-e4fb-4c70-bacc-d87842e94774', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-21 15:00:49', '2023-03-21 21:25:19', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-21 15:00:49'),
('ae6da7dc-8d80-48e3-829c-135c860d1520', 'e9496b8f-ca8e-482a-8440-5cb791333908', '2023-03-21 15:02:17', '2023-03-22 21:40:54', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 50000, NULL, '2023-03-21 15:02:17'),
('bc0f4548-2f23-422a-8f83-67199fab4fac', '3006be66-446e-48f9-b22e-050a7d1445ad', '2023-03-21 15:03:45', '2023-03-22 21:40:35', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 50000, NULL, '2023-03-21 15:03:45'),
('34f08001-bc73-4c21-ac6f-15cc800c030b', '9041dbb2-cc84-478d-a006-632a3c198439', '2023-03-21 15:05:49', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-21 15:05:49'),
('dd9a60ca-ba9d-449c-9fcc-13a34a6c661c', '8130df4a-2373-4c2b-9367-d0c7f20273ea', '2023-03-21 15:06:21', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 31000, NULL, '2023-03-21 15:06:21'),
('eb63210e-42d9-4d03-abab-0801518d6c44', '44e11a63-f0ec-431b-b4cc-91517c201850', '2023-03-21 15:07:47', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 20000, NULL, '2023-03-21 15:07:47'),
('786e281c-735a-4f18-8236-11e917c87e72', '04726f4a-9d00-483c-a0c3-bb4a6ee90d74', '2023-03-21 15:07:55', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-21 15:07:55'),
('ae21d2bb-87b0-47cb-94bf-48f253afca59', '9cdf9175-7713-4b8e-a4b8-2fe885d8fe94', '2023-03-21 15:08:03', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-21 15:08:03'),
('da906684-556f-45a6-8952-d5a3b95f8c93', 'f5b6c8a5-cb6e-4979-aad3-6eb6f69af4b5', '2023-03-21 15:09:39', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 31000, NULL, '2023-03-21 15:09:39'),
('34f08001-bc73-4c21-ac6f-15cc800c030b', 'ea0adb00-49d0-4e16-81c4-fee098faca7e', '2023-03-21 21:24:26', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-21 21:24:26'),
('0b3657f4-ecdf-488d-a2ba-9963c55e176d', '6c9efe84-716a-499d-99be-dd66a0496821', '2023-03-21 21:35:14', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 22000, NULL, '2023-03-21 21:35:14'),
('0b3657f4-ecdf-488d-a2ba-9963c55e176d', '3cc102dc-77bc-4aab-b32b-11c9f7a0873a', '2023-03-21 21:35:14', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 28000, NULL, '2023-03-21 21:35:14'),
('10a365f5-5479-4e05-a95f-5585eb51a2bf', 'c8be084d-8ccf-4600-827a-e020f6819bfa', '2023-03-22 16:01:47', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-22 16:01:47'),
('10a365f5-5479-4e05-a95f-5585eb51a2bf', '385f359e-9bd2-4f05-adcd-7b94fe58275e', '2023-03-22 16:01:47', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-22 16:01:47'),
('10a365f5-5479-4e05-a95f-5585eb51a2bf', 'a1ea5c4f-b3eb-46be-8d04-fd758f77e290', '2023-03-22 16:01:47', NULL, '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'BERLANGSUNG', 25000, NULL, '2023-03-22 16:01:47'),
('e6724410-fbce-4ded-9fc8-925da07db014', '950836d6-9151-4836-a211-a0c69230f355', '2023-03-22 16:03:07', '2023-03-22 21:41:15', '76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'OK', 25000, NULL, '2023-03-22 16:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `access` varchar(8) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `phone`, `access`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
('44e71728-b48b-46ac-bc7e-1f6babae7baf', 'Yafi', 'abyan', '21c7d60393c4ee5952d44dc376c7d83ef70f424f', '082295429790', 'user', '1678980015081.jpg', '2023-03-16 22:20:15', NULL, NULL),
('76994af7-23dd-4c1c-a4b7-a3ac67d30328', 'admin', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '087720456447', 'admin', NULL, '2022-12-15 10:21:44', '2022-12-15 10:21:44', NULL);

-- --------------------------------------------------------

--
-- Structure for view `gerobak_view`
--
DROP TABLE IF EXISTS `gerobak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`abyan`@`localhost` SQL SECURITY DEFINER VIEW `gerobak_view`  AS SELECT `g`.`id` AS `id`, `g`.`code` AS `code`, `g`.`type_id` AS `type_id`, `g`.`status` AS `status`, `g`.`created_at` AS `created_at`, `g`.`updated_at` AS `updated_at`, `g`.`deleted_at` AS `deleted_at`, `gt`.`name` AS `name` FROM (`gerobak` `g` join `gerobak_type` `gt` on((`g`.`type_id` = `gt`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gerobak`
--
ALTER TABLE `gerobak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `gerobak_type`
--
ALTER TABLE `gerobak_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rent_detail`
--
ALTER TABLE `rent_detail`
  ADD KEY `rent_id` (`rent_id`),
  ADD KEY `gerobak_id` (`gerobak_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gerobak_type`
--
ALTER TABLE `gerobak_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gerobak`
--
ALTER TABLE `gerobak`
  ADD CONSTRAINT `gerobak_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `gerobak_type` (`id`);

--
-- Constraints for table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `rent_detail`
--
ALTER TABLE `rent_detail`
  ADD CONSTRAINT `rent_detail_ibfk_1` FOREIGN KEY (`rent_id`) REFERENCES `rent` (`id`),
  ADD CONSTRAINT `rent_detail_ibfk_2` FOREIGN KEY (`gerobak_id`) REFERENCES `gerobak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
