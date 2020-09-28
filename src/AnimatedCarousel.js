import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity,Animated,ScrollView,Dimensions,Linking } from 'react-native';


// ----- static Config -----
const { height:HEIGHT,width:WIDTH } = Dimensions.get('window');
const _useNativeDriver = false;
const vm = (x)=> {return x*WIDTH/375};                                                                              //像素转换
const bigCardSize = vm(112);                                                                                        //大卡片尺寸
const smallCardSize = vm(88);                                                                                       //小卡片尺寸
const topLineCreatePos = 1;                                                                                         //上排卡片插入位置
const bottomLineCreatePos = 2;                                                                                      //下排卡片插入位置
const bigCardLineOneFontSize = vm(20);                                                                              //大卡片第一行字体大小
const bigCardLineTwoFontSize = vm(12);                                                                              //大卡片第二行字体大小
const smallCardLineOneFontSize = vm(15);                                                                            //小卡片第一行字体大小
const smallCardLineTwoFontSize = vm(10);                                                                            //小卡片第二行字体大小
const scrollViewWidth = 4*smallCardSize+2*bigCardSize+6*8+vm(12);                                                   //scrollView宽度

// ----- animate Config -----
const animateDuration = 5000;                                                                                       //单轮动画执行时间
const gap = animateDuration/2;                                                                                      //上下动画间隔时间
const preStartTime = 1500;                                                                                          //执行动画前时间
const maxZoomSize = (e)=>{return 1.2*e}                                                                             //卡片放大尺寸
const minZoomSize = (e)=>{return 0.9*e}                                                                             //卡片缩小尺寸
const cardZoomTime = 1000;                                                                                          //卡片缩放时间
const createCardAnimateGap = [500,250,250]                                                                          //生成卡片动画步进时间
const lineMoveLeftAnimateGap = [500,250,500]                                                                        //整体左侧横移步进时间


export default function AnimatedCarousel(props) {
    const { cardList } = props;
    const _mid = cardList.length >> 1;
    // ----- Data -----
    const  _topCardList = cardList.slice(0,_mid);
    const  _bottomCardList = cardList.slice(_mid);
    let topRebulidList = _topCardList.concat([_topCardList[topLineCreatePos]]);
    let bottomRebulidList = _bottomCardList.concat([_bottomCardList[bottomLineCreatePos]]);

    // ----- States -----
    const [topCradsList, setTopCradsList] = useState(topRebulidList);                                               //上排卡片数据
    const [bottomCradsList, setBottomCradsList] = useState(bottomRebulidList);                                      //下排卡片数据

    // ----- Ref -----
    const topInsertCardSize = useRef(new Animated.Value(smallCardSize)).current;                                    //【上排】插入位卡片
    const topInsertCardtopFontSize = useRef(new Animated.Value(smallCardLineOneFontSize)).current;                  //【上排】插入位卡片 第一行字体大小
    const topInsertCardbottomFontSize = useRef(new Animated.Value(smallCardLineTwoFontSize)).current;               //【上排】插入位卡片 第二行字体大小
    const topInsertCardMarginSize = useRef(new Animated.Value(0)).current;                                          //【上排】插入位卡片margin
    const topSmallToBigToSmallCardSize = useRef(new Animated.Value(smallCardSize)).current;                         //【上排】小->大->小
    const topSmallToBigToSmallCardtopFontSize = useRef(new Animated.Value(bigCardLineOneFontSize)).current;         //【上排】小->大->小 第一行字体大小
    const topSmallToBigToSmallCardbottomFontSize = useRef(new Animated.Value(bigCardLineTwoFontSize)).current;      //【上排】小->大->小 第二行字体大小
    const topBigToSmallToBigCardSize = useRef(new Animated.Value(bigCardSize)).current;                             //【上排】大->小->大
    const topBigToSmallToBigCardtopFontSize = useRef(new Animated.Value(smallCardLineOneFontSize)).current;         //【上排】大->小->大 第一行字体大小
    const topBigToSmallToBigCardbottomFontSize = useRef(new Animated.Value(smallCardLineTwoFontSize)).current;      //【上排】大->小->大 第二行字体大小
    const topBoxMarginSize = useRef(new Animated.Value(0)).current;                                                 //【上排】容器左间距

    const bottomInsertCardSize = useRef(new Animated.Value(bigCardSize)).current;                                   //【下排】插入位卡片
    const bottomInsertCardtopFontSize = useRef(new Animated.Value(bigCardLineOneFontSize)).current;                 //【下排】插入位卡片 第一行字体大小
    const bottomInsertCardbottomFontSize = useRef(new Animated.Value(bigCardLineTwoFontSize)).current;              //【下排】插入位卡片 第二行字体大小
    const bottomInsertCardMarginSize = useRef(new Animated.Value(0)).current;                                       //【下排】插入位卡片margin
    const bottomSmallToBigToSmallCardSize = useRef(new Animated.Value(smallCardSize)).current;                      //【下排】小->大->小
    const bottomSmallToBigToSmallCardtopFontSize = useRef(new Animated.Value(bigCardLineOneFontSize)).current;      //【下排】小->大->小 第一行字体大小
    const bottomSmallToBigToSmallCardbottomFontSize = useRef(new Animated.Value(bigCardLineTwoFontSize)).current;   //【下排】小->大->小 第二行字体大小
    const bottomBigToSmallToBigCardSize = useRef(new Animated.Value(bigCardSize)).current;                          //【下排】大->小->大
    const bottomBigToSmallToBigCardtopFontSize = useRef(new Animated.Value(smallCardLineOneFontSize)).current;      //【上排】大->小->大 第一行字体大小
    const bottomBigToSmallToBigCardbottomFontSize = useRef(new Animated.Value(smallCardLineTwoFontSize)).current;   //【上排】大->小->大 第二行字体大小
    const bottomBoxMarginSize = useRef(new Animated.Value(0)).current;                                              //【下排】容器左间距


    // ----- Effect -----
    // custom hook: useInterval
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    // 循环动画
    useInterval(()=>{
        setTimeout(() => {
            setTopCradsList(rebulidList(topCradsList,topLineCreatePos));
            topCardsAnimate();
        }, preStartTime);
        setTimeout(() => {
            setBottomCradsList(rebulidList(bottomCradsList,bottomLineCreatePos));
            bottomCardsAnimate();
        }, gap+preStartTime);
    },animateDuration)

    // 首轮动画
    useEffect(() => {
        setTimeout(() => {
            setTopCradsList(rebulidList(topCradsList,topLineCreatePos));
            topCardsAnimate();
        }, preStartTime);
        setTimeout(() => {
            setBottomCradsList(rebulidList(bottomCradsList,bottomLineCreatePos));
            bottomCardsAnimate();
        }, gap+preStartTime);
    }, [])

    // ----- Functions -----
    // 列表数据重构
    let rebulidList = (_list,insertPos)=>{
        _list.pop();
        let _left = _list.slice(0,insertPos),
            _right = _list.slice(insertPos);
        _right.unshift(_list[_list.length-1]);
        _right.pop();
        let _new_list = _left.concat(_right);
        _new_list.push(_new_list[insertPos]);
        return _new_list;
    }

    // 上排卡片动画
    let topCardsAnimate = ()=>{
        Animated.parallel([
            // ----------- 生成卡片 ------------
            // 上排生成位卡片
            Animated.sequence([
                Animated.timing(topInsertCardSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardSize,{ toValue: maxZoomSize(smallCardSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardSize,{ toValue: minZoomSize(smallCardSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardSize,{ toValue: smallCardSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver }),
            ]),
            // 上排生成位卡片第一行字体
            Animated.sequence([
                Animated.timing(topInsertCardtopFontSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardtopFontSize,{ toValue: maxZoomSize(smallCardLineOneFontSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardtopFontSize,{ toValue: minZoomSize(smallCardLineOneFontSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardtopFontSize,{ toValue: smallCardLineOneFontSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver }),
            ]),
            // 上排生成位卡片第二行字体
            Animated.sequence([
                Animated.timing(topInsertCardbottomFontSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardbottomFontSize,{ toValue: maxZoomSize(smallCardLineTwoFontSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardbottomFontSize,{ toValue: minZoomSize(smallCardLineTwoFontSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardbottomFontSize,{ toValue: smallCardLineTwoFontSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver }),
            ]),

            // ----------- 位置调整 ------------
            // 位置补偿
            Animated.sequence([
                Animated.timing(topInsertCardMarginSize,{ toValue: smallCardSize/2 - 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardMarginSize,{ toValue: smallCardSize/2 - maxZoomSize(smallCardSize)/2,duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardMarginSize,{ toValue: smallCardSize/2 - minZoomSize(smallCardSize)/2,duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(topInsertCardMarginSize,{ toValue: 0,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver })
            ]),
            // 容器左间距
            Animated.sequence([
                Animated.timing(topBoxMarginSize,{ toValue: maxZoomSize(smallCardSize*0.5)/2*-1,duration: lineMoveLeftAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(topBoxMarginSize,{ toValue: 0,duration: lineMoveLeftAnimateGap[2],useNativeDriver:_useNativeDriver })
            ]),

            // ----------- 卡片变换 ------------
            // 小->大->小
            Animated.sequence([
                Animated.timing(topSmallToBigToSmallCardSize,{ toValue: bigCardSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topSmallToBigToSmallCardSize,{ toValue: smallCardSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 小->大->小卡片第一行字体
            Animated.sequence([
                Animated.timing(topSmallToBigToSmallCardtopFontSize,{ toValue: bigCardLineOneFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topSmallToBigToSmallCardtopFontSize,{ toValue: smallCardLineOneFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 小->大->小卡片第二行字体
            Animated.sequence([
                Animated.timing(topSmallToBigToSmallCardbottomFontSize,{ toValue: bigCardLineTwoFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topSmallToBigToSmallCardbottomFontSize,{ toValue: smallCardLineTwoFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),

            // 大->小->大
            Animated.sequence([
                Animated.timing(topBigToSmallToBigCardSize,{ toValue: smallCardSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topBigToSmallToBigCardSize,{ toValue: bigCardSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 大->小->大卡片第一行字体
            Animated.sequence([
                Animated.timing(topBigToSmallToBigCardtopFontSize,{ toValue: smallCardLineOneFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topBigToSmallToBigCardtopFontSize,{ toValue: bigCardLineOneFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 大->小->大卡片第二行字体
            Animated.sequence([
                Animated.timing(topBigToSmallToBigCardbottomFontSize,{ toValue: smallCardLineTwoFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(topBigToSmallToBigCardbottomFontSize,{ toValue: bigCardLineTwoFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
        ]).start()
    }

    // 下排卡片动画
    let bottomCardsAnimate = ()=>{
        Animated.parallel([
            // ----------- 生成卡片 ------------
            // 下排生成位卡片
            Animated.sequence([
                Animated.timing(bottomInsertCardSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardSize,{ toValue: maxZoomSize(bigCardSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardSize,{ toValue: minZoomSize(bigCardSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardSize,{ toValue: bigCardSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver })
            ]),
            // 下排生成位卡片第一行字体
            Animated.sequence([
                Animated.timing(bottomInsertCardtopFontSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardtopFontSize,{ toValue: maxZoomSize(bigCardLineOneFontSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardtopFontSize,{ toValue: minZoomSize(bigCardLineOneFontSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardtopFontSize,{ toValue: bigCardLineOneFontSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver }),
            ]),
            // 下排生成位卡片第二行字体
            Animated.sequence([
                Animated.timing(bottomInsertCardbottomFontSize,{ toValue: 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardbottomFontSize,{ toValue: maxZoomSize(bigCardLineTwoFontSize),duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardbottomFontSize,{ toValue: minZoomSize(bigCardLineTwoFontSize),duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardbottomFontSize,{ toValue: bigCardLineTwoFontSize,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver }),
            ]),

            // ----------- 位置调整 ------------
            // 位置补偿
            Animated.sequence([
                Animated.timing(bottomInsertCardMarginSize,{ toValue: bigCardSize/2 - 0,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardMarginSize,{ toValue: bigCardSize/2 - maxZoomSize(bigCardSize)/2,duration: createCardAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardMarginSize,{ toValue: bigCardSize/2 - minZoomSize(bigCardSize)/2,duration: createCardAnimateGap[1],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomInsertCardMarginSize,{ toValue: 0,duration: createCardAnimateGap[2],useNativeDriver:_useNativeDriver })
            ]),
            // 容器左间距
            Animated.sequence([
                Animated.timing(bottomBoxMarginSize,{ toValue: maxZoomSize(bigCardSize*0.5)/2*-1,duration: lineMoveLeftAnimateGap[0],useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomBoxMarginSize,{ toValue: 0,duration: lineMoveLeftAnimateGap[2],useNativeDriver:_useNativeDriver })
            ]),

            // ----------- 卡片变换 ------------
            // 小->大->小
            Animated.sequence([
                Animated.timing(bottomSmallToBigToSmallCardSize,{ toValue: bigCardSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomSmallToBigToSmallCardSize,{ toValue: smallCardSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 小->大->小卡片第一行字体
            Animated.sequence([
                Animated.timing(bottomSmallToBigToSmallCardtopFontSize,{ toValue: bigCardLineOneFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomSmallToBigToSmallCardtopFontSize,{ toValue: smallCardLineOneFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 小->大->小卡片第二行字体
            Animated.sequence([
                Animated.timing(bottomSmallToBigToSmallCardbottomFontSize,{ toValue: bigCardLineTwoFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomSmallToBigToSmallCardbottomFontSize,{ toValue: smallCardLineTwoFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),

            // 大->小->大
            Animated.sequence([
                Animated.timing(bottomBigToSmallToBigCardSize,{ toValue: smallCardSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomBigToSmallToBigCardSize,{ toValue: bigCardSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 大->小->大卡片第一行字体
            Animated.sequence([
                Animated.timing(bottomBigToSmallToBigCardtopFontSize,{ toValue: smallCardLineOneFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomBigToSmallToBigCardtopFontSize,{ toValue: bigCardLineOneFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
            // 大->小->大卡片第二行字体
            Animated.sequence([
                Animated.timing(bottomBigToSmallToBigCardbottomFontSize,{ toValue: smallCardLineTwoFontSize,duration: 0,useNativeDriver:_useNativeDriver }),
                Animated.timing(bottomBigToSmallToBigCardbottomFontSize,{ toValue: bigCardLineTwoFontSize,duration: cardZoomTime,useNativeDriver:_useNativeDriver })
            ]),
        ]).start()
    }

    // 渲染卡片列表
    let renderCrads = function(lineNum,bigCardPos,cradsList,createPos){
        let lineCrads = [];
        cradsList.map((e,i)=>{
            let _isBig = bigCardPos.indexOf(i)>-1;
            // 需执行动画的卡片Flag
            let _topLineBoolean = (lineNum == 'topLine' && [createPos,createPos+2,createPos+5,createPos+3,createPos+6].indexOf(i)>-1);
            let _bottomLineBoolean = (lineNum == 'BottomLine' && [createPos,createPos+1,createPos+4,createPos+3,createPos+6,cradsList.length-1].indexOf(i)>-1);

            if(_topLineBoolean || _bottomLineBoolean){
                // 动画参数赋值
                let _initSize;
                let _marginBottom = 0,
                    _marginTop = 0;
                let _lineOneFontSize,_lineTwoFontSize;

                // 上排卡片
                if(lineNum == 'topLine'){
                    // 小->无->小
                    if(i == createPos){
                        _initSize = topInsertCardSize;
                        _marginTop = topInsertCardMarginSize;
                        _lineOneFontSize = topInsertCardtopFontSize;
                        _lineTwoFontSize = topInsertCardbottomFontSize;
                    }
                    // 小->大->小
                    if([createPos+3,createPos+6].indexOf(i)>-1){
                        _initSize = topSmallToBigToSmallCardSize;
                        _lineOneFontSize = topSmallToBigToSmallCardtopFontSize;
                        _lineTwoFontSize = topSmallToBigToSmallCardbottomFontSize;
                    }
                    // 大->小->大
                    if([createPos+2,createPos+5].indexOf(i)>-1){
                        _initSize = topBigToSmallToBigCardSize;
                        _lineOneFontSize = topBigToSmallToBigCardtopFontSize;
                        _lineTwoFontSize = topBigToSmallToBigCardbottomFontSize;
                    }
                }
                // 下排卡片
                if(lineNum == 'BottomLine'){
                    // 大->无->大
                    if(i == createPos){
                        _initSize = bottomInsertCardSize;
                        _marginBottom = bottomInsertCardMarginSize;
                        _lineOneFontSize = bottomInsertCardtopFontSize;
                        _lineTwoFontSize = bottomInsertCardbottomFontSize;
                    }
                    // 小->大->小
                    if([createPos+1,createPos+4,cradsList.length-1].indexOf(i)>-1){
                        _initSize = bottomSmallToBigToSmallCardSize;
                        _lineOneFontSize = bottomSmallToBigToSmallCardtopFontSize;
                        _lineTwoFontSize = bottomSmallToBigToSmallCardbottomFontSize;
                    }
                    // 大->小->大
                    if([createPos+3,createPos+6].indexOf(i)>-1){
                        _initSize = bottomBigToSmallToBigCardSize;
                        _lineOneFontSize = bottomBigToSmallToBigCardtopFontSize;
                        _lineTwoFontSize = bottomBigToSmallToBigCardbottomFontSize;
                    }
                }

                // 执行动画卡片
                lineCrads.push(
                    <TouchableOpacity onPress={()=>{!!e.jumpUrl && Linking.openURL(e.jumpUrl)}} key={i}>
                        <Animated.View style={[{marginLeft:i==0 ? 0 : 8,position:'relative',overflow:'hidden',borderRadius:25,width:_initSize,height:_initSize,marginBottom:_marginBottom,marginTop:_marginTop}]}>
                            <Image style={[styles.bgImg,{}]} source={{uri:e.bgImage}} />
                            <View style={styles.contentBox}>
                                <Animated.Text style={[styles.topText,{fontSize:_lineOneFontSize}]}>{e.title}</Animated.Text>
                                <Animated.Text style={[styles.bottomText,{fontSize:_lineTwoFontSize}]}>{e.subTitle}</Animated.Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                )
            }else{
                // 无需动画卡片
                lineCrads.push(
                    <TouchableOpacity onPress={()=>{!!e.jumpUrl && Linking.openURL(e.jumpUrl)}} key={i}>
                        <View style={[{marginLeft:i==0 ? 0 : 8,borderRadius:25,position:'relative',overflow:'hidden'},_isBig ? styles.bigCard : styles.smallCard]}>
                            <Image style={[styles.bgImg,{}]} source={{uri:e.bgImage}} />
                            <View style={styles.contentBox}>
                                <Text style={[styles.topText,{fontSize:_isBig ? bigCardLineOneFontSize : smallCardLineOneFontSize}]}>{e.title}</Text>
                                <Text style={[styles.bottomText,{fontSize:_isBig ? bigCardLineTwoFontSize : smallCardLineTwoFontSize}]}>{e.subTitle}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        })
        return (
            <Animated.View style={[(lineNum == 'topLine' ? styles.topLineBox : styles.bottomLineBox),styles.lineBox,{marginLeft:lineNum == 'topLine' ? topBoxMarginSize : bottomBoxMarginSize}]}>
                {lineCrads}
            </Animated.View>
        );
    }

    // Render
    const styles = createStyles();
    return (
        <ScrollView
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            bounces = {false}
            style={{width:WIDTH}}
            >
            <View style={styles.container}>
                { renderCrads('topLine',[0,3],topCradsList,topLineCreatePos) }
                { renderCrads('BottomLine',[2],bottomCradsList,bottomLineCreatePos) }
            </View>
        </ScrollView>
    )
}

const createStyles = ()=>{
    return StyleSheet.create({
        container:{
            // width:WIDTH,
            height:vm(208+46),
            backgroundColor:'#fff',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width:scrollViewWidth,
            overflow: 'hidden',
        },
        lineBox:{
            height:vm(135),
            // width:WIDTH,
            paddingLeft: vm(12),
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        topLineBox:{
            bottom:vm(-31),
            alignItems: 'flex-start',
        },
        bottomLineBox:{
            top:vm(-31),
            alignItems: 'flex-end',
        },
        bigCard:{
            width:bigCardSize,
            height:bigCardSize,
        },
        smallCard:{
            width:smallCardSize,
            height:smallCardSize,
        },
        contentBox:{
            position:'absolute',
            bottom:vm(10),
            left:vm(10),
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        },
        bgImg:{
            position:'absolute',
            top:0,
            left:0,
            bottom:0,
            right:0,
            backgroundColor:'#e3e3e3'
        },
        topText:{
            color:'#333333',
            paddingBottom: vm(2),
            paddingTop: vm(2),
            paddingLeft: vm(3),
            paddingRight: vm(3),
            backgroundColor:'#fff'
        },
        bottomText:{
            color:'#fff',
            paddingBottom: vm(2),
            paddingTop: vm(2),
            paddingLeft: vm(3),
            paddingRight: vm(3),
            backgroundColor:'#333333'
        }
    })
}

