import { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ItemContext from '../contexts/ItemContext';
import SectionBreak from '../components/SectionBreak';
import SectionDetail from '../components/SectionDetail';

const GameCompleteScreen = ({ route, navigation }) => {
    const { state } = useContext(ItemContext);
    const { id } = route.params;
    const foundItem = state.filter(game => {
        if (game.id === id) return game;
    });
    const item = foundItem[0];

    const winningScore = (item.teams.finalscore.winner === 'team1') ? item.teams.finalscore.team1Score : item.teams.finalscore.team2Score;

    // Below code required independent research, as FlatLists cannot be nested within other FlatLists or ScrollViews, so a map function was required
    return (
        <SafeAreaView>
            <ScrollView>
                <SectionBreak headerTitle='Winner' />
                <Text style={styles.winnerHeader}>And the winner is...</Text>
                <Text style={styles.winner}>{(item.teams.finalscore.winner === 'team1') ? item.teams.team1.team1Name : item.teams.team2.team2Name}</Text>
                <Text style={styles.points}>{`Totalling ${winningScore} Points`}</Text>
                <SectionBreak headerTitle='Game Information' />
                <SectionDetail title='Competition Name' details={item.match.title} />
                <SectionDetail title='Competition Date' details={new Date(item.match.dateTime).toLocaleString()} />
                <SectionDetail title='Rink Number' details={item.match.rinkNumber} />
                <SectionDetail title='Ends Played' details={item.teams.scores.length} />
                <SectionBreak headerTitle='Team Information' />
                <View style={styles.teamContainer}>
                    <View style={styles.teamInfoContainer}>
                        <Text style={styles.teamName}>{item.teams.team1.team1Name}</Text>
                        { item.teams.team1.players.map((item) => {
                            return (
                                <View style={styles.team1Players} key={item.id}>
                                    <Text style={styles.player}>{item.name}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.vsContainer}>
                        <Text style={styles.teamName}> vs. </Text>
                        <Text style={styles.skipTitle}>Skip</Text>
                    </View>
                    <View style={styles.teamInfoContainer}>
                        <Text style={styles.teamName}>{item.teams.team2.team2Name}</Text>
                        <View style={styles.teamInfoContainer}>
                            { item.teams.team2.players.map((item) => {
                                return (
                                    <View style={styles.team2Players} key={item.id}>
                                        <Text style={styles.player}>{item.name}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
                <SectionBreak headerTitle='Score History' />
                <View>
                    <View style={styles.scoreTeamHeaderContainer}>
                        <Text style={styles.teamName}>{item.teams.team1.team1Name}</Text>
                        <Text style={styles.teamName}>{item.teams.team2.team2Name}</Text>
                    </View>
                    <View style={styles.scoreHeaderContainer}>
                        <Text style={styles.scoreHeader}>Shots</Text>
                        <Text style={styles.scoreHeader}>Total</Text>
                        <Text style={styles.scoreHeader}>End</Text>
                        <Text style={styles.scoreHeader}>Shots</Text>
                        <Text style={styles.scoreHeader}>Total</Text>
                        <Text style={styles.scoreHeader}>Image</Text>
                    </View>
                    { item.teams.scores &&
                        item.teams.scores.map((item) => {
                            return (
                                <View style={styles.scoreContainer} key={item.end}>
                                    <Text style={styles.score}>{item.team1Shots}</Text>
                                    <Text style={styles.score}>{item.team1Score}</Text>
                                    <Text style={styles.score}>{item.end}</Text>
                                    <Text style={styles.score}>{item.team2Shots}</Text>
                                    <Text style={styles.score}>{item.team2Score}</Text>
                                    {item.imageUri && <Pressable style={styles.endImage} onPress={() => navigation.navigate('ViewEndPhoto', { uri: item.imageUri })}><Feather name="camera" size={24} color="black"/></Pressable>}
                                </View>
                            );
                        })
                    }
                </View>
                <Button color='blue' title='Done' onPress={() => navigation.navigate('Home')} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    winnerHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 10
    },
    winner: {
        fontWeight: 'bold',
        fontSize: 21,
        margin: 15,
        textAlign: 'center'
    },
    points: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 25
    },
    teamContainer: {
        margin: 10,
        flex: 3,
        flexDirection: 'row'
    },
    teamName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    teamInfo: {
        textAlign: 'center'
    },
    teamInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vsContainer: {
        alignItems: 'center',
        minWidth: 15,
    },
    skipTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    player: {
        fontSize: 20,
        marginBottom: 5
    },
    scoreTeamHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginHorizontal: 60,
        marginBottom: 0
    },
    scoreHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
        marginTop: 0
    },
    scoreHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 60
    },
    scoreContainer: {
        margin: 10,
        marginLeft: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 300
    },
    score: {
        fontSize: 18,
        width: 60,
        textAlign: 'center',
        marginLeft: 0
    },
    endImage: {
        marginRight: 10,
        marginLeft: 25,
        marginTop: 0
    }
});

export default GameCompleteScreen;