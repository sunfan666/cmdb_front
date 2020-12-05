# cmdb_front
Vue 实现 CMDB 前端
```
在测试环境下搭建 phoenix_cmdb_web
安装nodejs
nodejs下载地址： https://nodejs.org/zh-cn/

建议下载8.x版本

在windows上安装nodejs
下载 node-v8.xx.msi文件，然后双击运行，下一步、下一步即可安装成功，安装完成后需要将nodejs安装路径加入到系统环境变量里即可

运行node命令，检查是否安装成功
> node -v
v8.11.3


在Linux上安装nvm管理node & npm

1安装版本管理工具git
yum install git
查看git版本
git --version
2 安装Node.js版本管理工具nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
或者
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
还可以用下面这种方法
git clone git://github.com/creationix/nvm.git ~/nvm
验证安装
command -v nvm
设置nvm自动运行
echo "source ~/nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc
查询Node.js版本
nvm list-remote
安装Node.js版本
nvm install v8.6.0
切换Node.js版本
nvm use v8.6.0
升级npm
npm -g

部署phoenix_cmdb_web
下载源码
git clone git@github.com:sunfan666/cmdb_front.git phoenix_cmdb_web
安装 phoenix_cmdb_web 相关依赖包
cd phoenix_cmdb_web
npm install --registry=https://registry.npm.taobao.org
npm install 这步可能会出错， WARN可以直接忽略，如果出现ERR，请重新尝试或者查下资料

修改配置
开发环境的配置文件为： phoenix_cmdb_web/config/dev.env.js

只需要配置下后端的API域名就可以了

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:8000/"'
})
修改BASE_API指向的后端地址就可以了， 注意这里的引号，

起动服务
npm run dev
然后就可通过浏览器访问：http://127.0.0.1:8080
```
