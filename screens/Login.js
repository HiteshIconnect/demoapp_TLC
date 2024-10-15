import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';

import ErrorModal from '../components/ErrorModal';
import BackGroundWrapper from '../HOC/addBackgroundHOC';
import CheckBox from '../components/Checkbox';
const logo = require('../assets/lookCompanyLogo.png');
import {actuatedNormalize} from '../styles/dynamicFonts';

import {loginUser, setEnv} from '../redux/user/actions';
import {setError} from '../redux/errorModal/actions';
import {createStructuredSelector} from 'reselect';
import {
  selectCurrentUser,
  selectToken,
  getTokenValid,
  selectRememberMe,
  sendUserDetails,
} from '../redux/user/selector';

const Login = ({
  navigation,
  loginUser,
  currentUser,
  remember,
  setError,
  userDetails,
  setEnv,
}) => {
  console.log('remember : ', remember);
  console.log('currentUser: ', currentUser);
  console.log('userDetails :', userDetails);

  const [loginCred, setLoginCred] = useState({
    email: '',
    mobilepin: '',
  });

  const [isFormValid, setFormValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // const startValue = new Animated.Value(220);
  const startValue = new Animated.Value(500);
  const opacityVal = new Animated.Value(0);
  const endValue = 0;
  const duration = 500;
  const baseURL = 'https://apitest.thelookcompany.qa';
  const prodURL = 'http://3.209.139.140:3000';

  const inputUserRef = useRef();

  useEffect(() => {
    console.log('running......');
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      // Animated.timing(opacityVal, {
      //   toValue: 0.5,
      //   duration: duration,
      //   useNativeDriver: true,
      //   easing: Easing.linear,
      // }).start();

      Animated.timing(opacityVal, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => {
        if (!remember) {
          inputUserRef.current.focus();
        } else {
          console.log('inside false');
          onFieldChange(userDetails.email, 'email');
        }
        setRememberMe(remember);
      });
    });

    /**
     * set flag
     */
    //setEnv("sandbox");
    setEnv('sandbox');

    return () => {
      inputUserRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigation.replace('DashBoard');
    }
  }, [currentUser]);

  const onLoginClick = async () => {
    let validation = checkFormValidation();

    if (!validation) {
      setError(
        'Sorry its incorrect',
        'Please enter a valid username and password',
        '',
      );
    }
    console.log('the form is ', isFormValid);

    if (validation) {
      console.log('connecting to API.......');
      await loginUser(loginCred, rememberMe);
    }
  };

  const checkFormValidation = () => {
    const errorArray = [];

    if (!/^\d{4}$/.test(loginCred.mobilepin)) {
      errorArray.push('error in mobilepin');
    }

    if (!/^\S+@\S+$/.test(loginCred.email)) {
      errorArray.push('error in email');
    }
    console.log('the error array is ', errorArray);
    if (errorArray.length === 0) {
      setFormValid(true);
      return true;
    } else {
      setFormValid(false);
      return false;
    }
  };

  const onFieldChange = (value, type) => {
    let currentData = {...loginCred};
    currentData[type] = value;
    setLoginCred(currentData);
    // checkFormValidation()
  };

  return (
    <>
      <ErrorModal />
      {/* <SuccessModal /> */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Animated.View
            style={[{transform: [{translateY: startValue}]}, styles.logoStyle]}>
            <Image source={logo} style={styles.logoSize} />
          </Animated.View>

          <Animated.View
            style={[styles.opacityAnimatedContainer, {opacity: opacityVal}]}>
            <View>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../assets/usernameLogo.png')}
                  style={styles.iconStyle}
                />
                <TextInput
                  ref={inputUserRef}
                  onChangeText={val => onFieldChange(val, 'email')}
                  style={[styles.input, {fontFamily: 'Poppins'}]}
                  placeholder="Username"
                  value={loginCred.email}
                />
              </View>

              <View style={[styles.inputContainer, styles.inputMarginTop]}>
                <Image
                  source={require('../assets/pinLogo.png')}
                  style={styles.iconStyle}
                />
                <TextInput
                  secureTextEntry={true}
                  onChangeText={val => onFieldChange(val, 'mobilepin')}
                  style={[styles.input, {fontFamily: 'Poppins'}]}
                  placeholder="Pin"
                  maxLength={4}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 20,
              }}>
              <CheckBox selected={rememberMe} handler={setRememberMe} />

              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <Text
                  style={{marginLeft: 10, marginTop: 2, fontFamily: 'Poppins'}}>
                  Remember Me
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => onLoginClick()}>
              <Text style={[styles.poweredText, styles.buttonText]}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[styles.powererdByOpacityContainer, {opacity: opacityVal}]}>
            <Text style={[styles.poweredText, {fontFamily: 'Poppins'}]}>
              Powered By
            </Text>
            <Text
              style={[
                styles.poweredText,
                styles.companyText,
                styles.poppinsMedium,
              ]}>
              iConnect Info Solutions v1.41.0
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#BEBEBE',
              }}>
              BaseURL: "{baseURL}"(sandbox)
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  tokenValid: getTokenValid,
  remember: selectRememberMe,
  userDetails: sendUserDetails,
});

export default connect(mapStateToProps, {
  loginUser,
  setError,
  setEnv,
})(BackGroundWrapper(Login));

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: actuatedNormalize(18),
    lineHeight: 27,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
  },
  companyText: {
    fontWeight: '500',
    fontSize: actuatedNormalize(18),
    lineHeight: 27,
    color: '#0056D2',
    textAlign: 'center',
  },
  logoSize: {
    resizeMode: 'contain',
    width: '100%',
    height: '50%',
  },
  logoStyle: {
    justifyContent: 'center',
    width: '100%',
    height: 300,
    marginTop: 10,
    marginBottom: -50,
  },
  iconStyle: {
    margin: '2.5%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },

  input: {
    width: '100%',
    height: 54,
    fontSize: actuatedNormalize(18),

    color: '#5C5C5C',
    backgroundColor: 'white',
  },
  inputMarginTop: {
    marginTop: '8%',
  },
  loginContainer: {
    marginTop: 30,
    height: 54,
    backgroundColor: '#E11D38',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  opacityAnimatedContainer: {
    width: '100%',
  },
  poweredText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: actuatedNormalize(16),
    lineHeight: 24,
    color: '#494949',
    textAlign: 'center',
  },
  powererdByOpacityContainer: {
    width: '100%',
    bottom: '2%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  poppinsMedium: {fontFamily: 'Poppins-Medium'},
});
