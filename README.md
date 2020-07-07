## 禅道工具

批量创建任务工具

## 使用方法
* 运行命令
```bash 
npm install
npm run server
```
* 浏览器打开localhost:8081
* 输出禅道用户名密码
* 输入项目id（如http://10.0.1.21/pro/project-task-171-byModule.html的项目id为171）
* 输入模块id（如果没有子模块输入0）


* 任务类型定义
```html
<option value='' title='' data-keys=' '></option>
<option value='design' title='设计' data-keys='sheji sj'>设计</option>
<option value='devel' selected='selected' title='开发' data-keys='kaifa kf'>开发</option>
<option value='test' title='测试' data-keys='ceshi cs'>测试</option>
<option value='study' title='研究' data-keys='yanjiu yj'>研究</option>
<option value='discuss' title='讨论' data-keys='taolun tl'>讨论</option>
<option value='ui' title='界面' data-keys='jiemian jm'>界面</option>
<option value='affair' title='事务' data-keys='shiwu sw'>事务</option>
```