---
title: '后端'
---
## 需求分析
### 需求分析方法
3图1表：流程图、用例图、时序图、功能列表
***流程图***
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

***用例图***
由参与者（Actor）、用例（Use Case）以及它们之间的关系构成的用于描述系统功能的动态视图。
***时序图***
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

***功能列表***
功能列表以列表的形式详细列出了软件系统将要实现的所有功能。
常用的要素：功能ID、功能模块、功能名称、功能描述、优先级、关联功能、责任人、状态 
功能性需求：
功能需求描述了软件应该做什么，它们定义了系统必须具备的功能或特性。这可以是计算、数据操作、业务流程、用户交互或其他任何定义系统可能执行的功能的特定功能。
非功能性需求：
是指依靠一些条件判断系统运作情形或其特性，而不是针对系统特定行为的需求。包括安全性、可靠性、互操作性、健壮性、易使用性、可维护性、可移植性、可重用性、可扩充性等。

![支付-时序图](/images/szkingdom/szbackend1.png)

## 代码规范
***高质量的代码编写原则：***
- 每个变量只用于单一用途
- 每一行代码只表达一件事
- 一个循环只做一件事
- 单一抽象层次原则
- 函数应该遵守单一职责
- 函数圈复杂度应该小于10
- 函数第一原则是必须要短小
- 编写函数时必须一心一意、专注、怀有谦虚的心态

## 数据库
***单表查询（DQL）***
一、***SELECT 语句基础***
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
二、***WHERE 条件过滤***
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
三、排序（ORDER BY）
`SELECT first_name, salary FROM employees ORDER BY salary ASC;`
`SELECT first_name, salary FROM employees ORDER BY salary DESC;`
`SELECT department_id, salary FROM employees ORDER BY department_id ASC, salary DESC;`
排序规则：
ASC：升序（默认）。
DESC：降序。
多字段排序：逗号分隔字段，优先级从左到右递减。
四、综合示例
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