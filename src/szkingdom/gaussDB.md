---
title: gaussDB
---

1. 用于存储数据库相关的元信息的系统表是哪张表？(6 分)（pg_database）
1. 高斯数据库集群中，为了实现故障切换，ETCD 节点可以为几个？(6 分)（3 个）
1. 下列哪种数据分布策略是对指定列按照具体值进行映射，把数据分布到对应 DN？(6 分) （LIST）
   REPLICATION
   表的每一行存在所有数据节点（DN）中，即每个数据
   节点都有完整的表数据。
   HASH
   对指定的列进行 Hash，通过映射，把数据分布到 指定
   DN。
   RANGE
   对指定列按照范围进行映射，把数据分布到对应 DN。
   LIST
   对指定列按照具体值进行映射，把数据分布到对应 DN

1. 以下关于 gsql 的参数，可以使用以下哪个参数可以导入 sql 脚本文件是？(6 分) （ -f）
   -d 指定数据库名；
   -p 数据库 CN 连接端口号；
   -U 数据库用户名；
   -W 数据库用户密码；
   -f sql 脚本文件；
1. 下列哪个语句可以查询到当前正在执行的 sql？(6 分)
   A. select _ from pg_database
   B. select _ from pg*class
   C. select * from pg*stat_activity
   D. select * from pg_stats
   你的回答 C
1. 下列表或者视图中，可以查询当前的连接用户和对应的连接机器信息的是？(6 分)
   A. pg_stats
   B. pg_stat_activity
   C. pg_roles
   D. pgxc_class
   你的回答 B
1. 以下关于 gs_dump 工具的参数，表示是用户和密码的参数是？(6 分)
   A. -U 和-W
   B. -U 和-t
   C. -s 和-f
   D. -U 和-f
   你的回答 A
   二、多选题 （6 题，共 48 分）
1. 对比高斯集中式和分布式，以下哪三项是集中式、分布式都有的组件？(8 分)
   A. CN
   B. GTM
   C. DN
   D. ETCD
   E. CM

1. 下列哪些系统表不能查询数据库的表、视图等对象名称信息的是(8 分) A C D
   A. pg_database
   B. pg_class
   C. pg_roles
   D. pg_namespace

1. 下列哪些工具可以连接高斯数据库(8 分)
   A. gsql 工具
   B. mysql 工具
   C. dbeaver 工具

1. 下列哪些表是仅用于分布式场景的？(8 分)
   A. pgxc_node
   B. pg_class
   C. pgxc_group
   D. pgxc_class
   E. pgxc_slice
   你的回答 A、C、D、E
1. 高斯数据库不推荐以下哪些更改参数的方式(8 分)
   A. gs_guc reload
   B. set
   C. 编辑 postgres.conf
   D. alter
   你的回答 B、C
1. gs_dump 导入指定-F 参数支持以下哪种格式(8 分)
   A. 纯文本
   B. 自定义归档
   C. 目录归档
   D. 归档格式
   你的回答 A、B、C、D
   三、判断题 （2 题，共 10 分）
1. 通过 pg_stat_activity 视图可以查看当前活跃连接数(5 分)
   对
   错
   你的回答对
1. 不可以使用 COPY 导出 gaussdb 数据库某个表数据(5 分)
   对
   错
   你的回答错
