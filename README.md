# react-native-animated-carousel

## Catalog
- [Description](#description)
- [Demo](#demo)
- [How to use](#use)
- [Properties](#properties)

## Description
<span id='description'><span>
> 🦄 A wonderful animated carsouel hooks component for React-Native 
> 
> @version:1.0.2
>  
> 为React Native开发的轮播展示动画组件  
> 
>> Powered by Voyz Shen  
> [Email](18217501371@163.com) /
> [Blog](http://blog.voyz.vip/) /
> [Github](https://github.com/Voyzz) /
> WeChat : voyz_shen1227  

---
<span id='demo'><span>
## Demo 

![demo](https://i.loli.net/2020/09/18/UuDfZM3gpwoIs6P.gif)

---

## How to use
<span id='use'><span>

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

## Properties
<span id='properties'><span>

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

