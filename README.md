# Hello, folks! <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px">

> 🦄 This is a wonderful animated carsouel hooks component for React-Native   
> 
> ✨ 为React Native开发的轮播展示动画组件   
>   
> @version:1.0.2   
>    
---
> Powered by Voyz Shen 
>    
> Shanghai Jiao Tong University, Ctrip  
> You can find me on: [Email](18217501371@163.com) /
> [Blog](http://blog.voyz.vip/) /
> [Github](https://github.com/Voyzz) /
> WeChat(voyz_shen1227)


## Catalog
- [Demo](#demo)
- [How to use](#howtouse)
- [Properties](#properties)

---
<span id='demo'><span>
## Demo 

<img align="center" src="https://i.loli.net/2020/09/18/UuDfZM3gpwoIs6P.gif" />

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

