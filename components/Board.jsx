import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Board = ({ board, onCellPress, disabled }) => (
  <View style={styles.board}>
    {board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={styles.cell}
            onPress={() => onCellPress(rowIndex, colIndex)}
            disabled={!!cell || disabled}
          >
            <Text
              style={[
                styles.cellText,
                cell === 'X' && { color: '#ff416c' }, // Pink color for X
                cell === 'O' && { color: '#333' },   // Dark gray color for O
              ]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: { margin: 20 },
  row: { flexDirection: 'row' },
  cell: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#ff7a9b', // Add border color
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15, // Rounded corners
    margin: 3, // Add margin between cells
  },
  cellText: { fontSize: 36, fontWeight: 'bold' },
});

export default Board;