import React from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Shopping extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backButtonEnabled: true
        }

        this.webView = {
            canGoBack: false,
            ref: null,
        }

    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    UNSAFE_componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    UNSAFE_componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    render() {
        //     const run = `
        //   document.body.style.backgroundColor = 'red';
        // //   setTimeout(function() { window.alert('hi') }, 2000);
        //   true; // note: this is required, or you'll sometimes get silent failures

        // `;
        return (
            <View style={styles.container}>
                <WebView
                    ref={(webView) => { this.webView.ref = webView; }}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    source={{ uri: 'https://nisheskin.com/products' }}
                    style={{ marginTop: perfectSize(30) }}
                // injectedJavaScriptBeforeContentLoaded={run}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        // padding : perfectSize(50)
    }
})
