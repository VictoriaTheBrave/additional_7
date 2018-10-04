module.exports = function solveSudoku(matrix) {
    const zeroIndices = findZeroIndices(matrix);
    const currentMatrix = matrix.map(r => [...r]);
    if (!zeroIndices) {
        return currentMatrix;
    }
    const possibleCandidates = findPossibleCandidates(zeroIndices[0], zeroIndices[1], currentMatrix);
    for (let i = 0; i < possibleCandidates.length; i++) {
        currentMatrix[zeroIndices[0]][zeroIndices[1]] = possibleCandidates[i];
        const solvedMatrix = solveSudoku(currentMatrix);
        if (solvedMatrix) {
            return solvedMatrix;
        }
    }
    return false;
}

function findZeroIndices (matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return false;
}

function findPossibleCandidates (i, j, matrix) {
    const candidatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let notCandidateIndex;
    for (let k = 0; k < 9; k++) {
        notCandidateIndex = candidatesArray.indexOf(matrix[i][k]);
        if (notCandidateIndex !== -1) {
            candidatesArray.splice(notCandidateIndex, 1);
        }
    }
    for (let k = 0; k < 9; k++) {
        notCandidateIndex = candidatesArray.indexOf(matrix[k][j]);
        if (notCandidateIndex !== -1) {
            candidatesArray.splice(notCandidateIndex, 1);
        }
    }
    const rowIndices = findIndicesInBox(i);
    const columnIndices = findIndicesInBox(j);
    for (let k = 0; k < 3; k++) {
        for (let m = 0; m < 3; m++) {
            notCandidateIndex = candidatesArray.indexOf(matrix[rowIndices[k]][columnIndices[m]]);
            if (notCandidateIndex !== -1) {
                candidatesArray.splice(notCandidateIndex, 1);
            }
        }
    }
    return candidatesArray;
}

function findIndicesInBox (index) {
    if (index < 3) {
        return [0, 1, 2];
    } else if (index > 5) {
        return [6, 7, 8];
    } else {
        return [3, 4, 5];
    }    
}