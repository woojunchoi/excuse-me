import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Header,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as contentAction from '../redux/content/contentAction';

export default function Font(props) {
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        });
        return unsubscribe;
    }, [props.navigation]);

    const dispatch = useDispatch();

    const changeFont = (font) => {
        dispatch(contentAction.changeFont(font));
        props.navigation.navigate('Setting');
    };

    const [list] = React.useState([
        { font: 'Academy Engraved LET' },
        { font: 'AcademyEngravedLetPlain' },
        { font: 'Al Nile' },
        { font: 'AlNile-Bold' },
        { font: 'American Typewriter' },
        { font: 'AmericanTypewriter-Bold' },
        { font: 'AmericanTypewriter-Condensed' },
        { font: 'AmericanTypewriter-CondensedBold' },
        { font: 'AmericanTypewriter-CondensedLight' },
        { font: 'AmericanTypewriter-Light' },
        { font: 'Apple Color Emoji' },
        { font: 'Apple SD Gothic Neo' },
        { font: 'AppleColorEmoji' },
        { font: 'AppleSDGothicNeo-Bold' },
        { font: 'AppleSDGothicNeo-Light' },
        { font: 'AppleSDGothicNeo-Medium' },
        { font: 'AppleSDGothicNeo-Regular' },
        { font: 'AppleSDGothicNeo-SemiBold' },
        { font: 'AppleSDGothicNeo-Thin' },
        { font: 'AppleSDGothicNeo-UltraLight' },
        { font: 'Arial' },
        { font: 'Arial Hebrew' },
        { font: 'Arial Rounded MT Bold' },
        { font: 'Arial-BoldItalicMT' },
        { font: 'Arial-BoldMT' },
        { font: 'Arial-ItalicMT' },
        { font: 'ArialHebrew' },
        { font: 'ArialHebrew-Bold' },
        { font: 'ArialHebrew-Light' },
        { font: 'ArialMT' },
        { font: 'ArialRoundedMTBold' },
        { font: 'Avenir' },
        { font: 'Avenir Next' },
        { font: 'Avenir Next Condensed' },
        { font: 'Avenir-Black' },
        { font: 'Avenir-BlackOblique' },
        { font: 'Avenir-Book' },
        { font: 'Avenir-BookOblique' },
        { font: 'Avenir-Heavy' },
        { font: 'Avenir-HeavyOblique' },
        { font: 'Avenir-Light' },
        { font: 'Avenir-LightOblique' },
        { font: 'Avenir-Medium' },
        { font: 'Avenir-MediumOblique' },
        { font: 'Avenir-Oblique' },
        { font: 'Avenir-Roman' },
        { font: 'AvenirNext-Bold' },
        { font: 'AvenirNext-BoldItalic' },
        { font: 'AvenirNext-DemiBold' },
        { font: 'AvenirNext-DemiBoldItalic' },
        { font: 'AvenirNext-Heavy' },
        { font: 'AvenirNext-HeavyItalic' },
        { font: 'AvenirNext-Italic' },
        { font: 'AvenirNext-Medium' },
        { font: 'AvenirNext-MediumItalic' },
        { font: 'AvenirNext-Regular' },
        { font: 'AvenirNext-UltraLight' },
        { font: 'AvenirNext-UltraLightItalic' },
        { font: 'AvenirNextCondensed-Bold' },
        { font: 'AvenirNextCondensed-BoldItalic' },
        { font: 'AvenirNextCondensed-DemiBold' }
    ]);

    return (
        <ScrollView style={styles.scroller}>
            <FlatList
                data={list}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        underlayColor="#DDDDDD"
                        style={styles.eachCell}
                        onPress={() => changeFont(item.font)}>
                        <View
                            style={{
                                padding: 13,
                                borderBottomWidth: 0.5,
                                borderColor: '#DDDDDD',
                                paddingLeft: 5
                            }}>
                            <Text style={{ fontFamily: item.font }}>
                                {item.font}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroller: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    }
});
