import Exponent, { Asset, Components } from 'exponent';
import React, {Component} from 'react'
import {Image, LayoutAnimation, View , Text} from 'react-native'

import colors from '../colors'
import styles from '../styles'
import constants from '../constants'

export default class HomeScreen extends Component {
    static route = {
        navigationBar: {
            title: 'What time is it?',
            backgroundColor: 'rgba(0,0,0,0.2)',
            tintColor: '#fff',
            translucent: true,
        },
    }

    constructor() {
        super()
        this.state = {
            bootstrapped: false
        }
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer()
    }

    startTimer() {
        setInterval(() => {
            const now = new Date()
            const seconds = now.getSeconds()
            const secDeg = (seconds/60)*360+90
            const minutes = now.getMinutes()
            const minDeg = (minutes/60)*360+90
            const hours = now.getHours()
            const hrsDeg = (hours/24)*360+90
            LayoutAnimation.spring()
            this.setState({
                secDeg, minDeg, hrsDeg,
                seconds, minutes, hours, bootstrapped: true
            })
        }, 1000)
    }

    render() {
        const {bootstrapped, secDeg, minDeg, hrsDeg, seconds, minutes, hours} = this.state
        if (!bootstrapped) return (
            <Components.AppLoading />
        )
        return (
            <Image style={{flex: 1, resizeMode: 'cover'}}
                source={{uri: constants.clock_bg}}
                >
                <Components.LinearGradient
                    colors={['rgba(0,0,0,0.4)', 'transparent']}
                    style={styles.navbarShadow} />
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <DigitalClock hours={hours} minutes={minutes} seconds={seconds} />
                    <AnalogClock size={200} seconds={secDeg} minutes={minDeg} hours={hrsDeg} />
                </View>
            </Image>
        )
    }
}

const parseInt = (int) => ("0"+int).slice(-2)

const DigitalClock = ({hours, minutes, seconds}) => {
    const hoursStr = parseInt(hours)
    const minutesStr = parseInt(minutes)
    const secondsStr = parseInt(seconds)
    return (
        <View style={{marginBottom: 50, backgroundColor: 'transparent'}}>
            <Text style={styles.fontAnalogClock}>
                {`${hoursStr}:${minutesStr}:${secondsStr}`}
            </Text>
        </View>
    )
}

const AnalogClock = ({size, seconds, minutes, hours}) => (
    <View style={{width: size, height: size,
        borderColor: 'black', borderRadius: size, borderWidth: 4,
        backgroundColor: 'transparent'}}>
        <Hand ratio={0.34} rotation={hours} size={size} color='black' thickness={4} />
        <Hand ratio={0.4} rotation={minutes} size={size} color='black' thickness={2} />
        <Hand ratio={0.44} rotation={seconds} size={size} color={colors.fieryrose} thickness={1} />
    </View>
)

const Hand = ({ratio, size, rotation, color, thickness=4}) => {
    return (
        <View style={{width: size*ratio*2, height: thickness,
            position: 'absolute', top: size/2-2, left: size*(1-2*ratio)/2,
            transform: [{rotate: `${rotation}deg`}], backgroundColor: 'transparent',
        }}>
            <View style={{width: (size*ratio), height: thickness, backgroundColor: color}} />
        </View>
    )
}
