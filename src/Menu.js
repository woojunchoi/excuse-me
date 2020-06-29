import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Header
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AdMobBanner } from 'expo-ads-admob';
import { useSelector } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';
// let interstitial = "ca-app-pub-5748953601000444/2974902805"
let banner = 'ca-app-pub-5748953601000444/1661821134';

export default function Menu(props) {
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        });
        return unsubscribe;
    }, [props.navigation]);
    const [list, setList] = React.useState([
        { key: 'I want to order' },
        { key: 'Bill please' },
        { key: 'Can I get some water' }
    ]);
    const [text, setText] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.selectHeader}>Messages</Text>
                <AntDesign
                    style={styles.settingIcon}
                    name="setting"
                    size={24}
                    color="black"
                    onPress={() => props.navigation.navigate('Setting')}
                />
            </View>
            <View style={styles.inputHeader}>
                <TextInput
                    style={{ padding: 10, fontSize: 20 }}
                    placeholder={'Enter your message'}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={(e) => {
                        e.persist();
                        setList((prev) => [
                            ...prev,
                            { key: e.nativeEvent.text }
                        ]);
                        setText('');
                    }}
                />
            </View>
            <FlatList
                data={list}
                renderItem={({ item, index, separators }) => (
                    <View>
                        <TouchableHighlight
                            underlayColor="#DDDDDD"
                            onPress={async () => {
                                props.navigation.navigate('excuse_me', {
                                    text: item.key,
                                    from: 'menu'
                                });
                            }}
                            key={item.key}>
                            <View
                                style={{
                                    flex: 1,
                                    alginItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row'
                                }}>
                                <Text style={styles.item}>{item.key}</Text>

                                <Ionicons
                                    style={styles.xItem}
                                    onPress={(e) =>
                                        setList((prev) =>
                                            [...prev].filter((el) => {
                                                return el.key !== item.key;
                                            })
                                        )
                                    }
                                    name="ios-remove-circle-outline"
                                    size={24}
                                    color="black"
                                />
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
        paddingTop: 22,
        flexDirection: 'column'
    },
    header: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectHeader: {
        fontWeight: 'bold',
        fontSize: 30
    },
    inputHeader: {
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        marginBottom: 10,
        paddingLeft: 5
    },
    settingIcon: {
        marginRight: 15
    },
    item: {
        padding: 10,
        paddingLeft: 15,
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
    }
});
