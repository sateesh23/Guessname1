import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const App = () => {
  const [target, setTarget] = useState(getRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const numGuess = parseInt(guess);

    if (isNaN(numGuess)) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100');
      return;
    }

    setAttempts(prev => prev + 1);

    if (numGuess < target) {
      setFeedback('Too Low! Try again.');
    } else if (numGuess > target) {
      setFeedback('Too High! Try again.');
    } else {
      setFeedback(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    }

    setGuess('');
  };

  const resetGame = () => {
    setTarget(getRandomNumber());
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Guess the Number (1–100)</Text>

      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter your guess"
        keyboardType="numeric"
        editable={!gameOver}
      />

      <Button title="Guess" onPress={handleGuess} disabled={gameOver} />

      <Text style={styles.feedback}>{feedback}</Text>

      {gameOver && (
        <View style={styles.resetContainer}>
          <Button title="Play Again 🔁" onPress={resetGame} />
        </View>
      )}

      <Text style={styles.attempts}>Attempts: {attempts}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
  resetContainer: {
    marginTop: 30,
  },
  attempts: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default App;
