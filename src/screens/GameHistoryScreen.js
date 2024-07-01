import { useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ItemContext from '../contexts/ItemContext';

const GameHistoryScreen = ({ navigation }) => {
    const { state, remove } = useContext(ItemContext);
    return (
        <SafeAreaView>
            <FlatList
                data={state}
                keyExtractor={data => data.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate('GameComplete', { id: item.id })}>
                            <View>
                                <Text style={styles.matchTitleText}>{item.match.title}</Text>
                                <View style={styles.contentContainer}>
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.dateText}>
                                            {new Date(item.match.dateTime).toLocaleDateString()}
                                        </Text>
                                        <Text>
                                            {new Date(item.match.dateTime).toLocaleTimeString()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={(item.teams.finalscore.winner === 'team1') ? styles.winningTeam : styles.titleText}>{`${item.teams.team1.team1Name}`}</Text>
                                        <Text style={(item.teams.finalscore.winner === 'team1') ? styles.winningTeam : styles.titleText}>{`${item.teams.finalscore.team1Score}`}</Text>
                                    </View>
                                    <View style={styles.vsContainer}>
                                        <Text style={styles.vsText}> vs </Text>
                                    </View>
                                    <View>
                                        <Text style={(item.teams.finalscore.winner === 'team2') ? styles.winningTeam : styles.titleText}>{`${item.teams.team2.team2Name}`}</Text>
                                        <Text style={(item.teams.finalscore.winner === 'team2') ? styles.winningTeam : styles.titleText}>{`${item.teams.finalscore.team2Score}`}</Text>
                                    </View>
                                    <Pressable onPress={() => navigation.navigate('EditScorecard', { id: item.id })}>
                                        <MaterialIcons name='edit' size={38} color='blue' />
                                    </Pressable>
                                    <Pressable onPress={() => remove(item.id)}>
                                        <MaterialIcons name='delete' size={38} color='red' />
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 15,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        margin: 10,
        marginTop: 0
    },
    dateContainer: {
        alignItems: 'center',
        width: 80
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 16,
        paddingLeft: 15,
        flex: 1,
        alignSelf: 'center',
        width: 90
    },
    titleStyle: {
        fontSize: 16
    },
    winningTeam: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 15,
        flex: 1,
        alignSelf: 'center',
        width: 90
    },
    vsContainer: {
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        minWidth: 15
    },
    matchTitleText: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    }
});

export default GameHistoryScreen;