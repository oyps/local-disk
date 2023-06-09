# Local Disk

> 基于超星云盘 API 和 SQLite 的私有云盘

## 项目信息

- 开发日期：2023 年 3 月 16 日
- 作者主页：https://apee.top
- 项目地址：https://github.com/oyps/local-disk

## 功能特点

- 支持多级文件目录和文件管理，数据保存在本地 SQLite 数据库中
- 无需登录，匿名上传文件到超星云盘，本地只存储文件基本信息

## Docker 部署

在服务器任意路径运行下面的命令：

```bash
docker stop local-disk # 停止原容器
docker rm local-disk # 删除原容器
docker rmi local-disk-image # 删除原镜像
rm -rf local-disk # 删除原文件夹
git clone https://github.com/oyps/local-disk.git # 克隆仓库
docker build -t local-disk-image local-disk # 构建镜像
docker run --name local-disk -p 3000:3000 -d local-disk-image # 创建容器
rm -rf local-disk # 删除残留文件
```