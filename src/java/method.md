---
title: 'JAVA'
---

## JAVA

### Method

- 方法可重载
- 类型转换：类型范围小的变量可以直接赋值给类型范围大的变量
- 强制类型转换：类型 变量 = (类型) 变量；int a=10,byte b=(byte)a; 可能造成数据溢出。
- byte/short/char  、 int 、 long  、 float 、 double

```java
// `+  -  *  /  % `
// `&  |  &&  ||  !  ==  !=`
// `+=   -=   ++  --`
// ` if{}else{}  `
// switch(){case:代码1;break;default:代码n;} 不要忘记break; 有穿透性。
// for (初始化语句;循环条件;迭代语句)  知道循环次数用for，不知道次数用while
// break;结束        continue;跳过
public class CalcDemo{
    public static void main(){
        // calc(10,2);
    }
    // public static int calc(int a,int b){
    //     int c1 = a+b;
    //     int c2 = a-b;
    //     int c3 = a*b;
    //     int c4 = a/b;
    //     int c5 = a%b;
    //     return c1;
    // }
    // public static void calc(int a){
    //     // if(){         }else{      }
    //     switch(a){
    //         case 1:
    //             System.out.println("1");
    //             break;
    //         case 2:
    //             System.out.println("2");
    //             break;
    //         default:
    //             System.out.println("其他");
    //     }
    // }
    public static void loop(int n){
        // for(int i=0;i<3;i++){}

        // int sum = 0;
        // for(int i = 0;i <= 10;i++){
        //     sum += i;
        // }
        // 嵌套
        // for(int i = 1;i <= 9;i++){
        //     for(int j = 1;j <= i;j++){
        //         System.out.print(i+" x " + j +" = " +(i*j) + "\t");
        //     }
        //     System.out.println(i,j);
        // }

        // int i=0;
        // while(i<3){
        //     System.out.println(i);
        //     i++;
        // }
        // double height =8848860;
        // double thickness = 0.1;
        // int count =0;
        // while(thickness<8848860){
        //     count++;
        //     thickness*=2;
        // }
        // 先执行后判断
        // int j=0;
        // do{
        //     j++;
        // }while(j<3);
    }
    // public static int guess(){
    //     Random random = new Random();
    //     int randomNum = random.nextInt(100)+1;
    //     Scanner sc = new Scanner(System.in);
    //     int userGuess;
    //     System.out.println("1到100之间的数字");
    //     do{
    //         System.out.print("猜这个数字是多少");
    //         userGuess = sc.nextInt();
    //         if(userGuess<randomNum){
    //             System.out.print("猜小了");
    //         } else if (userGuess>randomNum) {
    //             System.out.print("猜大了");
    //         }else {
    //             System.out.println("猜对了");
    //         }
    //     }while (userGuess!=randomNum);
    //     return userGuess;
    // }
}
```

```java
public class Primes {
    public static void main(String[] args) {
        int count =0;
        // 逐个判断 0~1000 中的每个数是否为质数
        for (int n = 2; n <= 1000; n++) {
            if (isPrime(n)) {
                System.out.print(n + " ");
                count++
            }
        }
        System.out.println("数量"+count);
    }

    // 判断 n 是否为质数
    static boolean isPrime(int n) {
        if (n < 2) return false;          // 0、1 不是质数
        // 只需检查到 sqrt(n) 即可，减少循环次数
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false; // 能被整除则不是质数
        }
        return true;
    }
}
```

```java
// 数组
// String[] names={"张","王","孙"};
// int[] arrs=new int[]{1,2,3};     arr[1];
// int ind = (int)(Math.random()*names.length);
// double[] scores = new double[8];
// int[][] arr={{1,2},{3,4.5},{6,7}};
// int[][] arr = new int[][]{{1,2},{3,4.5},{6,7}};
// int[][] arr = new int;
// int[][] arr = new int[3][5];
```

// 封装、继承、多态
```java
// 对象
public class Student {
    // ===== 成员变量（属性/字段） =====
    private String name;        // 姓名
    private int age;            // 年龄
    private String major;       // 专业
    private static int count = 0;  // 静态变量：统计创建了多少个对象

    // ===== 构造方法（用于初始化对象） =====
    // 构造器特点：创建对象时，对象会立即自动调用构造器。
    public Student() {
        count++;  // 每创建一个对象，计数加 1
    }
    // this主要用来解决：成员变量与方法内部变量名称冲突问题。
    public Student(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
        count++;
    }

    // ===== 普通方法 =====
    // getter / setter
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public String getMajor() {
        return major;
    }
    public void setMajor(String major) {
        this.major = major;
    }

    // 业务方法：自我介绍
    public void introduce() {
        System.out.println("我叫 " + name + "，今年 " + age + " 岁，专业是 " + major);
    }
    // 静态方法：获取对象总数
    public static int getCount() {
        return count;
    }

    // ===== 覆写 toString()：方便打印对象 =====
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", major='" + major + "'}";
    }
}
public class Main {
    public static void main(String[] args) {
        // 1. 用无参构造创建对象，再通过 setter 赋值
        Student s1 = new Student();
        s1.setName("张三");
        s1.setAge(20);
        s1.setMajor("计算机科学");

        // 2. 用带参构造直接创建并初始化
        Student s2 = new Student("李四", 22, "软件工程");

        // 3. 调用方法
        s1.introduce();                    // 业务方法
        System.out.println(s2.toString()); // 覆写的 toString
        System.out.println("共创建对象数：" + Student.getCount()); // 静态方法
    }
}
// `private String name`**实例变量**—— 每个对象各有一份，用 `this` 区分当前对象
// `static int count`**静态变量**—— 所有对象共享一份，属于类而非单个对象构造方法与类同名、无返回类型，负责初始化
// getter/setter封装私有属性，符合 JavaBean 规范
// `this`指向当前对象，用于区分形参与成员变量同名的情况
// `@Override toString()`覆写父类方法，让 `println(对象)` 输出可读内容
// this主要用来解决：变量名称冲突问题。
// public void print(String name){
//     System.out.println(this.name + "喜欢"+ name);
// }
// private 关键字修饰成员变量， 只能在本类中被直接访问，其他任何地方不能直接访问。
// 合理暴露：使用public修饰 的get和set方法合理暴露。
```

| 问题 | 静态方法 | 实例方法 |
| --- | --- | --- |
| 属于谁 | 类 | 对象 |
| 调用方式 | `类名.方法()` | `对象.方法()` |
| 何时存在 | 类加载时就有 | 创建对象后才存在 |
| 访问静态成员 | ✅ 可以 | ✅ 可以 |
| 访问实例成员 | ❌ 不可以（可能没对象） | ✅ 可以 |
| 能否用 `this` | ❌ 不能（没有调用对象） | ✅ 可以（指向调用者） |
| 底层原因 | 不依赖对象，实例成员 / `this` 可能不存在 | 必有对象，静态成员也必然存在 |

```java
// Movie.Java
package com.ht.www;
public class Movie {
    private int id;
    private String name;

    public Movie(){
    }
    public Movie(int id,String name){
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
// MovieOPerator.Java
package com.ht.www;
import java.util.Scanner;
public class MovieOPerator {
    private Movie[] movies;
    public MovieOPerator(Movie[] movies){
        this.movies = movies;
    }
    public void searchMovie(){
        System.out.println("请输入要查的id");
        Scanner sc = new Scanner(System.in);
        int id = sc.nextInt();
        for(int i=0;i<movies.length;i++ ){
            Movie m = movies[i];
            if(m.getId()==id){
                System.out.println(m.getId()+m.getName());
                return;
            }
        }
        System.out.println("没有找到");
    }
}

// Test.Java
package com.ht.www;
public class Test {
    public static void main() {
        Movie[] movies= new  Movie[2];
        movies[0] = new Movie(1,"沈腾");
        movies[0] = new Movie(2,"张艺谋");
    }
}
```

> final 实例字段，每个对象创建时定好名字，终身不能修改.
> 继承：子类能继承父类的非私有成员(成员变量、成员方法)
> 子类的对象是由子类、父类共同完成。
> private 、 缺省 、 protected 、 public
> java的类只能是单继承。不可以多继承，但可多层继承。
> Object类是Java中所有类的祖宗，直接、间接继承Object。


### super（Java 继承关键字，基础语法）: 指代**父类**，三种用法
#### 1. super. 属性名：访问父类成员变量

子类和父类变量重名时，区分父类变量

```java
class Parent {
    String name = "父类";
}
class Son extends Parent {
    String name = "子类";
    public void print() {
        System.out.println(name);      // 子类
        System.out.println(super.name);// 父类
    }
}
```
#### 2. super. 方法名 ()：调用父类方法
常配合重写使用，子类重写后仍想保留父类原有逻辑

```java
class Parent {
    public void hello() {
        System.out.println("父类方法");
    }
}
class Son extends Parent {
    @Override
    public void hello() {
        super.hello(); // 先执行父类逻辑
        System.out.println("子类扩展逻辑");
    }
}
```
#### 3. super ()：调用父类构造方法
必须写在子类构造方法**第一行**，不写编译器会自动加无参 super ()
```java
class Parent {
    public Parent(String name) {}
}
class Son extends Parent {
    public Son() {
        super("父类参数"); // 调用父类有参构造，必须手动写
    }
}
```

> this()、super() 都只能放在构造器的第一行，因此，有了this()就不能写super()了，反之亦然。

```java
class Student {
    private String name;
    private int age;
    public Student(String name) {
        this(name,18);
    }
    public Student(String name,int age) {
        this.name= name;
        this.age = age;
    }
}
```

> 对象多态、行为多态
>  多态成立的 3 个前提（缺一不可）
> 1. 存在继承 / 实现关系（Animal 和 Dog 继承）；
> 2. 子类重写父类方法（`@Override` 重写 shout）；
> 3. 父类引用指向子类对象（对象多态语法）。

> 1. 对象多态：父类引用 = new 子类()
> 语法格式：`父类类型 引用变量 = new 子类();`

> 右边对象是解耦合、易扩展
> 父类类型的变量作为参数，可以接收一个子类对象
> 多态下不能调用子类独有功能。父类引用无法直接调用子类独有方法。

```java
abstract class Animal {
    // 通用行为，子类必须重写
    public abstract void shout();
}
class Dog extends Animal {
    @Override
    public void shout() {
        System.out.println("小狗汪汪汪");
    }
}

class Cat extends Animal {
    @Override
    public void shout() {
        System.out.println("小猫喵喵喵");
    }
}

class Duck extends Animal {
    @Override
    public void shout() {
        System.out.println("小鸭嘎嘎嘎");
    }
}
public class Test {
    public static void main(String[] args) {
        // ======================
        // 1. 对象多态：父类引用 = new 子类()
        // 语法格式：`父类类型 引用变量 = new 子类();`
        // 引用类型是Animal(父类)，实际对象是Dog/Cat/Duck(子类)
        // ======================
        Animal a1 = new Dog();    // 对象多态1
        Animal a2 = new Cat();    // 对象多态2
        Animal a3 = new Duck();   // 对象多态3

        // ======================
        // 2. 行为多态：同一个shout()方法，不同对象执行不同逻辑
        // 编译期只看父类Animal有shout方法；运行时识别真实对象，执行子类重写逻辑
        // ======================
        a1.shout(); // 输出：小狗汪汪汪
        a2.shout(); // 输出：小猫喵喵喵
        a3.shout(); // 输出：小鸭嘎嘎嘎

        // 统一方法接收任意子类，完美体现多态优势
        playAnimal(a1);
        playAnimal(a2);
        playAnimal(a3);
    }

    // 形参写父类，所有子类都能传入，代码复用
    public static void playAnimal(Animal animal) {
        System.out.print("动物发声：");
        animal.shout();
    }
}
```
> 可以把对象转换成其真正的类型，从而解决了多态下不能调用子类独有方法的问题。
> 强制转换前，判断对象的真实类型
> instanceof 判断当前对象的真实类型； 对象 instanceof 类型。
> lombok
> @Data
> @NoArgsConstructor
> @AllArgsConstructor
>

1. final（Java 原生关键字）
- 修饰**变量**：只能赋值一次，不可修改
- 修饰**方法**：方法不能被子类重写（`@Override`就会报错）
- 修饰**类**：类不能被继承（不能 extends）

## 2. Lombok 系列（编译期自动生成代码，减少样板代码）

> 
> 需要引入 lombok 依赖，IDE 安装 Lombok 插件，**编译时自动生成 get/set/ 构造器**，源码看不到，但 class 字节码里存在。

### @Getter / @Setter

- 写在**类上**：自动给所有成员变量生成 getter、setter
- 写在**单个字段**：只给该字段生成 get/set

```java
@Getter
@Setter
public class User {
    private Long id;
    private String name;
}
// 编译后自动生成 getId() setId() getName() setName()
```

> 
> 如果字段是 `private final String name`：不会生成 setter（final 不能修改）

### @NoArgsConstructor

自动生成**无参构造方法**

```java
@NoArgsConstructor
public class User {
    private Long id;
}
// 生成 public User(){}
```

⚠️ 坑：**手写了有参构造之后，默认无参构造消失，Spring 反射实例化、序列化框架会报错，这时就要手动加 @NoArgsConstructor**

### @AllArgsConstructor

自动生成**全参构造方法**（所有成员变量作为参数）

```java
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
}
// public User(Long id, String name){ this.id=id; this.name=name; }
```

> 
> 注意：字段顺序决定构造器参数顺序，新增 / 删除字段会改变构造器，谨慎使用！

### @Builder

建造者模式，链式构建对象，非常适合实体、DTO

```java
@Builder
public class User {
    private Long id;
    private String name;
}
// 使用：
User user = User.builder()
        .id(1L)
        .name("张三")
        .build();
```

⚠️ 常用组合：`@Builder + @NoArgsConstructor + @AllArgsConstructor`

> 
> 坑：单独 @Builder 默认不会生成无参构造，如果框架需要无参构造，必须搭配 @NoArgsConstructor

### @Slf4j

自动生成日志对象 `log`，不用手动写 `private static final Logger log = ...`

```java
@Slf4j
@Component
public class UserService{
    public void test(){
        log.info("打印日志");
        log.error("异常",e);
    }
}
```

底层：使用 slf4j 日志门面，搭配 logback/log4j2 输出日志。

---

#### 3. @Component（Spring 注解）

作用：把当前类交给**Spring IOC 容器管理，注册为 Bean**，程序启动时 Spring 自动实例化这个对象，放到容器。

> 
> 衍生注解（本质也是 @Component）
> 
> - `@Service`：业务层 Service
> - `@Repository`：DAO/Mapper 层
> - `@Controller`：控制器
> `@Component` 通用，不属于上面分层时使用。

```java
@Component
public class TaskUtil {
    public void runTask(){
    }
}
// 之后可以@Autowired注入使用
@Autowired
private TaskUtil taskUtil;
```

---

#### 4. @Schema（SpringDoc / Knife4j Swagger3 注解）

用来描述**实体类 / DTO**，生成 API 文档，对应模型说明。

> 
> 旧版 Swagger2 是 `@ApiModel`，SpringDoc (Swagger3) 换成 `@Schema`

```java
@Schema(description = "用户DTO")
@Getter
@Setter
public class UserDTO {
    @Schema(description = "用户ID", example = "10001")
    private Long id;
    @Schema(description = "用户名", example = "小明")
    private String username;
}
```

- `description`：字段 / 类说明
- `example`：示例值，接口文档展示测试样例

#### ✅ 开发高频组合写法（DTO 实体标准模板）

```java
@Data // = @Getter + @Setter + toString + equals + hashCode
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "用户请求DTO")
public class UserDTO {
    @Schema(description = "用户编号")
    private Long userId;
    @Schema(description = "用户名称")
    private String userName;
}
```

> 
> 补充：`@Data` 是 Lombok 综合注解，开发 DTO 最常用，等价一堆注解合并。

#### 📌 快速记忆清单

表格

| 关键字 / 注解 | 归属 | 一句话作用 |
| --- | --- | --- |
| final | Java 原生 | 变量只读、方法禁止重写、类禁止继承 |
| @Getter/@Setter | Lombok | 自动生成 get/set 方法 |
| @NoArgsConstructor | Lombok | 自动生成无参构造 |
| @AllArgsConstructor | Lombok | 自动生成全参构造 |
| @Builder | Lombok | 建造者模式，链式创建对象 |
| @Slf4j | Lombok | 自动注入 log 日志对象 |
| @Component | Spring | 将类交给 Spring 容器，成为 Bean |
| @Schema | SpringDoc | 实体类 / 字段 API 文档描述 |

#### ⚠️ 高频踩坑点

1. `@Builder` + `@NoArgsConstructor` 一起用，否则序列化、反射会报错；
2. final 字段，Lombok 不会生成 setter；
3. `@AllArgsConstructor` 字段顺序变动，会破坏构造器；
4. `@Component` 只有在 Spring 扫描包范围内才生效，否则无法 @Autowired 注入；
5. `@Schema` 只在接口文档渲染起作用，**不参与代码校验**。

## 1. abstract 关键字 & 抽象类

### 核心定义

**abstract**：修饰**类** → 抽象类；修饰**方法** → 抽象方法。

- **抽象方法**：只有方法声明，没有方法体，`;`结尾，强制子类必须重写
- **抽象类**：用 `abstract class` 定义，**不能 new 创建对象**

```java
abstract class BaseService {
    // 普通成员变量
    private String name;

    // 普通方法（有方法体，子类可以直接继承使用，可选重写）
    public void common() {
        System.out.println("通用逻辑");
    }

    // 抽象方法：没有方法体，子类【必须重写】
    public abstract void doBusiness();
}

// 子类继承抽象类，必须实现所有抽象方法
class UserService extends BaseService {
    @Override
    public void doBusiness() {
        System.out.println("用户业务逻辑");
    }
}
```

### ✅ 抽象类规则（必背）

1. 抽象类**不能实例化** `new BaseService()` 直接编译报错
2. 包含抽象方法的类，一定是抽象类；抽象类**可以没有抽象方法**
3. 子类继承抽象类，必须实现全部抽象方法；否则子类也得声明为 abstract
4. 抽象类可以有：普通变量、final 变量、静态变量、构造方法、普通方法、静态方法、抽象方法
5. 抽象方法**不能加 private /final/static**
   - private：子类看不见，无法重写
   - final：不能重写，矛盾
   - static：静态属于类，不存在重写

### 抽象类 VS 接口简单区分

- 抽象类：`abstract class`，单继承，有构造器，可以有实例成员，适合**模板模式**
- 接口：`interface`，多实现，没有构造器，适合定义能力契约

---

## 2. 单例模式

> 
> 单例：**一个类在整个应用中，全局只有唯一的一个对象实例**。
> 核心目标：保证实例唯一 + 提供全局获取这个实例的入口。

### 实现核心两点

1. **私有构造方法 `private`**：禁止外部 `new` 对象
2. 类内部自己创建实例，对外提供静态方法获取这个实例

### ① 饿汉式（简单，常用，类加载直接创建）

```java
public class Singleton {
    // 类加载就直接创建实例
    private static final Singleton INSTANCE = new Singleton();
    // 私有构造
    private Singleton(){}
    // 对外获取实例
    public static Singleton getInstance(){
        return INSTANCE;
    }
}
```

优点：简单，线程安全；缺点：类加载就创建，不用也占用内存。

### ② 懒汉式（按需创建，双重检查锁 DCL，生产常用）

```java
public class Singleton {
    // volatile 防止指令重排
    private static volatile Singleton instance;
    private Singleton(){}

    public static Singleton getInstance(){
        if(instance == null){
            synchronized (Singleton.class){
                if(instance == null){
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

优点：用到才创建；缺点：代码复杂，要加 volatile。

### Spring 中的单例（重点！面试高频）

Spring Bean 默认就是**单例**（scope = singleton）

> 
> Spring 单例 ≠ 上面手写单例模式
> 手写单例：JVM 全局唯一；
> Spring 单例：**IOC 容器内唯一**，同一个容器只创建一份 Bean。

```java
@Component
public class OrderUtil {
}
```

Spring 启动，容器只创建 1 个 OrderUtil 对象，所有`@Autowired`注入拿到的都是同一个对象。

### 单例优缺点

✅优点：节省内存，全局复用，统一资源管理（连接池、工具类）
❌缺点：

1. 单例对象生命周期长，容易内存泄漏
2. 多线程场景下，**成员变量非线程安全**（不要在单例 Bean 里放可修改实例变量！）
3. 单元测试 mock 比较麻烦

> 
> ⚠️ 大坑：Spring 单例 Bean，不要定义普通实例成员变量，并发会互相覆盖！要用局部变量。

---

## 3. @Autowired（回顾 + 结合 Spring 单例一起看）

`@Autowired`：Spring IOC 自动注入 Bean

1. 自动从容器查找匹配类型的 Bean，赋值
2. Spring 默认 Bean 单例，所以多次 @Autowired 注入拿到同一个对象

```java
@Service
public class AService {
    // 注入的是Spring容器里唯一的那个OrderUtil单例对象
    @Autowired
    private OrderUtil orderUtil;
}
@Service
public class BService {
    // 和AService拿到的是同一个OrderUtil实例
    @Autowired
    private OrderUtil orderUtil;
}
```

### @Autowired 注入规则

1. 默认**按类型 byType**去找 Bean
2. 同类型多个 Bean 时，会再按名称匹配（变量名 = bean 名称）
3. Spring4.3 之后：类只有一个构造函数，可以省略 @Autowired
4. `@Autowired(required=false)`：找不到 bean 不会抛异常，可以为 null

---

# 串联：抽象类 + Spring + @Autowired + 单例 综合示例

```java
// 抽象父类
abstract class AbstractPayService {
    // 模板方法
    public void preCheck(){
        System.out.println("通用支付前置校验");
    }
    public abstract void pay(Long orderId);
}

// 子类交给Spring管理，默认单例Bean
@Service
public class AliPayService extends AbstractPayService {

    @Override
    public void pay(Long orderId) {
        System.out.println("支付宝支付");
    }
}

@Service
public class PayController {
    // 注入抽象父类引用，多态；拿到的实际是AliPayService单例对象
    @Autowired
    private AbstractPayService payService;
}
```

## 一句话速记

1. **abstract 抽象类**：不能 new，可包含抽象方法，子类继承必须实现抽象方法，用来做模板抽取公共逻辑
2. **单例模式**：全局仅一个实例；手写单例私有化构造；Spring Bean 默认容器内单例
3. **@Autowired**：Spring 自动注入 IOC 容器 Bean，拿到的一般是单例对象

## 面试高频题

问：抽象类可以用 @Service 交给 Spring 管理吗？
答：不行！抽象类不能实例化，Spring 无法创建 Bean。只能**子类加 @Service**，父类 abstract 只做模板。


## 1. 枚举类 enum

> 
> 枚举是**特殊类**，用来固定一组有限常量（状态、类型、编码），避免魔法值，类型安全。

### 基础写法

```java
public enum OrderStatusEnum {
    // 枚举实例，写在最前面，每个常量就是枚举对象
    WAIT_PAY(0, "待支付"),
    PAID(1, "已支付"),
    CANCEL(2, "已取消");

    private final Integer code;
    private final String desc;

    // 枚举构造器：**必须private，默认就是private，不能public**
    OrderStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    // getter，final字段不要setter
    public Integer getCode() { return code; }
    public String getDesc() { return desc; }

    // 根据code反向查找枚举
    public static OrderStatusEnum getByCode(Integer code){
        for (OrderStatusEnum e : OrderStatusEnum.values()) {
            if(e.getCode().equals(code)){
                return e;
            }
        }
        return null;
    }
}
```

### 核心特性

1. 枚举实例**全局唯一**，天然单例；
2. 构造方法强制私有，外部不能 new；
3. 可以有成员变量、普通方法、静态方法；
4. 可以**实现接口（implements）**，但是**不能继承类（不能 extends）**；
5. 编译后本质是 final 类，常量是 `public static final` 的枚举对象。

### 使用

```java
OrderStatusEnum status = OrderStatusEnum.PAID;
System.out.println(status.getCode());
```

✅优点：类型安全，可读性强，常量集中管理；
❌局限：枚举集合固定，运行期不能新增实例。

---

## 2. 抽象类 abstract class（回顾精简版）

```java
abstract class BaseTemplate {
    // 普通成员
    private String name;

    // 抽象方法：无方法体，子类必须重写
    public abstract void execute();

    // 普通方法，公共复用逻辑
    public void before(){
        System.out.println("通用前置逻辑");
    }
}
```

规则：

1. `abstract class`，**不能 new 实例**；
2. 有抽象方法 → 类必须 abstract；抽象类可以没有抽象方法；
3. 子类继承用 `extends`，子类必须实现全部抽象方法，否则子类也要 abstract；
4. 抽象类可以有构造器（给子类构造调用 super）；
5. **抽象类不能用 @Service**，Spring 无法实例化抽象类；只能子类加注解。

> 
> 抽象类：**继承（extends），单继承**

## 3. implements 关键字

用于**类实现接口**，实现多契约。

```java
// 接口
interface PayAbility {
    void pay();
}

// 类实现接口，用implements，可以多个逗号分隔
public class AliPay implements PayAbility {
    @Override
    public void pay() {
        System.out.println("支付宝支付");
    }
}
```

### 关键点

1. 一个类 `implements 接口1,接口2,接口3` → **多实现**（弥补 Java 单继承限制）
2. 实现接口后，**必须重写接口所有抽象方法**（Java8 + 默认方法可选重写）
3. 接口里定义的方法默认 `public abstract`
4. 对比：
   - `extends`：继承类（抽象类 / 普通类），只能继承一个
   - `implements`：实现接口，可以多个

> 
> 枚举也可以 implements 接口：

```java
enum Color implements DescInterface{}
```

## 4. volatile 关键字（并发，面试高频）

作用三个：

1. **保证可见性**：一个线程修改 volatile 变量，立刻刷新到主存，其他线程马上读到最新值；
2. **禁止指令重排序**；
3. ❗**不保证原子性**（重点坑！不能替代 synchronized）

> 
> 经典场景：DCL 双重检查锁单例

```java
public class Singleton {
    private static volatile Singleton instance; // volatile必须加
    private Singleton(){}
    public static Singleton getInstance(){
        if(instance == null){
            synchronized (Singleton.class){
                if(instance == null){
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

### 通俗理解

- 普通变量：线程存在本地缓存，修改后别的线程可能看不到旧值（不可见）
- volatile：强制读写主内存，保证可见；阻止 JVM 打乱指令顺序。
- ❌ 坑：`count++` 这种复合操作，volatile 无法保证线程安全。

## 5. @Service（Spring 注解）

`@Service` 是 `@Component` 的派生注解。

```java
@Service
public class UserServiceImpl implements UserService {
    @Override
    public void queryUser(){}
}
```

### 作用

1. 将当前类注册为 Spring IOC 容器 Bean；
2. 语义标记：业务层 Service 类；
3. Bean 默认 scope=**singleton 单例**，容器中只创建一份；
4. 可以用 `@Autowired` 注入到 Controller、其他 Service。

### 衍生注解汇总

- `@Service`：业务层
- `@Repository`：数据层 mapper/dao
- `@Controller`：控制器（返回页面）
- `@RestController` = `@Controller + @ResponseBody`（接口返回 JSON）
- `@Component`：通用 Bean，不属于上面分层时使用

> 
> 坑：@Service 写在接口上没用！**写在实现类上**

# 快速对比表格

表格

| 关键字 / 注解 | 归属 | 一句话作用 |
| --- | --- | --- |
| enum | Java 原生 | 枚举类，固定常量集合，实例天然单例 |
| abstract class | Java 原生 | 抽象类，不能 new，抽取公共模板逻辑，extends 继承 |
| implements | Java 原生 | 类实现接口，支持多实现 |
| volatile | Java 原生并发 | 保证变量可见性、禁止指令重排，不保证原子性 |
| @Service | Spring 注解 | 业务层 Bean，交给 IOC 容器管理，默认单例 |

# 串联示例（枚举 + 接口 +@Service）

```java
// 接口
interface Handler {
    void handle();
}

// 枚举实现接口
enum BusinessType implements Handler {
    ORDER{
        @Override
        public void handle() {
            System.out.println("订单处理");
        }
    },
    GOODS{
        @Override
        public void handle() {
            System.out.println("商品处理");
        }
    }
}

// 抽象模板
abstract class AbstractHandler {
    public abstract void doWork();
}

// 实现类交给Spring管理
@Service
public class OrderHandler extends AbstractHandler implements Handler{
    @Override
    public void handle() {}
    @Override
    public void doWork() {}
}
```

# 问题 3：volatile 加与不加的区别（DCL 单例场景）

```java
// 不加 volatile
private static Singleton instance;
// 加 volatile
private static volatile Singleton instance;
```

`instance = new Singleton()` 这行代码，JVM 底层拆成 3 步：

1. 分配内存空间
2. 对象初始化（执行构造方法，给成员赋值）
3. 将 instance 引用指向分配好的内存地址

## ❌ 不加 volatile：存在指令重排风险

JVM 有可能把步骤 2、3 调换顺序：

1. 分配内存
2. instance = 内存地址（此时对象还**没有初始化完成**）
3. 对象初始化

线程 A 执行到这一步，刚执行完第 2 步，CPU 切换到线程 B；
线程 B 判断 `instance != null`，直接拿这个**半初始化对象**使用，出现 bug！

> 
> 不加 volatile：
> 
> 
> 1. 多线程下变量**不可见**，线程修改后其他线程可能读到旧值
> 2. **允许指令重排序**，DCL 单例会拿到半成品对象

## ✅ 加上 volatile：

1. **保证可见性**：一个线程修改 volatile 变量，立刻刷新主存，其他线程读取最新值；
2. **禁止指令重排序**：上面三步不会乱序，必须先初始化对象，再赋值引用；
3. ❗**依然不保证原子性**，`instance++` 这类复合操作依旧线程不安全。

## 精简对比表

表格

| 特性 | 不加 volatile | 加 volatile |
| --- | --- | --- |
| 内存可见性 | 不保证，线程可能读到缓存旧数据 | ✅保证，读写主内存 |
| 指令重排 | JVM 允许重排指令 | ✅禁止重排 |
| 原子性 | 不保证 | ❌仍然不保证，不能替代 synchronized |
| DCL 单例 | 有并发 bug 风险 | 线程安全 |

## 一句话总结 volatile：

不加 volatile：多线程可能读到过期数据，存在指令重排，DCL 单例不安全；
加上 volatile：保证可见性，禁止指令重排；**但不能保证原子性。**


# 枚举实现单例（面试天花板写法，Effective Java 推荐）

## 一句话核心

**枚举类的每个枚举常量，天生就是单例。利用枚举特性，最简单、天然防反射、防序列化破坏单例。**

> 
> 前面手写饿汉、懒汉 DCL 单例都有漏洞：反射可以暴力创建新对象；序列化 / 反序列化会生成新对象。枚举单例直接解决这两个问题。

## 完整代码

```java
public enum SingletonEnum {
    // 【唯一实例】枚举常量，全局仅此一份，public static final
    INSTANCE;

    // 业务成员变量
    private String config;

    // 枚举构造器：默认private，不能写public
    SingletonEnum() {
        this.config = "全局配置信息";
    }

    // 业务方法
    public void doSomething() {
        System.out.println("枚举单例执行业务，config=" + config);
    }

    public String getConfig() {
        return config;
    }
}
```

## 使用方式

```java
public class Test {
    public static void main(String[] args) {
        // 获取单例对象
        SingletonEnum instance = SingletonEnum.INSTANCE;
        instance.doSomething();

        SingletonEnum instance2 = SingletonEnum.INSTANCE;
        // true，两个引用指向同一个对象
        System.out.println(instance == instance2);
    }
}
```

## 底层原理

1. 枚举实例 `INSTANCE` 在**类加载阶段**就初始化（饿汉）；
2. 枚举构造器强制私有，外部无法 new；
3. JVM 底层保证枚举实例**全局唯一**，JVM 层面防止反射和序列化漏洞。

### ✅ 三大优势（面试必背）

1. **实现最简单**，一行 `INSTANCE` 搞定，不用写私有构造、静态变量、同步代码；
2. **天然防反射攻击**
反射尝试调用枚举构造器创建对象时，JVM 直接抛异常，无法创建新实例。
> 
> 普通手写单例：反射 setAccessible (true)，可以 new 出新对象，破坏单例。
3. **天然防序列化破坏**
普通单例序列化后反序列化，会生成全新对象；枚举序列化只会保存名字，反序列化依然返回同一个 INSTANCE。

### ❌ 缺点

1. **饿汉式加载**：类加载就创建实例。如果这个单例很大，并且程序全程不用，会浪费内存；
2. 无法实现懒加载（用到的时候才创建）；
3. 不支持传入动态参数构造（枚举常量在编译期就固定）。

## 对比：几种单例对比速记

表格

| 单例方式 | 懒加载 | 线程安全 | 防反射 | 防序列化 |
| --- | --- | --- | --- | --- |
| 饿汉式 | ❌ | ✅ | ❌ | ❌ |
| DCL 双重检查锁 | ✅ | ✅ | ❌ | ❌ |
| 枚举单例 | ❌ | ✅ | ✅ | ✅ |

## 面试高频问题

问：为什么枚举单例是推荐的最佳单例？

> 
> 答：代码简洁；JVM 从底层保证实例唯一；自动防止反射、序列化带来的单例破坏问题。

问：枚举单例可以有业务方法吗？

> 
> 答：可以，就像上面示例，枚举里可以写成员变量、get 方法、业务方法。


Java 中 volatile 关键字能不能用来修饰方法？

✅ **参考答案**
**volatile 不能修饰方法，只能修饰变量（成员变量、静态变量）。**

1. volatile 是**变量修饰符**，作用：保证变量可见性、禁止指令重排；
2. 方法层面没有可见性、指令重排这个概念；Java 语法不支持 volatile 修饰方法，写上去直接编译报错。

> 
> 补充：可以修饰方法的关键字：`public/private/protected/static/final/abstract/synchronized`。
> `synchronized`才是修饰方法，保证线程原子性。

## 代码块（4 种）

### 1. 局部代码块（方法内）

作用：限定变量作用域，变量出 {} 就销毁

```java
public void test(){
    {
        int a = 10;
        System.out.println(a);
    }
    // a 这里访问不到
}
```

### 2. 构造代码块（类中，方法外）

每次`new对象`**在构造方法之前执行**，多个构造器公共逻辑抽取

```java
class Demo{
    {
        System.out.println("构造代码块执行");
    }
    public Demo(){
        System.out.println("构造方法");
    }
}
new Demo();
//输出：构造代码块执行 → 构造方法
```

### 3. 静态代码块 static {}

**类加载阶段执行，只执行 1 次**，优先于构造代码块。用于初始化静态资源、加载配置。

```java
class Demo{
    static{
        System.out.println("静态代码块");
    }
}
```

> 
> 执行顺序：静态代码块 → 构造代码块 → 构造方法

### 4. 同步代码块 `synchronized(锁对象){}`

多线程，锁粒度更小，控制并发。

```java
synchronized (this) {
    // 线程安全代码
}
```

> 
> 执行顺序总结：
> 静态代码块（类加载，仅一次）> 构造代码块（每次 new）> 构造方法

---

## 二、内部类

定义：**类里面定义的类**，分为 4 种：成员内部类、静态内部类、局部内部类、匿名内部类。

### 1. 成员内部类（非 static，写在类中方法外）

- 属于外部类实例，**必须先 new 外部类对象，才能 new 内部类**
- 可以访问外部类所有成员（包括 private）

```java
class Outer{
    private String name = "外部类";
    class Inner{
        public void show(){
            System.out.println(name);
        }
    }
}
// 使用
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.show();
```

### 2. 静态内部类（static class，也叫嵌套类）⭐常用

- 属于外部类本身，**不需要外部类实例**，直接`Outer.Inner`
- 只能访问外部类`static`成员，不能直接访问外部实例变量

```java
class Outer{
    static String staticVal = "静态外部变量";
    static class StaticInner{
        public void show(){
            System.out.println(staticVal);
        }
    }
}
//使用
Outer.StaticInner inner = new Outer.StaticInner();
```

> 
> 开发场景：DTO / 枚举里面放静态内部类；单例也可以用静态内部类（静态内部类单例）

### 3. 局部内部类（写在方法里面）

方法内定义的类，只能当前方法内使用，访问方法变量要求变量 final/effectively final

### 4. 匿名内部类（没有名字，一次性使用）

**没有类名，继承类 / 实现接口**，JDK8 前替代简单接口实现，JDK8 后很多可以被 Lambda 替代

```java
Runnable run = new Runnable() {
    @Override
    public void run() {
        System.out.println("匿名内部类");
    }
};
run.run();
```

> 
> 匿名内部类 对比 Lambda：
> 匿名内部类：可以重写多个方法；this 指向内部类对象
> Lambda：只能函数式接口（一个抽象方法）；this 指向外层类

---

## 三、函数式编程 & Lambda（JDK8）

### 函数式接口

**只有 1 个抽象方法的接口**，可以加注解`@FunctionalInterface`校验

```java
@FunctionalInterface
interface Calc{
    int compute(int a,int b);
}
```

内置四大核心函数式接口（面试高频）

1. `Consumer<T>` 消费型：void accept (T t)，有入参无返回
2. `Supplier<T>` 供给型：T get ()，无入参有返回
3. `Function<T,R>` 函数型：R apply (T t)，入参 T，返回 R
4. `Predicate<T>` 判断型：boolean test (T t)，入参返回布尔

### Lambda 表达式（函数式接口的简写）

语法：`(参数列表) -> {方法体}`

```java
Calc c = (a,b) -> a+b;
System.out.println(c.compute(1,2));
```

简写规则：

1. 参数只有 1 个，可以省略括号：`x -> x*2`
2. 方法体只有一行，省略`{}`和 return，自动返回结果

> 
> Lambda 本质：**函数式接口的实例**，不是类，没有生成新类（底层是 invokedynamic）
> Lambda 中 this：**指向外层对象**，这点和匿名内部类不一样！

### Stream 流（函数式编程常用配套）

集合的流式处理，链式调用：filter、map、sorted、collect

```java
List<String> list = Arrays.asList("a","bb","ccc");
list.stream()
    .filter(s->s.length()>1)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

---

## 四、方法引用 Method Reference

Lambda 的进一步简写，**当 Lambda 只是调用一个已有方法时，用方法引用**，可读性更高
语法 4 类：

### 1. 对象：：实例方法

```java
List<String> list = Arrays.asList("1","2");
list.forEach(System.out::println);
//等价于 list.forEach(s->System.out.println(s));
```

### 2. 类：：静态方法

```java
Function<BigDecimal,Integer> func = BigDecimal::intValue;
//等价：bd -> bd.intValue()
```

###3. 类：：实例方法（特殊：参数是调用方法的对象）

```java
Function<String,Integer> f = String::length;
//等价 s -> s.length()
```

###4. 构造器引用 类::new

```java
Supplier<String> sup = String::new;
//等价 ()->new String()
```

> 
> 一句话区分：Lambda 是写逻辑；方法引用直接复用已经存在的方法。

# 高频对比面试题

1. 成员内部类和静态内部类区别
2. 匿名内部类和 Lambda 的 this 区别
3. 函数式接口可以有多个抽象方法吗？答：不行，只能 1 个；可以有多个 default/static 方法
4. Lambda 能不能访问非 final 局部变量？只能 effectively final（变量赋值一次不再修改）

## 1. static 关键字回顾

作用：**修饰的内容属于类，不属于实例对象**

- static 变量：静态变量，类加载初始化，所有对象共享同一份内存
- static 方法：静态方法，只能直接访问 static 成员，**不能用 this**，不能直接访问实例成员
- static 代码块：类加载执行，仅运行一次，初始化静态资源
- static 内部类（静态嵌套类）：不依赖外部类实例，只能直接访问外部 static 成员

> 
> 核心：`static` = 和类绑定，不依赖 new 对象

## 2. synchronized

**锁，解决多线程原子性问题**，保证：原子性、可见性、有序性
三种用法：

1. 修饰实例方法：锁是**当前对象 this**

```java
public synchronized void test(){}
```

2. 修饰静态方法：锁是**类对象（Class）**

```java
public static synchronized void test(){}
```

3. 同步代码块：自定义锁对象，锁粒度更细

```java
synchronized (obj) {
    
}
```

> 
> 对比 volatile：volatile 保证可见性 + 禁止重排，**不保证原子性**；synchronized 三者全都保证。
>

## BigDecimal

Java 专门用于**高精度小数计算**，解决浮点数 double/float 精度丢失问题。
特性：

1. **不可变类**，加减乘除都会返回新 BigDecimal 对象，原对象不变
2. 推荐用`new BigDecimal("字符串")`构造，不要直接`new BigDecimal(0.1)`（浮点失真）
3. 运算方法：add/subtract/multiply/divide；除法必须指定**保留位数 + 舍入模式**，否则除不尽抛异常
4. 比较：**不要用`==`，不要用 equals**；用`compareTo()`
   - `a.compareTo(b) > 0`：a 大于 b
- `a.compareTo(b) ==0`：相等

## BigDecimal#intValue()

```java
BigDecimal num = new BigDecimal("123.999");
int i = num.intValue();
System.out.println(i); // 123
```

- 作用：把 BigDecimal 转 int，**直接截断小数，不是四舍五入**（向 0 取整）
- ⚠️重大坑：**超出 int 范围时，直接截断高位，不会抛异常！**

```java
BigDecimal big = new BigDecimal("3000000000"); //超过int最大值2147483647
int val = big.intValue(); // 不会报错，但结果错误！
```

> 
> 安全方案：`intValueExact()`，超出 int 范围**直接抛 ArithmeticException**，适合强校验场景。

---

1. Arrays.asList 生成的 list 能不能 add？为什么？

> 
> 不能。底层是固定数组包装，不支持新增删除，调用 add 抛 UnsupportedOperationException。

2. Stream filter 和 map 的区别？

> 
> filter：过滤，元素数量可能变少；map：转换，元素数量不变，改变元素内容。

3. BigDecimal 比较为什么不用 equals？

> 
> equals 会比较**数值 + 小数位数**。new BigDecimal ("2.0") 和 new BigDecimal ("2") equals 返回 false；compareTo 只比较数值。

4. synchronized 修饰静态方法和实例方法，锁对象分别是什么？

> 
> 实例方法锁 this；static 静态方法锁当前类的 Class 对象。
>

# 1. 成员内部类 和 静态内部类区别

表格

| 对比项 | 成员内部类（非 static） | 静态内部类（static 嵌套类） |
| --- | --- | --- |
| 依赖外部实例 | **必须先创建外部类对象，才能 new 内部类** | 不需要外部类实例，直接`Outer.Inner` |
| 访问权限 | 可访问外部类所有成员（static + 实例成员，含 private） | **只能访问外部类 static 成员，不能直接访问外部实例变量** |
| this 含义 | this 代表内部类对象；`Outer.this`拿到外部类对象 | this 代表静态内部类对象，没有外部类实例引用 |
| 创建语法 | `Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();` | `Outer.StaticInner inner = new Outer.StaticInner();` |

一句话总结：成员内部类绑定**外部对象**；静态内部类绑定**外部类**。

# 2. 匿名内部类和 Lambda 的 this 区别

- **匿名内部类**：`this` 指向**匿名内部类自己的实例**
- **Lambda 表达式**：`this` 指向**外层方法所在类的对象**（外围类实例）

示例：

```java
public class Test {
    public void test() {
        //匿名内部类
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println(this); //this 是匿名内部类对象
            }
        };
        //Lambda
        Runnable r2 = () -> {
            System.out.println(this); //this 是Test对象，外层类
        };
    }
}
```

#3. 静态代码块、构造代码块执行顺序
**静态代码块 static {} → 构造代码块 {} → 构造方法**

- 静态代码块：**类加载的时候执行，整个程序生命周期只执行 1 次**
- 构造代码块：**每次 new 对象时，在构造方法执行之前执行**

```java
class Demo{
    static{ System.out.println("静态代码块"); }
    { System.out.println("构造代码块"); }
    public Demo(){ System.out.println("构造方法"); }
}
// new Demo(); 输出顺序：静态代码块 → 构造代码块 → 构造方法
```

#4. 静态内部类能不能访问外部类的实例成员变量？
**不能直接访问。**
静态内部类属于外部类本身，不持有外部类对象引用；
实例成员变量属于外部类的**对象**，必须有外部实例才能访问。

> 
> 如果一定要访问：手动传入外部类对象，通过外部对象引用访问实例变量。

#5. 什么是函数式接口，@FunctionalInterface 作用
**函数式接口：有且仅有 1 个抽象方法的接口；可以包含多个 default、static 方法。**

`@FunctionalInterface`：注解，**编译期校验**

1. 加上该注解，编译器检查接口，**如果抽象方法数量≠1，直接编译报错**
2. 可选注解，不加只要满足条件依然是函数式接口；推荐写上，防止误新增抽象方法。

> 
> 作用：专门给 Lambda 表达式使用。

#6. 方法引用是什么，有哪 4 种写法
方法引用：Lambda 的简写。**当 Lambda 里面仅仅是调用一个已经存在的方法，没有额外逻辑，就可以使用方法引用。**
4 种类型：

1. **对象：：实例方法**
`System.out::println` 等价 `s -> System.out.println(s)`
2. **类：：静态方法**
`BigDecimal::valueOf` 等价 `num -> BigDecimal.valueOf(num)`
3. **类：：实例方法**
`String::length` 等价 `s -> s.length()`
4. **构造器引用 类::new**
`String::new` 等价 `() -> new String()`


### 快速自测（背诵版精简答案，面试口述）

1. 成员内部类依赖外部对象，可以访问外部实例变量；静态内部类属于外部类，不依赖外部实例，只能访问外部 static 变量。
2. 匿名内部类 this 指向内部类自身；Lambda 的 this 指向外层类对象。
3. 静态代码块（类加载一次）> 构造代码块（每次 new，构造前执行）> 构造方法。
4. 静态内部类**不能直接访问外部类实例成员变量**。
5. 只有一个抽象方法的接口；@FunctionalInterface 编译校验抽象方法数量。
6. Lambda 简写，直接复用已有方法；4 种：对象：：实例方法、类：：静态方法、类：：实例方法、类::new 构造引用。


### 异常处理

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            show();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    public  static void show() throws Exception {
        String str = "2026-10-18 11:12:13";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = sdf.parse(str);

        InputStream is = new FileInputStream("D:/tutu.png");
    }
}
```


## Java 泛型（Generic）

**泛型：参数化类型，把类型当作参数，编译期做类型检查，避免强转、类型转换异常，编译后会擦除。**

> 
> 泛型只在**编译阶段生效**，运行时会做**类型擦除**。
>

### 型类

```java
// T：类型参数，代表任意引用类型
public class Box<T> {
    private T data;
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}

// 使用
Box<String> box = new Box<>();
Box<Integer> intBox = new Box<>();
```

### 泛型方法

```java
// <T>写在方法返回值前面
public static <T> void print(T obj) {
    System.out.println(obj);
}
```

### 泛型接口

```java
public interface MyInterface<T> {
    T getValue();
}
// 实现时指定类型
class Impl implements MyInterface<String>{
    @Override
    public String getValue() {return "test";}
}
```

## 3. 通配符？

`?` 代表**未知类型**，多用于方法参数

1. `List<?>`：任意类型集合，可以读，**不能 add（除 null）**

```java
public void show(List<?> list){
    Object o = list.get(0);
    // list.add("aaa"); // 编译报错，不知道是什么类型
}
```

2. `? extends Animal` 上界通配符：**只能是 Animal 或它子类**

> 
> ✅ 读可以，❌ 不能 add（除 null）

```java
// 只能传Animal、Dog、Cat
void test(List<? extends Animal> list){
    Animal a = list.get(0);
}
```

3. `? super Dog` 下界通配符：**只能是 Dog 或它父类**

> 
> ✅ 可以 add Dog 及子类，读出来只能是 Object

```java
void test(List<? super Dog> list){
    list.add(new Dog());
}
```

> 
> 记忆口诀：**上界读，下界写**
> 
> 
> - `extends`：取数据（读）
> - `super`：存数据（写）

## 4. 类型擦除（面试高频）

泛型是**编译期语法糖**
编译之后，字节码会把泛型信息抹掉：

- `List<String>` → `List`
- `T` 会替换成边界类型，无边界就变成 Object

```java
List<String> sList = new ArrayList<>();
List<Integer> iList = new ArrayList<>();
// 运行时两者是同一个类型
System.out.println(sList.getClass() == iList.getClass()); // true
```

⚠️ 因为擦除，**不能用泛型做重载区分**

```java
// ❌ 编译报错，两个方法擦除后都是 test(List)
void test(List<String> list){}
void test(List<Integer> list){}
```

## 5. 常用字母约定（规范，不是强制）

- `T` Type：一般类型
- `E` Element：集合元素
- `K` Key，`V` Value：键值对（Map<K,V>）
- `R` Return：返回值类型

## 6. 泛型不能做的事（面试考点）

1. 不能 `new T()`，不能 new 泛型对象
2. 不能 `T[] arr = new T[10]`，不能直接创建泛型数组
3. 不能用 `instanceof` 判断泛型：`obj instanceof List<String>` 编译报错
4. 静态变量不能使用类上定义的泛型 T（静态不属于实例）

## 7. 和你业务代码关联举例

你写统一返回 `Result<T>`，就是典型泛型：

```java
public class Result<T> {
    private String code;
    private String msg;
    private T data;
}
// 接口返回 Result<User>、Result<List<Order>>
```

前面全局异常 `Result<Void>`：代表没有 data，泛型传入 Void。


```java
public class Demo {
    public static void main(String[] args) {
        ArrayList<String> list1 = new ArrayList<>();
        list1.add("Java 入门");
        list1.add("宁夏枸杞");
        list1.add("黑枸杞");
        list1.add("保温杯");
        list1.add("特级枸杞");
        list1.add("枸杞子");
//        for(int i=0; i<list1.size(); i++){
//            String name = list1.get(i);
//            if(name.contains("枸杞")){
//                list1.remove(name);
//                i--; // 解决方案1：删除数据后做一步i--操作。因为删除是操作原数据，删除第i条数据后，i+1条数据会自动变成i,但下一步循环为i+1,导致新上来的数据漏掉。
//            }
//        }

        // 方案2：倒着遍历并删除（前提是支持索引）
//        for (int i = list1.size()-1; i >=0 ; i--) {
//            String name = list1.get(i);
//            if (name.contains("枸杞")){
//                list1.remove(name);
//            }
//        }

        // 方案：3 迭代器
        // 迭代器遍历并删除，默认也存在并发修改异常问题。可以使用迭代器自己的方法来删除。
//        Iterator<String> it = list1.iterator();
//        while (it.hasNext()){
//            String name = it.next();
//            if(name.contains("枸杞")){
//                it.remove(); // 使用迭代器自己的方法删除
//            }
//        }

        // 使用迭代器自己的方法删除
        list1.removeIf(name -> name.contains("枸杞"));

        // 使用增强for 还有lambda (都没有办法解决并发修改异常问题)
//        for (String s: list1){
//            if (s.contains("枸杞")){
//                list1.remove(s);
//            }
//        }
        // 不能解决并发修改异常问题
//        list1.forEach(s -> {
//            if (s.contains("枸杞")){
//                list1.remove(s);
//            }
//        });

        // 如果集合支持索引，可以使用for循环遍历，每删除数据后做i--;或者可以倒着遍历
        //不能使用索引，可以使用迭代器遍历，并用迭代器提供的删除方法删除数据。
        //注意:增强for循环/Lambda遍历均不能解决并发修改异常问题，因此增它们只适合做数据的遍历，不适合同时做增删操作。

        System.out.println(list1);
    }
}
```
### Collection（java.util.Collection）

**Collection 是【单元素集合】根接口，继承 Iterable，不能直接 new，只有子接口实现；Map 和 Collection 平级，不属于它！**

> 
> 一句话区分：
> 
> 
> - Collection：一个一个存元素 `[A,B,C]`
> - Map：键值对 `{k1:v1, k2:v2}`

## 继承树

```txt
Iterable
└── Collection<E>
    ├── List（有序、可重复、有下标）
    │    ├ ArrayList（数组，查询快）
    │    ├ LinkedList（双向链表，头尾增删快）
    │    └ Vector（老，同步锁，性能差）
    ├── Set（不重复）
    │    ├ HashSet（无序，哈希）
    │    ├ LinkedHashSet（插入顺序）
    │    └ TreeSet（自然排序，红黑树）
    └── Queue/Deque（队列、双端队列 FIFO/LIFO）
         ├ ArrayDeque（推荐栈/队列）
         ├ LinkedList
         └ PriorityQueue（优先级堆）
```

## Collection 通用核心方法（所有 List/Set/Queue 都有）

```java
boolean add(E e)                // 添加元素
boolean remove(Object o)        // 删除元素
boolean contains(Object o)      // 是否包含
int size()                      // 元素个数
boolean isEmpty()               // 是否空
void clear()                    // 清空
boolean addAll(Collection<?> c)  // 批量加入
boolean removeAll(Collection<?> c)
boolean retainAll(Collection<?> c)
Iterator<E> iterator()          // 迭代器遍历
Stream<E> stream()               // java8流式处理
```

## 三大子接口对比

表格

| 接口 | 是否有序 | 是否允许重复 | 特点 |
| --- | --- | --- | --- |
| List | ✅ 插入顺序，支持下标 get (i) | ✅ 允许重复 | 最常用 |
| Set | HashSet 无序 / LinkedHashSet 插入序 / TreeSet 排序 | ❌ 不能重复 | 去重场景 |
| Queue | FIFO 先进先出 | ✅ 允许重复 | 任务排队 |

## 遍历 4 种方式

```java
Collection<String> coll = new ArrayList<>();
coll.add("a");coll.add("b");

//1. iterator（遍历中删除元素推荐这个，foreach删会报并发修改异常）
Iterator<String> it = coll.iterator();
while(it.hasNext()){
    String s = it.next();
    // it.remove();
}

//2. foreach（底层还是迭代器，简洁，不能删除）
for(String s : coll){}

//3. forEach lambda
coll.forEach(System.out::println);

//4. stream
coll.stream().filter(...).collect(Collectors.toList());
```

## ⚠️高频坑（结合你刚才的业务）

1. **`Collection`是接口；`Collections`是工具类（静态方法：sort、reverse、synchronizedList），两个名字很容易搞混**

```java
//工具类，不是集合
Collections.sort(list);
```

2. HashSet 去重依赖 `equals()+hashCode()`，两个必须一起重写
3. 遍历的时候**不要直接集合.remove ()**，会抛 `ConcurrentModificationException`，要用迭代器的 remove
4. 泛型：`Collection<String>` 只能放字符串，编译校验类型

## 和你刚才报错关联

你前面的 `custHolderType` 是数组转 List（`List<String>`，属于 Collection），导出字典翻译时遍历这个集合，循环翻译每一项，这个就是典型的 Collection 使用场景：

```java
List<String> custHolderTypeList = ...;
for(String code : custHolderTypeList){
    String label = dictionary.getDictItem("CUST_HOLDER_TYPE", code);
}
```

1. foreach 循环里面**不能直接 list.remove ()**，报 `ConcurrentModificationException`，要用迭代器删除
2. ArrayList 默认初始容量 10，扩容是 **1.5 倍**
3. `Arrays.asList()` 返回的不是 ArrayList！是 Arrays 内部静态类，**不能 add、remove**
4. List 存放自定义对象，contains、indexOf 判断依赖 `equals()`

### 快速区分 List / Set

- List：有序、可重复、有下标 get (index)
- Set：无序（HashSet）、不可重复、没有下标

## Collection 面试高频问答（精简版）

1. **Collection 和 Map 的区别？**
Collection：存**单个元素**，`[e1,e2,e3]`；
Map：存**键值对**，`{k1:v1}`，二者平级，Map 不属于 Collection。
2. **Collection 三大子接口：List / Set / Queue 特点？**

- List：有序、允许重复、支持下标
- Set：不允许重复；HashSet 无序、LinkedHashSet 插入有序、TreeSet 排序
- Queue：队列，FIFO

3. **ArrayList、LinkedList、Vector 区别？**

- ArrayList：底层数组，查询快，中间增删慢，线程不安全（最常用），初始容量 10，扩容 1.5 倍
- LinkedList：双向链表，头尾增删快，随机查询慢，线程不安全
- Vector：数组，方法加`synchronized`，线程安全，性能差，淘汰

4. **HashSet 怎么保证不重复？**
依赖 `hashCode()` + `equals()`；先对比 hash 值，hash 相同再 equals。**两个方法必须一起重写**。
5. **Iterator 和 for-each 的区别？**
for-each 底层也是迭代器；for-each 遍历中**不能直接集合 remove**，会并发修改异常；
Iterator 可以用 `it.remove()` 安全删除。
6. **ConcurrentModificationException 什么时候出现？**
遍历集合时，用集合自身 add/remove 修改元素（迭代器遍历除外）。
7. **Collection vs Collections？**

- Collection：接口，集合顶层父接口
- Collections：工具类，提供静态方法：sort、reverse、synchronizedList、emptyList 等

8. **subList 坑？**`list.subList()` 返回**视图**，不是新 List；对子集合修改会影响原集合。
9. **Arrays.asList 坑？**
返回的是 Arrays 内部静态 List，**固定大小，不能 add/remove**。
10. **ArrayList 扩容流程？**
add 时判断容量不够 → 计算新容量 = old*1.5 → `Arrays.copyOf`拷贝数组。



```java
// Map<String, Double> map = new HashMap<>();
// Set<String> keys = map.keySet();
// for(String key : keys){
//     Integer value = map.get(key);
// }
Map<String, Integer> map = new HashMap<>();
map.put("燕子",18);
Set<String> keys = map.keySet();
for (String key:keys){
    System.out.println(key);
}
Set<Map.Entry<String,Integer>> entries = map.entrySet();
for (Map.Entry<String,Integer> entry:entries){
    String key = entry.getKey();
    Integer value = entry.getValue();
}
// 
map.forEach(new BiConsumer<String, Integer>() {
    @Override
    public void accept(String key, Integer value) {
        System.out.println(key +"="+ value);
    }
});
map.forEach((k,v)->System.out.println(k +"="+ v));
```

