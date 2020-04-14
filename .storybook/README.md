[TOC]
# stroybook

## 1、为什么需要stroybook。

- 解决项目开发过程产生的组件功能说明文档需求。
- 解放文档编写工作，尽可能少的编码完成文档，组件完成就约等于文档完成—— `stories` 的编写，调用组件即可。
- 技术案例以及文档在线展示。
- 低级耦合项目应用。

## 2、storybook的功能介绍。
### 1.Plan

- addons：增强storybook能力模块。
- story：`stroies` 调用组件（例子）入口文件的编码展示，通过story我们能通过例子快速的了解到组件（例子）的使用方式。
- htmlDocument：展示组件（例子）html元素节点。
- action：日志信息
- info：react组件通过 `propTypes` 、`defaultProps` 正确的注释，生成api文档

### 2.Preview
- canvas：在线展示组件（例子）可视化区域。
- note：额外的说明，可以导入 `readme.md` 文档。

### 3.Manager

> 以下仅为项目内例子，并不是 `storybook` 特性

- react components
- html document
- other


## 3、storybook应用项目结构浏览

### 1.stories
- 组件（例子）编写处。


### 2.main
- `storybook` 功能注册等配置处。


### 3.preview
- `storybook` 功能全局设置处。


## 4、使用storybook
### 1.启动 npm run storybook
### 2.编写 stories
### 3.打包 npm run build-storybook

>（略过，因为有jenkins）

### 4.发布 jenkins

- 目前根据项目配置

## 5、疑问&需求
## 6、未来

- 整合各项目线组件到 `npm`仓库，独立的 `stroybook` 项目，完完全全解耦应用项目。