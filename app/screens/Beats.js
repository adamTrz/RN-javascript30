import Exponent, { Asset, Components } from 'exponent';
import React, {Component} from 'react'
import {Animated, Dimensions, Easing, Image,
    Text, TouchableOpacity, View
} from 'react-native'

import constants from '../constants'
import colors from '../colors'
import styles from '../styles'

const {width, height} = Dimensions.get('window')
const sounds = [
    require('../assets/sounds/boom.wav'),
    require('../assets/sounds/clap.wav'),
    require('../assets/sounds/crash.wav'),
    require('../assets/sounds/hihat.wav'),
    require('../assets/sounds/kick.wav'),
    require('../assets/sounds/openhat.wav'),
    require('../assets/sounds/reversekick.wav'),
    require('../assets/sounds/semikick.wav'),
    require('../assets/sounds/snare.wav'),
    require('../assets/sounds/stab.wav'),
    require('../assets/sounds/tink.wav'),
    require('../assets/sounds/tom.wav')
]
export default class HomeScreen extends Component {
    static route = {
        navigationBar: {
            title: 'Beats',
            backgroundColor: 'rgba(0,0,0,0.5)',
            tintColor: '#fff',
            translucent: true,
        }
    }

    constructor(props) {
      super(props);
      this.state = {
          currentTrack: null,
          anim: new Animated.Value(0),
          paused: true
      }
      this._bootstrap = this._bootstrap.bind(this)
      this.playTrack = this.playTrack.bind(this)
    }

    componentWillMount() {
        this._bootstrap()
    }

    async _bootstrap() {
        const promises = sounds.map(module => Asset.fromModule(module).downloadAsync())
        await Promise.all(promises)
        this.setState({bootstrapped: true})
    }

    playTrack(trackNumber) {
        this.setState({paused: true,
            currentTrack: trackNumber}, () => {
            this.audio.seek(0)
            this.setState({paused: false})
            this.animate()
        })
    }

    animate() {
        this.state.anim.setValue(0)
        Animated.sequence([
            Animated.timing(this.state.anim, {
                toValue: 1, duration: 100, easing: Easing.elastic(1)
            }),
            Animated.timing(this.state.anim, {
                toValue: 0, duration: 100, easing: Easing.elastic(1)
            })
        ]).start()
    }

    render() {
        const currentTrack = this.state.currentTrack || 0
        const {paused} = this.state
        return (
            <Image style={[{flex: 1, justifyContent: 'center', alignItems: 'center',
                    resizeMode: 'cover'}]}
                source={{uri: constants.drums_bg}}
                >
                <Components.LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={styles.navbarShadow} />
                <Components.Video ref = {ref => this.audio = ref}
                    source={sounds[currentTrack]}
                    style={{width: 1, height: 1}}
                    resizeMode="cover"
                    paused={paused}
                    repeat={false}
                    mute={false}
                    onEnd={() => {this.setState({paused: true})}}
                    />
                <View style={{flexDirection: 'row', flexWrap: 'wrap',
                    justifyContent: 'center', alignItems: 'center',
                    width: width, marginTop: 80
                    }}>
                    {sounds.map((track, idx) => (
                        <Button key={'soundBtn_',idx}
                            onPress={this.playTrack.bind(this, idx)}
                            text={Asset.fromModule(track).name}
                            anim={this.state.anim} active={currentTrack}
                            idx={idx}
                            />
                    ))}
                </View>
            </Image>
        )
    }
}

const Button = ({onPress, text, active, anim, idx}) => {
    const animStyle = active === idx ? {
        borderColor: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#000', '#ffc600']
        }),
        transform: [{scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05]
        })}],
    } : {borderColor: '#000', transform: [{scale: 1}], shadowColor: 'transparent'}
    return (
        <View style={[{margin: 20}, styles.center]}>
            <TouchableOpacity activeOpacity={1} onPress={onPress} >
                <Animated.View style={[{
                        borderRadius: 4, borderWidth: 2,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        paddingHorizontal: 10, paddingVertical: 15
                    }, animStyle]}>
                    <Text style={[styles.fontAnalogClock, {
                        fontSize: 16, fontWeight: 'bold', letterSpacing: 2, color: '#ffc600'}]}>
                        {text.toUpperCase()}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}
