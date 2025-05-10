import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Board from '../Board';
import { createEmptyBoard, checkWinner } from '../../utils/gameLogic';
import Confetti from 'react-native-confetti';

const screenHeight = Dimensions.get('window').height;

const TicTokToi = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const [showRestartPopup, setShowRestartPopup] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef(null);

  useEffect(() => {
    if (winner) {
      setShowEndPopup(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (winner !== 'Draw') {
        confettiRef.current?.startConfetti();
      }
    }
  }, [winner]);

  const handleCellPress = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Switch player
    }
  };

  const handleRestart = () => {
    setShowRestartPopup(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const confirmRestart = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X')); // Alternate starting player
    setWinner(null);
    setShowRestartPopup(false);
    setShowEndPopup(false);
    scaleAnim.setValue(0);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tic-Tac-Toe</Text> */}

      {/* Player Cards */}
      <View style={styles.playerCards}>
        {/* Card for Player X */}
        <View
          style={[
            styles.card,
            currentPlayer === 'X' && styles.activeCard, // Highlight active player
          ]}
        >
          <Image
            source={require('../../assets/girl.jpg')} // Replace with your X image
            style={styles.cardImage}
          />
          <Text style={[styles.cardText, { color: '#ff416c' }]}>Player X</Text> {/* Pink color for X */}
        </View>

        {/* Card for Player O */}
        <View
          style={[
            styles.card,
            currentPlayer === 'O' && styles.activeCard, // Highlight active player
          ]}
        >
          <Image
            source={require('../../assets/boy.jpg')} // Replace with your O image
            style={styles.cardImage}
          />
          <Text style={[styles.cardText, { color: '#333' }]}>Player O</Text> {/* Default color for O */}
        </View>
      </View>

      <Board board={board} onCellPress={handleCellPress} disabled={!!winner} />

      <Text style={styles.info}>
        {winner
          ? winner === 'Draw'
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Current Player: ${currentPlayer}`}
      </Text>

      <TouchableOpacity style={styles.buttonRestart} onPress={handleRestart}>
        <Text style={styles.buttonText}>🎮 Restart Game</Text>
      </TouchableOpacity>

      <Confetti ref={confettiRef} duration={1000} />

      {/* End Game Popup */}
      <Modal visible={showEndPopup} transparent animationType="none">
        <View style={styles.popupOverlay}>
          <Animated.View
            style={[styles.popupContent, { transform: [{ scale: scaleAnim }] }]}
          >
            <Image
              source={
                winner === 'Draw'
                  ? require('../../assets/draw.gif') // Image for a draw
                  : winner === 'X'
                  ? require('../../assets/girl.jpg') // Image for X winner
                  : require('../../assets/boy.jpg') // Image for O winner
              }
              style={styles.popupImage}
            />
            <Text style={styles.popupText}>
              {winner === 'Draw' ? "It's a Draw!" : `🏆 ${winner} Wins!`}
            </Text>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmRestart}>
              <Text style={styles.confirmText}>🔁 Play Again</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Restart Popup */}
      <Modal visible={showRestartPopup} transparent animationType="none">
        <View style={styles.popupOverlay}>
          <Animated.View
            style={[styles.popupContent, { transform: [{ scale: scaleAnim }] }]}
          >
            <Image
              loop={true}
              source={require('../../assets/dolly.gif')}
              style={styles.popupImage}
            />
            <Text style={styles.popupText}>Ready for a new game?</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmRestart}>
              <Text style={styles.confirmText}>✅ Yes, Restart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3f0ff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  playerCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '100%',
    gap: 40,
    marginBottom: 20,
  },
  card: {
    width: 120,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  activeCard: {
    borderColor: '#ff416c', // Highlight color for the active player
    backgroundColor: '#ffe6eb', // Light background for the active player
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
    color: '#ff416c',
  },
  buttonRestart: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#ff416c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  popupContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  popupImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  popupText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TicTokToi;
