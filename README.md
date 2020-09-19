<div align=center><img align="center" src="https://i.loli.net/2020/09/19/LYfW67IyjgZoNKq.png" width="250px"/></div>

[![](https://img.shields.io/badge/Wechat--informational?style=social&logo=wechat)](https://i.loli.net/2020/09/19/cdUaruGyjzbMQA7.jpg)
[![](https://img.shields.io/badge/Github--informational?style=social&logo=github)](https://github.com/Voyzz)
[![](https://img.shields.io/badge/Gmail--informational?style=social&logo=gmail)](voyzshen@gmail.com)
[![](https://img.shields.io/badge/Blog--informational?style=social&logo=micro.blog)](http://blog.voyz.vip/)

![](https://img.shields.io/npm/v/react-native-animated-carousel)
![](https://img.shields.io/npm/dt/react-native-animated-carousel)
![](https://img.shields.io/github/last-commit/Voyzz/react-native-animated-carousel)
![](https://img.shields.io/npm/l/react-native-animated-carousel)


# Hello, folks! <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px">


> 🦄 This is a wonderful animated carsouel hooks component for React-Native   
>> 🏆 version:1.0.2   
>> ✨ 为React Native开发的轮播展示动画组件   
>    
> 👨🏻‍💻 Powered by Voyz Shen   
>> 🏫 Shanghai Jiao Tong University, Ctrip  
>> 📮 [My Email](18217501371@163.com)


## Catalog
- [Demo](#demo)
- [How to use](#howtouse)
- [Properties](#properties)

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
    title:'医疗',
    subTitle:'副标题1',
    bgImage:'https://i.loli.net/2020/09/17/qxoJu8G3fe97lrc.png',
    jumpUrl:''
  },
  ...
  {
    title:'生活',
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
| cardList |/|/|Array|data of crads|

### item properties ↓
|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
| title |/|/|String|title of card|
| subTitle |/|/|String| subtitle of card|
| bgImage |/|/|String| background image of card|
| jumpUrl |/|/|String| jump URL of card|

