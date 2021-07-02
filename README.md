<div align=center><img align="center" src="https://i.loli.net/2020/09/19/LYfW67IyjgZoNKq.png" width="250px"/></div>

[![](https://img.shields.io/badge/我的微信--informational?style=social&logo=wechat)](https://i.loli.net/2020/09/19/jHmZskwtUTF9oOh.png)
[![](https://img.shields.io/badge/Github--informational?style=social&logo=github)](https://github.com/Voyzz)
[![](https://img.shields.io/badge/我的邮箱--informational?style=social&logo=gmail)](voyzshen@gmail.com)
[![](https://img.shields.io/badge/我的Blog--informational?style=social&logo=micro.blog)](http://blog.voyz.vip/)
[![](https://img.shields.io/badge/ReactNative--informational?style=social&logo=react)](https://reactnative.cn/) 

![](https://img.shields.io/npm/v/react-native-animated-carousel?style=for-the-badge)   
![](https://img.shields.io/npm/dt/react-native-animated-carousel?style=for-the-badge)    
![](https://img.shields.io/github/last-commit/Voyzz/react-native-animated-carousel?style=for-the-badge)
![](https://img.shields.io/npm/l/react-native-animated-carousel?style=for-the-badge) 
![](https://img.shields.io/github/languages/top/Voyzz/react-native-animated-carousel?style=for-the-badge)  

# Hello, folks! <img src="https://i.loli.net/2020/12/25/1uvAhEik2RgCPDp.gif" width="30px">  

 
> 🦄 This is a wonderful animated carsouel hooks component for React-Native     
>> ✨ 为React Native开发的轮播展示动画组件
>    
> 👨🏻‍💻 Powered by Voyz Shen    
>> 🏫 Shanghai Jiao Tong University, Ctrip  


## Catalog
> - [Demo](#demo)
> - [How to use](#howtouse)
> - [Properties](#properties) 
> - [Versions](#versions)

---
<span id='demo'><span>
## Demo 
<div align=center><img align="center" src="https://i.loli.net/2020/09/18/UuDfZM3gpwoIs6P.gif" width="600px" /></div>

---

<span id='howtouse'><span>
## How to use

- install    
``` 
npm i react-native-animated-carousel --save
```

- import  
```
import AnimatedCarousel from 'react-native-animated-carousel'
```

- Demo  

```
const testData = [
  {
    title:'tilte1',
    subTitle:'副标题1',
    bgImage:'https://i.loli.net/2020/09/17/qxoJu8G3fe97lrc.png',
    jumpUrl:''
  },
  ...
  {
    title:'title2',
    subTitle:'副标题12',
    bgImage:'https://i.loli.net/2020/09/17/rgiPpKRafObAQvN.png',
    jumpUrl:''
  }
]

...

<AnimatedCarousel cardList={testData} ></AnimatedCarousel>

```

---

<span id='properties'><span>
## Properties

|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
| cardList |/|/|Array|data of cards|
|||||卡片数据|

### item properties ↓
|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
| title |/|/|String|title of card|
| subTitle |/|/|String| subtitle of card|
| bgImage |/|/|String| background image of card|
| jumpUrl |/|/|String| jump URL of card|

<span id='versions'><span>
## Versions
> - v1.0.1 添加配置参数  
>   
> - v1.0.0 发布组件

