import { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemContext from '../contexts/ItemContext';
import NavigationButton from '../components/NavigationButton';
import SectionBreak from '../components/SectionBreak';

const ScorecardEndScreen = ({ route, navigation }) => {
  const { competitionName, dateTime, rinkNumber, team1Name, team2Name, team1Players, team2Players, image } = route.params;
  const { create } = useContext(ItemContext);
  const [receivedCompetitionName, setReceivedCompetitionName] = useState(competitionName);
  const [receivedDateTime, setReceivedDateTime] = useState(dateTime);
  const [receivedRinkNumber, setReceivedRinkNumber] = useState(rinkNumber);
  const [receivedTeam1Name, setReceivedTeam1Name] = useState(team1Name);
  const [receivedTeam2Name, setReceivedTeam2Name] = useState(team2Name);
  const [receivedTeam1Players, setReceivedTeam1Players] = useState(team1Players);
  const [receivedTeam2Players, setReceivedTeam2Players] = useState(team2Players);

  // Below code required independent research, to dynmically create and manage end input fields on clicking a button
  const [ends, setEnds] = useState([]);
  const [endID, setEndID] = useState(2);
  const [endFields, setEndFields] = useState([{ end: 1 }]);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const handleTeam1EndTextInput = (input, id) => {
    const endExists = ends.find(end => end.end === id);
    if (endExists) {
      const updateEnd = ends.map(end => {
        if (end.end === id) {
          return { 
            ...end,
            team1Shots: ((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
            team1Score: team1Score+((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
            team2Shots: 0,
            team2Score: team2Score,
            imageUri: ''
          }
        }
        return end;
      });
      setEnds(updateEnd);
    }
    else {
      const newEnd = {
        end: id,
        team1Shots: ((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
        team1Score: team1Score+((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
        team2Shots: 0,
        team2Score: team2Score,
        imageUri: ''
      };
      setEnds([...ends, newEnd]);
    }
    setTeam1Score(team1Score + ((parseInt(input) !== 'NaN') ? parseInt(input) : 0));
  };

  const handleTeam2EndTextInput = (input, id) => {
    const endExists = ends.find(end => end.end === id);
    if (endExists) {
      const updateEnd = ends.map(end => {
        if (end.end === id) {
          return { 
            ...end,
            team1Shots: 0,
            team1Score: team1Score,
            team2Shots: ((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
            team2Score: team2Score+((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
            imageUri: ''
          }
        }
        return end;
      });
      setEnds(updateEnd);
    }
    else {
      const newEnd = {
        end: id,
        team1Shots: 0,
        team1Score: team1Score,
        team2Shots: ((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
        team2Score: team2Score+((parseInt(input) !== 'NaN') ? parseInt(input) : 0),
        imageUri: ''
      };
      setEnds([...ends, newEnd]);
    }
    setTeam2Score(team2Score + ((parseInt(input) !== 'NaN') ? parseInt(input) : 0));
  };

  const handleReturnedImage = () => {
    if (image) {
      const addImage = ends.map(end => {
        if (end.end === image.end) {
          return { 
            ...end,
            imageUri: image.uri
          }
        }
        return end;
      });
      setEnds(addImage);
    }
  };

  useEffect(() => handleReturnedImage(), [image]);

  const handleNewEndClick = () => {
    setEndFields([...endFields, {
      end: endID
    }]);
    setEndID(endID + 1);
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardDismissMode='on-drag'>
        <Text style={styles.header}>End Scores</Text>
        <Text style={styles.helpMessage}>When inputting scores for a team, only enter the shots value for the scoring team. The other team will automatically be awarded a score of 0.</Text>
        {endFields.map((item) => {
          return (
            <View key={item.end}>
              <SectionBreak headerTitle={`End ${item.end}`}/>
              <View style={styles.scoreTeamHeaderContainer}>
                <Text style={styles.teamName}>{team1Name}</Text>
                <Text style={styles.teamName}>{team2Name}</Text>
              </View>
              <View style={styles.scoreHeaderContainer}>
                <Text style={styles.scoreHeader}>Shots</Text>
                <Text style={styles.scoreHeader}>Total</Text>
                <Text style={styles.scoreHeader}>Shots</Text>
                <Text style={styles.scoreHeader}>Total</Text>
              </View>
              <View style={styles.scoreContainer}>
                <TextInput
                  keyboardType='number-pad'
                  style={styles.textInput1}
                  placeholder='0'
                  value={ends[item.end]}
                  onChangeText={input => handleTeam1EndTextInput(input, item.end)}
                />
                <Text style={styles.textLabel}>{(ends.length > 0) && (item.end < ends.length) && ends[item.end-1].team1Score}</Text>
                <TextInput
                  keyboardType='number-pad'
                  style={styles.textInput2}
                  placeholder='0'
                  value={ends[item.end]}
                  onChangeText={input => handleTeam2EndTextInput(input, item.end)}
                />
                <Text style={styles.textLabel}>{(ends.length > 0) && (item.end < ends.length) && ends[item.end-1].team2Score}</Text>
              </View>
              <NavigationButton color='green' message='Take Picture' screenName='EndCamera' navigation={navigation} data={{ end: item.end }} />
            </View>
          );
        })}
        <Button onPress={handleNewEndClick} title='Add another end' />
        <Button title='Next' onPress={() => {
          const id = Math.floor(Math.random() * 99999);
          const match = { 
            dateTime: receivedDateTime,
            title: receivedCompetitionName,
            rinkNumber: receivedRinkNumber
          };
          const teams = {
            team1: {
              team1Name: receivedTeam1Name,
              players: receivedTeam1Players
            },
            team2: {
              team2Name: receivedTeam2Name,
              players: receivedTeam2Players
            },
            scores: ends,
            finalscore: {
              team1Score: ((ends.length > 0) ? ends[ends.length-1].team1Score.toString() : 'N/A'),
              team2Score: ((ends.length > 0) ? ends[ends.length-1].team2Score.toString() : 'N/A'),
              winner: ((ends.length > 0) ? ((ends[ends.length-1].team1Score > ends[ends.length-1].team2Score) ? "team1" : "team2") : 'N/A')
            }
          };
          create(id, match, teams, navigation.navigate('GameComplete', { id: id }));
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
  helpMessage: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
    textAlign: 'center'
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
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 0
  },
  scoreContainer: {
    margin: 10,
    marginLeft: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 300
  },
  scoreHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 60
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  textLabel: {
    margin: 10,
    marginLeft: 40,
    fontWeight: 'bold',
    fontSize: 20
  },
  textInput1: {
    marginTop: 0,
    marginBottom: 15,
    marginRight: 10,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    width: 50,
    marginHorizontal: 25,
    textAlign: 'center'
  },
  textInput2: {
    marginTop: 0,
    marginBottom: 15,
    marginRight: 10,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    width: 50,
    marginHorizontal: 55,
    textAlign: 'center'
  },
});

export default ScorecardEndScreen;