-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-06-14 05:35:35
-- サーバのバージョン： 10.4.25-MariaDB
-- PHP のバージョン: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `holopper`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `model`
--

INSERT INTO `model` (`id`, `user_id`, `model_id`, `title`, `description`, `created_date`, `updated_date`) VALUES
(1, 123456789, 638605621, '猫', 'かわいいでしょ', '2024-06-14 04:57:58', '2024-06-14 04:57:58'),
(2, 123456789, 775600223, '刀', '切れ味抜群', '2024-06-14 05:04:03', '2024-06-14 05:04:03'),
(3, 123456789, 605172906, 'チーズ', 'おいしそう', '2024-06-14 05:08:52', '2024-06-14 05:08:52');

-- --------------------------------------------------------

--
-- テーブルの構造 `model_path`
--

CREATE TABLE `model_path` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `img_file_name` varchar(255) NOT NULL,
  `model_file_name` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `model_path`
--

INSERT INTO `model_path` (`id`, `model_id`, `img_file_name`, `model_file_name`, `created_date`) VALUES
(1, 638605621, '1718333878_830 (2).png', '1718333878_1717986520_猫.glb', '2024-06-14 04:57:58'),
(2, 775600223, '1718334243_ポーン_赤.png', '1718334243_刀.glb', '2024-06-14 05:04:03'),
(3, 605172906, '1718334532_映像が宙に浮いて見える！LED ホログラムディスプレイファンで広告効果は絶大！ 1-38 screenshot.png', '1718334532_チーズ.glb', '2024-06-14 05:08:52');

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mail` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `user`
--

INSERT INTO `user` (`id`, `user_id`, `name`, `mail`, `password`, `created_date`, `updated_date`) VALUES
(1, 123456789, 'テスト', 'test@test.com', '$2y$10$ovD9MhNKXGRn.DIqXbm82OYnnfi9sunqDQhkddZXbkvCCWXuZf.Oi', '2024-06-14 04:56:35', '2024-06-14 04:56:35');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `model_path`
--
ALTER TABLE `model_path`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `model_path`
--
ALTER TABLE `model_path`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
