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
  git push origin -d <分支名称>
  git push origin -d abc // 如远程分支的名字为 origin/abc

- Git 2.23
  - git switch 分支名 // 切换分支
  - git switch -c 新分支名 // 创建并切换到新分支

## git分支回退到某次提交

1. ***使用 git reset***
  丢弃之后的提交（硬重置）
如果你想要回退到某个特定的提交，并且丢弃该提交之后的所有更改，可以使用--hard选项。
`git reset --hard <commit-hash>`
这里的`<commit-hash>`是你想要回退到的提交的哈希值。你可以通过git log查看提交历史来找到这个哈希值。

保留之后的提交（软重置）
如果你想要保留之后的提交，但是想要将HEAD指针移动到指定的提交，可以使用--soft选项。
`git reset --soft <commit-hash>`
这将把你的工作目录中的更改保留在暂存区，但是你当前的分支指针将会被重置到指定的提交。

保留部分更改（混合重置）
如果你想要保留一部分更改，但又想丢弃其他的更改，可以先使用`git reset --mixed <commit-hash>`（默认选项，等同于`git reset <commit-hash>`）。
`git reset <commit-hash>`
这将把你的工作目录中的更改保留在工作目录中，但是暂存区将会被重置到指定的提交状态。
2. ***使用git checkout***
虽然git checkout主要用于切换分支和恢复工作树文件，但它也可以用来“检出”特定的提交，但这通常是临时的，因为它不会影响HEAD指针。如果你想临时查看某个特定提交的状态，可以这么做：
`git checkout <commit-hash>`
这会将HEAD移动到指定的提交，但是不会改变你当前分支的指针。如果你想回到原来的分支，可以使用：
`git checkout -`

3. ***使用git revert***
如果你想要回退某个提交，但是又想保留历史记录（即创建一个新的提交来“撤销”之前的提交），可以使用git revert。
`git revert <commit-hash>`
这会创建一个新的提交，该提交会撤销指定提交所做的所有更改。这对于需要保留项目历史清晰性的情况非常有用。

***总结***
选择哪种方法取决于你的具体需求：是否需要保留之后的更改、是否需要保持历史记录清晰等。通常，对于丢弃之后的更改并回到一个特定的状态，使用`git reset --hard`是最直接的。
如果要保留历史记录和更改，使用`git revert`可能更合适。如果你只是想临时查看某个状态而不改变历史，可以使用`git checkout`。

### ESLint 的初始化

`npm init @eslint/config`
