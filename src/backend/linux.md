---
title: Linux
date: 2025-03-07
article: false
---

## Linux

### 查看脚本命令

在 Linux 系统中，查看脚本文件（通常是一个文本文件，以`.sh`结尾，例如`example.sh`）的内容有多种方法。以下是一些常用的命令：

1. **使用 cat 命令**
   cat 命令用于查看文件的内容。你可以通过以下命令查看脚本文件的内容：`cat example.sh`
2. **使用 less 命令**
   less 命令允许你分页查看文件内容，这对于查看大文件特别有用。使用方法如下：`less example.sh`
   在 less 中，你可以使用方向键上下翻页，按 q 退出。
3. **使用 more 命令**
   more 命令与 less 类似，也是用来分页显示文件内容，但功能比 less 简单一些。使用方法如下：`more example.sh`
   在 more 中，你也可以使用空格键翻页，按 q 退出。
4. **使用 head 命令**
   如果你只对文件的前几行感兴趣，可以使用 head 命令。默认情况下，它会显示文件的前 10 行：`head example.sh`
   你可以通过添加参数来改变显示的行数，例如显示前 20 行：`head -n 20 example.sh`
5. **使用 tail 命令**
   与 head 相反，tail 命令用于显示文件的最后几行。默认情况下，它会显示最后 10 行：`tail example.sh`
   同样，你可以通过添加参数来改变显示的行数，例如显示最后 20 行：`tail -n 20 example.sh`
6. **使用 nano, vim, 或 vi 编辑器查看（非分页方式）**
   虽然这些主要是编辑器，但它们也可以用来查看文件内容而不需要分页：
   nano: `nano example.sh`
   查看完毕后，按 Ctrl + X 然后按 Y 确认保存（如果你想保存更改的话），最后按 Enter 退出。
   vim/vi: `vim example.sh`
   或者仅用 vi: `vi example.sh`
   在 vim/vi 中，你可以按:q!来退出而不保存更改，或者按:wq 来保存并退出。
