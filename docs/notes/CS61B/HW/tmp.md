---
title: 临时复习文件
createTime: 2025/10/24 18:32:17
permalink: /daily/ls10r2iu/
---

## ASCII
#### ASCII 码的构成

标准的 ASCII 码使用7位二进制数来表示一个字符，所以总共可以表示 27=128 个不同的字符。这128个码位（从0到127）被分成了几个部分：

**a) 控制字符 (Control Characters): 码值 0 - 31** 这些是不可打印的字符，用于控制打印机、终端等设备。

- `\0`：空字符 (NULL)，ASCII码值为 **0**。在C语言中，它被用作字符串的结束标志。
    
- `\n`：换行符 (Newline)，ASCII码值为 **10**。让光标移动到下一行的开头。
    
- `\t`：水平制表符 (Horizontal Tab)，ASCII码值为 **9**。
    

**b) 可打印字符 (Printable Characters): 码值 32 - 127** 这是我们日常键盘上能看到的所有符号。

- **空格 (Space)**: ASCII码值为 **32**。
    
- **数字 '0' - '9'**: ASCII码值为 **48 - 57**。
    
- **大写字母 'A' - 'Z'**: ASCII码值为 **65 - 90**。
    
- **小写字母 'a' - 'z'**: ASCII码值为 **97 - 122**。
    
- **各种标点符号**: 比如 `!` 是 33，`(` 是 40，`+` 是 43 等等。


## 基本格式

```c
#include <studio.h>

int main() {
	printf("Hello\n");
	
	return 0;
} 
```

1. 第一行，字如其名，意为包含 `<>` 内的库，其中的内容代表着C语言的**标准库头文件**，需要不同的工具就需要有不同的头文件库。
2. `return 0` 意味着程序的正常结束。



## 基本数据类型

- `int`  用来存放整数
- `char` 用来存放**单个字符** 其必须用 单引号 括起来
- `double` 存放**小数**（双精度浮点数）
- **字符常量 (Character Constant):** 在C语言中，字符常量是用 **单引号 `' '`** 括起来的 **单个** 字符
## 输入输出
### 数据类型
- `%d` 对应 int 类型 的整数
- `%f` 对应 float 的 浮点数
- `%c` 对应 char 的字符，但只包含单个字符
- `$s` 遇到空白字符就会停止读取
### printf



```c
#include <stdio.h>

int main() {
    int apples = 5;
    printf("I have %d apples.\n", apples);
    return 0;
}
```
在C语言字符串中，**`\\` 会被解释成一个 `\`**。这与 `\"` 被解释成一个 `"` 是同样的道理。
### scanf

格式：`scanf("格式占位符", &变量名);`
请注意变量名前面的 `&` 符号。**它不是可选项，绝对不能省略。** 这个符号是“取地址运算符”

- 当输入 double 类型的数据时，使用`%lf` 而 float 还是正常 %f

## 条件语句

### if - else 
```c
if (条件) {
    // 条件为真时，执行这里的代码
} else {
    // 条件为假时，执行这里的代码
}
```

### else - if 
```c
if (条件1) {
    // 条件1为真时执行
} else if (条件2) {
    // 条件1为假，但条件2为真时执行
} else if (条件3) {
    // 条件1和2都为假，但条件3为真时执行
} else {
    // 以上所有条件都为假时执行
}
```


## 逻辑运算符

1.  `&&` 等价于 AND ，两边内容完全为true时表达式成立
2. `||` 等价于 or ，只要有一边为true则成立
3. `!` 不等于

## 算数运算符

在C语言的算术运算中，字符常量会被自动提升为其对应的ASCII码值

x /= y 等价于 x = x / y
**特别注意！！**，%所操作的两个数必须全为整数
## 杂项运算符


**`&` 是按位与运算符**，它会对两个操作数的二进制表示的每一位进行“与”运算。只有当两个操作数对应的位都为1时，结果的该位才为1，否则为0。

| 运算符    | 描述      | 实例                       |
| ------ | ------- | ------------------------ |
| sizeof | 返回变量的大小 | sizeof(a) 将返回 4，其中 a 是整数 |
| &      | 返回变量地址  |                          |
| ?:     | 条件表达式   | 如果条件为真 ? 则值为 X : 否则值为 Y  |
| *      | 指向一个变量  |                          |
### 三元运算符
**条件运算符 (Conditional Operator)**，也因为它需要三个操作数，所以又被称为 **三元运算符**
基本语法：
```c
condition ? expression_if_true : expression_if_false
```

**解释：**

1. 首先，计算 `condition` (条件)部分。
    
2. 如果 `condition` 的结果为 **真** (在C语言中，任何非零值都算为真)，那么整个表达式的值就是 `expression_if_true` 的值。
    
3. 如果 `condition` 的结果为 **假** (值为0)，那么整个表达式的值就是 `expression_if_false` 的值。

例子：可以理解为紧凑的 if- else
`A ? B : C` 等价于：
```c
if (A) {
    // 结果是 B
} else {
    // 结果是 C
}
```
### sizeof  
a) 基本数据类型
```c
printf("char: %zu bytes\n", sizeof(char));     // 通常输出 1
printf("int: %zu bytes\n", sizeof(int));       // 在32位系统通常是4, 64位系统也通常是4
printf("double: %zu bytes\n", sizeof(double)); // 通常输出 8
```
`%zu` 是专门用来打印 `sizeof` 返回值（`size_t`类型）的格式说明符。

b） 数组

```c
int arr[10]; // 包含10个int元素的数组
// sizeof(arr) 计算的是 10 * sizeof(int)，结果是 40 (假设int是4字节)
printf("Size of arr: %zu bytes\n", sizeof(arr));

char str[] = "abcd"; // 包含 'a','b','c','d','\0' 共5个元素
// sizeof(str) 计算的是 5 * sizeof(char)，结果是 5
printf("Size of str: %zu bytes\n", sizeof(str));
```
与 `strlen`对比：
```c
char arr[] = "hello"; // 包含 'h','e','l','l','o','\0'，共6个元素

// sizeof 计算的是整个数组的内存大小 (6个字符 * 1字节/字符)
printf("sizeof(arr) = %zu\n", sizeof(arr)); // 输出 6

// strlen 计算的是字符串的有效长度 (不包括结束符 '\0')
printf("strlen(arr) = %zu\n", strlen(arr)); // 输出 5
```

对比下来可以发现，
	1. strlen 需要以 \0 结尾，并且不包括 \0 本身 strlen("hello") -> 5
	2. sizeof 则 包括  \0       sizeof("hello)  -> 6


c) 指针
```c
int num = 100;
int *p = &num;

// sizeof(p) 计算的是指针变量p的大小
// 在32位系统上，地址是4字节，输出4
// 在64位系统上，地址是8字节，输出8
printf("Size of pointer p: %zu bytes\n", sizeof(p));

// sizeof(*p) 计算的是指针p所指向的对象的大小
// 因为p指向一个int，所以等价于sizeof(int)，输出4
printf("Size of what p points to: %zu bytes\n", sizeof(*p));
```
## Loops

### while

```c
while (条件) {
    // 循环体：只要条件为真，这里的代码就会被一遍又一遍地执行
}
```
两个循环的**继续条件**（n不为0）和**停止条件**（n为0）是完全一样的，因此它们在逻辑上是**等价**的。在C语言编程中，`while (n)` 是 `while (n != 0)` 的一种更简洁、更常用的写法。


### for

```c
#include <stdio.h>

int main() {
    //   初始化      条件      更新
    for (int i = 1; i <= 5; i++) {
        printf("%d\n", i);
    }
    return 0;
}
```

如果前面已经有过初始化的值，你可以直接使用它
`for ( ; i < 5; i++)` 只需要将第一个值留空
更多的是直接**使用新的循环变量**
`for (int i = counter; i < 5; i++)`


### do-while loop

**do...while** 循环是在循环的尾部检查它的条件
do...while 循环会确保至少执行一次循环
先执行循环体，后判断条件

```c
do
{
   statement(s);

}while( condition );

```
## Array

数组是一个**同种类型**元素的**集合**


1. 声明数组 `类型 名字[大小]；`
	`int score[50]`
2. 访问Array元素 ： **index**.   `score[0]`访问socre中的第一个索引

### 数组长度与字符串长度

| 概念    | 描述                     |     |
| ----- | ---------------------- | --- |
| 数组长度  | 数组在内存中占用的总元素个数（包括 `\0` |     |
| 字符串长度 | 结束符 `\0` 之前的有效字符个数     |     |
### 二维数组

1. 二维数组的理解
**只有第一维的大小可以省略，后续维度必须指定**
`int s[2][3];` 这行代码定义了一个二维数组。你可以把它想象成一个 **2行3列** 的表格：

- 第一个方括号 `[2]` 代表这个表格有 **2 行**。
    
- 第二个方括号 `[3]` 代表这个表格的每一行都有 **3 列**。

类似于一个表格：

|     | 第0列     | 第1列     | 第2列     |
| --- | ------- | ------- | ------- |
| 第0行 | s[0][0] | s[0][1] | s[0][2] |
| 第1行 | s[1][0] | s[1][1] | s[1][2] |
 
## 函数

一个函数包含几个关键部分：

- **返回类型 (Return Type)**：函数完成任务后“交还”给调用者的数据类型。如果不需要返回任何东西，就用 `void`。
    
- **函数名 (Function Name)**：给函数起一个有意义的名字，比如 `calculate_average`。
    
- **参数列表 (Parameter List)**：函数接收的输入数据。
    
- **函数体 (Function Body)**：花括号`{}`中的具体代码。
    
- **`return` 语句**：从函数中返回一个值。


```c
#include <stdio.h>

// 1. 函数声明 (Prototype) - 告诉编译器有这样一个函数
int add(int a, int b);

int main() {
    int x = 10, y = 5;
    
    // 3. 函数调用 (Call)
    int result = add(x, y); 
    
    printf("The sum is: %d\n", result);
    return 0;
}

// 2. 函数定义 (Definition) - 函数的具体实现
int add(int a, int b) {
    int sum = a + b;
    return sum; // 4. 返回值
}
```


## switch 语句

专门处理多分支选择，可读性大于 `if-else`

 语法结构：
```python
switch (要检查的变量) {
    case 常量值1:
        // 如果变量等于常量值1，执行这里的代码
        break; // 极其重要！
    case 常量值2:
        // 如果变量等于常量值2，执行这里的代码
        break; // 极其重要！
    default:
        // 如果变量不等于上面任何一个case的值，执行这里的代码
        break;
}
```
示例：
```c
int day = 2;
switch (day) {
    case 1:
        printf("Monday\n");
        // 没有 break!
    case 2:
        printf("Tuesday\n"); // case 2 匹配，从这里开始执行
        // 没有 break!
    case 3:
        printf("Wednesday\n");
        break; // 遇到 break，跳出 switch
    case 4:
        printf("Thursday\n");
        break;
}
```

## 指针


1. **取地址运算符**  `&`
	- **作用：** 获取一个变量的内存地址
	- **读作：** 什么什么的地址
2. 解应用运算符 `*`
	- **作用：** 获取指针所指向的地址中存放的值
	- **读作：** 什么什么地址的值


```c
#include <stdio.h>

int main() {

	int var = 25;
	int *ptr;
	ptr = &var;
	
	printf("变量 var 的值是: %d\n", var); 
	printf("变量 var 的内存地址是: %p\n", &var); 
	printf("指针 ptr 自身存储的内容 (也就是var的地址) 是: %p\n", ptr); 
	printf("通过指针 ptr 获取它所指向地址中的值 (*ptr) 是: %d\n", *ptr);
	
	return 0;
}
```


输出的结果：
```c
变量 var 的值是: 25
变量 var 的内存地址是: 0x16d9a29d8
指针 ptr 自身存储的内容 (也就是var的地址) 是: 0x16d9a29d8
通过指针 ptr 获取它所指向地址中的值 (*ptr) 是: 25
```

### 指针与数组

**一个数组的名字，本质上就是一个指针**
**一个数组的名字，其本身就是一个指向数组 第一个元素 的指针。**
### 指针算数


## 部分函数
### strlen
```c
#include <stdio.h>
#include <string.h> // 需要包含这个头文件

int main() {
    char s[] = {'I', '\0', 'h', 'a', 'v'};
    printf("%d\n", strlen(s));
    return 0;
}
```
问：执行后，结果输出什么？
答： 1

strlen函数是统计在 `\0` 前的字符总数，但是本身不算。

### pow
计算幂
```c
#include <math.h>

double pow(double x, double y);
float powf(float x, float y);
long double powl(long double x, long double y);

```
- 返回 `x` 的 `y` 次幂，即 `x^y`。

## 运算符优先级

| 优先级 | 类别             | 运算符示例                                        | 说明              |
| --- | -------------- | -------------------------------------------- | --------------- |
| 最高  | 第1级: 单目运算符     | `!` (逻辑非), `++` (自增), `--` (自减), `*` (指针解引用) | 只需要一个操作数，优先级非常高 |
|     | 第2级: 算术运算符     | `*` (乘), `/` (除), `%` (取模)                   | 先乘除取模...        |
|     | 第3级: 关系运算符     | `+` (加), `-` (减)                             |                 |
|     | 第4级: 相等运算符     | `<` , `>` , `<=` , `>=`                      |                 |
|     | **第5级: 逻辑运算符** | `&&` (逻辑与)                                   |                 |
| 最低  |                |                                              |                 |
|     | 第6级: 赋值运算符     | `=` , `+=` , `-=` 等                          | 赋值运算通常是最后才做的    |

## 结构体

**结构**是 C 编程中另一种用户自定义的可用的数据类型，它允许您存储不同类型的数据项。

使用结构体分为三步：**定义 (蓝图) -> 声明 (创建对象) -> 访问 (使用)**

第一步 定义 struct
```c
// 定义一个名为 "Student" 的结构体蓝图
struct Student {
    char name[50];  // 成员1: 姓名 (字符数组)
    int age;        // 成员2: 年龄 (整数)
    int id;         // 成员3: 学号 (整数)
    float score;    // 成员4: 分数 (浮点数)
}; // 注意：定义末尾必须有分号 ;
```


第二布 声明结构体变量
```c
#include <stdio.h>

// main 函数需要知道蓝图是什么，所以定义通常放在 main 上面
struct Student {
    char name[50];
    int age;
    int id;
    float score;
};

int main() {
    // 根据 Student 蓝图，创建了两个具体的学生变量：s1 和 s2
    struct Student s1;
    struct Student s2;

    // ... 后面可以对 s1 和 s2 进行操作
    return 0;
}
```


第三步 访问结构体成员

我们使用 **点运算符 `.`** 来访问一个结构体变量内部的成员。
语法是`变量名`.`成员名`
```c
#include <stdio.h>
#include <string.h> // 因为要用 strcpy，所以包含这个头文件

struct Student {
    char name[50];
    int age;
    int id;
    float score;
};

int main() {
    struct Student s1;

    // --- 给 s1 的成员赋值 ---
    // 对于字符数组成员，需要用 strcpy 函数来赋值
    strcpy(s1.name, "Alice");
    s1.age = 18;
    s1.id = 1001;
    s1.score = 92.5;

    // --- 读取并打印 s1 的成员值 ---
    printf("学生姓名: %s\n", s1.name);
    printf("学生年龄: %d\n", s1.age);
    printf("学生学号: %d\n", s1.id);
    printf("学生分数: %.1f\n", s1.score);

    return 0;
}
```

### typedef

你现在已经掌握了 `struct` 的基本用法。但你可能也注意到了，每次声明变量都要写 `struct Student`，感觉有点长。

**`typedef` 的作用就是给 `struct Student` 这个有点长的类型名，起一个简洁的别名。**

```c
typedef struct { // 这里可以省略结构体名 "Student"
    char name[50];
    int age;
    int id;
    float score;
} Student_t; // 这个 Student_t 就是我们起的新别名
```


```c
#include <stdio.h>
#include <string.h>

// 使用 typedef 定义结构体并创建别名 Student_t
typedef struct {
    char name[50];
    int age;
    int id;
    float score;
} Student_t;

// 定义一个打印学生信息的函数，参数类型直接用别名
void printStudentInfo(Student_t stu) {
    printf("--------------------\n");
    printf("姓名: %s\n", stu.name);
    printf("年龄: %d\n", stu.age);
    printf("学号: %d\n", stu.id);
    printf("分数: %.1f\n", stu.score);
    printf("--------------------\n");
}

int main() {
    // 声明变量时，直接使用别名即可，不再需要写 struct
    Student_t s1;
    
    strcpy(s1.name, "Alice");
    s1.age = 18;
    s1.id = 1001;
    s1.score = 92.5;

    // 将结构体变量 s1 作为整体传递给函数
    printStudentInfo(s1);

    return 0;
}
```

## math.h常用函数

| 函数        | 说明     | 示例                                |
| --------- | ------ | --------------------------------- |
| pow(x, y) | 计算幂    | pow(2,2)                          |
| sqrt()    | 算术平方根  |                                   |
| exp(x)    | 计算自然指数 | `exp(1.0)` 返回约 `2.71828` (自然常数 e) |
| log       |        |                                   |
| cbrt      | 计算立方根  |                                   |
|           |        |                                   |



## 文件操作
在 C 语言中，我们不直接操作物理文件，而是通过一个叫做 **“流 (Stream)”** 的抽象概念来交互。你可以把“流”想象成一个连接你的程序和文件之间的管道

为了管理这个管道，程序需要一个“遥控器”，这个遥控器就是一个特殊类型的指针，叫做 **`FILE *`** (文件指针)。你可以把它想象成你去图书馆借书时拿到的**图书借阅卡**，它记录了你要操作的是哪本书（哪个文件），以及你读到了哪一页（文件读写位置）

整个文件操作的生命周期可以分为三个标准步骤：

1. **打开文件**：获取这张“借阅卡”（`FILE *` 指针）。
    
2. **读/写文件**：通过“借阅卡”对文件进行读取或写入数据。
    
3. **关闭文件**：归还“借阅卡”，结束操作。
    

---
1. 第一步 打开文件（fopen）
	我们使用 `fopen()` 函数来打开一个文件，并获取它的 `FILE *` 指针。
	```c
	FILE *fopen(const char *filename, const char *mode);
	// mode 为打开文件的方式
	```
	常见打开文件的方式如：r， rb ，wb

	**非常重要的一步：检查是否打开成功** 如果 `fopen()` 因为某些原因（如文件不存在、没有权限等）失败了，它会返回一个 `NULL` 指针。所以，每次打开文件后，**必须**检查返回值

2.

3. 关闭文件
	文件使用完毕后，一定要记得关闭它。这就像你离开图书馆时要归还借阅卡一样
```c
int fclose(FILE *fp);
```

总例子：
```c
#include <stdio.h>

int main() {
    FILE *fp;

    // --- 1. 写入文件 ---
    printf("正在写入文件 data.txt...\n");
    // 以写入模式打开文件
    fp = fopen("data.txt", "w");
    if (fp == NULL) {
        perror("无法创建文件");
        return 1;
    }
    // 写入一些内容
    fprintf(fp, "Hello, World!\n");
    fprintf(fp, "This is a test file.\n");
    // 关闭文件，确保内容写入磁盘
    fclose(fp);
    printf("写入完成。\n\n");

    // --- 2. 读取文件 ---
    printf("正在读取文件 data.txt 的内容：\n");
    // 以只读模式重新打开文件
    fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("无法读取文件");
        return 1;
    }

    int c; // 使用 int 变量来接收字符和 EOF
    // 循环读取并打印，直到文件末尾
    while ((c = fgetc(fp)) != EOF) {
        putchar(c);
    }

    // 关闭文件
    fclose(fp);
    printf("\n读取完成。\n");

    return 0;
}
```