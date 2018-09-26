module.exports = function solveSudoku(matrix) {
  const matrixCpy = [];
  const indices = [];
  for (let i = 0, len = matrix.length; i < len; i++){
    matrixCpy.push(matrix[i].slice());
  }
  // get indeces of missing numbers
  for (let i = 0, len = matrixCpy.length; i < len; i++){
    for (let j = 0; j < len; j++){
      if (matrixCpy[i][j] == 0){
        indices.push([i, j]);
      }
    }
  }
  // iterate over missing numbers and check possible combinations
  for (let k = 0, len = indices.length; k < len; k++){
    const i = indices[k][0];
    const j = indices[k][1];
    matrixCpy[i][j]++;
    while(!checkPosition(i, j, matrixCpy)){
      matrixCpy[i][j]++;
      if (matrixCpy[i][j] == 10){
        k--;
        break;
      }
    }
  }
  return matrixCpy;
}

// returns false if current number can not be in current position
function checkPosition(i, j, matrix){
  // get corresponding square from sudoku
  let boxSizeA;
  let boxSizeB;
  i < 3 ? boxSizeA = [0, 1, 2]:
  i < 6 ? boxSizeA = [3, 4, 5]:
  boxSizeA = [6, 7, 8];
  j < 3 ? boxSizeB = [0, 1, 2]:
  j < 6 ? boxSizeB = [3, 4, 5]:
  boxSizeB = [6, 7, 8];
  // check row and column
  for (let k = 0; k < 9; k++){
    const rowCondition = matrix[k][j] == matrix[i][j] && k != i;
    const columnCondition = matrix[i][k] == matrix[i][j] && k != j;
    if (rowCondition || columnCondition){
      return false;
    }
  }
  let answer = true;

  // check corresponding square
  boxSizeA.map((a) => {
    boxSizeB.map((b) => {
      const boxCondition = matrix[a][b] == matrix[i][j] && (a != i && b != j);
      if (boxCondition){
        answer = false;
      }
    });
  });
  return answer;
}