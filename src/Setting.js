import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AdMobBanner } from 'expo-ads-admob';
import { useSelector, shallowEqual } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
// let interstitial = 'ca-app-pub-5748953601000444/2974902805';
let banner = 'ca-app-pub-5748953601000444/1661821134';

export default function Setting(props) {
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        });
        return unsubscribe;
    }, [props.navigation]);

    const [list] = React.useState([{ key: 'Font' }, { key: 'Color' }]);

    const contentState = useSelector(
        (state) => ({
            font: state.contentReducer.font,
            color: state.contentReducer.color
        }),
        shallowEqual
    );

    const resultFunction = (item) => {
        if (item.key === 'Font') {
            return (
                <View style={styles.fontTextView}>
                    <Text>
                        {contentState.font === 'System'
                            ? 'San Francisco'
                            : contentState.font}
                    </Text>
                    <MaterialIcons
                        name="navigate-next"
                        size={23}
                        color="black"
                    />
                </View>
            );
        } else if (item.key === 'Color') {
            return (
                <View style={styles.fontTextView}>
                    <Text>{contentState.color}</Text>
                    <MaterialIcons
                        name="navigate-next"
                        size={23}
                        color="black"
                    />
                </View>
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scroller}>
            <View style={styles.testView}>
                <Text
                    style={{
                        ...styles.testText,
                        fontFamily: contentState.font,
                        color: contentState.color
                    }}>
                    Test
                </Text>
            </View>
            <FlatList
                style={{ padding: 15, flex: 1 }}
                data={list}
                renderItem={({ item, index }) => (
                    <TouchableHighlight
                        key={index}
                        underlayColor="#DDDDDD"
                        style={styles.eachCell}
                        onPress={() => props.navigation.navigate(item.key)}>
                        <View
                            style={{
                                flex: 1,
                                alginItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                            <View style={styles.itemKey}>
                                <Text style={styles.item}>{item.key}</Text>
                            </View>
                            {resultFunction(item)}
                        </View>
                    </TouchableHighlight>
                )}
            />
            <AdMobBanner
                style={{ alignSelf: 'center' }}
                bannerSize="banner"
                adUnitID={banner}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    testView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'black'
    },
    testText: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    scroller: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    eachCell: {
        padding: 13,
        borderBottomWidth: 0.5,
        borderColor: '#DDDDDD',
        paddingLeft: 5
    },
    itemKey: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    item: {
        fontSize: 15
    },
    fontTextView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
