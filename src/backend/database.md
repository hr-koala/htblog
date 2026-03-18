---
title: '数据库'
---
## 数据库
  数据库（Database，DB）是指长期储存在计算机中的有组织的、可共享的数据集合。
  数据库中的数据按照一定的数据模型组织、描述和储存，具有较小的冗余度、较高的数据独立性和易拓展性，并可为各种用户共享。

***数据库管理系统***
数据库管理系统（DBMS ，即 Database Management System）是专门用于建立和管理数据库的一套软件，介于应用程序和操作系统之间。
功能：
1.数据定义功能。  
2.数据操纵功能。  
3.数据库的运行管理功能。
4.数据库的建立和维护功能。
5.数据组织、存储和管理功能 。
6.其它功能。

***关系型数据库概念***
  关系型数据库，是指采用了关系模型来组织数据的数据库，其以行和列的形式存储数据，以便于用户理解，关系型数据库这一系列的行和列被称为表，一组表组成了数据库。用户通过查询来检索数据库中的数据，而查询是一个用于限定数据库中某些区域的执行代码。关系模型可以简单理解为二维表格模型，而一个关系型数据库就是由二维表及其之间的关系组成的一个数据组织。

***结构化查询语言（SQL）***
  结构化查询语言（Structured Query Language）简称SQL，是一种特殊目的的编程语言，是一种数据库查询和程序设计语言，用于存取数据以及查询、更新和管理关系数据库系统。
  结构化查询语言是高级的非过程化编程语言，允许用户在高层数据结构上工作。它不要求用户指定对数据的存放方法，也不需要用户了解具体的数据存放方式，所以具有完全不同底层结构的不同数据库系统, 可以使用相同的结构化查询语言作为数据输入与管理的接口。结构化查询语言语句可以嵌套，这使它具有极大的灵活性和强大的功能。

***功能介绍***
SQL具有数据定义、数据操纵、和数据控制的功能。
1、SQL数据定义功能：能够定义数据库的三级模式结构，即外模式、全局模式和内模式结构。在SQL中，外模式又叫做视图（View），全局模式简称模式（Schema），内模式由系统根据数据库模式自动实现，一般无需用户过问。
2、SQL数据操纵功能：包括对基本表和视图的数据插入、删除和修改，特别是具有很强的数据查询功能。 
3、SQL的数据控制功能：主要是对用户的访问权限加以控制，以保证系统的安全性。

***语句结构***
结构化查询语言包含6个部分：
1、数据查询语言（DQL: Data Query Language）：其语句，也称为“数据检索语句”，用以从表中获得数据，确定数据怎样在应用程序给出。保留字SELECT是DQL（也是所有SQL）用得最多的动词，其他DQL常用的保留字有WHERE，ORDER BY，GROUP BY和HAVING。这些DQL保留字常与其它类型的SQL语句一起使用。 
2、数据操作语言（DML：Data Manipulation Language）：其语句包括动词INSERT、UPDATE和DELETE。它们分别用于添加、修改和删除。
3、事务控制语言（TCL）：它的语句能确保被DML语句影响的表的所有行及时得以更新。包括COMMIT（提交）命令、SAVEPOINT（保存点）命令、ROLLBACK（回滚）命令
4、数据控制语言（DCL）：它的语句通过GRANT或REVOKE实现权限控制，确定单个用户和用户组对数据库对象的访问。某些RDBMS可用GRANT或REVOKE控制对表单个列的访问。 
5、数据定义语言（DDL）：其语句包括动词CREATE,ALTER和DROP。在数据库中创建新表或修改、删除表（CREATE TABLE 或 DROP TABLE）；为表加入索引等。
6、指针控制语言（CCL）：它的语句，像DECLARE CURSOR，FETCH INTO和UPDATE WHERE CURRENT用于对一个或多个表单独行的操作。

***概念介绍***
  在数据库系统中，一个事务是指：由一系列数据库操作组成的一个完整的逻辑过程。例如银行转帐，从原账户扣除金额，以及向目标账户添加金额，这两个数据库操作的总和，构成一个完整的逻辑过程，不可拆分。这个过程被称为一个事务，具有ACID特性。事务是数据库运行中的逻辑工作单位，由DBMS中的事务管理子系统负责事务的处理。

***ACID***
ACID，是指数据库管理系统（DBMS）在写入或更新资料的过程中，为保证事务（transaction）是正确可靠的，所必须具备的四个特性：原子性（atomicity，或称不可分割性）、一致性（consistency）、隔离性（isolation，又称独立性）、持久性（durability）。

- Atomicity（原子性）
一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被恢复（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
- Consistency（一致性）
在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
- Isolation（隔离性）
数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
- Durability（持久性）
事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

***ORACLE数据库介绍***
  Oracle Database，又名Oracle RDBMS，或简称Oracle，是甲骨文公司的一款关系数据库管理系统。它是在数据库领域一直处于领先地位的产品。Oracle数据库系统是世界上流行的关系数据库管理系统，系统可移植性好、使用方便、功能强，适用于各类大、中、小微机环境。它是一种高效率的、可靠性好的、适应高吞吐量的数据库方案。
  Oracle 数据库作为一个通用的数据库系统，它具有完整的数据管理功能；作为一个关系型数据库，它是一个完备关系的产品；作为分布式数据库它实现了分布式处理功能。只要在一种机型上学习了操作Oracle 的知识，便能在各种类型的机器上使用它。

PL/SQL Developer工具简介
PL/SQL Developer是一个集成开发环境，功能很强大，有SQL窗口、命令窗口、对象浏览器和性能优化等等功能。

***exp***
1.导出一张或几张表
`exp user/pwd@orcl file=/dir/xxx.dmp log=/dir/xxx.log tables=table1,table2`
2.按用户导出
`exp user/pwd@orcl file=/dir/xxx.dmp log=/dir/xxx.log owner=(xx,yy)`
3.全库导出
`exp user/pwd@orcl file=/dir/xxx.dmp log=/dir/xxx.log full=y`
***imp***
1.导入一张或几张表
`imp user/pwd@orcl file=/dir/xxx.dmp log=/dir/xxx.log tables=table1,table2 fromuser=dbuser touser=dbuser2`
2.按用户导入
`imp user/pwd@orcl file=/dir/xxx.dmp log=/dir/xxx.log fromuser=dbuser touser=dbuser2`

***IMP/EXP 和 IMPDP/EXPDP 的差异***
我们通常关注的有以下几点：
1.impdp/expdp导出速度快。
2.expdp/impdp是服务端工具，exp/imp是客户端工具。
3.当使用expdp/impdp工具时，其转储文件只能被存放在DIRECTORY对象所对应的OS目录中，而不能直接指定转储文件所在的OS目录。因此，当使用expdp/impdp工具时，必须首先建立DIRECTORY对象，并且需要为数据库用户授予使用DIRECTORY对象的权限。
4.IMP只适用于EXP导出文件,不适用于EXPDP导出文件;IMPDP只适用于EXPDP导出文件,而不适用于EXP导出文件

impdp/expdp使用前的准备工作（创建目录及授权）
1.创建目录
`create directory 目录名 as '目录路径'`
2.授权
`grant read,write on directory 目录名 to 用户名`

***expdp***
1.全库导出
`expdp user/passwd@orcl dumpfile=expdp.dmp directory=data_dir full=y logfile=expdp.log;`
2.按用户导出
`expdp user/passwd@orcl schemas=user dumpfile=expdp.dmp directory=data_dir logfile=expdp.log;`
3.按表导出
`expdp user/passwd@orcl tables=table1,table2 dumpfile=expdp.dmp directory=data_dir logfile=expdp.log;`

***impdp***
1.按用户导入
`impdp user/passwd@orcl schemas=user directory=data_dir dumpfile=expdp.dmp logfile=impdp.log;`
2.导入指定表
`impdp user/passwd@orcl tables=table1,table2 directory=data_dir dumpfile=expdp.dmp logfile=impdp.log;`

***MySQL数据库基本介绍***
	  MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，属于 Oracle 旗下产品，MySQL是最流行的关系型数据库管理系统之一。与其他的大型数据库例如Oracle、DB2、SQL Server等相比，MySQL自有它的不足之处，但是这丝毫也没有减少它受欢迎的程度。对于一般的个人使用者和中小型企业来说，MySQL提供的功能已经绰绰有余，而且由于 MySQL是开放源码软件，因此可以大大降低总体拥有成本。

关闭：
方法1：使用service关闭
`service mysqld stop`
方法2：使用mysqld脚本关闭
`/etc/init.d/mysqld stop`

开启：
方法1：使用service开启
`service mysqld start`
方法2：使用mysqld脚本开启
`/etc/init.d/mysqld start`

1.连接mysql
   格式： mysql -h主机地址 -u用户名 －p用户密码
   （1）.连接到本地MYSQL
      首先打开DOS窗口，然后进入目录mysql\bin，再键入命令mysql -u root -p，
      回车后提示你输密码。 MYSQL的提示符是： mysql> 。(默认root用户没有密码)
   （2）.连接到远程主机上的MYSQL
     假设远程主机的IP为：218.105.110.116，用户名为root,密码为abcd123456。
     则键入以下命令：mysql -h218.105.110.116 -u root -p abcd123456；
2.退出mysql
`quit或者exit退出`
3.修改密码：
   格式：mysqladmin -u用户名 -p旧密码 password 新密码
   例如给root修改密码：
     `mysqladmin -uroot -p"123321" password "123456"`
4.显示当前数据库服务器中的数据库列表
    `mysql> SHOW DATABASES;`
5.建立数据库(test2)
     `mysql> CREATE DATABASE test2;`
6．创建表(t1)
     `mysql> USE test2`
     `mysql> create table t1(id int,name varchar(20));`
7．显示某个数据库中的数据表
    `mysql> USE test2;`//使用某个库
    `mysql> SHOW TABLES;`//列出库中所有的表
8．显示数据表（t1）的结构
    `mysql> DESCRIBE t1;`
9．往表(t1)中插入记录
   `mysql> INSERT INTO t1 VALUES(1,"ZHANGSAN");`
10.显示表(t1)中的记录
    `mysql> SELECT * FROM t1;`
11.更新表中数据
   `mysql> update t1 set name="LISI" where id=1;`
12.执行sql脚本
方法一：在命令行下（未连接数据库）执行
`mysql -h localhost -u root -p123456 < /tmp/mysql.sql;`
方法二：在命令行下（已连接数据库）执行
`mysql> SOURCE /tmp/mysql.sql;`
13.将表(t1)中记录清空
     `mysql> DELETE FROM t1;`
14.删除数据表(t1)
     `mysql> DROP TABLE t1;`
15.显示use的数据库名
  	mysql> SELECT DATABASE();
16.显示当前的user
  	mysql> SELECT USER();
17.删除数据库(test2)
    `mysql> DROP DATABASE test2;`
导出与导入数据
1.导出数据库(test2)
`# mysqldump -uroot -p123456 test2 >/tmp/test2.sql`
2.导出数据库部分表(test2库的t1、t2表）
`# mysqldump -uroot -p123456 test2 t1 t2 >/tmp/t1_t2.sql`
3.导入数据到数据库
 先确认数据库（test2)已创建好，再执行命令：
`# mysql -uroot -p123456 test2 < /tmp/t1_t2.sql`

***SQL Server数据库简介***
  SQL Server数据库是Microsoft开发设计的一个关系数据库智能管理系统(RDBMS)，现在是全世界主流数据库之一。Microsoft SQL Server 是一个全面的数据库平台，使用集成的商业智能 (BI)工具提供了企业级的数据管理。Microsoft SQL Server 数据库引擎为关系型数据和结构化数据提供了更安全可靠的存储功能，使您可以构建和管理用于业务的高可用和高性能的数据应用程序。
***ODBC介绍与数据源配置***
1.开放数据库连接（Open Database Connectivity，ODBC）是为解决异构数据库间的数据共享而产生的，现已成为WOSA(The Windows Open System Architecture(Windows开放系统体系结构))的主要部分和基于Windows环境的一种数据库访问接口标准。ODBC 为异构数据库访问提供统一接口，允许应用程序以SQL 为数据存取标准，存取不同DBMS管理的数据；使应用程序直接操纵DB中的数据，免除随DB的改变而改变。用ODBC 可以访问各类计算机上的DB文件，甚至访问如Excel 表和ASCI I数据文件这类非数据库对象。

ODBC介绍与数据源配置
2.创建到SQL Server的数据源
(1).控制面板->管理工具->数据源(ODBC)
(2).视情况选择用户DSN或系统DSN，点击“添加”，选择“SQL server”驱动程序
(3).输入数据源名称、描述、服务器等信息
(4).选择验证登录方式
(5).更改默认的数据库等等选项确认
(6).更改SQL Server系统消息的语言、对数据使用强大的加密等等选项确认
(7).可对数据源进行测试

***什么是NoSQL***
  NoSQL是对不同于传统的关系数据库的数据库管理系统的统称，即广义地来说可以把所有不是关系型数据库的数据库统称为NoSQL。
  NoSQL 数据库专门构建用于特定的数据模型，并且具有灵活的架构来构建现代应用程序。NoSQL 数据库使用各种数据模型来访问和管理数据。这些类型的数据库专门针对需要大数据量、低延迟和灵活数据模型的应用程序进行了优化。NoSQL数据库的一个显著特点就是去掉了关系数据库的关系型特性，数据之间一旦没有关系，使得扩展性、读写性能都大大提高。NoSQL和传统的关系型数据库不是排斥和取代的关系，在一个分布式应用中往往是结合使用的。

***关系数据库与NoSQL对比***
![关系数据库与NoSQL对比](/images/backend/database1.png)

Redis简介
Redis(Remote Dictionary Server，远程字典服务器)，是一个用C语言编写的、开源的、基于内存运行并支持持久化的、高性能的NoSQL数据库，也是当前热门的NoSQL数据库之一。

Redis特点
Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
Redis 提供了丰富的数据结构。
Redis 支持数据的备份，即 master-slave 模式的数据备份。

开启Redis
执行如下命令 ：redis-server  redis.windows.conf。
其中，redis.windows.conf 是redis的配置文件。Redis的默认监听端口是6379。

关闭Redis
方法1：ctrl+c 
方法2：在命令行中执行命令：redis-cli shutdown

连接Redis
redis-cli是Redis自带的基于命令行的Redis客户端，用于与服务端交互，我们可以使用该客户端来执行Redis各种命令。
在命令行执行命令：redis-cli –h 127.0.0.1 –p 6379，参数分别为host、port。在客户端中输入ping，如返回PONG则说明Redis服务正常运行。

Redis使用简单介绍
1.sting类型的有关命令

| 命令 | 操作 | 
| --- | --- | 
| set key value | 设置key对应的值为string类型的value | 
| mset keyl valuel [key2 value2...] | 一次设置多个key | 
| get key | 获取指定key的value | 
|  mget keyl [key2...]  |  一次获取多个key的value  |
|  incr key  |  对key的值做自增操作，返回新的值  |
|  decr key  |  对key的值做自减操作，返回新的值  |
|  incrby key integer  |  对key的value加指定integer  |
|  decrby key integer  |  对key的value减指定integer  |
|  append key value  |  给指定key的字符串追加value  |
|  substr key start end  |  截取key，从start(包含)到end(包含)。注意只是返回截取的value，源value并没改变  |

2.key的有关命令

| 命令 | 操作 |
| ---  | ---  | 
|  exists key  |  测试指定key是否存在  | 
|  del key1l [key2...]  |  删除给定key  | 
|  type key  |  返回给定key的类型  | 
|  keys pattern  |  以正则表达式的形式，返回匹配的所有key  |
|  rename oldkey newkey  |  修改key的名字  | 
|  dbsize  |  查看数据库中key的数量(并不是所谓的大小)  |
|  expire key seconds  |  为key指定过期时间，到期自动删除  | 
|  ttl key  |  查看key的剩余时间  |
|  select index  |  选择数据库(默认16个数据库，index为0-15)  | 
|  move key index  |  将key移动到指定数据库  |
|  flushdb  |  清空当前数据库key  | 
|  flushall  |  清空所有数据库key  |
