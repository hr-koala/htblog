---
title: Electerm
article: false
---

## electerm 介绍与使用

### 1.简介

electerm 是一个跨平台的 `SSH` 客户端，可用于在 Windows，macOS 和 Linux 操作系统上连接和管理远程服务器。它支持多个 SSH 会话，可以同时打开多个标签页和窗口，并具有自动完成、自动重连、多种主题和自定义快捷键等功能，使得使用 SSH 会话更加高效方便。另外，electerm 还支持 SFTP 和端口转发等功能，可以方便地传输文件和管理网络连接。

### 2.高阶特性

除了常规的 `SSH` 连接和 `SFTP` 文件传输，electerm 还提供了一些高级功能，例如：

1. 多种认证方式：支持密码、密钥、双因素认证等多种方式进行身份验证。
2. 内置终端：内置了多种终端模拟器，包括 xterm、VT100、VT220 等，支持 256 色和 unicode 编码。
3. 自定义命令：可以自定义一些常用的命令或者脚本，方便快速执行。
4. 面板布局：可以自定义面板布局，使得多个会话可以同时显示在同一屏幕中。
5. 插件扩展：提供了一些插件，例如 docker、kubernetes 等，可以扩展更多的功能。

总之，electerm 是一个功能丰富、易用性强的 SSH 客户端，适用于需要频繁连接远程服务器的开发者、系统管理员和网络工程师等人群。

### 3.下载地址

[下载地址](`https://github.com/electerm/electerm/releases`)

```ts
// Mac OS用户:
brew install --cask electerm
```


> // 服务器命令
> **`unzip file.zip -d /path/destination`**    // 将文件解压到指定的目录中 
> **mv original_folder new_folder_name**   // mv命令重命名
> **rm test.txt**                    // 删除单个文件
> **rm -r [文件夹名称]**            // 命令删除文件夹. 注意，-r选项用于递归删除文件夹及其所有内容
> **rm -rf [文件夹名称]**          // -r标志代表递归删除，即删除包含的所有文件和子文件夹；-f标志代表强制删除，即无需确认操作
> **`cp -r /path/your/dist/* /www/html/`**   // 强制复制一个文件夹得内容到另一个文件夹
> **ls -ld /var/www/html**        //查看目录的权限
> **sudo rm test.txt**            // sudo命令来提升权限

> 如果文件正在被某个进程使用，可能无法删除。可以使用 `lsof` 命令查找使用该文件的进程，然后停止相关进程后再删除文件。
> - 首先执行 `lsof | grep test.txt` 找到相关进程的PID（进程标识符）。
> - 然后使用`kill`命令停止进程（例如` kill -9 PID`，不过 `-9` 信号比较强硬，可能会导致一些资源未正确释放，也可以先尝试 `kill PID` ）。
> - 最后再尝试删除文件。

> 对于TAR文件，可以使用tar命令的-xvf选项解压，并结合mv命令重命名：
> `tar -xvf original.tar -C /path/destination/`
> `mv original_folder new_folder_name`
>  对于.tar.gz文件
> `tar -xzvf original.tar.gz -C /path/destination/`
> `mv /path/destination/original_folder new_folder_name`
>  对于.tar.bz2文件
> `tar -xjvf original.tar.bz2 -C /path/destination/`
> `mv /path/destination/original_folder new_folder_name`