import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@exponent/ex-navigation'
import { Ionicons } from '@exponent/vector-icons';

import { Router } from '../App'
import colors from '../colors'
import constants from '../constants'

const DRAWER_WIDTH = 300

export default class Drawer extends Component {

    render() {
        return (
          <DrawerNavigation
            id='main'
            initialItem='beats'
            drawerWidth={DRAWER_WIDTH}
            renderHeader={this._renderHeader}
          >
            <DrawerNavigationItem
              id='beats'
              selectedStyle={styles.selectedItemStyle}
              renderTitle={isSelected => this._renderTitle('Beats', isSelected)}
            >
              <StackNavigation
                id='beats'
                initialRoute={Router.getRoute('beats')}
              />
            </DrawerNavigationItem>

            <DrawerNavigationItem
              id='time'
              selectedStyle={styles.selectedItemStyle}
              renderTitle={isSelected => this._renderTitle('Time', isSelected)}
            >
              <StackNavigation
                id='time'
                initialRoute={Router.getRoute('time')}
              />
            </DrawerNavigationItem>
          </DrawerNavigation>
        )
    }
    _renderHeader = () => {
        return (
            <Image source={{uri: constants.javascript30}}
              style={styles.header}
            />
        )
    }
    _renderTitle = (text: string, isSelected: bool) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.buttonTitleText, isSelected ? styles.selectedText : null]}>
                    {text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        resizeMode: 'contain', marginTop: 50,
        width: DRAWER_WIDTH, height: 200
    },
    buttonTitleText: {
        color: '#999',
        fontWeight: 'bold',
    },
    selectedText: {
        color: 'orange',
    },
    icon: {
        color: '#999',
        marginHorizontal: 10,
    },
    selectedItemStyle: {
        backgroundColor: 'plum',
    },
})
