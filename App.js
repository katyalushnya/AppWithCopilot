import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);


class App extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    secondStepActive: true,
  };

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.props.start();
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  render() {
    return (
        <View style={styles.container}>
          <CopilotStep text="Привет, это задание сделано для практики" order={1} name="openApp">
            <WalkthroughableText style={styles.title}>
              {'Пробная весрия\n"Работы над Copilot"'}
            </WalkthroughableText>
          </CopilotStep>
          <View style={styles.middleView}>
            <CopilotStep active={this.state.secondStepActive} text="Это мое фото в фейсбуке" order={2} name="secondText">
              <WalkthroughableImage
                  source={{ uri: 'https://scontent.fdnk2-1.fna.fbcdn.net/v/t1.6435-9/117259221_1221982318142469_6517682451668674488_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KViVGYB_xpoAX93QGsW&_nc_ht=scontent.fdnk2-1.fna&oh=00_AT9Cyc5czT4QobbMuoXeiWDgBpRz5MT-Qjc8Q9Dgfjc32A&oe=62E55CB3' }}
                  style={styles.profilePhoto}
              />
            </CopilotStep>
            <View style={styles.activeSwitchContainer}>
              <Text>Пробное приложение))))</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => this.props.start()}>
              <Text style={styles.buttonText}>Начать</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <CopilotStep text="Угол экрана" order={3} name="thirdText">
              <WalkthroughableText style={styles.tabItem}>
                <Ionicons name="ios-contact" size={40} color="#888" />
              </WalkthroughableText>
            </CopilotStep>

            <CopilotStep text="Последний пункт копилота" order={4} name="fourthText">
              <WalkthroughableText style={styles.tabItem}>
                <Ionicons style={styles.tabItem} name="ios-navigate-outline" size={40} color="#888" />
              </WalkthroughableText>
            </CopilotStep>

            <Ionicons style={styles.tabItem} name="ios-globe" size={40} color="#888" />
            <Ionicons style={styles.tabItem} name="ios-rainy" size={40} color="#888" />
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9df',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#73b786',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(App);