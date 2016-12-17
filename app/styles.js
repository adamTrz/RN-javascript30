import React from 'react'
import {Dimensions, Platform, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center', alignItems: 'center'
    },
    container_img: {
        width: width, height: height,
        resizeMode: 'cover'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    navbarShadow: {
        position: 'absolute', left: 0, right: 0,
        height: 60,
        ...Platform.select({
            ios: {top: 60},
            android: {top: 80},
        })
    },

    fontAnalogClock: {
        fontSize: 40, color: 'black',
        ...Platform.select({
            ios: {
                fontFamily: 'HelveticaNeue-Light',
            },
            android: {
                fontFamily: 'Roboto'
            }
        }),
        letterSpacing: 4
        }
})

export default styles
