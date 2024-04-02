CREATE DATABASE Matercomm;
USE Matercomm;

CREATE TABLE user(userid INT PRIMARY KEY AUTO_INCREMENT, username varchar(255), password varchar(255), role varchar(255));
CREATE TABLE admin(adminid INT PRIMARY KEY auto_increment, adminusername varchar(255), password varchar(255), role varchar(255));
CREATE TABLE books(bookid int primary key auto_increment,bookname varchar(255));

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
