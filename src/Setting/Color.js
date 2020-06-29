import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as contentAction from '../redux/content/contentAction';

export default function Color(props) {
    const dispatch = useDispatch();
    const changeColor = (color) => {
        dispatch(contentAction.changeColor(color));
    };
    const [color, setColor] = useState(contentState.color);

    const contentState = useSelector(
        (state) => ({
            color: state.contentReducer.color
        }),
        shallowEqual
    );

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 5 }}>
                    <Button
                        onPress={() => {
                            changeColor(color);
                            props.navigation.navigate('Setting');
                        }}
                        title="Done"
                    />
                </TouchableOpacity>
            )
        });
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ ...styles.exampleStyle, flex: 0.1 }}>
                <Text
                    style={{
                        ...styles.exampleText,
                        color
                    }}>
                    ABCD
                </Text>
            </View>
            <ColorPicker
                onColorChange={(color) =>
                    setColor(fromHsv({ h: color.h, s: color.s, v: color.v }))
                }
                hideSliders={true}
                style={{ flex: 0.9 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    exampleStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exampleText: {
        fontSize: 30
    }
});
