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
import MusicCompo from './MusicCompo';

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
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
    setCurrentPlayer('X');
    setWinner(null);
    setShowRestartPopup(false);
    setShowEndPopup(false);
    scaleAnim.setValue(0);
  };

  return (
  
   
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>

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
          <Animated.View style={[styles.popupContent, { transform: [{ scale: scaleAnim }] }]}>
            <Image
              source={
                winner === 'Draw'
                  ? require('../../assets/draw.gif')
                  : require('../../assets/win.gif')
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
          <Animated.View style={[styles.popupContent, { transform: [{ scale: scaleAnim }] }]}>
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
  info: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
    color: '#ff416c',
  },

  board: {
    margin: 20,
    backgroundColor: '#ffffff', // White background for the board
    borderRadius: 16,            // Optional: rounded corners for a modern look
    padding: 8,                  // Optional: some padding inside the board
  },
  row: { flexDirection: 'row' },
  cell: {
    width: 80, height: 80, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#000000'
  },
  cellText: { fontSize: 36, fontWeight: 'bold' },

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
