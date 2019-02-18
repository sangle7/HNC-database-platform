# HNC-database-platform

项目地址： http://hncdb.cancerbio.info/

## 构建环境
+ node v8.5+
+ npm v3.6+

## 开发
``` bash
git clone https://github.com/sangle7/HNC-database-platform.git
cd HNC-database-platform
npm install
```
+ 启动前端项目
``` bash
npm run dev:fe 
```
+ 启动服务端
``` bash
npm run dev:ser
```
+ open [localhost:3001](http://localhost:3001)

## 更新

### 前端页面代码更新时
（例如样式变化，页面增添等）
推荐的方式为：
  ```bash
  npm run build
  ```
会自动进行打包构建 打包完毕后自动重启服务器


### 只有服务段代码更新时
（例如数据库更换 etc）
重启服务器即可：
  ```bash
  npm restart 
  ```
会自动重启服务器




