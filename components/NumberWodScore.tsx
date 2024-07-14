import { View, Platform, StyleSheet, TextInput } from 'react-native'

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

type Props = {

  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  resultText?: string;
  isBottomSheet? : boolean;
}

const NumberWodScore = ({ number, setNumber } : Props) => {
    
    return (
        <View className='w-1/2'>
            {Platform.OS === 'ios' ?
                <BottomSheetTextInput
                    placeholder=  "Enter result"
                    value={number.toString()}
                    onChangeText={() => setNumber}
                    style={styles.textInput}
                    keyboardType='number-pad'
                /> :
                <TextInput
                    placeholder= "Enter result"
                    value={number.toString()}
                    onChangeText={() => setNumber}
                    style={styles.textInput}
                    keyboardType='number-pad'

                // enablesReturnKeyAutomatically={true}
                // returnKeyType='search'
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        alignSelf: 'stretch',
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 5,
        minHeight: 60,
        borderWidth: 1
    },
});

export default NumberWodScore