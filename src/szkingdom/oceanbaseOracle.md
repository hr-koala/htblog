---
title: OceanBase Oracle
date: 2026-07-28
---

## oceanbase Oracle

```sql
CREATE OR REPLACE PROCEDURE ADD_TABLE_COLUMN(
    p_table_name    IN VARCHAR2,        -- 表名，大小写兼容
    p_col_name      IN VARCHAR2,        -- 新增字段名
    p_col_type      IN VARCHAR2,        -- 字段类型 VARCHAR2(64)/NUMBER(19,0)/CHAR(1)/DATE
    p_col_comment   IN VARCHAR2,        -- 字段注释
    p_is_not_null   IN CHAR DEFAULT 'N', -- 是否非空 Y/N
    p_default_val   IN VARCHAR2 DEFAULT NULL -- 默认值
)
IS
    v_upper_table   VARCHAR2(128);
    v_upper_col     VARCHAR2(128);
    v_table_cnt     NUMBER;
    v_col_cnt       NUMBER;
    v_alter_sql     VARCHAR2(4000);
    v_comment_sql   VARCHAR2(2000);
BEGIN
    -- 统一转大写，OB字典对象全大写存储
    v_upper_table := UPPER(TRIM(p_table_name));
    v_upper_col   := UPPER(TRIM(p_col_name));

    -- 1. 检查表是否存在
    SELECT COUNT(1) INTO v_table_cnt
      FROM USER_TABLES
     WHERE TABLE_NAME = v_upper_table;
    IF v_table_cnt = 0 THEN
        DBMS_OUTPUT.PUT_LINE('[ERROR] 目标表 '||v_upper_table||' 不存在');
        RAISE_APPLICATION_ERROR(-20001, '表'||v_upper_table||'不存在');
    END IF;

    -- 2. 判断字段是否已存在，存在直接跳过，实现可重复执行
    SELECT COUNT(1) INTO v_col_cnt
      FROM USER_TAB_COLUMNS
     WHERE TABLE_NAME = v_upper_table
       AND COLUMN_NAME = v_upper_col;
    IF v_col_cnt > 0 THEN
        DBMS_OUTPUT.PUT_LINE('[SKIP] 表'||v_upper_table||' 字段'||v_upper_col||'已存在，无需新增');
        RETURN;
    END IF;

    -- 3. 拼接新增字段SQL
    v_alter_sql := 'ALTER TABLE ' || v_upper_table || ' ADD ' || v_upper_col || ' ' || p_col_type;
    -- 拼接非空约束
    IF p_is_not_null = 'Y' THEN
        v_alter_sql := v_alter_sql || ' NOT NULL';
    END IF;
    -- 拼接默认值，区分字符串/数字自动处理引号
    IF p_default_val IS NOT NULL THEN
        IF INSTR(UPPER(p_col_type), 'VARCHAR2') > 0 OR INSTR(UPPER(p_col_type), 'CHAR') > 0 THEN
            v_alter_sql := v_alter_sql || ' DEFAULT ''' || REPLACE(p_default_val, '''', '''''') || '''';
        ELSE
            v_alter_sql := v_alter_sql || ' DEFAULT ' || p_default_val;
        END IF;
    END IF;

    -- 执行新增字段
    EXECUTE IMMEDIATE v_alter_sql;
    DBMS_OUTPUT.PUT_LINE('[SUCCESS] 执行语句：' || v_alter_sql);

    -- 4. 添加字段注释，转义注释内单引号
    v_comment_sql := 'COMMENT ON COLUMN ' || v_upper_table || '.' || v_upper_col || ' IS ''' || REPLACE(p_col_comment, '''', '''''') || '''';
    EXECUTE IMMEDIATE v_comment_sql;
    DBMS_OUTPUT.PUT_LINE('[SUCCESS] 注释语句：' || v_comment_sql);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('[EXCEPTION] 表:'||v_upper_table||' 字段:'||v_upper_col||' 异常：'||SQLERRM);
        RAISE;
END ADD_TABLE_COLUMN;
```

### 系统参数配置

```sql
-- 系统全局配置类别表
CALL DROP_IF_TABLE_EXISTS('T_SYS_CFG_CATA');
CREATE TABLE T_SYS_CFG_CATA
(
    CFG_CATA         VARCHAR2(100)    NOT NULL,    -- 配置类别
    CFG_CATA_NAME    VARCHAR2(200)    NOT NULL,     -- 类别名称
    CONSTRAINT PK_SYS_CFG_CATA PRIMARY KEY (CFG_CATA)
);
COMMENT ON TABLE T_SYS_CFG_CATA IS '系统全局配置类别表';
COMMENT ON COLUMN T_SYS_CFG_CATA.CFG_CATA IS '配置类别编码';
COMMENT ON COLUMN T_SYS_CFG_CATA.CFG_CATA_NAME IS '配置类别显示名称';

-- 系统全局配置表
CALL DROP_IF_TABLE_EXISTS('T_SYS_CFG');
CREATE TABLE T_SYS_CFG
(
    CFG_ID       VARCHAR2(100)     NOT NULL,    -- 配置项编码
    CFG_CATA     VARCHAR2(100)     NOT NULL,    -- 配置类别, 如果配置类别为空值，则表示未分类
    CFG_NAME     VARCHAR2(200)     NOT NULL,    -- 配置项名称
    CFG_VALUE    VARCHAR2(1024)    NOT NULL,    -- 配置内容
    CHG_FLAG     NUMBER(3)         NOT NULL,    -- 是否可修改 0不可修改 1可修改
    CFG_COMM     VARCHAR2(200)     NOT NULL,    -- 配置说明
    VALUE_TYPE   VARCHAR2(20)      DEFAULT NULL,    -- 值类型 text-文本，datetime-日期时间，date-日期，time-时间，number-数值，money-金额，switch-开关，multiple-多选，select-下拉
    VALUE_RULE   VARCHAR2(2048)    DEFAULT NULL,  -- 值控制 最大值maxValue 最小值 minValue 精度precision 配置示例 {"rule":{"maxValue":10, "minValue":1, "precision":2}, "valueSet":[{"value":1,"name":"选项1"},{"value":2,"name":"选项2"}]}
    CONSTRAINT PK_SYS_CFG PRIMARY KEY (CFG_ID)
);
COMMENT ON TABLE T_SYS_CFG IS '系统全局配置主表';
COMMENT ON COLUMN T_SYS_CFG.CFG_ID IS '配置项唯一编码';
COMMENT ON COLUMN T_SYS_CFG.CFG_CATA IS '配置类别编码，空代表未分类';
COMMENT ON COLUMN T_SYS_CFG.CFG_NAME IS '配置项展示名称';
COMMENT ON COLUMN T_SYS_CFG.CFG_VALUE IS '配置存储值';
COMMENT ON COLUMN T_SYS_CFG.CHG_FLAG IS '是否允许前台修改：0-不可改 1-可修改';
COMMENT ON COLUMN T_SYS_CFG.CFG_COMM IS '配置详细说明';
COMMENT ON COLUMN T_SYS_CFG.VALUE_TYPE IS '配置值类型：text/datetime/date/time/number/money/switch/multiple/select';
COMMENT ON COLUMN T_SYS_CFG.VALUE_RULE IS '值校验规则、下拉选项JSON配置';

TRUNCATE TABLE T_SYS_CFG_CATA;
INSERT INTO T_SYS_CFG_CATA (CFG_CATA, CFG_CATA_NAME)
VALUES ('TRADE_PARAMETER', '交易参数');

TRUNCATE TABLE T_SYS_CFG;
INSERT INTO T_SYS_CFG (CFG_ID, CFG_CATA, CFG_NAME, CFG_VALUE, CHG_FLAG, CFG_COMM, VALUE_TYPE, VALUE_RULE)
VALUES
('CUST_INSTRUCTION_AUTO_CHECK_SWITCH', 'TRADE_PARAMETER', '客户指令是否自动复核', '0', 1, '客户指令审核后是否自动复核', 'switch', ''),
('TRD_PLAN_AUTO_CHECK_SWITCH', 'TRADE_PARAMETER', '交易计划是否自动复核', '0', 1, '交易计划审核后是否自动复核', 'switch', '');
```

### DROP_IF_TABLE_EXISTS

```sql
CREATE OR REPLACE PROCEDURE DROP_IF_TABLE_EXISTS(p_table_name IN VARCHAR2)
IS
    -- 所有局部变量统一一段DECLARE，不能分行写DECLARE
    v_upper_table VARCHAR2(128);
    v_table_count  NUMBER;
BEGIN
    -- 赋值逻辑移到BEGIN内部
    v_upper_table := UPPER(TRIM(p_table_name));

    -- 查询当前用户表数量
    SELECT COUNT(1)
      INTO v_table_count
      FROM USER_TABLES
     WHERE TABLE_NAME = v_upper_table;

    IF v_table_count > 0 THEN
        EXECUTE IMMEDIATE 'DROP TABLE ' || v_upper_table || ' PURGE';
        DBMS_OUTPUT.PUT_LINE('表【' || v_upper_table || '】已存在，执行删除成功');
    ELSE
        DBMS_OUTPUT.PUT_LINE('表【' || v_upper_table || '】不存在，无需删除');
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('删除表异常，表名：' || v_upper_table || '，错误信息：' || SQLERRM);
        RAISE;
END DROP_IF_TABLE_EXISTS;
```