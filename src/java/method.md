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
// this主要用来解决：变量名称冲突问题。
// public void print(String name){
//     System.out.println(this.name + "喜欢"+ name);
// }
// private 关键字修饰成员变量， 只能在本类中被直接访问，其他任何地方不能直接访问。
// 合理暴露：使用public修饰 的get和set方法合理暴露。
```
