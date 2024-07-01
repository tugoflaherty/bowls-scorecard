import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import NavigationButton from '../components/NavigationButton';

const ScorecardCompetitionScreen = ({ navigation }) => {
    const [competitionName, setCompetitionName] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [rinkNumber, setRinkNumber] = useState(0);

    // Below code required independent research, to create a cross-platform datetime picker to select the match date and time
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') setShow(false);
        else setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => showMode('date');

    const showTimepicker = () => showMode('time');

    const hideMode = () => setShow(false);

    useEffect(() => {const reset = navigation.addListener('focus', resetForm);}, [navigation]);

    const resetForm = () => {
        setCompetitionName('');
        setDateTime(new Date());
        setRinkNumber(0);
    };

    // Below code required independent research, to create hide keyboard on user tapping away from the input field
    return (
        <SafeAreaView>
            <ScrollView keyboardDismissMode='on-drag'>
                <Text style={styles.header}>Competition Details</Text>
                <Text style={styles.textLabel}>Enter the competition name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Type competition name here'
                    value={competitionName}
                    onChangeText={input => setCompetitionName(input)}
                    autoFocus={true}
                />
                { (Platform.OS !== 'android') && <Text style={styles.textLabel}>Select the competition date and time</Text> }
                { (Platform.OS !== 'android') && <Button onPress={showDatepicker} title='Click to select date' /> }
                { (Platform.OS !== 'android') && <Button onPress={showTimepicker} title='Click to select time' /> }
                {show && (
                    <DateTimePicker
                        display='spinner'
                        value={dateTime}
                        mode={mode}
                        onChange={(event, selectedDate) => {
                            setDateTime(selectedDate);
                        }}
                    />
                )}
                { show && (mode === 'date') && <Button onPress={hideMode} title='Select Date' /> }
                { show && (mode === 'time') && <Button onPress={hideMode} title='Select Time' /> }
                <Text style={styles.textLabel}>Enter the rink number</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='number-pad'
                    placeholder='Type rink number here'
                    value={rinkNumber}
                    onChangeText={input => setRinkNumber(input)}
                />
                <NavigationButton color='' message='Next' screenName='ScorecardTeam' navigation={navigation} data={{
                    competitionName: competitionName,
                    dateTime: dateTime.toISOString(),
                    rinkNumber: rinkNumber
                }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textLabel: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    textInput: {
        marginTop: 0,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        fontSize: 20,
        borderWidth: 1
    }
});

export default ScorecardCompetitionScreen;