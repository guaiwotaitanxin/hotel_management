/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.40 : Database - hotel
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hotel` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hotel`;

/*Table structure for table `authority` */

DROP TABLE IF EXISTS `authority`;

CREATE TABLE `authority` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `authority_name` varchar(20) DEFAULT NULL COMMENT '权限名',
  `authority_url` varchar(200) DEFAULT '#' COMMENT '权限跳转地址',
  `parent` int(20) DEFAULT '0' COMMENT '记住上级的主键，0为一级节点',
  `flag` varchar(2) DEFAULT '0' COMMENT '1超级权限，0普通权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

/*Data for the table `authority` */

insert  into `authority`(`id`,`authority_name`,`authority_url`,`parent`,`flag`) values (1,'入住管理','#',0,'0'),(2,'订单管理','#',0,'0'),(3,'会员管理','#',0,'0'),(4,'客房管理','#',0,'0'),(5,'系统用户管理','#',0,'0'),(6,'客人意见','#',0,'0'),(11,'入住信息管理','model/toShowInRoomInfo',1,'0'),(12,'入住信息添加','model/toSaveInRoomInfo',1,'0'),(13,'消费记录','model/toShowRoomSale',1,'0'),(21,'订单查询','model/toShowOrders',2,'0'),(31,'会员信息管理','model/toShowVip',3,'0'),(32,'添加会员','model/toSaveVip',3,'0'),(41,'客房信息管理','model/toShowRooms',4,'0'),(42,'房型信息管理','model/toShowRoomType',4,'0'),(51,'角色信息管理','model/toShowRole',5,'0'),(52,'用户信息管理','model/toShowUser',5,'0'),(53,'添加用户','model/toSaveUser',5,'0'),(61,'客人意见','model/toShowIdd',6,'0');

/*Table structure for table `in_room_info` */

DROP TABLE IF EXISTS `in_room_info`;

CREATE TABLE `in_room_info` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_name` varchar(40) DEFAULT NULL COMMENT '客人姓名',
  `gender` varchar(2) DEFAULT '1' COMMENT '性别(1男 0女)',
  `is_vip` varchar(2) DEFAULT '0' COMMENT '0普通，1vip',
  `idcard` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `money` float(10,2) DEFAULT NULL COMMENT '押金',
  `create_date` datetime DEFAULT NULL COMMENT '入住时间',
  `room_id` int(20) DEFAULT NULL COMMENT '房间表主键',
  `status` varchar(2) DEFAULT '1' COMMENT '显示状态：1显示，0隐藏',
  `out_room_status` varchar(2) DEFAULT '0' COMMENT '退房状态：0未退房 1已经退房',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Data for the table `in_room_info` */

insert  into `in_room_info`(`id`,`customer_name`,`gender`,`is_vip`,`idcard`,`phone`,`money`,`create_date`,`room_id`,`status`,`out_room_status`) values (17,'独角大仙','1','0','421234199909090099','13212321232',200.00,'2019-07-12 08:27:28',2,'1','1'),(18,'莫容龙城','1','1','421123198912120012','13212321232',800.00,'2019-07-06 08:27:52',8,'1','1'),(30,'貂蝉','0','0','421101016809098989','15699990008',900.00,'2019-07-19 15:06:42',3,'1','1'),(31,'貂蝉','0','1','421101016809098989','15699990008',800.00,'2019-07-19 15:07:39',4,'1','1'),(32,'玉帝','1','1','101101000001010001','13499998888',200.00,'2019-07-20 08:21:33',3,'1','1'),(33,'玉帝','1','1','101101000001010001','13499998888',500.00,'2019-07-20 08:23:31',7,'1','1'),(34,'貂蝉','0','1','421101016809098989','15699998899',600.00,'2019-07-20 08:40:52',6,'1','1'),(35,'熊佳琳','','1','423456123456123456','13812345677',500.00,'2019-11-21 20:26:21',8,'0','1'),(36,'张三','1','1','421122199710224214','13871593416',999.00,'2019-11-29 14:42:04',24,'1','1');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_num` varchar(50) DEFAULT NULL COMMENT '订单编号',
  `order_money` double(10,2) DEFAULT NULL COMMENT '订单总价',
  `remark` varchar(100) DEFAULT NULL COMMENT '订单备注',
  `order_status` varchar(2) DEFAULT '0' COMMENT '0未结算，1已结算',
  `iri_id` int(20) DEFAULT NULL COMMENT '入住信息主键',
  `create_date` datetime DEFAULT NULL COMMENT '下单时间',
  `flag` varchar(2) DEFAULT '1' COMMENT '1显示，0隐藏',
  `order_other` varchar(100) DEFAULT NULL COMMENT '退房时的客人信息时间等等',
  `order_price` varchar(100) DEFAULT NULL COMMENT '退房时的各种金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`id`,`order_num`,`order_money`,`remark`,`order_status`,`iri_id`,`create_date`,`flag`,`order_other`,`order_price`) values (26,'20190714101518340139',342.00,'fff','0',17,'2019-07-14 10:15:18','1','8201,独角大仙,2019/07/12 08:27:28,2019/07/14 10:14:41,2','140,90,252.00'),(28,'20190714102326231267',3688.00,'kkk','1',18,'2019-07-14 10:23:26','1','8208,莫容龙城,2019/07/06 08:27:52,2019/07/14 10:23:19,8','500,88,3600.00'),(32,'20190719150739894533',216.00,'顾客更换过房间。。。','0',30,'2019-07-19 15:07:39','1','8203,貂蝉,2019/07/19 15:06:42,2019/07/19 15:07:39,1','140,90,126.00'),(33,'20190720082331720591',202.00,'顾客更换过房间。。。','0',32,'2019-07-20 08:23:31','1','8201,玉帝,2019/07/20 08:21:33,2019/07/20 08:23:31,1','140,90,112.00'),(34,'20190720083003165033',224.00,'顾客更换过房间。。。','1',33,'2019-07-20 08:30:03','1','8207,玉帝,2019/07/20 08:23:31,2019/07/20 08:30:03,1','180,80,144.00'),(35,'20190720084052052055',252.00,'顾客更换过房间。。。','1',31,'2019-07-20 08:40:52','1','8204,貂蝉,2019/07/19 15:07:39,2019/07/20 08:40:52,1','180,90,162.00'),(36,'20190730170009156677',2610.00,'你好。。','1',34,'2019-07-30 17:00:09','0','8206,貂蝉,2019/07/20 08:40:52,2019/07/30 17:00:00,10','280,90,2520.00'),(37,'20191121202555845630',0.00,'3','0',17,'2019-11-21 20:25:55','1','8202,独角大仙,2019/07/12 08:27:28,2019/11/21 20:25:31,132','180,undefined,0'),(38,'20191121202609955179',31248.00,'3','0',34,'2019-11-21 20:26:09','1','8206,貂蝉,2019/07/20 08:40:52,2019/11/21 20:25:31,124','280,undefined,31248'),(39,'20191129140255405621',3200.00,'6','0',35,'2019-11-29 14:02:55','1','8208,熊佳琳,2019/11/21 20:26:21,2019/11/29 13:56:26,8','500,undefined,3200'),(40,'20191129144030793478',21546.00,'6','0',31,'2019-11-29 14:40:30','1','8204,貂蝉,2019/07/19 15:07:39,2019/11/29 14:39:53,133','180,undefined,21546'),(41,'20191129144436523391',450.00,'6','0',36,'2019-11-29 14:44:36','1','3333,张三,2019/11/29 14:42:04,2019/11/29 14:44:21,1','500,undefined,450');

/*Table structure for table `role_auth` */

DROP TABLE IF EXISTS `role_auth`;

CREATE TABLE `role_auth` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(20) DEFAULT NULL COMMENT '角色id',
  `auth_id` int(20) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `role_auth` */

insert  into `role_auth`(`id`,`role_id`,`auth_id`) values (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,11),(8,1,12),(9,1,13),(10,1,21),(11,1,31),(12,1,32),(13,1,41),(14,1,42),(15,1,51),(16,1,52),(17,1,53),(18,1,61),(19,2,1),(20,2,2),(21,2,3),(22,2,4),(24,2,11),(25,2,12),(26,2,13),(27,2,21),(28,2,31),(29,2,32),(30,2,41),(33,3,1),(34,3,2),(35,3,3),(36,3,4),(37,3,11),(38,3,12),(39,3,13),(40,3,21),(41,3,31),(42,3,32),(43,3,41),(44,2,42);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_name` varchar(40) DEFAULT NULL COMMENT '角色名',
  `create_date` datetime DEFAULT NULL COMMENT '角色创建时间',
  `status` varchar(2) DEFAULT '0' COMMENT '角色禁用启用状态，1启用,0禁用',
  `flag` varchar(2) DEFAULT '0' COMMENT '1超級角色  0普通角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

insert  into `roles`(`id`,`role_name`,`create_date`,`status`,`flag`) values (1,'超级管理员','2019-04-29 14:19:59','1','1'),(2,'主管','2019-05-05 15:04:35','1','0'),(3,'前台','2019-04-30 16:56:47','1','0');

/*Table structure for table `room_type` */

DROP TABLE IF EXISTS `room_type`;

CREATE TABLE `room_type` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `room_type_name` varchar(20) DEFAULT NULL COMMENT '房间类型名',
  `room_price` float(10,2) DEFAULT NULL COMMENT '房间的单价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `room_type` */

insert  into `room_type`(`id`,`room_type_name`,`room_price`) values (1,'单人间',180.00),(2,'双人间',180.00),(3,'豪华间',280.00),(5,'总统套房',500.00),(6,'钟点房',100.00),(7,'情侣套房',599.00),(8,'单人间带窗户',200.00),(9,'双人间(带窗户)',240.00),(12,'标准间',180.00),(13,'标准间12',122.00),(14,'棋牌室',210.00);

/*Table structure for table `rooms` */

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `room_pic` varchar(255) DEFAULT NULL COMMENT '房屋封面图',
  `room_num` varchar(10) DEFAULT NULL COMMENT '房间编号',
  `room_status` varchar(2) DEFAULT '0' COMMENT '房间的状态(0空闲，1已入住，2打扫)',
  `room_type_id` int(20) DEFAULT NULL COMMENT '房间类型主键',
  `flag` int(20) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `rooms` */

insert  into `rooms`(`id`,`room_pic`,`room_num`,`room_status`,`room_type_id`,`flag`) values (2,'imge/1.jpg','8202','2',1,0),(3,'imge/1.jpg','8203','0',1,1),(4,'imge/1.jpg','8204','2',2,1),(5,'imge/1.jpg','8205','0',3,0),(6,'imge/1.jpg','8206','2',3,1),(7,'imge/1.jpg','8207','2',2,1),(8,'imge/1.jpg','8208','2',5,1),(9,'imge/1.jpg','8209','0',3,0),(11,'imge/3.jpg','8211','1',1,1),(12,'imge/4.jpg','8212','0',3,0),(13,'imge/5.jpg','8301','0',5,0),(14,'imge/6.jpg','8302','0',2,0),(16,'imge/7.jpg','8304','0',3,0),(17,'imge/8.jpg','8305','0',3,0),(18,'imge/9.jpg','8306','0',3,0),(19,'imge/1.jpg','8307','0',6,0),(20,'imge/1.jpg','8888','0',6,0),(21,'imge/1.jpg','1111','0',5,0),(23,'imge/1.jpg','6666','0',2,1),(24,'imge/1.jpg','3333','2',5,1),(25,'imge/1.jpg','2222','0',7,0),(26,'imge/1.jpg','9999','0',1,1),(27,'imge/3.jpg','1234','0',9,1),(28,'imge/2.jpg','45646','0',1,1),(29,'imge/1.jpg','123','0',12,1),(30,'imge/1.jpg','3434','0',7,1);

/*Table structure for table `roomsale` */

DROP TABLE IF EXISTS `roomsale`;

CREATE TABLE `roomsale` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消费id',
  `room_num` varchar(100) DEFAULT NULL COMMENT '房间号',
  `customer_name` varchar(100) DEFAULT NULL COMMENT '客人姓名',
  `start_date` datetime DEFAULT NULL COMMENT '入住时间',
  `end_date` datetime DEFAULT NULL COMMENT '退房时间',
  `days` int(4) DEFAULT NULL COMMENT '天数',
  `room_price` double(22,0) DEFAULT NULL COMMENT '房屋单价',
  `rent_price` double(22,0) DEFAULT NULL COMMENT '住宿费',
  `other_price` double(22,0) DEFAULT NULL COMMENT '其它消费',
  `sale_price` double(22,0) DEFAULT NULL,
  `discount_price` double(22,0) DEFAULT NULL COMMENT '优惠金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=utf8;

/*Data for the table `roomsale` */

insert  into `roomsale`(`id`,`room_num`,`customer_name`,`start_date`,`end_date`,`days`,`room_price`,`rent_price`,`other_price`,`sale_price`,`discount_price`) values (1003,'8204','莫容龙城','2019-07-03 08:33:58','2019-07-09 08:39:24',6,180,972,90,1062,0),(1004,'8208','莫容龙城','2019-07-06 08:27:52','2019-07-14 10:23:19',8,500,3600,88,3688,400),(1005,'8204','貂蝉','2019-07-19 15:07:39','2019-07-20 08:40:52',1,180,162,90,252,18),(1006,'8207','玉帝','2019-07-20 08:23:31','2019-07-20 08:30:03',1,180,144,80,224,36),(1007,'8206','貂蝉','2019-07-20 08:40:52','2019-07-30 17:00:00',10,280,2520,90,2610,280);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(40) DEFAULT NULL COMMENT '账号',
  `pwd` varchar(40) DEFAULT NULL COMMENT '密码',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `use_status` varchar(2) DEFAULT '1' COMMENT '启用状态：1启用，0禁用',
  `is_admin` varchar(255) DEFAULT '0' COMMENT '1超级管理员，0普通管理员',
  `role_id` int(20) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`pwd`,`create_date`,`use_status`,`is_admin`,`role_id`) values (1,'admin','123456','2018-09-20 14:20:19','1','超级管理员',1),(13,'lisi','4297f44b13955235245b2497399d7a93','2019-04-29 14:45:50','1','前台',2),(15,'zhangsan','4297f44b13955235245b2497399d7a93','2019-05-05 16:01:31','1','前台',3),(16,'nishi','25f9e794323b453885f5181f1b624d0b','2020-03-05 19:06:17','1','超级管理员',1);

/*Table structure for table `vip` */

DROP TABLE IF EXISTS `vip`;

CREATE TABLE `vip` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `vip_num` varchar(50) DEFAULT NULL COMMENT '会员卡编号',
  `customer_name` varchar(40) DEFAULT NULL COMMENT '会员姓名',
  `vip_rate` float(2,1) DEFAULT '0.9' COMMENT '1~9折',
  `idcard` varchar(20) DEFAULT NULL COMMENT '会员身份证',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `create_date` datetime DEFAULT NULL COMMENT '会员办理日期',
  `gender` varchar(2) DEFAULT '1' COMMENT '性别：1男 0女',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `vip` */

insert  into `vip`(`id`,`vip_num`,`customer_name`,`vip_rate`,`idcard`,`phone`,`create_date`,`gender`) values (1,'2019061010230302','莫容龙城',0.9,'421123198912120012','13217788999','2019-06-10 10:23:03','1'),(2,'2019061010244502','独角大仙',0.9,'421234199909090099','13212325645','2019-06-10 10:24:45','1'),(9,'2019071208290202','曹操',0.9,'420101015809090808','13212321678','2019-07-01 08:29:02','1'),(10,'2019071208295301','玉帝',0.8,'101101000001010001','13499997766','2019-07-09 08:29:53','1'),(11,'2019071208303802','貂蝉',0.9,'421101016809098989','15699998898','2019-07-10 08:30:38','0'),(12,'2019071208312301','吕布',0.8,'420101015909090888','15699997467','2019-07-12 08:31:23','1'),(16,'2019072015181172','qweqwe',0.9,'420101015909090889','15655551246','2019-07-20 15:18:11','1'),(17,'2019072015271632','张三',0.8,'420101015909090884','13212377995','2019-07-20 15:27:16','0'),(18,'2019111917064715','张三',0.9,'420122199710224219','12345678941','2019-11-19 17:06:47','1'),(19,'2019112120321901','熊佳琳',0.8,'423456123456123456','13812345677','2019-11-21 20:32:19','1'),(20,'2019112914432601','张三',0.9,'421122199710224214','13871593416','2019-11-29 14:43:26','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
