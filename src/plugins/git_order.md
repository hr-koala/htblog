---
title: git 命令
date: 2025-02-26
article: false
---

## git 命令

> git init
> git clone xxx
> git status
> git add .
> git commit -m "fea: xxx;"
> git push

使用 Git 下载指定分支命令为：git clone -b 分支名仓库地址 ； -b 表示要从分支下载

1. git branch -r
2. git status
3. git branch optimize
4. git checkout optimize // 切换分支 `git checkout <分支名称>`
5. git push -u origin optimize
6. git add .
7. git commit -m 'web 端优化'
8. git remote add origin [gitee 仓库地址] // 添加 remote 仓库地址:
9. git push origin master -u // -u 可不传 // 将项目内容推送到 gitee:
10. git branch -d <branch_name> // 删除本地的 Git 分支
11. git branch -D <branch_name> // 强制删除本地分支
12. git branch -a // 查看所有分支

- 1.切换分支
  `git checkout <分支名称>`
- 2.创建并切换分支
  `git checkout -b <新分支名称>`
  - 相当于执行了以下两个命令
    `git branch new-feature`
    `git checkout new-feature`
- 3.重命名本地分支
  `git branch -m <新分支名称>`
  - 重命名一个不是当前分支的分支
    `git branch -m <旧分支名称> <新分支名称>`
- 4.删除本地分支
  `git branch -d <分支名称>`
  - 如果分支有未合并的更改，并且你确定要删除它，可以使用 -D 选项强制删除：
    `git branch -D <分支名称>`
- 5.使用--force 或-f 选项
- 6.查看远程分支
  - 查看远程库中已有分支，从图中找到自己想要切换的分支名。（remotes/origin/dev，remotes 表示是远程库，origin 表示远程库的名字，dev 表示远程库的分支名）
    `git branch -a`
- 7.先查看本地分支
  `git branch`
- 8.删除远程分支
  `git push origin -d <分支名称>`
  `git push origin -d abc` // 如远程分支的名字为 origin/abc

- Git 2.23
  - `git switch 分支名` // 切换分支
  - `git switch -c 新分支名` // 创建并切换到新分支

## git 分支回退到某次提交

1. **_使用 git reset_**
   丢弃之后的提交（硬重置）
   如果你想要回退到某个特定的提交，并且丢弃该提交之后的所有更改，可以使用--hard 选项。
   `git reset --hard <commit-hash>`
   这里的`<commit-hash>`是你想要回退到的提交的哈希值。你可以通过 git log 查看提交历史来找到这个哈希值。

保留之后的提交（软重置）
如果你想要保留之后的提交，但是想要将 HEAD 指针移动到指定的提交，可以使用--soft 选项。
`git reset --soft <commit-hash>`
这将把你的工作目录中的更改保留在暂存区，但是你当前的分支指针将会被重置到指定的提交。

保留部分更改（混合重置）
如果你想要保留一部分更改，但又想丢弃其他的更改，可以先使用`git reset --mixed <commit-hash>`（默认选项，等同于`git reset <commit-hash>`）。
`git reset <commit-hash>`
这将把你的工作目录中的更改保留在工作目录中，但是暂存区将会被重置到指定的提交状态。

2. **_使用 git checkout_**
   虽然 git checkout 主要用于切换分支和恢复工作树文件，但它也可以用来“检出”特定的提交，但这通常是临时的，因为它不会影响 HEAD 指针。如果你想临时查看某个特定提交的状态，可以这么做：
   `git checkout <commit-hash>`
   这会将 HEAD 移动到指定的提交，但是不会改变你当前分支的指针。如果你想回到原来的分支，可以使用：
   `git checkout -`

3. **_使用 git revert_**
   如果你想要回退某个提交，但是又想保留历史记录（即创建一个新的提交来“撤销”之前的提交），可以使用 git revert。
   `git revert <commit-hash>`
   这会创建一个新的提交，该提交会撤销指定提交所做的所有更改。这对于需要保留项目历史清晰性的情况非常有用。

**_总结_**
选择哪种方法取决于你的具体需求：是否需要保留之后的更改、是否需要保持历史记录清晰等。通常，对于丢弃之后的更改并回到一个特定的状态，使用`git reset --hard`是最直接的。
如果要保留历史记录和更改，使用`git revert`可能更合适。如果你只是想临时查看某个状态而不改变历史，可以使用`git checkout`。

4. **_强制推送到远程仓库_**
   在本地回滚到某次提交后，如果需要将这些更改同步到远程仓库，可以使用以下命令：`git push -f`
   这里的-f 参数表示强制推送，确保远程仓库的分支也更新到当前的提交状态 ‌。



## git 某次提交合并到另一个分支
在Git中，如果你想将一个分支上的某次提交合并到另一个分支，有几种方法可以实现这一操作。以下是几种常见的方法：

1. 方法1：使用`git cherry-pick`
`git cherry-pick`命令可以将一个或多个提交从一个分支应用到另一个分支上。这对于将特定提交从一个分支复制到另一个分支非常有用。
首先，切换到你想要接收提交的分支：`git checkout 目标分支`
使用`git cherry-pick`命令来应用特定提交：`git cherry-pick 提交的哈希值`
其中提交的哈希值是你想合并的那个特定提交的哈希值。你可以通过git log查看提交历史来找到这个哈希值。

2. 方法2：使用`git rebase`
如果你想要将一系列的提交从一个分支移动到另一个分支，可以使用`git rebase`。这通常用于将一个分支的所有更改应用到另一个分支上。
首先，切换到你想要接收更改的分支：`git checkout 目标分支`
使用git rebase命令来应用一系列的提交：`git rebase 起始分支 --onto 目标分支 起始点`

其中起始分支是你原始提交所在的分支，目标分支是你想要将提交合并到的目标分支，起始点是你想要开始复制的提交之前的提交（通常是某个特定的提交哈希值）。

方法3：使用git merge（仅当你想合并整个分支）
如果你想要合并一个完整的分支而不是单个提交，可以使用git merge。但如果你只是想合并一个特定提交，通常不会使用此方法，因为git merge主要用于合并整个分支的历史。

切换到目标分支：

git checkout 目标分支

合并原始分支（如果你只是想合并一个完整的分支）：

git merge 原始分支

注意：
使用cherry-pick或rebase时，如果存在冲突，Git会提示你解决这些冲突。解决冲突后，需要使用git add命令添加解决后的文件，然后继续执行cherry-pick或rebase的命令来完成操作。

在执行这些操作之前，确保你的仓库是干净的（即没有未提交的更改），并且你已经备份了重要的工作，因为这些操作可能会重写历史。

选择合适的方法取决于你的具体需求，例如是只想合并一个特定的提交，还是想将整个分支的更改迁移到另一个分支。
### ESLint 的初始化

`npm init @eslint/config`
