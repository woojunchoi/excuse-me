import React from 'react';
import {
    FlatList, StyleSheet, Text, View, TouchableHighlight, TextInput, Header
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
    AdMobBanner
} from 'expo-ads-admob';
import { useSelector } from 'react-redux'



// let interstitial = "ca-app-pub-5748953601000444/2974902805"
let banner = "ca-app-pub-5748953601000444/1661821134"

export default function Menu(props) {
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        });
        return unsubscribe;

    }, [props.navigation]);
    const [list, setList] = React.useState([
        { key: '주문할게요' },
        { key: '계산서 주세요' },
        { key: '물좀 주세요' }]);
    const [text, setText] = React.useState('');

    console.log(useSelector(state => state)
    )
    return (
        <View style={styles.container}>
            <View style={{ borderBottomWidth: 1, borderColor: '#DDDDDD', marginBottom: 10 }}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <TextInput
                    style={{ padding: 10, fontSize: 20 }}
                    placeholder={'할말을 입력하세요'}
                    value={text}
                    onChangeText={text => setText(text)}
                    onSubmitEditing={e => {
                        e.persist();
                        setList(prev => [...prev, { key: e.nativeEvent.text }])
                        setText('')
                    }
                    }
                />
            </View>
            <FlatList
                data={list}
                renderItem={({ item, index, separators }) => (
                    <View>
                        <TouchableHighlight
                            underlayColor="#DDDDDD"
                            onPress={async () => {
                                props.navigation.navigate('날봐요', { text: item.key, from: 'menu' });
                            }}
                            key={item.key}>
                            <View style={{ flex: 1, alginItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.item}>{item.key}</Text>
                                <Text style={styles.xItem} onPress={e => setList(prev => [...prev].filter((el) => {
                                    return el.key !== item.key;
                                }))}>X</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )}
            />
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                servePersonalizedAds={false}
                adUnitID={banner}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flex: 0.9
    },
    xItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flex: 0.1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 200
    }
})
