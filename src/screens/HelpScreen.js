import { Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionBreak from '../components/SectionBreak';

const HelpScreen = () => {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.title}>Help</Text>
          <SectionBreak headerTitle='About' />
          <Text style={styles.content}>
            The Bowls Scorecard app is designed to be a replacement for the traditional bowls scorecard. 
            It allows you to record your bowls game scores and keep a permanent record of your match results.
            If you are struggling with how to use the app, please continue reading for more information.
          </Text>
          <SectionBreak headerTitle='Home' />
          <Text style={styles.content}>
            When you first open the app, the homepage will be displayed. 
            From here, you may access the bottom navigation bar, to go to another screen, or use the buttons on the homescreen to carry out your desired function.
            This may be viewing your past match scorecards, or creating a new scorecard for a new match.
          </Text>
          <SectionBreak headerTitle='Game History' />
          <Text style={styles.content}>
            The Game History screen may be navigated to via the homepage or bottom navigation bar. 
            This screen displays all of your past games, with a brief amount of information regarding each game, including its date, time, competition name, teams and final scores.
          </Text>
          <Text style={styles.content}>
            You may scroll through the list to view the matches or click on a match to view more details about the match, including its end scores and players.
            Alternatively, clicking the blue pencil icon will allow you to edit the match and its scores, whilst the red trash can icon will delete the match scorecard.
          </Text>
          <SectionBreak headerTitle='New Game' />
          <Text style={styles.content}>
            The New Game screen may be navigated to via the homepage or bottom navigation bar.
            This screen allows you to record the scores for a new bowls match.
            Firstly, you will be required to enter the competition name, select a competition date and time, and enter the rink number.
          </Text>
          <Text style={styles.content}>
            To select the competition date and time, click the associated button, which will open the relevant picker. 
            Choose the relevant date or time, and click the 'Select' button to select the value and close the picker.
            Click the 'Next' button, which will display the team details screen.
          </Text>
          <Text style={styles.content}>
            Enter your team and player names. 
            Up to four players may be entered, through clicking on the 'Add another team player' button, which will display a new input field for you to enter their name into.
            Once all players have been input, click the 'Next' button, which will display the ends screen.
          </Text>
          <Text style={styles.content}>
            Here, you may enter a shots value for a team. One team will keep their shots value, whilst the opposing team will automatically get 0 shots for that end.
            Enter one shots value for the team - do not enter a 0 for the other team, as this is calculated automatically.
            At the end of each end, you may click the 'Take Picture' button, to take a picture to store with the end.
          </Text>
          <Text style={styles.content}>
            You may change between the front and rear camera, and the flash will automatically be fired, as appropriate.
            Upon taking a picture, you will be able to view the image you have just taken. 
            Click the 'Done' button to navigate back to the ends screen and input a new end.
          </Text>
          <Text style={styles.content}>
            If your picture is unsuitable, you may click the 'Take Picture' button again to take a new picture, following the same process outlined above.
            All pictures are saved to your camera roll/photo gallery, so please do not delete them from there, otherwise this will affect the functionality of the app.
          </Text>
          <Text style={styles.content}>
            You may add a new end by clicking the 'Add another end' button.
            This will display a new end input field, allowing you to repeat the process outlined above.
            Once all ends have been played and recorded, click the 'Next' button.
          </Text>
          <Text style={styles.content}>
            From here, you will be able to see the results of the match you have just played.
            All data is stored upon clicking the 'Next' button, therefore if you close the app, you will still be able to view the match information in the Game History screen.
            Click on the 'Done' button to navigate to the homepage, or use the bottm navigation bar to navigate to an appropriate screen.
          </Text>
          <SectionBreak headerTitle='Edit Game' />
          <Text style={styles.content}>
            A game may be edited through modifying the appropriate value contained in the field and clicking the 'Save Changes' button. 
            If you update the end scores or add a new end, you must click the 'Update end scores' button before clicking the 'Save changes' button, otherwise your score totals will not update.
          </Text>
          <Text style={styles.content}>
            Click the 'Save changes' button to update the match scorecard.
            All changes update the existing scorecard upon clicking the 'Save changes' button, therefore if you close the app, you will still be able to view the updated match information in the Game History screen.
          </Text>
          <SectionBreak headerTitle='Help Screen' />
          <Text style={styles.content}>
           This Help Screen may be accessed at any time, either from the homepage or bottom navigation bar.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  content: {
    margin: 10,
    fontSize: 20
  }
});

export default HelpScreen;