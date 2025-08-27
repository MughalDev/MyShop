import {StyleSheet} from 'react-native';
import { responsiveFont } from './fontSize';
import { colors } from './color';
 
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: responsiveFont(6),
    color: colors.white,
    fontWeight: '300',
    //marginTop: 6,
    //justifyContent:"center",
    paddingHorizontal: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
  },
  placeholder: {
    color: colors.white,
    fontSize: responsiveFont(4),
  },
  inputAndroid: {
    fontSize: responsiveFont(4),
    color: colors.white,
    // marginTop: -5,
    //paddingHorizontal: -10,
    //backgroundColor: 'red',
    //borderRadius: 5,
  },
  modalViewBottom: {
    backgroundColor: colors.white,
  },
});