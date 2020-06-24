import React from 'react';
import {
    Easing, TouchableOpacity
} from 'react-native';
import TextTicker from 'react-native-text-ticker'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av';


const soundObject = new Audio.Sound();

export default function Screen(props) {

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        });
        return unsubscribe;


    }, [props.navigation]);

    const text = props.navigation.dangerouslyGetState().routes[1].params ? props.navigation.dangerouslyGetState().routes[1].params.text : ''
    let printText = []

    for (let i = 0; i < 10; i++) {
        printText.push(text);
    }

    printText = printText.join(',')
    let textFinal = ''
    for (let i = 0; i < printText.length; i++) {
        if (printText[i] === ',') {
            textFinal += ' '
        }
        else {
            textFinal += printText[i]
        }
    }

    const whoosh = async () => {
        try {
           await Audio.Sound.createAsync(
                require('../Bike-bell-ring-sound-effect.mp3'),
                { shouldPlay: true }
            );
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <TouchableOpacity
            onPress={whoosh}
            style={{ flex: 1, backgroundColor: 'black', alginItems: 'center', justifyContent: 'center' }}>
            <TextTicker
                style={{ fontSize: 230, color: 'yellow' }}
                duration={30000}
                repeatSpacer={50}
                easing={Easing.linear}
            >
                {textFinal}
            </TextTicker>
        </TouchableOpacity>
    );
}
