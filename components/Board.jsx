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
            <Text style={styles.cellText}>{cell}</Text>
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
    width: 80, height: 80, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  cellText: { fontSize: 36, fontWeight: 'bold' }
});

export default Board;